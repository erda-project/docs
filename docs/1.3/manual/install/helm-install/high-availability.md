# 高可用配置说明

使用 Erda 的 Helm Chart 包部署 Erda 时，可通过全局参数 global.size 实现不同的部署模式：
* 设置 global.size 为 `demo`，则 Erda 各组件将以极简方式（低资源配置、单实例副本）部署，适用于试用环境。
* 设置 global.size 为 `prod`，则 Erda 的核心组件将以高可用方式（高资源配置、多实例副本）部署，适用于生产环境。

本文将为您介绍 Erda 生产部署（即高可用部署）相关的配置说明。

## 高可用部署可配置参数

Erda Helm Chart 中的 [values.yaml](https://github.com/erda-project/erda-release/blob/master/erda-helm/README.md) 文件定义了大量的配置参数。高可用部署时，可根据实际部署情况修改配置参数，具体如下：

| 参数 | 描述 | 默认值 |
|-----|:---|:----|
|**Global**|  |  |
| global.size | 表示部署模式（支持 `demo` 和 `prod`），高可用部署设置为 `prod` | - |
| global.image.repository | 设置镜像仓库地址，对于无法访问外网的用户，需修改该配置为内网私有仓库，并在部署前将 Erda 部署所需的镜像上传至该私有仓库中 | "registry.erda.cloud/erda" |
| global.image.imagePullPolicy | 设置镜像拉取策略 | "IfNotPresent" |
| global.image.imagePullSecrets | 若非从用户私有仓库拉取镜像则无需设置，否则需设置为访问用户私有镜像仓库的 secrets | - |
| global.domain | Erda 当前集群绑定的泛域名 | "erda.io" |
| **Cassandra** |  |  |
| cassandra.capacity | 设置 Cassandra 单节点存储容量，可根据实际集群及业务量规模进行缩放 | "1000Gi" |
| cassandra.storageClassName | 设置存储卷对应的 Kubernetes StorageClass 对象 | "dice-local-volume" |
| cassandra.resources.requests.cpu | 设置 Cassandra 实例 Pod 的 CPU 资源请求值 | "2" |
| cassandra.resources.requests.memory | 设置 Cassandra 实例 Pod 的 Memory 资源请求值 | "4Gi" |
| cassandra.resources.limits.cpu | 设置 Cassandra 实例 Pod 的 CPU 资源限制值 | "4" |
| cassandra.resources.limits.memory | 设置 Cassandra 实例 Pod 的 Memory 资源限制值 | "16Gi" |
| cassandra.racks | 机架名称列表（名称不能重复），对应机架名称列表中机架的数量即 Cassandra 节点的数量 | - name: rack1<br>- name: rack2<br>- name: rack3 |
| **Elasticsearch** |  |  |
| elasticsearch.replicas | 设置 Elasticsearch 集群节点数量 | 3 |
| elasticsearch.capacity | 设置 Elasticsearch 单节点存储容量，可根据实际集群及业务量规模进行缩放 | "1000Gi" |
| elasticsearch.storageClassName | 设置存储卷对应的 Kubernetes StorageClass 对象 | "dice-local-volume" |
| elasticsearch.numberOfMasters | 高可用部署 Elasticsearch 集群时，可作为 Master 的 Elasticsearch 实例数量，一般至少设置为超过一半集群节点数以避免 Elasticsearch 集群脑裂 | 2 |
| elasticsearch.javaOpts | 设置 Elasticsearch 的环境变量 JAVA_OPTS（java heap size 建议设置为 0.75 * resources.limits.memory） | "-Xms6144m -Xmx6144m" |
| elasticsearch.resources.requests.cpu | 设置 Elasticsearch 实例 Pod 的 CPU 资源请求值 | "2" |
| elasticsearch.resources.requests.memory | 设置 Elasticsearch 实例 Pod 的 Memory 资源请求值 | "4Gi" |
| elasticsearch.resources.limits.cpu | 设置 Elasticsearch 实例 Pod 的 CPU 资源限制值 | "4" |
| elasticsearch.resources.limits.memory | 设置 Elasticsearch 实例 Pod 的 Memory 资源限制值 | "8Gi" |
| **etcd** |  |  |
| etcd.storageClassName | 设置存储卷对应的 Kubernetes StorageClass 对象 | "dice-local-volume" |
| etcd.capacity | 设置 etcd 单节点存储容量，可根据实际集群及业务量规模进行缩放 | "32Gi" |
| etcd.resources.requests.cpu | 设置 etcd 实例 Pod 的 CPU 资源请求值 | "1" |
| etcd.resources.requests.memory | 设置 etcd 实例 Pod 的 Memory 资源请求值 | "2Gi" |
| etcd.resources.limits.cpu | 设置 etcd 实例 Pod 的 CPU 资源限制值 | "4" |
| etcd.resources.limits.memory | 设置 etcd 实例 Pod 的 Memory 资源限制值 | "8Gi" |
| **Zookeeper** |  |  |
| zookeeper.storageClassName | 设置存储卷对应的 Kubernetes StorageClass 对象 | "dice-local-volume" |
| zookeeper.capacity | 设置 Zookeeper 单节点存储容量，可根据实际集群及业务量规模进行缩放 | "32Gi" |
| zookeeper.resources.requests.cpu | 设置 Zookeeper 实例 Pod 的 CPU 资源请求值 | "100m" |
| zookeeper.resources.requests.memory | 设置 Zookeeper 实例 Pod 的 Memory 资源请求值 | "256Mi" |
| zookeeper.resources.limits.cpu | 设置 Zookeeper 实例 Pod 的 CPU 资源限制值 | "1" |
| zookeeper.resources.limits.memory | 设置 Zookeeper 实例 Pod 的 Memory 资源限制值 | "512Mi" |
| **Kafka** |  |  |
| kafka.storageClassName | 设置存储卷对应的 Kubernetes StorageClass 对象 | "dice-local-volume" |
| kafka.capacity | 设置 Kafka 单节点存储容量，可根据实际集群及业务量规模进行缩放 | "32Gi" |
| kafka.javaOpts | 设置 Kafka 的环境变量 JAVA_OPTS（java heap size 建议设置为 0.75 * resources.limits.memory） | "-Xms6144m -Xmx6144m" |
| kafka.resources.requests.cpu | 设置 Kafka 实例 Pod 的 CPU 资源请求值 | "2" |
| kafka.resources.requests.memory | 设置 Kafka 实例 Pod 的 Memory 资源请求值 | "4Gi" |
| kafka.resources.limits.cpu | 设置 Kafka 实例 Pod 的 CPU 资源限制值 | "4" |
| kafka.resources.limits.memory | 设置 Kafka 实例 Pod 的 Memory 资源限制值 | "8Gi" |
| **KMS** |  |  |
| kms.replicas | 设置 KMS 实例副本数量 | 2|
| kms.resources.requests.cpu | 设置 KMS 实例 Pod 的 CPU 资源请求值 | "500m" |
| kms.resources.requests.memory | 设置 KMS 实例 Pod 的 Memory 资源请求值 | "1Gi" |
| kms.resources.limits.cpu | 设置 KMS 实例 Pod 的 CPU 资源限制值 | "1" |
| kms.resources.limits.memory | 设置 KMS 实例 Pod 的 Memory 资源限制值 | "2Gi" |
| **Redis** |  |  |
| redis.redisFailover.redis.replicas | 设置 Redis 副本数量，用于 Redis 实例之间主备切换 | 2 |
| redis.redisFailover.redis.resources.requests.cpu | 设置 Redis Pod 的 CPU 资源请求值 | "150m" |
| redis.redisFailover.redis.resources.requests.memory | 设置 Redis Pod 的 Memory 资源请求值 | "1Gi" |
| redis.redisFailover.redis.resources.limits.cpu | 设置 Redis Pod 的 CPU 资源限制值 | "300m" |
| redis.redisFailover.redis.resources.limits.memory | 设置 Redis Pod 的 Memory 资源限制值 | "2Gi" |
| redis.redisFailover.sentinel.replicas | 设置 Redis Sentinel 副本数量 | 3 |
| **Registry** |  |  |
| registry.storageClassName | 设置存储卷对应的 Kubernetes StorageClass 对象 | "dice-local-volume" |
| registry.capacity | 设置 Registry 单节点存储容量，可根据实际集群及业务量规模进行缩放 | "1000Gi" |
| registry.resources.requests.cpu | 设置 Registry 实例 Pod 的 CPU 资源请求值 | "500m" |
| registry.resources.requests.memory | 设置 Registry 实例 Pod 的 Memory 资源请求值 | "512Mi" |
| registry.resources.limits.cpu | 设置 Registry 实例 Pod 的 CPU 资源限制值 | "1" |
| registry.resources.limits.memory | 设置 Registry 实例 Pod 的 Memory 资源限制值 | "1Gi" |
| registry.networkMode | 若值为 "host" 则设置 Registry 容器网络模式为 host 模式 | - |
| registry.custom.nodeName | Registry 采用 host 模式部署的节点名，此时 Registry 将部署在该节点，并且容器网络模式为 host 模式 | - |
| registry.custom.nodeIP | Registry 采用 host 模式部署时节点的 IP 地址 | - |
| **Sonar** |  |  |
| sonar.resources.requests.cpu | 设置 Sonar 实例 Pod 的 CPU 资源请求值 | "750m" |
| sonar.resources.requests.memory | 设置 Sonar 实例 Pod 的 Memory 资源请求值 | "1536Mi" |
| sonar.resources.limits.cpu | 设置 Sonar 实例 Pod 的 CPU 资源限制值 | "1500m" |
| sonar.resources.limits.memory | 设置 Sonar 实例 Pod 的 Memory 资源限制值 | "3Gi" |
| **volume-provisioner** |  |  |
| volume-provisioner.provisioner.local.path | Local Volume 卷使用此挂载点作为存储卷来源 | /data |
| volume-provisioner.provisioner.nfs.path | FS Volume 卷使用此挂载点作为存储卷来源 | /netdata |
| volume-provisioner.resources.requests.cpu | 设置 volume-provisioner 实例 Pod 的 CPU 资源请求值 | "10m" |
| volume-provisioner.resources.requests.memory | 设置 volume-provisioner 实例 Pod 的 Memory 资源请求值 | "10Mi" |
| volume-provisioner.resources.limits.cpu | 设置 volume-provisioner 实例 Pod 的 CPU 资源限制值 | "100m" |
| volume-provisioner.resources.limits.memory | 设置 volume-provisioner 实例 Pod 的 Memory 资源限制值 | "256Mi" |
| **Erda** |  |  |
| erda.clusterName | Erda 所在 Kubernetes 集群的标识 | "erda" |
| erda.operator.resources.requests.cpu | 设置 erda-operator 实例 Pod 的 CPU 资源请求值 | "10m" |
| erda.operator.resources.requests.memory | 设置 erda-operator 实例 Pod 的 Memory 资源请求值  | "10Mi" |
| erda.operator.resources.limits.cpu | 设置 erda-operator 实例 Pod 的 CPU 资源限制值 | "100m" |
| erda.operator.resources.limits.memory | 设置 erda-operator 实例 Pod 的 Memory 资源限制值 | "128Mi" |
| erda.clusterConfig.protocol | 声明当前 Erda 集群的请求协议，HTTP/HTTPS | http |
| erda.clusterConfig.clusterType | Erda 集群标识，例如 Kubernetes、EDAS | kubernetes |
| erda.component.admin.replicas | erda admin 组件副本数 | 2 |
| erda.component.admin.resources.cpu | erda admin 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.admin.resources.mem | erda admin 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.admin.resources.max_cpu | erda admin 组件实例 Pod 的 CPU 资源限制值 | "200m" |
| erda.component.admin.resources.max_mem | erda admin 组件实例 Pod 的 Memory 资源限制值 | "256Mi" |
| erda.component.clusterManager.replicas | erda clusterManager 组件副本数 | 2 |
| erda.component.clusterManager.resources.cpu | erda clusterManager 组件实例 Pod 的 CPU 资源请求值  | "100m" |
| erda.component.clusterManager.resources.mem | erda clusterManager 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.clusterManager.resources.max_cpu | erda clusterManager 组件实例 Pod 的 CPU 资源限制值 | "200m" |
| erda.component.clusterManager.resources.max_mem | erda clusterManager 组件实例 Pod 的 Memory 资源限制值 | "256Mi" |
| erda.component.collector.replicas | erda collector 组件副本数 | 2 |
| erda.component.collector.resources.cpu | erda collector 组件实例 Pod 的 CPU 资源请求值  | "100m" |
| erda.component.collector.resources.mem | erda collector 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.collector.resources.max_cpu | erda collector 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.collector.resources.max_mem | erda collector 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.coreServices.replicas | erda coreServices 组件副本数 | 2 |
| erda.component.coreServices.resources.cpu | erda coreServices 组件实例 Pod 的 CPU 资源请求值  | "100m" |
| erda.component.coreServices.resources.mem | erda coreServices 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.coreServices.resources.max_cpu | erda coreServices 组件实例 Pod 的 CPU 资源限制值 | "300m" |
| erda.component.coreServices.resources.max_mem | erda coreServices 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.hepa.replicas | erda hepa 组件副本数 | 2 |
| erda.component.hepa.resources.cpu | erda hepa 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.hepa.resources.mem | erda hepa 组件实例 Pod 的 Memory 资源请求值 | "512Mi" |
| erda.component.hepa.resources.max_cpu | erda hepa 组件实例 Pod 的 CPU 资源限制值 | "500m" |
| erda.component.hepa.resources.max_mem | erda hepa 组件实例 Pod 的 Memory 资源限制值 | -  |
| erda.component.monitor.replicas | erda monitor 组件副本数 | 2 |
| erda.component.monitor.resources.cpu | erda monitor 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.monitor.resources.mem | erda monitor 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.monitor.resources.max_cpu | erda monitor 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.monitor.resources.max_mem | erda monitor 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.msp.replicas | erda msp 组件副本数 | 2 |
| erda.component.msp.resources.cpu | erda msp 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.msp.resources.mem | erda msp 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.msp.resources.max_cpu | erda msp 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.msp.resources.max_mem | erda msp 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.openapi.replicas | erda openapi 组件副本数 | 2 |
| erda.component.openapi.resources.cpu | erda openapi 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.openapi.resources.mem | erda openapi 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.openapi.resources.max_cpu | erda openapi 组件实例 Pod 的 CPU 资源限制值 |"500m" |
| erda.component.openapi.resources.max_mem | erda openapi 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.scheduler.replicas | erda scheduler 组件副本数 | 2 |
| erda.component.scheduler.resources.cpu | erda scheduler 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.scheduler.resources.mem | erda scheduler 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.scheduler.resources.max_cpu | erda scheduler 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.scheduler.resources.max_mem | erda scheduler 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.streaming.replicas | erda streaming 组件副本数 | 2 |
| erda.component.streaming.resources.cpu | erda streaming 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.streaming.resources.mem | erda streaming 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.streaming.resources.max_cpu | erda streaming 组件实例 Pod 的 CPU 资源限制值 | "1500m" |
| erda.component.streaming.resources.max_mem | erda streaming 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.ui.replicas | erda ui 组件副本数 | 2 |
| erda.component.ui.resources.cpu | erda ui 组件实例 Pod 的 CPU 资源请求值 | "200m" |
| erda.component.ui.resources.mem | erda ui 组件实例 Pod 的 Memory 资源请求值 | "256Mi" |
| erda.component.ui.resources.max_cpu | erda ui 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.ui.resources.max_mem | erda ui 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.ucAdaptor.replicas | erda ucAdaptor 组件副本数 | 2 |
| erda.component.ucAdaptor.resources.cpu | erda ucAdaptor 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.ucAdaptor.resources.mem | erda ucAdaptor 组件实例 Pod 的 Memory 资源请求值 | "64Mi" |
| erda.component.ucAdaptor.resources.max_cpu | erda ucAdaptor 组件实例 Pod 的 CPU 资源限制值 | "200m" |
| erda.component.ucAdaptor.resources.max_mem | erda ucAdaptor 组件实例 Pod 的 Memory 资源限制值 | - |
| erda.component.uc.replicas | erda uc 组件副本数 | 2 |
| erda.component.uc.resources.cpu | erda uc 组件实例 Pod 的 CPU 资源请求值 | "10m"  |
| erda.component.uc.resources.mem | erda uc 组件实例 Pod 的 Memory 资源请求值 | "100Mi" |
| erda.component.uc.resources.max_cpu | erda uc 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.uc.resources.max_mem | erda uc 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.cmp.replicas | erda cmp 组件副本数 | 2 |
| erda.component.cmp.resources.cpu | erda cmp 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.cmp.resources.mem | erda cmp 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.cmp.resources.max_cpu | erda cmp 组件实例 Pod 的 CPU 资源限制值 | "200m" |
| erda.component.cmp.resources.max_mem | erda cmp 组件实例 Pod 的 Memory 资源限制值 | - |
| erda.component.analyzerAlert.resources.cpu | erda analyzerAlert 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerAlert.resources.mem | erda analyzerAlert 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerAlert.resources.max_cpu | erda analyzerAlert 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerAlert.resources.max_mem | erda analyzerAlert 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.analyzerAlertTask.resources.cpu | erda analyzerAlertTask 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerAlertTask.resources.mem | erda analyzerAlertTask 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerAlertTask.resources.max_cpu | erda analyzerAlertTask 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerAlertTask.resources.max_mem | erda analyzerAlertTask 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.analyzerErrorInsight.resources.cpu | erda analyzerErrorInsight 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerErrorInsight.resources.mem | erda analyzerErrorInsight 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerErrorInsight.resources.max_cpu | erda analyzerErrorInsight 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerErrorInsight.resources.max_mem | erda analyzerErrorInsight 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.analyzerErrorInsightTask.resources.cpu | erda analyzerErrorInsightTask 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerErrorInsightTask.resources.mem | erda analyzerErrorInsightTask 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerErrorInsightTask.resources.max_cpu | erda analyzerErrorInsightTask 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerErrorInsightTask.resources.max_mem | erda analyzerErrorInsightTask 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.analyzerMetrics.resources.cpu | erda analyzerMetrics 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerMetrics.resources.mem | erda analyzerMetrics 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerMetrics.resources.max_cpu | erda analyzerMetrics 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerMetrics.resources.max_mem | erda analyzerMetrics 组件实例 Pod 的 Memory 资源限制值 |  "2048Mi" |
| erda.component.analyzerMetricsTask.resources.cpu | erda analyzerMetricsTask 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerMetricsTask.resources.mem | erda analyzerMetricsTask 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerMetricsTask.resources.max_cpu | erda analyzerMetricsTask 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerMetricsTask.resources.max_mem | erda analyzerMetricsTask 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.actionRunnerScheduler.resources.cpu | erda actionRunnerScheduler 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.actionRunnerScheduler.resources.mem | erda actionRunnerScheduler 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.actionRunnerScheduler.resources.max_cpu | erda actionRunnerScheduler 组件实例 Pod 的 CPU 资源限制值 | "300m" |
| erda.component.actionRunnerScheduler.resources.max_mem | erda actionRunnerScheduler 组件实例 Pod 的 Memory 资源限制值 | - |
| erda.component.clusterAgent.resources.cpu | erda clusterAgent 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.clusterAgent.resources.mem | erda clusterAgent 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.clusterAgent.resources.max_cpu | erda clusterAgent 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.clusterAgent.resources.max_mem | erda clusterAgent 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.clusterDialer.resources.cpu | erda clusterDialer 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.clusterDialer.resources.mem | erda clusterDialer 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.clusterDialer.resources.max_cpu | erda clusterDialer 组件实例 Pod 的 CPU 资源限制值  | "2" |
| erda.component.clusterDialer.resources.max_mem | erda clusterDialer 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.dicehub.resources.cpu | erda dicehub 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.dicehub.resources.mem | erda dicehub 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.dicehub.resources.max_cpu | erda dicehub 组件实例 Pod 的 CPU 资源限制值 | "150m"  |
| erda.component.dicehub.resources.max_mem | erda dicehub 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.dop.resources.cpu | erda dop 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.dop.resources.mem | erda dop 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.dop.resources.max_cpu | erda dop 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.dop.resources.max_mem | erda dop 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.eventbox.resources.cpu | erda eventbox 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.eventbox.resources.mem | erda eventbox 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.eventbox.resources.max_cpu | erda eventbox 组件实例 Pod 的 CPU 资源限制值 | "2" |
| erda.component.eventbox.resources.max_mem | erda eventbox 组件实例 Pod 的 Memory 资源限制值 | "2560Mi" |
| erda.component.filebeat.resources.cpu | erda filebeat 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.filebeat.resources.mem | erda filebeat 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.filebeat.resources.max_cpu | erda filebeat 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.filebeat.resources.max_mem | erda filebeat 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.gittar.resources.cpu | erda gittar 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.gittar.resources.mem | erda gittar 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.gittar.resources.max_cpu | erda gittar 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.gittar.resources.max_mem | erda gittar 组件实例 Pod 的 Memory 资源限制值 | "1536Mi" |
| erda.component.pipeline.resources.cpu | erda pipeline 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.pipeline.resources.mem | erda pipeline 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.pipeline.resources.max_cpu | erda pipeline 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.pipeline.resources.max_mem | erda pipeline 组件实例 Pod 的 Memory 资源限制值 | "1536Mi" |
| erda.component.telegraf.resources.cpu | erda telegraf 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.telegraf.resources.mem | erda telegraf 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.telegraf.resources.max_cpu | erda telegraf 组件实例 Pod 的 CPU 资源限制值 | "500m" |
| erda.component.telegraf.resources.max_mem | erda telegraf 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.telegrafApp.resources.cpu | erda telegrafApp 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.telegrafApp.resources.mem | erda telegrafApp 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.telegrafApp.resources.max_cpu | erda telegrafApp 组件实例 Pod 的 CPU 资源限制值 | "500m" |
| erda.component.telegrafApp.resources.max_mem | erda telegrafApp 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.telegrafPlatform.resources.cpu | erda telegrafPlatform 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.telegrafPlatform.resources.mem | erda telegrafPlatform 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.telegrafPlatform.resources.max_cpu | erda telegrafPlatform 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.telegrafPlatform.resources.max_mem | erda telegrafPlatform 组件实例 Pod 的 Memory 资源限制值 | "1536Mi" |
| erda.component.orchestrator.resources.cpu | erda orchestrator 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.orchestrator.resources.mem | erda orchestrator 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.orchestrator.resources.max_cpu | erda orchestrator 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.orchestrator.resources.max_mem | erda orchestrator 组件实例 Pod 的 Memory 资源限制值 | "256Mi" |

## 核心数据存储组件配置参数

针对不同节点规模的集群，高可用配置中对于 Cassandra、Elasticsearch、Kafka 等存储组件的参数配置可参考如下：

| 集群规模 | 0～50 节点 | 50～100 节点 | 100～200 节点 | 200～300 节点 | 300+ 节点 |
|:---|:----|:----|:----|:----|:----|
| **Cassandra**|  |  |  |  |  |
| cassandra.resources.requests.cpu| "1" | "2" | "4" | "4" | "4" |
| cassandra.resources.requests.memory | "6Gi" | "12Gi" | "16Gi" | "16Gi" | "16Gi" |
| cassandra.resources.limits.cpu| "2" | "4" | "6" | "6" | "6" |
| cassandra.resources.limits.memory | "12Gi" | "16Gi" | "24Gi" | "24Gi" | "24Gi" |
| cassandra.capacity | 512G | 1T | 1.5T | 1.5T | 2T |
| cassandra.racks | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3<br>- name: rack4<br>- name: rack5 | - name: rack1<br>- name: rack2<br>- name: rack3<br>- name: rack4<br>- name: rack5<br>- name: rack6<br>- name: rack7 |
| **Elasticsearch**|  |  |  |  |  |
| elasticsearch.resources.requests.cpu| "1" | "2" | "4" | "4" | "4" |
| elasticsearch.resources.requests.memory | "4Gi" | "8Gi" | "16Gi" | "16Gi" | "16Gi" |
| elasticsearch.resources.limits.cpu| "2" | "4" | "6" | "6" | "6" |
| elasticsearch.resources.limits.memory | "8Gi" | "16Gi" | "24Gi" | "24Gi" | "24Gi" |
| elasticsearch.capacity | 512G | 768G | 1T | 1.5T | 1.5T |
| elasticsearch.replicas | 3 | 3 | 3 | 3 | 5 |
| elasticsearch.numberOfMasters | 2 | 2 | 2 | 2 | 3|
| **Kafka**|  |  |  |  |  |
| kafka.resources.requests.cpu| "0.5" | "1" | "1" | "1" | "2" |
| kafka.resources.requests.memory | "1Gi" | "2Gi" | "2Gi" | “2Gi" | "4Gi" |
| kafka.resources.limits.cpu| "1" | "2" | "2" | "2" | "4" |
| kafka.resources.limits.memory | "2Gi" | "4Gi" | "4Gi" | "4Gi" | "8Gi" |
| kafka.capacity | 150G | 150G | 200G | 300G | 300G |

## 如何接入已有中间件

Erda 平台依赖了多款中间件，例如 Elasticsearch、MySQL、Kafka、Registry 等，部分中间件可直接配置为用户已有实例，无需安装。

::: tip 提示

* 当前版本仅支持接入外部 MySQL，其他常用中间件（例如 Kafka、Elasticsearch）正在陆续接入中。
* 接入外部 MySQL 时，MySQL 版本需不低于 5.7.9，且数据库要求默认字符集为 utf8m64。

:::

如需接入外部 MySQL，可通过修改 Erda Chart 包的 `values.yaml`， 增加如下字段实现：

```yaml
mysql:
  enabled: false
  custom:
    address:      #  eg: 192.168.100.100
    port:         #  eg: 3306
    database:     #  eg: erda
    user:         #  eg: root
    password:     #  eg: HasdDwqwe23#

```
增加以上配置后，Erda 部署过程中便无需部署 MySQL 组件，Erda 组件可直接使用用户提供的 MySQL 数据库。

具体参数说明如下：

| 参数 | 描述 |
|:----|:---|
| mysql.enabled | 开关，接入外部 MySQL 时需设置为 false |
| mysql.custom.address | 接入用户提供的 MySQL 主机地址 |
| mysql.custom.port | 接入用户提供的 MySQL 主机端口 |
| mysql.custom.databases | 接入用户提供的 MySQL 数据库 |
| mysql.custom.user | 接入用户提供的 MySQL 数据库的访问用户名 |
| mysql.custom.password | 接入用户提供的 MySQL 数据库的访问用户名对应的访问密码 |

## 如何保存私有化配置

使用 `values.yaml` 文件中的参数配置部署 Helm Chart 包是最简单的部署方式，但仍可能存在无法满足用户需求的情况。此时，用户可通过以下方式调整参数配置：
* **方式一（推荐）**：将需要修改的参数写入自定义的 `values.yaml` 文件中，执行 Helm 安装/升级时，使用 `-f` 指定该文件。
* **方式二**：执行 Helm 安装/升级 时，使用 `--set` 参数设置参数值。但 `--set` 选项无法持久化配置，可能导致升级操作与安装操作的参数设置不一致。
* **方式三**：修改 Helm Chart 包中 `values.yaml` 文件的参数值。但在参数量庞大的情况下，难以快速确定参数是否需要更改、参数是否已经更改等问题。

