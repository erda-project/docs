# 流水线运行

## 执行流水线
进入 **我的应用 > 流水线 > 选择分支和流水线**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/1f297ff6-181e-4a2c-8e4c-326172a71527.png)
点击右上角 **新建流水线**，将生成一条全新的流水线，再点击执行按钮运行流水线。

::: tip 提示
手动触发流水线中所有节点的执行权限全部根据当前执行者的权限决定。
如果是定时流水线，则执行权限根据最后修改流水线yml的用户决定。
:::

## 查看执行状态和结果
您可在界面上查看各个 Action 当前的执行状态，将鼠标悬浮在特定 Action 上可查看相应结果。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/cddfb793-5a04-4f03-a434-365f3e26b557.png)

## 查看 Action 执行日志
点击相应 Action 上的日志按钮可查看其执行日志，还可根据需要下载日志、切换为错误日志等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/4d8d24c1-6885-4a94-9594-b0036ca8ac9f.png)


## 查看 Action 错误日志
点击相应 Action 上的日志按钮可查看其执行日志，点击标准按钮可切换为错误执行日志。

若流水线运行失败，错误日志中将体现具体的错误信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d8225b03-8f46-4a60-b53b-7078d7ef5de7.png)

## 查看历史执行明细
点击右上角的执行记录按钮，可查看历史执行记录。点击相应历史记录后，流水线将切换为该历史记录，您可以查看相应的历史执行明细。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/45480d12-732b-4243-8bdd-4b29cbf8179f.png)

