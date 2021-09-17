# 卸载 Erda

::: tip 提示

您需要提供 Erda 所部署的 Namespace，比如 erda-system

:::

1. 您可以通过如下命令卸载 Erda 及依赖。

```shell
helm uninstall erda -n erda-system
rm -rf /root/.dice.d
```

2. 清理 CRD 资源（Helm 默认情况下不会卸载 CRD 资源）。

```shell
kubectl delete crd erdas.erda.terminus.io
```

3. 默认情况下我们不对 `pvc` 资源进行清理，如果需要，您可以通过如下命令手动清理。

```shell
kubectl delete pvc -n erda-system `kubectl get pvc -n erda-system | grep erda | awk '{print $1}'`
```
