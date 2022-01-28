# Artifact Deployment
## Deploy Artifact

Go to **My Application > Deployments**, and select the environment, branch and artifact ID to complete deployment.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/18064590-548f-445c-91dd-b2051fb3ab47.png)

:::tip Tips
You can get the artifact ID in artifact management.
:::

After deployment, click the artifact card to view the endpoint, microservice, dynamic and log information of the artifact.

## Modify Deployment

Select the target artifact in the deployments and click update, delete or restart in the drop-down menu.

* **Update**: Reselect the artifact to cover the original deployed artifact.

* **Delete**: Delete the deployed artifact from the environment.

* **Restart**: Redeploy the artifact.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/86dbec37-f7da-4a2b-a9b8-0e16658f6b30.png)

## Cross-Cluster Deployment

Add `cross_cluster: "true"` to `params` in the release action of the pipeline file to deploy the pipeline-generated artifacts across clusters.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/fbb991d3-e2ce-4386-b994-e31945ca7875.png)

