# Deploy Based on Docker Image

Deploy based on Docker image is essentially the same as [Deploy Based on Git Source Code](deploy-from-git.html). The difference is that the former does not require source code to build image.

Before you begin, please confirm that you have finished [project and application creation](../../../quick-start/newbie.html#join-a-project).

:::tip Tips

pipeline.yml and dice.yml are still required for deployment based on Docker image (the image name will be written directly into the dice.yml file), so a Git repository will be provided for storing the two YAML files.

Assuming that the project is named erda-test and the application is named java-demo. The Git repository address below will contain these two names.

:::

## Image Sample

```yaml
nginx:latest
```

## Configure Pipeline

#### pipeline.yml

The pipeline will be triggered for automated deployment and consists of three stages as follows:

1. Git pull of two YAML files.
2. Artifact release via dice.yml.
3. Artifact deployment.

The three stages can be executed as the following actions:

1. [Git-Checkout](https://www.erda.cloud/market/action/git-checkout)
2. [Release](https://www.erda.cloud/market/action/release)
3. [Erda](https://www.erda.cloud/market/action/dice)

An example of pipeline.yml is as follows:

```yaml
version: "1.1"

stages:
- stage:
  - git-checkout:

- stage:
  - release:
      params:
        dice_yml: ${git-checkout}/dice.yml

- stage:
  - dice:
      params:
        release_id: ${release:OUTPUT:releaseID}
```

#### dice.yml

An example of dice.yml is as follows. Configurations such as port, CPU, memory resources and health check need to be modified. For details, see [dice.yml](../../guides/reference/dice-yaml.html).

```yaml{4}
version: "2.0"
services:
  nginx:
    image: "nginx:latest"
    resources:
      cpu: 0.1
      mem: 128
    deployments:
      replicas: 1
    ports:
      - port: 80
        expose: true
    health_check:
      http:
        port: 80
        path: "/"
        duration: 30
```

#### Commit Files

Commit the two YAML files to the code repository of the platform.

```bash
git add .
git commit -m "add pipeline.yml and dice.yml"
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

After building and deployment, you can view the runtime of application instance successfully deployed in **Deployments**. Click the runtime for more operations of [application management](../../guides/deploy/management.html), such as domain configuration and instance scaling.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/97bf3730-127c-43ba-b8c4-b8b3f021eaf4.png)

:::tip Tips

* Since the image for deployment can be specified by users at will, some third-party images are not tuned for the cluster environment, which are unstable for operation.

* As third-party images are lack of monitoring components, some monitoring functions are unavailable. Please install monitoring components by yourself if necessary.

* Please set time zone correctly for third-party images, otherwise issues such as log disorder may occur.

:::
