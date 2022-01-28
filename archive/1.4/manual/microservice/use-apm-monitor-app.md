# 应用性能管理 (APM)

APM 全称 Application Performance Management & Monitoring，通过探针采集应用服务的关键指标，并使用可配置的图表来呈现数据，最终能够帮助用户掌控以下情况：
* 应用自身的调用情况，方便做容量规划，同时对于突发的流量也能进行应急准备。
* 应用自身的健康、性能监控，实时了解自身的业务运行情况，排查业务瓶颈，快速诊断和定位异常，增强对自己服务的掌控力。
* 第三方依赖的监控，实时了解第三方健康状况和服务品质，降低第三方依赖对自身系统的扰乱。

## 应用洞察
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/24/0399f50e-a4a9-4084-a750-5f5e976baf76.png)

`微服务治理`的`服务总览`拓扑图中，点击 endpoint (终端) 和 service (服务) 模块中的节点，可以跳转到对应服务的`应用洞察`

:::tip

名词解释

* Apdex 指数：Application Performance Index，性能指数，[WIKI](https://en.wikipedia.org/wiki/Apdex)。
* cpm：count per minute，每分钟次数。
* PV：page view，页面浏览量。

:::

### 洞察内容
* [总览](#overview)
* [WEB 事务](#web)
* [RPC 事务](#rpc)
* [数据库](#db)
* [缓存](#cache)
* [JVMs](#jvms)
* [NodeJS](#nodejs)

除了`总览`选项，其他选项都是在时间范围内有数据的时候才会展示。

默认展示一小时内变化数据，也可以点击时间选择框选择所需展示时间。

<h3 id="overview">总览</h3>

`总览`展示了 Server 应用的性能总览。

* 接口吞吐量：展示了选择时间内各个事务 (HTTP、RPC、DB 等 ) 的总吞吐量趋势。
* 响应时间：展示了选择时间内各个事务 (HTTP、RPC、DB 等 ) 的平均响应时间趋势。
* Http 状态：展示了选择时间内 HTTP 事务中各种状态次数的趋势。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/5f0c87e8-df36-4438-94dc-809d8841b588.png)

<h3 id="web">WEB 事务</h3>

`WEB 事务`展示了 Server 应用的事务详情，以接口维度展示调用明细，耗时前五的 API 性能趋势，总体吞吐量，与慢事务。

在选择左侧 WEB 事务列表中的具体接口后，会展示该接口的明细数据，包括其响应时间趋势与每分钟吞吐量趋势。

* WEB 事务明细：平均响应时间、响应时间占比、吞吐量分别展示了每个事务接口在选择时间内的平均响应时间、每个接口占用总体调用时间的百分比，与每个接口的每分钟调用次数。
* 响应时间 Top5：展示了选择时间内平均响应时间前五的事务接口与趋势。
* 吞吐量 Top5：展示了选择时间内每分钟被请求的次数前五位的事务接口与趋势。
* HTTP 错误：展示了选择时间内 HTTP 请求中状态大于 400 的数量趋势。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/923a5dbc-58d4-441e-89a8-91de601a89b2.png)

* 慢事务追踪 Top10：展示了选择时间内响应时间超过 300 ms 并且排列前十的事务接口的发生次数与平均响应时间等信息，展开后可以看到采样的请求对应的日志和链路。
* 异常事务追踪 Top10：展示了选择时间内发生异常并且排列前十的事务接口的发生次数与平均响应时间等信息，展开后可以看到采样的请求对应的日志和链路。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/0b305ab3-483a-41b9-86b1-1f29dcba6aa1.png)

<h3 id="rpc">RPC 事务</h3>

`RPC 事务`展示了应用提供的 RPC 事务详情，以接口维度展示调用明细，耗时前五的 API 性能趋势，总体吞吐量，与慢事务。

在选择左侧 RPC 事务列表中的具体接口后，会展示该接口的明细数据，包括其响应时间趋势与每分钟吞吐量趋势。

* RPC 事务明细：平均响应时间、响应时间占比、吞吐量分别展示了每个事务在选择时间内的平均响应时间、每个事务占用总体调用时间的百分比，与每个事务的每分钟调用次数。
* 响应时间 Top5：展示了选择时间内平均响应时间前五的事务接口与趋势。
* 吞吐量 Top5：展示了选择时间内每分钟被请求的次数前五位的事务与趋势。
* 慢事务追踪 Top10：展示了选择时间内响应时间超过 300 ms 并且排列前十的 RPC 事务的发生次数与平均响应时间等信息，展开后可以看到采样的请求对应的日志和链路。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/9119c00f-780d-43ec-9cd6-6b2dc2d84f66.png)

<h3 id="db">数据库</h3>

`数据库`展示了数据库事务详情，以 Server 应用中 SQL 调用明细，耗时前五的查询性能趋势，总体吞吐量，与慢数据库追踪。

在选择左侧数据库查询 SQL 后，可以单独查看该查询方法的调用响应时长趋势与吞吐量趋势。

* 数据库明细：平均响应时间、吞吐量分别展示了所选时间内每个 SQL 的平均执行时间、每个 SQL 的每分钟调用次数。
* 响应时间 Top5：展示了所选时间内 SQL 执行时间前五的数据库事物与性能趋势。
* 吞吐量 Top5：展示了所选时间内每分钟被请求数据库 SQL 排列前五位的次数与趋势。
* 慢数据库追踪 Top10：慢事物列表展示了所选时间内响应时间超过 250 ms 并且排列前十的 SQL 次数与平均响应时间等信息，展开后可以看到采样的请求对应的日志和链路。
* 异常事务追踪 Top10：展示了选择时间内发生异常并且排列前十的 SQL 的发生次数与平均响应时间等信息，展开后可以看到采样的请求对应的日志和链路。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/6f801a97-e2aa-4ba4-a29a-bb138cc8d8fa.png)

<h3 id="cache">缓存</h3>

`缓存`展示了 redis 调用明细，耗时前五的查询性能趋势，总体吞吐量。

在选择左侧缓存查询命令后，可以单独查看该查询命令的调用响应时长趋势与吞吐量趋势。

* 缓存明细：平均响应时间、吞吐量分别展示了所选时间内每次 redis 调用的平均执行时间、每个 redis 调用的每分钟调用次数。
* 响应时间 Top5：展示了所选时间内 redis 调用时间排列后前五的redis查询与性能趋势。
* 吞吐量 Top5：展示了所选时间内每分钟 redis 调用排列前五位的次数与趋势。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/d73394dd-7098-4339-8b3e-6ee2239e9d08.png)

<h3 id="jvms">JVMs</h3>

`JVMs`展示了应用中的各个模块的各个 Java 容器实例状态，并默认显示第一个模块，如果一个应用部署了多个实例，则默认显示第一个模块的第一个实例。可以切换模块名/实例名。

* Heap memory usage：JVM 堆内存使用情况。
* Non Heap memory usage：JVM 非堆内存使用情况。
* PS-Eden-Space，PS-Old-Gen，PS-Survivor-Space：分别表示 jvm 堆内存中伊甸园，老年代区，幸存者区。
* GC 次数，GC 平均时间：分别表示 JVM GC 的次数和平均时间。
* Class count：展示JVM从启动开始加载和卸载的类的个数。
* Thread：JVM加载线程。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/f932bb54-9aec-48e0-b992-02009a4605a0.png)

<h3 id="nodejs">NodeJS</h3>

`NodeJS`展示了应用中的各个模块的各个 NodeJS 容器实例状态，并默认显示第一个模块，如果一个应用部署了多个实例，则默认显示第一个模块的第一个实例。可以切换模块名/实例名。

* Heap memory usage：NodeJS 堆内存使用情况。
* Non Heap memory usage：NodeJS 非堆内存使用情况。
* Cluster Count：NodeJS 中 cluster 的数量。
* AsyncResource：NodeJS 中的异步资源。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/2d0c061c-fa78-4409-b35e-49ecce3e5bbb.png)

## 主动监控

点击`应用监控`的`主动监控`选项，创建 URL 的定时检查，系统会实时检测创建的 URL 的运行状态和性能。

* 列表页展示检查的状态、在线率、宕机时间等数据，点击对应的名称可以展示检查详情。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/9a4f9717-842f-4deb-a188-1f800cbd676c.png)

* 详情页展示可用性与性能趋势，同时展示历史可用时间趋势。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/42bc1f74-3c35-468c-9747-bf0a7db41d4a.png)

* 点击"添加监控"可以新增监控指标，可以对返回值的内容进行正则匹配。如果指标异常（请求无响应、内容不匹配等）都会将指标状态变更，同时发出告警。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/4f4ef4be-78c1-4743-9c39-954deba32aac.png)

## 前端指标监控

您可以点击`应用监控`的`浏览性能`选项，查看浏览器监控的大致情况。可以直接面向您的浏览器应用的性能追踪，包括响应加载时间，页面错误，异步调用，地理追踪等等。

默认展示一小时内变化数据，也可以点击时间选择框选择所需展示时间。

功能分为：
* [总览](#browser_overview)
* [访问域名](#browser_domain)
* [访问页面](#browser_page)
* [定位分析](#browser_location)
* [Ajax接口](#browser_ajax)
* [脚本错误](#browser_script)
* [浏览器性能](#browser_performance)
* [摘要](#browser_summary)
* [地理](#browser_geography)

### 接入方式
* 前后端分离 - 单页应用 SPA（single page application）
    1. 在框架页(一般是index.html) 的 head 中添加 ta.js 的激活代码
    ```html
    <script src="/ta"></script>
    <script>
      var _taConfig = window._taConfig;
      if (_taConfig && _taConfig.enabled) {
        !function(e,n,r,t,a,o,c){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e.onerror=function(n,r,t,o,c){e[a]("sendExecError",n,r,t,o,c)},n.addEventListener("error",function(n){e[a]("sendError",n)},!0),o=n.createElement(r),c=n.getElementsByTagName(r)[0],o.async=1,o.src=t,c.parentNode.insertBefore(o,c)}(window,document,"script",_taConfig.url,"$ta");
        $ta('start', { udata: { uid: 0 }, ak: _taConfig.ak, url: _taConfig.collectorUrl });
      }
    </script>
    ```
    2. 在 nginx.conf 中添加 /ta 请求处理，来返回ta.js的配置。环境变量在 Erda 中会默认注入
    ```bash
        set $taEnabled ${TERMINUS_TA_ENABLE};
        set $taUrl ${TERMINUS_TA_URL};
        set $collectorUrl ${TERMINUS_TA_COLLECTOR_URL};
        set $terminusKey ${TERMINUS_KEY};
        location /ta {
            default_type application/javascript;
            return 200 'window._taConfig={enabled:$taEnabled,ak:"$terminusKey",url:"$taUrl",collectorUrl:"$collectorUrl"}';
        }
    ```
    3. 采集用户 ID ，添加用户维度的统计，需要在前端，用户查询的位置把 userId 设置到 ta.js 的缓存
    ```js
    if (typeof window.$ta !== 'undefined') window.$ta('setUser', [userId])
    ```

* 前后端不分离 SpringMVC 页面
    1. 添加 Config 类读取 ta.js 环境变量，环境变量在 Erda 中会默认注入
    ```java
    @Component
    @Data
    public class TaConfig {
        @Value("${terminus.ta.collector.url}")
        private String terminusTaCollectorURL;

        @Value("${terminus.ta.enable}")
        private boolean terminusTaEnable;

        @Value("${terminus.ta.url}")
        private String terminusTaURL;

        @Value("${terminus.key}")
        private String terminusKey;
    }
    ```
    2. 添加 Controller 返回 ta.js 的配置
    ```java
    @Slf4j
    @RestController
    @RequestMapping("/api/ta")
    public class TaController {

        @Autowired
        private TaConfig config;

        @RequestMapping(produces = "application/javascript")
        @ResponseBody
        public String ta() {
            return String.format("window._taConfig={enabled:%b,ak:\"%s\",url:\"%s\",collectorUrl:\"%s\"}", config.isTerminusTaEnable(), config.getTerminusKey(), config.getTerminusTaURL(), config.getTerminusTaCollectorURL());
        }
    }
    ```
    3. 在需要被监控的页面 head 中添加 ta.js 激活代码
    ```html
    <head>
        <script src="/api/ta"></script>
        <script>
            var _taConfig = window._taConfig;
            if (_taConfig && _taConfig.enabled) {
                !function (e, n, r, t, a, o, c) {
                    e[a] = e[a] || function () {
                        (e[a].q = e[a].q || []).push(arguments)
                    }, e.onerror = function (n, r, t, o, c) {
                        e[a]("sendExecError", n, r, t, o, c)
                    }, n.addEventListener("error", function (n) {
                        e[a]("sendError", n)
                    }, !0), o = n.createElement(r), c = n.getElementsByTagName(r)[0], o.async = 1, o.src = t, c.parentNode.insertBefore(o, c)
                }(window, document, "script", _taConfig.url, "$ta");
                $ta('start', {udata: {uid: 0}, ak: _taConfig.ak, url: _taConfig.collectorUrl});
            }
        </script>
    </head>
    ```
* herd
    1. 添加 terminus-key.js 中间件
    ```html
    module.exports = () => async (ctx, next) => {
      ctx.herdContext['_TERMINUS_KEY_'] = process.env.TERMINUS_KEY;
      ctx.herdContext['_TA_ENABLE_'] = process.env.TERMINUS_TA_ENABLE || false;
      ctx.herdContext['_TA_URL_'] = process.env.TERMINUS_TA_URL || '//static.terminus.io/ta.js';
      ctx.herdContext['_TA_COLLECT_URL_'] = process.env.TERMINUS_TA_COLLECTOR_URL || '//analytics.terminus.io/collect';
      await next();
    }
    ```
    2. 在 layout.hbs 的 head 中添加 ta.js script
    ```html
     <head>
        <script>
            {{#if _TA_ENABLE_}}
              !function(e,t,n,s,a,c,i){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},c=t.createElement(n),i=t.getElementsByTagName(n)[0],c.async=1,c.src=s,i.parentNode.insertBefore(c,i)}(window,document,"script","{{_TA_URL_}}","$ta");
              $ta('start',{ udata: { uid: {{#if _USER_}}{{_USER_.id}}{{else}}0{{/if}} }{{#if _TERMINUS_KEY_}}, ak: '{{_TERMINUS_KEY_}}'{{/if}} , url: '{{_TA_COLLECT_URL_}}' })
            {{/if}}
        </script>
      </head>
    ```

    3. 采集用户 ID，添加用户维度的统计，需要在前端，用户查询的位置把 userId 设置到 ta.js 的缓存
    ```js
    if (typeof window.$ta !== 'undefined') window.$ta('setUser', [userId])
    ```

<h3 id="browser_overview">总览</h3>

`总览`展示浏览器的性能总览。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/d4961d8a-e4b8-450f-a117-2ae1907bf3bd.png)

<h3 id="browser_domain">访问域名</h3>

一个应用往往会配置多个子域名，例如移动端与PC端的域名、子域名二级域名等等，`访问域名`可以根据域名的维度区分性能数据。

此页面按照应用的域名维度展示页面加载性能趋势、响应时间趋势、吞吐量与慢加载，点击左侧域名后可以查看该域名的明细，并且将页面加载分为白屏时间，首屏时间，网页加载完成，资源加载完成4个时间维度进行查看。

* 白屏时间：从准备加载页面到浏览器开始显示内容的时间
* 首屏时间：指用户看到第一屏，即整个网页顶部大小为当前窗口的区域，显示完整的时间
* 网页加载完成：从接收到页面文档第一个字节到接收到最后一个字节的时间
* 资源加载完成：页面内js、css、image等资源加载时间

在选择左侧访问域名后，可以单独查看该域名访问的性能趋势等信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/920b1800-bdd1-4c95-b38d-5692714a330a.png)

<h3 id="browser_page">访问页面</h3>

类似于访问域名，访问页面的性能监控是根据页面维度来展示 BI 性能监控数据的，其交互逻辑与访问域名相同。

在选择左侧访问请求后，可以单独查看该请求的性能趋势等信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/854b2c80-aa23-426b-9450-62d2fb8a7e6e.png)

<h3 id="browser_location">定位分析</h3>

定位分析提供用户体验 Apdex，整页加载完成，白屏时间，首屏时间，资源加载完成，网页加载完成，性能分析多个维度的数据对比，同时提供了操作系统，设备，浏览器，域名，页面等多维度数据统计，用于多方位的浏览器浏览性能分析。

* 用户体验 Apdex：Apdex是用户对应用性能满意度的量化值
* 整页加载完成：Page Load Time，是指页面完成整个加载过程的时刻
* 白屏时间：从准备加载页面到浏览器开始显示内容的时间
* 首屏时间：指用户看到第一屏，即整个网页顶部大小为当前窗口的区域，显示完整的时间
* 资源加载完成：页面内js、css、image等资源加载时间
* 网页加载完成：从接收到页面文档第一个字节到接收到最后一个字节的时间
* 性能分析：可以根据以上指标和用户特征进行性能对比

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/db11977e-220e-4283-b43c-d076121fb749.png)

<h3 id="browser_ajax">Ajax接口</h3>

从 Ajax 维度，展示每条 Ajax 请求的平均响应时间，时间百分比，吞吐量，并且从响应时间 TOP5，吞吐量 TOP5，发送数据，接收数据四个方面展示请求性能趋势。

在选择左侧 Ajax 请求后，可以单独查看该请求的性能趋势等信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/399f52ab-06eb-4be4-b278-b7192999ed4c.png)

<h3 id="browser_script">脚本错误</h3>

从多维度展示 JavaScript 执行过程中的错误信息。

* 错误信息：具体的错误信息，在选择左侧错误信息后，可以单独查看该错误信息的详情。
* 出错页面：错误产生的请求页面

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/4f5e012d-2e1d-480a-ae27-0a19e62990bc.png)

<h3 id="browser_performance">浏览器性能</h3>

从浏览器维度，展示不同浏览器的性能指标，指标类型与 ajax 接口类似。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/f5170842-04a2-4c01-9569-19b06725e2b0.png)

<h3 id="browser_summary">摘要</h3>

从访问域名，访问页面，系统，浏览器，设备等方面展示页面加载的具体详情。

选择左侧某条维度信息后，会展示该维度信息的页面请求过程详情。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/4560438d-407d-4f6b-a81a-2b3daa5893f1.png)

<h3 id="browser_geography">地理</h3>

从访问地理维度展示各个地区的访问性能情况。

选择左侧地理信息，会展示该地区的具体访问性能指标。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/42f96944-e796-43e1-b750-f003f58e699d.png)

## 后端指标监控

在 Erda 平台上，通过内置的 JavaAgent 来自动获取 Java 服务的性能指标，包括 JVM 指标、接口的请求速度、响应时间等。

但在一些场景下，开发团队和客户想要关注业务指标的状态，比如调用第三方短信的成功率、订单数量等。基于此需求，我们提供了监控的 monitor_sdk ，以便业务开发可以订阅需要的业务指标。

### Monitor SDK
#### 接入方式
在应用的 pom 文件中添加:
```xml
<dependency>
	<groupId>io.terminus.erda</groupId>
	<artifactId>monitor_sdk</artifactId>
	<version>1.0.0</version>
</dependency>
```
#### SDK APIs
SDK 提供了 Counter、Gauge、Meter、Histogram、Summary 五种常用的 metric 类型。
##### Counter
**Counter** (计数器)用于计算采集周期内的累计值，例如计算一段时间内的订单数量、错误发生次数等。采集周期由监控系统内部控制，业务无需干预。
```java
// 同一个metrics全局只能注册一次
Counter counter = MetricRegistry.registerCounter(new CounterBuilder("order", "Order quantity. "));
counter.inc(); // 累加1
counter.add(2);
```
需要注意的是，counter 累加值不能为负数。

##### Gauge
**Gauge** (仪表盘)是可增可减的指标类型，用于反应某个业务指标的当前状态，如当前服务的 CPU 使用率。
```java
// 同一个metrics全局只能注册一次
Gauge gauge = MetricRegistry.registerGauge(new GaugeBuilder("cpu_usage", "Current cpu active usage. "));
gauge.value(95);
```

##### Meter
**Meter** (计量器)用于表示事件发生的速率( rate )，如接口的 QPS，meter 会自动计算最近1分钟内的速率。
```java
// 同一个metrics全局只能注册一次
Meter meter = MetricRegistry.registerMeter(new MeterBuilder("QPS", "Request qps."));
meter.mark(1);
```

##### Histogram
**Histogram** (直方图)用于表示一段时间范围内对数据进行采样（通常是请求持续时间或响应大小），并能够对其指定区间以及总数进行统计，通常它采集的数据展示为直方图。
```java
// 同一个metrics全局只能注册一次
Histogram histogram = MetricRegistry.registerHistogram(new HistogramBuilder("RT", "Response Time"));
histogram.observe(30);
```

##### Tag
需要注意的是，在使用 metric 类型时，通常会在指标上附加一些 标签 ，如当前请求的用户 ID、请求 URL 等。在自定义的告警计算中，也需要这些 标签 对数据进行过滤和分组等操作。
在 SDK 中， 标签 使用 label 定义，和自定义的告警中 Tag 相对应。
```java
CounterBuilder counterBuilder = new CounterBuilder("order", "Order quantity. ");
counterBuilder.setLabels(new String[]{"user_id","item"});
Counter counter = MetricRegistry.registerCounter(counterBuilder);
// args 要和上面定义的labels 顺序一一对应
counter.add(2, new String[]{"1002","电子书"});
```

##### Config
SDK 提供了 Config API 允许在业务服务中获取当前环境的配置，如当前请求的 request-id 、在 Erda 环境中的服务名称 serviceName 。
```java
Config config = ConfigManager.getConfig();
String requestId = config.getRequestId();
String serviceName = config.getServiceName();
String applicationName = config.getApplicationName();
String projectName = config.getProjectName();
```

#### 自定义指标告警
可以基于接入的自定义指标，进行自定义告警配置，具体参考 **运维管理** 下的 [自定义指标的告警配置](../o_m/custom-metrics.md) 。


