# 主动监控

主动监控主要用于模拟真实用户访问情况，并对监控结果告警，目前已支持 HTTP 检查方式。通过本文您可以学习如何创建主动监控，并查看其监控数据，从而快速了解并使用主动监控功能。

进入 **微服务平台 > 项目列表 > 选择项目 > 应用监控 > 主动监控**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/3ce75314-5b61-4dd5-b329-c4c6bb4d6593.png)

## 创建主动监控

进入主动监控页后，点击 **添加监控** 进行操作。若指标异常（请求无响应、异常检查不匹配等）则会变更指标状态，同时发出告警。

* **检查方式**：主动监控支持的协议类型，目前仅支持 HTTP。
* **名称**：主动监控名称。

### 基础设置
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/28f81887-a726-42d7-b84f-41e8f2ff5b66.png)
* **URL**：请求的 Web 服务器域名地址，包含 Path。
* **Method**：HTTP 请求方式（GET，POST，HEAD，PUT）。
* **Params**：HTTP 请求的参数，URL 后以 ? 的形式呈现，例如 user?id=。
* **Headers**：HTTP 请求头。
* **Body**：HTTP 请求体数据。

### 高级设置
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/1805b7d0-f6ed-4dae-9177-8c51b95e2472.png)
* **异常检查**：异常触发条件，支持状态码检查、响应体检查。
* **重试次数**：1. HTTP 请求失败时，触发重试； 2. 满足异常检查条件时，触发重试。
* **监控频率**：主动监控探测的时间间隔，默认为 15s。

## 主动监控记录列表
列表页展示检查的状态、在线率、宕机时间等数据，点击对应索引可查看检查详情。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/c01dfde4-ba9f-41c6-ad24-c003c1b816c6.png)

## 主动监控详情
详情页展示 URL 可用性与性能趋势，以及历史可用时间趋势。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/5ceb2eca-1015-4b08-b392-fad28b99c9c5.png)
