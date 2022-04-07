# 通用问题

## 1. 如何对服务进行扩缩容？

扩缩容服务无需调整 erda.yml，直接在部署中心操作即可。具体请参见 [扩缩容](../dop/guides/deploy/management.html#扩缩容)。

1. 进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署**，选择 Runtime 后点击 **服务扩容**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/31c56142-ebf6-490d-9152-6d8b1729198d.png)

2. 根据需要进行服务资源调整。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/829f261f-9a7f-4c33-aeae-583570ef0bd7.png)

## 2. 服务是否提供内部调用的地址？

进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署**，选择 Runtime 后可查看服务的内部地址。

服务的重新部署或流水线的重新构建均不会影响该内部地址。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/6057160d-bf47-440d-9e89-d1dd6d704e01.png)

## 3. 如何查看错误日志？

1. 进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署**，选择 Runtime 后点击容器日志，此时显示的是标准输出（stdout）日志。具体请参见 [服务日志](../dop/guides/deploy/metrics_logs.html#服务日志)。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/caa48190-876e-4e5b-b4ee-8bdd81b7abdd.png)

2. 点击顶部切换开关，查看标准错误（stderr）日志。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/9325bf20-ff2e-4d41-b456-1482c3f5de54.png)

## 4. 如何查看已停止的容器实例？

1. 进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署**，选择 Runtime，选择 **已停止** 查看对应容器实例。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/8ba73010-a1e5-41d6-801e-6d41ee98056a.png)

2. 状态栏将标注容器停止的原因（如 OOM 退出，将标注为 OOMKilled）。操作栏中可查看容器运行时的资源使用情况以及对应日志。


## 5. 如何复用 Addon？

基于 Addon 的名称进行复用，例如 erda.yml 中有如下描述，则 `redis-abc` 即该 Addon 的名称：

```yaml
addons:
  redis-abc:
    plan: redis:basic
```

## 6. 使用 API 网关进行转发，页面重定向失败怎么办？

失败原因一般为使用了请求头中的 `Host`，建议使用 `X-Forwarded-Host ` 进行替代，或者开启 API 网关的域名透传，步骤如下：

1. 进入 **微服务治理平台 > 服务治理 > API 网关 > 流量入口管理**，选择对应流量入口详情，点击 **全局策略**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/ee4fae36-7e5a-4062-abd9-14835754b799.png)

2. 进入 **业务策略 > 流量接收转发**，启用规则后开启 **入口域名透传**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/4039b9b0-0487-48e4-aa54-6188c100a79c.png)

## 7. 如何对特定域名或 API 控制 HTTPS 强制跳转？

1. 进入 **微服务治理平台 > 服务治理 > API 网关 > 流量入口管理**，点击对应流量入口详情，选择 **全局策略** 或 **策略**。（全局策略对该流量入口下所有 API 生效，具体 API 策略仅对该 API 生效。）

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/61c2afda-2767-4708-b764-29160551507f.png)

2. 进入 **业务策略 > 流量接收转发**，启用规则后开启 **强制跳转HTTPS**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/72e33da2-433d-4b52-af67-922457842a73.png)

::: tip 提示

若在 SLB 等外部负载均衡设备上，已配置 80 端口强制 HTTPS 跳转，则 Erda 上的跳转功能无效。

:::

## 8. 如何在容器中使用存储？

* 场景一：多个容器需共享某些特定文件（如支付证书）时，一个应用的多个实例将共享一块存储，对支付证书进行存取。erda.yml 中的配置参考如下：

  ```yaml
  volumes:
  - storage: nfs
    path: /data/cert
  ```

* 场景二：部署一个需持久化存储的服务时（如 Oracle），可在 erda.yml 中声明一块 Local 类型的 Volumes，则该 Pod 重启后将再次分配到当前宿主机上。

  ```yaml
  volumes:
  - storage: local
    path: /u01/app/oracle
  ```

## 9. 如何确定一个容器的出口 IP？

当部署在 Erda 上的应用需调用外部接口（如支付接口）时，第三方服务通常需获取公网的出口 IP 来定位问题，此时可在容器控制台中执行以下命令：

```shell script
curl ifconfig.me
```

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/4171251f-9165-4b7a-b4de-bcb6a52aa41d.png)

## 10. 平台支持 Java 11 吗？

支持，可通过指定 `container_version` 切换运行容器的 JDK 版本。目前支持 JDK 1.8 和 11 两个版本 。

pipeline.yml 中的配置如下:

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

## 11. 创建流水线时提示缺少参数 `ClusterName` 怎么办？

该提示代表当前环境下无可用的集群。

集群是流水线执行的必要条件，请进入 **DevOps 平台 > 项目 > 项目设置 > 项目信息 > 编辑** 为当前环境指定集群并设置配额。

## 12. 如何配置全局私有 Maven 仓库？

默认情况下，Erda 采用 maven.aliyun.com 作为 Maven 仓库地址，您可以通过如下方式进行修改：

1. 编辑 configmap。

   ```shell
   kubectl edit cm dice-addons-info -n erda-system 
   ```

2. 添加 Maven 仓库信息。

   ```yaml
   NEXUS_ADDR: # 仓库内部地址，构建任务在 Master 集群中会使用该地址
   NEXUS_PUBLIC_URL: # 仓库外部地址，构建任务在 Worker 集群中会使用该地址
   NEXUS_USERNAME: # (可选) 仓库用户名
   NEXUS_PASSWORD:  # (可选) 仓库密码
   ```

3. 等待组件重启完成。
