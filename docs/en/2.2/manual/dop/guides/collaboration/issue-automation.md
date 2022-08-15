# Collaboration Automation

The platform supports collaboration automation to make project collaboration easier, which can automatically update related issues according to workflow changes, thus improving R&D efficiency.

## Workflow Automation
1. If there are [tasks](issue.md#to-do-list) under the requirement and the task status is "In Progress", then the requirement status will be updated to "In Progress" automatically.

2. When a task/bug is [associated with an MR](issue.md#Related-MR), the task/bug status will be updated to "In progress" automatically.

::: tip Tips
"In Progress" is the next available sub-state to be processed. See [Issue Workflow](issue-customize-and-workflow.md#workflow) for details.
:::

## Requirement and Task Synchronization
1. When the [iteration](backlog-and-iteration.md#iteration) of the requirement changes, you can synchronize the task to the target iteration as well if there are tasks under the requirement.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/14589980-7aa8-49dd-a78d-913791b6c03c.png)

   If the adjusted iteration deadline is earlier than the current iteration, the system will automatically synchronize the iteration of the task.

2. When the [label](label.md) of the requirement changes, you can synchronize the label change to the tasks under the requirement.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/6dbec4e7-f401-422a-9afd-9d7854ed1158.png)

## Task Adjustment According to Iteration
The start and end time of issues in an iteration shall meet the following conditions:

* The start time of the issue cannot be later than the end time.
* The end time of the issue can neither be empty nor be later than the iteration deadline.

When creating an issue or adjusting an iteration, the system will automatically adjust the issue end time according to the following rules if it is not within the iteration period:

If the operation day is within the iteration period, then the operation day is the issue end time, otherwise, the iteration start time will be taken as the issue end time.

If the adjusted issue end time is earlier than the start time, the system will adjust the start time to the same as the end time.

## Automated Operation Records
Changes triggered by collaboration automation will be recorded in the [activity](issue.md#activity) with the system as the operator, including the trigger reason.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/ea52f740-9085-4e50-a6bf-7725ca4d94b3.png)
