# 初次使用

本文旨在通过软件研发全生命周期的案例演示，帮助您了解 Erda 平台的基本使用流程，带您快速上手。

## 预备知识
1. 了解容器的运行机制和使用方法

   Erda 是一站式云原生 PaaS 平台，其运行核心便是容器。掌握容器的运行机制和使用方法，可以帮助您更好地了解平台设计及操作。

2. 熟知 Java 的基本概念，例如 Maven 构建、基于 Java 的微服务部署形式等

   下文将以 Java 程序作为案例，了解 Java 的基本概念将有助于您快速上手。

3. 本文将以如下两则微服务代码作为案例，请提前获取便于后续使用。

    * [Provider：提供内部接口服务](https://github.com/erda-project/tutorials/tree/master/microservice/springcloud/provider)
    * [Consumer：消费内部接口对外提供服务](https://github.com/erda-project/tutorials/tree/master/microservice/springcloud/consumer)

## 安装配置

Erda 提供多种快速安装的方式：

- [基于 Docker Compose 部署](../install/docker-install.md) : 仅适用于不具备 Kubernetes 条件的情况下，在本地快速体验 Erda 的场景。
- [基于 Helm 最小化安装](../install/helm-install/helm-install-demo.md)：适用于在 Kubernetes 集群上最小化安装 Erda 的场景。

您也可以选择 [*erda.cloud*](https://www.erda.cloud/)，注册个人账号后即可使用。

## 准备环境
:::tip 提示
若您已加入项目，可跳过本章节。
:::

### 加入组织

* 若您使用的是自建 Erda 平台，请登录 admin 账号，根据界面提示创建组织。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/045ecd84-fe19-47ef-975c-13c7e4c922c2.png)

  ::: tip 提示
  若无 admin 账号，请联系平台管理员处理。
  :::

* 若您使用的是 erda.cloud，作为新用户，您可以登录个人账号自行创建组织。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/227b6df6-2613-4c01-9952-b91d770b0468.png)

  您也可以选择浏览公开组织，查看具体项目信息。

### 加入项目
:::tip 提示
创建项目需由组织管理员操作。请确认您的账号拥有组织管理员权限，或联系组织管理员处理。
:::

请进入 **管理中心 > 项目管理 > 添加项目**，进行项目创建。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/a9a867d9-7887-41e9-93a5-abbd995f9bf0.png)

:::tip 提示
若您没有可选集群，请参见 [集群管理](../cmp/guide/cluster/management.html) 完成集群添加。
:::

加入项目后，您的操作将主要涉及以下两大功能：
* DevOps
    * 协同
    * 代码托管
    * CI/CD
    * API 管理
    * 测试（包括手动测试和自动化测试）
* 微服务治理
    * 应用监控
    * API 网关
    * 注册中心&配置中心

下文案例将进行全流程演示，并覆盖多数功能。为保证操作顺利，请再次确认您的项目已配置集群资源，且资源充足（大约需要 2 核 CPU 和 8 GB 内存），具体设置方式请参见 [集群管理](../cmp/guide/cluster/management.html)。

## 软件研发全生命周期案例

通常情况下，一个软件研发项目的实现包含以下五个阶段，对应 Erda 功能罗列如下：
1. 需求分析：协同
2. 架构设计：API 管理
3. 研发实现：代码托管 + CI/CD
4. 质量保障：自动化测试 + 应用监控（微服务治理）
5. 长期运营：微服务治理

下文将按照以上软件研发全生命周期过程，结合一个虚拟的客户案例（一个高可用的博客网站）展开演示：
1. 需求分析：协同，包括需求的收集、跟进及落地
2. 研发实现：代码托管 + CI/CD，包括软件构建、部署及管理
3. 质量保障：自动化测试 + 应用监控（微服务治理）

### 需求分析

软件研发是一项多人分工、协作的经营活动。当团队人数增长至一定规模时，口头协作已无法满足工作需求，此时便需要借助系统或工具来解决问题。

若您是一位个人开发者，同样建议您阅读本章节内容。协同工具不仅能够解决团队扩充带来的沟通问题，还能够帮助开发者有效记录和管理个人的工作。

针对该案例，您需要完成以下操作：

1. 分析和抽象客户需求，进入 **DevOps 平台 > 项目协同 > 需求 > 新建需求**，将需求录入协同。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/3bbfefc3-83f1-487f-8533-625aeeb9b4ac.png)

   通常情况下，产品经理（PD）会将该需求内容补充完整，包括详细的需要描述、验收标准等。

2. 需求最初列于 **待处理** 中，迭代开始前将通过评审确定是否放入 **迭代** 进行开发。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/23e895de-6792-43b2-bae2-e3b2ab448bb6.png)

   本案例假设该需求已通过评审，纳入 1.0 迭代开发。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/3a68c406-27e3-4f2e-95d5-f793cfa71236.png)

3. 团队领导（TL）组织团队进行架构设计和任务拆解，拆解的任务即需求的关联事项，可通过需求跟踪进展。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/80fc2c09-4f27-47ad-8d24-3698069173aa.png)

   开发人员可基于不同视角查看各自的任务，也可评论进度或提出异议。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/c02b4611-d450-4481-970b-e38c03cfbba3.png)任务、缺陷中的 **关联合并请求** 能够将研发和协同更紧密地结合起来，具体请参见 [事项关联](../dop/guides/collaboration/issue.html#事项关联)。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/ada01064-4e6b-4ce5-8a5a-759840f3d92e.png)

   项目管理者还可以通过数据统计分析协同的效率和瓶颈。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/4b42149a-2032-4595-a322-fe79cb345aac.png)

### 研发实现

:::tip 提示
本案例中涉及的软件架构设计无法作为真实研发活动的指导，仅供快速入门参考。
:::

在本案例中，假设 TL 已完成架构设计如下：
1. 设计两个微服务 Service 和 Web，通过 Dubbo 协议通信，使用 Zookeeper 或其他兼容的注册中心（例如 Nacos）。
2. Service 启用两个实例以保证可靠性。
3. 使用 MySQL 业务数据存储，Redis 用于存放 Session 和缓存。

针对该设计，您需要完成以下操作：

1. 进入 **DevOps 平台 > 应用列表 > 新建应用**， 创建两个应用。关于应用的更多信息，请参见 [应用管理](../dop/guides/deploy/management.html)。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/2baf5bfc-ec6d-479e-840d-bb7c6d117103.png)

2. 完成代码推送后，创建 pipeline.yml。pipeline.yml 是用于描述 CI/CD 自动化过程的文件，具体请参见 [pipeline.yml](../dop/guides/reference/pipeline.html)。

   * 首先完成 CI 部分：

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

     将此文件提交代码，随后即可以在界面上进行构建。

     ```bash
     git add pipeline.yml
     git commit -m 'add pipeline'
     git push
     ```

     ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/5db86449-3e11-406d-b431-3d087c96c556.png)

     您也可以通过 UI 界面直接操作，省去本地推送步骤。

     ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/30fae0b9-24e2-4196-a1c6-e8f46dcc9067.png)

   * 完成 CD 部分：

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

     由上可见新增了 release 和 deploy 两个步骤，并且出现了新文件 erda.yml。关于 erda.yml 更多信息，请参见 [erda.yml](../dop/guides/reference/erda-yaml.html)。

     将文件补充完整后提交代码。

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

     erda.yml 最终需通过 Docker 镜像部署，但上文的 erda.yml 并未填写镜像。

     通过 pipeline.yml 示例可以发现，镜像是在 CI 过程中编译而成的：通过 Buildpack 将代码编译打包为 Docker 镜像，经 Release 将镜像自动塞入 erda.yml，并基于生成后的 erda.yml 完成部署。

3. 待流水线执行完成后，即可在部署中心查看已发布的实例。运维管理相关的操作（例如重启、回滚、查看日志等），请参见 [应用管理](../dop/guides/deploy/management.html)。

### 质量保障

质量保障涉及研发过程中的所有环节，例如前期的代码审查，集成时的自动化测试、人工探索和回归测试等。本文将以自动化测试为例展开介绍，更多测试相关内容，请参见 [质量保障和测试](../dop/guides/qa-and-testing/sonar-report.html)。

在本案例中，假设已完成功能设计如下：
1. 文章列表
2. 点击文章查看详情
3. 用户每点击进入一次，阅读量加一

针对该设计，您需要完成以下操作：

1. 进入 **DevOps 平台 > 测试管理 > 测试用例 > 自动化测试**，创建场景目录 **文章**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/63668924-fec1-4233-b6ef-ef6cf3998baa.png)

2. 创建单个场景 **文章阅读数**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/bb971b58-7c9e-4979-afb1-60b828967550.png)

3. 在场景中添加步骤进行场景编排，所添加的每个步骤为具体的接口调用，通过配置接口参数以及断言推进自动化的实现。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/38a6d071-30ab-4ddc-84ae-6a8ba4df40c0.png)

软件上线后，可通过全链路追踪、日志分析、告警等功能及时发现问题或故障，并辅助定位原因。具体请参见 [微服务治理场景示例](../msp/examples/apm/service-dashboard.html)，本文仅针对主要功能以及使用场景进行简单的阐述和引导。

进入微服务治理平台，即可查看整个项目的全局拓扑。

:::tip 提示

您可通过以下方式进入微服务治理页面：

1. 点击左上角九宫格，选择 **微服务治理平台**，随后搜索项目进入。
2. 在应用部署详情中点击 **应用监控** 插件进入。

:::

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/01b0bf8a-070f-4a6e-b6c4-57688cb4b20e.png)

全局拓扑可作为项目上线后日常运维工作的入口。通过拓扑图能够清晰查看项目内部的流量走向及负载情况，点击红色的错误率即可快速跳转至链路追踪列表，迅速定位问题。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/28/dd313204-e551-4ff9-a77e-8471b2518434.png)

通过错误分析可快速明确堆栈异常，并向上追溯至错误的来源。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/a0b6155b-e74a-45ff-bafe-413b27b91dfa.png)

每个节点即代表一个微服务，点击节点了解该微服务详情，通过详细分析可进一步查看该微服务的具体数据。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/979ad75e-a5f1-45ca-b67b-69997df65013.png)

