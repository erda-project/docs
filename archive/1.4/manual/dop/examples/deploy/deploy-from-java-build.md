# 更灵活地自定义构建 Java 应用

## Maven 构建

```yaml
version: "1.1"
stages:
    - stage:
        - git-checkout:
            params:
              depth: 1

    - stage:
        - java-build:
            version: "1.0"
            params:
              # 执行自定义打包命令，可任意填写 linux 命令
              build_cmd:
                - mvn package
                - echo "build success"
              jdk_version: 8
              workdir: ${git-checkout}

    - stage:
        - release:
            params:
              dice_yml: ${git-checkout}/dice.yml
              services:
                dice.yml中的服务名:
                  image: registry.erda.cloud/erda/terminus-openjdk:v11.0.6
                  copys:
                    # 拷贝 java-build 打包出来的 jar 包
                    - ${java-build:OUTPUT:buildPath}/target/jar包的名称:/target/jar包的名称
                    # 拷贝 erda 监控文件
                    - ${java-build:OUTPUT:buildPath}/spot-agent:/
                    # ${java-build:OUTPUT:JAVA_OPTS} 是对应的监控命令，本质就是 -javaagent:/xxx.jar 
                  cmd: java ${java-build:OUTPUT:JAVA_OPTS} -jar /target/jar包的名称

    - stage:
        - dice:
            params:
              release_id: ${release:OUTPUT:releaseID}
```

## Gradle 构建
```yaml
version: "1.1"
stages:
    - stage:
        - git-checkout:
            params:
              depth: 1
    - stage:
        - java-build:
            version: "1.0"
            params:
              # 执行自定义打包命令，可任意填写 linux 命令
              build_cmd:
                - ./gradlew bootJar
                - echo "build success"
              jdk_version: 8
              workdir: ${git-checkout}
    - stage:
        - release:
            params:
              dice_yml: ${git-checkout}/dice.yml
              services:
                # 多个
                dice.yml中的服务名:
                  image: registry.erda.cloud/erda/terminus-openjdk:v11.0.6
                  copys:
                    - ${java-build:OUTPUT:buildPath}/build/jar包的路径/jar包的名称:/target/jar包的名称
                    - ${java-build:OUTPUT:buildPath}/spot-agent:/
                  cmd: java ${java-build:OUTPUT:JAVA_OPTS} -jar /target/jar包的名称
                dice.yml中的服务名1:
                  image: registry.erda.cloud/erda/terminus-openjdk:v11.0.6
                  copys:
                    - ${java-build:OUTPUT:buildPath}/build/jar包的路径/jar包的名称:/target/jar包的名称
                    - ${java-build:OUTPUT:buildPath}/spot-agent:/
                  cmd: java ${java-build:OUTPUT:JAVA_OPTS} -jar /target/jar包的名称

    - stage:
        - dice:
            params:
              release_id: ${release:OUTPUT:releaseID}
```

## Tomcat 构建
```yaml
version: "1.1"
stages:
    - stage:
        - git-checkout:
            params:
              depth: 1

    - stage:
        - java-build:
            version: "1.0"
            params:
              # 执行自定义打包命令，可任意填写 linux 命令
              build_cmd:
                - mvn clean package
                - echo "build success"
              jdk_version: 8
              workdir: ${git-checkout}

    - stage:
        - release:
            params:
              dice_yml: ${git-checkout}/dice.yml
              services:
                dice_yml中的服务名称:
                  image: tomcat:jdk8-openjdk-slim
                  copys:
                    - ${java-build:OUTPUT:buildPath}/target/war包的名称.war:/usr/local/tomcat/webapps
                    # 拷贝 erda 监控文件
                    - ${java-build:OUTPUT:buildPath}/spot-agent:/
                    # 声明 tomcat JAVA_OPTS, 环境变量 ${java-build:OUTPUT:JAVA_OPTS} 是对应的监控命令，值就是类似于 -javaagent:/xxx.jar 
                  cmd: export JAVA_OPTS="${java-build:OUTPUT:JAVA_OPTS}" && mv /usr/local/tomcat/webapps/war包的名称.war /usr/local/tomcat/webapps/ROOT.war && /usr/local/tomcat/bin/catalina.sh run

    - stage:
        - dice:
            params:
              release_id: ${release:OUTPUT:releaseID}
```

具体参数说明如下：

**Java-Build 构建 JAR 包**

* `params:build_cmd`：声明各类构建命令或前置执行部分安装命令。
* `params:jdk_version`：声明使用具体版本的 JDK 构建，目前仅支持 8 和 11。
* `params:workdir`：声明构建命令在具体目录下执行。
* `java-build`：本意在于使用户自定义构建命令，从而达到高度定制化，最终产出 JAR 包。  

**Release 配合使用**

* `params:services`：声明多个服务的构建过程，类似 `dockerfile` 文件的声明。
* `params:services[]:dice_yaml中的服务名称`：对应 `erda.yml` 中 `services` 服务名称，若有多个即声明多个
* `params:services[]:dice_yaml中的服务名称:image`：等于 `dockerfile` 中的 `FROM image`，用户可声明自己的运行环境。
* `params:services[]:dice_yaml中的服务名称:copys[]`：等于 `dockerfile` 中的 `copy`，用户可将文件拷贝至自己的运行环境。
* `params:services[]:dice_yaml中的服务名称:cmd`：等于 `dockerfile` 中的 `cmd`，用户可声明自己的服务启动命令。
* `release`：本意在于使用户无需在项目根目录下编写 `dockerfile` 文件，通过 `pipeline.yml` 文件完成高度定制化构建的需求。   

::: tip 提示
`${java-build:OUTPUT:buildPath}` 即 `java-build` 构建的路径。
`${java-build:OUTPUT:JAVA_OPTS}` = `-javaagent:/spot-agent/spot-agent.jar`
:::   



