# 定位存在资源浪费的工作负载

当集群资源分配不合理时，将出现资源浪费的现象。若无法掌控资源浪费的情况，则会增加额外的成本。

通过 Erda 的多云管理平台，可快速找出浪费资源的"元凶"，对集群资源分配进行合理优化。

请进入 **多云管理平台 > 容器资源 > 节点** 操作。

## 第一步：找到资源分配使用率较低的机器节点

**分配使用率** 指已分配资源中使用的比例。

以分析 CPU 资源为例，选择 **CPU 分析**。平台默认不展示分配使用率，需点击右上角齿轮图案勾选 **分配使用**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/adc14db9-8154-4b93-bbdf-896649e17399.png)

点击 **分配使用** 栏升序排序，可发现分配使用率最低的节点已分配 89.1% 的 CPU 资源，但实际 CPU 使用率仅为 4.5%。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/1960db70-ffd8-4e68-aced-bafab2df2827.png)


## 第二步：查看机器节点的 Pods 列表，找到资源分配较多的 Pod

点击对应节点的 **操作 > 查看 Pods**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/5e4cfd8e-7cbc-4514-87d6-48a4ced90c96.png)

进入 Pods 列表后，可先筛选 **运行中** 状态的 Pod，进行资源分配分析。

::: tip 提示

通常仅有 **运行中**、**容器创建中** 等状态的 Pod 才会真正占用资源，任务类 Pod 在任务完成后即进入 **完成** 状态，此时 Pod 所占用资源已被释放。

:::

点击 **CPU 请求值** 一栏。由于 Pod 处于运行中状态，因此 CPU 请求值已由 K8s 应允，即这部分资源已分配至该 Pod。如下图所示，分配较多资源的 Pod CPU 水位普遍较低，说明此处存在资源浪费的情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/5b558261-2e6a-490d-8eb7-87a1d17079b7.png)

## 第三步：查看资源分配较多、水位较低的 Pod，分析其历史资源占用情况

资源使用水位即当前实时的资源使用情况，可能存在当前使用率较低、历史使用率高的情况，这类情况并不属于资源浪费，因此需根据实际情况进行针对性分析。

点击对应 Pod 的名称。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/8c9d2a66-114c-448e-8543-44d2752241c4.png)

进入 Pod 详情查看历史资源使用情况，可发现 Pod CPU 全天的使用率均较低，由此判断确实存在资源浪费的情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/4f974180-5bfd-4d5f-93c3-13be0f1d5631.png)

## 第四步：找到 Pod 对应的工作负载，进行资源配置调整

点击 Pod 详情中的工作负载。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/5c636d4c-344e-4f6f-8cd8-90ea8c6df234.png)

进入工作负载详情，点击 **查看/编辑YAML** 进行资源调整。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/2eca0306-b55b-463c-8890-1d66ee2ac96e.png)

完成资源调整后，点击 **确定**，修改即刻生效。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/07/9e8f2b3a-ab10-40bf-92ef-33678c25e750.png)
