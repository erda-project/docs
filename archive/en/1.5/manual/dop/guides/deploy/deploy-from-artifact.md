# Artifact Deployment
## Deploy Artifact

Go to **DevOps Platform > Joined Projects > Applications > Deployments**, and select the environment, branch and artifact ID to complete the deployment.

:::tip Tips
You can get the artifact ID in artifact management.
:::

After deployment, click the artifact card to view the endpoint, microservice, dynamic and log information of the artifact.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/f78bcc53-f672-4550-b134-1c3c92b5907f.png)

## Modify Deployment

Select the target artifact in the deployments and click update, delete or restart in the drop-down menu.

* **Update**: Reselect the artifact to cover the original deployed artifact.

* **Delete**: Delete the deployed artifact from the environment.

* **Restart**: Redeploy the artifact.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/005b75fa-2394-4ab3-bfa5-d3ec970c308f.png)

## Cross-Cluster Deployment

Add `cross_cluster: "true"` to `params` in the release action of the pipeline file to deploy the pipeline-generated artifacts across clusters.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/c397f69f-53f5-452f-ac1e-902795a8988c.png)

