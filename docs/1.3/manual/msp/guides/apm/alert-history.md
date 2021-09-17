# 告警历史

用户配置好告警策略经过 erda-analyzer 处理与 Metric 进行匹配后触发告警，当用户配置的告警众多，每条告警策略配置的通知组不同，不同的告警会通知到不同的通知组中导致用户不方便统一查看告警，及时发现问题。

告警列表集中展示根据您配置的告警策略而触发的告警记录，在告警列表中展示的是以 group_id 主键作为区分的最新的告警记录，并以更新时间的倒序呈现。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/8749c6dc-972b-43f2-966d-1bd05935bf77.png)

点击相应告警记录，即可进入该告警的告警历史页面。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/19a9dade-2dab-4e69-aee2-ac91fe366391.png)
告警历史页将根据告警记录的创建时间倒序展示告警记录，同时展示告警状态（告警或异常)。记录上方将显示触发该告警的策略名称。

告警历史支持根据时间进行筛选，您最多可查看近7天的告警历史记录，时间范围可精确到秒。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/44ce0ed1-1952-435d-9278-f7345e0ebf43.png)
您还可以点击历史记录左侧的 **+** 查看告警具体信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/210e91e7-c820-4ed0-8f90-fab32232aec6.png)
