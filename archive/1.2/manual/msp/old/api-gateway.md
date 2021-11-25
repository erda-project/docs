# API 网关介绍

API 网关是实现微服务架构的必要组件，平台提供的 API 网关基于 Openresty/Kong 实现，具备高并发低延时的特性；同时结合了 Kubernetes Ingress Controller，基于云原生的声明式配置方式，实现了丰富的 API 策略

核心功能包含微服务 API 管理和流量入口管理两部分：

- 微服务 API 管理，可以完成 API 的创建以及精细化的流量管控，可以针对每个 API 分析 QPS ，延时，流量数据等。
- 流量入口管理，可以快速创建一个域名，并将来自此域名的流量请求转发给相应的微服务 API ；可以针对域名 配置 QPS 限流，IP 拦截等安全策略

:::tip
Kong 的版本当前为 2.2.0，版本会持续 Follow 开源，有更稳定、安全的版本，就会进行升级
:::

## 使用场景一：微服务 API 管理

在指定服务的 dice.yml 中添加以下配置或者直接用交互式界面添加对 API 网关的依赖

```yaml
addons:
  gateway:
    plan: "api-gateway:basic"
```

OR

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/7562ec09-b8d2-4d28-85b0-790377149023.png)

在服务部署成功之后，部署中心->选择 runtime->部署总览，查看服务插件菜单栏，会出现 API 网关到控制台入口

进入控制台后可以看到当前服务已经自动注册了一个根路径 `/` API；基于前缀匹配，暴露了这个服务的所有 API。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/4ae477ba-cdfb-4ffe-8f71-1e5d0e3a6002.png)


服务的 API 暴露之后，就可以通过流量入口管理的功能，将同个项目环境下任意域名的 URL 转发给这个服务的 API 。因此，如果不希望暴露服务的所有 API ，可以手动删除这个 API ，并通过添加服务 API 按钮，添加更精确的 API，如下图所示

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/2e94f4a1-0e0d-4435-9dd4-c21431d6eabc.png)



## 使用场景二：微服务域名收敛

为一个项目下的每个微服务都分配独立的域名，这种烟囱式的域名管理是一种很糟糕的模式，随着业务不断发展，域名管理将变成灾难。API 网关可以将项目中微服务的 API 收敛到固定的流量入口（域名），用户可以在流量入口中，灵活地将请求转发给相应的微服务。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/03f46c0c-c5e9-43e5-9a5b-ed38a0816714.png)

:::tip
路由匹配优先级根据 URL 路径，长度越长，优先级越高
:::

下面对配置方式举例说明，例如项目下有两个服务，在`微服务 API 管理`中分别配置了API

- 用户中心服务`uc`

配置了用户信息查询 API ：`GET /users/{userID}`

- 权限中心服务`acl`

配置了用户权限信息查询 API: `GET /users/{userID}`

需要将这两个 API 统一在域名`example.com`下，可以在`流量入口管理`中创建一个新的流量入口，并且指定场景为

`Web或者APP聚合API`

![img](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/864c1fd3-0d95-4124-bc87-42e774290b92.png)

点击入口详情->创建路由，分别创建以下两条路由规则

- URL 路径前缀: `/api/uc/`

  按服务转发: `uc`

  服务 API 前缀: `/`

- URL 路径前缀: `/api/acl/`

  按服务转发: `acl`

  服务 API 前缀: `/`

对于`example.com/api/uc/users/{userID}`的请求就会被转发给`uc`服务, `uc`服务收到的 URL 是`/users/{userID}`

对于`example.com/api/acl/users/{userID}`的请求就会被转发给`acl`服务, `acl`服务收到的 URL 是`/users/{userID}`

在`微服务 API 管理`，选中`uc`服务的 API `GET /users/{userID}`，点击操作栏中的`分析`，就可以看到刚才请求`example.com/api/uc/users/{userID}`的状态码，延时等信息了

:::tip
除了使用 API 网关代理业务的 API 请求，可能还需要代理后端渲染 HTML 的请求，此时若 HTML 中需要生成域名地址，建议优先获取 API 网关转发请求头中的'X-Forwarded-Host'，而非'Host'请求头；

如果必须使用'Host'请求头，则需要开启"入口域名透传"的API策略，具体请参考[流量接收转发](./api-gateway-advanced1.md#流量接收转发)
:::

在一些特殊的企业客户环境中，对域名的管理会特别严格，例如必须要加独立的 DNS 解析，或者在企业自己的 LB 节点上添加域名转发配置。这时，可能需要将一个环境下的所有服务都收敛到同一个域名下。

API 网关提供了针对集群泛域名生成的，四个环境域名，例如对于泛域名"erda.cloud"，分别是以下域名：

- 开发环境: dev-gateway.erda.cloud
- 测试环境: test-gateway.erda.cloud
- 预发环境: staging-gateway.erda.cloud
- 生产环境: gateway.erda.cloud

可以在 API 网关的流量入口中看到，默认会有一个特殊的“统一域名入口”，即是作此用途，可以实现跨项目环境共用同一个域名

## 使用场景三：API 开放 

向合作伙伴提供内部系统 API 是一件复杂的事情，需要为所有的 API 提供统一的鉴权调用方式；需要管理所有的合作伙伴授权凭证；需要精确控制某个合作伙伴对某个 API 的调用量等。

API 网关可以帮助解决这些问题，将内部系统 API 以安全可靠的方式提供给合作伙伴，同时方便用户进行调用量的管理和分析统计。

使用 API 网关进行 API 开放，可以在`流量入口管理`中创建一个新的流量入口，并且指定场景为`面向合作伙伴开放 API `， 具体可以参考 [API网关进阶二](./api-gateway-advanced2.md)

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/cd9bda74-e31e-4c1d-9efd-99dc86bb08e3.png)




## 使用场景四：南北向流量治理

在一个微服务架构的系统内，微服务之间互相访问的流量，被称为“东西向流量”；从系统所在集群外部进入的流量，被称为“南北向流量”。与集群内部的流量不同，来自外部的流量有其特殊性和复杂性，例如可能面临恶意攻击，或者是突发的高并发业务流量。因此，需要有一个系统组件来看守好这个集群流量入口的“大门”。传统的解决方案，通常是使用 Nginx 服务器，通过人肉配置各种复杂的 Nginx 命令，并且由专人运维。这种方式，存在以下问题：

- 随着业务规模的扩大，或者负责运维人员的变动，入口流量的配置，可能会逐渐变得无法维护

- DevOps 与微服务架构是密不可分的，如果服务要做南北向流量治理，还需要请 Ops 专人操作，微服务架构的敏捷性会大打折扣

API 网关是在微服务架构下，进行南北向流量治理的最佳解决方案。以突发流量的防护为例，API 网关提供了“服务负载保护” 的 API 策略

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/101dad99-2141-4e29-aeba-c4e351060170.png)

按照`最大吞吐`配置，当突发流量超过此请求速率时， 按照配置的`最大额外延时`对超过速率部分的请求进行限速，从而实现将流量去峰填谷后转发给后端服务。当限速后的流量依然超过了吞吐，则对超出的部分返回`拒绝状态码`中指定的 HTTP 响应码，并将`拒绝应答`做为 HTTP 应答体，返回给调用方。

这样的 API 策略，可以对一整个域名生效，也可以对域名下的指定 URL 单独生效。还有其他的 API 策略和具体使用场景。可以参考 [API网关进阶一](./api-gateway-advanced1.md)



## 使用场景五：服务域名流量接管

在指定服务的 dice.yml 中添加以下配置或者直接用交互式界面添加对 API 网关的依赖

```yaml
addons:
  gateway:
    plan: "api-gateway:basic"
```

OR

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/7562ec09-b8d2-4d28-85b0-790377149023.png)

平台支持为一个服务绑定域名，如果在部署详情页，已经为服务设置好了域名，点击服务卡片的`... ` icon 图标 -> 域名管理，可以看到此处的“路由规则配置”

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/cb7c5edd-ae55-4da6-b4a4-4b4a4381603a.png)

点击进入该域名对应的流量入口，可以管理这个域名的 URL，给不同的 URL 配置所需的策略




