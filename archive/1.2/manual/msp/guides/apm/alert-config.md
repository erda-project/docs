# 告警通知

平台的稳定性是保障业务程序持续运行的基础。您可通过设置合适的告警机制保障业务程序及平台的稳定性，同时解放劳动力，无需时刻紧盯屏幕关注服务运行情况。

请进入 **微服务治理平台 > 应用监控 > 告警通知**，新建告警策略。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/5a254ca4-1044-45f4-b2c6-a7b5d3c9d992.png)

如上图所示，若发生了应用错误次数告警，说明某个服务的异常次数已达到阀值，项目管理员和应用开发人员需关注程序中的逻辑是否有误。

若发生了应用实例 OOM 告警，则说明该服务的 erda.yml 配置内存过小，或服务有内存泄露，开发人员需调整内存，或检查是否有内存泄露的代码。

