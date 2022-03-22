# Project Pipeline

Project pipeline, as the name implies, means all pipelines under the whole project.

Go to **DevOps Platform > Projects > App Center > Pipeline**, where you can view all the joined application pipelines under the project, perform pipeline operations, and view execution records.

## Applications I Involved in

**My Involved Applications** displays the applications you joined and shows pipelines of all applications by default. You can switch applications to see pipelines of the corresponding application. The data to the right of the application name indicates the number of pipelines running, the number of failures in a day, and the total number of pipelines, respectively.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/9de58276-3b79-4fb2-9ab7-350e5450780d.png)

## New Pipeline

Click **Create Pipeline** in the upper right corner to add a new pipeline. If you choose **All** in **My Involved Applications** and click the create button, you need to select the application first and then select the pipeline file.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/dcd8d7fe-84e4-4d69-a504-1b544fcb4833.png)

When creating a pipeline, it will check whether the pipeline has been created in this project, and if so, it cannot be created again.

## Pipeline List

The pipeline list shows all pipelines under the application you are involved in.

* **All**

   All pipelines.

* **Mine**

   Pipelines created by you.

* **Primary**

   Pipelines marked as primary.

Here you can perform the following with the pipeline:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/fc35f8a3-ffe5-4767-9b45-9f00f440adee.png)

* **Run**

   Run the pipeline.

* **Rerun from failure**

   The commitID of the pulled code remains unchanged, and it is re-executed from the point of failure, and the part that has been successfully executed remains in the success state.

* **Rerun**

   The commitID of the pulled code remains unchanged, and the whole pipeline is re-executed.

* **Start cron**

   The pipeline is started periodically according to the cron expression set in the pipeline YAML file.

   :::tip Tips

   Currently, the pipeline timed task relies on the cron expression in the YAML file and still requires manual execution of the pipeline before it can be started if the code push is completed or the cron expression is not synchronized.

   :::

* **Cancel cron**

   Cancel the timed task.

* **Set primary**

   Mark the pipeline as important and display it on the **Primary** page.

* **Delete**

   Before deleting a pipeline, make sure that the pipeline is created by you, that the pipeline is executed, and without timed tasks.

## Pipeline Editing

Click a pipeline to edit it, or view its basic information and execution details.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/dd855487-9d99-4a73-b338-393e05f3e346.png)

The project pipeline is edited in the same way as the application pipeline, and you can choose either graphic editing or text editing as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/13ab9aef-535b-4f8b-9ae3-e3d1f8c645b4.png)

You can view the latest execution details on the **Execution Details** page. Compared with execution details in the application pipeline, the execution details here have no operations and information such as run, rerun from failure, rerun whole pipeline, start cron or execution records.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/50baa085-8ae6-4f98-9008-4130e11dce67.png)

## Execution Record

Execution records show the execution of all application pipelines under the project, and you can filter them by pipeline status, the application they belong to, the executor, and other conditions.

Click a record to view its execution details.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/89e8ce00-83a0-4078-bdb0-b3c9d3714e3e.png)

## Project Pipeline VS Application Pipeline

1. Execution records: The execution records of the project pipeline can be viewed in the application pipeline, while the execution records of the application pipeline are filtered out in the project pipeline.
2. Execution details: Only the latest details are available on the edit page of the project pipeline, and go to execution records for all details.
