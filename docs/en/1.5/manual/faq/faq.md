# Common Topics

## 1. How to achieve scaling for services?

Scaling can be done in the Deployments without modifying the erda.yml. For details, see [Scaling](../dop/guides/deploy/management.html#扩缩容).

1. Go to **DevOps Platform > Joined Apps > Deployments** and select **Scale out**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/43fc1232-15a0-4b70-972b-79904589ab02.png)

2. Adjust service resources as needed.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/cb957d08-4812-4553-89ec-9bf9bb4ec3b5.png)

## 2. Does the service provide an address for internal calls?

Go to **DevOps Platform > Joined Apps > Deployments** to view the internal address of the service.

Neither service redeployment nor pipeline rebuilding will affect the internal address.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/c68f011b-7503-4128-825d-5e762fe7f123.png)

## 3. How to view the error log?

1. Go to **DevOps Platform > Joined Apps > Deployments** to view the container log, which shows the standard output (stdout) log. For details, see [Service Log](../dop/guides/deploy/metrics_logs.html#服务日志).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/97ba4886-0c09-4231-a055-319f34f665f4.png)

2. Click the switch button to view the standard error (stderr) log.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/eaf294f2-0572-4f3e-9a76-0c738f24b495.png)

## 4. How to view the stopped container instances?

1. Go to **DevOps Platform > Joined Apps > Deployments** and select **Stopped** to view the corresponding container instance.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/86bebd63-d492-4a49-9f62-db06ea23b998.png)

2. The status bar shows the reason why the container stopped (such as OOM exit, which will be displayed as OOMKilled here). The operate bar allows you to view the resource usage and logs of the container when it is running.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/31f09b57-2af0-4ede-a3fe-3547f7b11fa0.png)

## 5. How to reuse addon?

Reuse an addon based on its name. See the example of erda.yml below, in which `redis-abc` is the addon name.

```yaml
addons:
  redis-abc:
    plan: redis:basic
```

## 6. What should I do if the page redirection fails when using API gateway for forwarding?

The failure is usually due to the use of the `Host` in the request header. It is recommended to use `X-Forwarded-Host` instead, or to enable the domain name passthrough of the API gateway as follows:

1. Go to **Microservice Platform > API Gateway > Endpoints**, select an endpoint and click **Global Strategy**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/f4d4487c-4e92-4744-8d65-99e7cda08593.png)

2. Go to **Business Strategy > Traffic Receiving and Forwarding**, enable the rule and turn on **Entry Domain Name Passthrough**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/491dd2b5-112e-4195-92f5-36b660ed4c99.png)

## 7. How to achieve force redirection to HTTPS for a specific domain name or API?

1. Go to **Microservice Platform > API Gateway > Endpoints**, select an endpoint and click **Global Strategy** or **Strategy**. ( The global strategy is effective for all APIs in the endpoint, and the specific API strategy is only effective for this API.)

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/f7f02b36-482e-4497-9a46-6eeccf000648.png)

2. Go to **Business Strategy > Traffic Receiving and Forwarding**, enable the rule and turn on **Force Jump to HTTPS**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/877f0b16-bf97-4a9e-b57b-8d7429e3e1bf.png)

:::tip Tips

If port 80 has been configured to force redirect to HTTPS on an external load balancing device such as SLB, the configuration on Erda is invalid.

:::

## 8. How to use storage in containers?

* Scenario 1: When multiple containers need to share certain files (such as payment certificates), several instances of an application will share a storage to access the payment certificates. The configuration in erda.yml is as follows:

   ```yaml
   volumes:
   - storage: nfs
     path: /data/cert
   ```

* Scenario 2: When deploying a service that requires persistent storage (such as Oracle), you can declare a local volume in erda.yml, and the pod will be allocated to the current host again after restarting.

   ```yaml
   volumes:
   - storage: local
     path: /u01/app/oracle
   ```

## 9. How to determine the egress IP of a container?

When an application deployed on Erda needs to call an external interface (such as a payment interface), the third-party service usually needs to obtain the egress IP of the public network to locate the problem. Then you can run the following command in the container console:

```shell script
curl ifconfig.me
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/d7c726a3-3550-4ffb-a584-ceb6e5786fde.png)

## 10. Does the platform support Java 11?

Yes, and you can switch the JDK version of the running container by specifying `container_version`. Currently JDK 1.8 and 11 are supported.

The configuration in pipeline.yml is as follows:

```
- java:
    params:
      build_type: maven # Building type, and maven is used here
      workdir: ${git-checkout} # The working directory for packaging, usually the path of the root pom.xml
      options: -am -pl user # Maven packaging parameters, for example, to package the user module, use the command `mvn clean package -am -pl user`, here the command `mvn clean package` is omitted and just fill in the parameters
      target: ./user/target/user.jar # The packaged artifact is generally a jar and fill in the relative path compared to workdir. The file is required, otherwise an error will occur.
      container_type: spring-boot # Run the container required by target (such as jar). For example, the packaged artifact here is the fat jar of spring-boot, so spring-boot container is used
      #container_version: v1.8.0.181 # Optional: v1.8.0.181, v11.0.6, default: v1.8.0.181
```
