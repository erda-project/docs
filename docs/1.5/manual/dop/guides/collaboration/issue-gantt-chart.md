# 甘特图

在项目协同中，您可以查看事项的甘特图。

进入 **DevOps 平台 > 项目管理 > 项目协同 > 甘特图**

过滤条件： 选择多个迭代，项目成员，标签（默认为当前时间所处的迭代，全部成员和全部标签） 下方甘特图，左侧是事项列表， 按照 需求 任务 缺陷排序，
可以向下滑动。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/63d769af-63fc-4dec-969a-4933b80634ad.png)


## 需求包含任务
需求可以点击左侧展开， 需求下展示其包含的任务，点击需求可以在事项详情页面添加包含的任务。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/83afa754-2862-4b2a-9f48-71777d2f7630.png)

## 计划开始和结束时间

甘特图上方是时间轴，包含需求的任务颜色为蓝色， 其他为白色， 可以左右滑动， 今天有红色的轴来标记。
未在图中显示的时间段在两侧箭头， 可以点击定位到事项

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/2cd41cf5-1484-45ed-8c74-fd72ec821bee.png)

在创建事项时 我们可以指定计划开始和结束时间(截止日期)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/a0b0be50-3f52-4424-9675-7d6b04e4a21d.png)

如果事项没有开始和结束时间， 可以在甘特图中点击并拖动光标来快速创建计划时间
可以通过拖动事项的左右边界来改变事项的开始或结束时间

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/093bb747-6afb-4503-ab08-2fa3e6a4d8f5.png)

或者将光标选中时间来整体拖动， 同时改变开始和结束时间

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/459c1807-d1fc-4e02-bdaa-ff3b0c83081f.png)

当拖动需求包含的任务时， 需求本身会根据任务的改变而联动， 即由所有包含任务的最小开始时间和最大结束时间决定。
