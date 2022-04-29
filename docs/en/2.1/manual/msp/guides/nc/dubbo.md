# Dubbo Microservice Registration and Discovery


## Local Application Development

### Prerequisites

Before using Spring Boot to develop Dubbo microservice applications, please confirm that you have done the following:

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

1. Create a Maven project named spring-boot-dubbo-provider.

2. Add dependencies in the pom.xml file. Here takes Spring Boot 2.1.6.RELEASE as an example.

   ```xml
       <dependencyManagement>
           <dependencies>
               <dependency>
                   <groupId>org.springframework.boot</groupId>
                   <artifactId>spring-boot-dependencies</artifactId>
                   <version>2.1.6.RELEASE</version>
                   <type>pom</type>
                   <scope>import</scope>
               </dependency>
           </dependencies>
       </dependencyManagement>

       <dependencies>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
           </dependency>
           <dependency>
               <groupId>io.terminus.boot.rpc</groupId>
               <artifactId>dubbo-light-provider</artifactId>
               <version>2.1.6-RELEASE</version>
           </dependency>
       </dependencies>
   ```

3. Develop Dubbo service providers. Dubbo services are provided as interfaces.

   * Create `package: io.terminus.erda.trial.demo.hellodubbo` under the path `src/main/java`.

   * Create an interface EchoService under `io.terminus.erda.trial.demo.hellodubbo` which contains an echo method.

      ```java
      package io.terminus.erda.trial.demo.hellodubbo;

      public interface EchoService {
          String echo(String name);
      }
      ```

   * Create a class `EchoServiceImpl` under `io.terminus.erda.trial.demo.hellodubbo` to implement this interface.

      ```java
      package io.terminus.erda.trial.demo.hellodubbo;
      
      import org.apache.dubbo.config.annotation.Service;;


      import java.util.concurrent.TimeUnit;
    
      @Service
      public class EchoServiceImpl implements EchoService {
    
          public String echo(String name) {
              long start = System.currentTimeMillis();
    
              try {
                  TimeUnit.SECONDS.sleep(1);
              } catch (InterruptedException e) {
              }
    
              long end = System.currentTimeMillis();
              return "\r\n\t" + start + " Provider received." +
                      "\r\n\t\tProvider processed after sleep 1 second! Echo String: \"" + name + "\"" +
                      "\r\n\t" + end + " Provider Return";
    
          }
      }
      ```
    
      :::tip Tips
    
      The service annotation here is an annotation class provided by Dubbo. The full name of the class is org.apache.dubbo.config.annotation.Service.
    
      :::

4. Configure Dubbo service.

   * Create application.properties or application.yml file under the path `src/main/resources` and open it.

   * Add the following configuration in application.properties or application.yml:

      ```yaml
      spring:
        application.name: dubbo-spring-boot-provider
      dubbo:
        application.name: dubbo-spring-boot-provider
        protocol:
          name: dubbo
          port: 20880
        registry:
          address: nacos://${NACOS_ADDRESS:127.0.0.1:8848}?namespace=${NACOS_TENANT_ID:}
        scan:
          base-packages: io.terminus.erda.trial.demo.hellodubbo
      ```

      :::tip Tips

      - There is no default value for the configuration above and specific configuration must be provided.
      - The value prefix of `dubbo.registry.address` must start with `nacos://`, and the IP address and port are the Nacos server address. In the code sample, it is the local address. If the Nacos server is deployed on other machines, please change it to the actual IP address.
      - The value of `dubbo.scan.base-packages` needs to be exposed to external calls in the code. When there are multiple packages with `@Service` annotated classes, separate them by commas.

      :::


5. Develop and start the Spring Boot entry class `DubboProvider`.

   ```java
   package io.terminus.erda.trial.demo.hellodubbo;

   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;

   @SpringBootApplication
   public class DubboProvider {
       public static void main(String[] args) {
           SpringApplication.run(DubboProvider.class, args);
       }
   }
   ```

6. Log in to the Nacos console *http://127.0.0.1:8848*, and in the left navigation bar select **Service List > Provider List**, which already contains `io.terminus.erda.trial.demo.hellodubbo.EchoService`, and you can query the service group and provider IP of the service.

### Create a Service Consumer

1. Create a Maven project named spring-boot-dubbo-consumer.

2. Add dependencies in the pom.xml file. Here takes Spring Boot 2.1.6.RELEASE as an example.

   ```xml
       <dependencyManagement>
           <dependencies>
               <dependency>
                   <groupId>org.springframework.boot</groupId>
                   <artifactId>spring-boot-dependencies</artifactId>
                   <version>2.1.6.RELEASE</version>
                   <type>pom</type>
                   <scope>import</scope>
               </dependency>
           </dependencies>
       </dependencyManagement>
   
       <dependencies>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
           </dependency>
           <dependency>
               <groupId>io.terminus.boot.rpc</groupId>
               <artifactId>dubbo-light-consumer</artifactId>
               <version>2.1.6-RELEASE</version>
           </dependency>
       </dependencies>
   ```


3. Develop Dubbo consumers.

   * Create `package: io.terminus.erda.trial.demo.hellodubbo` under the path `src/main/java`.

   * Create an interface EchoService under `io.terminus.erda.trial.demo.hellodubbo` which contains an echo method.

      ```java
      package io.terminus.erda.trial.demo.hellodubbo;

      public interface EchoService {
          String echo(String name);
      }
      ```

   * Develop Dubbo service calls. For example, to call a remote Dubbo service in the controller, the code sample is as follows:

      ```java
      package io.terminus.erda.trial.demo.hellodubbo;
      
      import org.apache.dubbo.config.annotation.Reference;
      import org.springframework.web.bind.annotation.PathVariable;
      import org.springframework.web.bind.annotation.RequestMapping;
      import org.springframework.web.bind.annotation.RequestMethod;
      import org.springframework.web.bind.annotation.RestController;
      
      @RestController
      public class DemoConsumerController {
          @Reference
          private EchoService demoService;
      
          @RequestMapping(value = "/ping", method = RequestMethod.GET)
          public Boolean ping() {
              try {
                  String pong = demoService.echo("ping");
      
                  System.out.println("Service returned: " + pong);
                  return pong.contains("ping");
              } catch (Throwable t) {
                  t.printStackTrace();
                  return false;
              }
          }
          @RequestMapping(value = "/consumer-echo/{str}", method = RequestMethod.GET)
          public String feign1(@PathVariable String str) {
              long start = System.currentTimeMillis();
      
              String result = demoService.echo(str);
      
              long end = System.currentTimeMillis();
              return "" + start + " Consumer received." +
                      "\t" + result +
                      "\r\n" + end + " Consumer Return";
          }
      }
      ```

      :::tip Tips

      The reference annotation here is `org.apache.dubbo.config.annotation.Reference`.

      :::

4. Add the following configuration in application.properties or application.yml:

   ```yaml
   spring:
     application.name: dubbo-spring-boot-consumer
   dubbo:
     application.name: dubbo-spring-boot-consumer
     registry:
       address: nacos://${NACOS_ADDRESS:127.0.0.1:8848}?namespace=${NACOS_TENANT_ID:}
   ```

   :::tip Tips

   * There is no default value for the configuration above and specific configuration must be provided.
   * The value prefix of `dubbo.registry.address` must start with `nacos://`, and the IP address and port are the Nacos server address. In the code sample, it is the local address. If the Nacos server is deployed on other machines, please change it to the actual IP address.

   :::

5. Develop and start the Spring Boot entry class `DubboConsumer`.

   ```java
   package io.terminus.erda.trial.demo.hellodubbo;

   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;

   @SpringBootApplication
   public class DubboConsumer {
       public static void main(String[] args) {
           SpringApplication.run(DubboConsumer.class, args);
       }
   }
   ```

6. Log in to the Nacos console *http://127.0.0.1:8848*, and in the left navigation bar select **Service List > Consumer List**, which already contains `io.terminus.erda.trial.demo.hellodubbo.EchoService`, and you can query the service group and consumer IP of the service.

### Verification Results


```bash
`curl http://localhost:8088/ping`
true
```

## Deploy the Application to Erda

When deploying an application to Erda, note that Erda will inject the following variables of application.yml:

```yaml
spring:
  application.name: dubbo-spring-boot-provider
dubbo:
  application.name: dubbo-spring-boot-provider
  protocol:
    name: dubbo
    port: 20880
  registry:
    address: nacos://${NACOS_ADDRESS:127.0.0.1:8848}?namespace=${NACOS_TENANT_ID:}
  scan:
    base-packages: io.terminus.erda.trial.demo.hellodubbo
```


```yaml
spring:
  application.name: dubbo-spring-boot-consumer
dubbo:
  application.name: dubbo-spring-boot-consumer
  registry:
    address: nacos://${NACOS_ADDRESS:127.0.0.1:8848}?namespace=${NACOS_TENANT_ID:}
```


Modify dice.yml and add the dependency of register v2.0.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/2c3557b8-5783-4eb4-8ef1-a471dfbd6c12.png)

After the service is deployed, Erda will automatically inject two environment variables:
* NACOS_ADDRESS
* NACOS_TENANT_ID

Click on the registration center to view the registered services.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/147d1638-a9ea-4cba-b209-ae063d202146.png)

## Local Connection to the Registration Center

When using Nacos, configure the following environment variables:

- NACOS_ADDRESS
- NACOS_TENANT_ID

When using ZooKeeper, configure the following environment variables:

- ZOOKEEPER_DUBBO
- DUBBO_TENANT_ID

