# 跨域访问 API

## dice.yml 配置

您可以通过 dice.yml 配置跨域访问限制，具体请参见 [使用 dice.yml 管理配置](./config.md)。

```yaml
policies:
cors:
  # 必填字段，当为 any 时，允许 origin 是任何域名进行跨域访问
  allow_origins: any
  # 非必填，默认是 any，允许 http method 是任何类型
  allow_methods: any
  # 非必填，默认是 any，允许 http header 是任何字段
  allow_headers: any
  # 非必填，默认是 true，允许 cookie 字段跨域传输
  allow_credentials: true
  # 非必填，默认是 86400，跨域预检请求一次成功后的有效时间
  max_age: 86400
```

## 流量入口 API 策略设置

您也可以通过流量入口下的 API 策略进行配置。

具体操作路径如下：

- 全局策略：进入 **微服务治理平台 > 选择项目 > 服务治理 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情 > 全局策略 > 业务策略 > 跨域访问**。
- 具体 API 策略：进入 **微服务治理平台 > 选择项目 > 服务治理 > API 网关 > 流量入口管理**，选择对应的流量入口，点击 **详情** 后选择对应的 API，点击 **策略 > 业务策略 > 跨域访问**。

::: tip 提示

如果您已通过 dice.yml 完成了配置，前者将覆盖此处配置。

:::

### 示例一

若需求为：

- 允许所有外部站点调用任意 HTTP 方法。
- 开放的 API 无需携带 Cookie 即可访问，禁止来自外部站点的 Cookie 透传以保障安全。

则配置示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/c7004b82-9a5d-4081-8ad4-202d32771901.png)

若使用 dice.yml 配置，则配置信息如下：

```yaml
policies:
  cors:
    allow_origins: any
    allow_methods: any
    allow_headers: any
    allow_credentials: false
```

### 示例二

若需求为仅允许域名符合 \*_.example.com_ 的站点访问，可调用任意方法，可携带 Cookie，则需先关闭跨域访问策略，再通过 [自定义 Nginx 配置](../../guides/apigw/policy.md#自定义-nginx-配置) 实现。

1. 关闭跨域访问策略。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/aba80c8f-9b71-4ff0-90ad-3cafaad5cd01.png)

2. 开启 Nginx 自定义配置。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/b8c975d4-04e5-4525-8ad6-a55cc0842d2a.png)

3. Nginx 配置示意如下：

   ```bash
   set $methodandorigin $request_method$http_origin;
   
   if ($http_origin ~* 'https?://.*\.example\.com$') {
       more_set_headers 'Access-Control-Allow-Origin: $http_origin';
       more_set_headers 'Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS';
       more_set_headers 'Access-Control-Allow-Credentials: true';
   }
   
   if ($methodandorigin ~* '^OPTIONS-https?://.*\.example\.com$') {
       more_set_headers 'Access-Control-Allow-Origin: $http_origin';
       more_set_headers 'Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS';
       more_set_headers 'Access-Control-Allow-Headers: $http_access_control_request_headers';
       more_set_headers 'Access-Control-Allow-Credentials: true';
       more_set_headers 'Access-Control-Max-Age: 86400';
       more_set_headers 'Content-Type: text/plain charset=UTF-8';
       more_set_headers 'Content-Length: 0';
       return 200;
   }
   ```
