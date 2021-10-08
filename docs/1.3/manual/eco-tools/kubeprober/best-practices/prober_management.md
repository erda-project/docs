# Prober 管理
Prober 是一个诊断项（Checker）集合，通常将一组或某一场景下的诊断项编排至一个 Prober 镜像中，随后根据用户定义的执行策略，单次或周期性执行诊断探测任务。

当前 Kubeprober 支持通过 Golang、Shell 编写 Prober，其位于目录 [probers](https://github.com/erda-project/kubeprober/tree/master/probers) 下。


## 已有的 Prober
Kubeprober 已有的 Prober 列表如下：
```
probers/
    # prober 示例
    demo-exampe
    # node 层探测集
    node
    # k8s 层探测集
    k8s
    # addon 层探测集
    addon
```
您可直接使用已有的探测集，或根据需要修改、编写 [自定义Prober](./custom_prober.md)。

## 单集群 Prober 管理
单集群情况下，仅需在 prober-agent 所在 Namespace 下创建 Prober，即可由 prober-agent 调协，生成具体的探测 Pod，执行探测任务并上报探测结果。

此处，最小化安装使用 prober-agent 即可，具体请参见 [单集群使用 Kubeprober](./standalone_kubeprober.md)。Prober 的使用方法请参见 [编写第一个 Prober](../guides/first_prober.md)。

## 多集群 Prober 管理
多集群情况下，需在中心集群部署 prober-master，受纳管集群需安装 prober-agent 实现集群上报注册，由此实现 [多集群使用 Kubeprober](muti_cluster_kubeprober.md)。Prober 的管理方式如下：

```cassandraql
[root@node-0001 ~]# kubectl get cluster
NAME             VERSION            NODECOUNT   PROBENAMESPACE   PROBE     TOTAL/ERROR   HEARTBEATTIME         AGE
cluster1         v1.13.5            32          kubeprober       []        0/0           2021-09-01 17:59:23   17d
cluster2         v1.16.4            6           kubeprober       []        0/0           2021-09-01 17:59:08   17d
```
* `PROBE` 表示下发至该集群的诊断集。
* `TOTAL/ERROR` 表示总诊断项/失败的诊断项数目。

### Prober 模版
中心集群在 Defalut Namespace 中生成 Prober 模版，由于 prober-agent 仅监听其所在 Namespace（非  Default）的 Prober，因此生成的模版 Prober 将不受调协。

```cassandraql
# prober 模版
[root@node-0001 ~]# kubectl get probe
NAME    RUNINTERVAL   IMAGE                           AGE
addon   33            kubeprober/probe-addon:v0.0.7   6d1h
k8s     30            kubeprober/probe-k8s:v0.1.5     9d
node    30            kubeprober/probe-node:v0.1.0    8d
```

### Prober 下发
Kubeprober 通过标签实现 Prober 的下发，为纳管集群添加对应的 Prober 标签即可。

```cassandraql
# 给纳管的集群添加 prober 标签 probe/${PROBER_TEMPLATE_NAME}=true
[root@node-0001 ~]# kubectl label cluster cluster1 probe/k8s=true
[root@node-0001 ~]# kubectl label cluster cluster2 probe/k8s=true

# 集群查看下发到k8s prober 已下发到纳管的集群
[root@node-0001 ~]# kubectl get cluster
NAME             VERSION            NODECOUNT   PROBENAMESPACE   PROBE        TOTAL/ERROR   HEARTBEATTIME         AGE
cluster1         v1.13.5            32          kubeprober       [k8s]        57/3          2021-09-01 17:59:23   17d
cluster2         v1.16.4            6           kubeprober       [k8s]        56/2          2021-09-01 17:59:08   17d
```

### 诊断结果查看
通过 `kubectl probe status -c ${CLUSTER_NAME}` 可查看指定集群的详细诊断结果：
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



