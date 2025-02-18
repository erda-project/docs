# 通用问题

## 1. 如何对服务进行扩缩容？

扩缩容服务无需调整 dice.yml，直接在部署中心操作即可。具体请参见 [扩缩容](../dop/guides/deploy/management.html#扩缩容)。

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

基于 Addon 的名称进行复用，例如 dice.yml 中有如下描述，则 `redis-abc` 即该 Addon 的名称：

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

* 场景一：多个容器需共享某些特定文件（如支付证书）时，一个应用的多个实例将共享一块存储，对支付证书进行存取。dice.yml 中的配置参考如下：

  ```yaml
  volumes:
  - storage: nfs
    path: /data/cert
  ```

* 场景二：部署一个需持久化存储的服务时（如 Oracle），可在 dice.yml 中声明一块 Local 类型的 Volumes，则该 Pod 重启后将再次分配到当前宿主机上。

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

## 13. 前端项目流水线失败

一般先切换到错误日志中看是否能定位到错误原因，常见问题有如下几种：

1. 出现错误日志：

```
Happythread[babel:0] unable to send to worker! ...
```

原因: happypack 默认会使用多线程编译，而流水线 Job 在容器中运行限制了构建资源，不支持多核构建

解决方式：happypack 的配置里设置 `threads: 1` 或 `ThreadPool({ size: 1 })`

2. 出现错误日志：

```
npm ERR! code ELIFECYCLE
npm ERR! errno 137
```

原因：内存溢出进程被 kill

解决方式：action 配置的 build_cmd 对应的 npm script（默认为 npm run build），设置内存大小。不设置时 Node 进程内存限制为 1.4G，所以要手动设置内存大小。
以如下配置为例，设置为使用 4G 内存进行编译。

```json
"build": "webpack --config webpack.config.js"
// 改为
"build": "node --max_old_space_size=4096 ./node_modules/.bin/webpack --config webpack.config.js"
```

同时要设置流水线 action 的资源大小，`js-pack` action 默认为 1Core 2G

```yml
- js-pack:
    params:
      ...
    resources:
      cpu: 1
      mem: 4096
```

3. 容器内调试

如果使用 `js-pack` action, 从日志看不出原因，可以加如下配置

```yml
- js-pack:
    params:
      ...
      preserve_time: 300 # 保留 300 秒，即 5 分钟
```

在报错后，容器会按配置时间的长度继续运行。在日志顶部，会打印出类似 `NAMESPACE: pipeline-102679155835278` 这样的内容，复制。

进入 **多云管理平台 > 容器资源 > Pods**，顶部选择分支对应的集群，然后在下方的命名空间里粘贴，应该可以查到该流水线。

点击该流水线记录后可以看到该流水线的容器，通过操作可进入容器控制台，然后就可以进行调试了。

## 14. 如何指定自定义 maven settings 文件

1. 上传文件，参考 [DevOps-使用指南-开发语言-Java-上传 maven settings.xml](../dop/guides/language/java.md#上传-maven-settings-xml)

2. 配置流水线文件，参考 [DevOps-使用指南-开发语言-Java-上传 maven settings.xml](../dop/guides/language/java.md#配置流水线实现-jar-包上传)

## 15. 用户指定了 maven settings 文件后 nexus 下载 401 问题

流水线 `Java工程编译打包` action 会配置默认的全局 settings.xml ，其中 server.id 为 terminus，[文件目录地址](https://github.com/erda-project/erda-actions/blob/master/actions/java-build/1.0/internal/pkg/build/execute.go#L115)

如果用户重新指定的 settings.xml 中 server.id 和默认的一样， 就会导致用户名和密码被重新指定的 settings.xml 覆盖，从而导致下载失败。

解决方案：

1. 不使用默认的全局配置, 重新指定参数 -s 改为 -gs。

   > 示例： mvn clean deploy -Dtrantor.deploy=true -Dmaven.test.skip=true -P test -U **-s** ((maven_setting)) 改为 mvn clean deploy -Dtrantor.deploy=true -Dmaven.test.skip=true -P test -U **-gs** ((maven_setting))

2. 用户指定的 settings.xml 中的 server.id 改成非 terminus。


## 16. Erda 基于 Hepa + Kong-Nginx 的限流为什么不准确？

比如设置限流为 10/s， 但测试结果可能并不是 10/s,通常总是有些偏差。这样限流是否是成功的？
对于这个问题。实际上， Erda 的限流并非精确限流，相对来说是一种粗粒度的限流，因此，如果测试限流的用例不经过合理的设计，实际测试的结果就与预期的限流数据不一致，但整体限流的功能是成功的，只是精确度方面的粒度不能保证。造成 Erda 不能细粒度精确控制限流的原因来自两个方面:
* Erda 的限流采用均摊的方式，将限流请求数量均摊到后端每个 nginx-controller 实例（比如 限流为 10/s，后台 5 个 nginx-controller 实例，则每个实例中实际是配置限流 2/s）
* Nginx 的限流插件的算法(这个是主要原因)

下面详细分析说明一下。

### 16.1 参与限流计算的参数
计算限流的参数:
* count: nginx-controller 的数量，至少是 1
* tps: 原始页面设置的最大吞吐量数值（如 10/s）除以 count 数量，向上取整
* burst: 原始页面设置的最大额外延时(如 2000ms) 与 tps 乘积 除以 1000，向上取整  

### 16.2 第一个不精确限流的原因

可以看到，到这里，tps 已经第一次不精确了。比如 nginx-controller 的数量为 3，原始从页面限流数量为 10/s，那么，到这里已经变成 4 * 3 =12/s （4 是因为 10/3 向上取整得到的） 

### 16.3 配置示例
#### 16.3.1 配置示例 1 

* 最大吞吐量: 2次/s
* 最额外延迟: 1000ms
* count: 2

则每个 ingress-controller 中的 nginx 的配置文件中设置:  
* tps = 1/s  也就是   "limit_req_zone 1 zone=server-guard-xxxxxxxxx:1m rate=1r/s"   (这一部分设置在 nginx 配置的 http 层)
* burst = 1  也就是   "limit_req zone=server-guard-xxxxxxxxx burst=1;"    (这一部分设置在 nginx 配置的 server 层 的 location 中)

#### 16.3.2 配置示例 2 

* 最大吞吐量：10次/s
* 最额外延迟：1000ms
* count： 2

则每个 ingress-controller 中的 nginx 的配置文件中设置:  
* tps = 5/s  也就是   "limit_req_zone 1 zone=server-guard-xxxxxxxxx:1m rate=5r/s"   (这一部分设置在 nginx 配置的 http 层)
* burst = 5  也就是   "limit_req zone=server-guard-xxxxxxxxx burst=5;"    (这一部分设置在 nginx 配置的 server 层 的 location 中)

### 16.4 burst 的主要作用

burst 主要作用是做一个缓存，把当前不能处理的请求先缓存起来，如果当前未处理的请求数量超过 burst 大小，则直接丢弃该请求。

根据 nginx 的限流算法:  
* 如果不设置 burst, 假设某个节点的 nginx 配置的是 10/s, 那么必须要求每 100ms 进入一个请求并处理, 才能保证 1s 内处理 10个请求, 否则就有请求被拒绝。比如 10 个请求都是在前 100ms 内到达, 那么只有第一个请求被处理, 而另外 9 个 都会拒绝。
* 如果设置 burst, 例如 burst=5, nginx 配置的是 10/s, 那么每 100ms 处理一个请求并, 那么如果10 个请求都是在前 100ms 内到达（这1s内无其他请求进入）, 那么前 6 个请求被处理(1 + burst),后面 4 个请求被丢弃。这 6 个请求依然是每隔 100ms 处理一个。 
* 如果设置 burst, 例如 burst=5, nginx 配置的是 10/s，那么如果有 10 个请求（编号 1~10 ）都是在前 100ms 内到达，后面每隔 100ms 进入2 个请求（比如从 150ms、250ms、350ms.... 各进入 2 个请求，这些请求继续从 11 开始标号，那么这 1s 内实际总共进来 28 个请求，对应编号 1~28），那么在 1s 内最多处理 10 个 请求，对应处理请求的编号为: 1,2,3,4,5,6,11,13,15,17, 还剩下 19,21,23,25,27 号请求在排队等处理，其他的请求都已经被拒绝。

### 第二个不精确限流的原因

可以看到，到这里，tps 再一次不精确了。因为，请求达到的时间、爆发量等都会造成请求虽然没达到限制，但仍然被拒绝处理的情况（比如配置 burst=5, nginx 配置的是 10/s 的情况，如果每秒只有 10 个请求进入，但 10 个请求都是在每秒的第一个 100ms 内进入，那么实际最多能处理 6 个 请求，而另外 4 个则拒绝。因此看起来反而是限制为 6/s 而不是设置看起来的 10/s。

## 17. 配置的环境变量不生效？

在Erda中配置的环境变量是存在优先级顺序的，可以参考[环境变量优先级](../dop/guides/deploy/config.md#优先级)进行配置