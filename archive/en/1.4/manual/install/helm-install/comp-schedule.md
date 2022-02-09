# High-Availability Component Scheduling

## Total Resource Requirements

The following table shows the resource requirements of dependencies and components on CPU, memory and storage for high-availability deployment of Erda.

:::tip Tips

1. The data in the table corresponds to the `request` value of components for high-availability deployment, which should be considered as the minimum resource requirement.

2. The first 13 rows (a total of 11 components) in the table are called dependent components of Erda, and the core components (currently contains 30+ components) are called Erda components.

:::

| Component | CPU Request/Pod | Memory Request/Pod | Storage Capacity/Pod | Replica | Anti-affinity |
|:---|:---|:---|:---|:---|:---|
| Cassandra | 2 | 4 GB | 1000 GB | 3 | hard |
| Elasticsearch | 2 | 4 GB | 1000 GB | 3 | hard |
| etcd | 1 | 2 GB | 32 GB | 3 | hard |
| Zookeeper | 0.1 | 256 MB | - | 3 | hard |
| Kafka | 2 | 4 GB | 100 GB | 3 | hard |
| KMS | 0.5 | 1 GB | - | 2 | soft |
| MySQL | 0.5 | 0.5 GB | 100 GB | 1 | - |
| Registry | 0.5 | 0.5 GB | 1000 GB | 1 | - |
| Sonar | 0.75 | 1.5 GB | - | 1 | - |
| redis-operator | 0.1 | 10 MB | - | 1 | - |
| redis-sentinel | 0.05 | 64 MB | - | 3 | soft |
| redis-redis | 0.15 | 1 GB | - | 2 | soft |
| volume-provisioner | 0.01 | 100 MB | - | DaemonSet | - |
| Core Components of Erda | 8 | 16 GB | - | 1～2 | soft |

## Node Requirements

According to the table above, the total resource amount of the `request` in the default configuration of high-availability deployment is as below:

* CPU: 36
* Memory: 72 GB
* Storage: 8000 GB

The recommended node configuration for high-availability deployment is as follows (for minimum resource requirements):

| Node | Minimum CPU Configuration | Minimum Memory Configuration | Minimum Storage Configuration | Remarks |
|:---|:---|:---|:---|---|
| 3 | 12 | 24 GB | 3000 GB | Set as configuration for single node |
| 4 | 10 | 20 GB | 2000 GB | A total of 7 pods for Cassandra, Elasticsearch and Registry (each requires 1000 GB), and at least 2000 GB for one node |
| 5 | 8 | 16 GB | 2000 GB | A total of 7 pods for Cassandra, Elasticsearch and Registry (each requires 1000 GB), and at least 2000 GB for one node |
| 6 | 8 | 16 GB | 2000 GB | 1. A total of 7 pods for Cassandra, Elasticsearch and Registry (each requires 1000 GB), and at least 2000 GB for one node<br> 2. Erda components can be deployed separately from dependent components, with 4 nodes for dependent components and 2 nodes for component deployment |

Please note the following:
* Cassandra, Elasticsearch, etcd, Kafka, Zookeeper and other components (clusters of three nodes) and Pod Anti-affinity are hard constraints, so at least 3 nodes are required.
* For a three-node cluster, at least one is for Cassandra, Elasticsearch and Registry thus at least 3000 GB of storage is required for one node.
* If the local volume provided by volume-provisioner of Erda is used for storage, it is recommended to adopt [RAID](https://en.wikipedia.org/wiki/RAID) or [LVM](https://en.wikipedia.org/wiki/Logical_Volume_Manager_(Linux)) of multiple physical disks for the file system where the /data directory is located (one node quires 3000 GB for storage), to avoid IO competition among components such as Cassandra, Elasticsearch and etcd with single disk.


## Classification Scheduling

### Instructions

The high-availability component scheduling aims to realize the following:

* The pod replicas deployed by deployment/statefulSet meet the anti-affinity hard constraints for dependent components of Erda, and meet the anti-affinity soft constraints for Erda components.
* Erda components and dependent components achieve node affinity scheduling by node labels, with which node isolation can also be realized among Cassandra, Elasticsearch, etcd, Zookeeper, Kafka and other components (including storage capacity isolation and IO competition isolation).
* Select the node range where Erda components and dependent components are deployed by node labels.
* Avoid deploying Erda components and dependent components to the master node or load balancer node on Kubernetes cluster by node labels.

### Operations

Before deployment, run the steps below to define the node range of Erda components and dependent components.

:::tip Tips

Please see [Node Requirements](comp-schedule.md#节点需求说明) select the appropriate node for each component.

:::

* Step 1: Do not deploy Erda components and dependent components to the master node of Kubernetes or the nodes bound to the load balancer of the cluster. It is recommended to set appropriate labels for these nodes:

   ```bash
   # Label the master node of Kubernetes
   kubectl label node <node_name>  dice/master="" --overwrite

   # Label the master node of Kubernetes
   kubectl label node <node_name>  dice/lb="" --overwrite
   ```

* Step 2: Set the range of nodes to deploy Erda components and dependent components by node labels, and run the following commands on each node to set the label `dice/platform`:

   ```bash
   kubectl label node <node_name> dice/platform="" --overwrite
   ```

* Step 3: In the nodes selected in Step 2, choose one to deploy Cassandra and set the label `dice/cassandra`:

   ```bash
   kubectl label node <node_name>  dice/cassandra="" --overwrite
   ```

* Step 4: In the nodes selected in Step 2, choose one to deploy Elasticsearch and set the label `dice/elasticsearch`:

   ```bash
   kubectl label node <node_name>  dice/elasticsearch="" --overwrite
   ```

* Step 5: In the nodes selected in Step 2, choose one to deploy etcd and set the label `dice/etcd`:

   ```bash
   kubectl label node <node_name>  dice/etcd="" --overwrite
   ```

* Step 6: In the nodes selected in Step 2, choose one to deploy Zookeeper and set the label `dice/zookeeper`:

   ```bash
   kubectl label node <node_name>  dice/zookeeper="" --overwrite
   ```

* Step 7: In the nodes selected in Step 2, choose one to deploy Kafka and set the label `dice/kafka`:

   ```bash
   kubectl label node <node_name>  dice/kafka="" --overwrite
   ```


## Reasonable Use of Storage to Avoid IO Competition

When deploying Erda, the storage volume of stateful services (such as dependent components and stateful services in Erda Pipeline) adopts the StorageClass named dice-local-volume provided by volume-provisioner, the dependent component of Erda by default. Based on the file system in a specific directory (such as /data), volume-provisioner creates PV (for example, /data/pvc-6a7bf08c-00cd-4464-899e-3a82beca8ca8) for storage in a way similar to [sparse file](https://en.wikipedia.org/wiki/Sparse_file) by dice-local-volume.

It is not designed for scenarios of high-concurrency and massive IO. If the bottom layer of the file system where the /data directory is located is from the same hard disk device (or a device constructed from different partitions of the same hard disk), then IO competition occurs among pods in the file system that effects the stability and QoS of Erda components.

For scenarios where external distributed storage (such as Ceph) is applied, the IO competition is not as obvious as that of local volume and the solution mainly focuses on the Ceph storage and the network bandwidth, rather than the deployment node of the Erda components. For local volume, the IO competition is strongly related to the deployment of Erda components. Therefore, solve the problems in the following ways:

* IO isolation by StorageClass
* IO performance and bandwidth improvement by RAID or LVM
* High-performance storage such as SATA SSD and PCIe SSD


### IO Isolation by Different StorageClass

Each StorageClass deals with different disk devices separately to achieve IO isolation. The steps are as follows:

1. Create StorageClass based on physical disks. Take the table below for reference.

   | Disk | Node 1 | Node 2 | Node 3 | StorageClass Name | Remarks |
   | :------- | :------- | :------- | :------- | :--------------------- | :----------------------------------------------------------- |
   | Disk Device | /dev/sdb | /dev/sdb | /dev/sdb | sc1 | Take /dev/sdb on each node as a resource pool and create the StorageClass object sc1 corresponding to the local volume |
   | Disk Device | /dev/sdc | /dev/sdc | /dev/sdc | sc2 | Take /dev/sdc on each node as a resource pool and create the StorageClass object sc2 corresponding to the local volume |
   | Disk Device | /dev/sdd | /dev/sdd | /dev/sdd | sc3 | Take /dev/sdd on each node as a resource pool and create the StorageClass object sc3 corresponding to the local volume |

2. During deployment, use the `helm install` command to set different StorageClass for each component. An example is as follows. Set different StorageClasses for Cassandra, Elasticsearch and Kafka, and use different physical storage media to achieve IO isolation and avoid IO competition.

   ```bash
   helm install erda erda/erda --set global.domain="erda.io",global.size="prod",erda.clusterName="local-cluster",elasticsearch.StorageClassName="sc1",cacassandra.StorageClassName="sc2",kafka.StorageClassName="sc3" -n erda-system --create-namespace
   ```

### Underlying Storage Configuration by RAID 0 or LVM

Set multiple physical disks at the bottom as a single logical device (RAID 0 or LVM), and improve IO bandwidth and performance by striping of the logical device to reduce IO competition.


### High-Performance Storage

For IO scenarios with high concurrency and low latency (such as etcd) and scenarios with high concurrency and high throughput (such as Elasticsearch, Cassandra and Kafka), use high-performance SSD storage to fundamentally meet IO requirements of high concurrency, low latency and high bandwidth.
