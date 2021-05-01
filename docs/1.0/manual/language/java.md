# Java

Erda 通过统一的任务插件机制支撑不同的构建能力，利用这一机制，Erda 提供了开箱即用的 Java 构建插件。

## Java 版本

平台支持：
* java 1.8
* java 11

默认为 java 1.8

## 打包工具

平台支持：
* Maven
* Gradle

## 依赖管理

### 使用平台提供的配置文件

若使用平台提供的配置文件，则无需改动代码，平台上进行打包时，将自动准备此些文件，并自动填充占位符
* Maven: settings.xml
* Gradle: init.gralde

**settings.xml**
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

**init.gradle**
```gradle
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

### 使用自定义配置文件

TODO: 暂未支持

## 推送 jar 包到私服

### 上传 maven settings.xml 到平台

进入变量配置页面下

项目下 应用设置 > 流水线 / 变量配置 > {对应的环境}

点击`新增配置`， 然后选择类型为 *文件*，选择 *开启加密*，将自己的 settings.xml 上传上去，变量名称定义为 `MAVEN_SETTING_FILE`

::: warning
必须选择加密，因为文件中含有密码等敏感信息
:::

settings.xml 样例

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

### 源代码中 pom.xml 配置推送地址

对应的项目的 pom 需要如下配置，没有添加就会报错无法推送上去

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

### 配置流水线实现 jar 包上传

- MAVEN_SETTING_FILE 就是上面配置的名称

```yaml
version: '1.1'

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

若需要自动触发构建，可增加持续集成配置，[详细参看](../deploy/pipeline.md#代码更新触发流水线)

```yaml
on:
  push:
    branches:
      - develop # 持续集成
```

### 注意点

::: tip
maven 401 错误是账号密码不对

maven 405 错误可能是私服地址有问题，有些私服地址是不能推送的，比如 public
:::

## 推送 jar 包到私服 (gradle)

### 在平台上配置 nexus 私服密码

进入变量配置页面下

项目下 应用设置 > 流水线 / 变量配置 > {对应的环境}

点击`新增配置`， 然后选择类型为 *值*，选择 *开启加密*，配置以下变量
- NEXUS_USERNAME
- NEXUS_PASSWORD

::: warning
必须选择加密，因为文件中含有密码等敏感信息
:::

### 源代码中 build.gradle 配置推送地址

对应的项目的 build.gradle 需要如下配置，没有添加就会报错无法推送上去。build.gradle 配置方式 [查看](https://docs.gradle.org/current/userguide/publishing_maven.html)

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

### 配置流水线实现 jar 包上传

```yaml
version: '1.1'

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

若需要自动触发构建，可增加持续集成配置，[详细参看](../deploy/pipeline.md#代码更新触发流水线)

```yaml
on:
  push:
    branches:
      - develop # 持续集成
```

### 注意点

::: tip
maven 401 错误是账号密码不对

maven 405 错误可能是私服地址有问题，有些私服地址是不能推送的，比如 public
:::

## 接入平台日志

平台**只采集**输出到控制台 (console) 的日志，所以需要应用程序将日志导入控制台。

::: warning
请勿将日志写入磁盘文件，会导致性能下降或者磁盘资源耗尽等严重问题
:::

### logback 配置

通过 logback 配置，将日志输出到控制台：

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

若采用平台提供的运行容器，平台会自动关闭 `RollingFileAppender` 等非 `ConsoleAppender` 的 appender，以确保日志不会写入磁盘。请确保配置了 `ConsoleAppender`，否则会导致无法查看日志。

## 接入平台监控

TODO: 平台的监控能力一句话介绍+监控带来的好处

### 无侵入式监控

采用平台提供的运行容器镜像，则可以实现无侵入式监控。无需做任何代码改动。

### 自定义镜像如何接入

TODO: 手动加载 javaagent

### 如何使用监控能力

TODO: Link to 监控功能

## 构建打包

Java 构建分为两部分:
1. 通过指明的打包方式和上下文参数，将源代码编译成`打包产物`
2. 按照指明的运行环境和版本，选择基础镜像，将 jar 包制作成运行镜像

::: tip
这里特指`打包产物`而非 jar 包，是因为很多场景下编译的结果并非是 jar 包，比如传统的 spring mvc 程序会是 war 包，
而 gradle distribution 产出的是 tar 或者 zip 包，通过解压执行 bin/xxx 来运行
:::

### Spring Boot

使用 spring boot 技术制作出的 jar 包称之为 `fat jar`，因为 jar 包中嵌入了除 java 虚拟机以外所有依赖，故此得名。
由于 `fat jar` 是一个 all-in-one jar 包，所以只需要 java 虚拟机环境就可以直接通过 `java -jar app.jar` 直接运行。

**pipeline.yml**
```yaml{10,14}
version: '1.1'

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

### Gradle Distributions Tar/Zip
TODO
### Tomcat
TODO

## 打包加速

### Gradle

自带 gradle cache node，默认开启

TODO: 详细介绍

### caches 加速

例子:

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

#### 说明

`/root/.m2/repository` 目录是 linux 中 maven 本地仓库的地址，缓存过后就可以进行加速构建

#### 详细 caches 文档 

[actions-caches](../actions/#用户手册)

## 部署运行

### openjdk

### Tomcat

## JVM 调优

### 平台默认调优

### 自定义调优

## JVM 诊断

### Arthas

使用平台提供的运行容器，则已安装了 arthas。

arthas安装路径为 /arthas-boot.jar,可以在根目录通过java -jar arthas-boot.jar启动

通过阅读用户手册，学习使用：[Arthas 用户文档](https://alibaba.github.io/arthas/)

### Greys

使用平台提供的运行容器，则已安装了 greys。

https://github.com/oldmanpushcart/greys-anatomy

### Java Dump

TODO

## 远程调试 & 热更新

平台提供了 VPN 的方式，支持本地远程连接平台上运行的服务，VPN 使用方式参见：TODO

为开启远程调试，需要添加 JAVA_OPTS 变量配置，配置为：
```bash
JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
```
配置方式在：
> DevOps 平台 -> 项目 -> 应用 -> 应用设置 -> 部署配置 -> 环境变量

此外，需要使用本地 IDE 进行连接，具体方式：

先在平台找到要调试的容器 ip，入口

> DevOps 平台 -> 项目 -> 应用 -> 部署中心 -> 部署总览 -> 容器列表

获取到容器 ip 后，再在 IDE 新建 remote 配置：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/07/03/8a24cd50-08d6-45a1-90ee-f978ce04a829.png)

## 平台问题排查

### 打包慢
TODO

### 启动失败
TODO
