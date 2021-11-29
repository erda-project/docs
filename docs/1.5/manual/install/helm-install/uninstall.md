# 卸载

::: tip 提示

您需要提供 Erda 所部署的 Namespace，例如 erda-system。

:::

1. 您可以通过如下命令卸载 Erda 及依赖。

   ```shell
   helm uninstall erda -n erda-system
   rm -rf /root/.dice.d
   ```

2. 清理 CRD 资源（默认情况下 Helm 不会卸载 CRD 资源）。

   ```shell
   kubectl delete crd erdas.erda.terminus.io
   ```

3. 默认情况下对 `pvc` 资源不作清理。如有需要，您可以通过如下命令手动清理。

   ```shell
   kubectl delete pvc -n erda-system `kubectl get pvc -n erda-system | grep erda | awk '{print $1}'`
   ```
