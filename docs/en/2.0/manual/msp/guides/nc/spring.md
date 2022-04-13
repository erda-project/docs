# Spring Application Configuration Hot Update

Services developed based on Spring will be configured via application.yml or application.properties, with the source of configuration items usually being environment variables. Since the environment variables cannot take effect dynamically, the service needs to be redeployed to get the latest configuration after changes, which leads to business interruptions and adverse impacts.

To this end, the configuration center provides a solution for dynamic configuration updates, which can take effect dynamically in seconds without redeploying services.

:::tip Tips

Based on the configuration center, it supports other languages and frameworks through the API or SDK of the configuration center in addition to Java language and Spring framework.

:::

## Reference Configuration Center Addon in dice.yml


```yaml
addons:
  config:
    plan: config-center:basic
```

## Modify pom.xml File of Maven

* Spring-Boot 1.x

   ```xml
           <dependency>
               <groupId>io.terminus.common</groupId>
               <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
               <version>1.4.5.RELEASE</version>
           </dependency>
   ```

* Spring-Boot 2.0.x

   ```xml
           <dependency>
               <groupId>io.terminus.common</groupId>
               <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
               <version>2.0.5.RELEASE</version>
           </dependency>
   ```

* Spring-Boot 2.1.x

   ```xml
           <dependency>
               <groupId>io.terminus.common</groupId>
               <artifactId>terminus-spring-boot-starter-configcenter</artifactId>
               <version>2.1.0.RELEASE</version>
           </dependency>
   ```

## Use @RefreshScope Annotation of Spring Cloud Config

You can use `@Value` or `@ConfigurationProperties` to get the configuration.

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

## Modify Dynamic Configuration in Configuration Center Console

If dice.yml references the configuration center, the console entry for the configuration center will appear in the service plugin after the service is successfully deployed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/acad3d06-24cd-4532-82a0-62306548c777.png)

Enter the configuration center console to modify, delete and perform other operations on the configuration items.



![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/52dd0903-2889-4a8d-b607-a537ee14e342.png)

## Local Connection to the Configuration Center

Please configure the following environment variables:

- CONFIGCENTER_TENANT_NAME
- CONFIGCENTER_TENANT_ID
- CONFIGCENTER_ADDRESS
- CONFIGCENTER_GROUP_NAME
