# Overview

## What Is Kubeprober

Kubeprober is a diagnostic tool for large-scale Kubernetes clusters, to prove if cluster functions are available, with the following characteristics:

* Supports large-scale cluster management, as you can configure the relationship between clusters and diagnosed items, and view the diagnosis results of all clusters.
* Cloud native, adopts Operator and supports compatible Kubernetes APIs.
* Scalable, with custom inspection supported.

Different from the monitoring system, Kubeprober verifies that whether the cluster functions are available from the perspective of inspection. Monitoring, as a a forward link, cannot cover all scenarios in the system. Even if the monitoring data of each environment is normal, it does not mean that the system is totally available. Thus a tool is required to prove the system availability backwards, such as:

* Check whether can create or delete a pod normally and whether the link from Kubernetes, Kubelet to Docker is available.
* Create a service and test its connectivity to check whether the Kube-Proxy link is available.
* Resolve an internal or external domain name to check whether CoreDNS is working properly.
* Visit an Ingress domain name to check whether the Ingress components are working properly.
* Perform operations such as put, get and delete on etcd to check whether etcd is running properly.
* Check whether MySQL is running properly by mysql-client operations.
* Log into the system and operate to check whether the system is working properly.
* Check whether the certificates of each environment expire.
* Check whether the cloud resource expires.
* ...

## Demo

![](https://static.erda.cloud/images/kc-cn.gif)

## Concepts

### Cluster

Different from Kubernetes clusters, the cluster in Kubeprober refers to the diagnosed object, and uses probe-agent component deployed in each Kubernetes cluster to report information, which is stored in CRD that manages clusters, including cluster name, Kubernetes version, number of nodes, related probes, diagnosis results, heartime and more.

### Probe

Probe is a collection of diagnosed items (also checker), implemented by CRD. It is an execution strategy plus an image essentially, used to run checkers of image in the diagnosed cluster at specific time, which is managed by probe-manage and runs probe into the corresponding cluster by labeling the cluster.

### Checker

The smallest execution unit of diagnosed items that is integrated into the image of probe, with its diagnosis result displayed via CLI tool. Checker adopts the SDK provided by Kubeprober to report the diagnosis results to it, with only Shell and Golang supported currently.