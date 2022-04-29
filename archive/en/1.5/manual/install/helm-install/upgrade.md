# Upgrade

This article will introduce you how to upgrade Erda based on Helm Chart.

:::tip Tips

Upgrade is not supported for v1.0.x version.

:::

### Preparations

Before upgrade, please complete the following preparations:
- Data backup

   It is recommended to back up the MySQL database used by Erda before upgrade to avoid data loss due to upgrade failure.

- Get private configuration parameters or files ready
   - Prepare private configuration of Erda Helm Chart before upgrade, which can be set by `--set`.
   - For details of parameter, see [Operations](helm-install-demo.md#开始安装).
   - For details of private configuration file, see [How to Save the Private Configuration](high-availability.md#如何保存私有化配置).

- Update Erda Helm Chart repository

   ```shell
   helm repo add erda https://charts.erda.cloud/erda
   helm repo update
   ```

### Operations

:::tip Tips

- Please provide the Erda namespace deployed, such as erda-system.
- You can upgrade to the specified version of Erda via `--version` parameter, otherwise it will upgrade to the latest version by default.

:::

- Upgrade Erda by the specified private configuration file such as `custom_values.yaml`.

   ```shell
   helm upgrade erda erda/erda -f custom_values.yaml -n erda-system
   ```

- Upgrade Erda by private configuration parameters. It is recommended to manage configuration via [private configuration files](high-availability.md#如何保存私有化配置).

   ```shell
   helm upgrade erda erda/erda --set param1=value1,param2=value2.... -n erda-system
   ```

### Verification

You can check whether the upgrade is successful in the following ways.

- Check whether the status of Erda custom resource is `Running`.

   ```shell
   kubectl get erda erda -n erda-system
   ```

- Check whether the current cluster version is consistent with the target one.

   ```SHELL
   kubectl get cm dice-cluster-info -o yaml -n erda-system | grep -i dice_version
   ```
