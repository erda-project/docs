# 高可用组件分类调度

## 资源需求总量说明

下表为 Erda 高可用部署时依赖及组件 CPU、Memory、Storage 资源的需求说明：

::: tip 提示

1. 表中的资源数据对应生产环境高可用部署时各组件资源的 `request` 值。 因此，在实际部署中，应将表中的资源数据理解为最小资源需求量，而非最大资源需求量。

2. 表中前 13 行（共 11 个组件）称为 Erda 的 `依赖组件`，Erda 的核心组件（目前包含 30+ 组件）称为 `Erda 组件`。

::: 

| 组件 | CPU Request/Pod | Memory Request/Pod | Storage Capacity/Pod |  副本 | Anti-affinity |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Cassandra | 2  | 4G | 1000G | 3 | hard |
| Elasticsearch | 2  | 4G | 1000G | 3 | hard |
| etcd | 1 | 2G | 32G| 3 | hard |
| Zookeeper | 0.1 | 256M | / | 3 | hard |
| Kafka | 2 | 4G | 100G | 3 | hard |
| Kms | 0.5 |  1G | / | 2 | soft |
| Mysql | 0.5 | 0.5G | 100G  |  1 | / |
| Registry | 0.5 | 0.5G | 1000G  | 1 | / |
| Sonar | 0.75 | 1.5G | / | 1 | / |
| redis-operator | 0.1 | 10M | / | 1 | / |
| redis-sentinel | 0.05 | 64M | / | 3 | soft |
| redis-redis | 0.15 | 1G | / | 2 | soft |
| volume-provisioner | 0.01 | 100M | / | DaemonSet | / |
| Erda 核心组件 |  8 | 16G | / | 1～2 | soft |

## 节点需求说明

根据上表，可计算出高可用部署默认配置下 `request` 的资源总量约为：

* CPU：36
* Memory：72 GB
* Storage： 8000 GB  

根据资源需求总量，高可用部署 Erda，建议节点按如下表格配置（最小资源需求量）：

| 节点规模 | CPU 最低配置  | Memory 最低配置 | 存储最低配置 |  备注说明 |
|:--:|:--:|:--:|:--:|:--|
| 3 | 12 | 24G | 3000G | 配置为单节点配置 |
| 4 | 10 | 20G | 2000G | Cassandra、Elasticsearch、Registry 共 7 个 Pod（单个需求 1000G），单节点至少 2000G |
| 5 | 8 | 16G | 2000G | 同上 |
| 6 | 8 | 16G | 2000G | 1. Cassandra、Elasticsearch、Registry 共 7 个 Pod（单个需求 1000G），单节点至少 2000G<br>2. Erda 组件可以与依赖组件分离部署，4 个节点用于依赖组件、2 个节点用于 Erda 组件部署  |

说明：
* Cassandra、Elasticsearch、etcd、Kafka、Zookeeper 等组件（目前都是三节点的集群），Pod Anti-affinity 为硬约束，所以至少 3 个节点。
* 在 3 节点规模的情况下，至少有 1 节点 Cassandra、Elasticsearch、Registry 共存，因此单节点至少需要 3000 GB 存储。
* 若存储使用 Erda 的 volume-provisioner 提供的 `local volume`（默认），建议 /data 目录所在的文件系统（3 节点规模下单节点需要满足 3000 GB 存储空间）。
建议使用多个单独的物理磁盘构成 [RAID](https://en.wikipedia.org/wiki/RAID) 条带或者 [LVM](https://en.wikipedia.org/wiki/Logical_Volume_Manager_(Linux))，避免单个硬盘情况下 Cassandra、Elasticsearch、etcd 等组件之间的 IO 竞争。


## 分类调度说明及操作

### 分类调度说明  

Erda 组件高可用分类调度部署主要目标是实现调度结果满足指如下约束：

* deployment/statefulSet 方式部署的组件多副本 Pod 之间，对于 Erda 依赖组件满足反亲和性硬约束，对于 Erda 组件满足反亲和性软约束。
* Erda 组件及 Erda 依赖组件需通过 `节点 label` 实现 nodeAffinity 调度，此外 Cassandra、Elasticsearch、Etcd、Zookeeper/Kafka 等组件之间也可通过 `节点 label` 实现部署的节点隔离(实现存储容量的隔离以及 IO 竞争的隔离)。
* 通过 `节点 label` 选择部署 Erda 组件、Erda 依赖组件的节点范围。
* 通过 `节点 label`，尽量限制 Erda 组件、Erda 依赖组件部署到 Kubernetes 集群的 Master 节点及 LoadBalancer 节点。

### 操作方式  

部署 Erda 前，通过执行如下操作确定 Erda 组件及 Erda 依赖组件的部署节点范围：

:::tip 提示

请参见 [节点需求说明](comp-schedule.md#节点需求说明) 为各组件选择合适的节点。

:::

* 步骤 1：（建议）尽量不要将 Erda 组件 及 Erda 依赖组件部署到 Kubernetes 的 Master 节点及集群的 LoadBalancer 绑定的节点，因此建议在 Kubernetes 的 Master 节点及集群的 LoadBalancer 绑定的节点打上合适的标签:  

```bash
# 对于  Kubernetes 的 Master 节点打上标签
kubectl label node <node_name>  dice/master="" --overwrite

# 对于  Kubernetes 的 Master 节点打上标签
kubectl label node <node_name>  dice/lb="" --overwrite
```

* 步骤 2：通过节点标签选定部署 Erda 组件及 Erda 依赖组件的节点范围，对每个节点具体通过执行如下命令打上标签 `dice/platform` :

```bash
kubectl label node <node_name> dice/platform="" --overwrite
```

* 步骤 3：在步骤 2 选中的节点内，选择用于部署 Cassandra 的节点，打上标签 `dice/cassandra` :  

```bash
kubectl label node <node_name>  dice/cassandra="" --overwrite
```

* 步骤 4：在步骤 2 选中的节点内，选择用于部署 Elasticsearch 的节点，打上标签 `dice/elasticsearch` :  

```bash
kubectl label node <node_name>  dice/elasticsearch="" --overwrite
```

* 步骤 5：在步骤 2 选中的节点内，选择用于部署 etcd 的节点，打上标签 `dice/etcd` :  

```bash
kubectl label node <node_name>  dice/etcd="" --overwrite
```

* 步骤 6：在步骤 2 选中的节点内，选择用于部署 Zookeeper 的节点，打上标签 `dice/zookeeper` :  

```bash
kubectl label node <node_name>  dice/zookeeper="" --overwrite
```

* 步骤 7：在步骤 2 选中的节点内，选择用于部署 Kafka 的节点，打上标签 `dice/kafka` :  

```bash
kubectl label node <node_name>  dice/kafka="" --overwrite
```


## 合理使用存储避免 IO 竞争  

目前 Erda 的部署中，对于有状态服务（如依赖组件及 Erda Pipeline 中的有状态服务) 
存储卷默认采用 Erda 依赖组件 volume-provisioner 提供的名称为 dice-local-volume 的 StorageClass 来提供，volume-provisioner 基于特定目录
（如 /data）下的文件系统，通过 dice-local-volume 实现动态在该文件系统上以类似 [稀疏文件](https://en.wikipedia.org/wiki/Sparse_file) 的方式
创建 PV（如 /data/pvc-6a7bf08c-00cd-4464-899e-3a82beca8ca8）使用存储空间。

这种方式并没有专为高并发海量 IO 场景设计，如果 /data 目录所在文件系统底层对应的都是来自同一个硬盘设备（或者同一硬盘的不同分区构建的设备），则使用
/data 目录所在文件系统的所有 Pods 之间就会有 IO 竞争，从而影响 Erda 组件的稳定性以及 QoS。

对于使用外接分布式存储（如 Ceph）的场景 IO 竞争问题没有使用 local volume 的方式明显，解决方法也主要在 Ceph 存储端和网络带宽端，不在 Erda 
组件的部署节点。如果使用 local volume，那 IO 竞争问题的解决就与 Erda 组件的部署强相关。因此，可以按照如下三种方法解决 IO 竞争问题：
* 通过 StorageClass 实现 IO 隔离  
* 通过 RAID 或 LVM 提高 IO 性能、带宽
* 使用高性能存储，如 SATA SSD、PCIe SSD


### 使用不同的 StorageClass 隔离 IO

由各 StorageClass 分别处理不同的磁盘设备，实现 IO 隔离，具体步骤如下：

1. 合理根据物理磁盘构建 StorageClass（这里指用户通过自建 local pv 方式构建 local volume），例如可以参照下表的方式构建 local volume 对应的 StorageClass 对象

| 磁盘 | 节点 1  | 节点 2 | 节点 3 |  对应 StorageClass 名称 |  备注说明 |
|:--:|:--:|:--:|:--:|:--:|:--|
| 磁盘设备 | /dev/sdb | /dev/sdb | /dev/sdb | sc1 | 将各个节点上的 /dev/sdb 做成资源池，构建 local volume 对应的 StorageClass 对象 sc1 |
| 磁盘设备 | /dev/sdc | /dev/sdc | /dev/sdc | sc2 | 将各个节点上的 /dev/sdc 做成资源池，构建 local volume 对应的 StorageClass 对象 sc2 |
| 磁盘设备 | /dev/sdd | /dev/sdd | /dev/sdd | sc3 | 将各个节点上的 /dev/sdd 做成资源池，构建 local volume 对应的 StorageClass 对象 sc3 |

2. 部署时，通过 helm install 命令为各个组件设置使用不同的 StorageClass。例如通过如下命令部署，实现 Cassandra、ElasticSearch、Kafka 使用不同的 StorageClass，从而实现使用不同的物理存储介质，达到 IO 隔离，避免 IO 竞争：    

```bash
helm install erda erda/erda --set global.domain="erda.io",global.size="prod",erda.clusterName="local-cluster",elasticsearch.StorageClassName="sc1",cacassandra.StorageClassName="sc2",kafka.StorageClassName="sc3" -n erda-system --create-namespace
```

### 通过 RAID0 或 LVM 配置底层存储，提高 IO 带宽/性能

将底层多个物理磁盘构建成单个逻辑设备（RAID0 或者 LVM），通过逻辑设备的条带化功能提升 IO 带宽/性能，减少 IO 竞争。


### 使用高性能存储

对于高并发低延迟要求的 IO 场景（如 Etcd）以及高并发高吞吐量（如 ElasticSearch、Cassandra、Kafka）场景，IO 存储可以使用高性能的 SSD 存储，彻底解决 IO 的高并发、低延迟、高带宽需求。
