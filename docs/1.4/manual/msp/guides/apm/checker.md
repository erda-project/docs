# 主动监控

主动监控主要用于模拟真实用户访问情况，并对监控结果告警，目前已支持 HTTP 检查方式。
通过本文您可以快速创建主动监控，并查看其监控数据，以便您快速了解并使用主动监控功能。

进入 **微服务治理平台 > 项目列表 > 选择项目 > 应用监控 > 主动监控**

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/05/afd77269-3248-42de-91d6-c6e3e0909397.png)

## 创建主动监控

进入主动监控页后，点击添加监控，若指标异常（请求无响应、异常检查不匹配等）则会变更指标状态，同时发出告警。

|  参数   | 描述  |
|  ----  | ----  |
| 检查方式  | 主动监控支持的协议类型，目前只支持 http |
| 名称  | 主动监控名称 |

### http 协议主动监控相关参数

#### 基础设置
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/05/8bd3ba85-cca0-46a9-8ca0-caed727bbb8b.png)

|  参数   | 描述  |
|  ----  | ----  |
| URL  | 请求的 web 服务器域名地址, 包含 path |
| Method  | Http 请求方式。取值（GET,POST,HEAD,PUT） |
| Params  | Http 请求的参数，URL后面以 ？ 的形式，例：user？id=<id> |
| Headers  | Http 请求头 |
| Body  | Http 请求体数据 |

#### 高级设置

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/05/f202d8d1-01f1-4010-be87-79085a8e1b5f.png)

|  参数   | 描述  |
|  ----  | ----  |
| 异常检查  | 异常触发条件，支持状态码检查、响应体检查 |
| 重试次数 | 结合异常检查： 1. http 请求失败时，触发重试； 2. 满足异常检查条件时，触发重试 |
| 监控频率  | 主动监控探测的时间间隔，默认 15s |

## 主动监控记录列表
列表页展示检查的状态、在线率、宕机时间等数据，点击对应索引可查看检查详情。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/c01dfde4-ba9f-41c6-ad24-c003c1b816c6.png)

## 主动监控详情
详情页展示 URL 可用性与性能趋势，以及历史可用时间趋势。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/05/3375de08-5fee-4e04-b0b3-740c87f09d1f.png)