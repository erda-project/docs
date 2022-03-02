# Custom Field & Workflow

## Custom Field

If the default custom fields cannot meet your demand, you can add custom issue fields as needed.

### Add Custom Field

Go to **Org Center > Settings > Project > Issue Custom Fields** to add a new issue field.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/974c99fc-57e1-4d28-9319-4a5a7a8f2fe8.png)

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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/72e934e4-e238-4b34-a3fd-6892ff250e93.png)

Select an issue type and choose custom fields for reference, then the new fields will be added to all issues of this type in the organization.

The order of the custom fields is consistent with that in configuration.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/31ff7e7b-cd53-499f-bcf2-e006bfef2ad4.png)

### Update Custom Field

All custom fields can be modified except for enumerated ones.

For enumerated fields, only converting Select to MultiSelect is allowed.

## Workflow

The workflow is a collection of issue status and it determines whether a status can be transferred to another.

The issue workflow has multiple main states, and each is a collection of several sub-states.

Requirements, bugs and tasks have their workflows separately, and you can set up workflow for each issue as needed.

Go to **DevOps Platform> Project > Settings > Issue Workflow**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/cd0488d5-7cff-4fe8-93c8-88e57d4b3dc0.png)

When creating a project, the platform will automatically create a default workflow for it.

You can edit the workflow for specific issues if necessary.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/941f4505-4bcb-4be1-b86d-1951e56fd4d9.png)

