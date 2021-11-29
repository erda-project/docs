# 技术架构

平台提供的注册中心和配置中心均基于 [Nacos](https://nacos.io/en-us/) 实现。对比使用 ZooKeeper 做注册中心、Apollo 做配置中心，这种方案在中间件运维简易度和资源利用率上有着巨大的优势。平台 BaaS 化 Nacos 的能力，从而实现多个项目的不同环境共用一套 Nacos，进一步提高资源利用率，同时业务开发过程中也无需关注底层租户隔离机制。

如下图所示，两个不同项目的环境，可以在一个物理集群内共用一套 Nacos。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/1d3e3e52-ae2b-402d-afa7-6c320e4440cf.jpeg)

对于平台侧创建 Nacos 租户的流程，业务是无需感知的。业务应用的 `erda.yml` 通过 Addon 扩展机制申明注册中心或配置中心，其后跟随应用的部署，自动创建租户，同时将租户 ID 以环境变量的方式自动注入应用服务的容器中。

注册中心的功能主要包括 Dubbo 微服务框架注册发现和 Spring Cloud 微服务框架注册发现，配置中心的功能主要是 Spring Cloud 配置热更新机制。
