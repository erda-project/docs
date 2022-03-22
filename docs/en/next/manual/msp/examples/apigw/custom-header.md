# Custom HTTP Header

You can configure it via API policies of endpoints to manage the forwarding request header and the back-end response header.

The path is as follows:

- Global strategy: Go to **Microservice Platform > Select Project > Service Management > API Gateway > Endpoints**, select an endpoint, and click **Details > Global Strategy > Business Strategy > Custom Nginx Configuration**.
- Strategy for a specific API: Go to **Microservice Platform > Select Project > Service Management > API Gateway > Endpoints**, select an endpoint, click **Details**, select an API, and click **Strategy > Business Strategy > Custom Nginx Configuration**.

## What Is Custom Nginx Configuration

The native Nginx parts configured here will be converted into the configuration in the Nginx location block corresponding to the API.

The configuration must follow the Nginx grammar (for example, each line ends with `;`), and cannot configure routing blocks with `location / {}`, with only instruction configuration containing `location` in `context` supported.

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/43f380df-2961-4ba6-a8e3-a32c5c893bd3.png)

For more information on Nginx configuration items, see [Nginx Directives](https://nginx.org/en/docs/dirindex.html).

## Examples

### Example 1

If the requirement is to configure the [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) response header to support force HTTPS, and it is not allowed to ignore insecure certificates, then the configuration is as follows:

```bash
more_set_headers Strict-Transport-Security "max-age=86400";
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/ccf3e08d-d14d-4c6a-94dc-288c26e87032.png)


### Example 2

If the requirement is:

- Add the request header `X-From-Where: XXX` when forwarding the request to the backend.
- Remove the request header `Accept-Encoding`.

The configuration is as follows:

```bash
proxy_set_header X-From-Where "XXX";
proxy_set_header Accept-Encoding "";
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/83bff368-cc8f-443f-933b-c4dbefb4592d.png)
