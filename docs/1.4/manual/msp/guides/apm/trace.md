# 链路追踪

随着业务规模和深度的拓展，微服务中的业务可能横跨多个应用，依赖的中间件也越来越多，任一节点出现问题，都可能导致整个业务请求出现波动或异常。

全链路追踪能够分布式地抓取多个节点的业务记录，并通过统一的请求 ID 将一次请求过程中的各个节点记录串联起来，方便排查请求过程中的业务瓶颈或异常点。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/9d4a6a36-a076-4fb5-ba0b-7b5caa4bcb54.png)

点击 **查看详情** 可查看具体的链路信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/d3277e55-a36d-4369-8133-a282be4cb9d9.png)

* **Trace**：一次调用的完整记录，由多个 Span 组成。
* **Span**：一次调用中的某个节点或步骤，类似于一层堆栈信息。Span 之间存在父子或并列关系以表明 Span 在整个调用中的生命周期。

  :::tip 提示

  点击链路图中的 Span 节点可查看调用过程中的关键信息。

  :::

服务每次与外界交互时都会生成一个 Span，例如，服务接收到一个请求，服务发起一次 RPC 调用，服务发起一次 DB 调用。

```json
A ------------- Span1 ---------------
A   ---- Span2 ------
B    --- Span3 ---
A                      --- Span4 --
```

如上图所示：

* 服务 A 收到一个请求会生成一个 Span 1。
* 服务 A 发起一个 RPC 请求调用服务 B 会生成一个 Span 2，其父 Span 为 Span 1。
* 服务 B 收到服务 A 的 RPC 请求后生成 Span 3，其父 Span 为 Span 2。 两者的开始/结束时间差即网络耗时。
* 服务 A 收到 RPC 响应后发起 DB 调用会再生成一个 Span 4，其父 Span 为 Span 1，其兄弟 Span 为 Span 2，Span 4 与 Span 2 为平级关系。