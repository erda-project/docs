# 主动监控

主动监控主要用于模拟真实用户访问情况，并对监控结果告警，目前已支持 HTTP 检查方式。通过本文您可以学习如何创建主动监控，并查看其监控数据，从而快速了解并使用主动监控功能。

进入 **微服务平台 > 项目列表 > 选择项目 > 应用监控 > 主动监控**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/ee921d5b-a2d9-4f05-8862-0ea643cf12aa.png)

## 创建主动监控

进入主动监控页后，点击 **添加监控** 进行操作。若指标异常（请求无响应、异常检查不匹配等）则会变更指标状态，同时发出告警。

* **检查方式**：主动监控支持的协议类型，目前仅支持 HTTP。
* **名称**：主动监控名称。

### 基础设置
<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/08b3ff17-831c-4c89-a96e-e4109b147eb7.png" style="zoom:50%;" />

* **URL**：请求的 Web 服务器域名地址，包含 Path。
* **Method**：HTTP 请求方式（GET，POST，HEAD，PUT）。
* **Params**：HTTP 请求的参数，URL 后以 ? 的形式呈现，例如 user?id=。
* **Headers**：HTTP 请求头。
* **Body**：HTTP 请求体数据。

### 高级设置
<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/1ac1454f-f04b-4901-a492-5a3707936a51.png" style="zoom:50%;" />

* **异常检查**：异常触发条件，支持状态码检查、响应体检查。
* **重试次数**：1. HTTP 请求失败时，触发重试； 2. 满足异常检查条件时，触发重试。
* **监控频率**：主动监控探测的时间间隔，默认为 15s。

## 主动监控记录列表
列表页展示检查的状态、在线率、宕机时间等数据，点击对应索引可查看检查详情。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/ee921d5b-a2d9-4f05-8862-0ea643cf12aa.png)

## 主动监控详情
详情页展示 URL 可用性与性能趋势，以及历史可用时间趋势。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/1423fafd-ad18-40b8-86e8-f46afdaeb967.png)
