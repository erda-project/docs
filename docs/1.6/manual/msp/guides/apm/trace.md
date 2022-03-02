# 链路追踪

随着业务规模和深度的拓展，微服务中的业务可能横跨多个应用，依赖的中间件也越来越多，任一节点出现问题，都可能导致整个业务请求出现波动或异常。

正因为服务间的错综复杂的关系，并且绝大部分项目并没有妥善的处理好这些关系，一旦某个环节出现错误，排查问题流程变的异常复杂。

而链路追踪正是为了解决这种问题，链路追踪能够分布式地抓取多个节点的业务记录，并通调用过统一的请求 ID 将一次请求过程中的各个节点记录串联起来，方便排查请求过程中的业务瓶颈或异常点，从而可以迅速的在整个链路中获取到异常点。

**入口： 微服务治理平台 > 诊断分析 > 链路追踪**

## 链路查询

### 概念及术语

一条调用链可以视为一个由多个Span组成的有向无环图（DAG图）。
```
一个tracer过程中，各span的关系


        [Span A]  ←←←(the root span)
            |
     +------+------+
     |             |
 [Span B]      [Span C] ←←←(Span C 是 Span A 的孩子节点, ChildOf)
     |             |
 [Span D]      +---+-------+
               |           |
           [Span E]    [Span F] >>> [Span G] >>> [Span H]
                                       ↑
                                       ↑
                                       ↑
                         (Span G 在 Span F 后被调用, FollowsFrom)
```
有些情况下，使用下面这种基于时间轴的时序图可以更好地展现调用链。
```
上述tracer与span的时间轴关系


––|–––––––|–––––––|–––––––|–––––––|–––––––|–––––––|–––––––|–> time

 [Span A···················································]
   [Span B··············································]
      [Span D··········································]
    [Span C········································]
         [Span E·······]        [Span F··] [Span G··] [Span H··]
```

* **Trace**：一个trace代表一个潜在的，分布式的，存在并行数据或并行执行轨迹（潜在的分布式、并行）的系统。一个trace可以认为是多个span的有向无环图（DAG）。
* **Span**：一个span代表系统中具有开始时间和执行时长的逻辑运行单元。span之间通过嵌套或者顺序排列建立逻辑因果关系。一次调用中的某个节点或步骤，类似于一层堆栈信息。Span 之间存在父子或并列关系以表明 Span 在整个调用中的生命周期。
* **Operation Name**: 每一个span都有一个操作名称，这个名称简单，并具有可读性高。（例如：一个RPC方法的名称，一个函数名，或者一个大型计算过程中的子任务或阶段）。span的操作名应该是一个抽象、通用的标识，能够明确的、具有统计意义的名称；更具体的子类型的描述，请使用Tags
* **Inter-Span References**: 一个span可以和一个或者多个span间存在因果关系。Erda 遵循了 OpenTracing 定义的两种关系：ChildOf 和 FollowsFrom。这两种引用类型代表了子节点和父节点间的直接因果关系。

**ChildOf** 引用: 一个span可能是一个父级span的孩子，即"ChildOf"关系。在"ChildOf"引用关系下，父级span某种程度上取决于子span。下面这些情况会构成"ChildOf"关系：

一个RPC调用的服务端的span，和RPC服务客户端的span构成ChildOf关系
一个sql insert操作的span，和ORM的save方法的span构成ChildOf关系
很多span可以并行工作（或者分布式工作）都可能是一个父级的span的子项，他会合并所有子span的执行结果，并在指定期限内返回
下面都是合理的表述一个"ChildOf"关系的父子节点关系的时序图。
```
    [-Parent Span---------]
         [-Child Span----]

    [-Parent Span--------------]
         [-Child Span A----]
          [-Child Span B----]
        [-Child Span C----]
         [-Child Span D---------------]
         [-Child Span E----]
```
**FollowsFrom** 引用: 一些父级节点不以任何方式依然他们子节点的执行结果，这种情况下，我们说这些子span和父span之间是"FollowsFrom"的因果关系。"FollowsFrom"关系可以被分为很多不同的子类型，未来版本的OpenTracing中将正式的区分这些类型

下面都是合理的表述一个"FollowFrom"关系的父子节点关系的时序图。
```
    [-Parent Span-]  [-Child Span-]


    [-Parent Span--]
     [-Child Span-]


    [-Parent Span-]
                [-Child Span-]
```

### Erda 中的链路追踪

对于 java 服务，erda 采用 agent 自动探针的方式采集链路信息，用户无需感知如何接入，只需使用 erda 提供的流水线 action 进行部署服务，既可以自己集成 agent, 
自动采集后的追踪数据可以通过链路查询进行查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/6e37cc0b-3db0-41e6-99fc-8519702aaddd.png)

点击可查看具体的链路信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/f0c02fbf-7b9b-46e2-a36a-6e08aabee1da.png)

  :::tip 提示

  点击链路图中的 Span 节点可查看调用过程中的关键信息。

  :::

服务每次与外界交互时都会生成一个 Span，例如，服务接收到一个请求，服务发起一次 RPC 调用，服务发起一次 DB 调用。

如上图所示：

* 服务 A 收到一个请求会生成一个 Span 1。
* 服务 A 发起一个 RPC 请求调用服务 B 会生成一个 Span 2，其父 Span 为 Span 1。
* 服务 B 收到服务 A 的 RPC 请求后生成 Span 3，其父 Span 为 Span 2。 两者的开始/结束时间差即网络耗时。
* 服务 A 收到 RPC 响应后发起 DB 调用会再生成一个 Span 4，其父 Span 为 Span 1，其兄弟 Span 为 Span 2，Span 4 与 Span 2 为平级关系。

## 链路调试

链路调试可以链路查询配合使用，如：当通过链路查询发现到了一个异常的 trace, 这是如果已经过了很长时间，某些数据可能已经丢失，这时可以通过链路调试功能，迅速还原出一条新的 trace，继续定位问题。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/3767468a-9a47-4fc7-b02b-a0995e4abd2d.png)