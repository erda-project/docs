# 集群 Kubernetes 控制台

## 集群列表

进入 **多云管理平台 > 资源管理 > 集群管理** 查看集群列表。该列表显示组织下所有集群的集群名称、状态、描述信息、类型、导入方式、集群版本、集群机器数量等信息。
点击相应集群名称，可进入该集群的集群详情页面。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/7442d0c3-667f-4a8f-9f00-0fbb8292e673.png)

## 集群详情

集群详情页显示该 Kubernetes 集群的节点、Pod、工作负载的列表和详情，以及集群事件日志与基础信息，同时提供带有审计功能的在线 kubectl 命令行工具。

用户可以通过 **集群总览** 页面的集群筛选控件进入集群详情页面，也可以通过集群列表进入。

### Kubectl 命令行

点击页面右上角 **Kubectl 命令行** 按钮，可以打开带审计功能的 kubectl 命令行界面。在该页面，用户可以通过 kubectl 命令与该集群 API Server 交互。
用户在该界面所有操作都会产生审计记录，可在 **管理中心 > 审计日志** 页面查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/a6c2d519-ee2a-4390-9adb-9cf7d7b71327.png)

关于 kubectl 更多信息，请参见 [Overview of kubectl - Kubernetes Doc](https://kubernetes.io/docs/reference/kubectl/overview/)。

### 节点列表

节点列表页展示该集群下所有节点资源的分配和使用情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/fae18a5a-b457-43f4-a093-62eef225ad20.png)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/764e8213-ce3f-4b83-ac19-480ad29631b5.png)

关于 Kubernetes 节点更多信息，请参见 [Nodes - Kubernetes Doc](https://kubernetes.io/docs/concepts/architecture/nodes/)。

用户可通过标签和节点名称或 IP 筛选需要查看的节点。

节点标签是指附加到节点对象上的键值对，旨在标识对管理者有特定意义的属性。一个节点上每一个标签的键都是唯一的。
常用的标签类型包括：组织标签标识该节点所属的组织，环境标签标识该节点所用于的环境，服务标签标识该节点所用于的服务类型，任务标签标识该节点所用于的特定任务类型。
除常用标签外用户还可以通过`其他标签`下拉筛选所需的标签。
通过输入节点名称或 IP 可以更精确的模糊匹配所需查看的节点。

关于 Kubernetes 标签更多信息，请参见 [Labels and Selectors - Kubernetes Doc](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)。

#### 资源配比分析

- **CPU 配比图**
中 **已分配** 表示所筛选的节点中已被请求的 CPU 的量和百分比，**剩余分配** 表示其他部分。
  
- **内存 配比图**
中 **已分配** 表示所筛选的节点已被请求的内存的量和百分比，**剩余分配** 表示其他部分。
  
- **Pods 配比图**
中 **已分配** 表示调度到所筛选的节点的 Pods 数量及对这些节点总 Pods 限量的占比，**剩余分配** 表示这些节点还可调度 Pods 数量。

#### 资源使用分析

资源使用分析列表展示了 CPU、内存以及 Pods 的分配与使用情况。可以从 CPU、内存以及 Pod 三个维度查看所筛选出的各节点状态、节点名称，
相应资源的分配率、使用率、闲置率，节点 IP，Role 等信息。

* CPU 和内存的分配率计算口径：分配率 = 该节点上被请求的资源量 / 该节点总资源量

* 使用率计算口径：使用率 = 该节点上已使用的资源量 / 该节点总资源量

* 闲置率的计算口径：闲置率 = 100% - 该节点上已使用的资源量 / 该节点上被请求资源量

* Pod 使用率计算口径：使用率 = 调度到该节点上的 Pod 数量 / 该节点可调度数量

在列表的 **节点** 列，用户可以为该节点新增和删除标签，可以通过节点名称下钻到节点详情页。
在列表的 **操作** 列，用户可以点击 **查看 Pods** 跳转到 Pod 列表页面，查看该节点上的所有 Pods 信息。
该操作等同于在 Pod 列表页面通过节点名称筛 Pods。

### 节点详情

在节点详情页面可以查看该节点的状态、节点信息以及机器信息等。还可以查看资源监控，从 CPU 使用率、内存使用率、磁盘 5 分钟平均负载、
磁盘 IO 速率以及网络 IO 速率等指标查看该节点的历史运行状况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/81fcd4ed-3aed-45e3-b1df-bb7c22230a2c.png)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/09412137-40c3-4dfb-9791-2fed27db0b15.png)

### Pod 列表

Pod 列表页面展示了该集群下所有的 Pods。可以按命名空间、状态、节点、Pod 名称或 IP 来筛选所有展示的 Pods。
从 Pods 状态分布图中，可以直观地查看到该集群下 Pods 总数量以及各状态中的 Pods 数量。

在 Pods 列表中，可以从 CPU 分析和内存分析两个指标查看 Pod 的资源请求和使用情况。列表包括 Pod 状态、名称、命名空间、IP 地址、就绪状态、所在节点、
资源请求值、资源限制值以及资源水位等信息。其中资源水位表示该 Pod 实际使用资源量比该 Pod 请求的资源量。

通过列表中 **名称** 列，可以下钻到该 Pod 的详情页面。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/b481a919-375c-44d2-b147-cfd1e9a1cd12.png)

### Pod 详情

Pod 详情页面展示了该 Pod 的命名空间、存活时间、Pod IP、所属工作负载、所在节点、标签、注释等基本信息。

容器列表中列举了该 Pod 内的所有容器，通过列表操作，可以进入容器控制台和查看容器日志。

相关事件列举该 Pod 发生的所有 Event。

在资源监控中，可以从 Pod CPU 使用率、Pod 内存使用率、Pod 磁盘读写字节数以及 Pod 网络收发字节数等指标查看该 Pod 的历史运行状况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/4920c6fe-70cc-4741-8b97-091faccf80f1.png)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/1b924d8c-c086-4bad-b478-e18eb44d452e.png)

### 工作负载列表

工作负载列表页面展示了该集群所有的工作负载。用户可以通过命名空间、工作负载状态、工作负载类型以及工作负载名称筛选所有查看的工作负载的类型和状态分布柱状图和列表。

用户可以通过列表中的工作负载名称，跳转到该负载的详情页面。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/41969fa7-9456-405d-ad4d-d8c0511ecb49.png)

关于 Kubernetes 工作负载更多信息，请参见 [Workloads - Kubernetes Doc](https://kubernetes.io/docs/concepts/workloads/)。

### 工作负载详情

工作负载详情展示了该工作负载的命名空间、存活时间、镜像、标签和注释等基本信息。在该页面，还可以通过该工作负载关联的 Pods 列表，
查看 Pods 的主要信息和资源分配使用情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/1a0b3172-461c-4636-9450-f5541b879907.png)

### 事件日志

事件日志页面展示了 Kubernetes 集群一小时内的所有 Event。用户可以通过命名空间、事件级别以及事件内容筛选所要查看的事件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/00ccbe6f-7ff6-49cf-8fbb-d6bc258a17eb.png)

### 基础信息

基础信息展示了该集群的基本信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/ec74165b-0ab2-4648-94a9-313255fa8704.png)
