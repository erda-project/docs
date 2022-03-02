# 服务总览
进入 **微服务治理平台 > 项目列表 > 选择项目 > 选择环境 > 服务总览**，可查看当前环境下所有服务总览。

## 服务列表

服务列表点击任意服务，可进入对应![服务监控](service-monitor.md)页

![service list](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/5f66b863-6cdf-49c7-b074-9d2a9a809c9b.png)

### TOP 图

* **高流量服务排行（Top5）**：展示一个小时内，基于服务 RPS 倒序 TOP5。
* **低流量服务排行（Top5）**：展示一个小时内，基于服务 RPS 正序 TOP5。
* **慢响应服务排行（Top5）**：展示一个小时内，基于服务所有请求的平均 RT 倒序 TOP5。
* **不健康服务排行（Top5）**：展示一个小时内，基于服务中所有请求的错误率倒序 TOP5。

TOP 图点击任意服务名，可进入对应![服务监控](service-monitor.md)页

### 服务列表展示

概览中分别展示了：
- 服务名称
- 最后活跃时间
- 平均请求量，最大请求量，平均延迟，最大延迟，错误率五项指标

## 拓扑图
![topology](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/cd2c5177-5a50-420b-a60b-cd675d90a16b.png)

### 拓扑概览
* **节点**：拓扑节点总数。
* **服务**：拓扑节点中，服务节点数。
* **中间件**：拓扑节点中，中间件节点数，如 MYSQL ，REDIS ，RocketMQ ，ElasticSearch 等等。
* **外部节点**：拓扑节点中，外部节点数，外部节点为服务请求的外部 URL。

### 拓扑分析
* **不健康服务**：不健康服务节点数。
* **离群服务**：离群服务数量，离群指：与其他节点产出调用请求的服务。
* **循环依赖**：循环依赖服务数，循环依赖指：两个服务节点之间产生了相互调用，如 A -> B 且 B -> A。

### 服务节点选中

![selected service node](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/d4adc7ce-4df4-4be8-8cd6-6475dc5916a5.png)

- **服务名称**
- **类型**：标识拓扑节点类型，已知类型有：服务，MYSQL，Redis，外部服务，API 网关等。
- **卡片图**：平均吞吐量， 平均响应时间，错误调用次数，错误率
- **趋势图**：吞吐量，平均响应时间，错误率，HTTP 状态

