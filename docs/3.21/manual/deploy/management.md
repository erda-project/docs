# 应用管理

## 应用设置

### 成员管理

应用角色分为：
* 应用所有者
* 应用主管
* 开发工程师
* ~~测试工程师 (已废弃)~~
* ~~运维 (已废弃)~~

角色职责可查看应用角色页面介绍，入口为：
> DevOps 平台 -> 项目 -> 应用 -> 应用设置 -> 通用设置 -> 应用成员 -> 应用成员管理 -> 角色权限说明

管理入口为：
> DevOps 平台 -> 项目 -> 应用 -> 应用设置 -> 通用设置 -> 应用成员

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/28/7a92830d-f571-4e08-bdfd-56f6f8db0a62.png)

### 通知管理

:::tip
通知可与 [持续集成]() 组合使用，将持续集成的事件进行通知，为研发提效。
通知对象使用通知组管理,需要先建立通知组才能关联到通知
:::

目前已经支持的事件有：
* 代码推送
* 创建合并请求
* 流水线开始执行
* 流水线运行成功
* 流水线运行失败

管理入口为：
> DevOps 平台 -> 项目 -> 应用 -> 应用设置 -> 通知管理

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/28/b6740b2d-195a-429f-9287-cd717d9c0db2.png)

通知组管理：
> DevOps 平台 -> 项目 -> 应用 -> 应用设置 -> 通知组

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/10/16/daee84f0-7bff-4890-bfdf-d4bdc955b431.png)

可以通过不同的通知成员类型选择对应配置，在关联通知时会根据成员类型列出合适的通知渠道,如图所示:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/10/16/6e6aeb6a-ebb4-4964-b4d0-1180a70d0e77.png
)

## 域名管理

### 企业下域名资源查看

入口在`多云管理平台`->`资源管理`->`域名管理`

### 基于微服务网关实现域名路由（推荐）

通过 [`dice.yml`](./dice-yml.md) 配置，为服务指定 `endpoints` 即可实现微服务网关的功能

**完整的例子**

```yaml
version: 2.0
services:
  user-center:
    ports:
    - port: 8080
    endpoints:
    # 可以写成 .* 后缀，会根据集群泛域名自动补全
    - domain: hello.*
      path: /api/user
      backend_path: /api
      policies:
      # 允许跨域访问
        cors:
          allow_origins: any
      # 限制访问 qps 为100
        rate_limit:
          qps: 100
    # 可以写完整域名
    - domain: uc.app.terminus.io
      # 如果后端路径一致，可以省略 backendPath
      path: /
  acl-center:
    ports:
    - port: 8080
    endpoints:
    - domain: hello.*
      path: /api/acl
      backend_path: /api
```

`endpoints` 中的每一项由以下几个属性构成

**domain**

*必填字段*

域名，可以填完整域名，也可以只写最后一级域名，平台会基于集群泛域名进行自动补全

**path**

*选填字段*

域名路径，表示将域名下基于URL 前缀匹配到当前路径的请求都转发给该服务，不填时默认为`/`

URL 前缀匹配总是根据路径长度优先匹配，越精确越优先

**backend_path**

*选填字段*

转发给服务的路径，可以理解为将`path`部分匹配到的 URL 路径抹除后，剩余部分拼接在`backend_path`上转发给服务，不填时默认和`path`一致

**policies**

*选填字段*

当前支持跨域策略和限流策略

跨域策略：

跨域相关知识，请参考[跨域资源共享](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

以允许跨域应答头`Access-Control-Allow-Origin` 为例，配置`allow_origins`的值，会作为这个应答头的值

但当值为`any`时，比较特殊，会直接获取请求头的`Orgin`字段，作为值

对于`Access-Control-Allow-Methods`,`Access-Control-Allow-Headers`等也是同理

```yaml
      policies:
        cors:
          # 必填字段，当为 any 时，允许 origin 是任何域名进行跨域访问
          allow_origins: any
          # 非必填，默认是 any，允许 http method 是任何类型
          allow_methods: any
          # 非必填，默认是 any，允许 http header 是任何字段
          allow_headers: any
          # 非必填，默认是 true，允许 cookie 字段跨域传输
          allow_credentials: true
          # 非必填，默认是 86400，跨域预检请求一次成功后的有效时间
          max_age: 86400
```


限流降级策略：

`deny_status` 可以填`302`，这时`deny_content`可以是一个 http 地址，提供跳转

可以将这个 http 地址配置为一个降级接口，例如一个 cdn 页面，用于透出当前服务过载的信息

```yaml
      policies:
        rate_limit:
          # 必填字段，每秒最大请求速率
          qps: 100
          # 非必填字段，最大延后处理时间，默认是 50 毫秒，超过速率时不会立即拒绝，进行去峰填谷处理
          max_delay: 50
          # 非必填字段，默认是 429，延后处理后仍然超过速率，会进行拒绝，返回对应的状态码
          deny_status: 429
          # 非必填字段，默认是 server is busy，拒绝时返回的应答
          deny_content: "server is busy"
```


### 给单个服务绑定域名

确保服务通过对指定端口设定了`expose`，开启了端口暴露，只有开启了端口暴露的服务，才能够配置域名，进而对外提供服务（用户通过公网访问域名）。

:::tip
需要注意的是，这种模式下域名完全绑定在单个服务上，无法再将不同的路径转发给不同服务
这种模式的好处是，端口协议除了 http 之外，还可以支持 https/grpc/grpcs/fastcgi，通过 port 的 protocol 指定协议即可
:::

通过调整 [`dice.yml`](./dice-yml.md) 配置，可以将服务端口暴露。


```yaml{12-13}
services:
  # serviceA 是自定义的服务 A 的名字，不是 dice.yml 的配置项。
  serviceA:
    resources:
      cpu: 0.1
      max_cpu: 0.5
      mem: 256
    deployments:
      replicas: 1
    ports:
      - port: 8080
        expose: true
        # 对于非 http 的场景，需要显示指定 https/grpc/grpcs/fastcgi
        protocol: grpc
  # serviceB 是自定义的服务 B 的名字，不是 dice.yml 的配置项。
  serviceB:
    ...
```

一切就绪后，执行源码部署以生效这个配置。平台默认不会直接生成域名，部署成功后需要配置域名，管理入口在：
> DevOps 平台 -> 项目 -> 应用 -> 部署中心 -> 部署总览

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/07/16/e823940a-725e-45cf-9077-dbfb6443a585.png)

可直接使用集群提供的泛域名，或者配置自定义域名：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/07/16/72f03c60-741d-442b-a0a6-f4adc8d89462.png)


## 扩缩容

通过调整 [`dice.yml`](./dice-yml.md) 配置，可以对服务进行扩缩容。

修改 `services.serviceA.deployments.replicas`，调整服务的实例个数，然后需要执行源码部署以生效这个配置。

```yaml{9}
services:
  # serviceA 是自定义的服务 A 的名字，不是 dice.yml 的配置项。
  serviceA:
    resources:
      cpu: 0.1
      max_cpu: 0.5
      mem: 256
    deployments:
      replicas: 2
      labels:
        GROUP: erda
    ports:
      - port: 9093
        expose: false
    envs:
      ADDON_PLATFORM_ADDR: addon

  # serviceB 是自定义的服务 B 的名字，不是 dice.yml 的配置项。
  serviceB:
    ...
```

若希望临时扩缩容（即不经过源码部署），可以在界面上进行调整，入口：

> DevOps 平台 -> 项目 -> 应用 -> 部署中心 -> 部署总览

![选择要扩容的服务](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/07/16/69be6bf4-4601-44dd-b16f-fafd86573526.png)

![配置变化后会提示重启](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/07/16/a72cc559-5452-418f-a380-313a17647bf6.png)

## 重启

重启只会重新拉取 [配置](./config.md)，并不会改变运行程序的逻辑。若代码有变更，请使用 [源码部署](./deploy-from-git.md)

## 版本回滚

:::warning
可配置回滚点功能正在建设中，暂不支持
:::

操作入口：

> DevOps 平台 -> 我的项目 -> 应用列表 -> 部署中心 -> 部署总览

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/28/5b586070-32a6-46b5-8ead-cd3141755df1.png)

若无法回滚到记录点，则会提示具体原因：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/28/ae1e9973-3da5-4cfa-a578-7428ede432b8.png)

### 回滚记录

默认策略：
* 生产环境 (PROD) 保留最近 10 次成功记录可回滚
* 其他环境只保留当前记录点 (即无法进行回滚)

策略可自定义，操作入口（须企业管理员）：

> 企业中心 -> 项目管理 -> 项目 -> 回滚点设置

### 回滚过程

回滚即是一次部署，与普通的构建部署并无差异，区别在于回滚是部署一份早期的软件版本。

::: warning
由于回滚即是部署，而若回滚的版本与当前版本差异过大（如 addon 改动巨大），则会导致 addon 配置丢失
:::

## 健康检查
平台会在服务运行的整个生命周期进行健康检查探测, 过长时间不健康的服务, 会被kill后重新拉起。

服务有过多次重启的情况可以在 runtime 详情页的错误信息中看到.

健康检查的配置具体写法, 参考 [dice.yml](./dice-yml.md)

