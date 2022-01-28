# Spring Cloud 微服务注册发现


## 本地开发应用
### 前提条件

着手开发前，请确认已完成以下工作：

* 下载 [Maven](https://aliware-images.oss-cn-hangzhou.aliyuncs.com/EDAS/App-develop/apache-maven-3.6.0-bin.tar.gz) 并设置环境变量。
* 下载最新版本 [Nacos Server](https://github.com/alibaba/nacos/releases)。
* 按照以下步骤启动 Nacos Server。
  1. 解压 Nacos Server 压缩包。
  2. 进入 `nacos/bin` 目录，启动 Nacos Server。

:::tip 提示
* Linux/Unix/Mac 系统：sh startup.sh -m standalone
* Windows 系统：双击运行 startup.cmd

:::


### 创建服务提供者
在本地创建服务提供者应用工程，添加依赖，开启服务注册与发现功能，并将注册中心指定为 Nacos Server。

1. 创建名为 nacos-service-provider 的 Maven 工程。

2. 在 pom.xml 文件中添加依赖，此处以 Spring Boot 2.1.4.RELEASE 和 Spring Cloud Greenwich.SR1 为例：

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

   * 使用版本为 Spring Cloud Greenwich，则对应 Spring Cloud Alibaba 版本为 2.1.1.RELEASE。
   * 使用版本为 Spring Cloud Finchley 版本，则对应 Spring Cloud Alibaba 版本为 2.0.1.RELEASE。
   * 使用版本为 Spring Cloud Edgware 版本，则对应 Spring Cloud Alibaba 版本为 1.5.1.RELEASE。

   :::tip 提示
   Spring Cloud Edgware 版本的生命周期已结束，不建议使用该版本开发应用。
   :::

3. 在 `src/main/java` 下创建 `package: io.terminus.erda.trial.demo.hellospringcloud`。

   在 `package: io.terminus.erda.trial.demo.hellospringcloud` 中创建服务提供者的启动类 `ProviderApplication`，并添加如下代码：

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

   :::tip 提示
   `@EnableDiscoveryClient` 注解表明此应用需开启服务注册与发现功能。
   :::

   在 `package: io.terminus.erda.trial.demo.hellospringcloud` 中创建 `EchoController`，指定 URL mapping 为 `{/echo/{String}}`，指定 HTTP 方法为 GET，方法参数从 URL 路径中获得，回显收到的参数。

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

4. 在 `src/main/resources` 路径下创建文件 `application.yml`，并添加如下配置，指定 Nacos Server 的地址。

   ```yaml
   spring:
     application.name: service-provider
     cloud:
       nacos:
         discovery:
           server-addr: ${NACOS_ADDRESS:127.0.0.1:8848}
           namespace: ${NACOS_TENANT_ID:}
   ```

   :::tip 提示
   127.0.0.1 为 Nacos Server 的地址。若 Nacos Server 部署在另外一台机器，则需修改为对应的 IP 地址。
   :::

5. 验证结果。

6. 执行 `nacos-service-provider` 中 `ProviderApplication` 的 `main` 函数，启动应用。

  7. 登录本地启动的 Nacos Server 控制台 *http://127.0.0.1:8848/nacos*（本地 Nacos 控制台的默认用户名和密码同为 nacos）。

  8. 在左侧导航栏选择 **服务管理 > 服务列表**，列表中已包含 service-provider，且可在详情中查看具体信息。

### 创建服务消费者
1. 创建名为 nacos-service-consumer 的 Maven 工程。

2. 在 pom.xml 中添加依赖。

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

3. 在 `src/main/java` 下创建 `package: io.terminus.erda.trial.demo.hellospringcloud`。

4. 在 `package: io.terminus.erda.trial.demo.hellospringcloud` 中配置 `RestTemplate` 和 `FeignClient`。

   在 `package: io.terminus.erda.trial.demo.hellospringcloud` 中创建一个接口类 `EchoService `，添加 `@FeignClient` 注解，并配置对应的 HTTP URL 地址及 HTTP 方法。

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

   在 `package: io.terminus.erda.trial.demo.hellospringcloud` 中创建启动类 `ConsumerApplication` 并添加相关配置。

   * 使用 `@EnableDiscoveryClient` 注解启用服务注册与发现。
   * 使用 `@EnableFeignClients` 注解激活 `FeignClient`。
   * 添加 `@LoadBalanced` 注解将 `RestTemplate` 与服务发现集成。

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

5. 在 `package: io.terminus.erda.trial.demo.hellospringcloud` 中创建类 `TestController` 以演示和验证服务发现功能。

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

6. 在 `src/main/resources` 路径下创建文件 application.yml，并添加如下配置，指定 Nacos Server 的地址。

   ```yaml
   spring:
     application.name: service-consumer
     cloud:
       nacos:
         discovery:
           server-addr: ${NACOS_ADDRESS:127.0.0.1:8848}
           namespace: ${NACOS_TENANT_ID:}
   ```

   :::tip
   127.0.0.1:8848 为 Nacos Server 的地址。若 Nacos Server 部署在另外一台机器，则需修改为对应的地址。
   :::

7. 验证结果。
  1. 执行 `nacos-service-consumer` 中 `ConsumerApplication` 的 `main` 函数，启动应用。
  2. 登录本地启动的 Nacos Server 控制台 *http://127.0.0.1:8848/nacos*（本地 Nacos 控制台的默认用户名和密码同为 nacos）。
  3. 在左侧导航栏选择 **服务管理 > 服务列表**，列表中已包含 service-consumer，且可在详情中查看具体信息。

### 本地测试
在本地测试消费者对提供者的服务调用结果。

- Linux/Unix/Mac 系统

  请执行以下命令：

  ```bash
  curl http://127.0.0.1:18082/echo-rest/rest-rest
  curl http://127.0.0.1:18082/echo-feign/feign-rest
  ```

- Windows 系统

  在浏览器中输入 *http://127.0.0.1:18082/echo-rest/rest-rest* 以及 *http://127.0.0.1:18082/echo-feign/feign-rest*。

## 部署应用至 Erda

部署应用至 Erda 时，需注意如下配置中的环境变量将被自动注入。

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

修改 erda.yml，添加注册中心 v2.0 的依赖。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/9adda3d8-fde7-4ae7-b483-f148323dae48.png)

完成服务部署后，Erda 将自动注入两个环境变量：

* NACOS_ADDRESS
* NACOS_TENANT_ID

点击注册中心，即可查看注册完成的服务。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/c7b55337-e018-472d-8804-4ee6507efa66.png)
