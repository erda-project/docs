# 简介

## 什么是 Kubeprober

Kubeprober 是一款针对大规模 Kubernetes 集群设计的诊断工具，用于在 Kubernetes 集群中执行诊断项以验证集群的各项功能是否正常，其特点如下：

* 支持大规模集群管理，可在管理端配置集群和诊断项的关系，并统一查看所有集群的诊断结果；
* 云原生，核心逻辑采用 Operator 实现，提供完整的 Kubernetes API 兼容性；
* 可扩展，支持用户自定义巡检项。

不同于监控系统，Kubeprober 将从巡检角度验证集群的各项功能是否正常。监控作为正向链路，无法覆盖系统中的全部场景，即使各环境的监控数据均显示正常，亦无法保证系统百分百可用，因此需要工具从反向证明系统的可用性，从根本上实现先于用户发现问题，例如：

* Pod 是否可以正常创建、销毁，验证从 Kubernetes、Kubelet 到 Docker 的完整链路；
* 创建一个 Service，并测试连通性，验证 Kube-Proxy 链路是否正常；
* 解析一个内部或外部的域名，验证 CoreDNS 是否正常工作；
* 访问一个 Ingress 域名，验证集群中的 Ingress 组件是否正常工作；
* 对 etcd 执行 put/get/delete 等操作，验证 etcd 是否正常运行；
* 通过 mysql-client 操作验证 MySQL 是否正常运行；
* 模拟用户登陆业务系统进行操作，验证业务的主流程是否正常；
* 检查各个环境的证书是否过期；
* 检查云资源是否到期；  
* ...

## Demo

![](https://static.erda.cloud/images/kc-cn.gif)

## 概念

### Cluster

区别于 Kubernetes 集群实体，Kubeprober 中的 Cluster 是指被诊断集群对象，通过每个 Kuberntes 集群实体中部署的 probe-agent 组件上报信息，保存于管理集群的 CRD 中，信息包括集群名称、Kubernetes 版本、节点数量、 关联的 Probe、Probe 诊断结果概览、心跳时间等内容。

### Probe

Probe 是一个诊断项（Checker）集合，通常将一组或一个场景下的诊断项编排为一个 Probe，采用 CRD 实现，其本质为一个执行策略加一个镜像，用于每隔特定时间在被诊断的集群中执行镜像中的检查项，由 probe-master 管理，通过为 Cluster 打标签的方式将 Probe 运行至对应集群中。

### Checker

诊断项的最小执行单元，被集成到 Probe 的镜像中，其诊断结果可通过 CLI 工具展示。Checker 使用 Kubeprober 提供的 SDK 将诊断结果上报至 Kubeprober，当前 SDK 仅支持 Shell 及 Golang。