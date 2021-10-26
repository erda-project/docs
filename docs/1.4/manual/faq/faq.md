# 常见问题

## 如何对服务进行扩缩容？

扩缩容服务无需调整 `erda.yml`，直接在部署中心操作即可。具体请参见 [扩缩容](../dop/guides/deploy/management.html#扩缩容)。

1. 进入 **DevOps 平台 > 我的应用 > 部署中心**，选择 **服务扩容**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/ad22311b-d268-44d5-9878-241520f0446d.png)

2. 根据需要进行服务资源调整。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/01f349c7-10de-4d34-a06e-608c1d40e567.png)

## 服务是否提供内部调用的地址？

进入 **DevOps 平台 > 我的应用 > 部署中心** 可查看服务的内部地址。

服务的重新部署或流水线的重新构建均不会影响该内部地址。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/af0fde2f-0df6-4d3f-9e7f-0cf339d29f52.png)

## 如何查看错误日志？

1. 进入 **DevOps 平台 > 我的应用 > 部署中心**，点击容器日志，此时显示的是标准输出（stdout）日志。具体请参见 [服务日志](../dop/guides/deploy/metrics_logs.html#服务日志)。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/f89f3bb7-ae07-4411-86ee-0e8a62933313.png)

2. 点击顶部切换开关，查看标准错误（stderr）日志。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/a806e6b4-9522-444d-9fab-78e681554a38.png)

## 如何查看已停止的容器实例？

1. 进入 **DevOps 平台 > 我的应用 > 部署中心**，选择 **已停止** 查看对应容器实例。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/c58bdb73-fb0e-40ea-ac67-e9d03bfe0d2c.png)

2. 状态栏中标注了容器停止的原因（如 OOM 退出，此处将标注为 OOMKilled）。操作栏中可以查看容器运行时的资源使用情况以及对应日志。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/b98f1dc8-e6b6-4f6f-bd73-88c81d97e943.png)

## 如何复用 Addon？

基于 Addon 的名称进行复用，例如 `erda.yml` 中有如下描述，则 `redis-abc` 即该 Addon 的名称：

```yaml
addons:
  redis-abc:
    plan: redis:basic
```

## 使用 API 网关进行转发，页面重定向失败怎么办？

失败原因一般为使用了请求头中的 `Host`，建议使用 `X-Forwarded-Host `进行替代，或者开启 API 网关的域名透传，步骤如下：

1. 进入 **微服务治理平台 > API 网关 > 流量入口管理**，选择对应流量入口详情，点击 **全局策略**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/f774f429-247c-4325-b6cc-f34d21b71819.png)

2. 进入 **业务策略 > 流量接收转发**，启用规则后开启 **入口域名透传**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/68491a06-8cf6-463f-bf2d-d73f6aa5f8bb.png)



## 如何对特定域名或 API 控制 HTTPS 强制跳转？

1. 进入 **微服务治理平台 > API 网关 > 流量入口管理**，点击对应流量入口详情，选择 **全局策略** 或 **策略**。（全局策略对该流量入口下所有 API 生效，具体 API 策略仅对该 API 生效。）

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/ecf1223c-1b3e-46e3-bed4-eadc0b4606aa.png)

2. 进入 **业务策略 > 流量接收转发**，启用规则后开启 **强制跳转HTTPS**。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/36df5992-764a-464c-9caf-481b1bf321f8.png)

::: tip

若在 SLB 等外部负载均衡设备上，已配置 80 端口强制 HTTPS 跳转，则 Erda 上的跳转功能无效。

:::

## 如何在容器中使用存储？

* 场景一：多个容器需共享某些特定文件（如支付证书）时，一个应用的多个实例将共享一块存储，对支付证书进行存取。`erda.yml` 中的配置参考如下：

  ```yaml
  volumes:
  - storage: nfs
    path: /data/cert
  ```

* 场景二：部署一个需持久化存储的服务时（如 Oracle），可以在 `erda.yml` 中声明一块 Local 类型的 Volumes，则该 Pod 重启后将再次分配到当前宿主机上。

  ```yaml
  volumes:
  - storage: local
    path: /u01/app/oracle
  ```

## 如何确定一个容器的出口 IP？

当部署在 Erda 上的应用需调用外部接口（如支付接口）时，第三方服务通常需获取公网的出口 IP 来定位问题，此时可在容器控制台中执行以下命令：

```shell script
curl ifconfig.me
```

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/4171251f-9165-4b7a-b4de-bcb6a52aa41d.png)



## 平台支持 Java 11 吗？

支持，可通过指定 `container_version` 切换运行容器的 JDK 版本。目前支持 JDK 1.8 和 11 两个版本 。

`pipeline.yml` 中的配置如下:

```
- java:
    params:
      build_type: maven # 打包类型，这里选用 maven 打包
      workdir: ${git-checkout} # 打包时的当前路径，此路径一般为根 pom.xml 的路径
      options: -am -pl user # maven 打包参数，比如打包 user 模块使用命令 `mvn clean package -am -pl user`，这里省略命令 `mvn clean package` 只需要填写参数
      target: ./user/target/user.jar # 打包产物，一般为 jar，填写相较于 workdir 的相对路径。文件必须存在，否则将会出错。
      container_type: spring-boot # 运行 target（如 jar）所需的容器类型，比如这里我们打包的结果是 spring-boot 的 fat jar，故使用 spring-boot container
      #container_version: v1.8.0.181 # 可选: v1.8.0.181, v11.0.6, 默认 v1.8.0.181
```

## 如何在下载在 Java 容器应用内通过 jmap 命令产生的 dump 文件？

Erda 平台在每个集群上提供了可挂载的共享网盘, 路径位于每台宿主机上的 /netdata/, 因此可以将 dump 文件输出到这个网盘的某个目录后，从另外一个也挂载了这个目录的文件服务下载到 dump 文件。具体方法如下所示：

1. 修改 Java 应用的 dice.yml 文件，在需要 dump 的服务内添加 binds 参数, 如


```
version: "2.0"
services:
gaia-trading-runtime:
   image: "gaia-trading-runtime:210508.145355"
   ports:
      - 8080
   binds:
   # 目的是将共享目录挂载到容器内
   - /netdata/userdata/java-coredump-files:/java-coredump-files:rw
```

修改完成之后, 需要通过流水线重新部署应用。

2. 创建一个新的文件服务应用用于文件下载

a. 进入 DevOps 平台，选择相应项目后，基于 https://gitee.com/hoozecn/static-file-server (用户名密码都为 annoymous) 创建一个新的业务应用（每个集群只需部署一个该服务）

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/09/be453b0e-5b1c-448d-a0ed-f61d4d014867.png)

b. 创建完成后，新建并运行默认的流水线完成部署

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/09/f23d736e-17d7-4bbb-acd9-ed49488cb105.png)

c. 部署完成后，在 部署中心 对部署好的应用设置访问域名

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/09/b386dfcd-e516-4b36-b4c5-23d9f5470f4c.png)

d. 设置成功后即可通过域名访问共享目录下的文件

3. 对需要进行 dump 的 Java 应用重新部署之后，进入容器控制台，执行 jmap 命令

`jmap -dump:live,format=b,file=/java-coredump-files/coredump-1000.hprof <pid>`

4. 访问步骤2中配置好的域名，即可找到相应的文件
