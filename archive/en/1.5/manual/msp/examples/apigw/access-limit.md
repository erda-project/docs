# Restrict Access of Specific IP

You can configure it via API policies of endpoints to restrict access based on the source IP.

The path is as follows:

- Global strategy: Go to **Microservice Platform > Project List > Select Project > API Gateway > Endpoints**, select an endpoint, and click **Details > Global Strategy > Security Strategy > IP Blocking**.
- Strategy for a specific API: Go to **Microservice Platform > Project List > Select Project > API Gateway > Endpoints**, select an endpoint, click **Details**, select an API, and click **Strategy > Security Strategy > IP Blocking**.

## Example 1

If the requirement is:

- Access denied when the source IP meets 42.120.0.0/16.
- Access denied when the source IP is 42.121.0.1.

The configuration is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/07cd517c-2a31-41bc-a7f8-8c8cc7f25f30.png)

## Example 2

If the requirement is:

- Access allowed only for the intranet IP that meets 10.1.0.0/16.
- The request link will go through other seven-layer load balancers with peer IP cannot be used directly. Obtain the real IP according to the [`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) in the request header.

The configuration is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/99e8dc8e-5d63-4576-a588-c93533ffa619.png)

## Example 3

If the requirement is:

* Up to 20 concurrent connections allowed for each IP.
* The request rate of each IP does not exceed 100 times/second.

The configuration is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/bfbc08db-5276-4a4f-9865-598448f6fb09.png)

