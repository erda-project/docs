# 基于阿里云的服务弹性伸缩

## 背景介绍

在 Erda [弹性伸缩](../guides/deploy/autoscaler.html) 中，可以通过配置触发器来提供**服务维度**的弹性能力。对于一个项目来说，
只有服务维度的弹性是不够的，还需要结合:

- [资源弹性伸缩](#资源弹性伸缩)
- [中间件弹性伸缩](#中间件弹性伸缩)

共同支撑项目维度的弹性能力，本文将结合阿里云云产品，实践 Erda 在云上的弹性伸缩。

## 资源弹性伸缩

### 集群自动弹性伸缩配置

首先登陆 `容器服务 Kubernetes 版` 控制台，选择目标集群 `更多` 选项中的 `自动伸缩`， 进入到配置页面。

:::tip 提示
集群自动伸缩依赖 `弹性伸缩 (ESS)`
等权限，在不同权限的账号下，授权也分为不同的场景，请参考 [授权](https://help.aliyun.com/document_detail/119099.html#section-o4s-558-jed)
。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/6164e45e-80c2-49b2-bca2-638fbe4fbf67.png)

进入到集群自动伸缩配置，以下参数需要着重注意：

| 参数        | 说明                                      |
|-----------|-----------------------------------------|
| 允许缩容      | 是否允许节点进行缩容                              |
| 缩容阈值      | 当伸缩组中节点 `Request / 资源容量` 小于该设置值，将触发节点缩容 |
| 缩容触发时延    | 满足缩容阈值后，延迟该设置值后，触发缩容，单位（分钟）             |
| 静默时间      | 扩容出节点，经过该设置值后进入缩容判断                     |
| 弹性灵敏度     | 系统弹性判断伸缩的间隔实践，可选: 15s / 30s / 60s       |
| 节点池扩容顺序策略 | 支持三种策略: least-waste（默认）、random、priority |

:::tip 提示
详细参数介绍，请参考 [配置自动伸缩](https://help.aliyun.com/document_detail/119099.html#section-3bg-2ko-inl)。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/2a06937e-db70-4c90-8eb1-0fce127ab4a9.png)

### 节点池配置

集群自动弹性伸缩配置完成后，接下来配置[节点池](https://help.aliyun.com/document_detail/197279.html)，
同一集群可以存在多个节点池，根据集群自动弹性伸缩中配置的 `节点池扩容顺序策略` 参数，会按照不同的策略选择节点池。

:::tip 提示
这里我们案例中采用的是默认的 `least-waste`策略，会从多个扩容节点池中，
从中选择一个资源浪费最少的节点池进行扩容，其他扩容策略请参考 [配置自动伸缩](https://help.aliyun.com/document_detail/119099.html#section-3bg-2ko-inl)
。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/ce63a365-fc05-4c41-83e5-da646875c5e2.png)

点击 `创建节点池`，进入到节点池的配置页面，需要注意如下参数的配置：

**参数一: 容器运行时**

Erda 支持 `docker` 、`containerd` 作为服务的容器运行时，需选择与**当前节点池所属集群**一致的容器运行时。

集群的容器运行时可以通过 `容器服务控制台` > `节点池` > `default-nodepool` 中的 `容器运行时` 查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/02/ceb64eb1-c6a4-43af-a2ac-571c24ce3e7e.png)

**参数二: 节点标签**

Erda 发布的服务需要如下标签才可以满足调度条件：

- 服务类标签：当前通过弹性伸缩扩出的节点，仅支持无状态服务的调度，需要配置 `dice/stateless-service=true`
- 信息类标签：企业标识标签, 以企业名 `erda-demo` 为例：`dice/org-erda-demo=true`
- 环境类标签：标识期望哪些环境下的服务可以参与节点伸缩的调度判定, 以生产环境为例：`dice/workspace-prod=true`

:::tip 提示
Erda 标签规范详细请参考 [节点标签](../../cmp/guide/cluster/cluster-node-labels.html)。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/0d353d91-7eec-4294-bd73-9f5b3a087fc6.png)

**参数三: 伸缩模式**

- 标准模式：根据资源申请值的使用量，通过创建、释放 ECS 的方式进行伸缩。
- 极速模式：通过创建、停机、启动的方式进行伸缩，提高再次伸缩的速度（停机时计算资源不收费，只收取存储费用，本地盘机型除外）。

**参数四: 实例自定义数据**

:::tip 提示
若当前集群配置的镜像仓库为公网可信镜像仓库（比如：`阿里云容器镜像服务(ACR)`，`Dockerhub` 等），**
该部分配置可以忽略，请继续阅读其他配置**。
:::

Erda 镜像仓库默认使用安装时部署的 `registry`，对于新加入集群中的节点，需要进行一些初始化的配置才可以作为运行节点。

我们可以通过节点池配置 `显示高级选项` 中的 `实例自定义数据`,
在集群自动弹性伸缩时通过 [cloud-init](https://github.com/canonical/cloud-init) 对新实例进行初始化。

Erda 提供了实例的初始化脚本，`实例自定义数据` 可填写如下命令：

```shell
curl https://erda-project.oss-cn-hangzhou.aliyuncs.com/scripts/ack_ca_init.sh | bash
```

参数如下：

| 参数                     | 默认值                                           | 说明                                                                                      |
|------------------------|-----------------------------------------------|-----------------------------------------------------------------------------------------|
| REGISTRY_ADDR          | addon-registry.default.svc.cluster.local:5000 | 镜像仓库地址，可通过如下命令获取: <br/>  `kubectl <-n {erda namespace}> get cm dice-addons-info -o json | jq .data.REGISTRY_ADDR`   |                                         
| CONTAINER_RUNTIME      | -                                             | 容器运行时, 可手动指定。默认会根据 kubelet 参数进行探测，目前仅支持 `docker`、`containerd`                           |
| CONTAINERD_CONFIG_PATH | /etc/containerd/config.toml                   | 容器运行时配置文件, 当容器运行时为 `containerd` 时生效                                                     |
| DOCKER_CONFIG_PATH     | /etc/docker/daemon.json                       | 容器运行时配置文件, 当容器运行时为 `docker` 时生效                                                         |
| CORE_DNS               | 192.168.0.10                                  | CoreDNS 集群内 Service 地址, 可通过如下命令获取： <br />`kubectl get svc -n kube-system                | grep kube-dns | awk '{print $3}'`   |
| FORWARD_DNS            | 100.100.2.136,100.100.2.138                   | CoreDNS 服务存在问题时，缺省使用的公网 DNS 列表                                                          |

以修改 `REGISTRY_ADDR` 为例，`实例自定义数据` 需要填写为：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/2e9fa48e-96c0-4cb8-983b-2f5d28d19a33.png)

所有配置填写完成后，点击 `确认`，系统会对当前节点池的创建条件进行判断，检查通过后，继续点击 `确认` 即可完成节点池创建。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/bf96b5a6-ae26-457f-88b3-c45e8e9493ea.png)

等待节点池初始化完成后，我们再次查看集群自动弹性伸缩配置，其中 `伸缩状态` 由 `待激活` 变更为 `已启用`,
节点池状态显示 `已激活`。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/41fbb1ae-b088-4b15-83b1-218fa7ba0f4d.png)

此时我们查看当前集群 `kube-system` 命名空间下的 `无状态` 工作负载，可以看到有 `cluster-autoscaler` 组件已经运行，表示伸缩组已创建成功。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/3207cf79-1810-4219-838c-e1ac01b24ff3.png)

### 结果验证

节点池配置完成后，接下来我们结合 Erda 的 `弹性伸缩` 来验证集群的 `自动伸缩`。

**节点弹出**

首先在 Erda 平台发布一个服务，配置 `弹性伸缩`，添加 `CPU` 触发器并启用，更多 Erda
弹性伸缩的配置请参考 [弹性伸缩](../guides/deploy/autoscaler.html)。  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/9ca42408-2ec9-4195-84ca-246cf18b15cc.png)

使用脚本请求该服务，**提高服务负载**，触发服务发生自动扩容。 如图所示，服务负载达到 `CPU` 触发器的阈值后，实例从 1 个扩容到了
3 个，由于集群资源不足，新扩容的实例处于 `Pending` 状态。  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/243291ba-7bad-4b40-8605-4dcc878e672d.png)

此时可以从 ACK 节点池的 `伸缩活动` 中看到弹出了一台 ECS 实例 (IP 为 10.0.0.209)，并且从 Erda
的多云管理中可以看到该节点已经加入到集群中，并且正在进行初始化工作。

:::tip 提示
cluster-autoscaler 感知到 Pod 处于 `Pending` 状态，会触发模拟调度，模拟调度会计算是否有满足条件的节点池可以调度这些
Pod，如果满足则触发节点扩容。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/4ff2e63f-d11d-4b63-83b1-bff2a283f852.png)
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/75e6ce2a-840e-4c40-ba93-201b1a524cbe.png)

回到 Erda 部署中心，之前处于 `Pending` 状态的服务，现在成功调度到了 `自动伸缩` 弹出的实例上。  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/42a2dc20-f82e-4b5c-9d66-c8a821ef6bf4.png)

**节点缩容**

停止模拟请求，**降低服务负载**，触发服务发生自动缩容。如图所示，服务负载降低到 `CPU` 触发器阈值以下，实例恢复到扩容之前的实例数。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/ce70aeb8-91b3-46ad-b02c-8e3ba72e45b5.png)

此时可以从 ACK 节点池的 `伸缩活动` 中看到缩容了一台 ECS 实例，从 Erda 的多云管理中可以看到节点正在从集群中移除。

:::tip 提示
只有通过弹性伸缩弹出的节点，才能被缩容。当节点调度利用率低于设置的阈值时，触发缩容判断。  
触发模拟驱逐，判断是否可以排水彻底，条件满足，则触发缩容。缩容过程首先排水，对节点上 Pod 进行驱逐，再执行节点下线。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/31131f12-095a-4190-9390-6ba6b0fd04c2.png)
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/08/01/9ad9acef-dd57-4129-b7c1-fb48be4a68fc.png)

## 中间件弹性伸缩

服务弹性及资源弹性可以满足集群内负载的弹性需求，对于项目维度，服务可能会依赖云上中间件。 阿里云同样提供了云中间件的弹性服务，可以按需进行伸缩，
这里列举了一些常见的中间件的弹性配置：

**RDS**

- [设置性能自动扩容](https://help.aliyun.com/document_detail/270097.html)
- [设置存储空间自动扩容](https://help.aliyun.com/document_detail/173826.html)

**Elasticsearch**

- [弹性扩缩集群资源](https://help.aliyun.com/document_detail/172655.html)

**Redis**

- [开启带宽弹性伸缩](https://help.aliyun.com/document_detail/254623.html)
- [开启自动扩容](https://help.aliyun.com/document_detail/208168.html)