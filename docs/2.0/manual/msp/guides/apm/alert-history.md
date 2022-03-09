# 告警历史

用户配置的告警策略经过 erda-analyzer 处理与 Metric 进行匹配后触发告警。若用户配置的告警过多，且每条告警策略配置的通知组不同，将导致不同的告警通知到不同的通知组，不利于用户统一查看告警并及时发现问题。

进入 **微服务治理平台 > 告警中心 > 告警历史**，此处集中展示根据您配置的告警策略而触发的告警记录，并以更新时间的倒序呈现。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/364b01aa-9214-4784-b855-b19203405bd3.png)

点击相应告警记录，即可进入该告警的告警历史页面。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/d4c2d724-f05d-4e21-9e22-f67784d7fd64.png)
告警历史页将根据告警记录的创建时间倒序展示告警记录，同时展示告警状态（告警或恢复)。记录上方将显示触发该告警的策略名称。

告警历史支持根据时间进行筛选，您最多可查看近7天的告警历史记录，时间范围可精确到秒。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/40f70d5c-7de9-436b-a4a0-49f5de386156.png)
您还可以点击历史记录左侧的 **+** 查看告警具体信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/96998b4a-b2cc-4548-ad03-831524bf9155.png)
