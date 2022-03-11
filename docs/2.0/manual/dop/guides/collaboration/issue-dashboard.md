# 统计

在项目协作中，您可以查看事项的缺陷统计情况。

进入 **DevOps 平台 > 项目管理 > 效能度量 > 缺陷**，选择单个或多个迭代，也可以选择目标成员（默认为全部迭代和全部成员），下方将提示统计数据的具体时间。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/860a16df-e58e-441f-8a70-8aaf06f9e179.png)

统计结果中可查看筛选条件下的缺陷统计数据，包括缺陷总数、未关闭、已到期、本日截止、明日截止、本周截止、本月截止、未指定截止日期、重新打开（缺陷被重新打开的次数）等数据。

## 趋势图
三条不同颜色的曲线分别代表新增、关闭和未关闭缺陷的走势，点击下方文字说明可隐藏/显示对应的缺陷趋势。横坐标的时间默认为近一个月，右上角可根据优先级、复杂度、严重程度和时间区间过滤缺陷。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/74fe5955-6f99-4721-a037-db510f5526a6.png)


## 柱状图
* 缺陷按迭代/状态分布
  
  当选择多个迭代时，图表将根据筛选条件（优先级、复杂度、严重程度、状态和引入源）依次展示所选迭代的数据。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/fea04401-d668-4ce1-8bb3-10839f98698a.png)

* 缺陷按标签/未关闭缺陷的处理人分布（Top 500）等
  
  横向的柱状代表缺陷个数，不同颜色分别对应右上角的各类搜索条件，项目较多时可通过右侧的滑框调整位置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/ed6def07-07b6-447d-b960-bb2c00e75267.png)

## 饼状图
图表分别展示不同状态缺陷所占的百分比。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/caef7c82-ab38-4fb7-981b-c938089436ca.png)

## 散点图
图表上的圆点代表缺陷，两条坐标轴分别代表平均解决和响应时间，支持根据缺陷的类型进行过滤。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/18/7d4f5b00-8b9c-48ab-9c1b-e510001415d2.png)
