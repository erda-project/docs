# 配置自定义服务大盘
当平台上已有的图表无法满足需求时，您可以根据需要配置自定义图表。

## 对比多实例指标
一个服务可能会有多个实例，若您希望在一张图表上对比实例的使用情况，可根据 **服务IP** 进行分组查看每个实例的内存。

进入 **微服务治理平台 > 应用监控 > 运维大盘 > 新建运维大盘**，图表具体配置如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/261d7e84-f440-49b2-83d8-1768a8bd8cc0.png)

**堆内存已使用** 值的字段配置如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/0d45d9ba-8fc0-4ab2-a256-026886e24949.png)

## 展示自定义指标
您可以使用 SDK 自定义指标，并通过自定义图表展示。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/27d7381f-6b19-40cc-9cf5-4f1f2139c2bf.png)

## 展示日志指标
通过配置的 **日志规则** 解析出来的指标，也可通过大盘展示，具体请参见 [日志示例](../log/java-log-rule.md)。

