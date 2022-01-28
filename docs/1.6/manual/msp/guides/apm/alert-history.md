# 告警历史

用户配置的告警策略经过 erda-analyzer 处理与 Metric 进行匹配后触发告警。若用户配置的告警过多，且每条告警策略配置的通知组不同，将导致不同的告警通知到不同的通知组，不利于用户统一查看告警并及时发现问题。

进入 **微服务平台 > 项目列表 > 选择项目 > 告警管理 > 告警历史**，此处集中展示根据您配置的告警策略而触发的告警记录，并以更新时间的倒序呈现。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/5ffa8112-11b2-4cba-8024-29e386a8a44d.png)

点击相应告警记录，即可进入该告警的告警历史页面。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/f8be1398-c223-4520-8799-01c7ee9d423b.png)
告警历史页将根据告警记录的创建时间倒序展示告警记录，同时展示告警状态（告警或恢复)。记录上方将显示触发该告警的策略名称。

告警历史支持根据时间进行筛选，您最多可查看近7天的告警历史记录，时间范围可精确到秒。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/4f4b5cab-e037-433a-9d63-859c76d9cf05.png)
您还可以点击历史记录左侧的 **+** 查看告警具体信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/208b4c61-eca6-4978-a727-d6981ea30f05.png)
