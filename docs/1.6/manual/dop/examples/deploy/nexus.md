# 使用 Nexus 加速构建 

## 推送 JAR 包至私服

### 上传 Maven settings.xml 至平台

进入 **我的应用 > 选择应用 > 设置 > 流水线 > 变量配置 > 选择环境**。

点击 **增加变量**， 选择类型为 **文件** 并开启加密，上传 settings.xml，变量名称定义为 `MAVEN_SETTING_FILE`。

::: warning 警告

* 因文件内含有密码等敏感信息，配置必须开启加密。
* 为防止 XXE 攻击，平台禁止上传 XML 文件。XML 文件可变更为  settings_xml 文件（Linux 系统不区分文件类型）。

:::

settings.xml 示例如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>

<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

  <servers>
    <server>
      <id>terminus</id>
      <username>deployment</username>
      <password>******</password>
    </server>
  </servers>
</settings>
```

### 配置 pom.xml 推送地址

对应项目的 pom 需增加如下配置，若未添加则会报错无法推送。

```xml
<distributionManagement>
    <repository>
        <id>terminus</id>    <!-- settings.xml 里配置的 server.id -->
        <name>Releases</name>
        <url>http://私服地址/repository/releases</url>  <!-- release 私服的地址 -->
    </repository>
    <snapshotRepository>
        <id>terminus</id>
        <name>Snapshots</name>
        <url>http://私服地址/repository/releases</url>  <!-- snapshot 私服的地址 -->
    </snapshotRepository>
</distributionManagement>
```

### 配置流水线实现 JAR 包上传

`MAVEN_SETTING_FILE` 即上文配置的变量名称。

```yaml
version: "1.1"

stages:
- stage:
  - git-checkout:
      alias: git-checkout
      params:
        depth: 1
- stage:
  - java-build:
      alias: java-build
      version: "1.0"
      params:
        build_cmd:
           - "mvn clean deploy  -e -B -U --settings ((MAVEN_SETTING_FILE)) -Dmaven.test.skip"
        jdk_version: 8
        workdir: ${git-checkout}
```

如需自动触发构建，可增加持续集成配置。

```yaml
on:
  push:
    branches:
      - develop # 持续集成
```

::: tip 提示

* Maven 401 错误即账号密码错误。
* Maven 405 错误可能为私服地址错误，部分私服地址是无法推送的，例如 public。

:::

## 推送 JAR 包至私服（Gradle）

### 配置 Nexus 私服密码

进入 **我的应用 > 选择应用 > 设置 > 流水线 > 变量配置 > 选择环境**。

点击 **增加变量**， 选择类型为 **值** 并开启加密，配置以下变量：

- NEXUS_USERNAME
- NEXUS_PASSWORD

::: warning 警告
因文件内含有密码等敏感信息，配置必须开启加密。
:::

### 配置 build.gradle 推送地址

对应项目的 build.gradle 需增加如下配置，若未添加则会报错无法推送。更多信息请参见 [build.gradle 配置方式](https://docs.gradle.org/current/userguide/publishing_maven.html)。

```groovy
publishing{

    ...

    repositories {
        maven {
            // change URLs to point to your repos, e.g. http://my.org/repo
            def releasesRepoUrl = "http://私服地址/repository/releases"
            def snapshotsRepoUrl = "http://私服地址/repository/snapshots"
            url = version.endsWith('SNAPSHOT') ? snapshotsRepoUrl : releasesRepoUrl
            credentials {
                username = System.getenv("NEXUS_USERNAME")
                password = System.getenv("NEXUS_PASSWORD")
            }
        }
    }
}
```

### 配置流水线实现 JAR 包上传

```yaml
version: "1.1"

stages:
- stage:
  - git-checkout:
      alias: git-checkout
      params:
        depth: 1
- stage:
  - java-build:
      alias: java-build
      version: "1.0"
      params:
        build_cmd:
           - "./gradlew publish"
        jdk_version: 8
        workdir: ${git-checkout}
```

如需自动触发构建，可增加持续集成配置。

```yaml
on:
  push:
    branches:
      - develop # 持续集成
```

::: tip 提示

* Maven 401 错误即账号密码错误。
* Maven 405 错误可能为私服地址错误，部分私服地址是无法推送的，例如 public。

:::
