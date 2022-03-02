# 服务监控
进入 **微服务治理平台 > 监控中心 > 服务监控**，您可在此查看服务的监控情况。

## 总览

进入服务监控后，默认进入总览页。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/da336ea2-dbb6-42ef-93dc-bcea4c3df8ab.png)

服务拓扑中可查看当前服务拓扑节点，以及与当前服务有直接关联的其他服务节点、中间件节点等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/9c56dd6c-71c2-4287-8c64-00a29c7f9835.png)

* **平均吞吐量**：选择时间段内，该服务的平均吞吐量。
* **平均响应时间**：选择时间段内，该服务的平均响应时间。
* **请求错误率**：选择时间段内，该服务的所有请求错误率。
* **服务实例**：选择时间段内，该服务的实例数量。

## 调用监控

调用监控页展示 Server 应用的事务详情，包括以下五类调用监控：
- HTTP 调用
- RPC 调用
- 缓存调用
- 数据库调用
- MQ 调用

### HTTP 调用

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/c9b651f0-a8c3-4246-8e66-4d6150d32841.png)

* **吞吐量**：选择时间段内的吞吐量趋势图。
* **平均响应时间**：选择时间段内的平均响应时间趋势图。
* **请求分布**：选择时间段内的请求分布气泡图。

点击某事务名称，可查看其概览及慢调用情况。

#### 概览

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/c43ca1a1-4b1a-4d2f-8e51-6191d347d5b4.png)

* **吞吐量**：选择时间段内，当前调用 API 的吞吐量趋势图。
* **平均响应时间**：选择时间段内，当前调用 API 的平均响应时间。
* **慢调用次数**：选择时间段内，当前事务的慢调用次数。

#### 慢调用

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/feaaae1c-de46-49a4-b519-e51b8cea1d49.png)

### PRC 调用

RPC 调用概览及慢调用与 HTTP 调用类似，具体请参见 [HTTP 调用](#HTTP-调用)。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/31a75286-d00d-4754-ac78-8d98f6019c08.png)

### 数据库调用

数据库调用概览及慢调用与 HTTP 调用类似，具体请参见 [HTTP 调用](#HTTP-调用)。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/f39a7811-bd69-4cf4-bd75-b4085a625598.png)

## 链路查询

您可通过服务监控链路查询，查看当前服务中发生的链路情况，其功能与 **诊断分析 > 链路追踪** 中的 [链路查询](trace.md) 一致。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/255697d2-52eb-4ef2-9050-09050ad258d2.png)


## 资源监控

资源监控可通过以下三种方式监控服务的资源使用情况：

- **运行时监控**：查看不同语言的运行时情况，例如 Java、NodeJS。
- **容器监控**：监控容器的 CPU、内存使用情况等。
- **主机监控**：查看当前服务实例所在的宿主机资源使用情况。

### 运行时监控

#### Java 运行时

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/ca7289ed-72b2-4cdc-ac62-812bb0fc13de.png)

* **堆内存**：JVM 堆内存使用情况。
* **非堆内存**：JVM 非堆内存使用情况。
* **Eden Space/Survivor Space/Old Gen**：分别表示 JVM 堆内存的 Eden 区、Survivor 区和老年代区。
* **GC 次数/GC 平均时间**：分别表示 JVM GC 的次数和平均时间。
* **Class 数量**：JVM 从启动开始加载和卸载的类个数。
* **JVM 线程**：JVM 加载线程。

#### NodeJS 运行时

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/32f3648d-327d-4fd4-ae69-bf6047d4cf48.png)

* **堆内存**：NodeJS 堆内存使用情况。
* **非堆内存**：NodeJS 非堆内存使用情况。
* **Cluster Count**：Cluster 数量。
* **Async Resources**：Async Resources 数量。

### 容器监控

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/f57e9fdc-58be-49c7-944d-0145a808f56c.png)

* **容器 CPU**：当前服务实例所在容器的 CPU 趋势图。
* **容器内存**：当前服务实例所在容器的内存趋势图。
* **磁盘 IO**：当前服务实例所在容器的磁盘速率趋势图。
* **容器网络**: 当前服务实例所在容器的网络速率趋势图。

### 主机监控

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/02/5e6ebb3f-1130-43ea-8b46-b75f8396ef83.png)

* **CPU**：当前服务实例所在宿主机的 CPU 趋势图。
* **内存**：当前服务实例所在宿主机的内存趋势图。
* **系统负载**：当前服务实例所在宿主机的系统负载趋势图，例如 Load 1、Load 5、Load 15。
* **Pod 数量**：当前服务实例所在宿主机的 Pod 数量趋势图。
* **磁盘 IO 速率**：当前服务实例所在宿主机的磁盘 IO 趋势图。
* **网络速率**：当前服务实例所在宿主机的网络速率趋势图。
