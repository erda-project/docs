# Speed up Builds with Nexus

## Push JAR Package to Private Server

### Upload Maven settings.xml to the Platform

Go to **DevOps Platform > Applications > Select Application > Settings > Pipelines > Variable Configuration > Select Environment**.

Click **Add Variable**, select the type as **File** and enable encryption, then upload settings.xml and define the variable name as `MAVEN_SETTING_FILE`.

::: warning Warning

* Encryption is required as the file includes sensitive information such as passwords.
* To avoid XXE attacks, the platform prohibits uploading XML files. XML files can be changed to settings_xml files (Linux system does not distinguish file types).

:::

An example of settings.xml is as follows:

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

### Configure Push Address of pom.xml

Add the following configuration to pom of the corresponding project, otherwise it cannot be pushed.

```xml
<distributionManagement>
    <repository>
        <id>terminus</id>    <!-- server.id configured in settings.xml -->
        <name>Releases</name>
        <url>http://private server address/repository/releases</url>  <!-- release private server address -->
    </repository>
    <snapshotRepository>
        <id>terminus</id>
        <name>Snapshots</name>
        <url>http://private server address/repository/releases</url>  <!-- snapshot private server address -->
    </snapshotRepository>
</distributionManagement>
```

### Configure Pipeline to Upload JAR Package

`MAVEN_SETTING_FILE` is the variable name configured above.

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

Add configuration of continuous integration (CI) if automated building is required.

```yaml
on:
  push:
    branches:
      - develop # Continuous integration
```

::: tip Tips
401 in Maven indicates incorrect password.

405 in Maven possibly indicates incorrect private server address, as some private server addresses cannot be pushed, such as public.
:::

## Push JAR Package to Private Server (Gradle)

### Configure Password of Nexus Private Server

Go to **DevOps Platform > Applications > Select Application > Settings > Pipelines > Variable Configuration > Select Environment**.

Click **Add Variable**, select the type as **Value** and enable encryption, then configure the following variables:

- NEXUS_USERNAME
- NEXUS_PASSWORD

::: warning Warning
Encryption is required as the file includes sensitive information such as passwords.
:::

### Configure Push Address of build.gradle

Add the following configuration to build.gradle of the corresponding project, otherwise it cannot be pushed. For more information, see [Configuration of build.gradle](https://docs.gradle.org/current/userguide/publishing_maven.html).

```groovy
publishing{

    ...

    repositories {
        maven {
            // change URLs to point to your repos, e.g. http://my.org/repo
            def releasesRepoUrl = "http://private server address/repository/releases"
            def snapshotsRepoUrl = "http://private server address/repository/snapshots"
            url = version.endsWith('SNAPSHOT') ? snapshotsRepoUrl : releasesRepoUrl
            credentials {
                username = System.getenv("NEXUS_USERNAME")
                password = System.getenv("NEXUS_PASSWORD")
            }
        }
    }
}
```

### Configure Pipeline to Upload JAR Package

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

Add configuration of continuous integration (CI) if automated building is required.

```yaml
on:
  push:
    branches:
      - develop # Continuous integration
```

::: tip Tips
401 in Maven indicates incorrect password.

405 in Maven possibly indicates incorrect private server address, as some private server addresses cannot be pushed, such as public.

:::
