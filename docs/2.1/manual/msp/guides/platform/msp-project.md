# 项目接入

微服务治理平台旨在帮助您更好地观测服务的健康状态，其观测范围涵盖分布式全链路追踪、错误分析、告警管理及自定义大盘等不同维度，并且简化运维流程，使服务运维变得更加轻松高效。

平台从项目角度管理关联应用数据，因此您需要优先关注如何创建或接入微服务治理项目，以使用平台提供的监控分析能力。该操作的必要性在于，应用产生的 Metric、Tracing 和 Log 等数据必须通过某种显式授权，才能被平台正确采集和存储，其主要流程如下：

1. 创建项目，属于同一项目的数据将被统一管理。
2. 生成授权 Token，以识别上报数据的归属关系。
3. 应用端集成采集探针 SDK，以上报监控数据。

进入 **管理中心 > 项目列表 > 新建项目**，有多种项目类型可选，例如研发项目、监控项目、代码托管项目等，其中研发项目和监控项目是微服务治理平台支持集成的项目类型，但两者的接入方式略有不同，下文将为您详细介绍两者的差异。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/24/ef0f6a59-6434-4ee0-87cc-26abd7cf8222.png)


## 如何选择项目

### 研发项目

研发项目提供项目管理、代码托管、CI/CD 等功能。对于该类型项目，平台通过提供 Monitor Addon 的方式接入微服务治理平台，该 Addon 将自动完成授权 Token 和采集 SDK 的注入。

若您满足如下条件，可考虑通过研发项目接入应用：

- 除去微服务治理平台的使用需求外，您还希望使用研发项目提供的项目管理、代码托管、CI/CD 等功能。
- 您的应用程序语言为 Java 或 Nodejs（当前 Monitor Addon 仅支持这两种语言程序的 SDK 注入）。

### 监控项目

监控项目专注于提供服务监控、链路监控、自定义大盘和告警等监控功能。相对于研发项目，监控项目提供更通用、灵活和可配置的接入方式，同时可作为 OpenTelemetry、OpenTracing 等协议的 Server 端，与众多支持该协议的采集 SDK 集成。

若您满足如下条件，可考虑通过监控项目接入应用：

- 您仅需使用微服务治理平台提供的监控能力。
- 您的项目未被 Erda 托管，无法通过前文介绍的研发项目接入。
- 您的应用程序语言不受 Monitor Addon 支持。
- 您已有其他与 OpenTelemetry 或 OpenTracing 协议兼容的采集 SDK。

## 研发项目接入

执行以下操作前，请确认您已完成研发项目、erda.yaml 以及部署流水线创建，具体请参见 [通过流水线部署](../../../dop/guides/deploy/deploy-by-cicd-pipeline)。

### 添加 Monitor Addon

:::tip 提示
该步骤为可选项。通过流水线部署的应用将自动添加 Monitor Addon。
:::

编辑 erda.yaml，添加 Monitor Addon。

您可通过可视化的图形编辑模式添加：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/15/0f58aadd-eb11-4671-804c-a9dbae56d4be.png)

也可选择以文本模式编辑 erda.yaml：

```yaml
  addons:
    monitor:
      plan: monitor:basic
      options:
        version: '3.6'
```

### 执行流水线部署应用

1. 进入 **应用 > 流水线**，新建流水线并点击执行。 
   
   流水线部署过程中，将执行 Monitor Addon 指定的特定逻辑：
   
   - 向微服务治理平台注册项目。
   
   - 向微服务治理平台申请授权 Token。
   
   - 在打包的镜像中添加采集 SDK。
   
   - 将授权 Token 注入至部署应用的环境变量。
   

2. 等待流水线执行成功后，进入微服务治理平台首页，即可查看方才部署的项目，点击进入管理。


## 监控项目接入

### 创建监控项目

请按照以下步骤创建项目：

1. 进入 **管理中心 > 项目列表**。
   

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/24/e5b45f1f-c9f7-4698-a163-215ecccd32b4.png)

2. 点击 **新建项目**。

3. 选择 **监控项目**，并根据界面提示输入项目名称、项目标识等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/24/ef0f6a59-6434-4ee0-87cc-26abd7cf8222.png)

4. 完成项目创建后，进入微服务治理平台首页，即可查看方才创建的项目，点击进入项目空间。

### 创建接入 Token

1. 进入 **微服务治理平台 > 环境设置 > 接入配置**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/08/d336940c-bb64-430e-897d-fa4027365579.png)

2. 点击右上角 **创建 Token**，页面将展示创建的 Token 信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/08/df30c599-c18c-43e9-aa3f-bc47a068a9b4.png)

### 应用端集成采集 SDK

对于外部项目的接入，考虑到多语言和开放性问题，当前平台与开源社区的协议集成，支持所有兼容 OpenTelemetry 和 OpenTracing 的采集端 SDK 上报数据。

在接入配置页面，平台默认提供 Jaeger Client 接入的多语言具体指导。此处以 Java 语言为例进行说明。

#### 获取接入点和鉴权信息

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/08/137ce52f-3bdc-4e90-8efc-88368d522419.png)

- **接入点**：服务端开放的数据接收 API 地址。
- **环境 ID**：不同的项目和环境（开发、测试、预发、生产）有不同的环境 ID，用于区分数据归属。
- **Token**：用于鉴权。

#### 引用 SDK 并配置鉴权信息

您可以在 HTTP/HTTPS 协议的 Header 或 Jaeger 协议的 Tag 字段中配置鉴权信息，具体字段说明如下。

- **erda.env.id**：微服务项目环境 ID。
- **erda.env.token**：微服务环境鉴权 Token，在此页面创建和获取。

下文以 Jaeger SpringCloud Starter 上报数据为例：

1. 引入 opentracing-spring-jaeger-cloud-starter 依赖。

   ```xml
   <dependency>
       <groupId>io.opentracing.contrib</groupId>
       <artifactId>opentracing-spring-jaeger-cloud-starter</artifactId>
       <version>3.3.1</version>
   </dependency>
   ```

2. 在 application.yml 中配置 Jaeger。

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

   
