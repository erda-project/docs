# Configuration Management

## Data Label

The platform supports three types of labels, used for data sources, data models and workflows, for classification and filtering.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/1c30292a-b06f-466e-a771-06a7d261ca78.png)

Go to **Data Integration > Label Management**, click **New Label**, enter the label name and select the module and color.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/0ff2245f-1685-41d9-b240-80b9efd1fdbf.png)

## Quality Rule

The platform supports quality rules applied to the data model, and objectively obtains quality scores through the rules to monitor data quality.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/afda97e2-9182-49bc-aade-581f23b3099f.png)

Go to **Data Governance > Quality Rules**, click **Add Rule**, enter the rule name, rule content and select the rule type.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/43d1d8ec-9b6f-49e7-9bc6-b2c64687b7da.png)

## Queue Management

To achieve more refined workflow distribution and management, the platform supports queue management. You can divide different workflows into different queues and set priorities for workflows in the same queue.

Go to **Data Integration > Queue Management** and click **New** to create a queue.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/185d4c0b-628c-4f6f-a430-d18bef2aba57.png)

* **CPU/Memory**

   It refers to the size of the resource pool available for the entire queue and is used to make a judgment when the pipeline runs a task. If the current remaining CPU/memory is less than the resources required to submit the task, the task needs to be queued. It is a virtual queue, not the actual physical resource size.

   Assuming that the cluster has 50 cores of CPU and 100 GB of memory, and you set the CPU as 100 cores and memory as 200 GB for the queue. You can successfully create the queue and the tasks submitted by pipeline can also pass resource detection, but submissions to K8s clusters may result in a pending status due to insufficient resources.

   Therefore, when setting up a queue, it is necessary to know the current resource situation of the cluster.

* **Default Priority**

   It indicates the baseline set for the queue, which will be used as the default value when no workflow priority is selected.

* **Parallelism**

   It refers to the maximum number of tasks running simultaneously when the pipeline is queued for detection.

   For example, if the parallelism is 10, then when the number of running tasks is less than 10, the queue will immediately schedule the queued tasks if there are enough resources; when the number of running tasks is equal to 10, the queued tasks will be scheduled after the running tasks are finished.