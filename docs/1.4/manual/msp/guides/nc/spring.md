# Spring 应用配置热更新

基于 Spring 开发的服务，将通过 application.yml 或 application.properties 进行服务配置，其配置项来源通常是环境变量。由于环境变量无法动态变更生效，配置修改后需重新部署服务以获取最新配置，进而导致业务中断，造成不利影响。

为此，配置中心提供了动态配置更新的解决方案，无需重新部署服务，即可秒级动态生效配置。

:::tip 提示

基于配置中心的动态配置更新能力，除支持 Java 语言和 Spring 框架外，也支持其他语言和框架通过配置中心的 API 或 SDK 接入使用。

 :::

## erda.yml 中引用配置中心 Addon


```yaml
addons:
  config:
    plan: config-center:basic
```

## 修改 Maven 的 pom.xml 文件

* Spring-Boot 1.x 版本

  ```xml
          <dependency>
              <groupId>io.terminus.common</groupId>
              <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
              <version>1.4.5.RELEASE</version>
          </dependency>
  ```

* Spring-Boot 2.0.x 版本

  ```xml
          <dependency>
              <groupId>io.terminus.common</groupId>
              <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
              <version>2.0.5.RELEASE</version>
          </dependency>
  ```

* Spring-Boot 2.1.x版本

  ```xml
          <dependency>
              <groupId>io.terminus.common</groupId>
              <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
              <version>2.1.0.RELEASE</version>
          </dependency>
  ```

## 使用 Spring Cloud Config 的 @RefreshScope 注解

可使用 `@Value` 或 `@ConfigurationProperties` 获取配置。

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

## 配置中心控制台中修改动态配置

若 erda.yml 引用了配置中心，服务部署成功后，服务插件中将出现配置中心的控制台入口。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/c69af722-5cc2-4cb7-8043-4cf558aacdb1.png)

进入配置中心控制台，即可对配置项进行修改、删除等操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/43c9de68-d23f-4283-8cfd-6becdc6f163f.png)

## 本地连线上配置中心

请配置以下环境变量：

- CONFIGCENTER_TENANT_NAME
- CONFIGCENTER_TENANT_ID
- CONFIGCENTER_ADDRESS
- CONFIGCENTER_GROUP_NAME
