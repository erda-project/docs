# Configuration and Access

After installation, you need to make some simple configurations.

## Configure Domain Name

If you already have a real domain name, you need to configure it to import its traffic into the Ingress controller of the Kubernetes cluster, for success access to the Ingress domain name configured in the cluster.

If not, you need to add the following URL to the `etc/ hosts` file and replace the example IP with the Ingress controller IP of the Kubernetes cluster.

For example, if the Ingress controller IP of Kubernetes cluster is 10.0.0.1, and the domain name is *erda.io*, then add the following information to the `/etc/hosts` file:

```shell
10.0.0.1 erda.io
10.0.0.1 collector.erda.io
10.0.0.1 openapi.erda.io
10.0.0.1 uc.erda.io
```

## Access Erda

1. Through the configured domain name, access Erda, register and log in.

2. Follow the guide to create an [Organization](../../quick-start/premise.md#组织).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/01/b642bd0d-81d1-4dd7-967f-c58109248cd7.png)

3. After organization creation, import clusters and set node labels.

   * Import the Kubernetes cluster where Erda is deployed.
   
      * Go to **Cloud Management > Resource Management > Clusters** and choose **Import an existing Erda Kubernetes cluster**.

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/01/8f01958f-4128-4734-9ac1-18464c9bf44a.png)

      * Complete the configuration, for example, set cluster identifier as local-cluster, domain name as *erda.io*, and authentication method as **Kubeconfig**.

      ::: tip Tips
   The cluster identifier and domain name must be consistent with the configuration specified during installation, otherwise Erda functions may be unavailable.
      :::

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/01/89fb7043-aee3-4a4e-860c-a58b72d5082d.png)
   
      * After cluster importing, you can view cluster status on the **Clusters** page, and view monitoring information on the **Cluster Overview** page.

   * Set node tags for scheduling. For details, see [Node Tags](../../cmp/guide/cluster/cluster-node-labels.md).

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/01/b9f6bf04-cc6b-4831-99bf-903210f45e57.png)

4. Create your first project according to the guide and [start your journey of Erda](../../quick-start/newbie.md).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/01/1e7b4159-08cd-49b2-a02a-7d7b567b3e68.png)
