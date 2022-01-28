# 使用服务网格(Service Mesh)

平台基于原生 istio 提供了服务网格的能力

## 添加服务网格 addon

平台提供了十分简单的开启服务网格的方式，只需在 dice.yml 中添加服务网格 addon，重建流水线进行部署，就可以开启服务网格的功能

界面方式添加：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/12/11/3ae59e44-27e4-4670-894d-97b69c6ddd07.png)

文本方式添加：

```yaml
version: "2.0"
envs: {}
services:
  foobar:
...
...
addons:
  mesh:
    plan: "service-mesh:basic"

```

::: tip
如果部署失败，可能是 istio 尚未在集群内安装，当前需要联系平台支持同学进行安装
:::


需要**注意**的是，当前服务网格的大部分策略只会针对 http/https/grpc 协议生效，所以 dice.yml 中需要对端口申明好明确的协议，否则功能无法生效

需要**特别注意**的是，开启了服务网格，必须在 dice.yml 中显示配置[健康检查方式](../deploy/dice-yml.html#health-check)，使用 http 或者 exec 的方式进行健康检查

因为不显示配置健康检查时，默认使用端口检测；开启服务网格后，iptables 规则会将服务监听端口转发给 sidecar 实例，健康检查直接通过了，但业务实例可能还在初始化并没有监听端口

举例如下

```yaml
version: "2.0"
envs: {}
services:
  foobar:
    ports:
    # http 协议端口，可以使用服务网格功能
    - port: 8080
      protocol: http
    # dubbo 协议端口，无法使用服务网格功能，也无需指定协议
    - port: 20880
    health_check:
      http:
        port: 8080
        path: /health
        duration: 300
addons:
  mesh:
    plan: "service-mesh:basic"
```



## 开启透明加密传输

想要基于 istio 的 mTLS 开启业务层无感知的透明加密传输，只需在 dice.yml 中添加以下配置

```yaml
version: "2.0"
envs: {}
services:
  foobar:
    traffic_security:
      mode: https
...
...
addons:
  mesh:
    plan: "service-mesh:basic"
```

只有添加了 service-mesh addon 的服务，才能访问该服务

::: warning
开启加密传输之后，服务如果要单独暴露域名，请参考[基于微服务网关实现域名路由](../deploy/management.html#域名管理)

给单个服务绑定域名的方式，将无法访问
:::
