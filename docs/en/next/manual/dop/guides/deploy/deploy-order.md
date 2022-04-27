# Deploy via Deployment Order

Before you begin, please confirm that you have created an artifact. For details, see [Artifact](./release.html).

Go to **App Center > Environments > Deploy** and select an environment for deployment.

## Create Deployment

Follow the steps below to create a deployment order:

1. Click the **+** icon in the upper right corner of the page.
1. Select the project or application artifact to be deployed.
2. See whether the artifact you selected meets the deployment requirements according to the prompts.
3. Click **Create**.

:::tip Tips

Before creating a deployment order, the platform will perform the following checks:

* Whether the artifact format meets the specification
* Whether the custom addon involved in the artifact is deployed
* Whether the addon and its version are supported by the platform
* Whether the application involved is in a deploying state in this environment

:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/e5140066-dcbf-440c-86d4-2e8a3a2393e6.png)

## Start Deployment

You can view the created deployments in the deployment records. Click **Start Deployment** to perform the deployment sequentially according to the grouping arrangement in the artifact.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/a19f3d1d-9ca6-43f3-82ad-817c62cc30df.png)

You can click the deployment record to view detailed deployment progress, and configuration related to this deployed application.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/147d9172-7266-44c5-903f-02756b5d839b.png)

## Restart Deployment

::: tip Tips
A successfully deployed deployment order cannot be redeployed, and you need to create a new one.
:::

If an error occurs or the deployment is canceled, click **Restart Deployment** to redeploy from the failed point.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/f21c698a-fd90-4a5e-a89e-b012074f2a21.png)
