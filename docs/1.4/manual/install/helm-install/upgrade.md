# 升级

本文将为您介绍如何基于 Helm Chart 升级版本。

::: tip 提示

v1.0.x 版本不支持升级。

:::

## 升级准备

开始 Erda 升级前，您需要完成如下准备：
- 数据备份

  建议您在升级前对 Erda 使用的 MySQL 数据库进行备份，以防升级失败造成数据丢失。
  
- 准备私有化配置参数或文件
  - 升级前需准备好 Erda Helm Chart 的私有化配置，可以是通过 `--set` 设置的参数或私有化配置文件。
  - 关于参数相关内容，请参见 [安装操作](helm-install-demo.md#安装操作)。
  - 关于私有化配置文件相关内容，请参见 [如何保存私有化配置](high-availability.md#如何保存私有化配置)。
  
- 更新 Erda Helm Chart 仓库

  ```shell
  helm repo add erda https://charts.erda.cloud/erda
  helm repo update
  ```
- **部分版本升级需要涉及到额外操作，请在升级前确认：**
  - [1.4.0 以下版本升级至 1.4.0 及以上版本](upgrade.md#1.4.0以下版本升级至1.4.0及以上版本)

## 升级 Erda

### 标准升级

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

### 1.4.0以下版本升级至1.4.0及以上版本

1.4.0 版本对原有 集群管控/监控链路 认证进行了优化，需要执行如下操作进行适配。<br />

**升级 Master 集群**

1. 配置当前 Erda 所在的 Namespace，比如: erda-system。

```shell
export ERDA_NAMESPACE="erda-system" 
```

2. 升级前在集群中执行如下命令，创建默认 Secret。

```shell
kubectl create secret generic erda-cluster-credential --from-literal=CLUSTER_ACCESS_KEY="init" -n $ERDA_NAMESPACE
```

3. 执行 [标准升级](upgrade.md#标准升级) 流程。

4. Erda 升级完毕后，请前往多云管理平台申请 Master 集群的管控凭证。
> 多云管理平台 > 集群资源 > 集群 > 操作 > Token管理 > 创建 Token

5. 执行如下命令，对默认凭证进行替换。

```shell
# 请填充申请的管控凭证
export CLUSTER_ACCESS_KEY=""
```
```shell
sh -c "kubectl patch secret -n $ERDA_NAMESPACE erda-cluster-credential --type='json' -p='[{"op" : "replace" ,"path" : "/data/CLUSTER_ACCESS_KEY" ,"value" : $(echo $CLUSTER_ACCESS_KEY | base64)}]'"
```

**升级 Worker 集群**

1. 下载 Erda 1.4.0及以上版本 [压缩包](https://github.com/erda-project/erda/releases) 并解压。

2. 确保可以通过 `kubectl` 访问 Worker 集群，并且已经安装 `Helm3`，请参考 [准备工作](premise.md#准备工作)。 

3. 前往多云管理平台申请 Worker 集群的管控凭证。
> 多云管理平台 > 集群资源 > 集群 > 操作 > Token管理 > 创建 Token

3. 执行如下命令并根据提示完成边缘集群的升级。

```shell
# 请填充申请的管控凭证
bash erda-release/erda-helm/scripts/upgrade_1.4.sh --cluster_access_key=""
```

## 升级验证

完成 Erda 升级后，您可以通过以下方式查看升级是否成功。

- 查看 Erda 自定义资源状态是否为 `Running`。

  ```shell
  kubectl get erda erda -n erda-system
  ```

- 查看当前集群版本是否与目标版本一致。

  ```SHELL
  kubectl get cm dice-cluster-info -o yaml -n erda-system | grep -i dice_version
  ```
