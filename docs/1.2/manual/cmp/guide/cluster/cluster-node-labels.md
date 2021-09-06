# 节点标签设置

Erda 支持通过标签对机器进行分类，以满足不同的调度需求。

## 支持宿主机基于环境隔离

Erda 为项目内置了 4 套环境，并对应设计了 4 个环境标签：workspace-dev、workspace-test、workspace-staging、workspace-prod。

宿主机可设置其中一个或多个标签，以表明该机器能够调度对应环境的应用，同时还可通过该标签实现宿主机环境级别的隔离。

::: tip 提示

所有为项目服务的宿主机，必须设置一个及以上环境标签，否则将无法调度应用。

:::

## 设置宿主机可运行的服务

Erda 设计了两类服务标签：service-stateless、service-stateful，分别用于调度无状态服务和有状态服务。

* 无状态服务对应部署中心的 Runtime 服务，因此对运行项目应用的宿主机，均需设置 service-stateless 标签。

* 有状态服务对应中间件 Addon。该 Addon 内置多种常规的中间件，例如 MySQL、Elasticsearch、RocketMQ 等，且大部分为有状态应用，涉及数据存储，因此需和普通项目应用作区分。若项目需使用 Erda 的 Addon，则需对指定的宿主机设置 service-stateful 标签。

## 设置宿主机可运行的任务

Erda 通过流水线支撑各类场景的任务编排，同样也为这些场景设置了不同的标签。

- CI/CD 任务，用于支撑项目开发、部署，对应标签为 pack-job。
- 大数据计算任务，对应标签为 bigdata-job。
- 平台运维任务，例如添加机器、升级集群等，对应标签为 job。

::: tip 提示

不同场景可对应设置不同的标签。项目开发过程中，请注意务必设置 pack-job 标签，否则项目应用将无法打包部署。

:::

## 指定宿主机运行特定的应用

Erda 设计了自定义标签 location-xx，以支持用户将指定的应用运行到指定节点。

例如，如需将 datastore 的应用运行到指定宿主机，则具体步骤如下：

1. 为指定的宿主机设置自定义标签 location-datastore。

2. 设置应用的 `erda.yml`，配置 `deployments` 字段如下：

   ```yaml
   deployments:
         replicas: 2
         selectors:
           location: "datastore"
   ```

3. 若机器为该应用独占，则还需为宿主机设置 location 标签。

## 其他应用场景

- Erda 平台标签，用于指定运行平台服务，标签名为 platform。
- 集群服务标签，用于指定运行 Erda 平台微服务组件，例如 API 网关、配置中心和注册中心，标签名 location-cluster-service。如需独占服务，则还需设置 location 标签。
- 机器异常，需锁定机器不再调度新的服务，标签名为 locked。

::: tip 提示

当前若手动下线宿主机，需在下线前为宿主机设置 offline 标签，用于监控系统联动。

:::

## 标签汇总

- **pack-job**：打包任务标签，可运行打包任务。
- **job**：短时任务标签，非打包任务。
- **service-stateless**：无状态服务标签，可用于部署 Runtime 服务。
- **service-stateful**：有状态服务标签，可用于部署 Addon 服务。
- **workspace-xxx**：环境标签，包括 workspace-dev，workspace-test，workspace-staging，workspace-prod，分别对应 Erda 部署的四个环境。
- **location-cluster-service**：集群服务标签，用于调度集群共用的服务组件，例如 API 网关、注册中心等。
- **location-xx**：自定义标签，支持用户将指定的应用运行到指定节点。
- **location**：独占标签，设置该标签的节点仅能运行 location-cluster-service 和 location-xx 对应的应用。
- **locked**：锁定标签，锁定机器避免被调度。
- **offline**：节点下线标签。
- **platform**：平台组件标签，运行 Erda 平台组件。

::: tip 提示

您可以通过以下两种方式设置标签：

* 进入 **多云管理平台 > 集群总览 > 机器列表**，选择机器后点击 **设置标签**。

* 添加机器时直接配置所需标签。

:::
