# 快速安装

kubeprober 是 master/agent 的架构，可以管理海量的 kubernetes 集群的诊断问题，一般会选择一个集群来部署 master， 其余的被管理的集群部署 agent，master跟agent均作为controller运行在kubernetes中，安装前确保您已经部署好了kubernetes集群，并且可以使用kubectl访问它。  
* 本文以 Kind 为例介绍如何安装 Kuberprober 以及简单的体验使用。  
* 生产环境的部署方式跟本文介绍的方式完全一致。
* 部署之前请 clone [kubeprober](https://github.com/erda-project/kubeprober) 的代码仓库或者下载release包。

## 部署Kind集群
准备一个包含 Ingress 的集群配置文件
``` yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  image: kindest/node:v1.18.15@sha256:5c1b980c4d0e0e8e7eb9f36f7df525d079a96169c8a8f20d8bd108c0d0889cc4
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:  
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
- role: worker
  image: kindest/node:v1.18.15@sha256:5c1b980c4d0e0e8e7eb9f36f7df525d079a96169c8a8f20d8bd108c0d0889cc4
- role: worker
  image: kindest/node:v1.18.15@sha256:5c1b980c4d0e0e8e7eb9f36f7df525d079a96169c8a8f20d8bd108c0d0889cc4
```
启动集群
```shell script
 kind create cluster --name moon --config  cluster.yaml
```
部署 ingress
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/v1.0.0-alpha.1/deploy/static/provider/kind/deploy.yaml

```

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
    cluster_name: moon
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
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/01/323608da-3e03-4d8b-afc4-6450a755775c.png
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
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/01/3dab7ffb-c23f-42ba-b5c4-a2630e75e6d7.png
)
### probe 关联集群
通过 kuebctl label 来关联 probe 跟 cluster，比如将 k8s 的 probe 关联给了 moon 集群。
```shell script
kubectl label cluster moon probe/k8s=true
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/01/65c1bb73-454a-4bbf-bc9e-24a6f2a43da8.png
)
### 查看诊断结果
可以使用 kubectl probe 指令来查看特定集群的诊断结果。  
kuebctl probe 指令的运行需要知道 probe-master 的地址，由于本案例是 Kind 部署的，因此可以创建一个 ingress 来将 probe-master 暴露出来。
```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: kubeprober
  namespace: kubeprober
spec:
  rules:
  - host: kubeprober.moon.cn
    http:
      paths:
      - backend:
          serviceName: probe-master
          servicePort: 8088
```
并且配置本地hosts
```shell script
127.0.0.1  kubeprober.moon.cn
```
创建 kubectl probe 所需要的配置文件
```shell script
vi ~/.kubeprober/config

{
    "masterAddr": "ws://kubeprober.moon.cn/clusterdialer"
}
```
查看诊断结果
```shell script
kubectl probe status -c moon
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/01/581ef1f2-2aef-493d-86b1-0f0e758e99d4.png)