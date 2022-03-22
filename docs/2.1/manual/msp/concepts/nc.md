# 注册中心 & 配置中心

## 技术架构

平台提供的注册中心和配置中心均基于 [Nacos](https://nacos.io/en-us/) 实现。对比使用 ZooKeeper 做注册中心、Apollo 做配置中心，该方案在中间件运维简易度和资源利用率上有着巨大的优势。平台 BaaS 化 Nacos 的能力，从而实现多个项目的不同环境共用一套 Nacos，进一步提高资源利用率，同时业务开发过程中也无需关注底层租户隔离机制。

如下图所示，两个不同项目的环境，可在一个物理集群内共用一套 Nacos。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/1d3e3e52-ae2b-402d-afa7-6c320e4440cf.jpeg)

对于平台侧创建 Nacos 租户的流程，业务是无需感知的。业务应用的 erda.yml 通过 Addon 扩展机制申明注册中心或配置中心，随后部署应用，自动创建租户，同时将租户 ID 以环境变量的方式自动注入应用服务的容器中。

注册中心的功能主要包括 Dubbo 微服务框架注册发现和 Spring Cloud 微服务框架注册发现，配置中心的功能主要为 Spring Cloud 配置热更新机制。

## 核心概念

### 租户

在 Nacos 中，不同 Namespace 之间的服务注册发现和配置管理是相互隔离的。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/24014484-5078-42b5-ae30-9db4cb2f059e.png)

如下所示，选择对应的 Namespace，即可查看该租户下具体的服务注册列表。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/7419434a-24fc-4fd4-99a1-1bd2f0d7d9b5.png)

在 Erda 的注册中心和配置中心，租户将自动关联所属的项目环境，因此用户无需选择指定的 Nacos Namespace 即可查看项目环境下的服务注册列表等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/cb9136b2-b79c-4bf1-819a-74ef281b3f25.png)

进入 **微服务治理平台 > 环境设置 > 组件信息**，可查看 Nacos NamespaceId 对应的服务参数（即自动注入的环境变量）。

注册中心对应的服务参数为 `NACOS_TENANT_ID`。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/05ac5e5e-9b74-4512-8b22-d7ccc4d1f294.png)

配置中心对应的服务参数为 `CONFIGCENTER_TENANT_NAME`。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/3f9d85c9-c472-4bef-b48d-81022551e637.png)


### 注册中心

#### Dubbo 协议

Dubbo 框架的微服务注册发现机制。接口名称由对应的 Dubbo Service 和版本号构成。

供应者列表中的 IP 为提供该 Dubbo Service 的 Provider 实例的 K8s Pod IP，在 Nacos 中服务名以 `providers:`开头。

消费者列表中的 IP 为订阅消费该 Dubbo Service 的 Consumer 实例的 K8s Pod IP，在 Nacos 中服务名以 `consumers:` 开头。

#### HTTP 协议

Spring Cloud 框架的微服务注册发现机制。由于 Spring Cloud 框架的消费者无法注册自身信息，因此仅能查看供应者的名称和 IP 信息。

### 配置中心

配置中心的 Key/Value 配置项可合并形成一份 application.yml，动态下发配置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/f0b8a3f6-d139-4102-bb18-3e0c1b87bb89.png)

对应至 Nacos，每个应用配置即为一个独立的 Data 配置项。

例如 `parana-trade` 应用的 Key/Value 配置可合并为 Data 如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/71bbeedc-dfb5-4f41-9984-80cedc538a6b.png)

可点击查看详情。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/52e039c0-fcfd-465d-ac67-cc61fb14506d.png)
