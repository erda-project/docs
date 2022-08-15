# Cluster Management

## Add Cluster

After preparations such as [organization creation](../../../quick-start/newbie.html#Join-an-Organization), you should add a cluster for further use.

You can add clusters in the following ways:

* Create cluster with one click
* Import self-built Kubernetes cluster
* Create cluster via Erda toolchain manually

### Create Cluster with One Click

Erda supports one-click creation of the following clusters:

* Alibaba Cloud Container Service for Kubernetes cluster (managed)
* Alibaba Cloud Container Service for Kubernetes cluster (dedicated)
* Self-built cluster

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/ed0f1741-ed39-4e38-9e4d-a0e1b33e55e4.png)

For Alibaba Cloud Container Service for Kubernetes cluster, go to **Cloud Management > Cluster Resource > Cloud Source** to add an Alibaba Cloud account (including the permissions of Alibaba Cloud Container Service) before creating a cluster, for Alibaba Cloud Container Service purchasing and environment building.

For self-built clusters, provide the information of the existing IT resources to create a cluster.

### Import Existing Cluster

The imported cluster should meet some requirements. For details, see [Installation Requirements](../../../install/helm-install/premise.md#Installation-Requirements). Before importing, configure the cluster as required. For details, see [Preparations](../../../install/helm-install/premise.md#Preparations).

Erda supports importing self-built Kubernetes clusters in the following ways:

- KubeConfig
- Service Account
- Cluster Agent

:::tip Tips

After importing the cluster, Erda will initialize it and deploy Erda components and related dependencies.

:::

Go to **Cloud Management > Cluster Resource > Clusters > Add Cluster > Kubernetes (import an existing Erda Kubernetes cluster)** to operate.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/ed789de9-88fd-43de-8493-c0903f1fbea6.png)

* **KubeConfig and Service Account**: Applicable to clusters with open API server ports.
* **Cluster Agent**: Applicable to clusters without open API server ports.

::: tip Tips
The cluster is available only after it is bound to a specific project. Go to **Org Center > Projects > Select Project > Cluster Setting** to operate.
:::

## Check Cluster Status

You can check the running status of the cluster in the following ways:

* Go to **Cloud Management > Cluster Overview**. Ideally, you can view the cluster information and machine list, etc.

* Go to **Cloud Management > Cluster Resource > Clusters**. Ideally, you can view the basic information of the cluster, such as its type and version.

* Check by [CI/CD](../../../dop/guides/deploy/deploy-by-cicd-pipeline.md) process.

## Modify Cluster Configuration
You can modify the cluster configuration as needed, mostly for the oversold ratio.

The oversold ratio is mainly set for CPU resources. If it is set as 2, which means to take 1 core of CPU as 2 cores, then when 1 core of CPU is requested, the actual initial configuration is only 0.5 core with the upper limit as 1 core. When modifying the oversold ratio, please note the following:

* The oversold ratio is only for CPU resources.
* It is not recommended to apply oversold ratio in production environment.
* Do not modify the oversold ratio in use, otherwise the display of the available resources may be affected.

## Upgrade Cluster
The upgrade is mainly for the edge cluster managed by the central cluster, to keep its version consistent with the central cluster. Please note the following when upgrading the cluster:

* The upgrade needs to be performed by O&M engineers.
* Only upgrade SaaS-based edge clusters.
* Only upgrade edge clusters of lower versions.

## Offline
The platform supports cluster offline and release. Go to **Cloud Management > Cluster Resource > Clusters > Operation** to get cluster offline.

Please finish the following before get the cluster offline:

* Clean up all runtimes running on the cluster.
* Clean up all addons running on the cluster.
* Clean up all references to the cluster. Go to **Org Center > Projects > Select Project > Cluster Setting** to operate.

:::tip Tips

To get the cluster offline does not mean to destroy it, but only to release it from the platform and no longer manage it for scheduling. Shut down all machines manually if you want to destroy it.

:::
