# 基于 Git 源码部署

着手源码部署前，请确认已完成 [项目和应用创建](../../../quick-start/newbie.html#加入项目)。

:::tip 提示

假设新建项目名为 erda-test，新建应用名为 java-demo。下文 Git 仓库地址将涉及这两个名称。

:::

## 准备示范代码

示范代码是一个基于 Spring Boot Web Service 的简单 Web 服务，代码托管于 [GitHub](https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git)。

:::tip 提示

Erda 平台上可部署运行任意语言、任意框架开发的代码，并不局限于 Java、Spring Boot 等。

:::

### 下载示范代码至本地

```bash
git clone https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git
```

### 推送示范代码至平台

平台基于标准的 Git 协议内置 Git 代码仓库，您无需依赖于外部仓库（例如 GitLab 等）即可完成从源码开发到部署的全流程。

进入 **DevOps 平台 > 我的应用 > 选择应用 > 代码仓库 > 代码浏览 > 仓库地址**，查看平台远程仓库服务器地址。

```bash
git remote add erda http://dice.dev.terminus.io/wb/erda-test/java-demo
git push -u erda --all
git push -u erda --tags
```

完成代码推送后，即可在代码仓库中查看代码信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/0acc79b4-1758-4b19-ba8d-b3552c7cecdb.png)

## 定义流水线

为该示范代码工程添加平台配置文件 pipeline.yml 和 erda.yml。

### pipeline.yml

pipeline.yml 是描述从代码编译构建到应用部署的流水线配置文件，一般可设为 4 个 Stage，按照书写顺序依次执行：

1. 拉取 Git 源码。
2. 基于源码编译、构建，制作 Docker 镜像。
3. 生成版本产物。
4. 基于版本产物完成部署。

4 个 Stage 可分别以下列 Action 执行：

1. [Git-Checkout](https://www.erda.cloud/market/action/git-checkout)
2. [Java](https://www.erda.cloud/market/action/java)
3. [Release](https://www.erda.cloud/market/action/release)
4. [Erda](https://www.erda.cloud/market/action/dice)

:::tip 提示

此处列举的 4 个 Stage 仅为基本配置，您可根据实际需求设置更多的 Stage，例如单元测试等。
此外，Stage 和 Action 并非一对一关系，一个 Stage 中可设置多个 Action 并行执行。

:::

该示例工程对应的 pipeline.yml 参考如下，更多信息请参见 [pipeline.yml](../../guides/reference/pipeline.html)。

```yaml
version: "1.1"
stages:
- stage:
  - git-checkout:

- stage:
  - java:
      alias: java-demo
      # 缓存对应目录，下次构建就可以加速
      caches:
        - path: /root/.m2/repository
      params:
        build_type: maven
        #打包时的工作目录，此路径一般为根 pom.xml 的路径。
        # ${git-checkout} 表示引用上一个 stage 流程里的输出结果，如有别名则使用别名表示
        workdir: ${git-checkout}
        # 打包产物，一般为 jar，填写相较于 workdir 的相对路径。文件必须存在，否则将会出错。
        target: ./target/docker-java-app-example.jar
        # 运行 target（如 jar）所需的容器类型，比如这里我们打包的结果是 spring-boot 的 fat jar，故使用 spring-boot container
        container_type: spring-boot

- stage:
  - release:
      params:
        dice_yml: ${git-checkout}/dice.yml
        image:
          java-demo: ${java-demo:OUTPUT:image}

- stage:
  - dice:
      params:
        release_id: ${release:OUTPUT:releaseID}
```

### erda.yml

erda.yml 配置文件用于描述一个应用的服务架构、对 CPU 和内存等资源的配置、服务插件的依赖关系以及发布形式。

该示例工程对应的 erda.yml 参考如下，更多信息请参见 [erda.yml](../../guides/reference/erda-yaml.html)。

```yaml
version: "2.0"
services:
  java-demo:
    ports:
      - port: 8080
        expose: true
    resources:
      cpu: 0.2
      mem: 512
    deployments:
      replicas: 1
```

### 提交文件

将新增的两个 YAML 文件提交至平台的代码仓库。

```bash
git add .
git commit -m "add pipeline.yml and erda.yml"
git push erda feature/demo
```

:::tip 提示

此处提交的远程仓库分支前缀为 `feature/*`，分支名称将直接决定应用部署的环境。

:::

## 执行流水线

1. 进入 **流水线** 页面，选择 `feature/demo` 分支创建新的流水线任务。
2. 完成流水线任务分析后，流水线处于待执行状态。点击右上角执行图标，开始流水线构建。
3. 流水线任务执行过程中，可实时查看流水线各步骤的执行状态，点击日志可查看对应节点执行状况的日志信息。

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/5f882932-c71f-4cfa-b1ca-78be91a8c26b.png)

## 查看部署结果

通过流水线构建源码并完成部署后，可在部署中心查看已成功部署的应用实例 Runtime。进入 Runtime 可进一步进行 [应用管理](../../guides/deploy/management.html) 相关操作，例如配置域名、服务实例扩缩容等。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/8d4a963d-14f6-45a3-a132-fc5987d9e78d.png)
