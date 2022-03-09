# 自定义 HTTP Header

您可以通过流量入口下的 API 策略配置，灵活控制转发请求头及后端的应答头。

具体操作路径如下：

- 全局策略：进入 **微服务治理平台 > 选择项目 > 服务治理 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情 > 全局策略 > 业务策略 > 自定义 Nginx 配置**。
- 具体 API 策略：进入 **微服务治理平台 > 选择项目 > 服务治理 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情** 后选择对应的 API，点击 **策略 > 业务策略 > 自定义 Nginx 配置**。

## 自定义 Nginx 配置是什么

此处配置的 Nginx 原生配置片段，将转化为 API 对应的 Nginx Location 区块内的配置。

配置需严格按照 Nginx 的语法操作（例如每行结束有 `;`），且无法配置 `location / {}` 字样的路由块，仅支持 `context` 中包含 `location` 的指令配置。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/43f380df-2961-4ba6-a8e3-a32c5c893bd3.png)

更多 Nginx 配置项信息，请参见 [Nginx 配置指令列表](https://nginx.org/en/docs/dirindex.html)。

## 配置示例

### 示例一

若需求为通过配置 [HSTS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Strict-Transport-Security) 应答头，使浏览器强制跳转 HTTPS，且不允许忽略不安全的证书，则配置示意如下：

```bash
more_set_headers Strict-Transport-Security "max-age=86400";
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/eae7178b-0148-4ae5-947c-55854bf3c85e.png)


### 示例二

若需求为：

- 请求转发给后端时添加请求头 `X-From-Where: XXX`。
- 移除请求头 `Accept-Encoding`。

则配置示意如下：

```bash
proxy_set_header X-From-Where "XXX";
proxy_set_header Accept-Encoding "";
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/844ddbb6-b742-4673-8a7c-85b19b67261d.png)
