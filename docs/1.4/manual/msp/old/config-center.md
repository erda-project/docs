# Spring 框架使用

基于 Spring 开发的服务，会基于 application.yml 或 application.properties 进行服务配置，配置项的来源通常是环境变量。由于环境变量无法动态变更生效，所以修改配置之后需要通过重新部署服务来获取最新的配置，重新部署服务必然会使业务中断，必然会造成影响。为了有效解决服务重启更新配置的问题，配置中心提供了动态配置更新的解决方案，可以不用重新部署服务，秒级动态生效配置。

配置中心底层基于 [Nacos](https://nacos.io/zh-cn/docs/what-is-nacos.html) 实现，Nacos 是阿里巴巴的一款开源中间件。具体的使用方法如下：

#### dice.yml 中引用配置中心 Addon


```yaml
addons:
  config:
    plan: config-center:basic
```

#### 修改 maven 的 pom.xml 文件

 Spring-Boot 1.x 版本

```xml
        <dependency>
            <groupId>io.terminus.common</groupId>
            <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
            <version>1.4.5.RELEASE</version>
        </dependency>
```

Spring-Boot 2.0.x 版本

```xml
        <dependency>
            <groupId>io.terminus.common</groupId>
            <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
            <version>2.0.5.RELEASE</version>
        </dependency>
```

Spring-Boot 2.1.x版本

```xml
        <dependency>
            <groupId>io.terminus.common</groupId>
            <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
            <version>2.1.2.RELEASE</version>
        </dependency>
```

#### 使用 Spring Cloud Config 的 @RefreshScope 注解

获取配置的方式可以使用 @Value 或者 @ConfigurationProperties

```java
package io.terminus.erda.trial.demo.helloconfigcenter.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RefreshScope
@RestController
public class HelloConfigCenterController {

    @Value("${demo.name:Bob}")
    private String name;

    @GetMapping("/hello")
    public String hello() {
        return "Hello! " + name;
    }
}

```

#### 配置中心控制台上进行动态配置修改

dice.yml 中引用了配置中心，服务部署成功后，服务插件菜单栏会出现配置中心的控制台入口。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/20/2cae9232-238b-41df-86a4-966d63e0b8d8.png)



进入配置中心控制台，即可进行配置项的修改等操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/20/c1fc03c5-b02a-49ae-9dde-5faade2e52db.png)



#### 本地连平台配置中心

需要配置以下环境变量:

- CONFIGCENTER_TENANT_NAME
- CONFIGCENTER_TENANT_ID
- CONFIGCENTER_ADDRESS
- CONFIGCENTER_GROUP_NAME

具体取值，可以通过点击部署详情中的配置中心卡片，进入微服务治理页面，点击`组件信息->配置中心`进行查看
