# Deploy Based on Git Source Code

Before you begin, please confirm that you have finished [project and application creation](../../../quick-start/newbie.html#join-a-project).

:::tip Tips

Assuming that the project is named erda-test and the application is named java-demo. The Git repository address below will contain these two names.

:::

## Prepare Code Sample

It is a simple web service based on Spring Boot Web Service, with its code hosted on [GitHub](https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git).

:::tip Tips

Erda supports any programming language and framework, including but not limited to Java and Spring Boot.

:::

### Download to the Local

```bash
git clone https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git
```

### Push to the Platform

Erda has a built-in Git code repository based on the Git protocol, that allows you to complete the entire process from development to deployment without relying on external repositories (such as GitLab).

Go to **My Application > Select Application > Source > Repo Address** to view the address of remote repository.

```bash
git remote add erda http://dice.dev.terminus.io/wb/erda-test/java-demo
git push -u erda --all
git push -u erda --tags
```

After code pushing, you can view the detailed code information.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/392ca0d0-e828-4cd8-a78c-f44fe958efc3.png)

## Define Pipeline

Add configuration files, pipeline.yml and erda.yml, to the project.

### pipeline.yml

pipeline.yml is a configuration file that describes pipeline from compilation, building to deployment, generally consists of four stages, executed in the following order:

1. Git pull.
2. Compilation and building for Docker image.
3. Artifact release.
4. Artifact deployment.

The four stages can be executed as the following actions:

1. [Git-Checkout](https://www.erda.cloud/market/action/git-checkout)
2. [Java](https://www.erda.cloud/market/action/java)
3. [Release](https://www.erda.cloud/market/action/release)
4. [Erda](https://www.erda.cloud/market/action/dice)

:::tip Tips

The four stages listed here are for basic configuration. You can add more stages as needed such as unit testing.

In addition, stage does not have a one-to-one relationship with action but one-to-many, as multiple actions can be executed in parallel in a stage.

:::

An example of pipeline.yml for this project is as follows. For more information, see [pipeline.yml](../../guides/reference/pipeline.html).

```yaml
version: "1.1"
stages:
- stage:
  - git-checkout:

- stage:
  - java:
      alias: java-demo
      # Caching the corresponding directory will speed up the next build.
      caches:
        - path: /root/.m2/repository
      params:
        build_type: maven
        # The working directory for packaging, usually the path of the root pom.xml.
        # ${git-checkout} means to reference the output from the previous stage process, or use an alias if there is one.
        workdir: ${git-checkout}
        # The packaged artifact is generally a JAR file and fill in the relative path compared to workdir. The file is required, otherwise an error will occur.
        target: ./target/docker-java-app-example.jar
        # Run the container required by target (such as JAR). For example, the packaged artifact here is the fat JAR of spring-boot, so spring-boot container is used.
        container_type: spring-boot

- stage:
  - release:
      params:
        dice_yml: ${git-checkout}/dice.yml
        image:
          java-demo: ${java-demo:OUTPUT:image}

- stage:
  - dice:
      params:
        release_id: ${release:OUTPUT:releaseID}
```

### erda.yml

erda.yml is a configuration file that describes the service architecture of an application, the configuration of resources such as CPU and memory and the dependency of service plugins.

An example of erda.yml for this project is as follows. For more information, see [erda.yml](../../guides/reference/erda-yaml.html).

```yaml
version: "2.0"
services:
  java-demo:
    ports:
      - port: 8080
        expose: true
    resources:
      cpu: 0.2
      mem: 512
    deployments:
      replicas: 1
```

### Commit Files

Commit the two YAML files to the code repository of the platform.

```bash
git add .
git commit -m "add pipeline.yml and erda.yml"
git push erda feature/demo
```

:::tip Tips

The prefix of the branch committed to the remote repository is `feature/*`, which directly determines the deployment environment of the application.

:::

## Run Pipeline

1. On the **Pipeline** page, select the `feature/demo` branch to add a new pipeline.
2. It is pending for execution after analysis. Click the execution icon in the upper right corner to run it.
3. During the process, you can view the status of each step in real time and click the log icon to check the execution information of the corresponding node.


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/d1fa0a55-bd1a-4cbb-9256-8fa6ad9602da.png)

## View Deployment Results

After building and deployment, you can view the runtime of application instance successfully deployed in **Environments**. Click the runtime for more operations of [application management](../../guides/deploy/management.html), such as domain configuration and instance scaling.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/97bf3730-127c-43ba-b8c4-b8b3f021eaf4.png)
