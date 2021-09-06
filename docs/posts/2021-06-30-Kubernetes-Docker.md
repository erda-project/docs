---
title: 系列好文 ｜ Kubernetes 弃用 Docker，我们该何去何从？
author: 张攀（豫哲）
date: 2021-06-30
category: cmp
---


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/39c9b42f-3c39-40f8-b0ea-3695d8e6a769.png)

> **导读：Erda 作为一站式云原生 PaaS 平台，现已面向广大开发者完成 70w+ 核心代码全部开源！**在 Erda 开源的同时，我们计划编写《基于 K8s 的云原生 PaaS 平台基础架构》系列文章，希望我们的一点经验可以帮助更多企业完善 PaaS 平台基础架构的建设。本文为系列文的第一篇。

​<br />
## 缘起
> Kubernetes 在 1.20 版本之后将弃用 Docker 作为容器运行时：
> [https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.20.md#deprecation](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.20.md#deprecation)​

​

2020 年底，Kubernetes 官方发布公告，宣布自 v1.20 起放弃对 Docker 的支持，届时用户在 kubelet 启动日志中将收到 docker 弃用警告。这个大瓜的爆出，对还在使用 Kubernetes 的 docker开发者和工程师来说无疑是一项沉重的负担。那么 Kubernetes 弃用 docker ，对我们有哪些影响呢？别慌，这件事情，没有想象中的那么可怕。<br />​<br />
> If you’re rolling your own clusters, you will also need to make changes to avoid your clusters breaking. At v1.20, you will get a deprecation warning for Docker. When Docker runtime support is removed in a future release (currently planned for the 1.22 release in late 2021) of Kubernetes it will no longer be supported and you will need to switch to one of the other compliant container runtimes, like containerd or CRI-O. Just make sure that the runtime you choose supports the docker daemon configurations you currently use (e.g. logging).

​

这段话翻译过来大致是说，在 v1.20 的版本中，只会收到一个 docker 的弃用警告，在未来 v1.22 版本之前是不会删除的，这意味着到 2021 年底的 v1.23 版本，我们还有 1 年的 buffer 时间来寻找合适的 CRI 运行时来确保顺利的过渡，比如 containerd 和 CRI- O。<br />​<br />
## 缘灭
**为什么 Kubernetes 要放弃 docker ，改用其它 CRI 呢？**<br />​

我们知道，CRI 是 Kubernetes 在 v1.5 版本中引入的，充当 kubelet 和容器运行时之间的桥梁。简单概述：CRI 是以容器为中心的 API，设计的初衷是不希望向容器（比如 docker）暴露 pod 信息或 pod 的 api 接口，通过这种接口模式，Kubernetes 无须重新编译就可以使用更多的容器运行时。但是呢，Docker 与 CRI 不兼容，为了适配 Docker ，Kubernetes 就搞出来了 dockershim 这么个东东，将 CRI 转换成 Docker API，kubelet 使用 dockershim 和 docker 进行通信，docker 再和下面的 containerd 进行通信。这样就可以愉快地工作了。如下图所示：<br />
<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/fe75195d-4a52-40e4-95c9-b81e270bb0d3.png)<br />

- Dockershim 为了支持多种 OCI Runtime ，负责为每个启动的容器拉起一个新的 docker-shim 进程，指定容器 ID、Bundle 目录、运行时的二进制（runc），dockershim 允许 kubelet 与 docker 交互，就好像 docker 是一个 CRI 兼容的运行时一样。

​

本来大家相安无事，直到去年年底，这场平衡被 Kubernetes 公开打破了。Kubernetes 介绍说是因为维护 dockershim 已经成为 Kubernetes 维护者的沉重负担。dockershim 一直都是 Kubernetes 社区为了能让 docker 成为其支持的容器运行时，所维护的一个兼容程序。本次所谓的废弃，也仅仅是 Kubernetes 要放弃对现在 Kubernetes 代码仓库中的 dockershim 的维护支持。而 Docker 本身目前没有实现 CRI，因此是本次事件的问题所在。<br />​

简单了解过 Kubernetes 为什么要弃用 docker 以后，我们需要知道 docker 的弃用，对我们有哪些影响？又有哪些替代方案呢？<br />​<br />
> 1. If you are relying on the underlying docker socket (/var/run/docker.sock) as part of a workflow within your cluster today, moving to a different runtime will break your ability to use it.
> 1. Make sure no privileged Pods execute Docker commands.
> 1. Check that scripts and apps running on nodes outside of Kubernetes infrastructure do not execute Docker commands.
> 1. Third-party tools that perform above mentioned privileged operations.
> 1. Make sure there is no indirect dependencies on dockershim behavior.

​

对使用者来说，Kbernetes 的此举决定会影响依赖 docker.sock 的应用程序及事件流（比如 kubelet 的 container-runtime-endpoint 参数），影响执行 docker 命令和那些对 dockershim 组件的依赖。<br />​<br />
## 缘生
### 有哪些替代方案呢？
​<br />
#### 替代方案 1：Containerd
​

Containerd （[https://containerd.io](https://containerd.io/)）是 Docker 公司在 OCI 成立时，捐献给 CNCF，目前已经从 CNCF 毕业的开源项目。Containerd 是一个行业标准的容器运行时，强调简单性、健壮性和可移植性，旨在嵌入到更大的系统中，而不是由开发人员或最终用户直接使用。Kubernetes 通过 CRI 接口的形式将 Containerd 用作 Kubernetes 集群的容器运行时，如下图所示：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/d7875bc0-63df-4e26-9624-8a19981c3cae.png)<br />
<br />

- cri plugin 是 containerd 的原生插件，从 containerd v1.1 开始， CRI 插件内置在发布的 containerd 二进制文件中。

​

**containerd 部署**<br />**​**<br />
```
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# 设置必需的 sysctl 参数，这些参数在重新启动后仍然生效
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

# 应用 sysctl 参数而无需重新启动
sudo sysctl --system

# 使用 docker-ce yum 源
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装 containerd
sudo yum install -y containerd.io

# 配置 containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
修改配置文件，新增"SystemdCgroup = true"，使用systemd作为cgroup驱动程序
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  ...
  [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
    SystemdCgroup = true

# 重新启动 containerd
sudo systemctl restart containerd
```
​

使用 crictl 连接到 containerd ，验证 CRI 插件的使用：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/aa9ef731-7475-431b-98c9-b2d8f6941581.png)<br />​

查看 K8s 集群使用的 CRI 类型：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/f93a2174-2d5d-4ed5-8f7d-130ad7dc7581.png)<br />​

查看 kubelet 指定的 cri socket：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/04e56cc1-d612-4238-bbf1-34a180561fdb.png)<br />​

至此，我们已经实现了 containerd 替代 docker， Kubernetes 集群改用其它（containerd）runC 的实现。<br />​<br />
#### 替代方案 2：CRI-O
CRI-O（[https://cri-o.io](https://cri-o.io/)）是由红帽发起并开源的一款容器运行时，是面向 Kubernetes 的 OCI（Open Container Initiative）的容器运行时，是 Kubernetes 的 CRI 标准实现，并且允许 Kubernetes 间接使用 OCI 兼容的容器运行时，可以把 cri-o 看成 Kubernetes 使用 OCI 兼容的容器运行时的中间层，如下图所示：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/9105e8b4-574a-4585-97df-d53f4dc41072.png)<br />**​**

**CRI-O 部署**<br />**​**<br />
```
# 创建 .conf 文件以在启动时加载模块
cat <<EOF | sudo tee /etc/modules-load.d/crio.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# 配置 sysctl 参数，这些配置在重启之后仍然起作用
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

sudo sysctl --system

# 设置与 kubernetes 相匹配的 CRI- O 版本（本次环境验证使用了k8s 1.21.1版本）
VERSION=1.21
OS=CentOS_8

# 下载 yum 源，执行安装
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS/devel:kubic:libcontainers:stable.repo
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable:cri-o:$VERSION.repo https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable:cri-o:$VERSION/$OS/devel:kubic:libcontainers:stable:cri-o:$VERSION.repo
sudo yum install cri-o -y

# 启动 CRI-O
sudo systemctl daemon-reload
sudo systemctl start crio
sudo systemctl enable crio

# 更改 kubelet 参数,指定 cri-o 的socket 文件
cat /var/lib/kubelet/kubeadm-flags.env
KUBELET_KUBEADM_ARGS="--container-runtime=remote --container-runtime-endpoint=/run/crio/crio.sock --pod-infra-container-image=k8s.gcr.io/pause:3.4.1"

# 重启 kubelet
```
​

使用 crictl 连接到 cri-o ，验证 CRI 插件的使用：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/68d70b0a-ddfe-4c55-abc7-684eca129b93.png)<br />​

查看 K8s 集群使用的 CRI 类型及 kubelet 指定的 cri socket：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/7e2c250e-da4b-429c-b9c7-270e1b129726.png)<br />​

至此，我们已经实现了 CRI- O 替代 docker， Kubernetes 集群改用其它（cri-o）runC 的实现。<br />​

​<br />
#### 用在当下
对于当前正在运行的 K8s 集群，如何更改容器运行时呢？我们以 cri-o 为例：<br />​<br />

1. 版本适配性，选择对应的版本

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/441f3523-47cc-4a03-bcf4-15544db3bd45.png)<br />

2. 更改 registry 仓库及 pause image


<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/7da5c80d-bde9-41e4-b913-414a00bc7cfb.png)<br />

3. pod 迁移



```
# 为需要更改 CRI 的 node 节点添加污点，释放节点上的所有 pod ，并且不在接收新的 pod 请求
kubectl drain [node-name] --force --ignore-daemonsets --delete-local-data
# 停用 docker ，启用 cri-o，更改 kubelet --container-runtime-endpoint=/run/crio/crio.sock
# 查看 node 状态，确认无问题后，
kubectl get node
# 恢复 node 节点，接收新的 pod 请求
kubectl uncordon [node-name]
```
​

范例：<br />​

setp1：确定环境信息。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/f9715a60-a6df-4af2-b7ae-041e58887e8c.png)<br />​

setp2：使用 kubectl drain 从节点安全地逐出所有 Pod。<br />​<br />
```
# kubectl drain izj6cco138rpkaoqqn6ldnz --force --ignore-daemonsets --delete-local-data
node/izj6cco138rpkaoqqn6ldnz cordoned
WARNING: ignoring DaemonSet-managed Pods: calico-system/calico-node-7l4gc, kube-system/kube-proxy-kztbh
evicting pod default/kube-demo-7456947cdc-wmqb5
evicting pod default/kube-demo-7456947cdc-kfrqr
evicting pod calico-system/calico-typha-5f84f554ff-hzxbg
pod/calico-typha-5f84f554ff-hzxbg evicted
pod/kube-demo-7456947cdc-wmqb5 evicted
pod/kube-demo-7456947cdc-kfrqr evicted
node/izj6cco138rpkaoqqn6ldnz evicted
```
​

setp3：验证当前 Pod 状态。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/ebc1aa1c-25e7-48c0-9c3e-eff09e430b1e.png)<br />​

setp4：卸载 docker，安装 cri-o（过程略）。<br />​

setp5：修改 kubelet ，指定 container-runtime-endpoint。<br />​<br />
```
# vim /var/lib/kubelet/kubeadm-flags.env
KUBELET_KUBEADM_ARGS="--cgroup-driver=systemd --network-plugin=cni --pod-infra-container-image=k9s.gcr.io/pause:3.2 --resolv-conf=/run/systemd/resolve/resolv.conf --container-runtime=remote --container-runtime-endpoint=/run/crio/crio.sock"
```
​

setp6：恢复 node 节点，接收新的 pod 请求，验证。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/895560a2-1e7b-4741-b8e7-354e9e19f055.png)<br />​

setp7：<br />由于 master 节点不能 drain ，所以只能停止 kubelet，work 节点和 pods 会继续运行，但此时集群是托管状态。<br />​

更改 kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock。<br />​

更改 kubelet （同 setp5）。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/cec91f99-50d7-4068-8cab-3bb2ab1e92b3.png)<br />​

验证 master 节点。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/451315b1-a5ef-4f2f-85c4-8e027dfc481b.png)
## 参考资料


- 《Don't Panic: Kubernetes and Docker》：

[_https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/_](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/)<br />​<br />

- 《Dockershim Deprecation FAQ》：

[_https://kubernetes.io/blog/2020/12/02/dockershim-faq/_](https://kubernetes.io/blog/2020/12/02/dockershim-faq/)<br />​<br />

- 《Getting started with containerd》：

[_https://containerd.io/docs/getting-started/_](https://containerd.io/docs/getting-started/)<br />​<br />

- containerd GitHub 地址：

[_https://github.com/containerd/containerd_](https://github.com/containerd/containerd)<br />​<br />

- cri-o GitHub 地址：

[_https://github.com/cri-o/cri-o_](https://github.com/cri-o/cri-o)[

](https://github.com/cri-o/cri-o)
# 欢迎参与开源
Erda 作为开源的一站式云原生 PaaS 平台，具备 DevOps、微服务观测治理、多云管理以及快数据治理等平台级能力。**点击下方链接即可参与开源**，和众多开发者一起探讨、交流，共建开源社区。**欢迎大家关注、贡献代码和 Star！**<br />**​**<br />

- **Erda Github 地址：**[_https://github.com/erda-project/erda_](https://github.com/erda-project/erda)
- **Erda Cloud 官网：**[_https://www.erda.cloud/_](https://www.erda.cloud/)
