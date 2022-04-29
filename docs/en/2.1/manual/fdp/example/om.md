# Efficient Task Monitoring and O&M

After completing data integration, development and services, it is necessary to ensure the system stability. How to achieve better monitoring at a lower cost and how to assess the impact of failed tasks on downstream and recovery time are issues that need to be resolved in task operation and maintenance.

The task operation and maintenance center includes notification management, notification details, workflow operation and maintenance, running overview and running details, which are used to display the current O&M indicators, task status and scheduling resource trends that need to be focused on, as well as the running status distribution of offline synchronization and real-time synchronization tasks, data synchronization progress and other integrated information, which is conducive to improving the efficiency of task operation and maintenance.

## Result Query

As the workflow runs successfully, you can go to **Data Development > Ad Hoc Query** to view the data.

1. Enter the query SQL in the editor and click **Execute**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/31b98d21-904c-46c4-8606-723a2d3c996e.png)

2. Click the record icon in the upper right corner to view the ad hoc query records.

## Running Overview

Go to **Data Development > Task Operation > Run Overview** to view the overall status of task operation, including summary of today cycle details, completion of cycle details, execution time ranking and error ranking in the last 30 days.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/36f801aa-7c68-4acb-886c-5e64900f5108.png)

## Running Details

Go to **Data Development > Task Operation > Run Details** to view the data task running status, running progress, start time, end time and other information, and it also supports workflow filtering according to different conditions and batch operations.

## Workflow O&M

Go to **Data Development > Task Operation > Workflow Operation and Maintenance** to query workflows and perform batch operations on workflows, including batch start, batch stop, batch timing, etc. Click **Details** of a workflow to see its dependencies and running details.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/1799c220-618c-44c3-9b76-0f01daee4e18.png)

## Notification Management

Go to **Data Development > Task Operation > Notification Management** to configure notifications of the workflow running status.

1. Click **New Notification** and fill in the information required.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/ffeed0f2-9a6e-4ea8-99a9-6f99aab1c247.png)

   | Parameter | Description | Required |
   | -------- | -------------------------------------------- | -------- |
   | Notification name | Name the notification | Yes |
   | Notification item | Workflow failed/workflow running/workflow success | Yes |
   | Sphere of influence | Workflow to be monitored | Yes |
   | Method to inform | Currently only supports mail | Yes |
   | Notification object | Fill in the object information (username, email and phone number)  | Yes |

2. You can deactivate, edit and delete the configured notifications on the notification management page.

## Notification Details

Go to **Data Development > Task Operation > Notification Details** to view the issued notifications.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/8a6789d0-c29e-4df5-af7c-9ec09b0fac5c.png)
