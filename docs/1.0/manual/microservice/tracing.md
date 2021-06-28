# 全链路追踪和诊断

随着业务规模和深度的增加，微服务中的业务可能横跨多个应用，依赖的中间件也越来越多，其中一个节点出现问题，都可能会导致整个业务请求出现波动或者异常。

全链路追踪能够分布式的抓取多个节点的业务记录，并且通过统一的请求 ID 将一次请求过程中的各个节点记录串联起来，方便排查请求过程中的业务瓶颈或异常点。

## Trace 图解

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/27/10b65af6-d199-46e0-897f-aff2ca69463f.png)

**名词解释**

Trace：一次调用的完整记录，由多个 Span 组成。

Span：一次调用中的某个节点或者步骤，类似于一层堆栈信息。Span 之间存在父子或并列关系来表明 Span 在整个调用中的生命周期。

服务每次与外界进行交互时都会生成一个 Span，诸如：服务接收到一个请求，服务发起一次 RPC 调用，服务发起一次 DB 调用。

```text
A ------------- Span1 ---------------
A   ---- Span2 ------
B    --- Span3 ---
A                      --- Span4 --
```

如上图所示：

* 服务 A 收到一个请求会生成一个 Span1。
* 服务 A 发起一个 RPC 请求调用服务 B 会生成一个 Span2，Span2 的父 Span 是 Span1。
* 服务 B 收到服务 A 的 RPC 请求后会生成 Span3，Span3 的父 Span 是 Span2，Span3 的开始/结束时间与 Span2 的开始/结束时间之间的时间差就是网络耗时。
* 服务 A 收到 RPC 的响应后再发起 DB 调用会再生成一个 Span4，Span4 的父 Span 是 Span1，其兄弟 Span 是 Span2，Span4 与 Span2 是平级的。

:::tip

点击链路图中的 Span 节点可以展示调用过程中的关键信息。

:::

:::tip

使用 SDK 可以在代码中获取当前链路的 requestId

```pom
<dependency>
  <groupId>io.terminus.erda</groupId>
  <artifactId>monitor_sdk</artifactId>
  <version>1.0.0</version>
</dependency>
```

```java
Config config = ConfigManager.getConfig();
String requestId = config.getRequestId();
```

:::

## 使用场景

### 问题定位
在`错误分析`中捕获一个异常。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/e41b43fa-2bea-4095-92dc-503a8a7b4091.png)

点击异常查看异常详情，里面展示了具体的异常堆栈、异常信息，方便您定位异常。也有发生请求的信息，可以使用这个信息再次构建这个请求复现这个错误。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/d0d0617d-fdd1-436d-b303-34ec102ce685.png)

在异常详情中点击链路按钮查看整个请求链路节点，方便定位是否是上下游导致的这个问题。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/90431096-92d0-4ada-98af-422061dcfbfb.png)
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/26/e7cec2d7-fa2f-4cca-ae5b-de520e388f54.png)

### 问题重现
在`链路追踪`中发起相同的请求，查看这个请求中的各个节点，并判断性能瓶颈是在哪个节点，是哪一步耗时最长。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/03/27/b0eb7457-752d-4e29-b7bb-2669276fc95b.png)

