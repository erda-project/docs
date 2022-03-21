# API Policy

You can configure API policies via endpoints, including global strategy and strategy for a specific API.

- Global Strategy

   The global strategy is effective for all APIs.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/b98f2d23-6e0c-4d54-8b3d-d2b226b0eb3c.png)

- Strategy for a Specific API

   Configure for a specific API and the strategy only takes effect for this API.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/74e3c20e-02d9-4477-8426-64576e546620.png)

When configuring an API policy, you can use global strategy for a certain strategy or configure it separately.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/24ad9b00-800b-4d77-bce5-5712404c2662.png)

::: tip Tips
If the **Global Strategy** is enabled, the page will display the global configuration, which takes effect after submitting.
:::

## Traffic Receiving and Forwarding

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/a3683806-0639-4e34-9a4d-66f40c3b1d0c.png)

* **Force jump to HTTPS**

   To manage specific domain names or APIs to force redirect or not redirect to HTTPS.

   :::tip Tips

   If you have set force redirect to HTTPS in SLB, the configuration here will not take effect.

   :::

* **Domain name passthrough**

   When the strategy is disabled or the default configuration is used, the `Host` header of the request received by the back-end service is the forwarding address filled in when creating the API, and the domain name accessed by the client can be obtained via the `X-Forwarded-Host` request header.

   If the back-end service wants to obtain the domain name directly from the `Host` header, please enable domain name passthrough.

* **Request/response buffer**

   When the strategy is enabled or the default configuration is used, the gateway will set up buffers for client requests and back-end responses respectively.

   The request buffer is used to receive the complete HTTP request of the client and forward it to the back-end service, so that when the upstream network is slow, it avoids building longtime connections with the back-end service and reduces much pressure. The response buffer is to receive the response returned by the back-end at one time. When the downstream network is slow, it can also avoid building longtime connections with the back-end service.

   If you want the backend to receive the first byte of the request from the client immediately, please disable the request buffer. If you want the client to immediately receive the first byte of the response from the server (TTFB optimized), please disable the response buffer.

* **Client request restrictions**

   When the body size of the HTTP request exceeds the limit, an error of HTTP 413 request entity too large will be returned.

* **Timeout setting**
   * Client request timeout: Timeout for the gateway to receive client requests.
   * Client response timeout: Timeout for the gateway to send a response to the client.
   * Back-end connection timeout: Timeout for the gateway to build a connection with the back-end service.
   * Back-end request timeout: Timeout for the gateway to send a request to the back-end service.
   * Back-end response timeout: Timeout for the gateway to receive response of the back-end service.

## Cross-Domain Access

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/d935a3bd-ca15-4872-8117-6648d45d1bd8.png)

| Item | Description |
| :--------------- | :----------------------------------------------------------- |
| Allowed HTTP methods | As the value of cross-domain response header `Access-Control-Allow-Methods` |
| Allowed HTTP request headers | As the value of the cross-domain response header `Access-Control-Allow-Headers` (do not configure it as a wildcard character “*” due to the browser compatibility)  |
| Allowed cross-domain addresses | As the value of the cross-domain response header `Access-Control-Allow-Origin` |
| Allow to carry cookie | Whether to set the cross-domain response header `Access-Control-Allow-Credentials` as true |
| Preflight request cache time | As the value of the cross-domain response header `Access-Control-Max-Age` |

:::tip Tips

* The default value for allowed cross-domain address: `$from_request_origin_or_referer`. This variable means to obtain the cross-domain address from the request header `Origin` first. If it fails, obtain from the request header `Referer`. If it still fails, the value will be "*".

* The default value for allowed HTTP request header: `$http_access_control_request_headers`. This variable means to take the value of the request header `Access-Control-Request-Headers` as the value of the response header.

* The default values provided above help solve cross-domain business problems, with low security. For production environments, it is recommended to configure an accurate domain name for `Access-Control-Allow-Origin` to avoid cross-domain risks.

:::

## Custom Nginx Configuration

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/f1ca1479-eda0-4971-8ef9-2b40846fa2d9.png)

The platform supports command configuration for all location blocks of Nginx. For details, see [Nginx Documentation](http://nginx.org/en/docs/dirindex.html).

**Example 1: Add HTTP response header of the client**

```bash
add_header hello world;
```
After adding this configuration, `hello:world` will be added to the HTTP response header received by the client.

**Example 2: Add HTTP request header to the back-end service**

```bash
proxy_set_header hello world;
```
After adding this configuration, `hello:world` will be added to the HTTP request header received by the back-end service.

:::tip Tips

* For setting custom response header, it is recommended to use the command `more_set_headers` instead of `add_header` to cover the response header rather than appending.

* Configuration command: `more_set_headers "hello: world";`. For details, see [more_set_headers](https://github.com/openresty/headers-more-nginx-module#more_set_headers).

:::

## IP Blocking

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/f96d9233-809f-4290-95da-c056dce845d1.png)

* **User IP source**

   If the client is directly connected to the gateway, or the SLB is configured with TCP protocol forwarding, you can use the peer IP address to identify the user IP. If the SLB is configured with HTTP/HTTPS protocol forwarding, get the user IP from the request header `x-forwarded-for`.

* **IP black and white list**
   * Blacklist mode: Return 403 status code when accessing the IP in the list.
   * Whitelist mode: Return 403 status code when accessing the IP outside the list.

* **CC protection**

   For the user IP, calculate the number of concurrent connections and request rate of each IP, and return 503 status code if it exceeds.

   The request rate here is calculated based on the interval between two consecutive requests. For example, configure it as 10 requests/minute. If the interval between two requests is less than 6 seconds, 503 will be returned.

## Service Load Protection

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/4e15b959-05e5-4948-ba5f-db69cfc41ad5.png)

* **Maximum throughput**

   The gateway measures service throughput in milliseconds. For example, the maximum throughput is 10 times per second, which means that only 1 request can pass every 100ms. If the time of the current request arriving at the gateway is less than 100ms from the previous request, the gateway will consider that the current request rate has exceeded the service throughput.

* **Maximum extra delay**

   Configuring the maximum extra delay allows the gateway not to reject the request immediately when it determines that the request rate exceeds the throughput, but to place the request in a queue and forward it to the back-end service with a delay, to achieve load shifting of the traffic.

   The actual delayed forwarding time of the request depends on the current queue length, and the configured maximum extra delay determines the maximum length of the queue.

   For example, the maximum throughput is 10 times per second, and the maximum extra delay is 500ms, then the actual queue length is 10 * 0.5 = 5 (times). If 7 requests are received consecutively within 100ms, as the time interval between requests is less than 100ms, which exceeds the limited throughput rate, the 2nd to 6th requests will queue up, and a delay of 100ms, 200ms, 300ms, 400ms, 500ms will be added in sequence. At this time the queue is full, and the 7th request will be denied access directly.

   :::warning Warning

   1. The gateway calculates throughput and delay in milliseconds. Therefore, if the request interval is less than 1ms, that is, the configured throughput is greater than 1000 times per second, there may be some errors in the calculation of load shifting (add extra delay to requests that do not exceed the maximum throughput), which can be reduced by expanding the gateway nodes. For example, 10 gateway nodes can ensure the accuracy of load shifting in a scenario of 10,000 times per second.
   2. The maximum extra delay determines the maximum length of the queue, and the maximum length of the queue determines the size of the instantaneous concurrency value supported. In the above example, the queue length is 5, which makes the 7th request received within 100ms denied. If all the requests within 1s arrive within 100ms, in fact, only 6 requests can pass in 1s, which is inconsistent with the expectation of 10 times per second. Configure the maximum extra delay as 1 second to ensure that the traffic limiting mechanism of the gateway can meet expectations in any scenario.
   3. After Erda 1.3, if user sets the maximum extra delay as 0, the gateway will not add extra delay to requests that exceed the maximum throughput rate, and set the instantaneous concurrency upper limit the same as the maximum throughput (to meet user expectations). Such settings can be used in business scenarios that are relatively sensitive to delay. Please note that at this time the traffic limiting cannot make load shifting for the traffic, and the instantaneous concurrency also brings the risk of back-end service breakdown.

   :::

* **Custom status code and response**

   When the request rate received by the gateway exceeds the throughput rate, the gateway will return the client reject status code and reject response according to the configuration.

   When the reject status code is not 3xx, the reject response will be returned as an HTTP body; when the reject status code is 3xx, the reject response needs to be configured with an HTTP address to redirect the rejected request.

   For example, design a user-friendly static page of "Try it later" on the CDN, and configure the reject status code as 302 and the reject response as the CDN link of the static page.

## Cross-Site Protection (CSRF Verification)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/eae1e860-37bc-460f-bab9-3155e2784fc0.png)

Malicious scripts are triggered when users visit malicious websites. Cross-site attacks can initiate a request to modify user information without user's perception. Since the browser records the user cookie, the request can be successfully authenticated and maliciously tamper with user information. See details below:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/58e74b29-6e2c-4c44-8c9c-7e997368baf2.png)

After the cross-site protection is enabled, a CSRF token will be generated when the user logs in successfully, and at the same time, with the front-end transformation, all requests will carry the CSRF token. The gateway receives the request and checks the CSRF token. Only confirm that the token belongs to the current user, will the request be forwarded to the backend. See details below:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/d732eb37-4cb1-4311-8a11-63829dc48ff7.png)

| Item | Description |
| :--------------------- | :----------------------------------------------------------- |
| Cookie name to identify user | It is used to generate CSRF token. If the cookie is not carried, CSRF verification will not be performed. When the cookie is expired, it must be cleared to avoid login error caused by missing CSRF token. |
| HTTP method to disable verification | For this request method, CSRF verification will be skipped, but cookie of CSRF token will still be generated. |
| Token name | The gateway sets the generated CSRF token in the cookie of this name, and the frontend obtains the CSRF token from the cookie, and initiate a request with the token in the request header of the same name. |
| Effective domain name of token cookie | If not filled in, only the domain name that initiates the request generates cookie of CSRF token. |
| Enable secure for cookie | With secure enabled, all HTTP requests cannot pass CSRF verification. |
| Expiration time of token | Expired tokens will not pass verification. |
| Update cycle of token | The token carried by the request will be reissued if the issuance time exceeds the update cycle. |
| Status code of verification failure | HTTP status code returned when CSRF verification fails. |
| Response to verification failure | HTTP response returned when CSRF verification fails. |



