# Common Topics

## 1. How to achieve scaling for services?

Scaling can be done in Deployments without modifying the erda.yml. For details, see [Scaling](../dop/guides/deploy/management.html#scaling).

1. Go to **My Application > Deployments** and select **Scale out**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/4ab42ffb-9b93-43f4-beb2-aa5b2a0f88a3.png)

2. Adjust service resources as needed.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/cd926580-c89c-4109-ab6c-b3632f658937.png)

## 2. Does the service provide an address for internal calls?

Go to **My Application > Deployments** to view the internal address of the service.

Neither service redeployment nor pipeline rebuilding will affect the internal address.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/bab77d74-272f-402b-a0ec-77501c2c784b.png)

## 3. How to view the error log?

1. Go to **My Application > Deployments** to view the container log, which shows the standard output (stdout) log. For details, see [Service Log](../dop/guides/deploy/metrics_logs.html#service-log).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/830cecf3-bbf8-4259-adc3-a53ac082207d.png)

2. Click the switch button to view the standard error (stderr) log.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/f1bd0b02-f4a4-469c-b07e-67599af6d919.png)

## 4. How to view the stopped container instances?

1. Go to **My Application > Deployments** and select **Stopped** to view the corresponding container instance.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/509dfb92-8fd4-4988-8cc9-911ebb210566.png)

2. The status bar shows the reason why the container stopped (such as OOM exit, which will be displayed as OOMKilled here). The operate bar allows you to view the resource usage and logs of the container when it is running.


## 5. How to reuse addon?

Reuse an addon based on its name. See the example of erda.yml below, in which `redis-abc` is the addon name.

```yaml
addons:
  redis-abc:
    plan: redis:basic
```

## 6. What should I do if the page redirection fails when using API gateway for forwarding?

The failure is usually due to the use of `Host` in the request header. It is recommended to use `X-Forwarded-Host` instead, or to enable the domain name passthrough of the API gateway as follows:

1. Go to **Microservice Platform > Service Management > API Gateway > Endpoints**, select an endpoint and click **Global Strategy**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/381c58c3-22eb-4d40-9747-4565a1b4f38c.png)

2. Go to **Business Strategy > Traffic Receiving and Forwarding**, enable the rule and turn on **Domain Name Passthrough**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/dd0ee5ed-f4b9-4d14-b0dc-6dfddd888a14.png)

## 7. How to achieve force redirection to HTTPS for a specific domain name or API?

1. Go to **Microservice Platform > Service Management > API Gateway > Endpoints**, select an endpoint and click **Global Strategy** or **Strategy**. (The global strategy is effective for all APIs in the endpoint, and the specific API strategy is only effective for this API.)

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/6c128d95-60bc-48b2-80a3-581046a317bf.png)

2. Go to **Business Strategy > Traffic Receiving and Forwarding**, enable the rule and turn on **Force Jump to HTTPS**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/dd3fbcb3-6ab2-4749-ac51-901bfd3782a5.png)

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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/9022111b-1c4d-4450-9be3-9bcab01c985c.png)

## 10. Does the platform support Java 11?

Yes, and you can switch the JDK version of the running container by specifying `container_version`. Currently JDK 1.8 and 11 are supported.

The configuration in pipeline.yml is as follows:

```
- java:
    params:
      build_type: maven # Building type, and Maven is used here
      workdir: ${git-checkout} # The working directory for packaging, usually the path of the root pom.xml
      options: -am -pl user # Maven packaging parameters, for example, to package the user module, use the command `mvn clean package -am -pl user`, here the command `mvn clean package` is omitted and just fill in the parameters
      target: ./user/target/user.jar # The packaged artifact is generally a jar and fill in the relative path compared to workdir. The file is required, otherwise an error will occur.
      container_type: spring-boot # Run the container required by target (such as jar). For example, the packaged artifact here is the fat jar of spring-boot, so spring-boot container is used
      #container_version: v1.8.0.181 # Optional: v1.8.0.181, v11.0.6, default v1.8.0.181
```

## 11. What if a prompt occurs indicating that the parameter `ClusterName` is missing when creating a pipeline?

It means that there are no clusters available in the current environment.

Clusters are necessary for pipeline execution. Please go to **DevOps Platform > Projects > Settings > Project Information > Edit > Cluster Resources** to specify a cluster and set quotas for the current environment.
