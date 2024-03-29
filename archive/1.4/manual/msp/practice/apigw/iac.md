# 基于 IaC 避免多环境下的重复配置

网关管控虽提供了交互式 UI，可对各类路由和策略功能进行配置，但在多环境场景下，类似的路由策略配置将产生大量枯燥的重复操作，并且容易出现遗漏，例如某个 API 在开发环境已完成配置，但未在生产环境进行配置。

基于 IaC（Infrastructure as Code）理念，网关的路由策略配置同样是基础设施的一部分，可基于 GitOps 的方式进行管理。平台支持基于 erda.yml，从服务的视角出发，进行网关路由配置。下文将通过具体的场景案例展开说明。

## 案例结构

本案例的整体结构为：项目 > 应用（代码仓库 Repo）> 服务

- 在 DevOps 平台新建一个项目 X
- 项目 X 下有三个应用 Repo，分别为： 
  1. 用户中心应用：User
  2. 权限中心应用：ACL
  3. 资源中心应用：Resource
- User 应用下有两个服务模块，分别为：
  1. 业务 API 模块：user-api
  2. 管理 API 模块：user-admin
- ACL 应用下有两个服务模块，分别为：
  1. 业务 API 模块：acl-api
  2. 管理 API 模块：acl-admin
- Resource 应用下有两个服务模块，分别为：
  1. 业务 API 模块：resource-api
  2. 管理 API 模块：resource-admin
  

## 路由需求

- 构建两个网页站点，分别为：
  1. 业务站点
  2. 后台管理站点
- 对于 User、ACL、Resource 三个应用
  1. 业务 API 统一收敛到业务资源站点的域名下
  2. 管理 API 统一收敛到后台管理站点的域名下
- 为两个站点分别构建四套环境，其中开发、测试、预发环境共用一套集群，生产环境独占一套集群
  1. 开发环境：集群泛域名为 **.noprod.com*
  2. 测试环境：集群泛域名为 **.noprod.com*
  3. 预发环境：集群泛域名为 **.noprod.com*
  4. 生产环境：集群泛域名为 **.prod.com*
- 共计 8 个域名
  1. 业务站点的 4 个环境
    - 开发：*dev-biz.noprod.com*
    - 测试：*test-biz.noprod.com*
    - 预发：*staging-biz.noprod.com*
    - 生产：*biz.prod.com*
  2. 后台管理站点的 4 个环境
    - 开发：*dev-admin.noprod.com*
    - 测试：*test-admin.noprod.com*
    - 预发：*staging-admin.noprod.com*
    - 生产：*admin.prod.com*
  
## API 策略需求

需对生产环境业务站点的资源 API 限制每秒访问次数为 100。

User、ACL、Resource 应用 Repo 对应的 erda.yml 示例如下（省略服务健康检查、内存 CPU 资源限制等配置项）。

## User

```yaml
version: "2.0"
values:
  development:
    biz-domain: dev-biz.*
    admin-domain: dev-admin.*
  test:
    biz-domain: test-biz.*
    admin-domain: test-admin.*
  staging:
    biz-domain: staging-biz.*
    admin-domain: staging-admin.*
  production:
    biz-domain: biz.*
    admin-domain: admin.*
services:
  user-api:
    ports:
    - port: 8080
    endpoints:
    - domain: ${biz-domain}
      path: /api/user
      backend_path: /api
  user-admin:
    ports:
    - port: 8080
    endpoints:
    - domain: ${admin-domain}
      path: /api/user
      backend_path: /api
```

使用 `values` 变量配置的机制，可为不同的环境配置不同的域名。

由上可发现，虽然生产环境（production）的集群泛域名与另外三个环境不同，但在配置域名变量时可配置为 `.*`，网关实际生成域名时，可自动将 `.*` 替换为对应集群的泛域名。

:::tip 提示

路由转发配置中的 `path` 和 `backend_path`，其含义是网关接收到 `path` 路径前缀开头的请求，会将对应前缀移除，随后将剩余部分拼接在 `backend_path` 之后，转发至对应服务。当 `backend_path` 和 `path` 相同时，`backend_path` 项可省略。

以上文为例，`path` 为 `/api/user`，`backend_path` 为 `/api`，当网关接收到的请求路径为 `/api/user/users/123` 时，转发至后端服务的请求实际为 `/api/users/123`。

:::

## ACL

```yaml
version: "2.0"
values:
  development:
    biz-domain: dev-biz.*
    admin-domain: dev-admin.*
  test:
    biz-domain: test-biz.*
    admin-domain: test-admin.*
  staging:
    biz-domain: staging-biz.*
    admin-domain: staging-admin.*
  production:
    biz-domain: biz.*
    admin-domain: admin.*
services:
  acl-api:
    ports:
    - port: 8080
    endpoints:
    - domain: ${biz-domain}
      path: /api/acl
      backend_path: /api
  acl-admin:
    ports:
    - port: 8080
    endpoints:
    - domain: ${admin-domain}
      path: /api/acl
      backend_path: /api
```

ACL 的配置和 User 类似，此处不再赘述。同时可发现，ACL 和 User 的 Endpoints 域名是一致的，仅是域名下的 API 前缀不同，由此实现跨应用和服务的域名统一，基于 API 路由至不同应用 Repo 内的不同服务模块。

## Resource

```yaml
version: "2.0"
values:
  development:
    biz-domain: dev-biz.*
    admin-domain: dev-admin.*
  test:
    biz-domain: test-biz.*
    admin-domain: test-admin.*
  staging:
    biz-domain: staging-biz.*
    admin-domain: staging-admin.*
  production:
    biz-domain: biz.*
    admin-domain: admin.*
    qps_limit: 100
services:
  resource-api:
    ports:
    - port: 8080
    endpoints:
    - domain: ${biz-domain}
      path: /api/resource
      backend_path: /api
      policies:
        rate_limit:
          qps: ${qps_limit:0}
  resource-admin:
    ports:
    - port: 8080
    endpoints:
    - domain: ${admin-domain}
      path: /api/resource
      backend_path: /api
```

为满足资源获取接口在生产环境进行流量限制，此处基于 `rate_limit` 策略进行流量配置。`${qps_limit:0}` 代表若对应环境下无该变量配置，则默认值为 `0`，即不进行限流。由于仅在生产环境配置 `qps_limit: 100`，因此仅在生产环境有 100 QPS 的流量限制。
