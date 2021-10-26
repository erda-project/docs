# 平滑接管应用域名流量

Erda 支持在部署详情中为当前应用的指定服务直接绑定域名。这种方式能够快速将互联网流量接入指定服务，但无法管控域名下的流量，实现精细化路由配置、API 策略管理等 API 网关功能，例如无法将域名下的指定路径转发给另一个服务，也无法对 API 设置流量限制策略。

在此场景下，如需使用 API 网关的此类功能，只需为应用添加 API 网关扩展服务，即可自动为该应用绑定的域名生成对应的 [流量入口](../../concepts/apigw/core.md#流量入口-endpoint)。通过为该流量入口配置路由和策略实现对域名流量的管理。具体操作步骤请见下文。

## 初始状态

如下图所示，为应用服务绑定两个域名，*www.erda.cloud* 和 *about.erda.cloud*，并通过 API 网关管理域名流量。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/20/8914df26-aeb7-4999-95c7-0808e658be81.png)

## 第一步：通过 yaml 配置文件为应用添加 API 网关扩展服务

yaml 配置文件中的 addons 配置，即是为该应用添加 API 网关扩展服务。

```yaml
version: 2
values:
  production:
    instance_num: 2
services:
  dice-site:
    resources:
      cpu: 0.1
      mem: 256
    deployments:
      replicas: ${instance_num:1}
    ports:
    - port: 80
      expose: true
    health_check:
      http:
        port: 80
        path: "/"
        duration: 120
addons:
  gateway:
    plan: "api-gateway:basic"
```

完成配置后，通过流水线重新构建和部署该服务。部署成功后即可在部署详情页查看 API 网关扩展服务如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/20/cea2eb01-4773-4287-b5f3-14a144898578.png)

## 第二步：找到域名对应流量入口进行流量管理

点击该 API 网关扩展服务进入 **微服务平台 > API 网关 > 流量入口管理**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/20/af7399cd-9dd8-485f-92a7-8518ee597dcd.png)

绑定域名已生成对应流量入口。点击 **详情** 后即可对域名 *www.erda.cloud* 和 *about.erda.cloud* 进行流量管理。

