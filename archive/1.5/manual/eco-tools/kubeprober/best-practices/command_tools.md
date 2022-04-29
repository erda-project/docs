# 使用命令行工具

Kubeprober 使用 kubectl + kubectl-probe 插件即可完成全部操作。

```shell script
Usage:
  kubectl-probe [flags]
  kubectl-probe [command]

Available Commands:
  help        Help about any command
  once        Perform one-time diagnostics of remote cluster or local cluster
  oncestatus  Print One-time probe status of remote cluster or local cluster
  status      Print probe status of remote cluster or local cluster
  version     Print the version number of Kubeprober

Flags:
  -h, --help   help for kubectl-probe

Use "kubectl-probe [command] --help" for more information about a command.
```
* 查看集群列表

  ```shell script
  kubectl get cluster
  ```

* 查看 Probe 列表

  ```shell script
  kubectl get probe
  ```

* Probe 关联集群

  ```shell script
  kubectl label cluster <clusterName> probe/<probeName>=true
  ```

* 查看集群诊断结果

  ```shell script
  kubectl probe status -c <clusterName>
  ```

* 对集群执行一次性诊断

  ```shell script
  kubectl probe once -c <clusterName>
  ```

* 查看集群的一次性诊断历史记录

  ```shell script
  kubectl probe oncestatus -c <clusterName> -l
  ```

* 查看集群的一次性诊断历史结果

  ```shell script
  kubectl probe oncestatus -c <clusterName> -i <onceID>
  ```

* 查询帮助

  ```shell script
  kubectl probe help
  ```

