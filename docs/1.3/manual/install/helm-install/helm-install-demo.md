# 基于 Helm 最小化安装

## 准备工作

1. 请确认现有 Kubernetes 集群满足 [前提条件](premise.md)。

2. 最小化安装模式下，Erda 各组件将全部以单副本方案部署。该模式仅适用于试用环境。生产环境部署请参见 [基于 Helm 高可用安装](helm-install-prod.md)。

3. 添加 Erda Helm Chart 仓库并更新。

   ```shell
   helm repo add erda https://charts.erda.cloud/erda
   helm repo update
   ```

## 安装操作

执行如下命令将 Erda 安装至 Namespace `erda-system` ，并等待所有 Erda 组件准备就绪。

```shell
helm install erda erda/erda -n erda-system --create-namespace
```

::: tip 提示

- 您可在安装时通过 `--set erda.clusterName` 指定 Erda 所在集群的标识，默认为 local-cluster。
- Erda 访问入口默认为 *erda.io*，您可以通过 `--set global.domain` 指定。
- 若您在 Kubernetes 节点无法直接访问 Kubernetes 内部域名（例如 *kubernetes.default.svc.cluster.local*），安装 Erda 时需指定 Node 以 hostNetwork 安装 Registry，并指定 `--set registry.custom.nodeIP="",registry.custom.nodeName=""` ，否则流水线功能不可用。
- 您可以通过 `--version` 参数安装指定版本的 Erda，未指定则默认安装最新版本。

:::

## 安装验证
::: tip 提示

您需要提供 Erda 所部署的 Namespace，例如 erda-system。

:::

您可以通过如下命令验证 Erda 最小化安装结果：

- 验证 Erda 状态

  ```shell
  $ kubectl get erda erda -n erda-system
  NAME   STATUS    LASTMESSAGE
  erda   Running   create dice cluster success
  ```

- 验证 Erda 依赖

  ```shell
  $ kubectl get statefulset -n erda-system
  NAME                       READY   AGE
  erda-cassandra-dc1-rack1   1/1     72s
  erda-elasticsearch         1/1     77s
  erda-etcd                  1/1     77s
  erda-kafka                 1/1     77s
  erda-mysql                 1/1     77s
  erda-registry              1/1     77s
  erda-zookeeper             1/1     77s
  rfr-erda-redis             1/1     75s
  ```

完成验证后，您需要进行一些简单的配置以访问 Erda，具体请参见 [配置及访问](configuration.md)。
