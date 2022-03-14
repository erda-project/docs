# Erda 中的 Java Agent 使用

Github 源码地址： https://github.com/erda-project/erda-java-extensions

## Agent 介绍
Java 5 版本以后，JDK 提供了 instrument 包，能够实现一些非常酷的功能，市面上一些 APM 工具，就是通过它来进行的增强，这个功能对于业务开发者来说，是比较偏门的。
但你可能在无意中已经用到它了，比如 JetBrains IDEA debug 功能， SkyWalking Java 探针实现。 Erda 受到了 SkyWalking 探针技术的启发，在其基础上实现了
一套 Erda 原生的 Java Agent，用以监控部署在 Erda 之上众多的 Java 服务。

基于 Java agent，我们可以实现一个附加的代理程序，用来做一些辅助功能，甚至可以对于 JDK 的一些类也可以做修改，有点类似于 JVM 级别的 AOP。

通常 Java 的启动入口是 main 方法，而 agent 的入口是 premain , 顾名思义这个方法会在 main 方法执行之前执行，Agent 技术定义了一套标准接口，通过这些接口
我们可以在不继承或者实现任何类的基础之上做一些 AOP 的事，美其名曰：无侵入开发。

## Erda 中的 Java Agent

### 接入方式
无侵入的好处在于你只需要做很少的事情，就可以无感知的接入agent，而在 Erda 中，你只需要通过 pipeline 部署你的服务即可接入，无需做其他的任何事。详细 pipeline 流程请参考 [基于 Git 源码部署](../../../dop/examples/deploy/deploy-from-git.md),
目前支持了 buildpack，buildpack-aliyun, java-build, java 等 action 的无缝构建。

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
cpu 插件用来采集 jvm 当前进程 cpu 使用率，最终数据通过计算 jvm 所有线程使用 cpu 的时间得出。默认开启，每 20 秒采集一次。

注意： cpu 如果使用了 intel 酷睿多线程技术，可能会出现 cpu 使用率是实际物理核数 2 倍的情况，即： 2c， 使用率达到 400 %

##### agent-sdk-plugin
在 Java Agent 里面，我们提供了手动开启的函数埋点功能，可以在开启后，自动拦截函数的调用时间，并展示在链路详情的 span 事件中。

###### 使用方式

**单个函数埋点：**

在部署配置中添加 **MSP_METHOD_INTERCEPT_POINTS** 环境变量可以开启单个函数的埋点。
```java
### 通过{class}#{method} 指定需要埋点的函数，可以通过,添加多个
MSP_METHOD_INTERCEPT_POINTS = io.terminus.class1#method1,io.terminus.class2#method2
```

**多函数埋点**

在不能准确知道需要埋点的函数时，可以通过在部署配置中添加 **MSP_PACKAGE_INTERCEPT_POINTS** 环境变量开启指定 package 下面的所有函数埋点

**注意：如果 package 下的类特别多，使用次变量会增加第一次访问这个包下面类时的耗时，请谨慎使用**

```java
### 通过{package} 指定需要埋点的包，可以通过,添加多个
### 下面的示例可以拦截 io.terminus 包下面的所有函数
MSP_PACKAGE_INTERCEPT_POINTS = io.terminus
```