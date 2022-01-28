# Command Line Tools

Kubeprober uses kubectl and kubectl-probe plug-in to complete all operations.

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
* View the cluster list

   ```shell script
   kubectl get cluster
   ```

* View the probe list

   ```shell script
   kubectl get probe
   ```

* Associate cluster

   ```shell script
   kubectl label cluster <clusterName> probe/<probeName>=true
   ```

* View the diagnosis results

   ```shell script
   kubectl probe status -c <clusterName>
   ```

* Run one-time diagnosis for the cluster

   ```shell script
   kubectl probe once -c <clusterName>
   ```

* View the one-time diagnosis history of the cluster

   ```shell script
   kubectl probe oncestatus -c <clusterName> -l
   ```

* View the one-time diagnosis results of the cluster

   ```shell script
   kubectl probe oncestatus -c <clusterName> -i <onceID>
   ```

* Help

   ```shell script
   kubectl probe help
   ```

