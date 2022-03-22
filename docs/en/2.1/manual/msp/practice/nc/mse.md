# Use Nacos Cloud Service

Using Nacos cloud service provided by cloud vendor will give you better SLA coverage, and for developers, its usage is exactly the same as that of self-built Nacos of the platform.

It is recommended that you use the self-built Nacos of the platform in non-production environments to save costs, and use cloud services in production environments to improve availability, such as [MSE Nacos Service](https://www.aliyun.com/product/aliware/mse) of Alibaba Cloud.

To use the Nacos cloud service, run the following commands in the corresponding cluster for initial configuration.

Get the access address and port of the Nacos cloud service first. For example, the address is `mse-id-xxx` and the port is `8848`.

```bash
kubectl patch cm dice-addons-info --patch '{"data":{"MS_NACOS_HOST":"mse-id-xxx","MS_NACOS_PORT":"8848"}}'
```

Once the above configuration is completed, add addon of the registration or configuration center in erda.yml, then it will not deploy Nacos in the cluster but use the corresponding cloud services directly. The functions of the registration center and configuration center on the platform are exactly the same as those of self-built Nacos.

With the example of erda.yml configuration, it does not matter whether you are using the Nacos cloud service or self-built Nacos.

```yaml
addons:
  ## Enable addon in configuration center
  config:
    plan: "config-center:basic"
  ## Enable addon in registration center
  naming:
    plan: "registercenter:basic"
```
