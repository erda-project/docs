# 系统架构

## 标准架构
Kubeprober 采用 Master/Agent 的架构来管理多集群的诊断问题，其核心架构如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/162054db-362f-459f-b0d1-fdae11822ab3.png
)

### 组件介绍
#### probe-master
运行在管理集群上的 operator，这个 operator 维护两个 CRD，一个是 Cluster，用于管理被纳管的集群；另一个是 Probe，用于管理内置的以及用户自己编写的诊断项，probe-master 通过 watch 这两个 CRD，将最新的诊断配置推送到被纳管的集群，同时 probe-master 提供接口用于查看被纳管集群的诊断结果。

#### probe-agent
运行在被纳管集群上的 operator，这个 operator 维护两个 CRD，一个是跟 probe-master 完全一致的 Probe，probe-agent 按照 probe 的定义去执行该集群的诊断项，另一个是 ProbeStatus，用于记录每个 Probe 的诊断结果，用户可以在被纳管的集群中通过 kubectl get probestatus 来查看本集群的诊断结果。

#### probe-tunnel
运行在被纳管集群上的组件，通过 websocket 跟 probe-master 建立连接，提供从 probe-master 到 被纳管集群的 kubernetes API 管理通道，用于 probe-master 下发 probe 到被纳管集群以及查询被纳管集群的诊断结果使用。

#### nsenter
通过 DeamonSet 部署在每台节点删个， 其本质是一个使用 nsenter 进入到 1 号 namespace 的 pod， 提供节点级别的诊断用户通道，可以在 probe 中通过 kubectl exec 到 nsenter 的容器中就相当于是在 node上执行指令，用户诊断操作系统级别的问题。

#### kubectl-probe
Kubeprobe 提供的基于 kubectl plugin 开发的命令行工具，详情见  [使用命令行工具](../best-practices/command_tools.md)。

## standalone部署模式

如果你没有很多集群，只想对单一的集群进行诊断，可以使用 [standalone](../best-practices/standalone_kubeprober.md) 的部署模式，该模式只会部署 probe-agent 组件，用于在本集群运行诊断项，架构图也相对比较简单。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/2f4e651c-b58a-43f6-bb57-53951d7bd25b.png)
