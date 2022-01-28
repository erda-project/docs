# Performance Data

## Observe the Delay Added by the Gateway from the Response Header

As shown in the figure below, the response header `x-kong-proxy-latency` in the red box is the processing delay added by the gateway, which is 1ms in this case. If 0 is displayed, it is less than 1ms.

The response header `x-kong-upstream-latency` is the delay from sending the request to the back-end service to receiving the complete response from the backend, which is 6ms here.

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/fe715e34-efde-4bed-b641-778c376c6187.png)


## Pressure Test Data

* Number of instances: 1
* CPU: 2 cores
* Memory: 256 MB

| Pressure Test Method | Number of Concurrent Clients | Requests Per Second | Average Delay | CPU Usage | Memory Usage |
| :------- | :------------- | :------------- | :------- | :--------- | :------- |
| Short Connection | 10 | 4393 | 2.2ms | 100% | 106 MB |
| Short Connection | 30 | 4699 | 6.3ms | 100% | 106 MB |
| Long Connection | 10 | 5928 | 1.6ms | 100% | 106 MB |
| Long Connection | 30 | 5800 | 5ms | 100% | 106 MB |

The request processing capacity of a gateway node with 1 instance and 2 cores of CPU is about 5,000 QPS. According to the default configuration of the platform, 2 instances will be started to achieve the processing capacity of 10,000 QPS. If still unable to meet the business needs, carry out horizontal scaling.
