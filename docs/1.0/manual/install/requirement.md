# 先决条件
- Kuberentes 1.16 +
  - 至少需要 4 个节点 (1 个 Master 和 3 个 Worker)
  - 每个节点 4 CPU 16 G 内存
  - **不要在集群上安装 ingress controller 组件**
- Docker 19.03 +
- CentOS 7.4 +
- Helm 3 +
- 泛域名(可选项，用于访问 Erda 平台，如 *.erda.io)



### 安装 Erda

1. 在您的 Kubernetes Master 节点上下载 [压缩包](https://github.com/erda-project/erda/releases) 并解压
	
   > **Note**: 当前仅支持 Linux 系统
   
   ```shell
   tar -xzvf erda-linux.tar.gz
   cd erda
   ```

