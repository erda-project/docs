# Use SonarQube in Erda

SonarQube (formerly Sonar) is an open-source system for code quality management that offers reports on duplicated code, coding standards, unit tests, code coverage, code complexity, comments, bugs, and security recommendations.

This article will introduce how to use Sonar in the Erda project, providing a code quality management system for your application.

## Preparations

Before you start, you need to gain a basic understanding of Erda, which offers features centered on [Projects and Apps](../../../quick-start/premise.html), so create a [Project](../../../quick-start/newbie.html#Join-a-Project) first and assign resources to it (see [Resource Quota](../../../dop/guides/deploy/resource-management.html#Manage-Quota) for details).

::: tip Tips
Please ensure that the resources allocated meet the application build requirements to avoid build failures due to insufficient resources. See [Resource Quota](../../../dop/guides/deploy/resource-management.html) for details.
:::

If you want to create a new project, it is recommended to read the following documents as a priority:

1. [Project and Application Creation](../../../quick-start/newbie.html#Join-a-Project)
2. [Project Resource Management](../../../dop/guides/deploy/resource-management.html)

If you have questions about how to manage project resources, it is recommended to read the following documents as a priority:

1. [Manage Quota](../../../dop/guides/deploy/resource-management.html#Manage-Quota)
2. [Node Labels](../../../cmp/guide/cluster/cluster-node-labels.html)

## Get an Available SonarQube Service

First, you need an available SonarQube service for later operations. You can choose from other vendors or build your own one. SonarQube also officially offers the option of SaaS services, and you can quickly get an available instance on its [Official Website](https://sonarcloud.io/).

This chapter offers several common build options for you. If you are short of time, here is another solution, the "temporary Sonar instance". With Erda's ability to release applications with a single click, it can start Sonar as an application via pipeline.yml and dice.yml.

:::warning Warning
This "temporary Sonar instance" is not available for real application scenarios and is for reference only.
:::

You can read the following selectively as needed:

1. [SonarCloud](#SonarCloud)
2. [Existing self-built Sonar service](#Existing-Self-Built-Sonar-Service)
3. [Temporary Sonar instance](#Temporary-Sonar-Instance) (not available for real application scenarios)

### SonarCloud

SonarCloud is a code inspection platform provided by Sonar and is free for open-source projects. Please see the [SonarCloud Website](https://sonarcloud.io/) for details.

### Existing Self-Built Sonar Service

There are several ways to build your own Sonar services:

1. Manually build and maintain Sonar services. SonarQube is now open source, and can be downloaded from [GitHub](https://github.com/SonarSource/sonarqube).
2. Build [Official Images](https://hub.docker.com/_/sonarqube) of Sonar service via Docker container.
3. Build [Helm Chart](https://docs.sonarqube.org/latest/setup/sonarqube-on-kubernetes/) of Sonar service in K8s cluster via Helm.


### Temporary Sonar Instance

#### Add Application

To quickly build a Sonar service, create a new application under the project for Sonar deployment. For example, create a new application named sonarqube (this example is for reference only and is not available in production environments).

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/20/8f911ff6-19b8-4ffe-a5c8-024c02891735.png)

After the application is created, you need to write a pipeline.yml and dice.yml to quickly deploy the Sonar service, with pipeline.yml used to deliver SonarQube service artifacts (see [pipeline.yml](../../../dop/concepts/pipeline.html) for details) and dice.yml to run the service declaratively (see [dice.yml](../../../dop/concepts/dice-yaml.html) for details).

::: tip Tips
You can also go to [GitHub](https://github.com/chengjoey/erda-sonarqube) to get code samples directly, without debugging from scratch.
:::

#### Write pipeline.yml

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
          description: code repository clone
  - stage:
      - release:
          alias: release
          params:
            dice_yml: ${{ dirs.git-checkout }}/dice.yml
  - stage:
      - dice:
          alias: dice
          description: to deploy application services on Erda
          params:
            release_id: ${{ outputs.release.releaseID }}
```

#### Write dice.yml

The pipeline above can successfully deliver an artifact, then the dice.yml is required to describe Sonar deployment.

You can go to [SonarQube](https://hub.docker.com/_/sonarqube) to choose the target version and then replace the image, or use the available version 8.9.6 directly.

```yaml
version: '2.0'
services:
  sonar:
    image: registry.cn-hangzhou.aliyuncs.com/dice-third-party/sonar:8.9.6
    ports:
      - port: 9000
        expose: true
    resources:
      cpu: 0.5
      mem: 2048
    deployments:
      replicas: 1
```

You can modify the CPU and memory resources as needed.

#### Run Pipeline

After selecting the Sonar version and completing the pipeline, run the pipeline to build and deploy SonarQube.

To specify the admin password and token for Sonar, go to **App Settings > Environment Settings** to set parameters.

* SONAR_ADMIN_PASSWORD: Sonar admin password

* SONAR_ADMIN_TOKEN: Sonar admin token


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/20/4f41b7fc-2229-4223-85d9-f8cfc011dbe4.png)

Click to run the pipeline and wait for the deployment to complete.

#### Test Sonar

After deployment, you can click **Set Domain** in deployment to enable Sonar service.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/20/63eaa580-9ecd-45c7-9cbe-8e000f054e99.png)

Go to this Sonar address to see a Sonar service.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/6e2e8eba-08c0-43d3-b322-cdd195b486be.png)

You have now completed a self-built SonarQube service.

## Create Project and Authorization Credential (Token) in SonarQube

Once the service is ready, create a new project and token in SonarQube for later code checks.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/62537862-8e97-41a4-bfff-4d02b02852b1.png)

Create a new project as shown below, and then generate a token. See the [Sonar Documentation](https://docs.sonarqube.org/latest/) for details.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/1396bc2a-b8e6-4130-92c8-b464ebcc01b8.png)

## Configure Sonar for Your Business Application

Now you have completed all the prerequisites for the code quality check. Select the application that requires code checking and go to **Settings > Sonar Settings** to configure Sonar information.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/20/145b39b3-10ad-4002-a589-a8d9506272bd.png)

Then add a new pipeline, select the Sonar action (2.0) and run it.

An example of a pipeline is as follows:

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
          version: "1.0"
          params:
            branch: master
            depth: 1
  - stage:
      - sonar:
          alias: sonar
          version: "2.0"
          params:
            # the application code for sonar analysis is specified here 
            code_dir: ${{ dirs.git-checkout }}
            # false by default
            must_gate_status_ok: false
```

:::tip Tips

* Typically, operations such as packaging and deployment are only allowed when the code check status is OK. So you can set the parameter `must_gate_status_ok` as true. For more information on the quality gate, see the [Official Documentation](https://docs.sonarqube.org/latest/user-guide/quality-gates/).
* Please select version 2.0 of the Sonar action to use the custom SonarQube service. If no version is specified, the default is version 1.0 (see [Code Quality](../../../dop/guides/qa-and-testing/sonar-report.html) for details).

:::

After successful execution, the Sonar action will return the Sonar project address.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/20/ede22a18-e0a2-46a5-a1e0-e4ae72008e1c.png)

Go to the address to see the detailed code quality reports.

## View Code Quality Reports

Upon successful execution of the pipeline, the Sonar action will return the Sonar service address, where you can see quality reports of the application.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/4e80257c-2790-4d6a-8602-255b400a3b23.png)

The report contains the following:

* Bug
* Code smell
* Coverage
* Duplicated code
* Others

The Sonar quality report analyzes projects from reliability, security, maintainability, coverage, repeatability and other aspects, and sets five risk levels from A to E, which helps you keep a close eye on the code quality of your projects. For more information, see the [Official Documentation](https://docs.sonarqube.org/latest/analysis/overview/).
