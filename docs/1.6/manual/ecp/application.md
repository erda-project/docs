# 应用管理

## 发布边缘应用

目前边缘应用支持以下两种部署源发布：

- [镜像](#镜像发布)：以镜像作为部署源，支持资源、健康检查、私有仓库等多种配置。
- [中间件](#addon-发布)：即 Addon，开箱即用，支持 MySQL。

### 镜像发布

按镜像类型发布时需关注以下配置：

- **站点**：所选集群下的站点列表。
- **配置集**：所选集群下的配置集。
- **依赖**：应用间的依赖关系。镜像发布的应用可以依赖镜像和 Addon 类型应用；被依赖的应用环境变量会被注入到依赖其的应用中；应用之间不可互相依赖。
- **副本数**：镜像发布的边缘应用网络模式为 hostNetwork，该站点可正常运行的副本数小于等于边缘站点节点数。
- **镜像配置**：支持私有仓库的镜像配置，按需填写仓库用户名和密码即可。
- **健康检查**：支持 HTTP 和 COMMAND 类型。
- **端口映射**：支持 TCP 类型。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/b87b2f8b-9602-47d8-8fdd-7b96056c7a97.png)

镜像类型的应用发布后，可以点击应用名称查看各个站点的部署状态。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/4047b0ec-de8e-4092-b6cf-2cbf85ebe352.png)

### Addon 发布

Addon 类型的边缘应用目前仅支持边缘 MySQL，采用主从复制的方式部署，边缘站点至少需要 2 个节点。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/ea536a01-4582-4de0-86b3-90bc89a0d586.png)

## 查看边缘应用

通过应用详情，可以查看边缘应用当前的发布配置信息以及链接信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/88571f92-0e7b-4ab1-ad3b-aea6cdbd9b02.png)

## 编辑边缘应用

### 镜像类型

镜像类型的边缘应用可以对站点、配置集、依赖、副本数等内容进行编辑。

新增站点会部署对应的实例，若删除站点，则对应实例会被销毁。其他站点不受影响。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/e437d320-8b9b-424f-b73f-2491c38e0266.png)

::: tip 提示

* 删除站点时，如果应用在该站点存在依赖关系，则需要先解除依赖关系。
* 变更配置集、依赖或副本数会导致该应用已发布站点的容器重建，请谨慎操作。

:::

### Addon 类型

Addon 类型的边缘应用仅支持对站点进行编辑。

新增站点会部署对应的实例，若删除站点，则对应实例会被销毁。其他站点不受影响。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/86c233e8-af7d-4906-9799-3eed193f63fe.png)

## 边缘应用站点级的重启与下线

点击边缘应用名称可以查看该应用的站点列表，对站点进行重启以及下线操作（站点部署状态需为 **成功**）。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/84e27876-910c-4336-84ee-8d90b92d7fff.png)

::: tip 提示

* 下线站点时，如果应用在该站点存在依赖关系，则需要先解除依赖关系。
* 下线站点前请注意有状态应用的数据迁移。

:::

## 边缘应用监控

点击站点名称可以查看该站点下的监控信息，包括日志、容器监控以及控制台操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/145b2d34-ed23-4fbf-aa30-17b1a7b70c37.png)

## 删除边缘应用

删除边缘应用需要先解除应用的依赖关系。
