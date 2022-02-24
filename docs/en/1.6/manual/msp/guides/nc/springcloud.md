# Spring Cloud Microservice Registration and Discovery


## Local Application Development
### Prerequisites

Before you start, please confirm that you have done the following:

* Download [Maven](https://aliware-images.oss-cn-hangzhou.aliyuncs.com/EDAS/App-develop/apache-maven-3.6.0-bin.tar.gz) and set environment variables.
* Download the latest [Nacos Server](https://github.com/alibaba/nacos/releases).
* Follow the steps below to start Nacos server.
   1. Unzip the Nacos server package.
   2. Go to the `nacos/bin` directory and start Nacos server.

:::tip Tips
* Linux/Unix/Mac system: sh startup.sh -m standalone
* Windows system: double-click the file startup.cmd

:::


### Create a Service Provider
Create an application project of service provider locally, add dependencies, enable service registration and discovery, and specify the register as Nacos server.

1. Create a Maven project named nacos-service-provider.

2. Add dependencies in the pom.xml file. Here takes Spring Boot 2.1.4.RELEASE and Spring Cloud Greenwich.SR1 as examples:

   ```xml
       <parent>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-parent</artifactId>
           <version>2.1.4.RELEASE</version>
           <relativePath/>
       </parent>
   
       <dependencies>
           <dependency>
               <groupId>com.alibaba.cloud</groupId>
               <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
               <version>2.1.0.RELEASE</version>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
           </dependency>
       </dependencies>
   
       <dependencyManagement>
           <dependencies>
               <dependency>
                   <groupId>org.springframework.cloud</groupId>
                   <artifactId>spring-cloud-dependencies</artifactId>
                   <version>Greenwich.SR1</version>
                   <type>pom</type>
                   <scope>import</scope>
               </dependency>
           </dependencies>
       </dependencyManagement>


   ```

   * For Spring Cloud Greenwich, the corresponding Spring Cloud Alibaba version is 2.1.1.RELEASE.
   * For Spring Cloud Finchley, the corresponding Spring Cloud Alibaba version is 2.0.1.RELEASE.
   * For Spring Cloud Edgware, the corresponding Spring Cloud Alibaba version is 1.5.1.RELEASE.

   :::tip Tips
   The life cycle of the Spring Cloud Edgware version has ended, and it is not recommended to use this version to develop applications.
   :::

3. Create `package: io.terminus.erda.trial.demo.hellospringcloud` under the path `src/main/java`.

   Create the startup class `ProviderApplication` of the service provider in `package: io.terminus.erda.trial.demo.hellospringcloud`, and add the following code:

   ```java
   package io.terminus.erda.trial.demo.hellospringcloud;

   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

   /**
    * @author erda
    */
   @SpringBootApplication
   @EnableDiscoveryClient
   public class ProviderApplication {

       public static void main(String[] args) {
           SpringApplication.run(ProviderApplication.class, args);
       }
   }
   ```

   :::tip Tips
   The annotation `@EnableDiscoveryClient` indicates that this application needs to enable service registration and discovery.
   :::

Create `EchoController` in `package: io.terminus.erda.trial.demo.hellospringcloud`, specify URL mapping as `{/echo/{String}}`, specify HTTP method as GET, obtain method parameter from the URL path and echo the received parameters.

   ```java
   package io.terminus.erda.trial.demo.hellospringcloud;

   import org.springframework.web.bind.annotation.PathVariable;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;
   import org.springframework.web.bind.annotation.RestController;

   /**
    * @author erda
    */
   @RestController
   public class EchoController {
       @RequestMapping(value = "/echo/{string}", method = RequestMethod.GET)
       public String echo(@PathVariable String string) {
           return string;
       }
   }
   ```

4. Create `application.yml` under the path `src/main/resources` and add the following configuration to specify the address of Nacos server.

   ```yaml
   spring:
     application.name: service-provider
     cloud:
       nacos:
         discovery:
           server-addr: ${NACOS_ADDRESS:127.0.0.1:8848}
           namespace: ${NACOS_TENANT_ID:}
   ```

   :::tip Tips
   127.0.0.1 is the address of the Nacos server. If the Nacos server is deployed on another machine, change it to the actual IP address.
   :::

5. Verify the results.

6. Run the `main` function of `ProviderApplication` of `nacos-service-provider` to start the application.

7. Log in to the locally started Nacos server console *http://127.0.0.1:8848/nacos* (the default user name and password of the local Nacos console are both nacos).

8. In the left navigation bar, select **Service Management > Service List**, which already contains service-provider, and you can view detailed information as needed.

### Create a Service Consumer
1. Create a Maven project named nacos-service-consumer.

2. Add dependencies in pom.xml.

   ```xml
       <parent>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-parent</artifactId>
           <version>2.1.4.RELEASE</version>
           <relativePath/>
       </parent>
   
       <dependencies>
           <dependency>
               <groupId>com.alibaba.cloud</groupId>
               <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
               <version>2.1.0.RELEASE</version>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-starter-openfeign</artifactId>
           </dependency>
       </dependencies>
   
       <dependencyManagement>
           <dependencies>
               <dependency>
                   <groupId>org.springframework.cloud</groupId>
                   <artifactId>spring-cloud-dependencies</artifactId>
                   <version>Greenwich.SR1</version>
                   <type>pom</type>
                   <scope>import</scope>
               </dependency>
           </dependencies>
       </dependencyManagement>


   ```

3. Create `package: io.terminus.erda.trial.demo.hellospringcloud` under the path `src/main/java`.

4. Configure `RestTemplate` and `FeignClient` in `package: io.terminus.erda.trial.demo.hellospringcloud`.

   Create an interface class `EchoService` in `package: io.terminus.erda.trial.demo.hellospringcloud`, add `@FeignClient` annotation and configure the corresponding HTTP URL and HTTP method.

   ```java
   package io.terminus.erda.trial.demo.hellospringcloud;

   import org.springframework.cloud.openfeign.FeignClient;
   import org.springframework.web.bind.annotation.PathVariable;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;

   /**
    * @author erda
    */
   @FeignClient(name = "service-provider")
   public interface EchoService {
       @RequestMapping(value = "/echo/{str}", method = RequestMethod.GET)
       String echo(@PathVariable("str") String str);
   }
   ```

   Create a startup class `ConsumerApplication` in `package: io.terminus.erda.trial.demo.hellospringcloud` and add the relevant configuration.

   * Use the `@EnableDiscoveryClient` annotation to enable service registration and discovery.
   * Use the `@EnableFeignClients` annotation to activate `FeignClient`.
   * Add `@LoadBalanced` annotation to integrate `RestTemplate` with service discovery.

   ```java
   package io.terminus.erda.trial.demo.hellospringcloud;

   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
   import org.springframework.cloud.client.loadbalancer.LoadBalanced;
   import org.springframework.cloud.openfeign.EnableFeignClients;
   import org.springframework.context.annotation.Bean;
   import org.springframework.web.client.RestTemplate;

   /**
    * @author erda
    */
   @SpringBootApplication
   @EnableDiscoveryClient
   @EnableFeignClients
   public class ConsumerApplication {

       @LoadBalanced
       @Bean
       public RestTemplate restTemplate() {
           return new RestTemplate();
       }

       public static void main(String[] args) {
           SpringApplication.run(ConsumerApplication.class, args);
       }
   }
   ```

5. Create a class `TestController` in `package: io.terminus.erda.trial.demo.hellospringcloud` to demonstrate and verify the service discovery function.

   ```java
   package io.terminus.erda.trial.demo.hellospringcloud;
   
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.web.bind.annotation.PathVariable;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;
   import org.springframework.web.bind.annotation.RestController;
   import org.springframework.web.client.RestTemplate;
   
   /**
    * @author edas
    */
   @RestController
   public class TestController {
   
       @Autowired
       private RestTemplate restTemplate;
       @Autowired
       private EchoService echoService;
   
       @RequestMapping(value = "/echo-rest/{str}", method = RequestMethod.GET)
       public String rest(@PathVariable String str) {
           return restTemplate.getForObject("http://service-provider/echo/" + str,
                   String.class);
       }
   
       @RequestMapping(value = "/echo-feign/{str}", method = RequestMethod.GET)
       public String feign(@PathVariable String str) {
           return echoService.echo(str);
       }
   
   }


6. Create application.yml under the path `src/main/resources` and add the following configuration to specify the address of Nacos server.

   ```yaml
   spring:
     application.name: service-consumer
     cloud:
       nacos:
         discovery:
           server-addr: ${NACOS_ADDRESS:127.0.0.1:8848}
           namespace: ${NACOS_TENANT_ID:}
   ```

   :::tip Tips
   127.0.0.1:8848 is the address of the Nacos server. If the Nacos server is deployed on another machine, change it to the actual IP address.
   :::

7. Verify the results.
1. Run the `main` function of `ConsumerApplication` of `nacos-service-consumer` to start the application.
2. Log in to the locally started Nacos server console *http://127.0.0.1:8848/nacos* (the default user name and password of the local Nacos console are both nacos).
3. In the left navigation bar, select **Service Management > Service List**, which already contains service-consumer and you can view detailed information as needed.

### Local Testing
Test the result of the consumer's service call to the provider locally.

- Linux/Unix/Mac system

   Please run the following commands:

   ```bash
   curl http://127.0.0.1:18082/echo-rest/rest-rest
   curl http://127.0.0.1:18082/echo-feign/feign-rest
   ```

- Windows system

   In your browser, enter *http://127.0.0.1:18082/echo-rest/rest-rest* and *http://127.0.0.1:18082/echo-feign/feign-rest*.

## Deploy the Application to Erda

When deploying an application to Erda, please note that the environment variables in the following configuration will be automatically injected.

```yaml
spring:
  application.name: service-provider
  cloud:
    nacos:
      discovery:
        server-addr: ${NACOS_ADDRESS:127.0.0.1:8848}
        namespace: ${NACOS_TENANT_ID:}
```

```yaml
spring:
  application.name: service-consumer
  cloud:
    nacos:
      discovery:
        server-addr: ${NACOS_ADDRESS:127.0.0.1:8848}
        namespace: ${NACOS_TENANT_ID:}
```

Modify erda.yml and add the dependency of register v2.0.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/2c3557b8-5783-4eb4-8ef1-a471dfbd6c12.png)

After the service is deployed, Erda will automatically inject two environment variables:

* NACOS_ADDRESS
* NACOS_TENANT_ID

Click on the registration center to view the registered services.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/147d1638-a9ea-4cba-b209-ae063d202146.png)
