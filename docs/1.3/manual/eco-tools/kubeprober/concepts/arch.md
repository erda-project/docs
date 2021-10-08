# 系统架构

## 标准架构
Kubeprober 采用 Master/Agent 架构以管理多集群的诊断问题，其核心架构如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/162054db-362f-459f-b0d1-fdae11822ab3.png
)

Kubeprober 各组件介绍如下：

### probe-master
运行于管理集群上的 Operator，以维护两个 CRD：一个是 Cluster，用于管理受纳管的集群，另一个是 Probe，用于管理内置以及用户自行编写的诊断项。probe-master 可将最新诊断配置推送至受纳管集群，同时提供接口用于查看受纳管集群的诊断结果。

### probe-agent
运行于受被纳管集群上的 Operator，以维护两个 CRD：一个是 Probe，与 probe-master 完全一致，probe-agent 按照 Probe 的定义执行该集群的诊断项，另一个是 ProbeStatus，用于记录每个 Probe 的诊断结果，用户可在受纳管集群中通过 kubectl get probestatus 查看本集群的诊断结果。

### probe-tunnel
运行于受纳管集群上的组件，通过 Websocket 与 probe-master 建立连接，提供从 probe-master 到受纳管集群的 Kubernetes API 管理通道，可用于 probe-master 下发 Probe 至受纳管集群以及查询受纳管集群的诊断结果。

### nsenter
通过 DaemonSet 部署在各节点，其本质为使用 nsenter 进入 1 号 Namespace 的 Pod， 提供节点级别的诊断用户通道，可在 Probe 中通过 kubectl exec 进入 nsenter 的容器，等同于在 Node 上执行指令，从而诊断操作系统级别的问题。

### kubectl-probe
由 Kubeprober 提供，基于 kubectl plugin 开发的命令行工具，具体请参见 [使用命令行工具](../best-practices/command_tools.md)。

## Standalone 部署模式

若您仅需对单一集群进行诊断，可采用 [单集群](../best-practices/standalone_kubeprober.md) 部署模式，该模式仅部署 probe-agent 组件，用于在本集群运行诊断项，其架构图示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/2f4e651c-b58a-43f6-bb57-53951d7bd25b.png)
