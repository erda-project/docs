# 基于 IaC 避免多环境下的重复配置

网关管控虽然提供了交互式 UI，可以对各种路由和策略功能进行配置。但使用交互式配置也有弊端：当有多套环境，要做类似的路由策略配置时，需要进行枯燥的重复配置；也容易出现一个 API 在开发环境配置了，但在生产环境却遗漏了。

基于 IaC（Infrastructure as Code）的思想，网关的路由策略配置当然也是基础设施的一部分，可以基于 GitOps 的方式管理起来。平台支持基于 `erda.yml` ，从服务的视角出发，进行网关路由配置，下面以具体的场景案例来说明如何配置。

## 场景案例

### 结构：项目 - 应用(代码仓库 repo) - 服务

- 在 DevOps 平台里新建了一个项目 X
- 项目 X 下有三个应用 repo，分别是 
  1. 用户中心应用：user
  2. 权限中心应用：acl
  3. 资源中心应用：resource
- user 应用下有两个服务模块，分别是
  1. 业务 API 模块: user-api
  2. 管理 API 模块: user-admin
- acl 应用下有两个服务模块，分别是
  1. 业务 API 模块: acl-api
  2. 管理 API 模块: acl-admin
- resource 应用下有一个服务模块
  1. 业务 API 模块: resource-api
  2. 管理 API 模块：resource-admin
  

### 路由需求

- 要构建两个网页站点，分别是
  1. 业务站点
  2. 后台管理站点
- 对于 user、acl、resource 三个应用
  1. 业务 API 统一收敛到业务资源站点的域名下
  2. 管理 API 统一收敛到后台管理站点的域名下
- 两个站点，需要分别构建四套环境，其中开发测试预发共用一套集群，生产独占一套集群
  1. 开发环境：集群泛域名为 *.noprod.com
  2. 测试环境: 集群泛域名为 *.noprod.com
  3. 预发环境: 集群泛域名为 *.noprod.com
  4. 生产环境: 集群泛域名为 *.prod.com
- 一共有 8 个域名
  1. 业务站点的 4 个环境
    - 开发：dev-biz.noprod.com
    - 测试：test-biz.noprod.com
    - 预发：staging-biz.noprod.com
    - 生产：biz.prod.com
  2. 后台管理站点的 4 个环境
    - 开发: dev-admin.noprod.com
    - 测试: test-admin.noprod.com
    - 预发: staging-admin.noprod.com
    - 生产: admin.prod.com
    
### API 策略需求

- 需要对生产环境业务站点的资源 API 限制每秒访问次数为 100

### erda.yml 示例

对于 user、acl、resource 这三个应用 repo，各自的 erda.yml，下面分别给出（略去了服务健康检查、内存 cpu 资源限制等配置项）

#### user 的 erda.yml

```yaml
version: 2.0
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

使用`values`变量配置的机制，可以实现对不同的环境配置不同的域名。

可以注意到，虽然生产环境(production)的集群泛域名和另外三个环境不同，但在配置域名变量时可以配置为`.*`，这样网关实际生成域名时，会自动将`.*`替换为对应集群的泛域名。

:::tip 路径前缀配置说明

路由转发配置中的`path` 和 `backend_path`，其含义是网关接收到`path`路径前缀开头的请求，会将对应前缀移除，然后将剩余部分拼接在`backend_path` 之后，转发给对应服务。当`backend_path` 和 `path` 相同时，`backend_path` 项可以省略。

以上面这个为例，`path`为`/api/user`, `backend_path`为`/api`，当网关接收到的请求路径为`/api/user/users/123` 时，转发给后端服务的请求实际为`/api/users/123`

:::



#### acl 的 erda.yaml

```yaml
version: 2.0
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

配置和 user 类似，不再赘述。可以注意到，acl 和 user 的 endpoints 域名都是一样的，只是域名下 API 前缀不同，这样实现了跨应用和服务的域名统一，基于 API 路由到不同应用 repo 内的不同服务模块。

#### resource 的 erda.yml

```yaml
version: 2.0
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

为了满足资源获取接口要在生产环境进行流量限制，基于 `rate_limit` 策略进行了流量配置，`${qps_limit:0}`的含义是，如果对应环境下没有此变量配置，则默认值为`0`，即不进行限流。因为只在生产环境配置了`qps_limit: 100`, 所以只有在生产环境才会有 100 qps 的流量限制。
