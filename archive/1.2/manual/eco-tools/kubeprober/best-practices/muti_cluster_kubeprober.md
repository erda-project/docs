# 多集群使用Kubeprober

Kubeprober 天然支持多集群管理，也是 Kubeprober 的优势所在。本文介绍如何在多集群场景下使用 Kubeprober。  
Kubeprober 采用 Master / Agent 架构，选在一个集群部署 probe-master， 其他所有集群只部署 agent 组件。
## master端的安装
master 端只有一个 probe-master 的组件，其依赖与 Kubernetes 的 Webhook做一个资源的前置校验工作，我们使用 cert-manager 服务来进行 webhook 证书的自动签发，所以需要先部署一下 cert-manager 服务，等 cert-manager 的 pod 全部启动成功后再进行后续组件的安装。
```shell script
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.3.1/cert-manager.yaml
```
### 关于Secret-key  
probe-master 跟 probe-tunnel(agent端中的一个组件)交互使用Secret-key来进行认证，用户可以在 probe-master 配置 Secret-key 来作为集群接入的统一凭证，被管理集群的 probe-tunnel 组件也配置相应的 Secret-key 来跟probe-master 交互。  
### 配置 probe-master 的 Secret-key  
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
### 部署master组件
```
APP=probe-master make deploy
```
## agent端的安装
agent 端包含 probe-agent 跟 probe-tunnel 组件，probe-tunnel 使用 websocket 跟 probe-master 建立连接，提供 probe-master 到被管理集群的控制通道，probe-agent 管理诊断项的声生命周期，创建，执行，删除等。  
由于 Kubernetes 本身没有集群名的概念，因此我们在 agent 端加入了集群名的概念，结合 master 端介绍的 Secret-key，因此在 agent 端需要配置 master地址， 集群名，Secret-key这三个配置。
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
### 部署 agent 组件
```shell script
APP=probe-agent make deploy
```
### 检查集群信息是否上报
probe-agent 跟 probe-tunnel 启动成功后，会将集群信息上报给 probe-master， probe-master会创建出对应的集群资源，可以用如下命令来进行查看。
```
kubectl get cluster
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/d1582829-7221-43ff-b61e-ae590e420743.png
)
## 执行诊断
Kubeprober 采用中心管理的方式对诊断项进行管理，使用给 cluster 打上 probe label 方式来将诊断项关联到某一个集群中。
### 创建 probe
在 probe-master 所在的集群来创建 probe 资源（在default的namespace下）。  
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
上述 probe 指定了运行策略，即每隔 30 分钟运行一次 k8s 的诊断。
```shell script
kubectl apply -f probe.yaml
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/60e0f3d7-c5d2-44bb-a2a0-b37d5a4c5392.png)
### probe 关联集群
通过 kuebctl label 来关联 probe 跟 cluster，比如将 k8s 的 probe 关联给了 erda-cloud 集群。
```shell script
kubectl label cluster erda-cloud probe/k8s=true
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/68329903-551f-415a-a03b-59b02e757b1f.png)
### 查看诊断结果
可以使用 kubectl probe 指令来查看特定集群的诊断结果。  
创建 kubectl probe 所需要的配置文件，没有该文件则 kubectl probe 会自动将 ws://probe-master.kubeprober.svc.cluster.local:8088/clusterdialer 作为 master 的 地址，其他情况可以自行修改该配置文件。 

```shell script
vi ~/.kubeprober/config

{
    "masterAddr": "ws://probe-master.kubeprober.svc.cluster.local:8088/clusterdialer"
}
```
查看诊断结果
使用 kubectl probe status 可以查看特定集群的当前诊断结果的状态， 由于诊断项是定时在运行的，因此该命令查到的就是最新一次的诊断结果。
```shell script
kubectl probe status -c erda-cloud
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/5c961a06-aa17-42e4-bcc8-a8156862f760.png)
### 执行一次性诊断
除了定时诊断的场景， Kubeprober 也支持一次性诊断，常用来在系统做了变更之后想要查看系统各个方面是否正常使用，默认会诊断当前集群 attach 了的probe，同时也可用指定 probe 进行诊断。
```shell script
kubectl probe once -c erda-cloud                    #诊断已经 attatch 了的 probe
kubectl probe once -c erda-cloud -p k8s,host     #诊断特定 probe
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/6b939fc7-d9ea-4943-9728-a06d3fc7c04f.png)
一次性诊断的历史记录会被保存起来，可以使用如下命令来进行查看历史记录。
```
kubectl probe oncestatus -c erda-cloud -l
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/02/f85c396f-e8a7-479d-9279-3403e73e5d98.png)
查看历史某一次一次性诊断的诊断结果。
```
kubectl probe oncestatus -c erda-cloud -i 1630566675
```