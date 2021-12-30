# 全局拓扑

## 简介
微服务治理平台能够自动发现服务的上下游依赖关系，并生成服务拓扑大图，便于您查看服务的性能瓶颈或系统的错误热点。拓扑图上的每个节点表示服务组件或服务的依赖项，且节点上标注有服务的运行状态和请求信息，点击后可获取详细的节点信息。  

## 节点类型说明
如果系统基于微服务治理平台中的 API 网关转发流量，拓扑图中将显示 API 网关节点，如下图所示:  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/30/c1b5ef89-2bac-471e-b728-46dd866f298e.png)

平台可自动识别 HTTP 和 RPC 请求，并标注为服务节点，如下图所示:  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/30/532854e7-41b6-473f-a282-42854673ae8f.png)

平台可自动识别服务调用的中间件，并标注为中间件节点，当前支持 MySQL、Redis、RocketMQ、Elasticsearch 等，如下图所示:  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/30/88bb6851-ae64-41de-a314-e6e6b63566c7.png)

平台可自动识别服务调用的外部 HTTP 请求，并标注为外部事务节点，如下图所示:  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/30/574fa54e-a28b-4b6c-a80d-e189a9582c4d.png)

服务节点直观表示错误调用情况，其红色部分代表错误调用的占比，如下图所示:  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/30/f2b23dac-3536-43ce-a96d-eb1cf86d5390.png)

用户进入拓扑后默认打开拓扑概况，用户可以手动点击右侧按钮收起，在拓扑概览中用户可以看到节点数、服务数和中间件个数；在拓扑分析中用户可以看到不健康服务个数、离群服务个数和循环依赖个数。用户点击拓扑概览或者拓扑分析中具体的类别会高亮显示对应的节点。拓扑图中节点与节点之间的箭头表示调用关系，双向节点表示相互有调用关系。鼠标点击节点时可显示当前节点的各项信息指标，如调用次数、平均响应时间（ms）、错误调用次数、错误率等。如图所示：  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/30/ea4eb14d-4a3d-44c1-b267-faabc00313be.png)

节点图标直观展示其当前 RPS，可设置持续自动刷新或手动刷新，用户若要设置自动刷新可以在有伤角将OFF改为希望的刷新间隔；手动刷新用户只需点击右上角的刷新按钮。如图所示:  
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/30/6a65d450-19e9-471b-a6a3-8ef60ea744f4.png)
