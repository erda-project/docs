# Dubbo 微服务注册发现


## 本地开发应用

### 前提条件

使用 Spring Boot 开发 Dubbo 微服务应用前，请确认已完成以下工作：

* 下载 [Maven](https://aliware-images.oss-cn-hangzhou.aliyuncs.com/EDAS/App-develop/apache-maven-3.6.0-bin.tar.gz) 并设置环境变量。
* 下载最新版本 [Nacos Server](https://github.com/alibaba/nacos/releases)。
* 按照以下步骤启动 Nacos Server。
  1. 解压 Nacos Server 压缩包。
  2. 进入 `nacos/bin` 目录，启动 Nacos Server。

:::tip 提示
* Linux/Unix/Mac 系统：sh startup.sh -m standalone
* Windows 系统：双击文件 startup.cmd

:::

### 创建服务提供者

1. 创建名为 spring-boot-dubbo-provider 的 Maven 工程。

2. 在 pom.xml 文件中添加依赖，此处以 Spring Boot 2.1.6.RELEASE 为例。

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

3. 开发 Dubbo 服务提供者，Dubbo 中服务均以接口的形式提供。

   * 在 `src/main/java` 路径下创建 `package: io.terminus.erda.trial.demo.hellodubbo`。

   * 在 `io.terminus.erda.trial.demo.hellodubbo` 下创建一个接口（interface）EchoService，其中包含一个 echo 方法。

     ```java
     package io.terminus.erda.trial.demo.hellodubbo;

     public interface EchoService {
         String echo(String name);
     }
     ```

   * 在 `io.terminus.erda.trial.demo.hellodubbo` 下创建一个类 `EchoServiceImpl`，实现此接口。

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
    
     :::tip 提示
    
     此处的 Service 注解是 Dubbo 提供的一个注解类，类的全名称为 org.apache.dubbo.config.annotation.Service。
    
     :::

4. 配置 Dubbo 服务。

   * 在 `src/main/resources` 路径下创建 application.properties 或 application.yml 文件并打开。

   * 在 application.properties 或 application.yml 中添加如下配置：

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

     :::tip 提示
   
     - 以上配置无默认值，必须提供具体配置。
     - `dubbo.registry.address` 的值前缀必须以 `nacos://` 开头，其后 IP 地址和端口为 Nacos Server 地址。代码示例中为本地地址，若将 Nacos Server 部署在其它机器上，请修改为实际的 IP 地址。
     - `dubbo.scan.base-packages` 的值需在代码中暴露外部调用，有多个带 `@Service` 注解的类所在的包时用逗号分隔。

     :::


5. 开发并启动 Spring Boot 入口类 `DubboProvider`。

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

6. 登录 Nacos 控制台 *http://127.0.0.1:8848*，在左侧导航栏中选择 **服务列表 > 提供者列表**，列表中已包含 `io.terminus.erda.trial.demo.hellodubbo.EchoService`，且可以查询该服务的服务分组和提供者 IP。

### 创建服务消费者

1. 创建名为 spring-boot-dubbo-consumer 的 Maven 工程。

2. 在 pom.xml 文件中添加依赖，此处以 Spring Boot 2.1.6.RELEASE 为例。

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


3. 开发 Dubbo 消费者。

   * 在 `src/main/java` 路径下创建 `package: io.terminus.erda.trial.demo.hellodubbo`。

   * 在 `io.terminus.erda.trial.demo.hellodubbo` 下创建一个接口（interface）EchoService，其中包含一个 echo 方法。

     ```java
     package io.terminus.erda.trial.demo.hellodubbo;

     public interface EchoService {
         String echo(String name);
     }
     ```

   * 开发 Dubbo 服务调用，例如需在 Controller 中调用一次远程 Dubbo 服务，则开发代码示例如下：

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

     :::tip 提示

     此处的 Reference 注解为 `org.apache.dubbo.config.annotation.Reference`。

     :::

4. 在 application.properties 或 application.yml 配置文件中新增以下配置：

   ```yaml
   spring:
     application.name: dubbo-spring-boot-consumer
   dubbo:
     application.name: dubbo-spring-boot-consumer
     registry:
       address: nacos://${NACOS_ADDRESS:127.0.0.1:8848}?namespace=${NACOS_TENANT_ID:}
   ```

   :::tip 提示

   * 以上配置无默认值，必须提供具体配置。
   * `dubbo.registry.address` 的值前缀必须以 `nacos://` 开头，其后 IP 地址和端口为 Nacos Server 地址。代码示例中为本地地址，若将 Nacos Server 部署在其它机器上，请修改为实际的 IP 地址。

   :::

5. 开发并启动 Spring Boot 入口类 `DubboConsumer`。

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

6. 登录 Nacos 控制台 *http://127.0.0.1:8848*，在左侧导航栏中选择 **服务列表 > 调用者列表**，列表中已包含 `io.terminus.erda.trial.demo.hellodubbo.EchoService`，且可以查看该服务的服务分组和调用者 IP。

### 验证结果


```bash
`curl http://localhost:8088/ping`
true
```

## 部署应用至 Erda

部署应用至 Erda 时，需注意 Erda 将注入以下 application.yml 中的变量：

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


修改 erda.yml，添加注册中心 v2.0 的依赖。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/077606d3-b8a6-4947-821e-3038819f156c.png)

完成服务部署后，Erda 将自动注入两个环境变量：
* NACOS_ADDRESS
* NACOS_TENANT_ID

点击注册中心，即可查看注册完成的服务。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/2d23a7fc-d709-4e84-b5ae-e217c9f4e525.png)

## 本地连线上注册中心

使用 Nacos 时，需配置以下环境变量：

- NACOS_ADDRESS
- NACOS_TENANT_ID

使用 ZooKeeper 时，需配置以下环境变量：

- ZOOKEEPER_DUBBO
- DUBBO_TENANT_ID

