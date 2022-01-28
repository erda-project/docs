# First Use

This article aims to help you understand the basic process of Erda and get started quickly by a demo case of software development life cycle.

## Preliminary Knowledge
1. Understand the operating mechanism and usage of container

   Erda is a one-stop cloud native PaaS platform with its core as container. Mastering the operating mechanism and usage of container helps you better understand the platform design and operation.

2. Know the basic concepts of Java, such as Maven building and Java-based microservice deployment

   The following will take a Java program as an example, and learn the basic concepts of Java in advance helps you get started quickly.

3. This article takes the following two microservices as examples. Please get the codes in advance for further use.

   * [Provider: Provide internal interface services](https://github.com/erda-project/tutorials/tree/master/microservice/springcloud/provider)
   * [Consumer: Provide services to the outside by the internal interface](https://github.com/erda-project/tutorials/tree/master/microservice/springcloud/consumer)

## Installation

Erda supports installation in various ways:

- [Deploy via Docker Compose](../install/docker-install.md): Only suitable for trial environment without Kubernetes where you can get experience with Erda locally.
- [Minimal Mode Based on Helm](../install/helm-install/helm-install-demo.md): Suitable for scenarios where Erda is deployed in minimal mode on Kubernetes cluster.

[*erda.cloud*](https://www.erda.cloud/) is also available. Register an account and get started.

## Environment Preparation
:::tip Tips
If you have already joined a project, skip this chapter.
:::

### Join an Organization

* For self-built platform, log in to the admin account and create an organization.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/39ce743f-2299-41f3-98e0-333e02d80996.png)

   ::: tip Tips
   If you do not have an admin account, please contact the platform admin.
   :::

* For erda.cloud, log in to your account as a new user to create an organization.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/947e1f4d-7451-4992-9396-1d6b8b8ba17c.png)

   Or choose public organizations to view detailed project information.

### Join a Project
:::tip Tips
Only the organization admin can create projects. Please confirm that you have the permissions of organization admin, or contact the organization admin.
:::

Please go to **Org Center > Projects > Add Project** to create a project.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/44715a5a-31e8-46f5-b92d-1c5637c167cc.png)

:::tip Tips
If you have no cluster, see [Cluster Management](../cmp/guide/cluster/management.html) to add one.
:::

The subsequent operations mainly involve the two functions:
* DevOps
   * Collaboration
   * Code hosting
   * CI/CD
   * API management
   * Testing (including manual testing and automated testing)
* Microservice governance
   * Application monitoring
   * API gateway
   * Registration center & Configuration center

The following case will show the entire process and cover most functions. Before you start, please reconfirm that your project has sufficient cluster resources (approximately 2 core of CPU and 8 GB of memory are required). For details, see [Cluster Management](../cmp/guide/cluster/management.html).

## Case of Software Development Life Cycle

Generally, the life cycle of a software project contains five stages listed below with the corresponding functions of Erda:
1. Requirement analysis: Collaboration
2. Architecture design: API management
3. Development: Code hosting + CI/CD
4. Quality assurance: Automated testing + Application monitoring (microservice governance)
5. Long-term operations: Microservice governance

This article will follow the process above and take a virtual customer case (a high-availability blog site) for demonstration:
1. Requirement analysis: Collaboration, including requirement collection, follow-up and realization
2. Development: Code hosting + CI/CD, including building, deployment and management
3. Quality assurance: Automated testing + Application monitoring (microservice governance)

### Requirement Analysis

Research and development is a set of activities that need collaboration of different roles. As the number of team members grows, collaboration systems or tools are required for working instead of verbal communication.

If you are an individual developer, it is also recommended that you read this chapter. Collaboration tools can not only solve the communication problems caused by team expansion, but also help developers effectively record and manage individual work.

For this case, complete the following steps:

1. Analyze and abstract requirements. Go to **DevOps Platform > Joined Projects > Project > Project Collaboration > Requirement > Create Requirement** to add a requirement.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/35f286fc-975f-41ac-ba72-ae8df0aa0df0.png)

   Generally, the product manager will complete the requirement information including its detailed description and acceptance criteria, etc.

2. The requirement is listed in **Backlog** initially and will be determined whether to be moved to **Iteration** by a review.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/bbfa6a61-b809-4bad-8c20-0b82c889fa6e.png)

   Assuming that the requirement has been reviewed and included in the 1.0 iteration.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/e2236f81-11f3-4bed-b883-6959be0efb38.png)

3. The team leader will split the requirement into multiple tasks, which are related issues to the requirement.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/05dd7fab-9743-41b2-878c-b6a251de012f.png)

   **Relate to Merge Request** in tasks and bugs connect R&D and collaboration closer. For details, see [Relation](../dop/guides/collaboration/issue.html#Relation).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/58172383-b139-49d9-abf3-3a82df286abf.png)

   The project manager can see the efficiency and bottlenecks of collaboration by efficiency measure.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/07266b60-0721-4bf1-90ad-774addd1e8ee.png)

### Development

:::tip Tips
The architecture design mentioned in this case is only for reference.
:::

Assuming that the team leader has finished the architecture design as follows:
1. Design two microservices Service and Web that communicate through Dubbo protocol, and use Zookeeper or other compatible registration center (such as Nacos).
2. Enable two instances for Server to ensure reliability.
3. Use MySQL for data storage and Redis for session and cache storage.

For this design, complete the following steps:

1. Go to **DevOps Platform > Integrated Development > App > Add Application** to create two applications. For more information on applications, see [Application Management](../dop/guides/deploy/management.html).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/71ab030f-b6ac-4f74-b9b9-23fede3f507e.png)

2. After code pushing, create a pipeline.yml, which describes the CI/CD automation process. For details, see [pipeline.yml](../dop/guides/reference/pipeline.html).

   * Complete the CI part:

      ```yaml
      version: "1.1"

      stages:
        - stage:
            - git-checkout:
        - stage:
            - buildpack:
                alias: blog-server
                params:
                  context: ${git-checkout}
                  modules:
                    - name: service
                      path: service
            - buildpack:
                alias: blog-web
                params:
                  context: ${git-checkout}
                  modules:
                    - name: web
                      path: web
      ```

      Submit this file and then add a pipeline.

      ```bash
      git add pipeline.yml
      git commit -m 'add pipeline'
      git push
      ```

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/ce2ede9f-4777-4635-ba2e-6a4f27f3cc0e.png)

      Or just operate by the graphic interface without local pushing.

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/0d4f86fe-923c-4906-8f4c-f71900769ff1.png)

   * Complete the CD part:

      ```yaml
      version: "1.1"
      
      stages:
        - stage:
            - git-checkout:
        - stage:
            - buildpack:
                alias: blog-server
                params:
                  context: ${git-checkout}
                  modules:
                    - name: service
                      path: service
            - buildpack:
                alias: blog-web
                params:
                  context: ${git-checkout}
                  modules:
                    - name: web
                      path: web
        - stage:
            - release:
                params:
                  erda_yaml: ${git-checkout}/erda.yml
                  image:
                    service: ${buildpack:OUTPUT:image-service}
                    web: ${buildpack:OUTPUT:image-web}
        - stage:
            - deploy:
                params:
                  release_id: ${release:OUTPUT:releaseID}
      ```

      Two new steps of release and deploy are added above as well as a new file erda.yml. For details, see [erda.yml](../dop/guides/reference/erda-yaml.html).

      Complete the file and submit the code.

      ```yaml
      services:
        web:
          ports:
            - 8095
          deployments:
            replicas: 1
          resources:
            cpu: 0.5
            mem: 512
            disk: 0
          expose:
            - 8095
        service:
          deployments:
            replicas: 1
          resources:
            cpu: 0.5
            mem: 512
            disk: 0
          ports:
            - 20880
          expose:
            - 20880
      addons:
        mysql:
          plan: "mysql:basic"
          options:
            version: "5.7.23"
        redis:
          plan: "redis:basic"
          options:
            version: "3.2.12"
      ```

      erda.yml needs to be deployed through a Docker image, which is missed above.

      From the example of pipeline.yml, it can be found that the image is compiled during the CI process, as the code is compiled and packaged into a Docker image by buildpack, which is automatically inserted into erda.yml by release and be deployed based on the generated erda.yml.

3. Once the pipeline is executed successfully, you can view the released instances in deployments. For more information on O&M (such as restart, roll back, view logs), see [Application Management](../dop/guides/deploy/management.html).

### Quality Assurance

Quality assurance is involved in the whole R&D process, such as code review, automated testing, manual testing and regression testing. This article will introduce automated testing as an example. For details, see [Code Quality](../dop/guides/qa-and-testing/sonar-report.html).

Assuming that the functions are designed as follows:
1. Article list
2. Click the article to view details
3. Reads increases by one with one click

For this design, complete the following steps:

1. Go to **DevOps Platform > Test > Automated Testing** and create a scene set named **Article**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/b8652d6b-2135-46f7-9def-191e762d3136.png)

2. Create a scene named **Reads**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/66654e89-ba46-4d42-8188-55f8a672132f.png)

3. Add steps in the scene for orchestration.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/3466e515-cde4-4f10-93e4-95aac5c3b106.png)


When the software is released online, you can find and locate problems by tracing, log analysis and alarms, etc. For details, see [Examples of Microservice Governance](../msp/examples/apm/service-dashboard.html). This article only introduces the main features and application scenes briefly.

Go to the microservice platform to view the global topology of the project.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/ec23ac45-c703-4030-b157-38db54efcad3.png)

:::tip Tips

You can enter the microservice platform in the following ways:

1. Select **Microservice Platform** in the left menu bar.
2. Click **Application Monitoring** in deployments.

:::

The global topology can be considered as the entry for daily O&M after the project goes online, from which you can see the traffic and loading. Click the red one to quickly go to the tracing list and locate the problem.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/0fbbb80c-c20d-4484-b5c1-582f217f99b7.png)

You can quickly find the exceptions and trace back to the cause in error analysis.

Each node represents a microservice and click the node for details. 

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/2cf71a65-45a3-4cdb-8e23-d7f22c0006f2.png)
