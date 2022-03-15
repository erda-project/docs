# Java Agent 使用

请从以下路径获取源码：https://github.com/erda-project/erda-java-extensions 。

## Agent 介绍
自 Java 5 版本之后，JDK 提供 Instrument 包以实现一些炫酷的功能，市面上部份 APM 工具即以此进行增强。该功能对于业务开发者而言相对偏门，但您可能已在无意中有所涉及，例如 JetBrains IDEA Debug 功能和 SkyWalking Java 探针实现。Erda 受到 SkyWalking 探针技术的启发，在此基础上实现一套 Erda 原生的 Java Agent，用于监控部署在 Erda 上的众多 Java 服务。

基于 Java Agent，您可以实现一个附加的代理程序，用于完成一些辅助功能，甚至可对 JDK 的一些类进行修改，类似于 JVM 级别的 AOP。

通常情况下，Java 的启动入口为 main 方法，而 Agent 的入口为 premain，顾名思义，该方法在 main 方法之前执行。Agent 技术定义了一套标准接口，您可通过这些接口在未继承或实现任何类的基础之上完成 AOP，即无侵入式开发。

## Erda 中的 Java Agent

### 接入方式
无侵入式开发可实现无感知接入 Agent。在 Erda 中，您只需通过 Pipeline 部署服务即可接入，无需其他操作。Pipeline 具体流程请参见 [基于 Git 源码部署](../../../dop/examples/deploy/deploy-from-git.md)。
目前已支持 buildpack、buildpack-aliyun、java-build、java 等 action 的无缝构建。

### 插件

#### 支持的插件列表
- agent-app-insight-common
- [agent-cpu-plugin](#agent-cpu-plugin)
- agent-dubbo-2.7.x-plugin
- agent-dubbo-plugin
- agent-feign-plugin
- agent-httpClient-4.x-plugin
- agent-httpasyncclient-4.x-plugin
- agent-jdbc-plugins
- agent-jedis-2.x-plugin
- agent-jvm-plugin
- agent-mysql-5.x-plugin
- agent-mysql-8.x-plugin
- agent-lettuce-5.x-plugins
- agent-log4j2-plugin
    - agent-log4j2-plugin
    - agent-logback-plugin
    - agent-logback-spring-boot-plugin
- agent-microservice-plugin
- agent-okhttp-4.x-plugins
- agent-redisson-3.x-plugin
- agent-rocketmq-4.x-plugin
- [agent-sdk-plugin](#agent-sdk-plugin)
- agent-jetty-servlet-plugin
- agent-tomcat-servlet-plugin
- agent-sharding-sphere-4.x-plugin
- agent-spring-plugins
    - agent-concurrent-util-4.x-plugin
    - agent-resttemplate-4.x-plugin
- agent-tomcat-metric-plugin
- agent-trantor-plugin

#### 插件详解

##### agent-cpu-plugin
CPU 插件用于采集 JVM 当前进程中的 CPU 使用率，通过计算 JVM 所有线程使用 CPU 的时间得出最终数据。默认为开启，每 20 秒采集一次。

:::tip 提示
若 CPU 使用 Intel 酷睿多线程技术，可能出现 CPU 使用率为实际物理核数两倍的情况，即 2C，使用率达到 400%。
:::

##### agent-sdk-plugin
Java Agent 提供手动开启的函数埋点功能，可在开启后自动拦截函数的调用时间，并展示在链路详情的 Span 事件中。

#### 使用方式

##### 单函数埋点

在部署配置中添加 MSP_METHOD_INTERCEPT_POINTS 环境变量即可开启单个函数的埋点。
```java
### 通过{class}#{method}指定需埋点的函数，可通过,添加多个
MSP_METHOD_INTERCEPT_POINTS = io.terminus.class1#method1,io.terminus.class2#method2
```

##### 多函数埋点

若不确定需埋点的函数，可在部署配置中添加 MSP_PACKAGE_INTERCEPT_POINTS 环境变量，开启指定 Package 下的所有函数埋点。

:::tip 提示
若 Package 下的类较多，使用变量将增加首次访问该包下面类时的耗时，请谨慎使用。
:::

```java
### 通过{package}指定需埋点的包，可通过,添加多个
### 以下示例可拦截 io.terminus 包下的所有函数
MSP_PACKAGE_INTERCEPT_POINTS = io.terminus
```
