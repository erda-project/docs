# 升级

本文将为您介绍如何基于 Helm Chart 升级版本。

::: tip 提示

v1.0.x 版本不支持升级。

:::

### 升级准备

开始 Erda 升级前，您需要完成如下准备：
- 数据备份

  建议您在升级前对 Erda 使用的 MySQL 数据库进行备份，以防升级失败造成数据丢失。
  
- 准备私有化配置参数或文件
  - 升级前需准备好 Erda Helm Chart 的私有化配置，可以是通过 `--set` 设置的参数或私有化配置文件。
  - 关于参数相关内容，请参见 [开始安装](helm-install-demo.md#开始安装)。
  - 关于私有化配置文件相关内容，请参见 [如何保存私有化配置](high-availability.md#如何保存私有化配置)。
  
- 更新 Erda Helm Chart 仓库

  ```shell
  helm repo add erda https://charts.erda.cloud/erda
  helm repo update
  ```

### 升级 Erda

::: tip 提示

- 您需要提供 Erda 所部署的 Namespace，例如 erda-system。 
- 您可以通过 `--version` 参数升级至指定版本的 Erda，未指定则默认升级至最新版本。

:::

- 使用指定私有化配置文件升级 Erda，例如 `custom_values.yaml`。

  ```shell
  helm upgrade erda erda/erda -f custom_values.yaml -n erda-system
  ```

- 使用私有化配置参数升级 Erda，建议通过 [私有配置文件的方式](high-availability.md#如何保存私有化配置) 管理配置。

  ```shell
  helm upgrade erda erda/erda --set param1=value1,param2=value2.... -n erda-system
  ```

### 升级验证

完成 Erda 升级后，您可以通过以下方式查看升级是否成功。

- 查看 Erda 自定义资源状态是否为 `Running`。

  ```shell
  kubectl get erda erda -n erda-system
  ```

- 查看当前集群版本是否与目标版本一致。

  ```SHELL
  kubectl get cm dice-cluster-info -o yaml -n erda-system | grep -i dice_version
  ```
