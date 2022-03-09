# 项目接入

微服务治理平台旨在帮助您更好地观测服务的健康状态，其观测范围涵盖分布式全链路追踪、错误分析、告警管理及仪表盘等不同维度，并且简化了运维流程，使服务运维变得更加轻松高效。

微服务治理平台以项目为维度管理关联应用数据，因此，您首先需要关注的问题是：如何创建或接入微服务治理项目以使用平台提供的监控分析能力。

当您在 **管理中心 > 项目列表 > 新建项目** 时，您会看到多个项目类型，如 _研发项目、监控项目、代码托管项目_ 等，其中 _研发项目_ 和 _监控项目_ 是微服务治理平台支持集成的项目类型，但两者的接入方式又略有不同，下面分别介绍。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/24/ef0f6a59-6434-4ee0-87cc-26abd7cf8222.png)

## 研发项目接入

研发项目，是 Erda 平台目前主要支持的一类项目，该类型项目可以使用 DevOps 和 微服务治理 等模块下的多种能力。

对于研发项目，无需用户手动配置即可自动接入监控，该类型项目下的应用在通过 DevOps 流水线部署时，平台会自动注入必要的配置，部署成功之后，即可在 _微服务治理平台_ 下看到对应的项目入口。


## 监控项目接入

监控项目，主要针对的是未通过 Erda 平台托管部署的外部项目接入监控的场景。对于非 Erda 平台托管的外部项目，需要用户做一些手动的配置和操作，主要如下：

1. 需要通过创建对应的监控项目
2. 配置鉴权标识 Token，以识别上报数据的归属关系
3. 应用端集成采集探针 Sdk，以上报监控数据

需要注意的是，受限于采集探针 Sdk的接入能力，监控项目 下的部分功能将不可用，如日志分析等，下面详述接入的各个流程。

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

















