# 基于 Helm 高可用安装

## 准备工作

1. 请确认现有 Kubernetes 集群满足 [前提条件](premise.md)。

2. 高可用安装模式适用于生产环境，Erda 的核心组件及重要依赖均采用多副本方案部署。该模式默认提供配置参数，同时请注意以下事项：

   - MySQL 不支持高可用，建议您接入自己的 MySQL 或云服务商 RDS 以保证稳定性，具体请参见 [如何接入已有中间件](high-availability.md#如何接入已有中间件)。
   - 建议您妥善保存私有化配置，以便后续升级维护，具体请参见 [如何保存私有化配置](high-availability.md#如何保存私有化配置)。
   - 该模式默认提供 Erda 及依赖的配置参数，您可以根据实际部署情况修改，具体请参见 [高可用部署可配置参数](high-availability.md#高可用部署可配置参数)。
   - 您需要合理划分 Erda 组件及依赖组件的节点，请参见 [高可用组件分类调度](comp-schedule.md)。

3. 添加 Erda Helm Chart 仓库并更新。

   ```shell
   helm repo add erda https://charts.erda.cloud/erda
   helm repo update
   ```

## 安装操作

### 安装配置

您可以通过配置文件描述 Erda 高可用安装的个性化配置，例如 `custom_values.yaml`：

```yaml
global:
  size: prod
  domain: "erda.io"

erda:
  clusterName: "local-cluster"

mysql:
  enabled: false
  custom:
    address: "rds.xxx.com"
    port: "3306"
    database: "erda"
    user: "erda"
    password: "********"

registry:
  custom:
    nodeIP: 172.16.0.6
    nodeName: cn-hangzhou.172.16.0.6
```

具体参数说明如下：

| 参数 | 描述 |
|:----|:---|
| global.size | 表示部署模式（支持 `demo` 和 `prod`），高可用部署设置为 `prod` |
| global.domain | Erda 当前集群绑定的泛域名 |
| erda.clusterName | Erda 所在 Kubernetes 集群的标识 |
| mysql.enabled | MySQL 部署开关，接入外部 MySQL 时需设置为 false |
| mysql.custom.* | 接入用户提供的 MySQL 信息 |
| registry.custom.* | registry host 模式配置信息 |

更多配置项请参见 [高可用部署可配置参数](high-availability.md#高可用部署可配置参数)。

### 安装 Erda

使用指定安装配置文件即可部署 Erda 至 Namespace `erda-system`。

```shell
helm install erda erda/erda -f custom_values.yaml -n erda-system --create-namespace
```

::: tip 提示

您可以通过 `--version` 参数安装指定版本的 Erda，未指定则默认安装最新版本。

:::

## 安装验证

::: tip 提示

您需要提供 Erda 所部署的 Namespace，例如 erda-system。

:::

您可以通过如下命令验证 Erda 高可用安装结果：

- 验证 Erda 状态

  ```shell
  $ kubectl get erda erda -n erda-system
  NAME   STATUS    LASTMESSAGE
  erda   Running   create dice cluster success
  ```

- 验证 Erda 依赖
    - **erda-elasticsearch**：Erda 后端的 Elasticsearch 集群实例。
    - **erda-etcd-***：Erda 后端的 etcd 集群节点实例。
    - **erda-zookeeper-***：Erda 后端的 Zookeeper 集群节点实例。
    - **erda-kafka-***：Erda 后端的 Kafka 集群节点实例。
    - **erda-mysql**：Erda 后端的 MySQL 实例，暂不支持高可用部署方案。
    - **erda-registry**：Erda 后端的 Registry 实例，暂不支持高可用部署方案。
    - **rfr-erda-redis**：Erda 后端 RedisFailover 部署的 Redis 主备集群实例。

  ```shell
  $ kubectl  get statefulset -n erda-system
  NAME                       READY   AGE
  erda-elasticsearch         3/3     12h
  erda-etcd-0                1/1     12h
  erda-etcd-1                1/1     12h
  erda-etcd-2                1/1     12h
  erda-kafka-1               1/1     12h
  erda-kafka-2               1/1     12h
  erda-kafka-3               1/1     12h
  erda-mysql                 1/1     12h
  erda-registry              1/1     12h
  erda-zookeeper-1           1/1     12h
  erda-zookeeper-2           1/1     12h
  erda-zookeeper-3           1/1     12h
  rfr-erda-redis             2/2     12h
  ```

完成验证后，您需要进行一些简单的配置以访问 Erda , 具体请参见 [配置及访问](configuration.md)。
