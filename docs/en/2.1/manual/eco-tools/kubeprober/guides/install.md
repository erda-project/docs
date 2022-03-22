# Quick Installation

Kubeprober manages massive diagnosed issues of Kubernetes clusters based on the master/agent architecture, takes one cluster for master deployment and others for agent, while both master and agent run as controller in Kubernetes. Before installation, please make sure that you have deployed a Kubernetes cluster and can access it by kubectl.
* This article takes Kind as an example to introduce how to install and use Kubeprober.
* For deployment in the production environment, also see this article.
* Before deployment, please clone the code repository of [Kubeprober](https://github.com/erda-project/kubeprober) or download the release package.

## Deploy Kind Cluster
1. Prepare a cluster configuration file containing Ingress.

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

2. Start the cluster.

   ```shell script
    kind create cluster --name moon --config  cluster.yaml
   ```

3. Deploy Ingress.

   ```
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/v1.0.0-alpha.1/deploy/static/provider/kind/deploy.yaml
   ```

## Install on Master
The master has only one probe-master component, which relies on the Kubernetes webhook for resource pre-checking. Deploy cert-manager service first and run it for auto issue of webhook certificates, then install other components after all pods of cert-manager are successfully started.
```shell script
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.3.1/cert-manager.yaml
```
### Configure Secret-Key for probe-master
The interaction between probe-master and probe-tunnel (an agent component) is authenticated by secret-key. You can configure the secret-key for probe-master as a unified credential, and also for probe-tunnel component to interact with probe-master.

The secret-key configuration of probe-master is as follows:

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
### Deploy Master Component
```
APP=probe-master make deploy
```
## Install on Agent
The agent has probe-agent and probe-tunnel components. probe-tunnel connects to probe-master by WebSocket and provides a control channel from probe-master to the managed cluster, that is, the lifecycle of probe-agent diagnosed items, including creation, execution, deletion, etc.

There is no such concept of cluster name in Kubernetes, which is added to the agent. Then you need to configure the master address, cluster name and secret-key on agent.

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
### Deploy Agent Component
```shell script
APP=probe-agent make deploy
```
### Check Cluster Information
After probe-agent and probe-tunnel are successfully started, the cluster information will be reported to probe-master, which will create clusters correspondingly and can be viewed by the following command:
```
kubectl get cluster
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/fcf236c5-e8f1-4c24-af49-64efacebe5a8.png)
## Run Diagnostics
Kubeprober manages diagnosed items in centralized way, and associates them to a certain cluster by adding a probe label to the cluster.
### Create Probe
Create a probe resource (located under the namespace of default) in the cluster where the probe-master is located.
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
The above probe has specified a running strategy, that is to run a K8s diagnosis every 30 minutes.
```shell script
kubectl apply -f probe.yaml
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/cb1cc9e9-2cbe-41a1-bce0-92ada89de12c.png)
### Associate Cluster
Associate probe and cluster by kubectl label, for example, associate probe of K8s to moon cluster.
```shell script
kubectl label cluster moon probe/k8s=true
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/23b9ac00-68c7-4cea-a9ab-b7321df7e98a.png)
### View Diagnosis Results
View the diagnosis results of a specific cluster by the kubectl probe command.

To run the kubectl probe command, you need to obtain the probe-master address first. Since this article takes Kind as an example for deployment, then you can create an Ingress to expose the probe-master.

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
Configure local hosts.
```shell script
127.0.0.1  kubeprober.moon.cn
```
Create the configuration file required for kubectl probe.
```shell script
vi ~/.kubeprober/config

{
    "masterAddr": "ws://kubeprober.moon.cn/clusterdialer"
}
```
View the diagnosis results.
```shell script
kubectl probe status -c moon
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/76bd0f52-4346-4881-8d17-7dd3ab29b0e2.png)

