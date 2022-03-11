# Configuration Management

## Data Label

The platform supports three types of labels, used for data sources, data models and workflows, for classification and filtering.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/23ad4fbc-acb3-4000-939c-a309676bdfe5.png)

Go to **Data Integration > Label Management**, click **New Label**, enter the label name and select the module and color.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/1878d60f-570b-4192-a670-6da7353e0cf6.png)

## Quality Rule

The platform supports quality rules applied to the data model, and objectively obtains quality scores through the rules to monitor data quality.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/ee35609f-d0b1-4fd1-8b85-308447d68842.png)

Go to **Data Governance > Quality Rules**, click **Add Rule**, enter the rule name, rule content and select the rule type.

<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/390f96b7-a877-4c4c-a254-e7062810d06c.png" style="zoom:50%;" />

## Queue Management

To achieve more refined workflow distribution and management, the platform supports queue management. You can put different workflows into different queues and set priorities for workflows in the same queue.

Go to **Data Integration > Queue Management** and click **New** to create a queue.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/73ea5661-e139-4001-9df9-44a436f96ac3.png)

* **CPU/Memory**

   It refers to the size of the resource pool available for the entire queue and is used to make a judgment when the pipeline runs a task. If the current remaining CPU/memory is less than the resources required to submit the task, the task needs to be queued. It is a virtual queue, not the actual physical resource size.

   Assuming that the cluster has 50 cores of CPU and 100 GB of memory, and you set the CPU as 100 cores and memory as 200 GB for the queue, then you can successfully create the queue and the tasks submitted by pipeline can also pass resource detection, but submissions to K8s clusters may result in a pending status due to insufficient resources.

   Therefore, when setting up a queue, it is necessary to know the current resource situation of the cluster.

* **Default Priority**

   It indicates the baseline set for the queue, which will be used as the default value when no workflow priority is selected.

* **Parallelism**

   It refers to the maximum number of tasks running simultaneously when the pipeline is queued for detection.

   For example, if the parallelism is 10, then when the number of running tasks is less than 10, the queue will immediately schedule the queued tasks if there are enough resources; when the number of running tasks is equal to 10, the queued tasks will be scheduled after the running tasks are finished.