# 事项

完成项目创建后，平台即可支持研发项目协作事项管理。

## 事项类型

进入 **DevOps 平台 > 我的项目 > 项目协同 > 全部事项**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/53af73d3-462c-45bd-bc74-2208167e8b80.png)

- **需求**
  即用户需求实现的功能，由产品经理创建，与开发工程师沟通后确认所属迭代、工期等信息。

- **任务**
  由需求拆解而来，一项任务对应一个功能点，任务设定范围不应过大，单项任务完成时间需控制在两天以内。

- **缺陷**
  由测试工程师创建并指派给开发工程师，开发工程师修复后再转回测试工程师进行验证。

- **里程碑**
  里程碑是一种特殊的事项，用于标记产品的重要节点。

## 事项视图

事项提供三种视图效果，适用于不同的使用场景。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a0ee5123-62c7-4f7f-83e4-a31ae629faef.png)

- **列表**

  列表视图将展示标题、优先级、状态、处理人、截止时间等主要信息，可通过下拉菜单选择对事项进行更新，例如修改事项优先级、修改事项处理人等。

  列表视图支持事项筛选，但无法排序，便于浏览事项全貌。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d9634c3a-177e-4e9a-a00e-e30a873996a0.png)

- **看板**

  当前平台提供截止日期、优先级、状态、处理人、自定义五类看板视图。

  看板视图可根据您所选择的视角，对事项进行针对性的分类，例如选择优先级看板，则事项将根据优先级归属于不同的看板。

  您可以通过拖拽事项卡片的方式快速更新事项，也可通过下拉菜单选择更新事项。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/825b20b1-198a-47f0-9a32-ab1b1e235ca7.png)

  您可以通过自定义看板自行设定，根据实际需求将事项进行分类。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6c55465a-73f3-40d4-8256-e3b9d01d62d5.png)

- **甘特图**

  甘特图可直观地展示事项进度，以不同颜色的柱状图体现事项的剩余工时、已用工时和逾期时间，是唯一可在页面上显示事项具体工作时间的视图。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/569c8489-b296-4c95-9586-1db8ac1f7734.png)

## 事项筛选

事项查询支持筛选功能。您可自定义筛选条件，筛选结果将对应展示事项列表。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e472a5f8-f777-4b61-971c-e142ae836071.png)

## 事项导入导出

事项支持批量导入导出功能，可根据筛选条件自定义导出事项，导入导出文件均为 XLSX 格式。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4dd6a608-0602-46ea-9ff8-b41a8abed68d.png)

## 事项关联

- **关联 MR**

  为方便事项协作，您可在事项中关联该项目代码仓库的 MR，点击链接即可跳转查看 MR 详情。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/33302534-d908-45c7-b021-2833632edb88.png)

- **关联事项**

  为方便事项协作，您可在事项中关联其他事项。需求可根据关联事项的状态，自动计算需求的完成度。

  您可以关联已有事项，也可创建并关联已有事项。查看关联事项时，可快速修改关联事项的处理人或解除关联。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/242ccb50-9735-4cdf-b1a6-03d38313f39a.png)

  :::tip 提示
  在关联界面快速创建事项时，仅需填写标题和处理人即可。
  :::

## 事项活动日志

事项支持活动日志记录，事项下的任何修改操作都将以活动日志记录，且无法删除。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/2cf8a216-e31c-4bb9-858c-036ac19c155a.png)

## 事项类型转换

为方便事项协作，您可以转换事项类型，例如将需求事项转换为任务事项，状态默认为初始状态。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/801e67d5-2972-429a-bde4-01eaa3a89016.png)

## 事项关注

事项支持订阅关注功能，当您关注的事项发生变更时，将收到站内信提醒，及时了解事项动态。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/1b4f5a59-666a-4caa-8895-ca4fab067892.png)

## 事项复制

事项支持复制功能，输入新标题即可复制，复制内容不包括活动日志。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f02e0539-013a-4beb-8a24-90f7d79164eb.png)
