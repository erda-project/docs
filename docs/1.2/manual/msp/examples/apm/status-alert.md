# 主动监控及自定义告警

当前主动监控的内置告警仅支持通过请求状态码触发告警，如需根据请求延时、请求次数等触发告警，可通过自定义告警实现。

## 配置主动监控

此处以 Redis 1s 慢请求为例。

进入 **微服务治理平台 > 应用监控 > 主动监控**，添加主动监控。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fc8fe6e5-3e66-4a9f-b8ac-797892bb0ba0.png)

## 查看主动监控详情

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/373d364c-820f-421b-8c5d-f30a4569b08c.png)

## 配置自定义告警规则

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c932c083-7093-44e2-9270-e8e1252cd254.png)

### 配置字段规则

此时可根据所需规则自定义配置告警。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f100761d-1bc9-4fd6-9b77-bfa597e88e7a.png)

### 配置消息模板

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/35d1a77a-424f-4c5b-be81-c175961a07bf.png)

## 配置告警策略

完成自定义告警配置后，另需配置告警策略。您可在此选择此前配置的自定义告警规则。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a890bdbb-a6ec-4ca6-a08b-ead112989b13.png)

完成上述操作后，若有告警触发，监控系统将根据自定义的消息模板，发送告警消息通知至钉钉群组中。
