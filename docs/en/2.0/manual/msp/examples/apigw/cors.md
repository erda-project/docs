# Cross-Domain Access to API

## Configure erda.yml

You can configure cross-domain access restrictions through erda.yml. For details, see [Use erda.yml to Manage Configuration](./config.md).

```yaml
policies:
cors:
  # Required, when it is any, allows cross-domain access of any domain name
  allow_origins: any
  # Optional, the default is any, allowing HTTP method to be any type
  allow_methods: any
  # Optional, the default is any, allowing HTTP header to be any field
  allow_headers: any
  # Optional, the default is true, allowing cookie fields to be transmitted across domains
  allow_credentials: true
  # Optional, the default is 86400, which is the valid time after a successful cross-domain preflight request
  max_age: 86400
```

## Configure API Policies

You can also configure it via API policies of endpoints.

The path is as follows:

- Global strategy: Go to **Microservice Platform > Select Project > Service Management > API Gateway > Endpoints**, select an endpoint, and click **Details > Global Strategy > Business Strategy > Cross-Domain Access**.
- Strategy for a specific API: Go to **Microservice Platform > Select Project > Service Management > API Gateway > Endpoints**, select an endpoint, click **Details**, select an API, and click **Strategy > Business Strategy > Cross-Domain Access**.

:::tip Tips

If you have finished the configuration by erda.yml, the former will overwrite the configuration here.

:::

### Example 1

If the requirement is:

- Allow all external sites to call any HTTP method.
- Allow access to open API without cookies and prohibit cookie passthrough from external sites to ensure security.

The configuration is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/84c6d01b-b78f-4aa0-9b07-2fae807ab77a.png)

If you use erda.yml, the configuration is as follows:

```yaml
policies:
  cors:
    allow_origins: any
    allow_methods: any
    allow_headers: any
    allow_credentials: false
```

### Example 2

If the requirement is to only allow access of site that matches _\*.example.com_ and can call any method with cookies, you should disable the cross-domain access policy first and then complete [Custom Nginx Configuration](../../guides/apigw/policy.md#Custom-Nginx-Configuration).

1. Disable the cross-domain access policy.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/e70f781c-980d-4afa-af4f-e6a711c56b2f.png)

2. Enable Nginx custom configuration.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/01cf4615-eceb-48e4-9153-f7ac4a6ccbf6.png)

3. The Nginx configuration is as follows:

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
