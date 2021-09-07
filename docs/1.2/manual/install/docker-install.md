# 基于 Docker Compose 本地安装

::: tip 提示
本安装方法仅适用于不具备 Kubernetes 条件的情况下，在本地快速体验 Erda 的场景。生产环境下不建议采用此方法。
:::

## 前提条件

- Docker 版本：20.10.0 及以上
- 节点配置：4 核 CPU，8 GB 内存

## 使用脚本快速安装

1. 执行以下命令：

   ```shell
   /bin/bash -c "$(curl -fsSL https://static.erda.cloud/quick-start/quick-start.sh)"
   ```

2. 访问 [*http://erda.local*](http://erda.local) 快速体验 Erda。


## 常见问题

### 1. 首次注册账号并登录后跳转到错误页

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/2a174a79-4831-477e-b36f-65e606967ad5.png)

**问题原因**：注意到该页面地址为 `sysAdmin/orgs`，即超级管理员管理页，该模块暂时还未包含在开源包内（我们将在近期开放该模块）。Erda 首次注册到账号会默认成为超级管理员，因此会自动尝试跳转到该页面。

**解决方法**：您可以退出首次注册的账号，然后再次注册一个新账号，使用新的账号登录后将会跳转到个人仪表盘页面，如下图所示，您可以从点击页面左上方的 `创建机构` 按钮开始体验 Erda。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/ab68de5a-d013-40d0-9336-a9364da3525e.png)


