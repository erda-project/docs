# Custom Field & Workflow

## Custom Field

If the default custom fields cannot meet your demand, you can add custom issue fields as needed.

### Add Custom Field

Go to **Org Center > Settings > Project > Issue Custom Fields** to add a new issue field.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/b1dc9797-44d1-49a1-8235-9777e5bd64e0.png)

The custom fields of multiple types are supported:

* Select
* MultiSelect
* Text
* URL
* Email
* Date
* Person
* Number
* Phone

You need to set enumerated values for Select and MultiSelect.

### Edit Custom Field

After adding a custom field, you can edit the issue type of the custom field as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/37fe160a-d070-42e3-8df8-d4b5c8db5edf.png)

Select an issue type and choose custom fields for reference, then the new fields will be added to all issues of this type in the organization.

The order of the custom fields is consistent with that in configuration.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/88549bb4-f90b-4e1c-b200-61409258cc9a.png)

### Update Custom Field

All custom fields can be modified except for enumerated ones.

For enumerated fields, only converting Select to MultiSelect is allowed.

## Workflow

The workflow is a collection of issue status and it determines whether a status can be transferred to another.

The issue workflow has multiple main states, and each is a collection of several sub-states.

Milestones, requirements, bugs and tasks have their workflows separately, and you can set up workflow for each issue as needed.

Go to **DevOps Platform> Project > Settings > Issue Workflow**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/be0e9c33-de02-479e-a1ee-1e20581180fb.png)

When creating a project, the platform will automatically create a default workflow for it.

You can edit the workflow for specific issues if necessary.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/697ae51f-900c-45bf-ab87-b885f7c8e0ff.png)

