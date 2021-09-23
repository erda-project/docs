# 安装部署

## 1. 基于 Docker Compose 部署后，首次注册账号并登录，跳转至错误页面怎么办？

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/2a174a79-4831-477e-b36f-65e606967ad5.png)

该页面地址为 `sysAdmin/orgs`，即超级管理员管理页，该模块暂时还未包含在开源包内（我们将在近期开放该模块）。Erda 首次注册到账号会默认成为超级管理员，因此会自动尝试跳转到该页面。

您可以退出首次注册的账号，然后再次注册一个新账号，使用新的账号登录后将会跳转到个人仪表盘页面，如下图所示，您可以从点击页面左上方的 **创建组织** 开始体验 Erda。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/ab68de5a-d013-40d0-9336-a9364da3525e.png)


## 2. 基于 Docker Compose 部署后，在 CenOS 环境下执行安装脚本时报错 `invalid IP address in add-host: "host-gateway"`。

`host-gateway` 特性要求 Docker 版本在 20.10.0 及以上。

请升级 Docker，执行命令 `sudo yum install docker-ce docker-ce-cli containerd.io`

## 3. 安装 Erda 时初始化任务失败该如何处理？

1. 请您首先确认 `erda-init-image` 日志，是否存在无法连接 MySQL 等情况，如果存在，请排查集群到 MySQL 网络是否可达。
2. 初始化任务中如果出现 `Table xxx already exists` 错误，可能是由于您在 Erda 安装过程中出现过初始化任务中断的行为， 请检查数据库并清理残留数据，重新进行安装。

## 4. 基于 Helm 部署 Erda，每个节点挂载 NFS 是否是强制的？

若您希望将 Kubernetes 节点用于执行流水线任务，则节点挂载 NFS 是强制的，具体请参见 [准备工作](../install/helm-install/premise.md#准备工作)。

您可以通过 [标签设置](../cmp/guide/cluster/cluster-node-labels.md) 控制 Erda 的节点调度。

## 5. 完成 Erda 安装后，集群总览中未显示已添加的集群该如何处理？

:::tip 提示
此处已添加的集群是指导入 Erda 所在的 Kubernetes 集群。
:::

正常情况下，导入集群后 3 分钟左右即可在 **集群总览** 页面查看机器的数据列表，若数据为空，可从以下两个方面依次排查:

1. 进入 **管理中心 > 组织设置 > 组织信息** 查看组织标识, 例如此处的标识为 `erda`。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/27/53f03992-8eee-4f2c-a3b0-0a23df3cb22c.png)

   随后在 Kubernetes 节点中确认 `dice/org-<企业标识>=true` 标签是否正确。

   ```shell
   kubectl get no --show-labels | grep org
   ```

4. 确认标签存在后，请进入 **多云管理 > 资源管理 > 集群管理**，确认导入的 **集群标识** 是否与 Erda 安装时指定的 `erda.clusterName` 一致。若不一致，您需要下线该集群，并重新添加。
5. 经前两步排查，若仍无数据显示，请排查 `erda-telegraf` 组件日志。

## 6. 访问 Erda 会强制跳转 HTTPS 该如何处理？

Erda 默认配置的是 HTTP，如果开启 HTTPS 请参考 [Erda 如何配置 HTTPS](install.md#erda-如何配置-https)。

以社区 `ingress-nginx` 为例，默认情况下会强制跳转 HTTPS，您可以修改 `ingress-nginx` 配置来禁用：

```shell
kubectl edit cm ingress-nginx-controller -n <ingress-namespace>
```

::: tip 提示

不同版本的 ingress-nginx 配置文件存在差异，请根据您的 ingress-nginx 版本确认 `Configmap Name`

:::

```yaml
data:
  ssl-redirect: "false"
```

## 7. Erda 如何配置 HTTPS？

Erda 可以安装时配置 `erda.clusterConfig.protocol` 来开启 `https`，详细配置请参考 [高可用部署可配置参数](../install/helm-install/high-availability.md#高可用部署可配置参数)。
安装完成后，您可以根据部署场景配置证书。

## 8. Erda 安装完成访问 404 该如何处理？

1. 请先确认是否按照 [安装要求](../install/helm-install/premise.md#安装要求) 部署 `Ingress Controller`, 以 `Ingress-Nginx` 为例。
2. 查看 `Ingress-Controller` 日志，报错提示如下:
```shell
"ingress does not contain a valid IngressClass"
```
3. 当前版本 Erda 并不关心 IngressClass 配置，您可以更改 `Ingress-Nginx` 配置，启动参数增加 `--watch-ingress-without-class=true`。

## 9. 安装 Erda 时 Registry 调度失败该如何处理？

请您优先确认 Registry 安装配置是否正确，Registry 在 Erda 安装配置中可以通 `registry.custom.nodeIP`、`registry.custom.nodeName` 参数来控制是否启用 `host` 模式。 `nodeIP` 是您指定的 Kubernetes 节点 IP， `nodeName` 是您指定的 Kubernetes 节点名称，两者要为同一节点的信息。

## 10. 导入集群后，创建项目时可分配资源为 0 该如何处理？

Erda 通过节点标签来采集调度节点的可用资源，标签未正确设置, 会导致项目可用资源为 0，您可以通过如下步骤进行排查：

1. 请您先确认导入的集群是否在集群总览中显示，如果未显示请参考 [集群总览中未显示已添加的集群该如何处理](install.md#完成-erda-安装后-集群总览中未显示已添加的集群该如何处理) 。
2. 为了保证应用的正常构建发布，环境标签 (`workspace-*`)、`stateless-service`、`pack-job` 是必需的。其余标签您可以参考 [节点标签](../cmp/guide/cluster/cluster-node-labels.md) 按需设置。
   标签可以通过 **多云管理平台 > 集群总览 > 设置标签** 来进行设置或查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/03/1edc80d0-4dec-4da2-ab5d-0bb6985f1cb1.png)

## 11. 构建流水线打包时推送镜像失败该如何处理？

#### 报错提示 server gave HTTP response to HTTPS client

Erda 部署的 Registry 需要您对 Docker 进行一些设置，请参考 [准备工作](../install/helm-install/premise.md#准备工作)。

#### 报错提示找不到 Registry 地址

您需要确认 Erda 的安装配置，是否指定了 `registry.custom.nodeIP` 以及 `registry.custom.nodeName` 参数。

- 如果未指定，您需要确保您在 Kubernetes 节点可以通过内部域名(比如 kubernetes.default.svc.cluster.local)的方式访问 Registry。
- 如果已指定，请确认流水线构建节点到 registry 节点网络是否可达。

详细配置请参考 [开始安装](../install/helm-install/helm-install-demo.md#开始安装)


## 12. Erda 导入已创建的 Erda Kubernetes 集群，该集群也需要安装 Erda 吗？

不需要，只需待导入的 Kubernetes 集群满足 [安装要求](../install/helm-install/premise.md#安装要求) 即可，集群导入后 Erda 将自动对目标集群初始化，安装 Erda 组件及依赖。

:::tip 提示
当前版本导入的集群若需要使用流水线功能，您需要按照 [准备工作](../install/helm-install/premise.md#准备工作) 对目标集群进行一些简单的设置，并且确保该集群节点可对 Kubernetes Service 进行 DNS 解析。
:::

## 13. 阿里云 ACK 部署 Erda 需要满足什么要求？

Erda 支持使用阿里云 ACK 专有版及托管版部署。 使用托管版时，在任一可以使用 `kubectl` 的 Work 节点按照文档部署 Erda 即可，无需关注 Master 节点。

## 14. 部署时如何配置 SMTP 邮件服务器？

在 CRD erda 中 eventbox 组件里面配置如下环境变量：

```shell
DICE_EMAIL_SMTP_DISPLAY_USER
DICE_EMAIL_SMTP_HOST
DICE_EMAIL_SMTP_PASSWORD
DICE_EMAIL_SMTP_PORT
DICE_EMAIL_SMTP_USERNAME
```

## 15. Kubernetes 1.16，Helm 安装提示 must include at least one of v1beta1 该如何处理？

如果您的 Kubernetes 集群为 1.16 版本，使用 Helm 安装时提示如下错误：

```shell
Error: ValidatingWebhookConfiguration.admissionregistration.k8s.io "elastic-webhook.k8s.elastic.co" is invalid: webhooks[0].admissionReviewVersions: Invalid value: []string{"v1"}: must include at least one of v1beta1
```

请参考 [链接](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) 并开启 Kubernetes admissionregistration 对应版本的 API。

## 16. 开源版本是否只支持 Kubernetes 1.16 - 1.20、Centos 7.4+？

以上版本已经过验证，其他环境暂未覆盖。后续将陆续覆盖其他常见环境，敬请期待。

## 17. Erda 是否支持纳管 Openshift、Rancher 等集群？

当前 Erda 暂未对 Openshift、Rancher 等 Kubernetes 发行版进行适配测试，后续计划对常见的 Kubernetes 发行版及云厂商基于
Kubernetes 的容器编排服务进行适配，敬请期待。

如果您已在以上环境中进行过验证，[欢迎参与到 Erda 的贡献中](https://github.com/erda-project/erda/blob/master/CONTRIBUTING.md)。

## 18. 安装 Erda 失败，如何执行重新安装？

您可以参考 [卸载 Erda](../install/helm-install/uninstall.md) 对残留数据进行清理，清理完成后重新执行安装操作。

## 19. 用 docker-compose 启动 Erda，组件容器报错 `dial tcp x.x.x.x:3306: connect: connection refused` 该如何处理？

`3306` 为 MySQL 端口，平台组件报这个错表示无法连接到 MySQL。

需要先确认 MySQL 容器是否运行正常：
- 如果 MySQL 运行不正常，请通过 MySQL 容器日志排查数据库失败原因；
- 如果 MySQL 运行正常，需要找到对应的组件，尝试 `docker rm ${container-id}` 后使用 `docker-compose up -d` 重新拉起该组件。
  - 目前出现该问题的用户使用的都是 Windows 平台，因此我们怀疑是 docker compose 在 Windows 平台下 depends-on 有问题，具体问题仍在排查中。
