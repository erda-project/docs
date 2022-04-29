# Kubeprober for Multiple Clusters

Kubeprober supports multi-cluster management and adopts the master/agent architecture with one cluster for probe-master deployment and others for agent.

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
    cluster_name: erda-cloud
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
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/904cbeb8-21fb-42bf-8857-594c3630d60b.png)
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
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/2ac2c3fb-d011-48c8-aee4-7321f763f297.png)
### Associate Cluster
Associate probe and cluster by kubectl label, for example, associate probe of K8s to erda-cloud cluster.

```shell script
kubectl label cluster erda-cloud probe/k8s=true
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/88a99136-7abc-4afa-b3af-afd0a45def54.png)
### View Diagnosis Results
View the diagnosis results of a specific cluster by the kubectl probe command.

Create the configuration file required for kubectl probe, otherwise kubectl probe will automatically take ws://probe-master.kubeprober.svc.cluster.local:8088/clusterdialer as the master address. In other cases, just modify the configuration file as needed.

```shell script
vi ~/.kubeprober/config

{
    "masterAddr": "ws://probe-master.kubeprober.svc.cluster.local:8088/clusterdialer"
}
```
View the diagnosis result status of a specific cluster by kubectl probe status. Since the diagnosis items run on a regular basis, it is the latest diagnosis results queried by this command.
```shell script
kubectl probe status -c erda-cloud
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/0cf51503-2b49-4ac7-b8c4-fa742fe85546.png)
### Run One-Time Diagnosis
In addition to timing diagnosis, Kubeprober also supports one-time diagnosis, to check whether the system functions are available after system change. It is for probe associated with the current cluster by default, and specified probe as well.

```shell script
kubectl probe once -c erda-cloud                    #diagnose attached probe
kubectl probe once -c erda-cloud -p k8s,host     #diagnose specified probe
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/51d83f8f-cc53-466d-a6ca-444a8ac63b7d.png)The historical records of one-time diagnosis will be saved and can be viewed by the following command:

```
kubectl probe oncestatus -c erda-cloud -l
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/08/d59be731-0830-4029-96e2-4efc045467fd.png)View the diagnosis result of a one-time diagnosis by the following command:

```
kubectl probe oncestatus -c erda-cloud -i 1630566675
```
