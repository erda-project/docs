# 集群 Kubernetes 控制台

## 集群列表

进入 **多云管理平台 > 集群资源 > 集群** 查看集群列表。该列表展示组织下所有集群的集群名称、状态、描述信息、类型、管理方式、版本、机器数量等信息。

点击相应集群名称，进入该集群的详情页面。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/9cb41069-4d6e-4ea2-bb64-285c6874c752.png)

## 容器资源

进入 **多云管理平台 > 容器资源**。容器资源页面展示集群的的节点、Pod、工作负载和事件日志，同时提供带有审计功能的在线 kubectl 命令行工具。

### kubectl 命令行

点击右上角 **kubectl 命令行** 按钮，打开 kubectl 命令行界面，您可在此通过 kubectl 命令与该集群 API Server 交互。

该界面中的所有操作均会生成审计记录，可进入 **管理中心 > 审计日志** 查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/eb4edc9e-97de-4c6c-9b10-1132fea3bc94.png)

关于 kubectl 更多信息，请参见 [Overview of kubectl - Kubernetes Doc](https://kubernetes.io/docs/reference/kubectl/overview/)。

### 节点列表

节点列表页展示该集群下所有节点资源的分配和使用情况。关于 Kubernetes 节点更多信息，请参见 [Nodes - Kubernetes Doc](https://kubernetes.io/docs/concepts/architecture/nodes/)。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/25f2c62a-264a-4a4b-a56a-2ffd4742447e.png)

您可通过标签、节点名称或 IP 筛选需查看的节点。

节点标签是指附加在节点对象上的键值对，用于标识对管理者有特定意义的属性。节点上任一标签的键都是唯一的。常用的标签类型包括组织标签（标识该节点所属的组织）、环境标签（标识该节点所用于的环境）、服务标签（标识该节点所用于的服务类型）和任务标签（标识该节点所用于的特定任务类型）。除常用标签外，您还可以在 **其他标签** 中下拉选择所需标签。

输入节点名称或 IP，能够更精确地匹配需查看的节点。

关于 Kubernetes 标签更多信息，请参见 [Labels and Selectors - Kubernetes Doc](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)。

#### 资源配比分析

- CPU 配比图中 **已分配** 表示所筛选节点中已被请求的 CPU 量和百分比，**剩余分配** 表示其他部分。
- 内存配比图中 **已分配** 表示所筛选节点中已被请求的内存量和百分比，**剩余分配** 表示其他部分。
- Pods 配比图中 **已分配** 表示调度至所筛选节点的 Pods 数量及百分比，**剩余分配** 表示可调度 Pods 数量。

#### 资源使用分析

资源使用分析列表展示 CPU、内存及 Pod 的分配与使用情况，从三个维度查看各节点的状态、名称，以及相应资源的分配率、使用率、分配使用率、节点 IP、角色等信息。

* CPU 和内存的分配率计算口径：分配率 = 该节点上被请求的资源量 / 该节点总资源量
* 使用率计算口径：使用率 = 该节点上已使用的资源量 / 该节点总资源量
* 分配使用率的计算口径：分配使用率 = 该节点上已使用的资源量 / 该节点上被请求的资源量
* Pod 使用率计算口径：使用率 = 调度至该节点上的 Pod 数量 / 该节点可调度数量

在列表的 **节点** 列，您可以为该节点新增或删除标签，也可通过节点名称下钻至节点详情页。

在列表的 **操作** 列，您可以点击 **查看 Pods** 跳转至Pods 列表页面，查看该节点上所有 Pods 信息。该操作等同于在 Pods 列表页面通过节点名称筛 Pods。

### 节点详情

您可在此查看该节点的状态、节点信息及机器信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/582f5f58-4549-495d-8b47-cbed38f041ad.png)

可根据需要添加或删除标签，或点击右上角 **更多操作 > 查看/编辑YAML** 修改节点的 YAML 文件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/2843fcce-779c-4f22-8a7a-1053bfa38788.png)

也可查看资源监控，从 CPU 使用率、内存使用率、系统 5 分钟平均负载、磁盘 IO 速率以及网络 IO 速率等指标查看该节点的历史运行状况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/9ed25495-7672-4ec8-af81-6334640faf17.png)

### Pods 列表

Pods 列表页面展示该集群下的所有 Pods，您可通过命名空间、状态、节点、Pod 名称或 IP 筛选目标 Pods。从 Pods 状态分布图中，可直观查看该集群下的 Pods 总量以及各状态的 Pods 数量。

在 Pods 列表中，可从 CPU 和内存两个指标查看 Pod 的资源请求和使用情况。列表包括 Pod 状态、名称、命名空间、IP 地址、就绪状态、所在节点、资源请求值、资源限制值以及资源水位等信息，其中资源水位表示该 Pod 实际使用资源量 / 该 Pod 请求的资源量。

通过列表中 **名称** 列，可下钻至该 Pod 的详情页面。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/0d1353ca-a1d7-4701-acca-892cfbbe5576.png)

### Pod 详情

Pod 详情页面展示该 Pod 的命名空间、存活时间、Pod IP、所属工作负载、所在节点、标签、注释等基本信息。

容器列表列举该 Pod 内的所有容器，通过列表操作，可进入容器控制台或查看容器日志。

相关事件列举发生在该 Pod 中的所有事件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/b0bc1658-d65c-4fdb-b68b-2d970bac3936.png)

在资源监控中，可从 Pod CPU 使用率、Pod 内存使用率、Pod 磁盘读写字节数以及 Pod 网络收发字节数等指标查看该 Pod 的历史运行状况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/e61b9de9-5176-4c54-9d6b-b21215247c6d.png)

### 工作负载列表

工作负载列表页面展示该集群所有的工作负载，您可通过命名空间、工作负载状态、类型以及名称筛选目标工作负载。

您可以通过列表中的工作负载名称，跳转至该负载的详情页面。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/13a5d7c1-88ad-4f6d-96f7-aedf00224c71.png)

关于 Kubernetes 工作负载更多信息，请参见 [Workloads - Kubernetes Doc](https://kubernetes.io/docs/concepts/workloads/)。

### 工作负载详情

工作负载详情展示该工作负载的命名空间、存活时间、镜像、标签和注释等基本信息。在该页面，还可通过该工作负载关联的 Pods 列表，查看 Pods 的主要信息和资源分配使用情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/8efb6e6b-85f1-49a0-9522-8f661a596228.png)

### 事件日志

事件日志页面展示 Kubernetes 集群一小时内的所有事件。您可通过命名空间、事件级别以及事件内容筛选目标事件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/f47e0a61-caa5-4180-a448-049425240623.png)
