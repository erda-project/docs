# 基于 Helm 高可用安装 Erda

## 准备工作

1. 请确保现有 Kubernetes 集群满足 [先决条件](premise.md)。

2. 高可用安装适用于生产环境，Erda 的核心组件及重要依赖均采用多副本方案部署，该安装方式将提供适用于生产的默认配置，但是请注意以下几点:

   - MySQL 不支持高可用，建议您接入自己的 MySQL 或云服务商 RDS 以保证稳定性，具体请参见 [如何接入已有中间件](high-availability.md#如何接入已有中间件)。

   - 建议您妥善保存私有化配置，以便后续升级维护，具体请参见 [如何保存私有化配置](high-availability.md#如何保存私有化配置)。

   - 默认已提供 Erda 及依赖的配置参数，您可以根据实际部署情况修改，具体请参见 [高可用部署可配置参数](high-availability.md#高可用部署可配置参数)。

3. 添加 Erda Helm Chart 仓库，并更新。

```shell
helm repo add erda https://charts.erda.cloud/erda
helm repo update
```

## 开始安装

### 安装配置

您可以通过配置文件来描述 Erda 高可用安装的个性化配置，例如 `custom_values.yaml` : 

```yaml
global:
  size: prod
  domain: "erda.io"

erda:
  clusterName: "erda-prod"

mysql:
  enbaled: false
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

参数解释:
| 参数 | 描述 |
|:----|:---|
| global.size | 表示部署模式（支持 `demo` 和 `prod` 两种），高可用部署设置为 `prod` |
| global.domain | Erda 当前集群绑定的泛域名 |
| erda.clusterName | Erda 所在 Kubernetes 集群的标识 |
| mysql.enabled | mysql 部署开关，接入外部 MySQL 时需设置为 false |
| mysql.custom.* | 接入用户提供的 MySQL 信息 |
| registry.custom.* | registry host 模式配置信息 |

更多配置项请参考 [高可用部署可配置参数](high-availability.md#高可用部署可配置参数)。

### 安装 Erda

指定安装配置文件即可部署 Erda 到 Namespace `erda-system`。

```shell
helm install erda erda/erda -f custom_values.yaml -n erda-system --create-namespace
```

::: tip 提示

您可以通过 `--version` 参数安装指定版本的 Erda，未指定默认安装最新版本。

:::

## 验证安装

您可以通过如下命令验证 Erda 高可用安装结果：

::: tip 提示

您需要提供 Erda 所部署的 Namespace，比如 erda-system。

:::

- 验证 Erda 状态

  ```shell
  $ kubectl get erda erda -n erda-system
  NAME   STATUS    LASTMESSAGE
  erda   Running   create dice cluster success
  ```

- 验证 Erda 依赖
    - **erda-cassandra-**：Erda 后端的 Cassandra 集群实例，由 Cassandra Operator 通过 CassandraCluster 对象创建。
    - **erda-elasticsearch**：Erda 后端 Elasticsearch 集群实例。
    - **erda-etcd-***：Erda 后端的 etcd 集群节点实例。
    - **erda-zookeeper-***：Erda 后端的 Zookeeper 集群节点实例。
    - **erda-kafka-***：Erda 后端的 Kafka 集群节点实例。
    - **erda-mysql**：Erda 后端的 MySQL 实例，暂不支持高可用部署方案。
    - **erda-registry**：Erda 后端的 Registry 实例，暂不支持高可用部署方案。
    - **rfr-erda-redis**：Erda 后端 RedisFailover 部署的 Redis 主备集群实例。

  ```shell
  $ kubectl  get statefulset -n erda-system
  NAME                       READY   AGE
  erda-cassandra-dc1-rack1   1/1     12h
  erda-cassandra-dc1-rack2   1/1     12h
  erda-cassandra-dc1-rack3   1/1     12h
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

验证完成后，您需要进行一些简单的配置来访问 Erda , 请参考 [配置及访问 Erda](configuration.md)。