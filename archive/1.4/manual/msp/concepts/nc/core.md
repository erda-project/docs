# 核心概念

## 租户

在 Nacos 中有 Namespace 的概念，不同 Namespace 之间的服务注册发现和配置管理都是隔离的。

在 Nacos 的原生控制台中，可以看到对应的 Namespace 列表

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/24014484-5078-42b5-ae30-9db4cb2f059e.png)

如下图选择对应的 Namespace，可以看租户下具体的服务注册列表

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/7419434a-24fc-4fd4-99a1-1bd2f0d7d9b5.png)

在 Erda 的注册中心和配置中心控制台，租户是自动和所属的项目环境关联的，因此用户无需选择指定的 Nacos Namespace 即可查看项目环境下的服务注册列表等信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/3ff5c09e-532f-48df-af19-98adcf613379.png)

在微服务的组件信息中，可以找到和 Nacos 的 NamespaceId 对应的服务参数（即自动注入的环境变量）

注册中心对应的服务参数为`NACOS_TENANT_ID`

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/018ddd49-90c6-49fb-9c2f-faee275c5471.png)

配置中心对应的服务参数为`CONFIGCENTER_TENANT_NAME`

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/24ba538f-b24f-4579-a763-e0addcbce45f.png)


## 注册中心

### dubbo 协议

Dubbo 框架的微服务注册发现机制。接口名称由对应的 Dubbo Service 和版本号构成。

供应者列表中出现的 IP 为提供该 Dubbo Service 的 Provider 实例的 K8S Pod IP。在 Nacos 原生控制台中服务名以`providers:`开头；

消费者列表中出现的 IP 为订阅消费该 Dubbo Service 的 Consumer 实例的 K8S Pod IP。在 Nacos 原生控制台中服务名以`consumers:`开头。

### http 协议

Spring Cloud 框架的微服务注册发现机制。因为 Spring Cloud 框架消费者不会注册自己的信息，所以只能看到供应者的名称和 IP 信息。

## 配置中心

### 应用配置项 - Spring application.yml

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/30981eb1-414a-4650-89ff-70a6a1162f2b.png)

配置中心里的 key/value 配置项，会拼接起来形成一份 application.yml，动态下发配置。

对应到 Nacos 中每个应用配置都是一个独立的 Data 配置项。

`parana-trade` 这个应用的 key/value 配置会合并为 Nacos 中的这一个 Data 条目：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/71bbeedc-dfb5-4f41-9984-80cedc538a6b.png)

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/52e039c0-fcfd-465d-ac67-cc61fb14506d.png)
