# Issue

After creating a project, you can manage project issues on the platform collaboratively.

## Type

Go to **DevOps Platform > Projects > Collaboration > Issue**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/ac9b9e55-c79e-4196-b10e-21201a87e723.png)

- **Requirement**
   The functions users need, created by the product manager with information such as the iteration and duration.
- **Task**
   Split from the requirement. A task corresponds to a function, which should be refined and can be finished within two days.
- **Bug**
   Created by the test engineer and assigned to the developer. Once fixed, it will be transferred to the test engineer for testing again.

## Filtering

The platform supports issue filtering. You can customize the filtering conditions and the corresponding issues will be displayed as a result.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/443ea619-4cd1-4ede-819f-8909132fa751.png)

## Importing and Exporting

The platform supports importing and exporting issues in batches in XLSX files as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/25bc8ae6-d700-4a84-bc4a-a974e2d2c248.png)

## To-Do List

In project collaboration, a requirement is often split into multiple subtasks. To clearly demonstrate the relationship between the two, the platform supports a to-do list, that is, a requirement can contain multiple tasks, and its progress will be updated according to the status of the tasks it contains.

You can quickly create tasks on the requirement page.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/17c21178-2c50-4725-9ce0-04493e1de28c.png)

Alternatively, add the existing task.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/19319893-efad-46d2-adea-777d82d86098.png)

You can also remove the task from the requirement as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/471591d5-8a2f-4ed0-9ff9-0a1a687f74c9.png)

::: tip Tips
The to-do list does not conflict with the [reference](#reference) as the former focuses more on the one-way relationship between the requirement and the task.
:::

## Reference

- **Related MR**

   You can relate the MR of the project code repository to the issue for better collaboration, as others can click the link to view details.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/d11693fd-4673-4aec-8753-2f9f3709743e.png)

- **Related issues**

   You can relate the issue to others for better collaboration.

   Relate issues to the existing ones or create one and relate to it. You can change the assignee of the related issues or disassociate them as needed.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/2b95e70c-ec7b-4a26-997c-aaae2ef5c1b5.png)

   :::tip Tips
   When creating a related issue in the relation interface, you only need to fill in the title and the assignee.
   :::

## Activity

The platform supports activity log recording for issues. Any modification of issues will be recorded and cannot be deleted.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/1cd52889-d1cb-4141-b42e-be12a04ca1fc.png)

## Type Conversion

The type of issues can be converted for better collaboration, for example, converting a requirement to a task.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/d24ec587-52b0-4b8c-89b9-36b2bb135a9c.png)

## Subscription

The platform supports issue subscriptions. When the issue you subscribe changes, you will receive notifications to keep abreast of the progress.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/6946cb7a-86eb-45d4-b42c-c97fb1d66205.png)

## Copying

The platform supports issue copying, which can be achieved by entering a new title, but the activity log will not be copied.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/26/3ab5e50e-ca91-444f-af30-e20e03764ccc.png)
