# Scaling

The platform supports cluster scaling by adding or deleting machines, to meet dynamic resource requirements. The added machine can be a virtual machine (including a cloud host), a physical machine, etc.

## Add Machine
You can add machines in the following two ways for insufficient cluster resources:
* Add machines to Alibaba Cloud Container Service for Kubernetes
* Add machines to other clusters

### Alibaba Cloud Container Service for Kubernetes
For Alibaba Cloud Container Service for Kubernetes, please add machines by the following steps:
1. Scale on Alibaba Cloud: Go to **Alibaba Cloud Container Service for Kubernetes (ACK) > Node Management > Node**, and click **Cluster Scaling**.

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/2e05301c-d98d-440a-abe5-134b3cecde73.png)

2. Add machine on Erda: Go to **Cloud Management > Cluster Resource > Clusters > Add Machine**, and add the node scaled by Alibaba Cloud Container Service for Kubernetes (ACK).

   Please note the following when adding machines:

   * When adding machines, you can set the appropriate machine tag simultaneously. For details, see [Node Tags](./cluster-node-labels.md).
   * When adding machines, the device parameter of data disk is optional. Fill in the drive letter if there is a data disk.

   :::tip Tips

   The machine is managed by Erda only after it is added.
   :::

If you have purchased cloud host ECS, go to **Alibaba Cloud Container Service for Kubernetes (ACK) > Node Management > Node > Add Existing Node** to add ECS.

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/bdfdb003-bb94-4bed-95f0-5c32fd518bc7.png)

### Other Clusters
For other clusters, add machines directly on Erda.

## Offline
To get machine offline, please go to **Cloud Management > Cluster Overview > Machines**, select the machine and click **Offline**, then release the machine for real offline, otherwise Erda may take it as machine crash and generate a false alarm.

Please note the following before getting machine offline:

* To avoid business impact or data loss, there must be no running addon on the target machine, otherwise migrate the addon manually firstly.
* Do not get nodes that run key functions offline, such as hosts with tags of LB, Master, Cassandra, ES, Kafka and Nexus.
