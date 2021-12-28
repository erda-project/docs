# Concepts

To better support the release, operation and maintenance of edge applications, the platform abstracts the concepts related to edge scenarios and manages them in a cloud-native way through the underlying OpenYurt, thus bringing Erda's features of unified release, service orchestration, monitoring, logging, etc. to the edge scenarios.

## Site
In the edge scenario, an edge application usually consists of several microservices and a small amount of middleware. Although the business scenario is relatively simple, the stability requirement is high, so high availability deployment is required, that is, the corresponding underlying computing resources need multiple servers. This group of servers is the site. The sites are distinctly geographic and the networks between the sites are isolated from each other. The platform manages the lifecycle of sites through the underlying node pool resources, which makes it easy for O&M engineers to effectively manage the massive computing resources distributed in different regions.

For deployments in edge scenarios, in order to access the nearest pod, that is, to access only the pod corresponding to the site at the site level, the platform encapsulates the K8s service topology feature to achieve a closed loop of site-level traffic. Add `topologyKeys` when creating edge application SVC, together with unified tag management of node pool, to complete site-level distribution of traffic.

```
apiVersion: v1
kind: Service
metadata:
  name: ud-test
  labels:
    app: ud-test
spec:
  ports:
  - name: ud-test
    port: 80
    targetPort: 80
  selector:
    app: ud-test
  topologyKeys:
    - "topology.kubernetes.io/zone"
    # - "*"
```

## Unitized Deployment
Unlike traditional Kubernetes applications, edge applications can deploy Deployment or StatefulSet resources to edge sites in batches (i.e., node pool resources). The bottom layer of the platform describes the edge application with UnitedDeployment, and UnitedDeployment describes the node pool where the Deployment or StatefulSet resources are deployed and the number of replicas to be deployed of each node pool with the `topology` field, which can be expanded in the future to include more fields for site-level configuration. An example of the `topology` field is as follows:

```
topology:
    pools:
    - name: beijing
      nodeSelectorTerm:
        matchExpressions:
        - key: apps.openyurt.io/nodepool
          operator: In
          values:
          - beijing
      replicas: 1
    - name: hangzhou
      nodeSelectorTerm:
        matchExpressions:
        - key: apps.openyurt.io/nodepool
          operator: In
          values:
          - hangzhou
      replicas: 2
      tolerations:
      - effect: NoSchedule
        key: apps.openyurt.io/example
        operator: Exists
```

The platform encapsulates UnitedDeployment at the bottom layer, which is used for edge application distribution and solves the dependency problem among multiple edge applications. It monitors edge applications and collect logs through resource monitoring and log components, and accesses the container console based on the WebSocket tunnel to achieve efficient O&M management of edge applications.

## Configuration Set

Unitized deployment solves the problem of how to distribute the same application to multiple regions. Ideally, applications should be the same across all regions, but in reality there are often differences, such as the configuration of store names, store logos, and even the payment channels docked in certain scenarios.

To this end, the platform adopts unitized deployment with a template describing the configuration and release scope of edge applications, and designs configuration set resources to distribute different configurations as environment variables to different regions.

```
apiVersion: v1
kind: UnitConfigMap
metadata:
  name: ud-test
  namespace: default
data:
  common:
    CLUSTER_DNS: 10.96.0.3
    DICE_CLUSTER_NAME: terminus-dev
    DICE_CLUSTER_TYPE: kubernetes
  hangzhou:
    NAME: hangzhou-shop
  beijng:
    NAME: beijing-mall
```
