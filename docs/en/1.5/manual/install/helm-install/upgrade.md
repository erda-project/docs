# Upgrade

This article will introduce you how to upgrade Erda based on Helm Chart.

:::tip Tips

Upgrade is not supported for v1.0.x version.

:::

## Preparations

Before upgrade, please complete the following preparations:

- Data backup

  It is recommended to back up the MySQL database used by Erda before upgrade to avoid data loss due to upgrade failure.

- Get private configuration parameters or files ready

  - Prepare private configuration of Erda Helm Chart before upgrade, which can be set by `--set`.
  - For details of parameter, see [Operations](helm-install-demo.md#安装操作).
  - For details of private configuration file, see [How to Save the Private Configuration](high-availability.md#如何保存私有化配置).

- Update Erda Helm Chart repository

  ```shell
  helm repo add erda https://charts.erda.cloud/erda
  helm repo update
  ```

- Additional operations are required for some versions. Please check in advance.

  - [Upgrade for versions below 1.4.0](upgrade.md#Upgrade-for-versions-below-1.4.0)

## Operations

### Standard Upgrade

:::tip Tips

- Please provide the Erda Namespace deployed, such as erda-system.
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

### Upgrade for Versions below 1.4.0

Version 1.4.0 optimizes cluster management and monitoring tracing authentication. Perform the following operations for adaptation.

**Upgrade master cluster**

1. Configure the namespace where Erda is located, such as erda-system.

   ```shell
   export ERDA_NAMESPACE="erda-system"
   ```

2. Run the following command in the cluster to create a default secret before upgrading.

   ```shell
   kubectl create secret generic erda-cluster-credential --from-literal=CLUSTER_ACCESS_KEY="init" -n $ERDA_NAMESPACE
   ```

3. Perform [Standard Upgrade](upgrade.md#标准升级) procedures.

4. After upgrading Erda, go to **Cloud Management > Cluster Resource > Clusters > Operations > Token Management > Create Token**, and apply for a management credential of the master cluster.

5. Run the following command to replace the default credential.

   ```shell
   # Please fill in the applied management credential
   export CLUSTER_ACCESS_KEY=""
   ```

   ```shell
   sh -c "kubectl patch secret -n $ERDA_NAMESPACE erda-cluster-credential --type='json' -p='[{"op" : "replace" ,"path" : "/data/CLUSTER_ACCESS_KEY" ,"value" : $(echo $CLUSTER_ACCESS_KEY | base64)}]'"
   ```

**Upgrade worker cluster**

1. Download the [installation package](https://github.com/erda-project/erda/releases) of Erda 1.4.0 and later.

2. Make sure that the worker cluster can be accessed via kubectl and Helm 3 is installed. For details, see [Preparations](premise.md#准备工作).

3. Go to **Cloud Management > Cluster Resource > Clusters > Operations > Token Management > Create Token**, and apply for a management credential of the worker cluster.

4. Run the following command and follow the prompts to upgrade the edge clusters.

   ```shell
   # Please fill in the applied management credential
   bash erda-release/erda-helm/scripts/upgrade_1.4.sh --cluster_access_key=""
   ```

## Verification

You can check whether the upgrade is successful in the following ways.

- Check whether the status of Erda custom resource is `Running`.

  ```shell
  kubectl get erda erda -n erda-system
  ```

- Check whether the current cluster version is consistent with the target one.

  ```SHELL
  kubectl get cm dice-cluster-info -o yaml -n erda-system | grep -i dice_version
  ```
