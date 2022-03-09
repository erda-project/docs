# 安装部署

## 1. 基于 Docker Compose 部署后，首次注册账号并登录，跳转至错误页面怎么办？

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/df3ee91c-7091-404a-a27e-fe145ff985da.png)

该页面地址为 `sysAdmin/orgs`，即超级管理员页面。该模块暂未开源（敬请期待）。Erda 将首次注册的账号默认为超级管理员，因此自动尝试跳转至该页面。

您可以退出该账号，并另行注册一个新账号，使用新账号登录后将跳转至个人工作台，点击页面左上方 **创建组织** 开始体验 Erda。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/10/7da51780-8666-4a69-a268-64c56249227d.png)


## 2. 基于 Docker Compose 部署后，在 CenOS 环境下执行安装脚本时出现错误提示 `invalid IP address in add-host: "host-gateway"` 怎么办？

`host-gateway` 特性要求 Docker 版本在 20.10.0 及以上。

请升级 Docker，执行命令 `sudo yum install docker-ce docker-ce-cli containerd.io`。

## 3. 安装 Erda 时初始化任务失败怎么办？

1. 请先确认 `erda-init-image` 日志，是否存在无法连接 MySQL 等情况。如果存在，请排查集群到 MySQL 网络是否可达。
2. 初始化任务中若出现 `Table xxx already exists` 错误，可能是 Erda 安装过程中出现初始化任务中断的情况。请检查数据库并清理残留数据，重新进行安装。

## 4. 基于 Helm 部署 Erda，每个节点挂载 NFS 是否是强制的？

若您希望将 Kubernetes 节点用于执行流水线任务，则节点挂载 NFS 是强制的，具体请参见 [准备工作](../install/helm-install/premise.md#准备工作)。

您可以通过设置 [节点标签](../cmp/guide/cluster/cluster-node-labels.md) 控制 Erda 的节点调度。

## 5. 完成 Erda 安装后，集群总览中未显示已添加的集群怎么办？

:::tip 提示
此处已添加的集群是指导入 Erda 所在的 Kubernetes 集群。
:::

正常情况下，导入集群后 3 分钟左右即可在集群总览页面查看机器的数据列表。若数据为空，可从以下两个方面依次排查:

1. 进入 **管理中心 > 组织设置 > 组织信息** 查看组织标识，例如此处的标识为 `erda`。


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/a8382a63-b8d9-46d2-9e98-24a174468ece.png)

随后在 Kubernetes 节点中确认 `dice/org-<企业标识>=true` 标签是否正确。

```shell
kubectl get no --show-labels | grep org
```

2. 确认标签存在后，进入 **多云管理平台 > 集群资源 > 集群**，确认导入的集群标识是否与 Erda 安装时指定的 `erda.clusterName` 一致。若不一致，您需要下线该集群，并重新添加。

3. 经前两步排查，若仍无数据显示，请排查 `erda-telegraf` 组件日志。

## 6. 访问 Erda 会强制跳转 HTTPS 怎么办？

Erda 默认配置的是 HTTP，如需开启 HTTPS，请参见 [Erda 如何配置 HTTPS](install.md#erda-如何配置-https)。

以社区 `ingress-nginx` 为例，默认情况下将强制跳转 HTTPS，您可以修改 `ingress-nginx` 配置以禁用：

```shell
kubectl edit cm ingress-nginx-controller -n <ingress-namespace>
```

::: tip 提示

不同版本的 ingress-nginx 配置文件存在差异，请根据您的 ingress-nginx 版本确认 `Configmap Name`。

:::

```yaml
data:
  ssl-redirect: "false"
```

## 7. Erda 如何配置 HTTPS？

可在安装 Erda 时配置 `erda.clusterConfig.protocol` 开启 HTTPS，详细配置请参见 [高可用部署可配置参数](../install/helm-install/high-availability.md#高可用部署可配置参数)。完成安装后，您可以根据部署场景配置证书。

## 8. 完成 Erda 安装后，访问 Erda 出现 404 错误怎么办？

1. 请确认是否按照 [安装要求](../install/helm-install/premise.md#安装要求) 部署 `Ingress Controller`，以 `Ingress-Nginx` 为例。

2. 查看 `Ingress-Controller` 日志，出现错误提示如下：

   ```shell
   "ingress does not contain a valid IngressClass"
   ```
3. 当前 Erda 版本并不关注 IngressClass 配置，您可以更改 `Ingress-Nginx` 配置，启动参数增加 `--watch-ingress-without-class=true`。

## 9. 安装 Erda 时 Registry 调度失败怎么办？

请确认 Registry 安装配置是否正确。Registry 在 Erda 安装配置中可通过 `registry.custom.nodeIP`、`registry.custom.nodeName` 参数来控制是否启用 `host` 模式。 `nodeIP` 是您指定的 Kubernetes 节点 IP， `nodeName` 是您指定的 Kubernetes 节点名称，两者需为同一节点的信息。

## 10. 导入集群后，创建项目时可分配资源为 0 怎么办？

Erda 通过节点标签来采集调度节点的可用资源，未正确设置标签将导致项目可用资源为 0。您可以通过如下步骤进行排查：

1. 请确认导入的集群是否在集群总览中显示，如未显示请参见 [集群总览中未显示已添加的集群怎么办](install.md#完成-erda-安装后-集群总览中未显示已添加的集群怎么办) 。
2. 为保证应用的正常构建发布，环境标签（`workspace-*`）、`stateless-service`、`pack-job` 是必需的。其余标签可参见 [节点标签](../cmp/guide/cluster/cluster-node-labels.md) 按需设置。您可以通过 **多云管理平台 > 集群总览 > 设置标签** 设置或查看标签。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/d1c17330-84db-4c24-a170-cb71b8423f54.png)

## 11. 构建流水线打包时推送镜像失败怎么办？

**错误提示为 server gave HTTP response to HTTPS client**

Erda 部署的 Registry 需按照 [准备工作](../install/helm-install/premise.md#准备工作) 中的要求对 Docker 进行设置。

**错误提示为找不到 Registry 地址**

请确认安装 Erda 时是否指定了 `registry.custom.nodeIP` 以及 `registry.custom.nodeName` 参数。

- 若未指定，请确保在 Kubernetes 节点可通过内部域名（例如 *kubernetes.default.svc.cluster.local*）的方式访问 Registry。
- 若已指定，请确认流水线构建节点到 Registry 节点网络是否可达。

具体配置请参见 [安装操作](../install/helm-install/helm-install-demo.md#安装操作)。


## 12. Erda 导入已创建的 Erda Kubernetes 集群，该集群也需要安装 Erda 吗？

不需要，只需待导入的 Kubernetes 集群满足 [安装要求](../install/helm-install/premise.md#安装要求) 即可，集群导入后 Erda 将自动初始化目标集群，安装 Erda 组件及依赖。

:::tip 提示
当前版本导入的集群如需使用流水线功能，需按照 [准备工作](../install/helm-install/premise.md#准备工作) 中的要求对目标集群进行设置，并且确保该集群节点可对 Kubernetes Service 进行 DNS 解析。
:::

## 13. 阿里云 ACK 部署 Erda 需满足什么要求？

Erda 支持使用阿里云 ACK 专有版及托管版部署。使用托管版时，在任一可以使用 `kubectl` 的 Work 节点按照文档部署 Erda 即可，无需关注 Master 节点。

## 14. 部署时如何配置 SMTP 邮件服务器？

在 CRD erda 的 EventBox 组件配置如下环境变量：

```shell
DICE_EMAIL_SMTP_DISPLAY_USER
DICE_EMAIL_SMTP_HOST
DICE_EMAIL_SMTP_PASSWORD
DICE_EMAIL_SMTP_PORT
DICE_EMAIL_SMTP_USERNAME
```

## 15. Kubernetes 集群版本为 1.16，使用 Helm 安装时提示 `must include at least one of v1beta1` 怎么办？

若您的 Kubernetes 集群版本为 1.16，使用 Helm 安装时提示如下错误：

```shell
Error: ValidatingWebhookConfiguration.admissionregistration.k8s.io "elastic-webhook.k8s.elastic.co" is invalid: webhooks[0].admissionReviewVersions: Invalid value: []string{"v1"}: must include at least one of v1beta1
```

请参见 [Kubernetes 文档](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) 并开启 Kubernetes admissionregistration 对应版本的 API。

## 16. 开源版本是否仅支持 Kubernetes 1.16 ～ 1.20、CentOS 7.4 以及上版本？

以上版本已经过验证，其他环境暂未覆盖。后续将陆续覆盖其他常见环境，敬请期待。

## 17. Erda 是否支持纳管 Openshift、Rancher 等集群？

当前 Erda 暂未对 Openshift、Rancher 等 Kubernetes 发行版进行适配测试，后续计划对常见的 Kubernetes 发行版及云厂商基于 Kubernetes 的容器编排服务进行适配，敬请期待。

若您已在以上环境进行验证，[欢迎参与贡献](https://github.com/erda-project/erda/blob/master/CONTRIBUTING.md)。

## 18. 安装 Erda 失败，如何执行重新安装？

请参见 [卸载](../install/helm-install/uninstall.md) 对残留数据进行清理，清理完成后重新执行安装操作。


## 19. 使用 Docker Compose 启动 Erda，组件容器报错 `dial tcp x.x.x.x:3306: connect: connection refused` 怎么办？

`3306` 为 MySQL 端口，该错误提示表示无法连接至 MySQL。

请确认 MySQL 容器是否正常运行：
- 若 MySQL 非正常运行，请通过 MySQL 容器日志排查数据库失败原因；
- 若 MySQL 正常运行，需找到对应的组件，尝试 `docker rm ${container-id}` 后使用 `docker-compose up -d` 重新拉起该组件。

目前出现该问题的多为 Windows 用户，因此极有可能是 Docker Compose 在 Windows 系统下的 depends-on 存在问题，具体原因仍在排查中。

## 20. Ingress Controller 部署完成后访问 Erda 出现 404 错误怎么办？

该问题说明请求未按照 Erda 配置的 Ingress 规则访问对应的后端服务，需排查 ingress-controller 的日志，确认请求异常的原因。

常见原因为 nginx-ingress-controller 错误 `ingress does not contain a valid IngressClass` 导致 Ingress 规则未生效。

当前 Erda 版本无需关注 ingressClass，因此需增加参数跳过，通过如下命令获取部署的 nginx-ingress-controller，可通过 DaemonSet 或 Deployment 方式部署。

```shell
kubectl get ds / deploy --all-namespaces | grep nginx
```

增加启动参数：

```shell
 args:
   - /nginx-ingress-controller
   ...
   - --watch-ingress-without-class=true # 增加该参数
```

再次访问平台即可。

## 21. Erda 组件正常，首次访问提示"请求错误"怎么办？

请先确认 Erda 组件是否为 Running 状态，可通过如下命令查看，以部署在 erda-system 下为例：

```shell
kubectl get erda erda -n erda-system
```

确认 Erda 组件正常后，请确认您配置的 DNS 解析规则。以泛域名 *erda.io* 为例，您需要配置如下解析规则：

```shell
*.erda.io A记录解析到 LB 地址, 比如 10.0.0.1
erda.io A记录解析到 LB 地址, 10.0.0.1
```

使用 *erda.io* 访问平台即可，以 *xxx.erda.io* 访问平台进行组织创建均会出现该问题。

## 22. 使用 Docker Compose 部署 Erda，完成安装后访问服务出现 502 错误怎么办？

使用 docker ps | grep openapi，获取镜像 ID，通过镜像 ID 查看 OpenAPI 容器的日志。

若 OpenAPI 有报错日志 `level=error msg="fail to run provider openapi: dial tcp xx.xx.xx.xx:6379: connect: connection refused"` ，随后持续重启，此时可查看 erda-redis 容器是否拉起。

若 Redis 无法运行，大概率为网络问题导致镜像无法拉取，端口冲突，或挂载的本地文件存在问题。下载 docker-compose 文件，针对 Redis 修改 docker-compose.yml 文件，随后运行 docker-compose down 和 up 重启组件。
