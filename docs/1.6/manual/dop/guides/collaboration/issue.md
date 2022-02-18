# 事项

完成项目创建后，平台即可支持研发项目协作事项管理。

## 事项类型

进入 **DevOps 平台 > 项目 > 项目协同 > 事项列表**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/65298d9e-2e93-4fe6-ab0b-5178acd837d0.png)

- **需求**
  即用户需求实现的功能，由产品经理创建，与开发工程师沟通后确认所属迭代、工期等信息。
- **任务**
  由需求拆解而来，一项任务对应一个功能点，任务设定范围不应过大，单项任务完成时间需控制在两天以内。
- **缺陷**
  由测试工程师创建并指派给开发工程师，开发工程师修复后再转回测试工程师进行验证。

## 事项筛选

事项查询支持筛选功能。您可自定义筛选条件，筛选结果将对应展示事项列表。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/0c7f17c6-5d9f-4612-ab2e-a34432069699.png)

## 事项导入导出

事项支持批量导入导出功能，可根据筛选条件自定义导出事项，导入导出文件均为 XLSX 格式。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/d11df522-3e90-4ddb-a0f4-fe27f0c8294e.png)

## 事项关联

- **关联 MR**

  为方便事项协作，您可在事项中关联该项目代码仓库的 MR，点击链接即可跳转查看 MR 详情。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/44220b41-29f0-44ba-b21c-2f62a287e959.png)

- **关联事项**

  为方便事项协作，您可在事项中关联其他事项。需求可根据关联事项的状态，自动计算需求的完成度。

  您可以关联已有事项，也可创建并关联已有事项。查看关联事项时，可快速修改关联事项的处理人或解除关联。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/c2fcf927-a868-465e-ace9-1594b17786d6.png)

  :::tip 提示
  在关联界面快速创建事项时，仅需填写标题和处理人即可。
  :::

## 事项活动日志

事项支持活动日志记录，事项下的任何修改操作都将以活动日志记录，且无法删除。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/2ab5084c-2c43-4a68-ace9-37ebd10c53f2.png)

## 事项类型转换

为方便事项协作，您可以转换事项类型，例如将需求事项转换为任务事项，状态默认为初始状态。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/cdc023a8-c66f-44e7-8d0d-97c6f23914d7.png)

## 事项关注

事项支持订阅关注功能，当您关注的事项发生变更时，将收到站内信提醒，及时了解事项动态。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/45d3ad1b-5fef-4a18-be56-ef6674167b2a.png)

## 事项复制

事项支持复制功能，输入新标题即可复制，复制内容不包括活动日志。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/5b229cb4-a3ab-40be-8b08-99e4c21d6fd4.png)
