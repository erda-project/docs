# 告警策略过滤规则

创建告警策略时，您可以按需添加一个或多个过滤规则。

* **多云管理平台**：过滤规则的可选标签为集群名、主机 IP 和平台组件。

 ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/24/6810d211-43d4-45e9-b619-6bd66f31dc68.png)

* **微服务平台**：过滤规则的可选标签为应用名和服务名。

 ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/24/7570d254-e8f6-4d8d-a010-0d3b0fd8f032.png)

若您在告警策略中已添加过滤规则，则告警需同时满足过滤规则和告警规则才可触发。例如，过滤规则为集群名等于 terminus，则集群名需为 terminus 且满足相应告警规则才可触发告警及发送通知。
