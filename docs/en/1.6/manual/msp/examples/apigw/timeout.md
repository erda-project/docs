# Set Read and Write Timeouts and Transfer Limits for the Interface

You can configure it via API policies of endpoints.

The path is as follows:

- Global strategy: Go to **Microservice Platform > Select Project > Service Management > API Gateway > Endpoints**, select an endpoint, and click **Details > Global Strategy > Business Strategy > Traffic Receiving and Forwarding**.
- Strategy for a specific API: Go to **Microservice Platform > Select Project > Service Management > API Gateway > Endpoints**, select an endpoint, click **Details**, select an API, and click **Strategy > Business Strategy > Traffic Receiving and Forwarding**.

## Example 1

If the requirement is:

- Allow client requester to have no response at most 100 seconds during the process of request sending.
- Allow back-end service to have no response at most 300 seconds during the response process.

The configuration is as follows, and it will take effect immediately after clicking **Submit**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/2c4f7c53-9b61-4aea-828a-e91568f4f85e.png)

:::warning Warning

The back-end response timeout cannot be too long for the reasons below:

- If the back-end response timeout is set too long, the high concurrent traffic will lead to a large number of connections to be maintained due to performance issues of the back-end service, which will ultimately affect the gateway availability.
- When using SLB services of cloud vendors, the back-end response timeout is usually limited to less than 90 seconds. Even if the API timeout limit is set high, it will eventually return 504 due to the SLB limit of cloud vendors.

If the back-end response time is too long, it can be optimized in the following ways according to different scenarios:
1. Timeout due to complex business process: Carry out asynchronous transformation of business process.
2. Timeout due to large transmission content: Streaming is not enabled when the back-end forwards the request again.

:::

## Example 2

If the requirement is to allow client requester to upload files within 500 MB, the configuration is as follows, and it will take effect immediately after clicking **Submit**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/6847a91f-7b42-4803-ade0-0d9f6b1d5dfb.png)

