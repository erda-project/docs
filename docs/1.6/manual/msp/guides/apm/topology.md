# 全局拓扑

微服务治理平台可自动发现服务的上下游依赖关系，并生成服务拓扑大图，便于您查看服务的性能瓶颈或系统的错误热点。拓扑图中的各节点代表服务组件或服务的依赖项，且节点上标注有服务的运行状态和请求信息，点击可获取详细节点信息。  

## 节点类型

若系统基于微服务治理平台中的 API 网关转发流量，拓扑图将展示 API 网关节点如下：

<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/a017e07d-798f-4e33-9675-0a491ef41a7f.png" style="zoom:30%" />

平台可自动识别 HTTP 和 RPC 请求，并标注为服务节点如下：

<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/0902d2d5-e8bf-438f-bfdb-fc3aa76fa78b.png" style="zoom:30%" />

平台可自动识别服务调用的中间件，并标注为中间件节点，当前支持 MySQL、Redis、RocketMQ、Elasticsearch 等。

<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/891ff8cb-1ac9-4970-b11c-54afc4eb6d1f.png" style="zoom:30%" />

平台可自动识别服务调用的外部 HTTP 请求，并标注为外部事务节点如下：

<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/6784de08-c803-4996-bc8b-b570340ce878.png" style="zoom:30%" />

服务节点直观展示错误调用情况，红色部分代表错误调用的占比。

<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/09dd07af-d7a3-445a-ae87-edcf31511d2e.png" style="zoom:30%" />

## 拓扑概览和分析

进入拓扑页将默认展示拓扑概览，您可在此查看节点、服务及中间件数量，拓扑分析则展示不健康服务、离群服务和循环依赖数量。点击拓扑概览或拓扑分析中的某个类别，对应节点将高亮显示。拓扑图中节点间的箭头代表调用关系，双向节点则代表相互调用。点击节点将展示该节点当前各项信息指标，例如吞吐量、平均响应时间、错误调用次数、错误率等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/fc2e4985-a81b-473a-97d3-8684a323543d.png)

节点图标直观展示其当前 RPS，您可根据需要设置持续自动刷新或手动刷新。

* **自动刷新**：点击右上角 OFF 按钮，设置自动刷新时间间隔。
* **手动刷新**：点击右上角刷新按钮即可。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/1c09642a-6a24-4796-a3f4-e81af046134e.png)
