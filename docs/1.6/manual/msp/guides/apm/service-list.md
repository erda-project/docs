# 服务列表

进入微服务平台，选择项目后将默认进入服务总览的服务列表，此处展示当前环境下所有接入服务，以及该服务近一小时内的关键请求指标。

## 服务查看

在服务列表页，您可查看当前环境下的高流量服务排行、低流量服务排行、慢响应服务排行和不健康服务排行，点击其中任一服务可进入服务监控页。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/b320a4e3-dc30-45fe-a63e-80688577ed92.png)

您还可以查看当前环境下的全部服务、不健康服务和无流量服务。服务以列表形式呈现，展示其名称、吞吐量、延迟和错误率，将鼠标悬停于对应服务可查看具体数据。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/fbb2a81c-2f4e-4bca-bd6d-1eb62795fc29.png)

## 服务监控

点击具体服务后可进入对应服务监控页，在此查看该服务的拓扑图、服务请求概览和服务调用分析排行。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/52cade83-248d-4bd0-b351-a57645525862.png)

服务拓扑展示节点间的调用关系、平均吞吐量、平均响应时间、请求错误率和服务实例数。服务请求概览展示该服务的吞吐量、平均响应时间、HTTP 状态和请求错误率。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/4c7c2ad2-6c25-4696-9cc1-c44de92a4ffe.png)

服务调用分析展示服务的高吞吐量接口、慢响应接口、错误接口、外部接口调用、慢响应 SQL 和异常类型的 Top 5 排行。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/1ea6d3b3-8860-4be4-808e-1b24f3796cbf.png)

点击调用监控页签，可查看服务的事务详情，包括 HTTP 事务、RPC 事务、缓存和数据库事务等，

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/68a7fbe8-6100-4358-8251-08e43f547136.png)

