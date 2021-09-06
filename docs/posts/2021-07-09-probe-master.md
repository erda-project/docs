---
title: 面对大规模 K8s 集群，这款诊断利器必须要“粉一波”！
author: 段超
date: 2021-07-09
category: cmp
---


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/18b4b4eb-7460-406c-9a06-d68089908c95.png)
# 背景
我们是一家做商业软件的公司，从一开始我们就把软件交付流程做的非常标准且简单，所有的软件都是基于我们的企业数字化平台 [Erda](https://www.erda.cloud/)（现已[开源](https://github.com/erda-project/erda)）来交付，底层基于 Kubernetes，为企业提供 DevOps、微服务治理、多云管理以及快数据管理等云厂商无绑定的 IT 服务。<br />​

随着我们服务的客户数量越来越多，如今我们管理着相当规模数量的 Kubernetes 集群，集群的稳定性决定了服务质量以及对外口碑，很长一段时间内我们在这件事情上都显得很被动，经常会出现 Erda 支持同学或者客户将问题反馈到我们说：有业务出现了问题，需要我们协助查询一下是不是平台导致的，然后我们上去一顿操作最后解决问题，答复客户。看似专业且厉害，急用户之所急，实则无章无法，一地鸡毛。<br />
<br />通常我们依赖监控系统来提前发现问题，但是监控数据作为一个正向链路，很难覆盖到所有场景，经常会有因为集群配置的不一致性或者一些更底层资源的异常，导致即使监控数据完全正常，但是整个系统依然会有一些功能不可用。对此，我们做了一套巡检系统，针对系统中一些薄弱点以及一致性做诊断，美中不足的是，这套系统的扩展性不是很好，对集群跟巡检项的管理也相对粗暴了一点。<br />​

最后，我们决定做一个更加云原生的诊断工具，使用 operator 来实现集群跟诊断项的管理，抽象出集群跟诊断项的资源概念，来解决大规模 Kubernetes 集群的诊断问题，通过在中心下发诊断项到其他集群，并统一收集其他集群的诊断结果，来实现任何时刻都可以从中心获取到其他所有集群的运行状态，做到对大规模 Kubernetes 集群的有效管理以及诊断。<br />​<br />
# Kubeprober
## 项目介绍
项目地址： [https://github.com/erda-project/kubeprober](https://github.com/erda-project/kubeprober)<br />​

KubeProber 是一个针对大规模 Kubernetes 集群设计的诊断工具，用于在 Kubernetes 集群中执行诊断项以证明集群的各项功能是否正常，KubeProber 有如下特点:<br />​<br />

- **支持大规模集群**：支持多集群管理，支持在管理端配置集群跟诊断项的关系以及统一查看所有集群的诊断结。
- **云原生**：核心逻辑采用 [operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) 来实现，提供完整的 Kubernetes API 兼容性。
- **可扩展**：支持用户自定义巡检项。

​

其核心架构如下：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/d4907b30-940d-4b6f-8491-20661f5d15f5.png)<br />​

区别于监控系统，kubeProber 从巡检的角度来证明集群的各项功能是否正常，监控作为正向链路，无法覆盖系统中的所有场景，系统中各个环境的监控数据都正常，也不能保证系统是 100% 可以用的，因此需要一个工具从反向来证明系统的可用性、从根本上做到先于用户发现集群中不可用的点，比如：<br />​<br />

- 集中的所有节点是否均可以被调度，有没有特殊的污点存在等。
- pod 是否可以正常的创建、销毁，验证从 Kubernetes，Kubelet 到 Docker 的整条链路。
- 创建一个 Service，并测试连通性，验证 kube-proxy 的链路是否正常。
- 解析一个内部或者外部的域名，验证 CoreDNS 是否正常工作。
- 访问一个 ingress 域名，验证集群中的 ingress 组件是否正常工作。
- 创建并删除一个 namespace，验证相关的 webhook 是否正常工作。
- 对 Etcd 执行 put/get/delete 等操作，用于验证 Etcd 是否正常运行。
- 通过 mysql-client 的操作来验证 MySQL 是否正常运行。
- 模拟用户对业务系统进行登录、操作，验证业务的主流程是否常常。
- 检查各个环境的证书是否过期。
- 云资源的到期检查。
- 更多...

​<br />
## 组件介绍
Kubeprober 整体采用 Operator 来实现核心逻辑，集群之间的管理使用 [remotedialer](https://github.com/rancher/remotedialer) 来维持被纳管集群跟管理集群之间的心跳链接，被纳管集群通过 RBAC 赋予 probe-agent 最小所需权限，并且通过心跳链接实时上报被纳管集群元信息，以及访问 apiserver 的 token，实现在管理集群可以对被管理集群的相关资源进行操作的功能。<br />​<br />
### probe-master
运行在管理集群上的 operator，这个 operator 维护两个 CRD，一个是 Cluster，用于管理被纳管的集群；另一个是 Probe，用于管理内置的以及用户自己编写的诊断项，probe-master 通过 watch 这两个 CRD，将最新的诊断配置推送到被纳管的集群，同时 probe-master 提供接口用于查看被纳管集群的诊断结果。<br />​<br />
### probe-agent
运行在被纳管集群上的 operator，这个 operator 维护两个 CRD，一个是跟 probe-master 完全一致的 Probe，probe-agent 按照 probe 的定义去执行该集群的诊断项，另一个是 ProbeStatus，用于记录每个 Probe 的诊断结果，用户可以在被纳管的集群中通过 kubectl get probestatus 来查看本集群的诊断结果。<br />​<br />
## 什么是 Probe
kubeprobe 中运行的诊断计划我们称之为 Probe，一个 Probe 为一个诊断项的集合，我们建议将统一场景下的诊断项作为一个 Probe 来运行，probe-agent 组件会 watch probe 资源，执行 Probe 中定义的诊断项，并且将结果写在 ProbeStatus 的资源中。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/ffb3b961-89cc-4317-8d59-3ca57571128b.png)<br />我们期望有一个输出可以清晰的看到当前集群的运行状态，因此，我们建议所有的 Probe 都尽可能属于应用、中间件、Kubernets、基础设置这四大场景，这样我们可以在展示状态的时候，自上而下清楚地查看究竟是系统中哪个层面引起的问题。<br />​

目前的 Probe 还比较少，我们还在继续完善，也希望跟大家一起共建。<br />​

[自定义 Probe](https://github.com/erda-project/kubeprober/blob/master/probers/README.md)<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/e6d3e369-258c-4545-959f-04a41357e3f3.png)<br />

# 对比其他诊断工具
目前社区已经有 Kuberhealthy 以及 kubeeye 来做 Kubernetes 集群诊断这件事情。<br />​

kuberheathy 提供一套比较清晰的框架可以让你轻松编写自己的诊断项，将诊断项 CRD 化，可以轻松地使用 Kubernetes 的方式来对单个 Kubernetes 进行体检。<br />​

kubeeye 同样是针对单个集群，主要通过调用 Kubernetes 的 event api 以及 Node-Problem-Detector 来检测集群控制平面以及各种节点问题，同时也支持自定义诊断项。<br />​

kubeprober 做的也是诊断 Kubernetes 集群这件事情，提供框架来编写自己的诊断项。除此之外，kubeprober 主要解决了大规模 Kubernetes 集群的诊断问题，通过中心化的思路，将集群跟诊断项抽象成 CRD，可以实现在中心 Kubernetes 集群管理其他 Kubernetes 诊断项配置、诊断结果收集，未来也会解决大规模 Kubernetes 集群的运维问题。<br />​<br />
# 如何使用
kubeprober 主要解决大规模 Kubernetes 集群的诊断问题，通常我们选择其中一个集群作为 master 集群，部署 probe-master，其他集群作为被纳管集群，部署 probe-agent。<br />​<br />
## 安装 probe-master
probe-master 使用了 webhook，webhook 的运行需要校验证书，需要先部署一下 cert-manager 的服务:<br />​<br />
```yaml
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.3.1/cert-manager.yaml
```
​

然后安装 probe-master：<br />​<br />
```yaml
APP=probe-master make deploy
```


## 安装 probe-agent
在逻辑上，一个 cluster 资源对应一个 probe-agent，在部署 probe-agent 之前，需要先创建一个 cluster 资源，probe-master 会给每一个 cluster 生成一个 secreykey，用于跟 probe-master 交互的唯一凭证。<br />​<br />
```
kubectl apply -f config/samples/kubeprobe_v1_cluster.yaml
kubectl get cluster -o wide  #可以获取到集群的secretkey
```
​

部署 probe-agent 前，需要先修改 probe-agent 的 configmap：<br />​<br />
```
vim config/manager-probe-agent/manager.yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: probeagent
  namespace: system
data:
  probe-conf.yaml: |
    probe_master_addr: http://kubeprober-probe-master.kubeprober.svc.cluster.local:8088
    cluster_name: moon
    secret_key: 2f5079a5-425c-4fb7-8518-562e1685c9b4
```
​

最后安装 probe-agent：<br />​<br />
```
APP=probe-agent make deploy
```
​

安装好 probeagent 后我们就可以在 master 集群中看到 cluster 信息。<br />
<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/cab3cb08-1a8e-4119-98de-96f150c00a57.png)<br />

## 配置 probe
有了 cluster，我们还需要在 master 集群中创建 probe 资源，比如：<br />​<br />
```
kubectl apply -f config/samples/kubeprobe_v1_cron_probe.yaml
```
​

使用 kubectl get probe 来查看 probe 列表，使用 kubectl label 来将一个 probe 跟 cluster 关联起来，则对用的 probe-agent 会在本集群内执行相关的诊断项。<br />​<br />
```
kubectl label cluster moon probe/probe-link-test1=true
kubectl label cluster moon probe/probe-cron-sample=true
```
​

最后，我们可以在被诊断的集群中使用 kubectl get probestatus 来查看诊断本集群的诊断结果。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/11ae1142-b530-48c8-bdaf-eb4feaca7ce6.png)
# 欢迎参与开源
​<br />
# 欢迎参与开源
当前 kubeprobe 已经发布了第一个版本 0.0.1，还有许多功能不太完善，probe-master 的管理能力还可以进一步的被放大挖掘，probe 的编写也需要更加的简单易用。我们希望跟社区一起共建，共同打造一个大规模 Kubernetes 集群的管理神器。**欢迎大家关注、贡献代码和 Star！**<br />**​**<br />

- **Erda Github 地址：**[_https://github.com/erda-project/erda_](https://github.com/erda-project/erda)
- **Erda Cloud 官网：**[_https://www.erda.cloud/_](https://www.erda.cloud/)
- **Contributing to KubeProber**：[https://github.com/erda-project/kubeprober/blob/master/CONTRIBUTING.md](https://github.com/erda-project/kubeprober/blob/master/CONTRIBUTING.md)

