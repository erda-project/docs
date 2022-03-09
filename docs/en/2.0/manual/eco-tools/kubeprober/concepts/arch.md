# Architecture

## Standard
Kubeprober adopts the master/agent architecture to manage diagnosis issues of multiple clusters, with its core architecture as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/17/05d3a5e3-5dad-474b-ba80-4fe947aeda6f.png)

The components of Kubeprober are as follows:

### probe-master
The operator running on the managing cluster maintains two CRDs: one is cluster to manage managed clusters, and the other is probe to manage built-in and custom diagnosed items. The probe-master pushes the latest diagnosis configuration to the managed cluster and provides an interface for viewing the diagnosis results of the managed cluster.

### probe-agent
The operator running on the managed cluster maintains two CRDs: one is probe, which is same as the probe-master and the probe-agent runs diagnosed items according to the definition of probe, and the other is ProbeStatus to record the diagnosis results of each probe and users can view the cluster diagnosis result by kubectl get probestatus in the managed cluster.

### probe-tunnel
The component running on the managed cluster connects to probe-master by WebSocket and provides a management channel of Kubernetes API from probe-master to managed cluster, which can issue probe to the managed cluster by probe-master and check the diagnosis results of the managed cluster.

### nsenter
The component is deployed in each node by DaemonSet to provide node-level diagnosis channel. It can enter the container of nsenter via kubectl exec, which is equal to running commands on node to diagnose issues.

### kubectl-probe
It is a command line tool developed based on kubectl plugin, which is provided by Kubeprober. For details, see [Command Line Tool](../best-practices/command_tools.md).

## Standalone

For diagnosis of a single cluster, try [Single Cluster](../best-practices/standalone_kubeprober.md) deployment, which only deploys the probe-agent component to run diagnosed items in the cluster. The architecture is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/17/e6ec7d0b-b55f-4f8a-bde8-8273d315952d.png)
