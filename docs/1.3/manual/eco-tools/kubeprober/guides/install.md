# 快速安装

Kubeprober 基于 Master/Agent 架构管理海量的 Kubernetes 集群诊断问题，通常选择一个集群部署 Master， 其余集群部署 Agent，Master 和 Agent 均作为 Controller 运行在 Kubernetes 中。安装前请确认您已部署 Kubernetes 集群，并且可通过 kubectl 访问。  
* 本文将以 Kind 为例，介绍如何安装 Kuberprober 及其简单的使用操作。  
* 生产环境的部署方式可参考本文操作。
* 部署前请克隆 [Kubeprober](https://github.com/erda-project/kubeprober) 的代码仓库或者下载 Release 包。

## 部署 Kind 集群
1. 准备一个包含 Ingress 的集群配置文件。

   ```yaml
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

2. 启动集群。

   ```shell script
    kind create cluster --name moon --config  cluster.yaml
   ```

3. 部署 Ingress。

   ```
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/v1.0.0-alpha.1/deploy/static/provider/kind/deploy.yaml
   ```

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
    cluster_name: moon
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
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/fcf236c5-e8f1-4c24-af49-64efacebe5a8.png)
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
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/cb1cc9e9-2cbe-41a1-bce0-92ada89de12c.png)
### 关联集群
通过 kuebctl label 关联 Probe 和 Cluster，例如将 K8s 的 Probe 关联至 Moon 集群。
```shell script
kubectl label cluster moon probe/k8s=true
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/23b9ac00-68c7-4cea-a9ab-b7321df7e98a.png)
### 查看诊断结果
通过 kubectl probe 指令查看特定集群的诊断结果。  

运行 kuebctl probe 指令需获取 probe-master 地址。由于本文以 Kind 为例进行部署，因此可创建一个 Ingress 将 probe-master 暴露出来。

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
配置本地 hosts。
```shell script
127.0.0.1  kubeprober.moon.cn
```
创建 kubectl probe 所需要的配置文件。
```shell script
vi ~/.kubeprober/config

{
    "masterAddr": "ws://kubeprober.moon.cn/clusterdialer"
}
```
查看诊断结果。
```shell script
kubectl probe status -c moon
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/76bd0f52-4346-4881-8d17-7dd3ab29b0e2.png)

