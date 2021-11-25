# 主动监控

进入 **微服务治理平台 > 应用监控 > 主动监控**，创建 URL 的定时检查，系统将实时检测 URL 的运行状态和性能。

列表页展示检查的状态、在线率、宕机时间等数据，点击对应索引可查看检查详情。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/c01dfde4-ba9f-41c6-ad24-c003c1b816c6.png)

详情页展示 URL 可用性与性能趋势，以及历史可用时间趋势。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/3c058072-000d-4bc9-a1d4-90f1103749a7.png)

点击 **添加监控** 可新增监控指标，对返回值的内容进行正则匹配。若指标异常（请求无响应、内容不匹配等）则会变更指标状态，同时发出告警。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/8a2ffd54-3e2b-4ebb-a21b-ec2555479fc9.png)
