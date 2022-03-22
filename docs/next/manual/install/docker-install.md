# 基于 Docker Compose 部署

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

2. 添加 hosts
   
   :::tip 提示
   若您将 Erda 安装在远程服务器上，并希望从本地访问，您需要在本地机器执行该操作。
   :::
   
   ```shell
   echo "<your_server_ip> erda.local one.erda.local collector.erda.local openapi.erda.local" | sudo tee -a /etc/hosts
   ```

3. 访问 [*http://erda.local*](http://erda.local) 快速体验 Erda。
