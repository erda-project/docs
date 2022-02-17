# 定位存在资源浪费的工作负载

当集群资源分配不合理时，会出现资源浪费的现象，若无法掌控资源浪费的情况，则会增加额外的成本。

通过 Erda 的多云管理平台，可快速找出浪费资源的"元凶"，对集群资源分配进行合理优化。

请进入 **多云管理平台 > 资源管理 > 集群管理 > 选择集群 > 节点列表** 操作。

## 第一步：找到资源闲置率较高的机器节点

对于 **闲置率** 的定义为已分配资源中未使用的比例。

以分析 CPU 资源为例，选择 **CPU 分析**。点击 **闲置率** 栏降序排序，可发现闲置率最高的节点已分配 76.4% 的 CPU 资源，但实际 CPU 使用率仅为 6.5%。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/29/763f914b-7bce-40fc-81b1-6b26232d1d4f.png)


## 第二步：查看机器节点的 Pods 列表，找到资源分配较多的 Pod

点击对应节点的 **查看 Pods**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/29/d68c4cca-8a14-4568-8928-552fe15f3648.png)

进入 Pods 列表后，可先筛选 **运行中** 状态的 Pod，进行资源分配的分析。

::: tip 提示

通常仅有 **运行中**、**容器创建中** 等状态的 Pod 才会真正占用资源，任务类 Pod 在任务完成后即进入 **完成** 状态，此时 Pod 所占用资源已被释放。

:::

点击 **CPU 请求值** 一栏。由于 Pod 处于运行中状态，因此 CPU 请求值已由 K8s 应允，即这部分资源已分配至该 Pod。如下图所示，分配较多资源的 Pod CPU 水位普遍较低，说明此处存在资源浪费的情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/29/73e07d98-dc95-4bca-b1c3-c0ae01d2c077.png)

## 第三步：查看资源分配较多、水位不高的 Pod，分析其历史资源占用情况

资源使用水位即当前实时的资源使用情况，可能存在当前使用率不高、历史使用率高的情况，这类情况并不属于资源浪费，因此需根据实际情况进行针对性分析。

点击对应 Pod 的名称。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/29/d31017dc-4abf-4bb1-8b4a-b79af994e4cc.png)

进入 Pod 详情查看历史资源使用情况，可发现 Pod CPU 全天的使用率都较低，由此判断确实存在资源浪费的情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/29/0f5344e3-041d-4e1e-90fc-0b2e9a6665f3.png)

## 第四步：找到 Pod 对应的工作负载，进行资源配置调整

点击 Pod 详情中的工作负载。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/29/065f02aa-101b-4b95-a828-3aa456907f42.png)

进入工作负载详情，进行资源调整（该功能将在后续版本上线，敬请期待）。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/29/cf6e8d2a-096d-43c3-acc8-a05d1934316f.png)
