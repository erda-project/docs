# 限制特定 IP 访问

您可以通过流量入口下的 API 策略配置，根据来源 IP 限制访问。

具体操作路径如下：

- 全局策略：进入 **微服务治理平台 > 选择项目 > 服务治理 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情 > 全局策略 > 安全策略 > IP 拦截**。
- 具体 API 策略：进入 **微服务治理平台 > 选择项目 > 服务治理 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情** 后选择对应的 API，点击 **策略 > 安全策略 > IP 拦截**。

## 示例一

若需求为：

- 来源 IP 网段命中 42.120.0.0/16 时禁止访问。
- 来源 IP 为 42.121.0.1 时禁止访问。

则配置示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/49f8e961-45eb-4ce6-84e0-9fe7238e4982.png)

## 示例二

若需求为：

- 仅允许 10.1.0.0/16 来源的内网 IP 访问。
- 请求链路上将经过其他七层负载均衡设备，无法直接使用对端 IP，需根据请求头中的 [`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) 获取真实 IP。

则配置示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/0f135f1f-4f2e-4d20-942b-196f4754ba15.png)

## 示例三

若需求为：

* 限制每个 IP 访问时最多建立 20 条并发连接。
* 每个 IP 的请求速率不超过 100 次/秒。

则配置示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/276e5df8-f418-4dc9-8849-5a095b44663f.png)

