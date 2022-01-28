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

2. Follow the guide to create an [Organization](../../quick-start/premise.md#Organization).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/947e1f4d-7451-4992-9396-1d6b8b8ba17c.png)

3. After organization creation, import clusters and set node labels.

   * Import the Kubernetes cluster where Erda is deployed.

      * Go to **Cloud Management > Cluster Resource > Clusters** and choose **Import an existing Erda Kubernetes cluster**.

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/6924abc5-eb8f-42c8-943f-879c21bb69c0.png)

      * Complete cluster configuration. For example, set cluster identifier as local-cluster, domain name as *erda.io*, and authentication method as **Kubeconfig**.

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/9f0e0280-3f84-48ba-9610-ceb4c104b444.png)
      
      ::: tip Tips
The cluster identifier and domain name must be consistent with the configuration specified during installation, otherwise Erda functions may be unavailable.
      :::

      * After cluster importing, you can view cluster status on the **Clusters** page, and view monitoring information on the **Cluster Overview** page.

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/bf1c9ada-3b0d-48ae-9e60-0953a9b4b845.png)

   * Set node tags for scheduling. For details, see [Node Tags](../../cmp/guide/cluster/cluster-node-labels.md).

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/3d19003f-c65f-4098-ba14-49df5ebf35ef.png)

4. Create your first project according to the guide and [start your journey of Erda](../../quick-start/newbie.md).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/11/44715a5a-31e8-46f5-b92d-1c5637c167cc.png)
