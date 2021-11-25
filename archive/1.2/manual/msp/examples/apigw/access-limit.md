# 限制特定 IP 访问

您可以通过流量入口下的 API 策略配置，根据来源 IP 限制访问。

具体操作路径如下：

- 全局策略：进入 **微服务治理平台 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情 > 全局策略 > 安全策略 > IP 拦截**。
- 具体 API 策略：进入 **微服务治理平台 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情** 后选择对应的 API，点击 **策略 > 安全策略 > IP 拦截**。

## 示例一

若需求为：

- 来源 IP 网段命中 42.120.0.0/16 时禁止访问。
- 来源 IP 为 42.121.0.1 时禁止访问。

则配置示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/11/03ba96e8-192f-4eeb-83d6-43ae191e52f3.png)

## 示例二

若需求为：

- 仅允许 10.1.0.0/16 来源的内网 IP 访问。
- 请求链路上将经过其他七层负载均衡设备 ，无法直接使用对端 IP ，需根据请求头中的 [`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) 获取真实 IP。

则配置示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/11/102fef6a-aff3-4a11-98d8-464a944a25e5.png)

## 示例三

若需求为：

* 限制每个 IP 访问时最多建立 20 条并发连接。

* 每个 IP 的请求速率不超过 100 次/秒。

则配置示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/11/a44e524f-6b99-4472-8248-bb0e8d189063.png)

