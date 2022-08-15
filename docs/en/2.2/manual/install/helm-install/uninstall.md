# Uninstall

:::tip Tips

Please provide the Erda namespace deployed, such as erda-system.

:::

1. Run the following command to uninstall Erda and its dependencies.

   ```shell
   helm uninstall erda -n erda-system
   rm -rf /root/.dice.d
   ```

2. Clean up CRD resources (which will be reserved by default).

   ```shell
   kubectl delete crd erdas.erda.terminus.io
   ```

3. Uninstalling Erda will not clean up `pvc` resources by default. If necessary, run the following command to manually clean up.

   ```shell
   kubectl delete pvc -n erda-system `kubectl get pvc -n erda-system | grep erda | awk '{print $1}'`
   ```

