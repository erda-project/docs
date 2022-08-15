# Locate Workloads with Wasted Resources

Inappropriate resource allocation may lead to resource waste and uncontrolled waste will cause increased costs.

By the cloud management platform on Erda, you can locate the workloads with wasted resources quickly and optimize the resource allocation.

Please go to **Cloud Management > Container Resource > Node** to operate.

## Step 1: Find the Machine Node with Low Distribution Rate	

**Distribution rate** refers to the proportion of used resources.

Take CPU analysis as an example. Select **CPU Analysis**. The distribution rate is not displayed by default. You need to click the gear icon in the upper right corner and select **Distribution Rate**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/e34401c6-1e1c-4e0e-ad45-cc629ad70b91.png)

Click the column of **Distribution Rate** to sort in ascending order, then you will see the node with lowest distribution rate has 89.1% of resources allocated with only 4.5% used.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/929247c9-e666-4ec6-b2c0-7f56da697cf0.png)


## Step 2: Find the Pod with More Resource Allocations

Click **Show** of the corresponding node.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/62dc6ee0-cda2-4409-9132-d79c89201e24.png)

In the pod list, filter pods by status of **Running**.

:::tip Tips

Normally, only pods in status such as **Running** and **Container Creating** actually occupy resources as the pods in status of **Completed** has released resources.

:::

Click **CPU Requests**. The pod is running tells that the CPU requests are allowed by K8s, that is, the resource has been allocated to the pod. The CPU percents of pods with more resources are quite low as below, indicating that there is resource waste in the pods.	

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/314c3d15-2b39-40a2-afc1-2035a63d3000.png)

## Step 3: View Pods with High Resource Allocations and Low CPU Percent

Click the name of the corresponding pod.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/5742ba9a-e0ec-4fe6-8038-26d9d6762d26.png)

View the historical resource usage in the pod detail page. The CPU usage is low throughout the day, from which you can tell that there is resource waste in the pod.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/1cdbd4c6-a4af-45ec-9b18-62c41ef869e0.png)

## Step 4: Find the Corresponding Workload and Adjust Resource Allocation

Click the workload in pod details.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/393a888b-66a8-453f-bb9e-7375a8116e4b.png)

Go to the workload details page and click **View/Edit YAML** for resource adjustment.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/00af6174-130c-4a8e-863b-ba586e84af11.png)

After completing the resource adjustment, click **OK**, and the changes will take effect immediately.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/aee090fd-d9df-41a6-a388-b24ddeeb94d4.png)
