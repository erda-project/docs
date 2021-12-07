# IaC

## What is IaC
IaC, that is, infrastructure as code. According to the definition provided by Wikipedia, the infrastructure in IaC broadly refers to the infrastructure of the IaaS layer, including physical servers, virtual machines and related resource definitions. As code indicates that the configurations should be put in VCS for management.

Under the general trend of cloud services, the concept of infrastructure is no longer limited to the IaaS layer. In the cloud-native era, developers focus more on applications, that is, application-centric. The widespread implementation and acceptance of continuous integration, continuous deployment and DevOps concepts require higher autonomy in deployment and O&M of product teams. It is far from enough for developers to just write the code well, as they should also be responsible for application deployment and O&M.

The appearance of Docker makes image delivery the standard for most application delivery. Therefore, the application needs a file to define how to compile the code into an image, which is usually a Dockerfile.

At the same time, the popularity of the PaaS platform makes developers even need not pay attention to Dockerfile, as the platform can automatically detect and select the appropriate way to build by the application directory structure and feature files, and this process of code compilation and image building is called BuildPack. Besides, some checks of code quality and compliance are required before compilation, declared by a process description file. There will be different ways to declare on different PaaS platforms.

## How Erda Implements IaC
Erda is an application-centric enterprise-level one-stop digital PaaS platform, and DOP is an application-centric one-stop DevOps platform.

Here, you can define the entire CI/CD process of the application by pipeline.yml, which is a part of the application infrastructure. Also, you can describe the microservice architecture with a declarative erda.yml, including the dependencies among microservices and the dependencies of middleware.

The platform abstracts applications at the beginning, to make it deployable on any platform (including K8s, DC/OS, etc.) and shields some details from developers. Thus the two files are necessary when deploy applications on Erda.

In addition, the platform supports defining API description files in the .erda directory to realize the full life cycle management of APIs.

After committing these infrastructures as code, the platform will run continuous integration and continuous delivery based on these configurations, and deploy the application automatically.

Part of erda.yml is as follows:

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/5decdb97-f37a-470e-92d2-97fef36cc782.png)

Part of pipeline.yml is as follows:

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/482070a2-55d0-40d5-8379-931b3479daf4.png)

If your application is a standard product, IaC can simplify its delivery. You only need to push the code repository to that of the new application and run the pipeline, so that the complete application is delivered to the new environment of customer. Developers carry out customized development in the new application and commit changed code for version management when the application infrastructure changes.
