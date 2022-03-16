# Build Java Applications More Flexibly

## Maven

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
              # To execute custom packaging commands, you can fill in any Linux commands.
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
                Service name in dice.yml:
                  image: registry.erda.cloud/erda/terminus-openjdk:v11.0.6
                  copys:
                    # Copy the JAR package packaged by java-build
                    - ${java-build:OUTPUT:buildPath}/target/jar package name:/target/jar package name
                    # Copy erda monitoring files
                    - ${java-build:OUTPUT:buildPath}/spot-agent:/
                    # ${java-build:OUTPUT:JAVA_OPTS} is the corresponding monitoring command, which is essentially -javaagent:/xxx.jar
                  cmd: java ${java-build:OUTPUT:JAVA_OPTS} -jar /target/jar package name

    - stage:
        - dice:
            params:
              release_id: ${release:OUTPUT:releaseID}
```

:::tip Tips

To specify the maven setting.xml file, change `build_cmd` to `mvn package -s setting.xml`.

:::

## Gradle

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
              # To execute custom packaging commands, you can fill in any Linux commands.
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
                # Multiple
                Service name in dice.yml:
                  image: registry.erda.cloud/erda/terminus-openjdk:v11.0.6
                  copys:
                    - ${java-build:OUTPUT:buildPath}/build/jar package path/jar package name:/target/jar package name
                    - ${java-build:OUTPUT:buildPath}/spot-agent:/
                  cmd: java ${java-build:OUTPUT:JAVA_OPTS} -jar /target/jar package name
                Service name in dice.yml:
                  image: registry.erda.cloud/erda/terminus-openjdk:v11.0.6
                  copys:
                    - ${java-build:OUTPUT:buildPath}/build/jar package path/jar package name:/target/jar package name
                    - ${java-build:OUTPUT:buildPath}/spot-agent:/
                  cmd: java ${java-build:OUTPUT:JAVA_OPTS} -jar /target/jar package name

    - stage:
        - dice:
            params:
              release_id: ${release:OUTPUT:releaseID}
```

## Tomcat
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
              # To execute custom packaging commands, you can fill in any Linux commands.
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
                Service name in dice.yml:
                  image: tomcat:jdk8-openjdk-slim
                  copys:
                    - ${java-build:OUTPUT:buildPath}/target/war package name.war:/usr/local/tomcat/webapps
                    # Copy erda monitoring files
                    - ${java-build:OUTPUT:buildPath}/spot-agent:/
                    # Declare tomcat JAVA_OPTS. The environment variable ${java-build:OUTPUT:JAVA_OPTS} is the corresponding monitoring command with the value similar to -javaagent:/xxx.jar
                  cmd: export JAVA_OPTS="${java-build:OUTPUT:JAVA_OPTS}" && mv /usr/local/tomcat/webapps/war package name.war /usr/local/tomcat/webapps/ROOT.war && /usr/local/tomcat/bin/catalina.sh run

    - stage:
        - dice:
            params:
              release_id: ${release:OUTPUT:releaseID}
```

The parameters are as follows:

**Java-Build JAR Package**

* `params:build_cmd`: Declares various building commands or pre-execute installation commands.
* `params:jdk_version`: Declares specific version of JDK, currently with only 8 and 11 supported.
* `params:workdir`: Declares building commands executed in a specific directory.
* `java-build`: Allows users to customize building commands to achieve high customization and release JAR package.

**Release**

* `params:services`: Declares the building process of multiple services, similar to the declaration of `dockerfile`.
* `params:services[]: service name in dice_yaml`: The `service` name in corresponding `erda.yml`, declares each of them.
* `params:services[]: service name in dice_yaml: image`: Equal to the `FROM image` in `dockerfile`, and users can declare their own runtime environment.
* `params:services[]: service name in dice_yaml: copys[]`: Equal to `copy` in `dockerfile`, and users can copy files to their own runtime environment.
* `params:services[]: service name in dice_ yaml: cmd`: Equal to `cmd` in `dockerfile`, and users can declare their own startup commands.
* `release`: Allows users to achieve highly customized building via `pipeline.yml`, rather than write `dockerfile` in the root directory of the project.

::: tip Tips
`${java-build:OUTPUT:buildPath}` is the build path of `java-build`.

`${java-build:OUTPUT:JAVA_OPTS}` = `-javaagent:/spot-agent/spot-agent.jar`
:::



