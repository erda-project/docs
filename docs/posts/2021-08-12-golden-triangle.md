---
title: 详解可观测性监控系统中的“金三角”
author: 翟宏伟(羽零)
date: 2021-08-12
category: msp
---


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/e80e7f5a-a983-42af-bd9e-626cd1f8072d.jpg)
> **导读：**为了让大家更好地了解 MSP 中 APM 系统的设计实现，我们决定编写一个《详聊微服务观测》系列文章，深入 APM 系统的产品、架构设计和基础技术。本文为该系列文章的第四篇，旨在帮助读者更好地理解 Metrics / Tracing / Logging 三种数据各自的特点以及三者之间存在的关系。

​

《详聊微服务观测》系列文章：

- [《从监控到可观测性，我们最终要走向哪里？》](http://mp.weixin.qq.com/s?__biz=Mzg2MDYzNTAxMw==&mid=2247484773&idx=1&sn=1a75c690916d63010a9f559456324b26&chksm=ce222f8ff955a699abc8ebd61ce6faba93401f6a5f9d39cc5eae664b2e57aa2983ccdd63e57a&scene=21#wechat_redirect)
- [《上手后才知道，这套仪表盘系统用起来是真的爽！》](http://mp.weixin.qq.com/s?__biz=Mzg2MDYzNTAxMw==&mid=2247485052&idx=1&sn=af12b930227bb8b0871816d4151c0bd2&chksm=ce222c96f955a5804ce3a9b032e030d4335ecb7ba7b21aa5fdb193e16344e72bd0c7b8725577&scene=21#wechat_redirect)
- [《一文搞懂指标采集利器 Telegraf》](http://mp.weixin.qq.com/s?__biz=Mzg2MDYzNTAxMw==&mid=2247486007&idx=1&sn=27178303ff0f3842041a5c01e307fa71&chksm=ce2220ddf955a9cb10899b789af630af33e6d1d4e0c8efdecc3a4c63a8487e4bfe382322d0bf&scene=21#wechat_redirect)



## 写在前面

<br />监控？监什么控？监控什么？什么监控？<br />​

今天，市面上的监控系统可以说是百花齐放了，从 Google Dapper 再到后面各种开源的监控系统，例如 ZipKin/Pinpoint/Apache Skywalking/OpenTelemetry/Elasticsearch/Prometheus 等等，无一不是围绕着 Metrics/Tracing/Logging 三种数据中的一种或者多种来进行设计实现的。本文旨在帮助读者更好地理解这三种数据各自的特点以及三者之间存在的关系。<br />​<br />
## 介绍


### Metrics


- 一组描述过程或者活动的数据
- 跟随着时间变化的时序数据
- 可聚合的 KV 数据
- 可压缩、存储、处理、检索


<br />Metrics 一般是用来计算 **Events** 发生数量的数据集，这些数据通常具有原子性，且可以聚合。从操作系统到应用程序，任何事物都会产生 Metrics 数据，这些数据可以用来度量操作系统或应用程序是否健康，或者是用以计算一段时间内请求的平均延时。由于目前并没有 Metrics 采集的标准 API，所以不同的监控系统在收集 Metrics 数据时采取的手段也可能不一样，但大部分无非都是通过 PUSH 到中心 Collector 方式采集 Metrics（比如各种 Agent 采集器，Telegraf 等）； 又或者是中心 Collector 通过 PULL 的方式去主动获取 Metrics（比如 Prometheus）。最重要的是可以将采集到的 Metrics 数据与对应的系统或应用程序相关联，通过图表或其他方式直观展示，使得这些 Metrics 更具有价值。<br />

### Logging


- 记录离散 **Events**


<br />Logging 描述的是一些列离散**事件**，在缺乏有力的监控系统时，Logging 数据通常是工程师在定位生产问题时最直接的手段。如果说 Metrics 可以告诉你系统或者应用程序出现问题，那么 Logging 就可以告诉你为什么会出现问题。关于日志的采集现在也有很多方法，比如：filebeat, fluented, loki 等。<br />

### Tracing


- 通常是记录应用程序操作的数据
- 一次请求的完整生命周期
- 分布式系统中一次请求经历过多个服务产生操作的数据（Spans）


<br />Tracing 是通过有向无环图的方式记录在分布式系统中发生的 **Events** 之间的因果关系。云原生场景下，多个服务之间或多或少存在着依赖关系，一次 Tracing 通常会经过多个服务（Span），甚至在高度复杂的分布式系统中，一次 Tracing 包含数以万计的 Span 也是可能存在的。再者，Tracing 更多的是关注这种端到端系统之间的联系，基于该需求，分布式追踪系统应运而生。<br />
<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/54630927-4bba-461e-b506-f54013af3e9a.png)<br />

## 三者之间的关系


- 在一次用户请求发生时，可以记录这次请求延时、请求发生的次数等 Metrics 数据，用以量化展示。
- 同时也可以记录这次请求发生时经过多个服务的 Tracing 数据，这样可以更加直观地看到请求在各个服务中到底经历了什么。
- 当然还可以在发生错误时记录详细的 Logging 数据（除非有必要，否则推荐只在发生错误时记录日志）。

​

根据以上几点，我们很容易发现 Metrics/Tracing/Logging 这三种数据之间是存在着某种联系的。<br />​

下面，通过 Peter Bourgon 提供的一张维恩图，我们再来深入了解一下三者之间的关系：<br />
<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/b026a9be-e2ac-4d90-89da-6d5a6d59d886.png)<br />
<br />如上图所示，可以看出三种数据之间是有一定冗余的，并且他们产生的存储需求也有很大不同，所以在选择采集何种数据时，就得根据系统的复杂程度来判断。简而言之：<br />​<br />

- Metrics 倾向于更节省资源。
- Logging 倾向于无限增加，会频繁超出预期的容量（当然可以通过告警的方式去预防）。
- 而 Tracing 数据则介于两者之间。

​<br />
## 在 Erda 中的运用
### Logging 数据在 Erda 上的展示
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/a12a6406-d790-4a50-882a-8d61d75e4a7c.png)
### Metrics 数据在 Erda 上的展示
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/a1ef11ce-b4b9-4063-9d11-4c21f6076216.png)
### Tracing 数据在 Erda 上的展示
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/886e77e4-90af-4da1-adda-70b8b72b4f3f.png)
### 数据联动展示

<br />通过慢请求寻找对应的 Logging和 Tracing，从而来解决性能问题：<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/fe86eec8-3058-40e0-a5f2-0c7844f9ffee.png)
## 总结

<br />现在的监控软件，很多都是从一种类型的数据，发展到想要管理三种类型的数据。其实这也能看出，三种数据都是很有价值的，在定位不同问题时，它们分别提供了不同的作用，所以如何很好地结合三者才是关键。<br />
<br />还在犹豫如何选择嘛？想要感受尔小达的“贴身”服务嘛？它来了，它来了，[Erda 直通车](https://github.com/erda-project/erda)，Erda 我看行，你值得拥有 :) 。<br />

## 参考


- [《Metrics, tracing, and logging》](https://peter.bourgon.org/blog/2017/02/21/metrics-tracing-and-logging.html)
- [《Dapper, a Large-Scale Distributed Systems Tracing Infrastructure》](http://static.googleusercontent.com/media/research.google.com/zh-CN//pubs/archive/36356.pdf)
- [《Observability 3 ways: Logging, Metrics & Tracing》](https://www.youtube.com/watch?v=juP9VApKy_I)
- [《Metrics, Logs and Traces: The Golden Triangle of Observability in Monitoring》](https://devops.com/metrics-logs-and-traces-the-golden-triangle-of-observability-in-monitoring/)

​

关于 Erda 如果你有更多想要了解的内容，欢迎添加小助手微信（Erda202106）进入交流群讨论，或者直接点击下方链接了解更多！<br />

- Erda Github 地址：[https://github.com/erda-project/erda](https://github.com/erda-project/erda)
- Erda Cloud 官网：[https://www.erda.cloud/](https://www.erda.cloud/)
