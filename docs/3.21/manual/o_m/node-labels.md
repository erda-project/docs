# 节点标签设置

Erda 平台支持通过标签来对机器进行分类，以满足不同的调度需求。

下面根据不同的场景，介绍下如何设置机器标签。

## 支持宿主机基于环境隔离

Erda 为项目内置了 4 套[环境](../platform-design.md#环境)，也对应设计了 4 个环境标签：**workspace-dev、workspace-test、workspace-staging、workspace-prod**。

宿主机可以设置其中一个或者多个标签，以表明这台机器可以调度哪个环境的应用。用该标签也就可以实现宿主机环境级别的隔离。

> 注意：所有提供给项目使用的宿主机，必须打一个及以上环境标签，否则将无法调度应用。

## 设置宿主机可运行的服务

Erda 设计了两类服务标签：**service-stateless**、**service-stateful**。分别用于调度无状态服务和有状态服务。

无状态服务对应于[部署中心的 runtime 服务](../platform-design.md#服务和-runtime)，所以需要对运行项目应用的宿主机，都打上 service-stateless 标签。

有状态服务对应于[addon](../addons/README.md)，该 addon 内置了很多常规的中间件，比如 MySQL、ElasticSearch、RocketMQ 等，大部分的中间件都是有状态应用，涉及了数据的存储，故需要与普通项目应用进行区分。如果项目需要使用 Erda 的 addon，则也对指定的宿主机打上 service-stateful 标签。

## 设置宿主机可运行的任务

Erda 平台通过[流水线](../deploy/pipeline.md)支撑各种场景的任务编排，对这些场景也分别设置了不同的标签：

- CI/CD 任务，用于支撑项目开发、部署。对应的标签为 **pack-job**。
- 大数据计算任务，对应的标签为 **bigdata-job**。
- 平台运维任务，比如添加机器、集群升级等，也利用了流水线的能力。对应的标签为 **job**。

应对不同的场景，可以设置不同的标签。项目开发一定要注意设置 **pack-job** 标签，否则项目应用无法打包部署。

## 指定宿主机运行特定的应用

Erda 设计了自定义标签：**location-xx**，以支持用户将指定的应用运行到指定的节点。

举个例子，需要将 datastore 的应用，运行到指定的宿主机。步骤如下：

- 先将指定的宿主机，打上自定义标签 “location-datastore”

- 设置应用的 [dice.yml](TODO)，配置 deployments 字段如下：

  ```yaml
  deployments:
        replicas: 2
        selectors:
          location: "datastore"
  ```

- 如果机器需要给该应用独占，则还需要再给这些宿主机打上 “**location**” 标签。

## 其他标签使用场景

- Erda 平台标签，用于指定运行平台服务。标签名为：“**platform**”;
- 集群服务标签，用于指定运行 Erda 平台微服务组件，比如 API 网关、配置中心、注册中心。当前 Erda 的通知中心也使用了同样的标签。标签名为：“**location-cluster-service**”。如果需要独占，还需要再设置 “**location**” 标签；
- 机器异常，需要锁定机器不再调度新的服务。标签名：“locked”；

> 注意：当前如果是手动进行宿主机下线，则在下线前先给宿主机设置 **offline** 标签，用于监控系统联动。

## 标签汇总

- **pack-job**: 打包任务标，能够跑打包任务。
- **job**: 短时任务标，非打包任务。
- **service-stateless**: 无状态服务标，Erda 部署的 runtime 服务使用该标签。
- **service-stateful**: 有状态服务标，可用于部署 addon 服务。
- **workspace-xxx**: 环境标，包括：workspace-dev, workspace-test, workspace-staging, workspace-prod，分别对应 Erda 部署的四个环境。
- **location-cluster-service**：集群服务标签，用来调度集群共用的服务组件，比如 API 网关、注册中心等。
- **location-xx**：自定义标签，支持用户将指定的应用运行到指定的节点。
- **location**：独占标签，打了该标签的节点只能运行 location-cluster-service 和 location-xx 对应的应用。
- **locked**: 锁定该机器，避免被调度。
- **offline**: 节点下线标签
- **platform**: 平台组件标，运行 Erda 平台组件。

设置标签的操作入口位于：`多云管理平台 -> 集群总览 -> 机器列表 -> 选择机器设置标签`。

> 除了这个入口，还可以在添加机器时直接配置所需的标签。
