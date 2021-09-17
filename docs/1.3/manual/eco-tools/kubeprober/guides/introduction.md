# 简介

## 什么是Kubprober
KubeProber 是一个针对大规模 Kubernetes 集群设计的诊断工具，用于在 kubernetes 集群中执行诊断项以证明集群的各项功能是否正常，KubeProber 有如下特点:

支持大规模集群 支持多集群管理，支持在管理端配置集群跟诊断项的关系以及统一查看所有集群的诊断结果；
云原生 核心逻辑采用 operator 来实现，提供完整的Kubernetes API兼容性;
可扩展 支持用户自定义巡检项。
区别于监控系统，kubeProber 从巡检的角度来证明集群的各项功能是否正常，监控作为正向链路，无法覆盖系统的中的所有场景，系统中各个环境的监控数据都正常，也不能保证系统是 100% 可以用的，因此需要一个工具从反向来证明系统的可用性，根本上做到先于用户发现集群中不可用的点，比如：

* pod是否可以正常的创建，销毁，验证从 kubernetes，kubelet 到 docker 的整条链路；
* 创建一个service，并测试连通性，验证 kube-proxy 的链路是否正常；
* 解析一个内部或者外部的域名，验证 CoreDNS 是否正常工作；
* 访问一个 ingress 域名，验证集群中的 ingress 组件是否正常工作；
* 对Etcd执行 put/get/delete 等操作，用于验证 Etcd 是否正常运行；
* 通过 mysql-client 的操作来验证 MySQL 是否正常运行；
* 模拟用户对业务系统进行登录，操作，验证业务的主流程是否常常；
* 检查各个环境的证书是否过期；
* 云资源的到期检查；  
... 更多
## Demo
![Screenshot](https://static.erda.cloud/images/kc-cn.gif)
## 概念

### Cluster
区别于 Kubernetes 集群实体，kubeprober 中的 Cluster 指的是被诊断集群对象，通过每个 Kuberntes 集群实体中部署的 probe-agent 组件上报上来的集群信息存在在管理集群的 CRD 中，包含集群名， Kubernetes 版本，节点数量， 关联的 probe，probe 的诊断结果橄榄，心跳时间等信息。
### Probe
Probe 是一个诊断项(checker)集合，通常会将一组或者一个场景下的诊断项编排到一个 Probe，采用 CRD 来实现，本质是一个执行策略加一个镜像，用于每隔特定时间在被诊断的集群中执行镜像中的检查项。由 probe-master 管理，通过给 cluster 打标签的方式将 probe 运行到对应的集群中。
### Checker
诊断项的最小执行单元，被集成到 Probe 的镜像中，其诊断的结果可以被 CLI 工具列出来，Checker 使用 kubeprober 提供的 sdk 将诊断结果上报给 kubeprober，当前 SDK 只是 Shell 以及 Golang。