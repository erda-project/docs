# 服务异常告警和诊断

## 异常告警配置

如需在服务请求频繁产生异常时接收告警，以便及时处理问题，您可使用 Erda 监控内置的告警策略，其内置应用错误、应用事务等告警规则，开箱即用，方便快捷。

请进入 **微服务平台 > 项目列表 > 选择项目 > 告警管理 > 告警策略 > 新建策略**，根据界面提示完成告警策略创建。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/66092cce-0a61-4998-bd9e-37c0d0fdc026.png)

## 诊断

您可借助 Erda 监控，通过以下方式诊断异常。

### 通过容器日志查看日志

最为直接的方式即查看日志，可通过容器日志查找对应日志排查问题。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f7a5cbbf-ebf1-4532-81c1-3f8471eb2a78.png)

### 通过错误分析页诊断异常

错误分析页中可查看对应错误。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/1467c3c1-7942-42b5-8acc-d2f0062feca8.png)

错误详情页中可查看链路追踪 ID，获取链路追踪 ID 即可在链路追踪中查看链路详情。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4815ef21-a658-40e0-a754-dc3f65f05015.png)

### 通过链路追踪查看调用链路

链路追踪页中可通过状态筛选查看对应信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c949140d-c0c3-4097-b407-ba0a7da01b91.png)
