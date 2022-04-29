# API 网关

## 技术架构

API 网关是实现微服务架构的必要组件。平台提供的 API 网关基于 OpenResty 和 Kong 实现，具备高并发低延时的特性，同时结合了 Kubernetes Ingress Controller，基于云原生的声明式配置方式，实现丰富的 API 策略。其核心功能包含微服务 API 管理和流量入口管理两部分。

- **微服务 API 管理**：用于 API 创建及精细化的流量管控，可针对每个 API 分析 QPS、延时、流量数据等内容。
- **流量入口管理**：可快速创建域名，并将来自此域名的流量请求转发至相应的微服务 API，支持针对域名配置 QPS 限流、IP 拦截等安全策略。

:::tip 提示

当前 Kong 版本为 2.2.0，平台将持续升级，以提供更稳定、安全的服务。
:::

您可以使用集群原生安装的 Kubernetes Ingress，并结合 Kong 的能力增强 API 网关功能。鉴于 Kong 是以 Addon 扩展插件的方式存在，您还可以灵活选择域名流量是否经过 Kong。整体框架示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/9dc6289b-a310-49a9-86c7-a5d28795726f.png)



## 核心概念

### 流量入口

流量入口由一组域名及域名下的路由规则构成，用于接入特定业务流量的访问入口。

进入 **微服务治理平台 > 项目列表 > 选择项目 > API 网关 > 流量入口管理** 创建流量入口。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/01a1b090-7cc7-43e0-9c00-5e554a384879.png)

某些特殊的企业环境对域名的管理十分严格，例如必须有独立的 DNS 解析，或在企业自己的 LB 节点上添加域名转发配置。此时便需要将一个环境下的所有服务收敛至同一域名下。

API 网关可提供针对集群泛域名生成的四个环境域名，以泛域名 *app.terminus.io* 为例，其环境域名如下：

- *gateway.app.terminus.io*
- *staging-gateway.app.terminus.io*
- *test-gateway.app.terminus.io*
- *dev-gateway.app.terminus.io*

在 API 网关的流量入口中，默认的“统一域名入口”即用于该场景。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/b5bb748d-3ae4-4c45-89bb-18bb0324bf0b.png)

进入 **流量入口管理** 查看具体路由规则：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/3cd1b010-22d3-4b81-9460-e54848f35f82.png)

### 微服务 API

用于暴露微服务、提供流量入口的 API。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/0ef386b3-c7df-4f08-bf1a-449cfe2590d8.png)

默认情况下，所有服务将自动注册 API，包含所有方法和路径，从而暴露该 API。但是对于某些特定服务而言，这是不安全的，此时可删除该自动注册的 API，并根据需要重新添加 API 即可。

### 调用方

在开放 API 的场景下，需识别出调用方的角色，从而判断该调用方是否具有调用权限，同时可针对调用方分析其调用量等情况。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/970f5cde-124c-44ed-91e9-37f67946d9c3.png)

调用方的核心为凭证信息，在请求中需携带对应的 Key/Secret 凭证，提供网关进行识别认证。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/637bf158-a37b-4379-ba0e-3ae25bf47ee9.png)

### 认证

开放 API 的场景涉及网关的认证功能，认证方式即识别调用方的方式，有多种认证方式可选。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/cc6d88c3-0194-4055-99bb-0be1a0918d34.png)

### 授权

在开放 API 的场景下，调用方通过认证后，仍需检查该调用方是否具有访问该 API 的权限。

通过编辑流量入口，可添加允许访问的调用方：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/59ea0059-bbf2-4a7a-a8c9-c73fef2f5048.png)

也可为调用方添加允许访问的流量入口：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/279c6ff9-6796-426a-abf8-193818bb443d.png)
