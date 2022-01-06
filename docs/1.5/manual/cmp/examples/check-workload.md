# 定位存在资源浪费的工作负载

当集群资源分配不合理时，会出现资源浪费的现象，若无法掌控资源浪费的情况，则会增加额外的成本。

通过 Erda 的多云管理平台，可快速找出浪费资源的"元凶"，对集群资源分配进行合理优化。

请进入 **多云管理平台 > 容器资源 > 节点** 操作。

## 第一步：找到资源分配使用率较低的机器节点

对于 **分配使用率** 的定义为已分配资源中使用的比例。

以分析 CPU 资源为例，选择 **CPU 分析**。分配使用率默认是不展示的，需要在表格右上角的齿轮按钮出将 分配使用 打钩。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/1ff7a1ef-8351-4894-8229-e0f3228c3531.png)

点击 **分配使用** 栏升序排序，可发现分配使用率最高的节点已分配 89.1% 的 CPU 资源，但实际 CPU 使用率仅为 4.5%。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/d5d6f207-b57d-442e-89e8-c0c48a1ed244.png)


## 第二步：查看机器节点的 Pods 列表，找到资源分配较多的 Pod

点击对应节点的 **操作 > 查看 Pods**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/a1673da9-cbaa-4b2f-a436-a88f05c22224.png)

进入 Pods 列表后，可先筛选 **运行中** 状态的 Pod，进行资源分配的分析。

::: tip 提示

通常仅有 **运行中**、**容器创建中** 等状态的 Pod 才会真正占用资源，任务类 Pod 在任务完成后即进入 **完成** 状态，此时 Pod 所占用资源已被释放。

:::

点击 **CPU 请求值** 一栏。由于 Pod 处于运行中状态，因此 CPU 请求值已由 K8s 应允，即这部分资源已分配至该 Pod。如下图所示，分配较多资源的 Pod CPU 水位普遍较低，说明此处存在资源浪费的情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/bd3ce09c-f220-45fa-83e2-2c7af914471a.png)

## 第三步：查看资源分配较多、水位不高的 Pod，分析其历史资源占用情况

资源使用水位即当前实时的资源使用情况，可能存在当前使用率不高、历史使用率高的情况，这类情况并不属于资源浪费，因此需根据实际情况进行针对性分析。

点击对应 Pod 的名称。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/41f00932-ab19-47d5-8574-ec13f200a730.png)

进入 Pod 详情查看历史资源使用情况，可发现 Pod CPU 全天的使用率都较低，由此判断确实存在资源浪费的情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/c0781ae7-f3ff-4803-af00-e32ef9c651b3.png)

## 第四步：找到 Pod 对应的工作负载，进行资源配置调整

点击 Pod 详情中的工作负载。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/9f09fe9a-e939-4ddf-a150-a435cdafc52e.png)

进入工作负载详情，点击 **查看/编辑YAML** 进行资源调整。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/1fd234e4-441b-4052-9034-80ad5f7bb7d2.png)

修改工作负载的资源分配后，点击确定，即可使修改生效。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/06/4eb001b1-3762-41fd-8f74-9006a508ea74.png)