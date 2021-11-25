# 流水线运行

## 执行流水线
进入 **DevOps 平台 > 我的应用 > 选择应用 > 流水线 > 选择分支 > 执行明细**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/dd72e9a9-d490-4659-be34-b49099e9be7d.png)
在左侧选择相应流水线后，点击右上角 **新建流水线**，将随即生成一条全新的流水线，再点击执行按钮运行流水线。

## 查看执行状态和结果
您可在界面上查看各个 Action 当前的执行状态，将鼠标悬浮在特定 Action 上可查看相应结果。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/1990b54b-50fb-4b49-95d6-983964465ba8.png)

## 查看 Action 执行日志
点击相应 Action 上的日志按钮可查看其执行日志，还可根据需要下载日志、切换为错误日志等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/455055a2-4c14-4606-a6b4-64f1265d5abd.png)


## 查看 Action 错误日志
点击相应 Action 上的日志按钮可查看其执行日志，点击标准按钮可切换为错误执行日志。

若流水线运行失败，错误日志中将体现具体的错误信息。


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d8225b03-8f46-4a60-b53b-7078d7ef5de7.png)

## 查看历史执行明细
点击右上角的执行记录按钮，可看到历史执行记录。点击相应历史记录后，流水线将切换为该历史记录，您可以查看相应的历史执行明细。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/274b0da5-4720-4d73-9394-68e236c03fe3.png)

## 重试流水线
在执行完成当前流水线后，右上角的执行将变成重试按钮
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/d35fca04-772b-4243-b6ff-3dab1087cbc8.png
)
点击右上角的重试全流程按钮将重试全流程并且是在commit不变的情况下

在当前流水线执行失败时，还可以选择执行重试失败节点在不重复执行前面成功节点的情况下

## 定时流水线
定时流水线是指按照预先配置的执行计划，定时触发并执行的流水线。(更多有关定时的内容可以查看[定时流水线](https://docs.erda.cloud/1.2/manual/deploy/pipeline.html#%E5%AE%9A%E6%97%B6%E6%B5%81%E6%B0%B4%E7%BA%BF))
在设定定时配置的情况下，流水线将在某个时间节点开始周期的执行，这时候点击右上角的执行记录可以看到所有的历史执行记录
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/f26d79a8-a9df-4b5e-9584-7e060a27e164.png)
图表左边的`闹钟`表示执行的是定时流水线