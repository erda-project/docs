# Installation and Deployment

## 1. What if it goes to the error page when registering an account and logging in for the first time after deployment based on Docker Compose?

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/20a6100f-ec01-4e7d-bbe5-5310cf132ecc.png)

The address of this page is `sysAdmin/orgs`, that is, the organization administrator page, which is not open source yet (coming soon). Erda takes the account registered for the first time as the organization administrator by default, so it automatically turns to this page.

You can log out of this account and register a new one. Log in with your new account and go to the personal dashboard, then click **Create Organization** at the top left of the page to start.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/01/b642bd0d-81d1-4dd7-967f-c58109248cd7.png)


## 2. What if the error of `invalid IP address in add-host: "host-gateway"` occurs when executing the installation script in CenOS environment after deploying based on Docker Compose?

`host-gateway` requires Docker version 20.10.0 and later.

Please upgrade Docker by running the command `sudo yum install docker-ce docker-ce-cli containerd.io`.

## 3. What if the initialization fails when installing Erda?

1. Please check the `erda-init-image` log first for errors such as MySQL disconnection. If so, please check whether the network between the cluster and MySQL is available.
2. If an error `Table xxx already exists` occurs, it is possible that the initialization is interrupted during the Erda installation. Please check the database and clean up the residual data, and reinstall.

## 4. Is it mandatory to mount NFS per node for Helm-based deployment of Erda?

If you want to use the Kubernetes node for pipeline execution, it is mandatory to mount NFS on the nodes. For details, see [Preparations](../install/helm-install/premise.md#准备工作).

You can set [Node Tags](../cmp/guide/cluster/cluster-node-labels.md) for node scheduling of Erda.

## 5. What if the added cluster is not displayed in the cluster overview after Erda installation?

:::tip Tips
The added cluster here refers to the Kubernetes cluster where Erda is deployed.
:::

Normally, you can view the data list of machines on the cluster overview page about 3 minutes after importing the cluster. If the data is empty, check from the following two aspects:

1. Go to **Org Center > Settings > Organization Info** to view the organization identifier, for example, `erda` in this case.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/e62bed63-da81-41aa-bfa4-782c05b62af6.png)

   Then check whether the `dice/org-<organization identifier>=true` tag is correct in the Kubernetes node.

   ```shell
   kubectl get no --show-labels | grep org
   ```

4. After confirming that the tag exists, go to **Cloud Management > Resource Management > Cluster Management** to check if the imported cluster identifier matches the `erda.clusterName` specified during the Erda installation. If not, you need to get the cluster offline and add it again.
5. If no data is displayed after the first two steps, check the `erda-telegraf` component log.

## 6. What if Erda forces to redirect to HTTPS?

Erda is configured with HTTP by default. To enable HTTPS, see [How to configure HTTPS for Erda](install.md#erda-如何配置-https).

As an example, `ingress-nginx` in the community forces to redirect to HTTPS by default, and you can modify the `ingress-nginx` configuration to disable:

```shell
kubectl edit cm ingress-nginx-controller -n <ingress-namespace>
```

:::tip Tips

The ingress-nginx configuration file varies from version to version. Please check the `Configmap Name` according to your ingress-nginx version.

:::

```yaml
data:
  ssl-redirect: "false"
```

## 7. How to configure HTTPS for Erda?

You can enable HTTPS by configuring `erda.clusterConfig.protocol` when installing Erda. See [Configurable Parameter for High-Availability Deployment](../install/helm-install/high-availability.md#高可用部署可配置参数) for details. After installation, you can configure the certificate according to the deployment scenario.

## 8. What if an 404 error occurs when accessing Erda after installation?

1. Please check whether the [Ingress Controller](../install/helm-install/premise.md#安装要求) is deployed according to the `Installation Requirements`. Take `Ingress-Nginx` as an example.

2. Check the `Ingress-Controller` log, and the error message is as follows:

   ```shell
   "ingress does not contain a valid IngressClass"
   ```
3. Change the `Ingress-Nginx` configuration by adding `--watch-ingress-without-class=true` to the startup parameter.

## 9. What if registry scheduling fails when installing Erda?

Please check whether the registry is installed and configured correctly. Registry can decide to enable `host` by `registry.custom.nodeIP` and `registry.custom.nodeName` parameters in Erda installation and configuration. `nodeIP` and `nodeName` are the Kubernetes node IP and name you specify, which should from the same node.

## 10. What if there is no resource available when creating a project after importing a cluster?

Erda collects the available resources of the scheduling node by the node tag. If the tag is not set correctly, the available resources of the project will be 0. Follow the steps below:

1. Please check if the imported cluster is displayed in the cluster overview. If not, see [What if the added cluster is not displayed in the cluster overview](install.md#完成-erda-安装后-集群总览中未显示已添加的集群怎么办).
2. The environment tag (`workspace-*`), `stateless-service` and `pack-job` are required to ensure that the application is built and released properly. For other tags, see [Node Tags](../cmp/guide/cluster/cluster-node-labels.md). You can go to **Cloud Management > Cluster Overview > Set Tags** to set or view tags.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/a8bbb024-b315-418b-b729-572088700fcf.png)

## 11. What if fail to push the image when building pipeline for packaging?

**Error message for server gave HTTP response to HTTPS client**

The registry deployed by Erda needs to set up Docker as described in [Preparations](../install/helm-install/premise.md#准备工作).

**Error message for registry address not found**

Please check whether the `registry.custom.nodeIP` and `registry.custom.nodeName` parameters are specified when installing Erda.

- If not, ensure that the Kubernetes node can access the registry via the internal domain name (for example, *kubernetes.default.svc.cluster.local*).
- If specified, check whether the network between pipeline node and registry node is available.

See [Installation Operations](../install/helm-install/helm-install-demo.md#安装操作) for details.


## 12. Erda imports a created Kubernetes cluster. Does the cluster also need to have Erda installed?

No, the Kubernetes cluster to be imported just needs to meet the [Installation Requirements](../install/helm-install/premise.md#安装要求). After it is imported, Erda will automatically initialize the target cluster and install Erda components and dependencies.

:::tip Tips
If you want to use pipeline in the imported cluster, set the target cluster as required in the [Preparations](../install/helm-install/premise.md#准备工作), and ensure that the cluster node can perform DNS resolution on the Kubernetes service.
:::

## 13. What requirements should Alibaba Cloud Container Service for Kubernetes (ACK) meet to deploy Erda?

Erda supports deployment of dedicated and managed Kubernetes cluster. When using the managed Kubernetes cluster, just deploy Erda according to the documentation at any work node with `kubectl` available.

## 14. How to configure SMTP mail server during deployment?

Configure the following environment variables in the EventBox component of CR erda:

```shell
NOTICE_CUSTOM_EMAIL_SENDER_HOST
NOTICE_CUSTOM_EMAIL_SENDER_PASSWORD
NOTICE_CUSTOM_EMAIL_SENDER_USERNAME
```

## 15. The Kubernetes cluster version is 1.16. What if an error `must include at least one of v1beta1` occurs when installing with Helm?

If your Kubernetes cluster version is 1.16, the following error will occur when installing with Helm:

```shell
Error: ValidatingWebhookConfiguration.admissionregistration.k8s.io "elastic-webhook.k8s.elastic.co" is invalid: webhooks[0].admissionReviewVersions: Invalid value: []string{"v1"}: must include at least one of v1beta1
```

Please see the [Kubernetes Documentation](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) and enable API of Kubernetes admissionregistration.

## 16. Does the open source version only support Kubernetes 1.16 ~ 1.20, CentOS 7.4 and later versions?

The above version have been tested, while others not. More environments will covered later.

## 17. Does Erda support clusters such as Openshift and Rancher?

Erda has not yet tested the adaptation of Openshift, Rancher and other Kubernetes releases, and plans to adapt common Kubernetes releases and Kubernetes-based container orchestration services of cloud vendors.

If you have tested for the above environment, [your contribution is welcome](https://github.com/erda-project/erda/blob/master/CONTRIBUTING.md).

## 18. How to reinstall Erda if the installation fails?

See [Uninstall](../install/helm-install/uninstall.md) to clean up the residual data and then install again.


## 19. What if the component container reports an error `dial tcp x.x.x.x:3306: connect: connection refused` when using Docker Compose to start Erda?

`3306` is the MySQL port and the error indicates that it cannot connect to MySQL.

Please check whether the MySQL container is running properly:
- If it is not running properly, check the MySQL container log for the reason of database failure.
- If it is running properly, find the corresponding component, try `docker rm ${container-id}` and then use `docker-compose up -d` to start the component again.

Currently this issue occurs mostly with Windows users, so it is likely that there is a problem with Docker Compose's depends-on in the Windows systems.

## 20. What if an 404 error occurs when accessing Erda after the Ingress Controller is deployed?

It indicates that the request does not follow the Ingress rules configured by Erda to access the corresponding back-end service, so you need to check the ingress-controller logs for troubleshooting.

A common reason is that the nginx-ingress-controller error `ingress does not contain a valid IngressClass` makes the Ingress rule not take effect.

Get the deployed nginx-ingress-controller with the following command, which can be deployed via DaemonSet or Deployment.

```shell
kubectl get ds / deploy --all-namespaces | grep nginx
```

Add startup parameters:

```shell
 args:
   - /nginx-ingress-controller
   ...
   - --watch-ingress-without-class=true # Add the parameter
```

Access Erda again.

## 21. What if a "request error" occurs when first accessing Erda with its components working properly?

Please first check whether the Erda components are running by the following command. Take the deployment under erda-system as an example:

```shell
kubectl get erda erda -n erda-system
```

Then check the DNS resolution rules you configured. For the domain *erda.io*, for example, you need to configure the following resolution rules:

```shell
*.erda.io A record resolution to LB address, such as 10.0.0.1
erda.io A record resolution LB address, 10.0.0.1
```

Access the platform with *erda.io*. The problem will occur if using *xxx.erda.io* to access the platform and create organizations.

## 22. What if a 502 error occurs when accessing Erda after installation based on Docker Compose?

Use docker ps | grep openapi to get the image ID, and view the logs of the OpenAPI container through the image ID.

If OpenAPI reports an error log `level=error msg="fail to run provider openapi: dial tcp xx.xx.xx.xx:6379: connect: connection refused"`, and then restarts continuously, you can check whether the erda-redis container is up.

If Redis fails to run, it is probably due to network problems that make the image failed to be pulled, port conflicts or problems with the mounted local files. Download the docker-compose file, modify the docker-compose.yml file for Redis, and then run docker-compose down and up to restart the components.
