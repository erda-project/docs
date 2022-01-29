# 主动监控及自定义告警

当前主动监控的内置告警仅支持通过请求状态码触发告警，如需根据请求延时、请求次数等触发告警，可通过自定义告警实现。

## 配置主动监控

此处以 Redis 1s 慢请求为例。

进入 **微服务治理平台 > 项目列表 > 选择项目 > 应用监控 > 主动监控**，添加主动监控。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/9adff13d-7265-4f3b-b323-c25bd5f8a2f1.png)

## 查看主动监控详情

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/e1c9ab25-b2c4-4595-b4b8-9a217ac3bf17.png)

## 配置自定义告警规则

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/9d6f0479-ea89-484b-9226-3bbe58562888.png)

### 配置字段规则

此时可根据所需规则自定义配置告警。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/7da574b4-b49b-4c9d-8ab6-cc178efd66e0.png)

### 配置消息模板

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/35d1a77a-424f-4c5b-be81-c175961a07bf.png)

## 配置告警策略

完成自定义告警配置后，另需配置告警策略。您可在此选择此前配置的自定义告警规则。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a890bdbb-a6ec-4ca6-a08b-ead112989b13.png)

完成上述操作后，若有告警触发，监控系统将根据自定义的消息模板，发送告警消息通知至钉钉群组中。
