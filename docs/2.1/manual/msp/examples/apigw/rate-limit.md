# 配置削峰填谷的限流

## erda.yml 配置

您可以通过 erda.yml 配置削峰填谷的限流，具体请参见 [使用 erda.yml 管理配置](./config.md)。

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

各配置字段的详细说明，请参见 [服务负载保护](../../guides/apigw/policy.md#服务负载保护)。

## 流量入口 API 策略设置

您也可以通过流量入口下的 API 策略进行配置。

具体操作路径如下：

- 全局策略：进入 **微服务治理平台 > 选择项目 > 服务治理 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情 > 全局策略 > 安全策略 > 服务负载保护**。
- 具体 API 策略：进入 **微服务治理平台 > 选择项目 > 服务治理 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情** 后选择对应的 API，点击 **策略 > 安全策略 > 服务负载保护**。

::: tip 提示

如果您已通过 erda.yml 完成了配置，前者将覆盖此处配置。

:::

### 示例一

若需求为：

- 限制流量入口下所有 API 的最大接收请求速率为 100 次/秒。
- 当超过 100 次/秒时，通过增加延迟的方式对请求进行削峰填谷，且延迟不超过 500 毫秒。
- 若削峰填谷后仍超过 100 次/秒，则超出部分的请求返回 429 状态码，HTTP 应答体设置为 “System is busy, please try it later.”。

则配置示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/46ea36ed-b250-472c-8168-392aa6c634d8.png)

### 示例二

若需求为：

- 全局限流的配置与上例相同，但需对特定 URL（*web.playground.erda.cloud/index.html*）做单独配置。
- 当超过限流时，返回 302 状态码，随后跳转至 CDN 静态页面（*cdn.erda.cloud/playground/index.html*）。

则配置示意如下：

1. 选择该 URL 对应的 API 路由配置，点击 **策略**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/2b266b65-e899-467a-a768-3e5af13df6ee.png)

2. 关闭 **使用全局策略**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/2d57ac96-9023-473c-89d7-ead7777e1f86.png)

3. 配置该 API 的专属策略，点击 **提交**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/49e141cf-99a1-41f4-88f0-afb26cbacd80.png)

