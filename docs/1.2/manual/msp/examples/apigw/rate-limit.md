# 配置削峰填谷的限流

## erda.yml 配置

您可以通过 `erda.yml` 配置削峰填谷的限流，具体请参见 [使用 erda.yml 管理配置](./config.md)。

```yaml
      policies:
        rate_limit:
          # 必填字段，每秒最大请求速率
          qps: 100
          # 非必填字段，最大延后处理时间，默认是 500 毫秒，超过速率时不会立即拒绝，进行去峰填谷处理
          max_delay: 500
          # 非必填字段，默认是 429，延后处理后仍然超过速率，会进行拒绝，返回对应的状态码
          deny_status: 429
          # 非必填字段，默认是 server is busy，拒绝时返回的应答
          deny_content: "server is busy"
```

各配置字段的详细说明，请参见 [服务负载保护](../../guides/apigw/policy.md#服务负载保护)

## 流量入口 API 策略设置

您也可以通过流量入口下的 API 策略进行配置。

具体操作路径如下：

- 全局策略：进入 **微服务治理平台 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情 > 全局策略 > 安全策略 > 服务负载保护**。
- 具体 API 策略：进入 **微服务治理平台 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情** 后选择对应的 API，点击 **策略 > 安全策略 > 服务负载保护**。

::: tip 提示

如果您已通过 `erda.yml` 完成了配置，前者将覆盖此处配置。

:::

### 示例一

若需求为：

- 限制流量入口下所有 API 的最大接收请求速率为 100 次/秒。
- 当超过 100 次/秒时，通过增加延迟的方式对请求进行削峰填谷，且延迟不超过 500 毫秒。
- 如削峰填谷后仍超过 100 次/秒，则超出部分的请求返回 429 状态码，HTTP 应答体设置为 “System is busy, please try it later.”。

则配置示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/e78bd432-dde4-4fcc-b01b-f7060e00e8fc.png)

### 示例二

若需求为：

- 全局限流的配置与上例相同，但需对特定 URL（*web.playground.erda.cloud/index.html*）做单独配置。
- 当超过限流时，返回 302 状态码，随后跳转至 CDN 静态页面（*cdn.erda.cloud/playground/index.html*）。

则配置示意如下：

1. 选择该 URL 对应的 API 路由配置，点击 **策略**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/943e43d5-80e7-4721-8ec7-4207e875c3c9.png)

2. 关闭 **使用全局策略**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/a5067e0a-da56-4416-a5de-5b14dc147a67.png)

3. 配置该 API 的专属策略，点击 **提交**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/b5731472-ea8b-471a-8fdf-d8162e856f4d.png)

