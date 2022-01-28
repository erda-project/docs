# Minimal Mode

## Preparations

1. Please confirm that the existing Kubernetes cluster meets the [Prerequisites](premise.md).

2. In minimal mode, all components of Erda will be deployed as a single copy, which is only suitable for trial environment. For production environment, see [High-Availability Mode](helm-install-prod.md).

3. Add Erda Helm Chart repository and update.

   ```shell
   helm repo add erda https://charts.erda.cloud/erda
   helm repo update
   ```

## Operations

Run the following command to install Erda to the Namespace `erda-system` and wait for all Erda components to be ready.

```shell
helm install erda erda/erda -n erda-system --create-namespace
```

:::tip Tips

- Speicify the identifier of the cluster where Erda is located by `--set erda.clusterName`, which is local-cluster by default。
- The default access to Erda is *erda.io*, and you can specify it with `--set global.domain`.
- If you cannot directly access the internal domain name (such as *kubernetes.default.svc.cluster.local*) on the Kubernetes node, you need to specify node to install Registry with hostNetwork, and specify `--set registry.custom.nodeIP="",registry .custom.nodeName=""`, otherwise the pipeline function is not available.
- You can install the specified version of Erda via `--version` parameter, otherwise the latest version will be installed by default.

:::

## Verification
:::tip Tips

Please provide the Erda namespace deployed, such as erda-system.

:::

You can run the following command to verify installation result:

- Verify Erda status

   ```shell
   $ kubectl get erda erda -n erda-system
   NAME   STATUS    LASTMESSAGE
   erda   Running   create dice cluster success
   ```

- Verify Erda dependencies

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

After verification, you need to make some simple configurations to access Erda. For details, see [Configuration and Access](configuration.md).