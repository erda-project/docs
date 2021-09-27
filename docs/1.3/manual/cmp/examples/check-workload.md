# 找出存在资源浪费的工作负载

当集群资源分配不合理时，会造成资源浪费，如果无法掌控资源浪费的情况，就会增加额外的成本。

使用 Erda 的多云管理平台，可以迅速找出浪费资源的"元凶"，对集群资源分配进行合理优化。

分析入口为：多云管理平台 -> 资源管理 -> 集群管理，点击指定集群 -> 节点列表

## 第一步：找到资源闲置率比较高的机器节点

对于`闲置率`的定义是：已分配资源中未使用的比例

以分析 CPU 资源为例，先选中 CPU 分析

点击`闲置率`栏降序排，得到闲置率最高的节点，该节点已经分配了 76.4% 的 CPU 资源，但实际的 CPU 使用率只有 6.5%

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/27/ee9b9b07-cbac-4829-98be-ed0708124c55.png)


## 第二步：查看机器节点的 Pods 列表，找到资源分配较多的 Pod

点击对应节点的`查看 Pods`

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/27/d2a077dc-9f56-4e9b-8ed3-1df80fe1c437.png)

在进入 Pods 列表后，可以先筛选`运行中`状态的 Pod，进行资源分配的分析

::: tip Pod 的状态

一般只有`运行中`、`容器创建中`等状态的 Pod 才会真正占用资源，任务类 Pod 在任务完成后会进入`完成`状态，此时 Pod 所占用资源已经被释放

:::

点击`CPU 请求值`一栏，因为 Pod 处于运行中状态，故而`CPU 请求值`是被 K8S 应允了的，也就是这些资源被分配给了该 Pod

如图所示，分配了较多资源的 Pod 其 CPU 水位普遍比较低，说明这里是存在资源浪费的情况

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/27/98b2facc-c98f-49ec-b521-57467e1e6828.png)

## 第三步：查看资源分配较多，水位不高的 Pod，分析其历史资源占用情况

资源使用水位是当前实时的资源使用情况，有可能只是该资源当前使用率不高，但历史出现过高使用率，这种情况并不属于资源浪费，需要针对性分析

点击对应 Pod 的名称

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/27/90b1865a-1a0d-4d66-be0f-0ae10ce15924.png)

进入 Pod 详情可以查看历史资源使用情况, 可以看到一天内 Pod CPU 使用率都比较低，判断确实存在资源浪费的情况

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/27/66b3c5ff-74a5-42da-bc6e-01aa2c6162e8.png)

## 第四步：找到 Pod 对应的工作负载，进行资源配置调整

点击 Pod 中的工作负载

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/27/e59fc2aa-d480-48a8-b39c-42f42ba281d4.png)

进入工作负载详情，进行资源调整(Erda 1.4 版本以后支持)

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/27/ef8d9108-853a-4c10-8ab6-80b9ff02088d.png)
