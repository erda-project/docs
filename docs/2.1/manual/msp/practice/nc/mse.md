# 使用 Nacos 云服务

选择云厂商提供的 Nacos 云服务，您将获得更好的 SLA 保障，且对于开发者而言，使用方式与平台自建 Nacos 完全一致。

建议您在非生产环境使用平台自建 Nacos 以节约成本，在生产环境使用云服务以提高可用性，例如阿里云的 [MSE Nacos 服务](https://www.aliyun.com/product/aliware/mse)。

如需使用云服务 Nacos，需在对应集群内执行以下命令进行初始化配置。

请先获取云服务 Nacos 的访问地址和端口，例如地址为 `mse-id-xxx`，端口为 `8848`。

```bash
kubectl patch cm dice-addons-info --patch '{"data":{"MS_NACOS_HOST":"mse-id-xxx","MS_NACOS_PORT":"8848"}}'
```

完成如上配置后，在 erda.yml 中添加注册中心或配置中心的扩展服务，则部署时将不会在集群内部署 Nacos，而是直接使用对应的云服务。平台上注册中心和配置中心的功能使用，同自建 Nacos 完全一致。

使用 erda.yml 配置示例，您将无需关心使用的是云服务 Nacos 抑或自建 Nacos。

```yaml
addons:
  ## 启用配置中心扩展服务
  config:
    plan: "config-center:basic"
  ## 启用注册中心扩展服务
  naming:
    plan: "registercenter:basic"
```
