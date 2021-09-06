---
title: 基于 Golang 构建高可扩展的云原生 PaaS（附 PPT 下载）
author: 刘浩杨
date: 2021-07-26
category: opensource
---


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/29223ecf-4458-4911-b4c3-1babec72604b.png)

本文整理自刘浩杨在 GopherChina 2021 北京站主会场的演讲，微信添加：Erda202106，联系小助手即可获取讲师 PPT。<br />

# 前言
当今时代，数字化转型概念在 ToB 领域非常火热，越来越多的企业需要数字化转型，因此越来越多的厂商涌入了 ToB 市场，端点就是其中一员。<br />​

端点的核心业务是给企业提供从采购、交易、履约、仓储到零售全链路的数字化转型解决方案。围绕这个目的，我们建立了一整套面向云原生的企业数字化软件产品，其中：<br />​<br />

- PaaS 平台 Erda 是技术底座。
- Trantor 是具有 HPAPaaS 能力的研发底座，运行在 Erda 之上，提供低代码和高效开发的能力。
- Gaia 是完整的业务能力平台，覆盖计划、寻源、采购、营销、服务、销售、交易、履约、结算等企业供应链业务领域，提供会员营销、全渠道运营、SRM 采购和在线销售平台等业务产品。

​

通过这几层能力的组合，使我们具备了生产可定制 SaaS 化产品的能力，为企业客户提供端到端的解决方案，满足各行业不同客户的各类需求。所以可以看到在这个分层的企业数字化研发体系中，我们通过 PaaS 平台向下屏蔽复杂的基础设施，使整个业务系统拥有架构多云之上的能力；同时，PaaS 平台也向上提供微服务研发和治理的技术中台能力，让上层用户能够更专注于业务系统自身的构建。<br />​

接下来，简单介绍一下我们在构建 Erda 过程中的思考，文章后半部分将回到技术本身，来分享一下我们如何使用 Golang 实现云原生的 PaaS 平台。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/0b48c956-fd1f-4b41-8341-3dc8e5562e47.png)
# 软件交付面临的问题和挑战
端点从 2012 年成立到现在，一直聚焦在企业级软件开发和交付上，我们也从最开始的软件定制交付，到今天使用标准软件 + 二开机制解决定制需求的方式交付。在这个过程中，我们遇到的问题可以总结为以下 4 点：<br />​<br />

1. 随着交付规模的快速增长，开发和交付团队要如何提效？
1. 业务软件系统如何适配复杂的客户部署环境？
1. 大规模交付的部署过程需要可被标准化。
1. 交付上线后需要持续保障业务稳定性。


<br />如今，敏捷开发是一个相对普及的概念，我们在做软件交付的时候，也需要把开发流程从传统的瀑布式开发转变为敏捷开发，比如一个理想的开发方式是：使用项目协同工具来管理研发过程的需求、任务、缺陷；使用 gitflow 来管理功能需求的开发；使用自动化的流水线实现持续集成；然后基于容器化来部署我们的软件；部署之后触发自动化测试来验证功能的正确性。同时，像 API 网关、微服务治理、容器服务、流计算等这些在互联网公司流行的技术，也逐渐开始受到大型传统企业的青睐，这对我们的要求也是进一步提高。<br />​

为了解决这些问题，我们就需要一个完整的 DevOps 平台来支撑整个研发交付的流程，来达到提高研发效能的目的。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/7eb8ab5e-9a9f-4bb0-b59d-f3830d294dd2.png)<br />刚才讲了在研发过程中的问题，接下来聊一下在需求开发完成后，去企业提供的环境进行交付的环节。<br />​

在我们做过的客户里面，有自建机房用 zstack 来提供虚拟化，也有采购阿里云、腾讯云、或者微软云 azure 的 ECS，还有的会提供现成的容器环境但管理接口不同，比如 Rancher 和 OpenShift，这些情况我们都碰到过。甚至最近的一个项目里，客户提供的是 arm 架构的运行环境。<br />​

因为这些企业提供的环境千差万别，所以交付就变成了一件很痛苦的事情。<br />​

回顾计算机软件的发展历史，我们知道 java 是现在很流行的一个开发语言和平台，java 能流行的很大一个原因是因为它提出了 Java 虚拟机，通过编译 Java 代码到通用的字节码，再由运行时去即时编译字节码到不同平台的汇编方式来实现“一次编写，到处运行”。那么，我们构建的软件系统是否也可以像 java 一样 “一次打包，到处运行”？说到这里，可能很多人都会想到：基于 Docker 和 Kubernetes 作为软件的运行时也可以让我们的软件制品屏蔽掉不同的部署环境。但是，管理不同环境下的 Kubernetes 也是一件很复杂的事情，我们需要一个平台来向上承载不同的业务系统，向下管理资源和应用调度。<br />​

我们今天的做法是通过一个多云管理平台来解决这个问题。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/cb8c6cdb-1012-4c9b-91ab-6c74374f2fc1.png)<br />​

很多软件系统在验收交付上线后，如果没有一个完整的平台实时监控、洞察系统的健康状态，将会导致各种问题（稳定性、异常、错误、攻击）时有发生，严重影响业务的正常运行。保证业务稳定性也是我们可以提供给客户的核心服务之一。<br />​

在之前的案例里，我们利用 PaaS 上监控的高度扩展性，帮助一家排名世界 500 强的外企搭建了一套云上的统一监控运维平台，真正实现了从云产品，比如 SLB、WAF、ECS、RDS，到平台层、再到 PaaS 上运行的业务系统的全链路监控和日志数据的统一分析，再通过 PaaS 内置的可视化和告警入口，使得客户只需要投入很少的 IT 运维人员就能够保证系统的稳定性。<br />​

另一个场景是我们的 PaaS 平台自身。我们现在同时在运维着 100+ 的 Kubernetes 集群，但全职负责运维的同事大概只有三四人，而且可预见规模扩大的同时，也不需要在运维上投入更多的人力，这也得益于我们对平台可观测性的全面覆盖。<br />​

所以可以看到，研发、交付、运维遇到的很多问题，我们都是通过 PaaS 很好地解决了。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/dd7638c5-bffe-4281-a623-ba27bc5d68f0.png)
# 端点一站式 PaaS : Erda
前面提到，我们构建 PaaS 很大一部分是来自端点自身的需求。早在 2016 年我们就开始搭建端点的部署和应用监控平台，当时的选择是使用 Docker 和 Jenkins 等开源工具、让业务应用手写 dockerfile 的方式来进行发布；在监控的选型上，使用 Zipkin 作为分布式应用的追踪系统、使用 ELK 作为日志平台，这可能也是很多公司常见的做法。这套系统搭建起来以后，在一段时间里满足了公司内部的开发使用，但是随着业务对平台要求越来越多，我们也引入了更多的开源组件，维护这套系统的成本也越来越高。同时，有客户希望我们能把技术平台也一起对外输出，很显然使用开源组件混搭的这台系统并不能满足我们的要求。<br />​

在 2017 年，我们想要重新设计一个以应用为中心的研发平台产品，于是选择了以 DC/OS 为底座，在上层使用 Java 构建 DevOps 和服务治理平台，并且在 2018 年初交付了第一个客户。现在来看，选择 mesos 而不是 K8s，当时是走了弯路的，所以从 2018 年下半年开始，我们也全面拥抱 K8s 生态。同时因为 Java 的性能和资源占用问题，我们做了第二次的 PaaS 架构升级，开始使用  Golang 重写了大部分的平台组件，也因为要同时支持 DC/OS 和 K8s 两个容器平台，我们拆分出了异构的调度器模块和流水线模块。时至今日，我们正在交付的所有客户都已经在使用 K8s 架构。<br />​

越往后走，我们开发的功能就越多，平台覆盖的范围也越大。我们陆陆续续在平台上实现了微服务治理、快数据、移动开发、边缘计算等诸多平台级应用，演变成了今天 Erda 的一站式 PaaS 产品矩阵。<br />
<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/d35798c6-c057-486c-8357-817c3f1564bf.png)<br />上图是 Erda 现今的产品大图，其中以多云管理、 DevOps、微服务治理和快数据四个平台为核心。我们在多云管理平台里面实现了两个比较重要的能力：<br />​<br />

- 一个是对异构资源环境的支持，支持管理物理机、虚拟机、支持原生的 K8s 集群、DC/OS 集群等。
- 另一个能力是原生的多集群架构，可以通过不同的集群对环境进行物理隔离，比如实现开发、测试和生产环境的资源互不影响。基于容器化，我们也可以很容易地实现对资源池的精细管理，按 CPU 和内存的粒度精确控制不同应用的资源分配等。

​

在多云平台之上，DevOps、微服务和快数据平台分别来管理业务和数据。在业务侧提供软件开发的需求、开发、测试、部署、运维全生命周期的功能，在数据侧也通过批流一体实现真正快数据治理能力。除此之外，业务和数据的统一协同，业务可以更大程度地通过数字进行描述，从而实现更为精细化的运营。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/9b4223ad-95a5-48c0-b3fa-d8a9b6306c6c.png)
# Erda 架构的思考
前面介绍了 Erda 提供的的一站式能力，那么我们是怎么去实现在 PaaS 上实现构建不同的平台服务，实现同一个内核支持微服务开发和数据治理的能力呢？首先来看我们对 PaaS 扩展架构的思考。<br />​

在最初的版本里，我们只有简单的应用部署功能，把所有的代码放在一起构建了一个单体服务。随着平台功能逐渐增多，我们也开始把系统拆分成更多的微服务，在拆分的过程中，严格遵守一些设计原则，进行合理的架构分层来避免服务爆炸。在 Erda 当前的系统架构中，我们把系统分为三层：平台应用层，服务层和 PaaS 的内核层，并且约定每一层之间不允许产生横向调用，只允许调用下一层服务提供的接口。<br />​

**内核层**提供了 PaaS 和基础设施交互的能力**，**它包含三个核心组件和相对独立的监控系统：<br />​<br />

- cluster manager 通过和每个集群的 cluster agent 通信，实现多集群管理的能力。
- pipeline 服务实现了 workflow 的编排和 job 调度能力，包括短时任务、数据的批任务、流任务等。
- orchestrator 服务实现了 workload 的编排和有状态/无状态的服务调度能力。
- 监控系统负责收集、计算和展示每个集群上报的可观察性数据。

**​**

**服务层**类似于业务系统中提到的中台概念，提供平台中的公共功能模块的能力，如用户、租户、权限、通知、报表、事件、审计、版本控制、项目管理等。<br />​

**应用层**则是每个平台调用下层的能力进行自身的业务逻辑封装，同时提供和前端交互的接口。<br />​

通过这样一个分层架构，可以很容易地去实现一个新的平台应用。例如在实现移动开发平台时，代码管理、构建流水线、审计可以复用 DevOps 原有的能力，用户行为分析、异常分析等功能依赖监控系统的能力得以实现。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/c6d2d9fd-4f6b-4481-ad9e-7c46a97a930d.png)<br />
<br />众所周知，Kubernetes 作为云原生应用的最佳部署平台，开放了容器运行时接口（CRI）、容器网络接口（CNI）和容器存储接口（CSI），这些接口让 Kubernetes 的开放性变得最大化，而 Kubernetes 本身则专注于容器调度。同样，在以应用为中心的 DevOps 平台中，CI/CD 是最为核心的能力，而我们也认为 CI/CD 的核心是对 workflow 和 workload 的管理，所以我们也开放了 workflow 接口和 workload 接口，让 DevOps 平台专注于应用开发管理，而不必关注 JOB 和应用被部署到何种平台上。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/59d31731-cba8-4254-b444-3a490e85d93c.png)<br />这里我们也在实践基础设施即代码的思想。在 Erda 上，你可以使用 pipeline.yaml 来定义应用的 CI/CD 全流程，比如代码拉取、质量扫描、单测执行、应用编译、构建和部署。<br />​

一个 pipeline.yaml 的示例如下：
```yaml
stages:
  stage:
  - git-checkout:
  stage:
  - buildpack:
      params:
        context: ${git-checkout}
  stage:
  - release:
      params:
        services:
          trade-server: ${buildpack:image}
          erda_yaml: ${git-checkout}/erda.yaml
  stage:
  - deploy:
      params:
        release_id: ${release:id}

```
​

同时，还可以使用声明式的 erda.yaml 来描述你的应用微服务架构，包括微服务之间的依赖关系、对中间件的依赖等，任何标准的 erda.yml 都可以被 DevOps 平台所部署。一个 erda.yaml 的示例如下：<br />​<br />
```yaml
services:
  trade-server:
    resources:
      cpu: 2
      mem: 2048
    deployments:
      replicas: 2
    ports:
     - port: 8080
    envs:
      ENABLE_ALIPAY: true
addons:
  mysql:
    plan: mysql:basic
    options:
      version: 5.7.23
      create_dbs: trade_db 

```
​

值得一提的是，基于 pipeline（流水线）和 erda（部署）两个定义之上，我们构建了丰富的 addon 和 action 市场，你可以把自己的服务打包成一个开箱即用的 addon，也可以来实现自己的流水线 action，这些机制让 DevOps 平台的扩展性得到极大的增强。<br />
<br />我们再来看一下 Erda 微服务平台的设计。共分为控制面和微服务引擎两个部分，它们之间通过我们设计的协议进行通信。通常，我们会使用 Erda 内置的微服务引擎，这里的选型是使用了 Spring Cloud Alibaba 组件作为内置实现，可以兼容企业原有的 Spring Cloud & Dubbo 的业务应用，不需要改动任何代码即可接入。同时，对于有特殊需求使用云服务的用户，也支持直接对接云厂商的微服务引擎，我们已经实现了阿里云 MSE 的可选实现。在这样的设计下，现在很流行的 ServiceMesh 系统比如 Istio 也可以很容易的作为 Erda 微服务引擎的一种实现被接入。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/69ad007b-c583-49f4-abb8-e58550d55e2c.png)<br />最后，我们再来讲一下监控系统的设计。在 Erda 的场景里，监控系统同时支撑基础监控、APM 和浏览器端的监控，所以我们没有直接使用社区流行的监控系统，比如 Prometheus 或者 Skywalking，而是选择了自研一套监控系统，在采集端适配社区的标准化协议。<br />​

首先我们在每个集群中安装基于 Telegraf 深度定制的 Cluster Agent，负责采集 Kubernetes、Erda 在集群中部署组件的可观察性数据，同时这个 Agent 也可以模拟成一个 Prometheus Server，拉取集群中被自动发现的 Exporters 数据。<br />​

那么在每个节点上，也会部署一个 Node Agent，可以自动发现节点上的 Pod，并把 Pod 识别为 Erda 平台定义的 Service、Job 或者 Addon 组件。同时 Node Agent 也会作为一个本地 Proxy，接收 Pod 中的业务应用 Java Agent 探针和 NodeJS 探针上报的应用请求和 Trace 数据，转发给后端的 Metrics Gateway 组件。<br />在未来，我们计划支持更多的第三方协议，如 SkyWalking 和 OpenTelemetry，来更多地提高 Erda 在可观察性上的扩展。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/95392332-e087-4596-8afa-b492338d78fc.png)
# Erda Infra 模块化开发框架
前面从架构的角度讲了我们对 PaaS 扩展的一些思考，也提到通过微服务的方式来构建整个平台，实现微服务化的重点就是要对系统功能进行合理拆解，把系统拆解成诸多边界清晰、可以内聚的业务模块。<br />​

虽然在 golang 社区中有很多 web 开发框架，如 gin、go-zero、beego，但深思熟虑后，我们发现需要的不仅仅是一个 Web 框架和微服务框架，而且还需要一个以模块化开发为核心，可以通过接口对系统进行扩展的开发体系。基于此我们设计了 Erda Infra，一套轻量级 Go 微服务框架，包含大量现成的模块和工具，能够快速构建起以模块化驱动的应用程序。<br />​

Erda-Infra 的核心特性包括：<br />​<br />

- 以模块化设计方式来驱动应用系统实现，支持模块可插拔。
- 统一配置读取，支持默认值、支持从文件、环境变量、命令行参数读取。
- 统一模块的初始化、启动、关闭。
- 统一管理模块间的依赖关系。
- 支持模块间的依赖注入。
- 包含大量现成的微模块 Provider，包括 etcd、docker、cassandra 、es 的 sdk、Http Server、gRPC Server等。
- 使用 Protocol Buffer 定义接口，支持自动生成 gRPC 和 HTTP 接口和客户端调用代码。 
- 提供快速构建模块的代码生成工具。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/4225618b-d4f4-4d6f-9324-c1ba7c27b4de.png)<br />Erda 现在有数千个功能点包含在几十个服务里面，一旦服务功能拆分设计的不合理，很容易引发整个项目的维护成本问题。我们在从架构层面审视模块拆分的同时，也期望使用开发框架来对开发进行一些约束。<br />​

**第一个原则**是对模块的拆分粒度要尽可能小，让每个模块的逻辑能高度内聚，对外的依赖可以松耦合。拿应用监控这个子系统来说，我们拆解成了拓扑、服务列表、服务监控、浏览器监控、错误分析、链路追踪等相对独立的模块，然后使用 Erda Infra 提供的能力拼装到一起组成监控的服务。<br />​

**第二个原则**是模块的开发者需要面向接口开发，而不是面向实现；模块之间依赖接口，而不是具体的实现类。这样做的好处是需要对模块进行扩展的时候，可以不需要修改已有的代码。我们也在 Erda Infra 中实现了依赖注入容器，通过类似 Spring 中 IoC 的方式，让开发模块的人更关注自己负责的逻辑单元。<br />​

下面来看一个 Erda Infra 中最简单的模块示例，我们把模块定义为 provider 结构，可以把需要注入的接口声明在 provider 的字段中，同时还需要实现 Init 、Run 函数来控制模块的生命周期，最后把定义好的模块注册到全局的服务容器中，即可完成一个微模块的实现。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/3a0b3266-4c30-427a-87d9-cebc7ecef4df.png)<br />​

那么我们如何在服务容器中定位到实现的接口呢？Erda Infra 提供了一个 Provide 接口，在这个接口中我们可以显示声明接口的具体实现，下面是 mysql-client 模块的声明示例：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/e5ddd1d4-4509-430f-8b88-cbe61babd9b9.png)<br />​

对于接口的获取，Erda Infra 提供了自动注入和使用服务定位器来解析两种方式。<br />​

自动注入和 Spring 的使用一样，通过在字段上标记 autowired 标签即可生效：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/8cf74240-96a9-4fe3-a65a-3ff24bae5cb1.png)<br />​

服务定位器模式则可以使用在后台任务中，通过框架的服务上下文来获取需要的接口具体实现：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/aab8dc4d-0b4d-45ea-8e81-26e491dfba02.png)<br />​

最后再来聊一聊 Erda 中的 API 定义方式，我们把 API 统一都定义在 Protobuf 文件中，这样可以统一生成 gRPC、HTTP、OpenAPI 接口，以及 Client 的代码。<br />​

假设系统中有一个服务叫 Greeter ，定义如下所示。其中：通过 google.api.http 选项，来定义 http 相关的信息，可以自动把请求的数据解析到 Path 参数和 Query 参数上。还可以通过在对应的接口上声明 +publish 特殊的注释，来表示发布该接口到 OpenAPI 上，如果想要把某个接口强制标记为内部接口，那么也可以通过  +private 注释来实现。
```protobuf
// +publish prefix:"/api/greeter" backend-prefix:"/api" service:"user-center"
service GreeterService {
	// say hello
	// +publish
	rpc SayHello (HelloRequest) returns (HelloResponse)  {
	  option (google.api.http) = {
		get: "/api/hello/{name}",
	  };
	}
  }
  
  message HelloRequest {
	string name = 1;
  }
  
  message HelloResponse {
	string data = 1;
  }
```
​

Erda Infra 作为我们使用的基础框架，现在还有一些不完善的地方，我们后续计划继续添加服务注册发现的支持，来实现运行时的服务模块管理等，以此持续增强 Erda 的平台扩展性。<br />​<br />
### 总结
我们从 3 月开始计划 Erda 的开源，到现在已经构建了第一个稳定的开源版本，第二个版本也将在近期发布。<br />​

Erda 本身提供的一站式服务开发治理和数据治理功能已经非常丰富，我们接下来将会重点对用户体验和功能细节进行打磨，对开源代码重构以提高代码质量，简化平台的安装部署方式等。欢迎大家关注 Erda 开源项目，一起探讨、交流云原生 PaaS 相关的技术，共建开源社区。<br />​<br />

- Erda Github 地址：[https://github.com/erda-project/erda](https://github.com/erda-project/erda)
- Erda Cloud 官网：[https://www.erda.cloud/](https://www.erda.cloud/)

