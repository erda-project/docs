# 前端监控

进入 **微服务平台 > 项目列表 > 选择项目 > 应用监控 > 前端监控**，可查看前端监控的整体情况。平台默认展示一小时内的变化数据，您可点击时间选框自定义时间段。


## 总览

总览页展示前端的性能概况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/52b72d9e-13ad-4fc4-bd9a-ebf112ec9196.png)

## 访问域名

一个应用通常会配置多个子域名，例如移动端与 PC 端域名、二级域名等。

访问域名页即根据应用的域名维度区分性能数据，包括加载性能趋势、响应时间趋势、吞吐量与慢加载等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/6ed00ad8-ff6a-4a83-8263-619281a17059.png)

* **白屏时间**：从准备加载页面到浏览器开始显示内容的时间。
* **首屏时间**：指用户看到第一屏（即整个网页顶部大小为当前窗口的区域）显示完整的时间。
* **网页加载完成**：从接收到页面文档第一个字节到接收到最后一个字节的时间。
* **资源加载完成**：页面内 JS、CSS、Image 等资源的加载时间。

## 访问页面

访问页面从页面维度展示 BI 性能监控数据，其交互逻辑与访问域名相同。

在左侧选择对应访问请求后，可查看该请求的性能趋势等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/4c2a2361-ed16-41a3-ad15-56d9a8f40ed4.png)

## Ajax 接口

Ajax 接口页从 Ajax 维度，展示每条 Ajax 请求的平均响应时间、时间百分比和吞吐量，并且从响应时间 TOP5、吞吐量 TOP5、发送数据、接收数据四个方面展示请求性能趋势。

在左侧选择对应 Ajax 请求后，可查看该请求的性能趋势等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/550ca501-de4f-4555-9e3f-f8eb90e7c936.png)

## 脚本错误

脚本错误页从多维度展示 JavaScript 执行过程中的错误信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/27cb52f9-90f8-4cba-b781-11aebcd31fcc.png)

* **错误信息**：具体的错误信息，在左侧选择对应错误信息后，可查看该错误信息的详情。
* **出错页面**：错误产生的请求页面。

## 浏览器性能

浏览器性能页展示不同浏览器的性能指标，指标类型与 Ajax 接口相似。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/a258e059-1058-45f3-8556-f54e70303782.png)

