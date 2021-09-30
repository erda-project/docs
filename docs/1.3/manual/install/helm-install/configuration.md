# 配置及访问

完成 Erda 安装后，您需要进行一些简单的配置。

## 配置域名

若已有真实的泛域名，您需要进行域名配置，将该域名的访问流量导入 Kubernetes 集群的 Ingress Controller，从而能够正常访问集群中配置的 Ingress 域名。

若无真实的泛域名，您需要在浏览器所在的机器上将下列 URL 写入 `etc/hosts` 文件，并将示例 IP 替换为该 Kubernetes 集群的 Ingress Controller 入口 IP。

例如，Kubernetes 集群的 Ingress Controller 入口 IP 为 10.0.0.1，泛域名（ERDA_GENERIC_DOMAIN 变量中设置）为 *erda.io*，则需写入 `/etc/hosts` 文件的信息如下：

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

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/227b6df6-2613-4c01-9952-b91d770b0468.png)

3. 完成组织创建后，您需要导入集群资源并设置节点标签。

    * 导入 Erda 平台所在的 Kubernetes 集群。

        * 进入 **多云管理平台 > 资源管理 > 集群管理**，选择 **导入已创建的 Erda Kubernetes 集群**。

      ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/42d94b90-76fe-4280-823e-c93841f50f40.png)

        * 根据界面提示完成配置，例如集群标识为 *local-cluster*，泛域名为 *erda.io*，并选择认证方式为 **Kubeconfig**。
      
      ::: tip 提示
      集群标识及泛域名需与安装时指定的配置保持一致，否则您将无法进行其他操作。
      :::
   
      ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/f27b8a4b-89dd-41a7-ac3d-88e3f49bf302.png)

        * 完成集群导入后，可在 **集群管理** 页面查看当前集群状态，在 **集群总览** 页面查看当前集群的监控信息。

      ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/3a90a6ae-8b5e-4262-83f6-05815f99b75f.png)

    * 设置节点标签，用于 Erda 的节点标签调度，具体请参见 [节点标签设置](../../cmp/guide/cluster/cluster-node-labels.md)。

      ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/aeb9e652-3419-443c-98e0-a553032a450a.png)

4. 根据引导创建第一个项目， [开始您的 Erda 之旅](../../quick-start/newbie.md)。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/be1e15fc-6ecb-439d-a35c-68efed40bef3.png)
