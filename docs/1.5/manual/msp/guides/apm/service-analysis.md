# 服务分析
进入 **微服务平台 > 项目列表 > 选择项目 > 环境总览 > 服务列表**，可查看当前所有服务实例。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/6d449876-5827-4ee2-abb4-df1043d13a4d.png)


## 服务概览

服务概览页展示 Server 应用实例列表和性能总览。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/5b015bb4-3f05-4e6d-a1cd-df40cfc42b8c.png)

* **接口请求量**：选择时间段内各事务（HTTP、RPC、DB 等）的请求总量趋势。
* **请求延迟**：选择时间段内各事务（HTTP、RPC、DB 等）的平均延迟时间趋势。
* **HTTP 状态**：选择时间段内 HTTP 事务中各种状态次数出现的趋势。

## 事务分析

事务分析页展示 Server 应用的事务详情，包括 HTTP 事务、RPC 事务、缓存和数据库事务。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/df9fb85b-bae1-4909-a4cb-128b2e6cfa41.png)

* **HTTP 事务**：每个事务接口在选择时间段内的平均响应时间、调用次数等信息。
* **服务请求**：选择时间段内每分钟被请求的事务接口与趋势。
* **请求延迟**：选择时间段内事务接口的平均响应时间与趋势。
* **慢事务追踪 Top50**：选择时间段内响应时间超过 300ms 且排列前 50 的事务接口，以及各自发生次数与平均响应时间等信息，展开后可查看采样请求对应的日志和链路。
* **错误事务追踪 Top50**：选择时间段内发生异常且排列前 50 的事务接口，以及各自发生次数与平均响应时间等信息，展开后可查看采样请求对应的日志和链路。


## 进程分析

进程分析页展示应用中各模块的容器状态和 JVM 状态，且默认显示第一个模块。若一个应用下部署了多个实例，则默认显示第一个模块的第一个实例。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/11005150-62e9-4ef3-8b5d-155cfce7e361.png)

* **Heap Memory Usage**：JVM 堆内存使用情况。
* **Non Heap Memory Usage**：JVM 非堆内存使用情况。
* **Eden-Space/Old-Gen/Survivor-Space**：分别表示 JVM 堆内存中伊甸园区、老年代区和幸存者区。
* **GC 次数/GC 平均时间**：分别表示 JVM GC 的次数和平均时间。
* **Class Count**：展示 JVM 从启动开始加载和卸载的类个数。
* **JVM Thread**：JVM 加载线程。

