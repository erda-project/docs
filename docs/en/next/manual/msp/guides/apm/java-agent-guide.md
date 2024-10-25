# Java Agent Usage

See [GitHub Source Code](https://github.com/erda-project/erda-java-extensions) to get the source code.

## Introduction of Java Agent
Since Java 5, JDK has provided instrument packages to achieve some cool features, and some of the APM tools on the market are enhanced with it. This feature is relatively obscure to developers, but you may have inadvertently used it, such as JetBrains IDEA debug and SkyWalking Java probe. Inspired by the SkyWalking probe technology, Erda implements a suite of native Java agents to monitor numerous Java services deployed on Erda.

Based on the Java agent, you can implement an additional agent to achieve some auxiliary functions and even modify some classes of JDK, similar to the JVM-level AOP.

Generally, the entry point for Java is the main method, while the entry point for the agent is premain, which, as the name implies, is executed before the main method. Agent technology defines a set of standard interfaces through which you can complete AOP without inheriting or implementing any classes, that is, non-intrusive development.

## Java Agent in Erda

### Access Method
Non-intrusive development allows agent access without perception. In Erda, you only need to deploy services via pipeline for access. For details, see [Deploy Based on Git Source Code](../../../dop/examples/deploy/deploy-from-git.md). Actions such as buildpack, buildpack-aliyun, java-build and java are supported now.

#### Turning off the Java Agent

The application deployed in Erda will have Java Agent enabled by default. You can disable it by setting the environment variable `TERMINUS_AGENT_ENABLE=false`.

**Example:**

To inject application-level environment variables, you can add them in the `dice.yml` file under the `env` section.

```yaml
services:
  showcase-front:
    envs:
     TERMINUS_AGENT_ENABLE: false
    health_check:
      http:
        port: 7079
        path: /status
        duration: 120

addons:
  zk:
    plan: zookeeper:large
```

Set environment variables in the application.

![image-20241024175306208](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2024/10/24/e467ab6b-04c4-4e74-8b36-9e63a4e6ac73.png)

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

#### Enable or Disable Plugins

Since the Java agent uses techniques such as bytecode injection to build probes, you may encounter issues like class not found errors when updating plugins.

In such cases, you can temporarily disable the plugin causing the error:

```
MSP_PLUGIN_{PLUGIN_NAME}_ENABLED=false
```

Please use the environment variable from the table and replace `{PLUGIN_NAME}` with the relevant plugin name.

| Plugins             | Env variables plugin name |
| ------------------- | ------------------------- |
| agent-sdk           | MONITORSDK                |
| dubbo               | DUBBO                     |
| dubbo-2.7.x         | DUBBO                     |
| feign               | FEIGN                     |
| trantor             | TRANTOR                   |
| jedis-2.x           | JEDIS                     |
| redisson-3.x        | REDISSON                  |
| rocketmq-4.x        | ROCKETMQ                  |
| httpclient-4.x      | APACHE_HTTPCLIENT         |
| http async client   | APACHE_HTTPASYNCCLIENT    |
| sharding-sphere-4.x | SHARDINGSPHERE            |
| log4j2              | LOG4J2                    |
| logback             | LOGBACK                   |
| logback-spring-boot | LOGBACK                   |
| mysql-5.x           | MYSQL                     |
| mysql-8.x           | MYSQL                     |
| okhttp 4.x          | OKHTTP                    |
| lettuce-5.x         | LETTUCE                   |
| jetty-servlet       | JETTY                     |
| tomcat-servlet      | TOMCAT                    |
| resttemplate        | RESTTEMPLATE              |
| concurrent-util-4.x | SPRING_CONCURRENTUTIL     |

**Example: **

To inject application-level environment variables, you can add them in the `dice.yml` file under the `env` section.

```yaml
services:
  showcase-front:
    envs:
     MSP_PLUGIN_DUBBO_ENABLED: false
    health_check:
      http:
        port: 7079
        path: /status
        duration: 120

addons:
  zk:
    plan: zookeeper:large
```

Set environment variables in the application.

![img](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2024/10/24/6815cae0-4561-4ae2-af34-900d63e61cbd.png)
