# Java Agent Usage

See [GitHub Source Code](https://github.com/erda-project/erda-java-extensions) to get the source code.

## Introduction of Java Agent
Since Java 5, JDK has provided instrument packages to achieve some cool features, and some of the APM tools on the market are enhanced with it. This feature is relatively obscure to developers, but you may have inadvertently used it, such as JetBrains IDEA debug and SkyWalking Java probe. Inspired by the SkyWalking probe technology, Erda implements a suite of native Java agents to monitor numerous Java services deployed on Erda.

Based on the Java agent, you can implement an additional agent to achieve some auxiliary functions and even modify some classes of JDK, similar to the JVM-level AOP.

Generally, the entry point for Java is the main method, while the entry point for the agent is premain, which, as the name implies, is executed before the main method. Agent technology defines a set of standard interfaces through which you can complete AOP without inheriting or implementing any classes, that is, non-intrusive development.

## Java Agent in Erda

### Access Method
Non-intrusive development allows agent access without perception. In Erda, you only need to deploy services via pipeline for access. For details, see [Deploy Based on Git Source Code](../../../dop/examples/deploy/deploy-from-git.md). Actions such as buildpack, buildpack-aliyun, java-build and java are supported now.

### Plugin

#### Supported Plugins
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

#### Plugin Details

##### agent-cpu-plugin
The CPU plugin is used to collect CPU usage in the current process of JVM and get the final data by computing the CPU usage time for all threads of JVM. It is enabled by default and collects data every 20 seconds.

::: tip Tips
If the CPU adopts the Hyper-Threading Technology of Intel Core, the CPU usage rate may double the actual physical cores, that is, 2C, with a usage rate of 400%.
:::

##### agent-sdk-plugin
The Java agent supports function event tracking, which can be enabled manually, automatically intercepts the function call time when enabled and displays it in the span event of tracing details.

#### Usage

##### Single-Function Event Tracking

Add the MSP_METHOD_INTERCEPT_POINTS environment variable to the deployment configuration to enable single-function event tracking.
```java
### Specify the function by {class}#{method}, and seperate with ,
MSP_METHOD_INTERCEPT_POINTS = io.terminus.class1#method1,io.terminus.class2#method2
```

##### Multi-Function Event Tracking

If you are not sure of functions that require event tracking, you can add the MSP_PACKAGE_INTERCEPT_POINTS environment variable in the deployment configuration to enable all functions under the specified package.

:::tip Tips
If there are many classes under the package, using variables will increase the time taken to access these classes for the first time, so please operate carefully.
:::

```java
### Specify the package by {package}, and seperate with ,
### The following example intercepts all functions under the io.terminus package
MSP_PACKAGE_INTERCEPT_POINTS = io.terminus
```
