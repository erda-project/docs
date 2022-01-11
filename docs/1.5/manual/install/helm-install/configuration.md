# 配置及访问

完成 Erda 安装后，您需要进行一些简单的配置。

## 配置域名

若已有真实的泛域名，您需要进行域名配置，将该域名的访问流量导入 Kubernetes 集群的 Ingress Controller，从而能够正常访问集群中配置的 Ingress 域名。

若无真实的泛域名，您需要在浏览器所在的机器上将下列 URL 写入 `etc/hosts` 文件，并将示例 IP 替换为该 Kubernetes 集群的 Ingress Controller 入口 IP。

例如，Kubernetes 集群的 Ingress Controller 入口 IP 为 10.0.0.1，泛域名为 *erda.io*，则需写入 `/etc/hosts` 文件的信息如下：

```shell
10.0.0.1 erda.io
10.0.0.1 collector.erda.io
10.0.0.1 openapi.erda.io
10.0.0.1 uc.erda.io
```

## 访问平台

1. 通过配置的域名，访问 Erda 平台并注册登录。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/e0b27dee-541a-4c31-b8c9-5c9d894b0691.png)

2. 根据平台引导快速创建一个属于您的 [组织](../../quick-start/premise.md#组织)。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/10/7da51780-8666-4a69-a268-64c56249227d.png)

3. 完成组织创建后，您需要导入集群资源并设置节点标签。

    * 导入 Erda 平台所在的 Kubernetes 集群。

        * 进入 **多云管理平台 > 集群资源 > 集群**，选择 **导入已创建的 Erda Kubernetes 集群**。

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/10/4f57b526-94e5-41b4-a9d0-280aaf22ecda.png)

        * 根据界面提示完成配置，例如集群标识为 erda-demo，泛域名为 *erda.io*，并选择认证方式为 **Kubeconfig**。
      
      ::: tip 提示
      集群标识及泛域名需与安装时指定的配置保持一致，否则您将无法进行其他操作。
      :::
    
      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/10/7af87dea-fdf2-4db3-a0aa-a18c9811f107.png)

        * 完成集群导入后，可在 **集群** 页面查看当前集群状态，在 **集群总览** 页面查看当前集群的监控信息。

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/10/0cd39cc1-553b-4233-b1e0-efe809a71ea5.png)

    * 设置节点标签，用于 Erda 的节点标签调度，具体请参见 [节点标签设置](../../cmp/guide/cluster/cluster-node-labels.md)。

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/10/64523916-eb3e-43c7-9209-c154fc2030ee.png)

4. 根据引导创建第一个项目，[开始您的 Erda 之旅](../../quick-start/newbie.md)。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/10/da0c002a-6f25-4167-aa1c-a7d00a4b8fd5.png)
