# Prober Management
Prober is a collection of diagnosed items (also checker), that puts diagnosed items of a group or a scenario into a prober image and runs diagnosis tasks once or periodically according to the defined running strategy.

Currently Kubeprober supports writing prober in Golang and Shell, which is located in the directory of [probers](https://github.com/erda-project/kubeprober/tree/master/probers).


## Existing Probers
The existing probers of Kubeprober are as follows:
```
probers/
    # Prober sample
    demo-exampe
    # node probe set
    node
    # k8s probe set
    k8s
    # addon probe set
    addon
```
You can use the existing probers directly, or modify and write a [Custom Prober](custom_prober.md) as needed.

## Single Cluster
For a single cluster, create a prober under the namespace where the prober-agent is located then it can be tuned by the prober-agent to generate a detection pod, run tasks and report results.

Just install the prober-agent in the minimal mode. For details, see [Kubeprober for a Single Cluster](standalone_kubeprober.md). For more information on how to use prober, see [The First Prober](../guides/first_prober.md).

## Multiple Clusters
For multiple clusters, deploy the prober-master in the central cluster and install the prober-agent in the managed cluster to achieve [Kubeprober for Multiple Clusters](muti_cluster_kubeprober.md). Manage probers as follows:

```cassandraql
[root@node-0001 ~]# kubectl get cluster
NAME             VERSION            NODECOUNT   PROBENAMESPACE   PROBE     TOTAL/ERROR   HEARTBEATTIME         AGE
cluster1         v1.13.5            32          kubeprober       []        0/0           2021-09-01 17:59:23   17d
cluster2         v1.16.4            6           kubeprober       []        0/0           2021-09-01 17:59:08   17d
```
* `PROBE` represents the diagnostic set sent to the cluster.
* `TOTAL/ERROR` indicates the total number of diagnosed items/the number of failed ones.

### Prober Template
The prober template is generated in the default namespace of central cluster and cannot be tuned as the prober-agent only monitors probers of its namespace (not default).

```cassandraql
# prober template
[root@node-0001 ~]# kubectl get probe
NAME    RUNINTERVAL   IMAGE                           AGE
addon   33            kubeprober/probe-addon:v0.0.7   6d1h
k8s     30            kubeprober/probe-k8s:v0.1.5     9d
node    30            kubeprober/probe-node:v0.1.0    8d
```

### Send Prober
Kubeprober sends probers by labels, so just add the corresponding probe labels to the managed clusters.

```cassandraql
# Add prober tags to managed clusters probe/${PROBER_TEMPLATE_NAME}=true
[root@node-0001 ~]# kubectl label cluster cluster1 probe/k8s=true
[root@node-0001 ~]# kubectl label cluster cluster2 probe/k8s=true

# View the managed clusters in k8s prober
[root@node-0001 ~]# kubectl get cluster
NAME             VERSION            NODECOUNT   PROBENAMESPACE   PROBE        TOTAL/ERROR   HEARTBEATTIME         AGE
cluster1         v1.13.5            32          kubeprober       [k8s]        57/3          2021-09-01 17:59:23   17d
cluster2         v1.16.4            6           kubeprober       [k8s]        56/2          2021-09-01 17:59:08   17d
```

### View Diagnosis Results
View the diagnosis results of a specific cluster by `kubectl probe status -c ${CLUSTER_NAME}`:
```cassandraql
[root@node-0001 ~]# kubectl probe status -c cluster1
PROBER  CHECKER                                         STATUS  MESSAGE                                         LASTRUN
k8s     dns-resolution-check                            PASS                                                    2021-09-02 11:00:30
k8s     deployment-service-check                        PASS                                                    2021-09-02 11:01:03
k8s     k8s-componentsstatus                            PASS    -                                               2021-09-02 11:01:07
k8s     calico-node                                     ERROR   desiredNumberScheduled != numberReady           2021-09-02 11:01:07
k8s     coredns                                         PASS    -                                               2021-09-02 11:01:07
k8s     kube-proxy                                      ERROR   desiredNumberScheduled != numberReady           2021-09-02 11:01:07
k8s     nginx-ingress-controller                        PASS    -                                               2021-09-02 11:01:08
k8s     calico-kube-controllers                         PASS    -                                               2021-09-02 11:01:08
k8s     kubelet_version                                 PASS    -                                               2021-09-02 11:01:09
k8s     kubelet_server_version                          INFO    kubelet and server(apiserver, controller,       2021-09-02 11:01:09                                                                scheduler) version is different
k8s     k8s-nodeready                                   PASS    -                                               2021-09-02 11:01:09
k8s     k8s_node_label                                  PASS    -                                               2021-09-02 11:01:09
k8s     check_node_cordon                               ERROR   there exists node: node-010020010056            2021-09-02 11:01:09
                                                                node-010020010057 node-010020010058
                                                                SchedulingDisabled
k8s     pipeline_namespace_leak                         PASS    -                                               2021-09-02 11:01:09
...
```



