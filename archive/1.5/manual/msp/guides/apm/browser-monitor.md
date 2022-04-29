# 前端监控

进入 **微服务平台 > 项目列表 > 选择项目 > 应用监控 > 前端监控**，可查看前端监控的整体情况。平台默认展示一小时内的变化数据，您可点击时间选框自定义时间段。


## 总览

总览页展示前端的性能概况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/6865d2a4-ff7d-4f93-bf7c-4b54b97f27ed.png)

## 访问域名

一个应用通常会配置多个子域名，例如移动端与 PC 端域名、二级域名等。

访问域名页即根据应用的域名维度区分性能数据，包括加载性能趋势、响应时间趋势、吞吐量与慢加载等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/7697d5e9-a5ea-4921-876f-8dea184cfd0e.png)

* **白屏时间**：从准备加载页面到浏览器开始显示内容的时间。
* **首屏时间**：指用户看到第一屏（即整个网页顶部大小为当前窗口的区域）显示完整的时间。
* **网页加载完成**：从接收到页面文档第一个字节到接收到最后一个字节的时间。
* **资源加载完成**：页面内 JS、CSS、Image 等资源的加载时间。

## 访问页面

访问页面从页面维度展示 BI 性能监控数据，其交互逻辑与访问域名相同。

在左侧选择对应访问请求后，可查看该请求的性能趋势等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/368a97c9-77cc-4b37-bb8b-2d44d9e83b3a.png)

## 定位分析

定位分析页提供用户体验 Apdex、整页加载完成、白屏时间等多维度的数据对比，同时提供操作系统、设备、浏览器等多维度的数据统计，用于多方位的浏览性能分析。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/122b7398-b918-4575-af1c-8f41fdc94a1a.png)

* **用户体验 Apdex**：Apdex 是用户对应用性能满意度的量化值。
* **整页加载完成**：Page Load Time，指页面完成整个加载过程的时间。
* **白屏时间**：从准备加载页面到浏览器开始显示内容的时间。
* **首屏时间**：指用户看到第一屏（即整个网页顶部大小为当前窗口的区域）显示完整的时间。
* **资源加载完成**：页面内 JS、CSS、Image 等资源的加载时间。
* **网页加载完成**：从接收到页面文档第一个字节到接收到最后一个字节的时间。
* **性能分析**：可根据以上指标和用户特征进行性能对比。

## Ajax 接口

Ajax 接口页从 Ajax 维度，展示每条 Ajax 请求的平均响应时间、时间百分比和吞吐量，并且从响应时间 TOP5、吞吐量 TOP5、发送数据、接收数据四个方面展示请求性能趋势。

在左侧选择对应 Ajax 请求后，可查看该请求的性能趋势等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/739422b8-bdf3-4ecf-abd9-2e3a7f5477ca.png)

## 脚本错误

脚本错误页从多维度展示 JavaScript 执行过程中的错误信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/d785c045-9cfb-4e6e-9a09-7f202a851c24.png)

* **错误信息**：具体的错误信息，在左侧选择对应错误信息后，可查看该错误信息的详情。
* **出错页面**：错误产生的请求页面。

## 浏览器性能

浏览器性能页展示不同浏览器的性能指标，指标类型与 Ajax 接口相似。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/4a09ced7-1721-4796-a3c3-b2368d2361f5.png)

## 摘要

摘要页从访问域名、访问页面、系统等方面展示页面加载的具体情况。

在左侧选择对应维度信息后，可查看该维度信息的页面请求过程详情。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/d0b2aa35-6ab5-4eec-aeb1-949be19206af.png)

## 地理

地理页从访问地理维度展示各个地区的访问性能情况。

在左侧选择对应地理信息，可查看该地区的具体访问性能指标。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/110248ae-15b0-4780-aa4e-3652a58a8cbe.png)
