# 高可用组件分类调度

## 资源需求总量说明

下表为 Erda 高可用部署时依赖及组件 CPU、Memory、Storage 资源的需求说明。

::: tip 提示

1. 表中的资源数据对应生产环境高可用部署时各组件资源的 `request` 值。 因此在实际部署中，应将表中的资源数据理解为最小资源需求量，而非最大资源需求量。

2. 表中前 13 行（共 11 个组件）称为 Erda 的依赖组件，Erda 的核心组件（目前包含 30+ 组件）称为 Erda 组件。

::: 

| 组件 | CPU Request/Pod | Memory Request/Pod | Storage Capacity/Pod |  副本 | Anti-affinity |
|:---|:---|:---|:---|:---|:---|
| Cassandra | 2  | 4 GB | 1000 GB | 3 | hard |
| Elasticsearch | 2  | 4 GB | 1000 GB | 3 | hard |
| etcd | 1 | 2 GB | 32 GB | 3 | hard |
| Zookeeper | 0.1 | 256 MB | - | 3 | hard |
| Kafka | 2 | 4 GB | 100 GB | 3 | hard |
| KMS | 0.5 | 1 GB | - | 2 | soft |
| MySQL | 0.5 | 0.5 GB | 100 GB |  1 | - |
| Registry | 0.5 | 0.5 GB | 1000 GB | 1 | - |
| Sonar | 0.75 | 1.5 GB | - | 1 | - |
| redis-operator | 0.1 | 10 MB | - | 1 | - |
| redis-sentinel | 0.05 | 64 MB | - | 3 | soft |
| redis-redis | 0.15 | 1 GB | - | 2 | soft |
| volume-provisioner | 0.01 | 100 MB | - | DaemonSet | - |
| Erda 核心组件 |  8 | 16 GB | - | 1～2 | soft |

## 节点需求说明

根据上表，可计算出高可用部署默认配置下 `request` 的资源总量约为：

* CPU：36
* Memory：72 GB
* Storage： 8000 GB  

根据资源需求总量，高可用部署 Erda 时建议节点配置如下（最小资源需求量）：

| 节点 规模 | CPU 最低配置 | Memory最低配置 | 存储最低配置 |  备注说明 |
|:---|:---|:---|:---|---|
| 3 | 12 | 24 GB | 3000 GB | 设为单节点配置 |
| 4 | 10 | 20 GB | 2000 GB | Cassandra、Elasticsearch、Registry 共 7 个 Pod（单个需求 1000 GB），单节点至少 2000 GB |
| 5 | 8 | 16 GB | 2000 GB | 同上 |
| 6 | 8 | 16 GB | 2000 GB | 1. Cassandra、Elasticsearch、Registry 共 7 个 Pod（单个需求 1000 GB），单节点至少 2000 GB<br>2. Erda 组件可与依赖组件分离部署，4 个节点用于依赖组件，2 个节点用于 Erda 组件部署 |

请注意如下事项：
* Cassandra、Elasticsearch、etcd、Kafka、Zookeeper 等组件（目前均为 3 节点的集群）及 Pod Anti-affinity 为硬约束，因此需要至少 3 个节点。
* 对 3 节点规模而言，至少有 1 节点 Cassandra、Elasticsearch、Registry 共存，因此单节点需要至少 3000 GB 存储。
* 若存储使用 Erda 的 volume-provisioner 提供的 Local Volume，建议 /data 目录所在的文件系统（3 节点规模下单节点需满足 3000 GB 存储空间）采用多个单独的物理磁盘构成 [RAID](https://en.wikipedia.org/wiki/RAID) 条带或者 [LVM](https://en.wikipedia.org/wiki/Logical_Volume_Manager_(Linux))，避免单个硬盘情况下 Cassandra、Elasticsearch、etcd 等组件之间存在 IO 竞争。


## 分类调度说明及操作

### 分类调度说明  

Erda 组件高可用分类调度部署的主要目标是实现如下调度结果：

* 以 deployment/statefulSet 方式部署的多个 Pod 副本，对于 Erda 依赖组件满足反亲和性硬约束，对于 Erda 组件满足反亲和性软约束。
* Erda 组件及 Erda 依赖组件需通过节点标签实现 nodeAffinity 调度，此外 Cassandra、Elasticsearch、etcd、Zookeeper、Kafka 等组件之间也可通过节点标签实现部署的节点隔离（包括存储容量隔离及 IO 竞争隔离）。
* 通过节点标签选择部署 Erda 组件、Erda 依赖组件的节点范围。
* 通过节点标签尽可能避免 Erda 组件、Erda 依赖组件部署至 Kubernetes 集群的 Master 节点及 LoadBalancer 节点。

### 操作方式  

部署 Erda 前，请执行如下操作以确定 Erda 组件及 Erda 依赖组件的部署节点范围。

:::tip 提示

请参见 [节点需求说明](comp-schedule.md#节点需求说明) 为各组件选择合适的节点。

:::

* 第一步：请勿将 Erda 组件及 Erda 依赖组件部署至 Kubernetes 的 Master 节点及集群的 LoadBalancer 绑定的节点。建议为 Kubernetes 的 Master 节点及集群的 LoadBalancer 绑定的节点设置合适的标签：

  ```bash
  # 对于  Kubernetes 的 Master 节点打上标签
  kubectl label node <node_name>  dice/master="" --overwrite
  
  # 对于  Kubernetes 的 Master 节点打上标签
  kubectl label node <node_name>  dice/lb="" --overwrite
  ```

* 第二步：通过节点标签选定部署 Erda 组件及 Erda 依赖组件的节点范围，对各节点执行如下命令以设置标签 `dice/platform`：

  ```bash
  kubectl label node <node_name> dice/platform="" --overwrite
  ```

* 第三步：在第二步选中的节点内，选择用于部署 Cassandra 的节点，设置标签 `dice/cassandra`：

  ```bash
  kubectl label node <node_name>  dice/cassandra="" --overwrite
  ```

* 第四步：在第二步选中的节点内，选择用于部署 Elasticsearch 的节点，设置标签 `dice/elasticsearch`：

  ```bash
  kubectl label node <node_name>  dice/elasticsearch="" --overwrite
  ```

* 第五步：在第二步选中的节点内，选择用于部署 etcd 的节点，设置标签 `dice/etcd`：

  ```bash
  kubectl label node <node_name>  dice/etcd="" --overwrite
  ```

* 第六步：在第二步选中的节点内，选择用于部署 Zookeeper 的节点，设置标签 `dice/zookeeper`：

  ```bash
  kubectl label node <node_name>  dice/zookeeper="" --overwrite
  ```

* 第七步：在第二步选中的节点内，选择用于部署 Kafka 的节点，设置标签 `dice/kafka`：

  ```bash
  kubectl label node <node_name>  dice/kafka="" --overwrite
  ```


## 合理使用存储避免 IO 竞争  

当前部署 Erda 时，有状态服务（例如依赖组件及 Erda Pipeline 中的有状态服务）存储卷默认采用 Erda 依赖组件 volume-provisioner 提供的名为 dice-local-volume 的 StorageClass，volume-provisioner 基于特定目录（例如 /data）下的文件系统，通过 dice-local-volume 在该文件系统上以类似 [稀疏文件](https://en.wikipedia.org/wiki/Sparse_file) 的方式创建 PV（例如 /data/pvc-6a7bf08c-00cd-4464-899e-3a82beca8ca8）以使用存储空间。

这类方式并非专为高并发海量 IO 场景设计，若 /data 目录所在的文件系统底层均来自同一硬盘设备（或同一硬盘不同分区构建的设备），则使用 /data 目录所在文件系统的 Pods 将存在 IO 竞争，进而影响 Erda 组件的稳定性以及 QoS。

对于使用外接分布式存储（例如 Ceph）的场景，其 IO 竞争问题不及 Local Volume 方式明显，解决方法也主要针对 Ceph 存储端和网络带宽端，而非 Erda 组件的部署节点。若使用 Local Volume，则 IO 竞争问题的解决与 Erda 组件的部署强相关。因此，可通过如下三种方法解决该问题：

* 通过 StorageClass 实现 IO 隔离  
* 通过 RAID 或 LVM 提高 IO 性能、带宽
* 使用高性能存储，如 SATA SSD、PCIe SSD


### 通过不同的 StorageClass 隔离 IO

由各 StorageClass 分别处理不同的磁盘设备，实现 IO 隔离，具体步骤如下：

1. 根据物理磁盘合理构建 StorageClass（此处指用户通过自建 Local PV 的方式构建 Local Volume），可参照下表构建 Local Volume 对应的 StorageClass 对象。

   | 磁盘     | 节点 1   | 节点 2   | 节点 3   | 对应 StorageClass 名称 | 备注说明                                                     |
   | :------- | :------- | :------- | :------- | :--------------------- | :----------------------------------------------------------- |
   | 磁盘设备 | /dev/sdb | /dev/sdb | /dev/sdb | sc1                    | 将各节点上的 /dev/sdb 做为资源池，构建 Local Volume 对应的 StorageClass 对象 sc1 |
   | 磁盘设备 | /dev/sdc | /dev/sdc | /dev/sdc | sc2                    | 将各节点上的 /dev/sdc 做为资源池，构建 Local Volume 对应的 StorageClass 对象 sc2 |
   | 磁盘设备 | /dev/sdd | /dev/sdd | /dev/sdd | sc3                    | 将各节点上的 /dev/sdd 做为资源池，构建 Local Volume 对应的 StorageClass 对象 sc3 |

2. 部署时，通过 `helm install` 命令为各组件设置不同的 StorageClass。示例如下，为 Cassandra、Elasticsearch、Kafka 设置不同的 StorageClass，通过使用不同的物理存储介质，实现 IO 隔离，避免 IO 竞争。

   ```bash
   helm install erda erda/erda --set global.domain="erda.io",global.size="prod",erda.clusterName="local-cluster",elasticsearch.StorageClassName="sc1",cacassandra.StorageClassName="sc2",kafka.StorageClassName="sc3" -n erda-system --create-namespace
   ```

### 通过 RAID0 或 LVM 配置底层存储

将底层多个物理磁盘构建为单个逻辑设备（RAID0 或者 LVM），通过逻辑设备的条带化功能提升 IO 带宽/性能，减少 IO 竞争。


### 使用高性能存储

对于高并发低延迟要求的 IO 场景（例如 etcd）以及高并发高吞吐量（例如 Elasticsearch、Cassandra、Kafka）场景，IO 存储可使用高性能的 SSD 存储，从根本上满足 IO 的高并发、低延迟、高带宽需求。
