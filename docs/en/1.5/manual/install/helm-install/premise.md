# Prerequisites

## Hardware Resource Configuration

:::tip Tips

The following configuration does not contain the resources required to run Kubernetes components.

:::

| Specification | Demo (1～10 nodes)  | Prod (3～50 nodes)  | Prod (51～100 nodes)  | Prod (101～200 nodes)  | Prod (201～300 nodes)  |
| :------------ | :---------------------------------------- | :----------------- | :------------------- | :-------------------- | :-------------------- |
| CPU (core)  | 8 | 32 | 48 | 64 | 80 |
| Memory (GB)  | 32 | 96 | 128 | 192 | 288 |
| Storage (GB)  | 400 | 4,000 | 6,000 | 12,000 | 16,000 |
| Recommended Configuration | Scale: 2 nodes <br>Specification: 4 cores/16 GB/200 GB |-|-|-|-|

## Installation Requirements

- Kubernetes 1.16～1.20 (install [the Ingress Controller](https://kubernetes.io/zh/docs/concepts/services-networking/ingress-controllers/) component)
- Docker 19.03 and above
- CentOS 7.4 and above
- Helm 3 and above
- Domain name (optional, configure by Kubernetes Ingress to access Erda platform, such as **.erda.io*)

## Preparations

1. Perform the following operations in the Kubernetes cluster (skip the step if you have already done):

   * Confirm that there is a kubeconfig file under the `~/.kube/` path of the Master node, and you can run `kubectl` to access the cluster.

   * Confirm that Helm has been installed under the Master node (here take version 3.5.2 as an example).

      ```shell
      # Download the Helm installation package
      wget https://get.helm.sh/helm-v3.5.2-linux-amd64.tar.gz
      
      # Unzip the installation package
      tar -xvf helm-v3.5.2-linux-amd64.tar.gz
      
      # To install Helm 3, find the Helm binary in the unpacked directory linux-amd64 and move it to the desired target location
      mv linux-amd64/helm /usr/local/bin/helm
      
      # The Erda chart package is in the local file with no need to add repo. For operations of adding repo for Helm, please refer to the official documentation
      ```

2. Modify the `secure-registries` field in the `docker/daemon` file.

   ```shell
   # Edit the /etc/docker/daemon.json file on *each node*
   ...
   "insecure-registries": [
     "0.0.0.0/0"
   ],
   ...

   # Restart docker daemon
   systemctl restart docker
   ```

3. Download the Erda [installation package](https://github.com/erda-project/erda/releases) on the Kubernetes Master node and unzip it.

   ```shell
   tar -xzvf erda-linux.tar.gz
   cd erda-release
   ```

   ::: tip Tips
   Only Linux systems are supported.
   :::

4. Set NFS as network shared storage on each node.

   * If you already have network shared storage (such as Alibaba Cloud), please run the following command to set it on each node:

      ```shell
      mount -t <storage_type> <your-share-storage-node-ip>:<your-share-storage-dir> /netdata

      # For example, assuming that you have an Alibaba Cloud NAS v4 service as shared network storage and the host of the Alibaba Cloud NAS is file-system-id.region.nas.aliyuncs.com, mount the directory with the following command:

      mount -t nfs -o vers=4,minorversion=0,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport file-system-id.region.nas.aliyuncs.com:/ /netdata
      ```

   * If not, please run the following script, which will install NFS components, create `/ netdata` folder on the current node and mount it on the remaining nodes.

      ```shell
      cd erda-helm/
      bash scripts/storage_prepare.sh
      ```
