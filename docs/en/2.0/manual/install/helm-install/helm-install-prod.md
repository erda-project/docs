# High-Availability Mode

## Preparations

1. Please confirm that the existing Kubernetes cluster meets the [Prerequisites](premise.md).

2. The high-availability mode is suitable for production environment, in which core components and important dependencies of Erda are deployed as multi copy. It provides configuration parameters by default, and please note the following:

   - MySQL does not support high availability. It is recommended to connect to your own MySQL or relational database service (RDS) of cloud service provider to ensure stability. For details, see [How to Connect to Existing Middleware](high-availability.md#How-to-Connect-to-Existing-Middleware).

   - It is recommended to save the private configuration properly for subsequent upgrade and maintenance. For details, see [How to Save Private Configuration](high-availability.md#How-to-Save-Private-Configuration).

   - It provides Erda and its dependences configuration parameters by default, which can be modified according to the actual situation. For details, see [Configurable Parameter for High-Availability Deployment](high-availability.md#Configurable-Parameter-for-High-Availability-Deployment).

3. For proper scheduling of Erda components and its dependent components, see [High-Availability Component Scheduling](comp-schedule.md).

4. Add Erda Helm Chart repository and update.

   ```shell
   helm repo add erda https://charts.erda.cloud/erda
   helm repo update
   ```

## Operations

### Configurations

You can describe the custom configuration of high-availability installation for Erda by configuration file, such as `custom_values.yaml`:

```yaml
global:
  size: prod
  domain: "erda.io"

erda:
  clusterName: "local-cluster"

mysql:
  enbaled: false
  custom:
    address: "rds.xxx.com"
    port: "3306"
    database: "erda"
    user: "erda"
    password: "********"

registry:
  custom:
    nodeIP: 172.16.0.6
    nodeName: cn-hangzhou.172.16.0.6
```

The specific parameters are as follows:

| Parameter | Description |
|:----|:---|
| global.size | The deployment mode (`demo` and `prod` are supported), and the high-availability mode is set as `prod` |
| global.domain | The domain name bound to the current Erda cluster |
| erda.clusterName | The identifier of the Kubernetes cluster where Erda is deployed |
| mysql.enabled | MySQL deployment, set as false when connecting to external MySQL |
| mysql.custom.* | Connect to MySQL information provided by the user |
| registry.custom.* | Configuration information of registry host mode  |

For more information, see [Configurable Parameter for High-Availability Deployment](high-availability.md#Configurable-Parameter-for-High-Availability-Deployment).

### Installation

Run the specified configuration file to install Erda to the namespace `erda-system`.

```shell
helm install erda erda/erda -f custom_values.yaml -n erda-system --create-namespace
```

:::tip Tips

You can install the specified version of Erda via `--version` parameter, otherwise the latest version will be installed by default.

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
   - **erda-cassandra-**: The Cassandra cluster instance at the back end of Erda, created by Cassandra Operator via CassandraCluster object.
   - **erda-elasticsearch**: The Elasticsearch cluster instance at the back end of Erda.
   - **erda-etcd-***: The etcd cluster node instance at the back end of Erda.
   - **erda-zookeeper-***: The Zookeeper cluster node instance at the back end of Erda.
   - **erda-kafka-***: The Kafka cluster node instance at the back end of Erda.
   - **erda-mysql**: The MySQL instance at the back end of Erda, with high-availability mode not supported.
   - **erda-registry**: The Registry instance at the back end of Erda, with high-availability mode not supported.
   - **rfr-erda-redis**: The Redis active/passive cluster instance deployed by RedisFailover at the back end of Erda.

   ```shell
   $ kubectl  get statefulset -n erda-system
   NAME                       READY   AGE
   erda-cassandra-dc1-rack1   1/1     12h
   erda-cassandra-dc1-rack2   1/1     12h
   erda-cassandra-dc1-rack3   1/1     12h
   erda-elasticsearch         3/3     12h
   erda-etcd-0                1/1     12h
   erda-etcd-1                1/1     12h
   erda-etcd-2                1/1     12h
   erda-kafka-1               1/1     12h
   erda-kafka-2               1/1     12h
   erda-kafka-3               1/1     12h
   erda-mysql                 1/1     12h
   erda-registry              1/1     12h
   erda-zookeeper-1           1/1     12h
   erda-zookeeper-2           1/1     12h
   erda-zookeeper-3           1/1     12h
   rfr-erda-redis             2/2     12h
   ```

After verification, you need to make some simple configurations to access Erda. For details, see [Configuration and Access](configuration.md).