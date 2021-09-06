---
title: 上手后才知道，这套仪表盘系统用起来是真的爽！
author: 张安哲（落羽）
date: 2021-07-13
category: msp
---


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/04320c5c-29c5-4e01-a46a-65509e26f2f0.png)​

> **导读**：为了让大家更好的了解 MSP 中 APM 系统的设计实现，我们决定编写一个《详聊微服务观测》系列文章，深入 APM 系统的产品、架构设计和基础技术。本文为该系列文章的第二篇，主要分享了我们自研的仪表盘系统 Erda DashBoard 的使用操作及未来愿景。


<br />《详聊微服务观测》系列文章：

- [《从监控到可观测性，我们最终要走向哪里？》](http://mp.weixin.qq.com/s?__biz=Mzg2MDYzNTAxMw==&mid=2247484773&idx=1&sn=1a75c690916d63010a9f559456324b26&chksm=ce222f8ff955a699abc8ebd61ce6faba93401f6a5f9d39cc5eae664b2e57aa2983ccdd63e57a&scene=21#wechat_redirect)
- 《上手后才知道，这套仪表盘系统用起来是真的爽！》（本文）

​<br />
# 引言
容器化与微服务，使系统扩展性与鲁棒性相比以往提升了许多，但随之也带来了问题：运维的任务与工作量日渐繁重。

构成这一应用的微服务以及支撑这一应用的所有基础设施，都会有各自的日志、指标数据，以及构建在上游的监控、日志系统。各处分散的数据和系统，会给支持团队造成极大的负担，最终也会成为开发运维工作的拦路虎。<br />​<br />
# 我们的思考
我们已经统一了不同服务的日志、数据、指标等的分析与聚合及存储，但不同租户、应用、服务、实例可能都需要一套自己的具像化监控用以分析排查，这给监控灵活性带来了极大挑战。

时至今日，市面上已然出现了许多自定义、可视化的开源表盘，如 Kibana、Grafana、Dash 等，也有一定的缺憾，如使用上手难度大，学习成本高等，但最大的问题是操作不连贯导致无法快速排查问题。还有一些系统自带的监控图表，但这些数据范围与查询规则、排列组合都是程序固定好的，遇到一些复杂情况，还是需要用到第三方工具进行分析排查，不仅费时还费力。作为 PaaS 平台，我们研发了 Erda Dashboard，统一了使用体验。<br />​<br />
# 简介
Erda DashBoard 是一套自研的仪表盘系统，前端基于 Echarts 和 React-grid-layout，后端采用 Influxql 时序查询语言与自研的 Metrics Search Engine，被 Erda 上绝大多数图表所采用，包含了自定义仪表盘等功能。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/dbc4edb9-b594-4158-a3ec-5bd1e43cd263.png)
## 架构简图

<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/03e5d1da-8926-462c-92ee-7459bdc92dc4.png)<br />​

出于需要对大量数据进行存储与分析的考虑，且大多数场景需要借助时间生成时序图、需要在数千万条数据中进行搜索，压力非常大；除此之外，我们还有定制化的需求，这就决定了组件必须是开源的。结合以上种种原因，我们采用了分布式开源的 ElasticSearch 进行存储，并对其进行了改造，结构如下:<br />​<br />
```
    {
        "_index": "spot-application_cache-full_cluster-r-000001",
        "_type": "spot",
        "_id": "xxx",
        "_score": 1,
        "_source": {
          "name": "application_cache",
          "timestamp": 1621564500000000000,
          "tags": {
            "_meta": "true",
            "source_application_id": "9",
            "source_application_name": "xxx",
            "source_org_id": "1",
            "source_project_id": "5",
            "source_project_name": "xxx",
            "source_runtime_id": "26",
            "source_runtime_name": "xxx",
            "source_service_id": "xxx",
            "source_service_instance_id": "xxx",
            "source_service_name": "xxx",
            "source_workspace": "DEV",
          },
          "fields": {
            "elapsed_count": 2,
            "elapsed_max": 345831,
            "elapsed_mean": 331554,
            "elapsed_min": 317277,
            "elapsed_sum": 663108
          },
          "@timestamp": 1621564500000
        }
    }
```
​

考虑到易用性与通用性，我们摒弃了原生的 DSL 查询方式，封装了时序查询语言 Influxql 并对其做了定制化作为高级功能，用以实现复杂的查询与分析。对与普通的分析，我们使用 Low Code + 自定义函数表达式的搭配快速产出分析图表。<br />​<br />
# 初步使用
在 Erda MSP 中，我们提供了大量的内置表盘来帮助排查系统的常见问题，如进程分析、错误分析、链路追踪、事务分析等。

这些表盘由多个不同的图表组成，我们可以对其单个图表进行操作与调整时间范围：<br />
<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/7721812a-eb31-45cc-a865-d970cffdca60.png)<br />
<br />当时间跨度大，数据量繁多的情况下，可以全屏查看用以统计走势或具体分析：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/2eea1da9-adae-41f9-8020-4597e2dc4cb7.png)<br />

# 产品特性
## 运维大盘
运维大盘，也称之为仪表盘，用以给开发人员与运维人员产生高度可定制化的分析图表，目前存在于多云管理平台与微服务治理平台中，提供高自由度、可扩展、高定制化的图表。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/fda1fc36-e881-48a7-a5c6-4ee35d0c7f19.png)<br />​

进入新建运维大盘 ->> 添加图表后，即可进入图表编辑器，提供丰富的配置功能：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/bea2482b-02ef-4921-b969-8f34ebba822f.png)<br />
<br />如指标分组（FROM）、维度（GROUP BY）、值（SELECT）、结果筛选器（WHERE）、结果排序（ORDER BY）、结果截取（LIMIT）等，与 SQL 一一对应，简单配置后产生图表，保存即可生成表盘。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/91d30816-85fa-4d3c-abd0-179ca61c549d.png)<br />
<br />多种不同的时序图，可以无缝切换图表类型展现：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/fad67c33-74c9-4043-a487-4c6e99a9df83.png)<br />
<br />为支持更多复杂查询与分析，提供 SQL 方式查询，自由排列组合：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/f7a3128b-f75c-4d10-9626-a8338e431bbf.png)<br />
<br />提供导出功能，一键生成表盘快照、用以共享：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/35a052c0-d3e4-4cb7-a797-ad47fef30b2a.png)<br />

## 扩展与自定义函数

<br />Erda Dashboard 提供了丰富的自定义扩展方法，例如：<br />​<br />

- diffps：用以计算磁盘 IO、网络 IO 等速率值。

​

如 docker container 的一些原生指标是没有速率值，只有 Counter 值，比如网络 IO，这个时候就需要对 Counter 值进行处理以计算速率，一般的解决方案是用流计算引擎类似 Flink 进行二次聚合，但并不通用且会造成依赖，如自定义指标，我们选择在查询端实现，并且支持分组。<br />​<br />
```
   SELECT time(),application_name::tag,diffps(rx_bytes::field)
   FROM docker_container_summary
   GROUP BY time(),application_name::tag
   Limit 5
```
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/3a2be0c9-e74f-4b5c-83cd-1fc1ff1a3e9e.png)

- 使用时序图+自定义表达式后，更加直观清晰。

​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/f97371e0-4f75-4c47-9edf-170f5c3239dc.png)
# 愿景

<br />未来，Erda Dashboard 将会统一 Erda MSP 上所有图表，并且会扩展更多丰富的图表类型与自定义方法，以及支持更多的数据源，在规划中的模板市场可以实现秒建表盘、组织内分享、公开市场等，使运维与开发效率达到极大提升。并且与告警系统联动形成分析报告，早日达成 “1 分钟发现问题，3 分钟定位故障跟因” 的目标。<br />​<br />
# 欢迎参与开源
Erda 作为开源的一站式云原生 PaaS 平台，具备 DevOps、微服务观测治理、多云管理以及快数据治理等平台级能力。**点击下方链接即可参与开源**，和众多开发者一起探讨、交流，共建开源社区。**欢迎大家关注、贡献代码和 Star！**<br />**​**<br />

- **Erda Github 地址：**[_https://github.com/erda-project/erda_](https://github.com/erda-project/erda)
- **Erda Cloud 官网：**[_https://www.erda.cloud/_](https://www.erda.cloud/)
