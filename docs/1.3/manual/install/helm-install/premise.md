# 前提条件

## 硬件资源配置

:::tip 提示

以下配置不含运行 Kubernetes 组件所需资源。

:::

| 规格          | Demo（1～10 节点）                        | Prod（3～50 节点） | Prod（51～100 节点） | Prod（101～200 节点） | Prod（201～300 节点） | Prod（300+ 节点） |
| :------------ | :---------------------------------------- | :----------------- | :------------------- | :-------------------- | :-------------------- | :---------------- |
| CPU（核）     | 8                                         | 32                 | 48                   | 64                    | 80                    | 96                |
| Memory（GB）  | 32                                        | 96                 | 128                  | 192                   | 288                   | 336               |
| Storage（GB） | 400                                       | 4000               | 6000                 | 12000                 | 16000                 | 22500             |
| 推荐配置      | 规模：2 节点 <br>规格：4 核/16 GB/200 GB | -                  | -                    | -                     | -                     | -                 |

## 安装要求

- Kubernetes 1.16～1.20（安装 [Ingress Controller](https://kubernetes.io/zh/docs/concepts/services-networking/ingress-controllers/) 组件）
- Docker 19.03 及以上
- CentOS 7.4 及以上
- Helm 3 及以上
- 泛域名（可选，通过 Kubernetes Ingress 配置域名以访问 Erda 平台，例如 **.erda.io*）

## 准备工作

1. 在 Kubernetes 集群中执行如下操作（如已具备则无需执行）：

    * 确认 Master 节点的 `~/.kube/` 路径下有 kubeconfig 文件，并且可以使用 `kubectl` 访问集群。

    * 确认 Master 节点下已安装 Helm（以 3.5.2 版本为例）。

      ```shell
      # 下载 Helm 安装包
      wget https://get.helm.sh/helm-v3.5.2-linux-amd64.tar.gz
   
      # 解压安装包
      tar -xvf helm-v3.5.2-linux-amd64.tar.gz
   
      # 安装 Helm 3，在解压后的目录 linux-amd64 中找到 Helm 二进制文件，然后将其移至所需的目标位置
      mv linux-amd64/helm /usr/local/bin/helm
   
      # Erda Chart 包直接在本地解压文件中，无需添加 Repo， Helm 添加 Repo 等操作请参考官方文档
      ```

2. 修改 `docker/daemon` 文件中的 `insecure-registries` 字段。

   ```shell
   # 在*每台节点*上编辑 /etc/docker/daemon.json 文件
   ...
   "insecure-registries": [
     "0.0.0.0/0"
   ],
   ...

   # 重启 docker daemon
   systemctl restart docker
   ```

3. 在 Kubernetes Master 节点上下载 Erda [压缩包](https://github.com/erda-project/erda/releases) 并解压。

   ```shell
   tar -xzvf erda-linux.tar.gz
   cd erda-release
   ```

   ::: tip 提示
   当前仅支持 Linux 系统。
   :::

4. 在每个节点上设置 NFS 作为网络共享存储。

    * 若您已有网络共享存储（如阿里云），请执行如下命令将其设置在各节点上：

      ```shell
      mount -t <storage_type> <your-share-storage-node-ip>:<your-share-storage-dir> /netdata
     
      # 举例如下：假设您拥有阿里云 NAS v4 服务作为共享网络存储，阿里云 NAS 的 Host 为 file-system-id.region.nas.aliyuncs.com，您需要通过如下命令挂载目录:
     
      mount -t nfs -o vers=4,minorversion=0,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport file-system-id.region.nas.aliyuncs.com:/ /netdata
      ```

    * 若无网络共享存储，请执行如下脚本。该脚本将协助安装 NFS 组件，在当前节点上创建 `/netdata` 文件夹并将其挂载到其余节点上。

      ```shell
      cd erda-helm/
      bash scripts/storage_prepare.sh
      ```
