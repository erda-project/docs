# kubernets安全加固

Erda 底层基于Kubernetes，Kubernetes提供了许多可以极大地提高应用程序安全性的选项，配置它们要求您熟悉Kubernetes以及其部署的安全要求。本文具体介绍了Kubernetes服务的安全加固方案，帮助您部署安全的Kubernetes应用。

## 限制对Kubernetes节点的直接访问
应该限制SSH登录或SSH Key免登录Kubernetes节点，减少对主机资源未授权的访问。应该要求用户使用kubectl exec命令，此命令能够在不访问主机的情况下直接访问容器环境。Erda 提供了节点控制台功能可以实现白屏化对节点的操作。

## 关闭非安全端口
Erda 内部对Kubernetes的访问均使用安全端口以及Service Account，同时做了如下的加固措施：
* 默认端口6443，修改标识—secure-port
* 默认IP是首个非本地主机的网络接口，修改标识—bind-address HTTPS服务
* 置证书和密钥的标识，–tls-cert-file，–tls-private-key-file
* 基于安全考虑，会移除只读端口，使用Service Account代替

## 将安全环境应用到您的Pods和容器中
当设计您的容器和pods时，确保为您的pods、容器和存储卷配置安全环境。安全环境是定义在yaml文件中的一项属性。它控制分配给pod/容器/存储卷的安全参数。一些重要的参数有：

|  安全环境设置项   | 描述  |
|  ----  | ----  |
| SecurityContext > runAsNonRoot  | 容器应该以非root用户运行 |
| SecurityContext > Capabilities  | 控制分配给容器的Linux能力 |
| SecurityContext > readOnlyRootFilesystem | 控制容器对root文件系统是否只读 |
| PodSecurityContext > runAsNonRoot | 防止root用户作为pod的一部分运行容器 |
以下是一个具有安全环境参数的pod定义示例：
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello-world
spec:
  containers:
  # specification of the pod’s containers
  # ...
  securityContext:
    readOnlyRootFilesystem: true
    runAsNonRoot: true
```

## 确保镜像没有安全漏洞

在运维过程中，要不断执行持续安全漏洞扫描（Continuous Security Vulnerability Scanning），因为容器中可能存在包含已知漏洞（CVE）的过时包。新的漏洞每天都会出现，所以这不是一个一次性的工作，对镜像进行持续的安全评估是至关重要的。

定期对环境进行安全更新，一旦发现运行中容器的漏洞，您应该及时更新镜像并重新部署容器。尽量避免直接更新（例如，apt-update）到正在运行的容器，因为这样打破了镜像与容器的对应关系。

使用Kubernetes滚动升级功能可以方便地升级容器（ Erda 支持应用的蓝绿升级），该功能允许将镜像升级到最新版本来逐步更新正在运行的容器。

## 日志记录

Kubernetes 提供基于集群的日志，允许将容器活动日志记录到一个日志中心。当集群被创建时，每个容器的标准输出和标准错误都可以通过运行在每个节点上的 filebeat 组件记录到 Cassandra 或 Elasticsearch 中，然后可以在 Erda 界面上进行白屏化查看。

