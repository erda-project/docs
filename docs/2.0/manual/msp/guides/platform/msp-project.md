# 项目接入

微服务治理平台旨在帮助您更好地观测服务的健康状态，其观测范围涵盖分布式全链路追踪、错误分析、告警管理及仪表盘等不同维度，并且简化了运维流程，使服务运维变得更加轻松高效。

微服务治理平台以项目为维度管理关联应用数据，因此，您首先需要关注的问题是：如何创建或接入微服务治理项目以使用平台提供的监控分析能力。

接入操作的必要性在于，应用产生的 Metric、Tracing、Logging 等数据必须通过某种显式的授权，才能被 Erda 微服务治理平台正确采集和存储。因此，接入操作从流程上讲，大致分为两个阶段：

1. 创建项目，属于同一项目的数据将被统一管理；
2. 生成授权Token，以识别上报数据的归属关系；
3. 应用端集成采集探针 Sdk，以上报监控数据。

当您在 **管理中心 > 项目列表 > 新建项目** 时，您会看到多个项目类型，如 _研发项目、监控项目、代码托管项目_ 等，其中 _研发项目_ 和 _监控项目_ 是微服务治理平台支持集成的项目类型，但两者的接入方式又略有不同，下面分别介绍。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/24/ef0f6a59-6434-4ee0-87cc-26abd7cf8222.png)


## 如何选择项目

### 研发项目

研发项目，是一类提供了项目管理、代码托管、CI/CD 等功能的项目类型。对于该类型项目，平台提供通过 `monitor` addon 的方式来完成微服务治理平台的接入，该 addon 会自动完成 `授权 Token` 和 `采集Sdk` 的自动注入。

当您满足如下情况时可以考虑通过研发项目接入您的应用：

- 除了想使用微服务治理平台，您还想使用该类型项目提供的项目管理、代码托管、CI/CD 等功能
- 您的应用程序语言是 Java、Nodejs，因为当前 `monitor` addon 仅支持这两种语言的程序的 Sdk 注入

### 监控项目

监控项目，是一类专注于提供包括服务监控、链路监控、仪表盘和告警等监控功能项目类型。相对于研发项目，该类型项目提供更通用、更灵活和可配置的接入方式。同时，该类型项目，可作为 OpenTelemetry、OpenTracing 等协议的 Server 端，从而可与众多支持该协议的采集Sdk集成。

当您满足如下情况时可以考虑通过监控项目接入您的应用：

- 当您仅想使用 Erda 微服务治理平台 提供的监控能力时
- 当您的项目未被 Erda 托管，而不能通过前文介绍的研发项目接入时
- 当您的应用程序语言不被前文介绍的 `monitor` addon 所默认支持时
- 当您已有其他与 OpenTelemetry 或 OpenTracing 协议兼容的采集Sdk时

## 研发项目接入

执行以下操作前，请确保您已完成了研发项目、erda.yaml，以及部署流水线的创建，详情可参考 [通过 CI/CD 流水线一键部署](dop/guides/deploy/deploy-by-cicd-pipeline)。


### 添加 monitor addon

> 该操作为可选的，因为通过部署流水线部署起来的应用，会自动添加 `monitor` addon

1. 编辑 erda.yaml，添加 `monitor` addon

您可以通过如下所示可视化的操作方式来操作：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/14/0ef22b13-4470-483c-9327-20c617aefc40.png)

也可以选择直接以文本模式编辑 `erda.yaml`：

```yaml
  addons:
    monitor:
      plan: monitor:basic
      options:
        version: '3.6'
```

### 执行流水线部署应用

1. 进入 **应用 > 流水线**，新建流水线并点击执行。 
   
流水线部署过程中，会执行 `monitor` addon 指定的特定逻辑：
- 向 **微服务治理平台** 注册项目
- 向 **微服务治理平台** 申请 `授权Token`
- 向 打包的镜像中 添加 `采集Sdk`
- 将 `授权Token` 注入到部署应用的环境变量

2. 等待流水线执行成功后，进入 **微服务治理平台**，即可看到刚才部署的项目，并可点击进入管理


## 监控项目接入

### 创建监控项目

请按照以下步骤创建项目：

1. 进入 **管理中心 > 项目列表**。
   
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/24/e5b45f1f-c9f7-4698-a163-215ecccd32b4.png)

2. 点击 **新建项目**。

3. 选择 **监控项目**，并根据界面提示输入项目名称、项目标识等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/24/ef0f6a59-6434-4ee0-87cc-26abd7cf8222.png)

4. 完成项目创建后，进入 **微服务治理平台 ** 首页，即可看到刚才创建的项目，点击进入项目空间。

### 创建接入 Token

1. 进入 **环境设置 > 接入配置**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/93061c47-c158-46bb-b405-f96521753e51.png)

2. 点击 页面右上角的 **创建 Token**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/fae4dde3-a160-4bdf-8f79-6beeeac10fd8.png)

页面上方将展示刚才创建的 Token 信息。

### 应用端集成采集 Sdk

对于外部项目的接入，考虑到多语言和开放性，我们倾向于与开源社区的协议集成，目前支持所有兼容 OpenTelemetry 和 OpenTracing 的采集端 Sdk 上报数据。

在 _接入配置_ 页面，默认提供了 Jaeger Client 接入的多语言具体指导，我们以 Java 语言示例，说明配置的关键步骤。

#### 获取接入点和鉴权信息

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/fe9345bf-6f48-4f92-bd8c-80c00aea2289.png)

- 接入点：服务端开放的数据接收 API 地址
- 环境ID：不同的项目、不同的环境（开发、测试、预发、生产）分别会有不同的环境 ID，主要用于区分数据归属
- Token：上一步创建的 Token，主要应用于鉴权

#### 代码中引用 Sdk，并配置鉴权信息

您可以在 HTTP/HTTPS 协议的 Header 中或者 Jaeger 协议的 Tag 字段中配置鉴权信息，具体字段及详细说明如下所示

- erda.env.id : 微服务项目环境ID
- erda.env.token : 微服务环境鉴权Token，在此页面创建和获取

下面以 Jaeger SpringCloud Starter 上报数据为例，具体说明。

1. 引入 opentracing-spring-jaeger-cloud-starter 依赖

```xml
<dependency>
    <groupId>io.opentracing.contrib</groupId>
    <artifactId>opentracing-spring-jaeger-cloud-starter</artifactId>
    <version>3.3.1</version>
</dependency>
```

2. 在 application.yml 中配置 Jaeger

```yaml
opentracing:
  jaeger:
    service-name: <your_service_name>
    http-sender:
      url: https://collector.daily.terminus.io/api/jaeger/traces
    log-spans: true
    tags:
      erda.env.id: <your_env_id>
      erda.env.token: <your_token>
```

















