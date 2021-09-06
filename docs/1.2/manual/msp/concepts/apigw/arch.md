# 技术架构

API 网关是实现微服务架构的必要组件。平台提供的 API 网关基于 OpenResty 和 Kong 实现，具备高并发低延时的特性，同时结合了 Kubernetes Ingress Controller，基于云原生的声明式配置方式，实现丰富的 API 策略。其核心功能包含微服务 API 管理和流量入口管理两部分。

- **微服务 API 管理**：用于 API 创建及精细化的流量管控，可针对每个 API 分析 QPS 、延时、流量数据等内容。
- **流量入口管理**：可快速创建域名，并将来自此域名的流量请求转发至相应的微服务 API，支持针对域名配置 QPS 限流、IP 拦截等安全策略。

:::tip 提示

当前 Kong 版本为 2.2.0，平台会持续升级，以提供更稳定、安全的服务。
:::

您可以使用集群原生安装的 Kubernetes Ingress，并结合 Kong 的能力增强 API 网关功能。鉴于 Kong 是以 Addon 扩展插件的方式存在，您还可以灵活选择域名流量是否经过 Kong。整体框架示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/9dc6289b-a310-49a9-86c7-a5d28795726f.png)
