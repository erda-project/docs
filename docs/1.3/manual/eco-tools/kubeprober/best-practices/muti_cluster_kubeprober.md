# 多集群使用 Kubeprober

Kubeprober 支持多集群管理，采用 Master/Agent 架构，选择一个集群部署 probe-master， 其余集群部署 Agent 组件。

## 安装 Master
Master 端仅有一个 probe-master 组件，其依赖于 Kubernetes 的 Webhook 进行资源的前置校验工作。使用 cert-manager 服务进行 Webhook 证书的自动签发前，需先部署 cert-manager 服务，待 cert-manager 的 Pod 全部成功启动后再安装后续组件。

```shell script
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.3.1/cert-manager.yaml
```
### 配置 probe-master 的 Secret-key  

probe-master 与 probe-tunnel（Agent 端组件）的交互通过 Secret-key 进行认证。您可在 probe-master 配置 Secret-key 作为集群接入的统一凭证，为 probe-tunnel 组件同样配置相应的 Secret-key 与 probe-master 交互。  

probe-master 的 Secret-key 配置如下：

```shell script
vim deployment/probe-master.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: probe-master
spec:
  template:
    spec:
      containers:
        - command:
            - /probe-master
          env:
            - name: SERVER_SECRET_KEY
              value: your-token-here
```
### 部署 Master 组件
```
APP=probe-master make deploy
```
## 安装 Agent
Agent 端包含 probe-agent 与 probe-tunnel 组件，probe-tunnel 通过 Websocket 与 probe-master 建立连接，提供从 probe-master 到被管理集群的控制通道，即 probe-agent 管理诊断项的生命周期，包括创建、执行、删除等。 

由于 Kubernetes 本身没有集群名的概念，因此 Agent 端中加入该项，结合上文提及的 Secret-key，需在 Agent 端配置 Master 地址、 集群名、Secret-key 等内容。

```shell script
vim deployment/probe-agent.yaml

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: probeagent
  namespace: system
data:
  probe-conf.yaml: |
    probe_master_addr: http://probe-master.kubeprober.svc.cluster.local:8088
    cluster_name: erda-cloud
    secret_key: your-token-here
```
### 部署 Agent 组件
```shell script
APP=probe-agent make deploy
```
### 检查集群信息
probe-agent 与 probe-tunnel 成功启动后，会将集群信息上报至 probe-master，由 probe-master 创建对应的集群资源，可通过如下命令查看：

```
kubectl get cluster
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/904cbeb8-21fb-42bf-8857-594c3630d60b.png)
## 执行诊断
Kubeprober 对诊断项采用中心管理的方式，通过为 Cluster 添加 probe label 将诊断项关联至某一个集群中。

### 创建 Probe
在 probe-master 所在的集群创建 Probe 资源（位于 Default 的 Namespace 下）。  

```yaml
apiVersion: kubeprober.erda.cloud/v1
kind: Probe
metadata:
  name: k8s
spec:
  policy:
    # unit: minute
    runInterval: 30
  template:
    containers:
      - env:
          - name: NODE_NAME
            valueFrom:
              fieldRef:
                fieldPath: spec.nodeName
        name: k8s
        image: kubeprober/probe-k8s:v0.1.5
        resources:
          requests:
            cpu: 10m
            memory: 50Mi
    restartPolicy: Never
  configs:
    - name: control-plane
      env:
        - name: PRIVATE_DOMAIN
          value: "kubernetes.default"
        - name: DNS_CHECK_NAMESPACE
          value: "kube-system"
        - name: DNS_NODE_SELECTOR
          value: "k8s-app=kube-dns"
        - name: PUBLIC_DOMAIN
          value: "www.baidu.com"
```
上述 Probe 已指定运行策略，即每隔 30 分钟运行一次 K8s 诊断。

```shell script
kubectl apply -f probe.yaml
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/2ac2c3fb-d011-48c8-aee4-7321f763f297.png)
### 关联集群
通过 kuebctl label 关联 Probe 和 Cluster，例如将 K8s 的 Probe 关联至 erda-cloud 集群。

```shell script
kubectl label cluster erda-cloud probe/k8s=true
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/88a99136-7abc-4afa-b3af-afd0a45def54.png)
### 查看诊断结果
通过 kubectl probe 指令查看特定集群的诊断结果。  

创建 kubectl probe 所需配置文件，若无则 kubectl probe 自动将 ws://probe-master.kubeprober.svc.cluster.local:8088/clusterdialer 作为 Master 地址，其他情况下可自行修改该配置文件。 

```shell script
vi ~/.kubeprober/config

{
    "masterAddr": "ws://probe-master.kubeprober.svc.cluster.local:8088/clusterdialer"
}
```
通过 kubectl probe status 可查看特定集群当前诊断结果的状态。由于诊断项为定时运行，因此通过该命令查询到的即最新诊断结果。
```shell script
kubectl probe status -c erda-cloud
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/0cf51503-2b49-4ac7-b8c4-fa742fe85546.png)
### 执行一次性诊断
除定时诊断外， Kubeprober 同样支持一次性诊断，常用于在系统变更后查看系统各功能是否可正常使用，默认诊断当前集群关联的 Probe，也可指定 Probe 进行诊断。

```shell script
kubectl probe once -c erda-cloud                    #诊断已经 attatch 了的 probe
kubectl probe once -c erda-cloud -p k8s,host     #诊断特定 probe
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/51d83f8f-cc53-466d-a6ca-444a8ac63b7d.png)
一次性诊断的历史记录将保存下来，可通过如下命令查看：

```
kubectl probe oncestatus -c erda-cloud -l
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/d59be731-0830-4029-96e2-4efc045467fd.png)
通过如下命令可查看历史某一次一次性诊断的诊断结果：

```
kubectl probe oncestatus -c erda-cloud -i 1630566675
```