# 应用管理

## 应用设置

### 成员管理

请进入 **DevOps 平台 > 项目 > 应用 > 应用设置 > 通用设置 > 应用成员** 操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c986059a-280f-49d6-96b7-0fca8990f606.png)

应用角色分为：
* 应用所有者
* 应用主管
* 开发工程师
* 测试工程师
* 运维工程师
* 访客

您可进入 **DevOps 平台 > 项目 > 应用 > 应用设置 > 通用设置 > 应用成员 > 应用成员管理 > 角色权限说明** 查看应用角色及对应权限。

### 通知管理

:::tip 提示
设置通知管理前，请先创建通知组。
:::

进入 **DevOps 平台 > 项目 > 应用 > 应用设置 > 通知组** 新建通知组。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/04a2503c-9c3c-495e-9e19-bb667f2e296d.png)

进入 **DevOps 平台 > 我的项目 > 应用列表 > 应用设置 > 通知管理** 新建通知。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/200ce676-8a54-4eb9-b9c5-375eb4dad395.png)

平台支持如下事项通知：
* 代码推送
* 流水线开始运行
* 流水线运行成功
* 流水线运行失败
* 合并请求-创建
* 合并请求-合并
* 合并请求-关闭
* 合并请求-评论
* 删除分支
* 删除标签

## 域名管理

### 查看企业域名资源

请进入 **多云管理平台 > 资源管理 > 域名管理** 查看。

### 基于微服务网关实现域名路由（推荐）

通过 erda.yml 为服务指定 Endpoints 即可实现微服务网关功能，将一个域名的不同路径转发给相同项目和环境下的不同服务。

具体示例如下：

```yaml
version: "2.0"
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
      # 限制访问 QPS 为100
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

Endpoints 由以下属性组成：

* **domain**（必填）：

  域名，可填写完整域名，也可仅填写最后一级域名（平台会基于集群泛域名自动补全）。

* **path**（选填）：

  域名路径，域名下基于 URL 前缀匹配到当前路径的请求都将转发给该服务，未填写时默认为 `/`。URL 前缀会根据路径长度匹配，路径精确度越高，则优先级越高。

* **backend_path**（选填）：

  转发给服务的路径，可理解为将 `path` 部分匹配到的 URL 路径抹除后，剩余部分拼接在 `backend_path` 上转发给服务，未填写时默认和 `path` 一致。

* **policies**（选填）：

  当前支持跨域策略和限流策略。

  * 跨域策略：关于跨域相关信息，请参见 [跨域资源共享](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)。
    以允许跨域应答头 `Access-Control-Allow-Origin` 为例，`allow_origins ` 配置的值将作为这个应答头的值。当值为 `any` 时，则直接获取请求头的 `Orgin` 字段作为值。
    `Access-Control-Allow-Methods`、`Access-Control-Allow-Headers` 等同理。

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

  * 限流降级策略：若填写 `deny_status` 为 `302`，此时 `deny_content` 可作为 HTTP 地址提供跳转，还可将该地址配置为一个降级接口（例如 CDN 页面），用于透出当前服务过载的信息。

    ```yaml
          policies:
            rate_limit:
              # 必填字段，每秒最大请求速率
              qps: 100
              # 非必填字段，最大延后处理时间，默认是 500 毫秒，超过速率时不会立即拒绝，进行去峰填谷处理
              max_delay: 500
              # 非必填字段，默认是 429，延后处理后仍然超过速率，会进行拒绝，返回对应的状态码
              deny_status: 429
              # 非必填字段，默认是 server is busy，拒绝时返回的应答
              deny_content: "server is busy"
    ```

### 为单个服务绑定域名

为指定端口设定 `expose`，开启端口暴露，以实现域名配置，从而对外提供服务（用户可通过公网访问域名）。

:::tip 提示
该模式下域名绑定在单个服务上，无法将不同路径转发给不同服务。其优势在于，端口协议可支持 HTTP、HTTPS、gRPC、gRPCs、FastCGI，通过 `port` 的 `protocol` 指定协议即可。
:::

调整 erda.yml 配置，暴露服务端口。


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

完成上述操作后，执行源码部署使配置生效。部署成功后进入 **DevOps 平台 > 项目 > 应用 > 部署中心 > 部署总览** 配置域名。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/b36cdfc3-488c-4fe6-804e-2f22dfe7bf61.png)

可使用集群提供的泛域名，或配置自定义域名。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/8cdc9338-4f43-41f8-b884-ed1c49da7880.png)


## 扩缩容

可调整 erda.yml 配置对服务进行扩缩容。

修改 `services.serviceA.deployments.replicas`，调整服务的实例数量，随后执行源码部署使配置生效。

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

若仅需临时扩缩容（即不涉及源码部署），可进入 **DevOps 平台 > 项目 > 应用 > 部署中心 > 部署总览** 调整。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/42e3d7be-a35c-4350-abca-3569a004e6a6.png)

完成调整后将提示重启 Runtime。

## 重启

重启仅重新拉取 [配置](config.md)，不会改变运行程序的逻辑。若代码有变更，请参见 [基于 Git 源码部署](../../examples/deploy/deploy-from-git.md)。

## 版本回滚

进入 **DevOps 平台 > 我的项目 > 应用列表 > 部署中心 > 部署总览**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/452cb795-5283-4a02-bc88-f1c6f94013a8.png)

若回滚失败，将提示具体原因：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c79089fd-54ae-4a89-8443-a2d78a9d7588.png)

### 回滚记录

回滚记录的默认策略如下：
* 生产环境（PROD）保留最近 10 次成功记录可回滚。
* 其他环境仅保留当前记录（即无法进行回滚）。

回滚策略可自定义，请进入 **管理中心 > 项目管理 > 项目 > 回滚点设置** 操作。

### 回滚过程

回滚即一次部署，与正常的构建部署并无差异，区别仅在于回滚用于部署早期的软件版本。

::: warning 警告
若回滚版本与当前版本差异过大（例如 Addon 改动较大），将导致 Addon 配置丢失。
:::

## 健康检查
平台将对服务运行的整个生命周期进行健康检查探测，即运行一个指定命令，通过查看命令执行的退出码是否为 0 来判断服务的健康情况， 例如调用服务的 Health API。

服务多次重启的情况可在 Runtime 详情页的错误信息中查看。

若未通过健康检查，其产生的历史容器状态为 Error，exit-code 为 137、143 等。

请进入 **代码仓库 > erda.yml > health_check** 配置健康检查。

