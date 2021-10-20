# 平滑接管应用域名流量

Erda 支持在部署详情中，为当前应用的指定服务直接绑定一个域名，这种方式可以快速地将互联网流量接入一个指定服务。

但这种方式下，无法管控域名下的流量，实现精细化路由配置、API 策略管理等 API 网关的功能。

比如无法将域名下的指定路径转发给另一个服务，也无法对 API 设置流量限制策略。

在这种场景下，想要使用 API 网关的这些功能，只需通过给应用添加 API 网关扩展服务，就会自动为该应用绑定的域名，生成对应的[流量入口](../../guides/apigw/core.md#流量入口-endpoint).

通过对该流量入口进行路由和策略的配置，就可以实现对域名流量的管理了。上述操作步骤具体如下：

## 示例初始状态

如下例所示，给应用里的一个服务绑定了两个域名：`www.erda.cloud` 和 `about.erda.cloud`

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/20/0ce1892b-5395-40c2-ae2f-8f76beb0eb77.png)

现在希望能通过 API 网关来管理对这两个域名的流量


## 第一步：通过 yaml 配置文件给应用添加 API 网关扩展服务

注意 yaml 配置文件中的最后一段 addons 配置，即为该应用添加了 API 网关扩展服务

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

配置好后，通过流水线触发该服务重新构建和部署，部署成功后，可以在部署详情页面看到如下 API 网关扩展服务卡片

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/20/fa094979-8e48-4a0a-a497-28dfcc2396bc.png)

## 第二步：找到域名对应的流量入口，进行流量管理

先点击 API 网关扩展服务卡片，进入微服务平台 > 再点击 API 网关下流量入口管理 Tab

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/20/a0421dd1-15e1-4734-a9da-5ee4a877ae9a.png)

在流量入口列表里可以看到，已经为之前绑定在应用上的域名，生成了一个流量入口，点击详情进入即可管理 `www.erda.cloud` 和 `about.erda.cloud` 这两个域名的流量了。

