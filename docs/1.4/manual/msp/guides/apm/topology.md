# 全局拓扑

微服务治理平台能够自动发现服务的上下游依赖关系，并生成服务拓扑大图，便于您查看服务的性能瓶颈或系统的错误热点。拓扑图上的每个节点表示服务组件或服务的依赖项，且节点上标注有服务的运行状态和请求信息，点击后可获取详细的观测图表。

## API 网关
如果您基于微服务治理平台中的 API 网关转发流量，拓扑图中将显示 API 网关节点。点击该节点，右侧的观测图表将切换至该网关的域名请求、整体请求 QPS 和响应时间。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/5675c9f0-ca3c-49cf-886c-35867feb019a.png)

## 应用服务
平台可自动识别 HTTP 和 RPC 请求，并标注为服务节点。业务服务的节点上可查看服务的运行实例、所选时间段内已停止实例和请求错误率等状态数据，点击该节点，观测图表将切换至服务的状态概览、事务分析等数据，点击详情可跳转至 [服务分析](./service-analysis.md) 页面。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/7d7dcc97-6530-4ad9-8998-6993b7e8445b.png)

## 中间件
平台可自动识别服务调用的中间件，并标注为中间件节点，当前支持 MySQL、Redis、RocketMQ、Elasticsearch 等。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/fd504b53-cf8f-4cf2-8f2c-90d660347adb.png)

## 外部请求调用
平台可自动识别服务调用的外部 HTTP 请求，并标注为外部事务节点，点击该节点将切换至外部请求的 QPS 和吞吐量等观测数据。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/7ce102a4-3696-490e-bb25-7209da7f80d9.png)

