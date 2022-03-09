# High-Availability Configuration

When deploying Erda via Helm Chart package, you can choose deployment mode by setting the global parameter global.size:
* Set global.size as `demo`, then all components of Erda will be deployed in the minimalist way (low-resource configuration and single-instance copy), which is suitable for trial environment.
* Set global.size as `prod`, then the core components of Erda will be deployed in a high-availability way (high-resource configuration and multi-instance copy), which is suitable for production environment.

This article will introduce the configuration for production deployment (high-availability mode).

## Configurable Parameter for High-Availability Deployment

The [values.yaml](https://github.com/erda-project/erda-release/blob/master/erda-helm/README.md) file in Erda Helm Chart defines a large number of configuration parameters, which can be modified according to the actual situation for high-availability deployment.

| Parameter | Description | Default Value |
|-----|:---|:----|
| **Global** |  |  |
| global.size | The deployment mode (`demo` and `prod` are supported), and the high-availability mode is set as `prod` | - |
| global.image.repository | Set the image repository address and users who cannot access the external network need to modify the configuration to a private repository on the internal network and upload the image required for Erda deployment to the private repository before deployment | "registry.erda.cloud/erda" |
| global.image.imagePullPolicy | Set image pull policy | "IfNotPresent" |
| global.image.imagePullSecrets | Setting not required if image is not pulled from private repository, otherwise it needs to be set as secrets to access the private image repository | - |
| global.domain | The domain name bound to the current Erda cluster | "erda.io" |
| **Cassandra** |  |  |
| cassandra.capacity | Set the single-node storage capacity of Cassandra, which is scalable according to the actual cluster and business volume | "1000Gi" |
| cassandra.storageClassName | Set the Kubernetes StorageClass object corresponding to the storage volume | "dice-local-volume" |
| cassandra.resources.requests.cpu | Set the CPU request value of the Cassandra instance pod | "2" |
| cassandra.resources.requests.memory | Set the memory request value of the Cassandra instance pod | "4Gi" |
| cassandra.resources.limits.cpu | Set the CPU limit value of the Cassandra instance pod | "4" |
| cassandra.resources.limits.memory | Set the memory limit value of the Cassandra instance pod | "16Gi" |
| cassandra.racks | Rack name list (names cannot be repeated), and the number of racks in the list equal to the number of Cassandra nodes | - name: rack1<br>- name: rack2<br>- name: rack3 |
| **Elasticsearch** |  |  |
| elasticsearch.replicas | Set the number of Elasticsearch cluster nodes | 3 |
| elasticsearch.capacity | Set the single-node storage capacity of Elasticsearch, which is scalable according to the actual cluster and business volume | "1000Gi" |
| elasticsearch.storageClassName | Set the Kubernetes StorageClass object corresponding to the storage volume | "dice-local-volume" |
| elasticsearch.numberOfMasters | When deploying an Elasticsearch cluster in high-availability mode, the number of Elasticsearch instances is generally set over half of the cluster node number to avoid split-brain in the Elasticsearch cluster | 2 |
| elasticsearch.javaOpts | Set the environment variable JAVA_OPTS of Elasticsearch (Java heap size is recommended to be set as 0.75 * resources.limits.memory)  | "-Xms6144m -Xmx6144m" |
| elasticsearch.resources.requests.cpu | Set the CPU request value of the Elasticsearch instance pod | "2" |
| elasticsearch.resources.requests.memory | Set the memory request value of the Elasticsearch instance pod | "4Gi" |
| elasticsearch.resources.limits.cpu | Set the CPU limit value of the Elasticsearch instance pod | "4" |
| elasticsearch.resources.limits.memory | Set the memory limit value of the Elasticsearch instance pod | "8Gi" |
| **etcd** |  |  |
| etcd.storageClassName | Set the Kubernetes StorageClass object corresponding to the storage volume | "dice-local-volume" |
| etcd.capacity | Set the single-node storage capacity of etcd, which is scalable according to the actual cluster and business volume | "32Gi" |
| etcd.resources.requests.cpu | Set the CPU request value of the etcd instance pod | "1" |
| etcd.resources.requests.memory | Set the memory request value of the etcd instance pod | "2Gi" |
| etcd.resources.limits.cpu | Set the CPU limit value of the etcd instance pod | "4" |
| etcd.resources.limits.memory | Set the memory limit value of the etcd instance pod | "8Gi" |
| **Zookeeper** |  |  |
| zookeeper.storageClassName | Set the Kubernetes StorageClass object corresponding to the storage volume | "dice-local-volume" |
| zookeeper.capacity | Set the single-node storage capacity of Zookeeper, which is scalable according to the actual cluster and business volume | "32Gi" |
| zookeeper.resources.requests.cpu | Set the CPU request value of the Zookeeper instance pod | "100m" |
| zookeeper.resources.requests.memory | Set the memory request value of the Zookeeper instance pod | "256Mi" |
| zookeeper.resources.limits.cpu | Set the CPU limit value of the Zookeeper instance pod | "1" |
| zookeeper.resources.limits.memory | Set the memory limit value of the Zookeeper instance pod | "512Mi" |
| **Kafka** |  |  |
| kafka.storageClassName | Set the Kubernetes StorageClass object corresponding to the storage volume | "dice-local-volume" |
| kafka.capacity | Set the single-node storage capacity of Kafka, which is scalable according to the actual cluster and business volume | "32Gi" |
| kafka.javaOpts | Set the environment variable JAVA_OPTS of Kafka (Java heap size is recommended to be set as 0.75 * resources.limits.memory)  | "-Xms6144m -Xmx6144m" |
| kafka.resources.requests.cpu | Set the CPU request value of the Kafka instance pod | "2" |
| kafka.resources.requests.memory | Set the memory request value of the Kafka instance pod | "4Gi" |
| kafka.resources.limits.cpu | Set the CPU limit value of the Kafka instance pod | "4" |
| kafka.resources.limits.memory | Set the memory limit value of the Kafka instance pod | "8Gi" |
| **KMS** |  |  |
| kms.replicas | Set the number of KMS instance replicas | 2 |
| kms.resources.requests.cpu | Set the CPU request value of the KMS instance pod | "500m" |
| kms.resources.requests.memory | Set the memory request value of the KMS instance pod | "1Gi" |
| kms.resources.limits.cpu | Set the CPU limit value of the KMS instance pod | "1" |
| kms.resources.limits.memory | Set the memory limit value of the KMS instance pod | "2Gi" |
| **Redis** |  |  |
| redis.redisFailover.redis.replicas | Set the number of Redis replicas for active/passive switch among Redis instances | 2 |
| redis.redisFailover.redis.resources.requests.cpu | Set the CPU request value of the Redis pod | "150m" |
| redis.redisFailover.redis.resources.requests.memory | Set the memory request value of the Redis pod | "1Gi" |
| redis.redisFailover.redis.resources.limits.cpu | Set the CPU limit value of the Redis pod | "300m" |
| redis.redisFailover.redis.resources.limits.memory | Set the memory limit value of the Redis pod | "2Gi" |
| redis.redisFailover.sentinel.replicas | Set the number of Redis Sentinel replicas | 3 |
| **Registry** |  |  |
| registry.storageClassName | Set the Kubernetes StorageClass object corresponding to the storage volume | "dice-local-volume" |
| registry.capacity | Set the single-node storage capacity of Registry, which is scalable according to the actual cluster and business volume | "1000Gi" |
| registry.resources.requests.cpu | Set the CPU request value of the Registry instance pod | "500m" |
| registry.resources.requests.memory | Set the memory request value of the Registry instance pod | "512Mi" |
| registry.resources.limits.cpu | Set the CPU limit value of the Registry instance pod | "1" |
| registry.resources.limits.memory | Set the memory limit value of the Registry instance pod | "1Gi" |
| registry.networkMode | If the value is "host", set the registry container network as host mode | - |
| registry.custom.nodeName | Registry shares the same name with the node deployed in host mode | - |
| registry.custom.nodeIP | Registry shares the same IP address of the node deployed in host mode | - |
| **Sonar** |  |  |
| sonar.resources.requests.cpu | Set the CPU request value of the Sonar instance pod | "750m" |
| sonar.resources.requests.memory | Set the memory request value of the Sonar instance pod | "1536Mi" |
| sonar.resources.limits.cpu | Set the CPU limit value of the Sonar instance pod | "1500m" |
| sonar.resources.limits.memory | Set the memory limit value of the Sonar instance pod | "3Gi" |
| **volume-provisioner** |  |  |
| volume-provisioner.provisioner.local.path | Local Volume takes this mount point as the storage volume source | /data |
| volume-provisioner.provisioner.nfs.path | FS Volume takes this mount point as the storage volume source | /netdata |
| volume-provisioner.resources.requests.cpu | Set the CPU request value of the volume-provisioner instance pod | "10m" |
| volume-provisioner.resources.requests.memory | Set the memory request value of the volume-provisioner instance pod | "10Mi" |
| volume-provisioner.resources.limits.cpu | Set the CPU limit value of the volume-provisioner instance pod | "100m" |
| volume-provisioner.resources.limits.memory | Set the memory limit value of the volume-provisioner instance pod | "256Mi" |
| **Erda** |  |  |
| erda.clusterName | The identifier of the Kubernetes cluster where Erda is deployed | "local-cluster" |
| erda.operator.resources.requests.cpu | Set the CPU request value of the erda-operator instance pod | "10m" |
| erda.operator.resources.requests.memory | Set the memory request value of the erda-operator instance pod | "10Mi" |
| erda.operator.resources.limits.cpu | Set the CPU limit value of the erda-operator instance pod | "100m" |
| erda.operator.resources.limits.memory | Set the memory limit value of the erda-operator instance pod | "128Mi" |
| erda.clusterConfig.protocol | Declare the request protocol of the current Erda cluster, HTTP/HTTPS | http |
| erda.clusterConfig.clusterType | Erda cluster identifier, such as Kubernetes and EDAS | kubernetes |
| erda.component.admin.replicas | The number of erda admin component replicas | 2 |
| erda.component.admin.resources.cpu | The CPU request value of the erda admin component instance pod | "100m" |
| erda.component.admin.resources.mem | The memory request value of the erda admin component instance pod | "128Mi" |
| erda.component.admin.resources.max_cpu | The CPU limit value of the erda admin component instance pod | "200m" |
| erda.component.admin.resources.max_mem | The memory limit value of erda admin component instance pod | "256Mi" |
| erda.component.clusterManager.replicas | The number of erda clusterManager component replicas | 2 |
| erda.component.clusterManager.resources.cpu | The CPU request value of the erda clusterManager component instance pod | "100m" |
| erda.component.clusterManager.resources.mem | The memory request value of the erda clusterManager component instance pod | "128Mi" |
| erda.component.clusterManager.resources.max_cpu | The CPU limit value of the erda clusterManager component instance pod | "200m" |
| erda.component.clusterManager.resources.max_mem | The memory limit value of the erda clusterManager component instance pod | "256Mi" |
| erda.component.collector.replicas | The number of erda collector component replicas | 2 |
| erda.component.collector.resources.cpu | The CPU request value of the erda collector component instance pod | "100m" |
| erda.component.collector.resources.mem | The memory request value of the erda collector component instance pod | "128Mi" |
| erda.component.collector.resources.max_cpu | The CPU limit value of the erda collector component instance pod | "1" |
| erda.component.collector.resources.max_mem | The memory limit value of the erda collector component instance pod | "1024Mi" |
| erda.component.coreServices.replicas | The number of erda coreServices component replicas | 2 |
| erda.component.coreServices.resources.cpu | The CPU request value of the erda coreServices component instance pod | "100m" |
| erda.component.coreServices.resources.mem | The memory request value of the erda coreServices component instance pod | "128Mi" |
| erda.component.coreServices.resources.max_cpu | The CPU limit value of the erda coreServices component instance pod | "300m" |
| erda.component.coreServices.resources.max_mem | The memory limit value of the erda coreServices component instance pod | "512Mi" |
| erda.component.hepa.replicas | The number of erda hepa component replicas | 2 |
| erda.component.hepa.resources.cpu | The CPU request value of the erda hepa component instance pod  | "100m" |
| erda.component.hepa.resources.mem | The memory request value of the erda hepa component instance pod | "512Mi" |
| erda.component.hepa.resources.max_cpu | The CPU limit value of the erda hepa component instance pod | "500m" |
| erda.component.hepa.resources.max_mem | The memory limit value of the erda hepa component instance pod | - |
| erda.component.monitor.replicas | The number of erda monitor component replicas | 2 |
| erda.component.monitor.resources.cpu | The CPU request value of the erda monitor component instance pod | "100m" |
| erda.component.monitor.resources.mem | The memory request value of the erda monitor component instance pod | "128Mi" |
| erda.component.monitor.resources.max_cpu | The CPU limit value of the erda monitor component instance pod | "1" |
| erda.component.monitor.resources.max_mem | The memory limit value of the erda monitor component instance pod | "512Mi" |
| erda.component.msp.replicas | The number of erda msp component replicas | 2 |
| erda.component.msp.resources.cpu | The CPU request value of the erda msp component instance pod  | "100m" |
| erda.component.msp.resources.mem | The memory request value of the erda msp component instance pod | "128Mi" |
| erda.component.msp.resources.max_cpu | The CPU limit value of the erda msp component instance pod | "1" |
| erda.component.msp.resources.max_mem | The memory limit value of the erda msp component instance pod | "512Mi" |
| erda.component.openapi.replicas | The number of erda openapi component replicas | 2 |
| erda.component.openapi.resources.cpu | The CPU request value of the erda openapi component instance pod  | "100m" |
| erda.component.openapi.resources.mem | The memory request value of the erda openapi component instance pod | "128Mi" |
| erda.component.openapi.resources.max_cpu | The CPU limit value of the erda openapi component instance pod | "500m" |
| erda.component.openapi.resources.max_mem | The memory limit value of the erda openapi component instance pod | "512Mi" |
| erda.component.scheduler.replicas | The number of erda scheduler component replicas | 2 |
| erda.component.scheduler.resources.cpu | The CPU request value of the erda scheduler component instance pod | "100m" |
| erda.component.scheduler.resources.mem | The memory request value of the erda scheduler component instance pod | "128Mi" |
| erda.component.scheduler.resources.max_cpu | The CPU limit value of the erda scheduler component instance pod | "1" |
| erda.component.scheduler.resources.max_mem | The memory limit value of the erda scheduler component instance pod | "2048Mi" |
| erda.component.streaming.replicas | The number of erda streaming component replicas | 2 |
| erda.component.streaming.resources.cpu | The CPU request value of the erda streaming component instance pod | "100m" |
| erda.component.streaming.resources.mem | The memory request value of the erda streaming component instance pod | "128Mi" |
| erda.component.streaming.resources.max_cpu | The CPU limit value of the erda streaming component instance pod | "1500m" |
| erda.component.streaming.resources.max_mem | The memory limit value of the erda streaming component instance pod | "1024Mi" |
| erda.component.ui.replicas | The number of erda ui component replicas | 2 |
| erda.component.ui.resources.cpu | The CPU request value of the erda ui component instance pod | "200m" |
| erda.component.ui.resources.mem | The memory request value of the erda ui component instance pod | "256Mi" |
| erda.component.ui.resources.max_cpu | The CPU limit value of the erda ui component instance pod | "1" |
| erda.component.ui.resources.max_mem | The memory limit value of the erda ui component instance pod | "512Mi" |
| erda.component.ucAdaptor.replicas | The number of erda ucAdaptor component replicas | 2 |
| erda.component.ucAdaptor.resources.cpu | The CPU request value of the erda ucAdaptor component instance pod  | "100m" |
| erda.component.ucAdaptor.resources.mem | The memory request value of the erda ucAdaptor component instance pod | "64Mi" |
| erda.component.ucAdaptor.resources.max_cpu | The CPU limit value of the erda ucAdaptor component instance pod  | "200m" |
| erda.component.ucAdaptor.resources.max_mem | The memory limit value of the erda ucAdaptor component instance pod | - |
| erda.component.uc.replicas | The number of erda uc component replicas | 2 |
| erda.component.uc.resources.cpu | The CPU request value of the erda uc component instance pod | "10m" |
| erda.component.uc.resources.mem | The memory request value of the erda uc component instance pod | "100Mi" |
| erda.component.uc.resources.max_cpu | The CPU limit value of the erda uc component instance pod | "1" |
| erda.component.uc.resources.max_mem | The memory limit value of the erda uc component instance pod | "2048Mi" |
| erda.component.cmp.replicas | The number of erda cmp component replicas | 2 |
| erda.component.cmp.resources.cpu | The CPU request value of the erda cmp component instance pod  | "100m" |
| erda.component.cmp.resources.mem | The memory request value of the erda cmp component instance pod | "128Mi" |
| erda.component.cmp.resources.max_cpu | The CPU limit value of the erda cmp component instance pod | "200m" |
| erda.component.cmp.resources.max_mem | The memory limit value of the erda cmp component instance pod | - |
| erda.component.analyzerAlert.resources.cpu | The CPU request value of the erda analyzerAlert component instance pod | "100m" |
| erda.component.analyzerAlert.resources.mem | The memory request value of the erda analyzerAlert component instance pod | "128Mi" |
| erda.component.analyzerAlert.resources.max_cpu | The CPU limit value of the erda analyzerAlert component instance pod | "1" |
| erda.component.analyzerAlert.resources.max_mem | The memory limit value of the erda analyzerAlert component instance pod | "1024Mi" |
| erda.component.analyzerAlertTask.resources.cpu | The CPU request value of the erda analyzerAlertTask component instance pod  | "100m" |
| erda.component.analyzerAlertTask.resources.mem | The memory request value of the erda analyzerAlertTask component instance pod | "128Mi" |
| erda.component.analyzerAlertTask.resources.max_cpu | The CPU limit value of the erda analyzerAlertTask component instance pod | "1" |
| erda.component.analyzerAlertTask.resources.max_mem | The memory limit value of the erda analyzerAlertTask component instance pod | "2048Mi" |
| erda.component.analyzerErrorInsight.resources.cpu | The CPU request value of the erda analyzerErrorInsight component instance pod  | "100m" |
| erda.component.analyzerErrorInsight.resources.mem | The memory request value of the erda analyzerErrorInsight component instance pod | "128Mi" |
| erda.component.analyzerErrorInsight.resources.max_cpu | The CPU limit value of the erda analyzerErrorInsight component instance pod  | "1" |
| erda.component.analyzerErrorInsight.resources.max_mem | The memory limit value of the erda analyzerErrorInsight component instance pod | "2048Mi" |
| erda.component.analyzerErrorInsightTask.resources.cpu | The CPU request value of the erda analyzerErrorInsightTask component instance pod  | "100m" |
| erda.component.analyzerErrorInsightTask.resources.mem | The memory request value of the erda analyzerErrorInsightTask component instance pod | "128Mi" |
| erda.component.analyzerErrorInsightTask.resources.max_cpu | The CPU limit value of the erda analyzerErrorInsightTask component instance pod  | "1" |
| erda.component.analyzerErrorInsightTask.resources.max_mem | The memory limit value of the erda analyzerErrorInsightTask component instance pod | "2048Mi" |
| erda.component.analyzerMetrics.resources.cpu | The CPU request value of the erda analyzerMetrics component instance pod | "100m" |
| erda.component.analyzerMetrics.resources.mem | The memory request value of the erda analyzerMetrics component instance pod | "128Mi" |
| erda.component.analyzerMetrics.resources.max_cpu | The CPU limit value of the erda analyzerMetrics component instance pod | "1" |
| erda.component.analyzerMetrics.resources.max_mem | The memory limit value of the erda analyzerMetrics component instance pod | "2048Mi" |
| erda.component.analyzerMetricsTask.resources.cpu | The CPU request value of the erda analyzerMetricsTask component instance pod  | "100m" |
| erda.component.analyzerMetricsTask.resources.mem | The memory request value of the erda analyzerMetricsTask component instance pod | "128Mi" |
| erda.component.analyzerMetricsTask.resources.max_cpu | The CPU limit value of the erda analyzerMetricsTask component instance pod | "1" |
| erda.component.analyzerMetricsTask.resources.max_mem | The memory limit value of the erda analyzerMetricsTask component instance pod | "2048Mi" |
| erda.component.analyzerTracing.resources.cpu | The CPU request value of the erda analyzerTracing component instance pod | "100m" |
| erda.component.analyzerTracing.resources.mem | The memory request value of the erda analyzerTracing component instance pod | "128Mi" |
| erda.component.analyzerTracing.resources.max_cpu | The CPU limit value of the erda analyzerTracing component instance pod | "500m" |
| erda.component.analyzerTracing.resources.max_mem | The memory limit value of the erda analyzerTracing component instance pod | "1024Mi" |
| erda.component.analyzerTracingTask.resources.cpu | The CPU request value of the erda analyzerTracingTask component instance pod | "100m" |
| erda.component.analyzerTracingTask.resources.mem | The memory request value of the erda analyzerTracingTask component instance pod | "128Mi" |
| erda.component.analyzerTracingTask.resources.max_cpu | The CPU limit value of the erda analyzerTracingTask component instance pod | "1" |
| erda.component.analyzerTracingTask.resources.max_mem | The memory limit value of the erda analyzerTracingTask component instance pod | "2048Mi" |
| erda.component.actionRunnerScheduler.resources.cpu | The CPU request value of the erda actionRunnerScheduler component instance pod  | "100m" |
| erda.component.actionRunnerScheduler.resources.mem | The memory request value of the erda actionRunnerScheduler component instance pod | "128Mi" |
| erda.component.actionRunnerScheduler.resources.max_cpu | The CPU limit value of the erda actionRunnerScheduler component instance pod | "300m" |
| erda.component.actionRunnerScheduler.resources.max_mem | The memory limit value of the erda actionRunnerScheduler component instance pod | - |
| erda.component.clusterAgent.resources.cpu | The CPU request value of the erda clusterAgent component instance pod  | "100m" |
| erda.component.clusterAgent.resources.mem | The memory request value of the erda clusterAgent component instance pod | "128Mi" |
| erda.component.clusterAgent.resources.max_cpu | The CPU limit value of the erda clusterAgent component instance pod | "1" |
| erda.component.clusterAgent.resources.max_mem | The memory limit value of the erda clusterAgent component instance pod | "1024Mi" |
| erda.component.clusterDialer.resources.cpu | The CPU request value of the erda clusterDialer component instance pod  | "100m" |
| erda.component.clusterDialer.resources.mem | The memory request value of the erda clusterDialer component instance pod | "128Mi" |
| erda.component.clusterDialer.resources.max_cpu | The CPU limit value of the erda clusterDialer component instance pod | "2" |
| erda.component.clusterDialer.resources.max_mem | The memory limit value of the erda clusterDialer component instance pod | "2048Mi" |
| erda.component.dicehub.resources.cpu | The CPU request value of the erda dicehub component instance pod  | "100m" |
| erda.component.dicehub.resources.mem | The memory request value of the erda dicehub component instance pod | "128Mi" |
| erda.component.dicehub.resources.max_cpu | The CPU limit value of the erda dicehub component instance pod | "150m" |
| erda.component.dicehub.resources.max_mem | The memory limit value of the erda dicehub component instance pod | "1024Mi" |
| erda.component.dop.resources.cpu | The CPU request value of the erda dop component instance pod | "100m" |
| erda.component.dop.resources.mem | The memory request value of the erda dop component instance pod | "128Mi" |
| erda.component.dop.resources.max_cpu | The CPU limit value of the erda dop component instance pod | "1" |
| erda.component.dop.resources.max_mem | The memory limit value of the erda dop component instance pod | "2048Mi" |
| erda.component.eventbox.resources.cpu | The CPU request value of the erda eventbox component instance pod | "100m" |
| erda.component.eventbox.resources.mem | The memory request value of the erda eventbox component instance pod | "128Mi" |
| erda.component.eventbox.resources.max_cpu | The CPU limit value of the erda eventbox component instance pod | "2" |
| erda.component.eventbox.resources.max_mem | The memory limit value of the erda eventbox component instance pod | "2560Mi" |
| erda.component.filebeat.resources.cpu | The CPU request value of the erda filebeat component instance pod | "100m" |
| erda.component.filebeat.resources.mem | The memory request value of the erda filebeat component instance pod | "128Mi" |
| erda.component.filebeat.resources.max_cpu | The CPU limit value of the erda filebeat component instance pod | "1" |
| erda.component.filebeat.resources.max_mem | The memory limit value of the erda filebeat component instance pod | "512Mi" |
| erda.component.gittar.resources.cpu | The CPU request value of the erda gittar component instance pod | "100m" |
| erda.component.gittar.resources.mem | The memory request value of the erda gittar component instance pod | "128Mi" |
| erda.component.gittar.resources.max_cpu | The CPU limit value of the erda gittar component instance pod | "1" |
| erda.component.gittar.resources.max_mem | The memory limit value of the erda gittar component instance pod | "1536Mi" |
| erda.component.pipeline.replicas | The number of erda pipeline component replicas | 2 |
| erda.component.pipeline.resources.cpu | The CPU request value of the erda pipeline component instance pod | "100m" |
| erda.component.pipeline.resources.mem | The memory request value of the erda pipeline component instance pod | "128Mi" |
| erda.component.pipeline.resources.max_cpu | The CPU limit value of the erda pipeline component instance pod | "1" |
| erda.component.pipeline.resources.max_mem | The memory limit value of the erda pipeline component instance pod | "1536Mi" |
| erda.component.telegraf.resources.cpu | The CPU request value of the erda telegraf component instance pod | "100m" |
| erda.component.telegraf.resources.mem | The memory request value of the erda telegraf component instance pod | "128Mi" |
| erda.component.telegraf.resources.max_cpu | The CPU limit value of the erda telegraf component instance pod | "500m" |
| erda.component.telegraf.resources.max_mem | The memory limit value of the erda telegraf component instance pod | "512Mi" |
| erda.component.telegrafApp.resources.cpu | The CPU request value of the erda telegrafApp component instance pod | "100m" |
| erda.component.telegrafApp.resources.mem | The memory request value of the erda telegrafApp component instance pod | "128Mi" |
| erda.component.telegrafApp.resources.max_cpu | The CPU limit value of the erda telegrafApp component instance pod | "500m" |
| erda.component.telegrafApp.resources.max_mem | The memory limit value of the erda telegrafApp component instance pod | "512Mi" |
| erda.component.telegrafPlatform.resources.cpu | The CPU request value of the erda telegrafPlatform component instance pod  | "100m" |
| erda.component.telegrafPlatform.resources.mem | The memory request value of the erda telegrafPlatform component instance pod | "128Mi" |
| erda.component.telegrafPlatform.resources.max_cpu | The CPU limit value of the erda telegrafPlatform component instance pod | "1" |
| erda.component.telegrafPlatform.resources.max_mem | The memory limit value of the erda telegrafPlatform component instance pod | "1536Mi" |
| erda.component.orchestrator.resources.cpu | The CPU request value of the erda orchestrator component instance pod  | "100m" |
| erda.component.orchestrator.resources.mem | The memory request value of the erda orchestrator component instance pod | "128Mi" |
| erda.component.orchestrator.resources.max_cpu | The CPU limit value of the erda orchestrator component instance pod | "1" |
| erda.component.orchestrator.resources.max_mem | The memory limit value of the erda orchestrator component instance pod | "256Mi" |

## Configuration Parameter for Core Data Storage Component

For clusters with different node number, please refer to the following parameter configuration of Cassandra, Elasticsearch, Kafka and other storage components in high-availability mode.

| Cluster Size | 0～50 Nodes | 50～100 Nodes | 100～200 Nodes | 200～300 Nodes | 300+ Nodes |
|:---|:----|:----|:----|:----|:----|
| **Cassandra** |  |  |  |  |  |
| cassandra.resources.requests.cpu | "1" | "2" | "4" | "4" | "4" |
| cassandra.resources.requests.memory | "6Gi" | "12Gi" | "16Gi" | "16Gi" | "16Gi" |
| cassandra.resources.limits.cpu | "2" | "4" | "6" | "6" | "6" |
| cassandra.resources.limits.memory | "12Gi" | "16Gi" | "24Gi" | "24Gi" | "24Gi" |
| cassandra.capacity | 512G | 1T | 1.5T | 1.5T | 2T |
| cassandra.racks | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3<br>- name: rack4<br>- name: rack5 | - name: rack1<br>- name: rack2<br>- name: rack3<br>- name: rack4<br>- name: rack5<br>- name: rack6<br>- name: rack7 |
| **Elasticsearch** |  |  |  |  |  |
| elasticsearch.resources.requests.cpu | "1" | "2" | "4" | "4" | "4" |
| elasticsearch.resources.requests.memory | "4Gi" | "8Gi" | "16Gi" | "16Gi" | "16Gi" |
| elasticsearch.resources.limits.cpu | "2" | "4" | "6" | "6" | "6" |
| elasticsearch.resources.limits.memory | "8Gi" | "16Gi" | "24Gi" | "24Gi" | "24Gi" |
| elasticsearch.capacity | 512G | 768G | 1T | 1.5T | 1.5T |
| elasticsearch.replicas | 3 | 3 | 3 | 3 | 5 |
| elasticsearch.numberOfMasters | 2 | 2 | 2 | 2 | 3 |
| **Kafka** |  |  |  |  |  |
| kafka.resources.requests.cpu | "0.5" | "1" | "1" | "1" | "2" |
| kafka.resources.requests.memory | "1Gi" | "2Gi" | "2Gi" | “2Gi" | "4Gi" |
| kafka.resources.limits.cpu | "1" | "2" | "2" | "2" | "4" |
| kafka.resources.limits.memory | "2Gi" | "4Gi" | "4Gi" | "4Gi" | "8Gi" |
| kafka.capacity | 150G | 150G | 200G | 300G | 300G |

## How to Connect to Existing Middleware

Erda relies on a variety of middleware, such as Elasticsearch, MySQL, Kafka and Registry, some of which can be configured as existing instance without installation.

:::tip Tips

* Currently only external MySQL is supported for connection, and connection for other middleware (such as Kafka and Elasticsearch) is coming soon.
* When connecting to external MySQL, the version needs to be at least 5.7.9, and the default character should be utf8m64 for database.

:::

You can modify the `values.yaml` in Erda Chart package by adding the following fields to connect to external MySQL:

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
After adding the above configuration, the MySQL database provided by user can be directly applied with no need to deploy MySQL component.

The specific parameters are as follows:

| Parameter | Description |
|:----|:---|
| mysql.enabled | Set as false when connecting to external MySQL |
| mysql.custom.address | Connect to the MySQL host address provided by the user |
| mysql.custom.port | Connect to the MySQL host port provided by the user |
| mysql.custom.databases | Connect to the MySQL database provided by the user |
| mysql.custom.user | Connect to the user name of MySQL database provided by the user |
| mysql.custom.password | Connect to the password corresponding to the user name of MySQL database provided by the user |

## How to Save Private Configuration

Using the parameter configuration in the `values.yaml` file to deploy Helm Chart is the easiest way, but it cannot meet all situations. You can adjust parameter configuration in the following ways:
* **Option 1 (recommended)**: Add modified parameters to the customized `values.yaml` file and run `-f` to specify the file when install or upgrade Helm.
* **Option 2**: Run `--set` to set parameter value when install or upgrade Helm. However, `--set` cannot make persistence configuration, which may lead to inconsistent parameter settings of upgrade and installation.
* **Option 3**: Modify parameter values of the `values.yaml` file in the Helm Chart package. But in the case of a huge amount of parameters, it is difficult to quickly confirm whether the parameters need to be, or have been modified.

