# 服务监控
入口: 进入 **微服务治理平台 > 监控中心 > 服务监控** ，可查看服务的监控情况。

## 总览

默认会进入总览页

![服务监控总览](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/82d8d49b-1eef-425b-8653-54f734f5d686.png)

### 服务拓扑

![服务拓扑](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/968d01ad-9223-41ac-93dd-3620ed95f537.png)

服务拓扑可以查看当前服务拓扑节点，以及与当前服务有直接关联的其他服务节点， 中间件节点等。
* **平均吞吐量**：选择时间段内, 该服务的平均吞吐量。
* **平均响应时间**：选择时间段内, 该服务的平均响应时间。
* **请求错误率**：选择时间段内, 该服务的所有请求的错误率。
* **服务实例**：选择时间段内, 该服务实例数量。

## 调用监控

调用监控页展示 Server 应用的事务详情，包括以下五种调用监控：
- HTTP 调用
- RPC 调用
- 缓存调用
- 数据库调用
- MQ 调用

#### HTTP 调用

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/52f9a213-16e8-4434-bcfc-682d50b952e9.png)

* **吞吐量**：选择时间范围内，吞吐量趋势图。
* **平均响应时间**：选择时间范围内，平均响应时间趋势图。
* **请求分布**：选择时间范围内，请求分布气泡图。

点击事务名称，可查看事务概览，及慢调用查看

##### 概览

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/f808c990-5a07-4f5f-b1e1-e4961385add5.png)

* **吞吐量**：选择时间范围内，当前调用API吞吐量趋势图。
* **平均响应时间**：选择时间范围内，当前调用API平均响应时间。
* **慢调用次数**：选择时间范围内，当前事务的慢调用次数。

##### 慢调用

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/879d4f69-03f4-4194-b722-c559d41a72cc.png)

#### PRC 调用

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/5c3ac787-300d-49eb-a735-b1f9a9702366.png)

RPC 调用概览及慢调用与 HTTP 调用类似，不在赘述。

#### 数据库调用

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/fc4c5bb8-79e6-4b99-a648-089be9c8489d.png)

数据库调用概览及慢调用与 HTTP 调用类似，不在赘述。

### 链路查询

服务监控链路查询，可以查看当前服务中发生的链路情况, 详细功能与 [诊断分析 > 链路查询](trace.md) 一致

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/975a1298-df88-4a8f-8102-92b0284fa318.png)


## 资源监控

资源监控可以用来监控，服务的资源使用情况，分为以下三种方式监控

- 运行时监控：查看不同语言的运行时情况，如 Java, NodeJs
- 容器监控: 监控容器的 CPU， 内存使用等
- 主机监控：查看当时服务实例分布在的宿主机资源使用情况

### 运行时监控

#### Java 运行时

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/d15cd865-48d9-4d0e-a97c-cb5697f0b072.png)

* **Heap Memory Usage**：JVM 堆内存使用情况。
* **Non Heap Memory Usage**：JVM 非堆内存使用情况。
* **Eden-Space/Old-Gen/Survivor-Space**：分别表示 JVM 堆内存中 Eden 区、老年代区和 Survivor 区。
* **GC 次数GC 平均时间**：分别表示 JVM GC 的次数和平均时间。
* **Class Count**：展示 JVM 从启动开始加载和卸载的类个数。
* **JVM Thread**：JVM 加载线程。

#### NodeJS 运行时

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/6698801b-1f13-4ecc-a434-50567188dffe.png)

* **堆内存**：NodeJS 堆内存使用情况。
* **非堆内存**：NodeJS 非堆内存使用情况。
* **Cluster Count**：Cluster 数量。
* **Async Resources**：Async Resources 数量。

### 容器监控

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/6ca03d7e-6ac3-4184-8be8-a143d5ebfbaa.png)

* **容器 CPU**：当前服务当前实例所在容器 CPU 趋势图。
* **容器内存**：当前服务当前实例所在容器内存趋势图。
* **磁盘 IO**：当前服务当前实例所在容器的磁盘速率趋势图。
* **容器网络**: 当前服务当前实例所在容器的网络速率趋势图。

### 主机监控

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/e245d8dd-8e9d-43c1-8bdd-19983d8689d4.png)

* **CPU**：当前服务当前实例所在宿主机 CPU 趋势图。
* **内存**：当前服务当前实例所在宿主机 内存 趋势图。
* **系统负载**：当前服务当前实例所在宿主机 系统负载 趋势图，如 load 1, load 5, load 15。
* **Pod数量**：当前服务当前实例所在宿主机 Pod 数量 趋势图。
* **磁盘 IO 速率**：当前服务当前实例所在宿主机 磁盘 IO 趋势图。
* **网络速率**：当前服务当前实例所在宿主机 网络速率 趋势图。
