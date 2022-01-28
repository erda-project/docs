# 事项

完成项目创建后，平台即可支持研发项目协作事项管理。

## 事项类型

进入 **DevOps 平台 > 我的项目 > 项目协同 > 全部事项**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/69ff615f-7305-4744-8290-7dfc021b69fb.png)

- **需求**
  即用户需求实现的功能，由产品经理创建，与开发工程师沟通后确认所属迭代、工期等信息。
- **任务**
  由需求拆解而来，一项任务对应一个功能点，任务设定范围不应过大，单项任务完成时间需控制在两天以内。
- **缺陷**
  由测试工程师创建并指派给开发工程师，开发工程师修复后再转回测试工程师进行验证。

## 事项筛选

事项查询支持筛选功能。您可自定义筛选条件，筛选结果将对应展示事项列表。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/01dfa807-175e-4ea4-9ebb-5e7fb4c90678.png)

## 事项导入导出

事项支持批量导入导出功能，可根据筛选条件自定义导出事项，导入导出文件均为 XLSX 格式。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/570234ea-28f4-4586-bd9f-6848b20ab063.png)

## 事项关联

- **关联 MR**

  为方便事项协作，您可在事项中关联该项目代码仓库的 MR，点击链接即可跳转查看 MR 详情。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/b3f4acb4-6e4a-4670-9713-8d94b510362c.png)

- **关联事项**

  为方便事项协作，您可在事项中关联其他事项。需求可根据关联事项的状态，自动计算需求的完成度。

  您可以关联已有事项，也可创建并关联已有事项。查看关联事项时，可快速修改关联事项的处理人或解除关联。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/3f3d02dd-38ae-4c5b-ad95-871aee575b29.png)

  :::tip 提示
  在关联界面快速创建事项时，仅需填写标题和处理人即可。
  :::

## 事项活动日志

事项支持活动日志记录，事项下的任何修改操作都将以活动日志记录，且无法删除。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/6b184e0e-44b9-42fc-9b64-197d1f9867c6.png)

## 事项类型转换

为方便事项协作，您可以转换事项类型，例如将需求事项转换为任务事项，状态默认为初始状态。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/ec853b28-da99-4721-b956-f5c8d54d3bea.png)

## 事项关注

事项支持订阅关注功能，当您关注的事项发生变更时，将收到站内信提醒，及时了解事项动态。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/f21b6bff-c9ba-4e04-8ebb-17e94b836735.png)

## 事项复制

事项支持复制功能，输入新标题即可复制，复制内容不包括活动日志。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/2871bea6-56f0-487c-9a88-7ab2ae605646.png)
