# Workspace

The workspace is set up to add isolation between cluster and workflow to meet the needs for the same cluster to support different projects. In principle, workflows of different projects should be placed in the same workspace and share the resources of a cluster.

Follow the steps below:

1. Go to **Fast Data Platform** and you will automatically enter the default workspace.

2. Click **Default Workspace** to see the list of existing workspaces, then click **Open Space Management**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/5169b5e2-19f6-4a26-af2a-140ddc2335dd.png)

3. Create, edit, or delete workspaces as needed.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/fd0298ee-6477-4289-a142-9bec10eb1539.png)

   **Space Alias**: As the Spark/Cassandra library used in the workflow of the current space, create and configure workflow in the new space. When running the integration node, an alias-named library will be created by default in the integration action if there is no Spark library in the space. The space alias cannot start with a number and cannot exceed 16 characters.

:::tip Tips

Before deleting a workspace, make sure that there are no workflows in the space, or no models generated by the workflow.

:::
