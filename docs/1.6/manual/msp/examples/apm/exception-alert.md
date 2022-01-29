# 服务异常告警和诊断

## 异常告警配置

如需在服务请求频繁产生异常时接收告警，以便及时处理问题，您可使用 Erda 监控内置的告警策略，其内置应用错误、应用事务等告警规则，开箱即用，方便快捷。

请进入 **微服务平台 > 项目列表 > 选择项目 > 告警管理 > 告警策略 > 新建策略**，根据界面提示完成告警策略创建。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/ca6e8b00-3c9f-475c-9f33-eb68815ea2ae.png)

## 诊断

您可借助 Erda 监控，通过以下方式诊断异常。

### 通过容器日志查看日志

最为直接的方式即查看日志，可通过容器日志查找对应日志排查问题。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/2229aa62-1f1c-4aa0-996a-175eb1fd1482.png)

### 通过错误分析页诊断异常

错误分析页中可查看对应错误。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/f6400c64-f874-4c7d-8ae0-83d84da11745.png)

错误详情页中可查看链路追踪 ID，获取链路追踪 ID 即可在链路追踪中查看链路详情。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/ba93a58f-c644-4407-bd2e-78cade4aea90.png)

### 通过链路追踪查看调用链路

链路追踪页中可通过状态筛选查看对应信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/b6bcc3a6-89c1-4b65-bb84-b7d56ef1ed6d.png)
