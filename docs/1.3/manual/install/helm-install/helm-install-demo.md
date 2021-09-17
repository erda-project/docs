# 基于 Helm 最小化安装 Erda

## 准备工作

1. 请确保现有 Kubernetes 集群满足 [先决条件](premise.md)。

2. 最小化安装，Erda组件将全部以单副本方案部署，不建议生产使用，生产环境部署请参考 [基于 Helm 高可用安装 Erda](helm-install-prod.md)。

3. 添加 Erda Helm Chart 仓库，并更新。

```shell
helm repo add erda https://charts.erda.cloud/erda
helm repo update
```

## 开始安装

通过如下命令安装 Erda 到 Namespace `erda-system` ，并等待所有 Erda 组件准备就绪。

```shell
helm install erda erda/erda --set erda.clusterName="erda-demo" -n erda-system --create-namespace
```

::: tip 提示

- 您需要安装时指定 Erda 集群名称，比如 erda-demo。
- Erda 访问入口默认为 `erda.io` , 您可以通过 `--set global.domain` 指定。
- 如果您在 Kubernetes 节点无法直接访问 Kubernetes 内部域名（例如 kubernetes.default.svc.cluster.local），安装 Erda 时需指定 Node
以 hostNetwork 安装 Registry，并且指定 `--set registry.custom.nodeIP="",registry.custom.nodeName=""` ，否则您将无法使用流水线功能。
- 您可以通过 `--version` 参数安装指定版本的 Erda，未指定默认安装最新版本。

:::

## 安装验证
您可以通过如下命令验证 Erda 最小化安装结果：

::: tip 提示

您需要提供 Erda 所部署的 Namespace，比如 erda-system。

:::

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

验证完成后，您需要进行一些简单的配置来访问 Erda , 请参考 [配置及访问 Erda](configuration.md)。