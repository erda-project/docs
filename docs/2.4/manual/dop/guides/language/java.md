# Java

Erda 通过统一的任务插件机制支撑不同的构建能力，并利用这一机制提供开箱即用的 Java 构建插件。

## Java 版本

平台支持 Java 1.8 和 Java 11，默认为前者。

## 打包工具

* Maven
* Gradle

## 依赖管理

若使用平台提供的配置文件则无需改动代码。平台打包时将自动准备如下文件并自动填充占位符。
* Maven: settings.xml
* Gradle: init.gralde

settings.xml 示例如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <servers>
        <server>
            <id>terminus</id>
            <username>{{NEXUS_USERNAME}}</username>
            <password>{{NEXUS_PASSWORD}}</password>
        </server>
    </servers>
    <mirrors>
        <mirror>
            <id>terminus</id>
            <mirrorOf>*</mirrorOf>
            <url>{{NEXUS_URL}}/repository/public/</url>
        </mirror>
    </mirrors>

    <profiles>
        <profile>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <repositories>
                <repository>
                    <id>placeholder</id>
                    <url>{{NEXUS_URL}}/repository/public/</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>true</enabled>
                        <updatePolicy>always</updatePolicy>
                        <checksumPolicy>warn</checksumPolicy>
                    </snapshots>
                </repository>
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>placeholder</id>
                    <url>{{NEXUS_URL}}/repository/public/</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>true</enabled>
                        <updatePolicy>always</updatePolicy>
                        <checksumPolicy>warn</checksumPolicy>
                    </snapshots>
                </pluginRepository>
            </pluginRepositories>
        </profile>
    </profiles>
</settings>
```

init.gradle 示例如下：
```java
def NEXUS_SERVER = "{{NEXUS_URL}}/repository/public/"
def NEXUS_USERNAME = "{{NEXUS_USERNAME}}"
def NEXUS_PASSWORD = "{{NEXUS_PASSWORD}}"

allprojects {
    buildscript {
        repositories {
            maven {
                credentials {
                    username NEXUS_USERNAME
                    password NEXUS_PASSWORD
                }
                url NEXUS_SERVER
            }
        }
    }
    repositories {
        maven {
            credentials {
                username NEXUS_USERNAME
                password NEXUS_PASSWORD
            }
            url NEXUS_SERVER
        }
    }
}
```

## 推送 JAR 包至私服

### 上传 maven settings.xml

进入 **我的应用 > 选择应用 > 设置 > 流水线 > 变量配置 > 选择环境**。

点击 **增加变量**， 选择类型为 **文件** 并开启加密，将 settings.xml 上传，变量名称定义为 `MAVEN_SETTING_FILE`。

::: warning 警告
因文件内含有密码等敏感信息，配置必须开启加密。
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

请在对应项目的 pom.xml 中添加需要如下配置，否则将报错无法推送。

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

MAVEN_SETTING_FILE 即上文配置的名称。

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
           - "rm -rf /usr/share/maven/conf/setting.xml"
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

* maven 401 错误即账号密码错误。
* maven 405 错误可能为私服地址错误，部分私服地址是无法推送的，例如 public。

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

* maven 401 错误即账号密码错误。
* maven 405 错误可能为私服地址错误，部分私服地址是无法推送的，例如 public。

:::

## 接入平台日志

平台仅采集输出至控制台（Console）的日志，因此需应用程序将日志导入控制台。

::: warning 警告
请勿将日志写入磁盘文件，这可能导致性能下降或者磁盘资源耗尽等严重问题。
:::

通过 Logback 配置，将日志输出至控制台：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="30 seconds">
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd'T'HH:mm:ss.SSSZZ} [%thread] %-5level %logger{5} - %msg%n</pattern>
        </encoder>
    </appender>
    <root level="DEBUG">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>
```

若采用平台提供的运行容器，平台将自动关闭 `RollingFileAppender` 等非 `ConsoleAppender` 的 appender，以确保日志无法写入磁盘。请确保已配置 `ConsoleAppender`，否则将无法查看日志。

## 构建打包

Java 构建分为两部分：
1. 通过指明的打包方式和上下文参数，将源代码编译为打包产物。
2. 按照指明的运行环境和版本，选择基础镜像，将 JAR 包制作成运行镜像。

::: tip 提示
此处特指打包产物而非 JAR 包，原因在于很多场景下编译的结果并非是 JAR 包，例如传统的 Spring MVC 程序产出 WAR 包，gradle distribution 产出的则是 Tar 或者 ZIP 包，通过解压执行 bin/xxx 运行。
:::

通过 Spring Boot 技术制作而成的 JAR 包称为 `fat jar`，因其 JAR 包中嵌入了除 Java 虚拟机以外的所有依赖，故此得名。

由于 `fat jar` 是一个 all-in-one 的 JAR 包，因此仅需 Java 虚拟机环境便可通过 `java -jar app.jar` 直接运行。

pipeline.yml 示例如下：

```yaml{10,14}
version: "1.1"

stages:
- stage:
  - git-checkout:

- stage:
  - java:
      params:
        build_type: maven
        workdir: ${git-checkout}
        options: -am -pl user
        target: ./user/target/user.jar
        container_type: openjdk
```

## 打包加速

### Gradle

自带 Gradle Cache Node，默认开启。

### Caches

示例如下：

```yaml
- stage:
  - java:
      caches:
        - path: /root/.m2/repository
      params:
        build_type: maven
        workdir: ${git-checkout}
        options: -am -pl user
        target: ./user/target/user.jar
        container_type: openjdk
```

`/root/.m2/repository` 目录为 Linux 中 Maven 本地仓库的地址，缓存过后即可进行加速构建。

## JVM 诊断

### Arthas

可以通过 `curl -sf https://arthas.aliyun.com/arthas-boot.jar -o arthas-boot.jar` 命令安装 arthas。
安装成功后，根据安装目录，执行 `java -jar arthas-boot.jar` 命令启动。

关于 Arthas 更多信息，请参见 [Arthas 用户文档](https://alibaba.github.io/arthas/)。

### Greys

若使用平台提供的运行容器，则已安装 Greys。

关于 Greys 更多信息，请参见 [Greys 文档](https://github.com/oldmanpushcart/greys-anatomy)。

## 远程调试&热更新

平台提供 VPN 的方式，支持本地远程连接平台上运行的服务。

为开启远程调试，需进入 **我的应用 > 选择应用 > 设置 > 流水线 > 变量配置**，添加 JAVA_OPTS 变量配置如下：

JDK 9 及以上：

```bash
JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
```

JDK 5～8：

```bash
JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
```

此外，如需使用本地 IDE 进行连接，请进入 **DevOps 平台 > 应用中心 > 环境部署** 查看需调试的容器 IP，在 IDE 新建 Remote 配置如下：

JDK 9 及以上：

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/b72accdc-3e6f-4053-bc18-a4b48e1007bd.png)

JDK 5～8：

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/26/6d2cc57d-6c7e-4627-baf9-960ff9aa3c6c.png)
