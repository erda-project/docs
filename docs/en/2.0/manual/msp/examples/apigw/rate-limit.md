# Configure Traffic Limiting for Load Shifting

## Configure dice.yml

You can configure traffic limiting of load shifting through dice.yml. For details, see [Use dice.yml to Manage Configuration](./config.md).

```yaml
      policies:
        rate_limit:
          # Required, the maximum request rate per second
          qps: 100
          # Optional, the maximum delay processing time, and the default is 500 milliseconds. It will not be rejected immediately when the rate is exceeded, and will be processed for load shifting.
          max_delay: 500
          # Optional, the default is 429. If the rate is still exceeded after delay processing, it will be rejected and the corresponding status code will be returned.
          deny_status: 429
          # Optional, the default is server is busy as the response returned when rejected
          deny_content: "server is busy"
```

For more information on configured fields, see [Service Load Protection](../../guides/apigw/policy.md#Service-Load-Protection).

## Configure API Policies

You can also configure it via API policies of endpoints.

The path is as follows:

- Global strategy: Go to **Microservice Platform > Select Project > Service Management > API Gateway > Endpoints**, select an endpoint, and click **Details > Global Strategy > Security Strategy > Service Load Protection**.
- Strategy for a specific API: Go to **Microservice Platform > Select Project > Service Management > API Gateway > Endpoints**, select an endpoint, click **Details**, select an API, and click **Strategy > Security Strategy > Service Load Protection**.

:::tip Tips

If you have finished the configuration by dice.yml, the former will overwrite the configuration here.

:::

### Example 1

If the requirement is:

- Limit the maximum receiving request rate of all APIs under the endpoint to 100 times/second.
- When it exceeds 100 times/second, add extra delay for load shifting which does not exceed 500 milliseconds.
- If it still exceeds 100 times/second after load shifting, the exceeding part of the request will return 429 status code, and the HTTP response body is set as "System is busy, please try it later.".

The configuration is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/ab304ac2-adc0-46b0-a632-31e85a09333a.png)

### Example 2

If the requirement is:

- The configuration of global traffic limiting is the same as the example 1, but the specific URL (*web.playground.erda.cloud/index.html*) requires configuration separately.
- When the traffic limiting is exceeded, it returns 302 status code and goes to the CDN static page (*cdn.erda.cloud/playground/index.html*).

The configuration is as follows:

1. Select the API and click **Strategy**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/9983a8e1-c950-4504-aa11-00bdd7d8614e.png)

2. Disable **Global Strategy**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/8a115939-5288-4cd8-855d-593fc7f205f1.png)

3. Configure strategy for this API and click **Submit**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/4662f5db-0447-4e67-9468-1cca1cf3c2a6.png)

