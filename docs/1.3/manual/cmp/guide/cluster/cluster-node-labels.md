# 节点标签

Erda 支持通过标签对机器进行分类，以满足不同的调度需求。

## 支持宿主机基于环境隔离

Erda 为项目内置了 4 套环境，并对应设计了 4 个环境标签：

- 开发环境：`dice/workspace-dev=true`
- 测试环境：`dice/workspace-test=true`
- 预发环境：`dice/workspace-staging=true`
- 生产环境：`dice/workspace-prod=true`

宿主机可设置其中一个或多个标签，以表明该机器能够调度对应环境的应用，同时还可通过该标签实现宿主机环境级别的隔离。

::: tip 提示

所有为项目服务的宿主机，必须设置一个及以上环境标签，否则将无法调度应用。

:::

## 设置宿主机可运行的服务

Erda 设计了两类服务标签：`dice/service-stateless=true`、`dice/service-stateful=true`，分别用于调度无状态服务和有状态服务。

* 无状态服务对应部署中心的 Runtime 服务，因此对运行项目应用的宿主机，均需设置 service-stateless 标签。

* 有状态服务对应中间件 Addon。该 Addon 内置多种常规的中间件，例如 MySQL、Elasticsearch、RocketMQ 等，且大部分为有状态应用，涉及数据存储，因此需和普通项目应用作区分。若项目需使用 Erda 的 Addon，则需对指定的宿主机设置 service-stateful 标签。

## 设置宿主机可运行的任务

Erda 通过流水线支撑各类场景的任务编排，同样也为这些场景设置了不同的标签。

- CI/CD 任务，用于支撑项目开发、部署，对应标签为 `dice/job=true`。
- 大数据计算任务，对应标签为 `dice/bigdata-job=true`。

## 指定宿主机运行特定的应用

Erda 设计了自定义标签 location-xx，以支持用户将指定的应用运行到指定节点。

例如，如需将 example 的应用运行到指定宿主机，则具体步骤如下：

1. 为指定的宿主机设置自定义标签 `dice/location-example=true`。

2. 设置应用的 `erda.yml`，配置 `deployments` 字段如下：

   ```yaml
   deployments:
         replicas: 2
         selectors:
           location: "example"
   ```

3. 若机器为该应用独占，则还需为宿主机设置 `dice/location=true` 标签。

## 其他应用场景

- Erda 平台标签，用于指定运行平台服务，标签为 `dice/platform=true`。
- 集群服务标签，用于指定运行 Erda 平台微服务组件，例如配置中心和注册中心，标签为 `dice/location-cluster-service=true`。

## 标签汇总

- `dice/job=true`：用于调度流水线任务
- `dice/bigdata-job=true`：用于调度大数据任务
- `dice/service-stateless=true`：用于调度无状态服务标签，可用于部署 Runtime 服务
- `dice/service-stateful=true`：用于调度有状态服务标签，可用于部署 Addon 服务
- `dice/workspace-xxx=true`：用于调度至指定环境，包括 workspace-dev、workspace-test、workspace-staging、workspace-prod，分别对应 Erda 部署的四个环境
- `dice/location-cluster-service=true`：用于调度集群共用的服务组件，例如注册中心
- `dice/location-xxx=true`：自定义标签，支持用户将指定的应用运行到指定节点
- `dice/location=true`：独占标签，设置该标签的节点仅能运行 location-xxx 对应的应用
- `dice/platform=true`：用于调度 Erda 平台组件

