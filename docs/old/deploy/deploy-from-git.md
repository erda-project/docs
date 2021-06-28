# 基于 Git 源码部署

在开始着手源码部署之前，首先需要准备好 [项目和应用](../platform-design.md#项目和应用)。项目创建只有企业管理员才能完成，企业管理员添加并设置好项目所有者之后，项目其他成员可以由项目所有者添加指定。应用创建可以由应用所有者、应用主管和项目经理进行创建，并添加指定应用所有者。具体角色权限可以参考[角色和权限](../platform-design.md#角色和权限)

:::tip 注意

假设新建项目名为：erda-test，新建应用名为：java-demo。下文中的 git 仓库地址将会涉及到这两个名字。

:::

## 准备示范代码

示范代码是一个基于 spring boot web service 的简单 web 服务，代码直接托管在了 [Github](https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git) 上。

:::tip 注意

Erda 平台可以部署运行任意语言、任意框架开发的代码，并不局限于 Java、SprintBoot 等。

:::

#### 下载示范代码到本地

```bash
git clone https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git
```

#### 推送示范代码到平台

平台基于标准的 Git 协议内置实现了一个 git 代码仓库，用户不需要依赖外部仓库（比如：gitlab 等）就可以完成从源码开发到部署全流程。

平台远程仓库服务器地址查看入口位于：

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 代码浏览 -> 仓库地址

```bash
git remote add erda http://dice.dev.terminus.io/wb/erda-test/java-demo
git push -u erda --all
git push -u erda --tags
```

完成代码推送后，即可在代码仓库中查看代码信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/15/b2734916-2970-409a-8c20-c69b461caf26.png)

## 定义流水线

给该示范代码工程添加平台配置文件 pipeline.yml 和 dice.yml。

#### pipeline.yml

pipeline.yml 描述一个从代码编译构建到应用部署的流水线的配置文件；简单的完成基于 Git 源码部署，一般可以设置 4 个 stage 来组成 pipeline.yml，4 个 stage 按照书写顺序依次执行，分别是：

1. 拉取 Git 源码
2. 基于源码编译、构建，制作 Docker 镜像
3. 生成版本产物
4. 基于版本产物完成部署

4 个 stage 分别可用如下 Action 来执行：

1. [git-checkout](https://www.erda.cloud/market/action/git-checkout)
2. [java](https://www.erda.cloud/market/action/java)
3. [release](https://www.erda.cloud/market/action/release)
4. [dice](https://www.erda.cloud/market/action/dice)

:::tip

此处介绍的 4 个 stage 只能算是最基本的，可以按照自己的需求设置更多的 stage，比如：单元测试等。另外，stage 和 Action 并不是一对一的关系，一个 stage 中可以设置多个 Action 同时并行执行。

:::

该示例工程的完整 pipeline.yml，更多功能可以参考 [pipeline.yml 规范](./pipeline.md)。

```yaml
version: 1.1
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

#### dice.yml

dice.yml 是描述一个应用的服务架构，对 CPU、内存等资源的配置，服务插件的依赖关系以及发布形式的 yml 配置文件；以下是该示例工程的 dice.yml，更多功能可以参考 [dice.yml规范](./dice-yml.md)。

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

#### 提交文件

将新增的两个 yaml 文件提交至平台的代码仓

```bash
git add .
git commit -m "add pipeline.yml and dice.yml"
git push erda feature/demo
```

:::tip 注意

这里提交的远程仓库分支的前缀是 feature/*，分支名会直接决定应用部署的环境。

:::

## 执行流水线

1. 进入`流水线`，右上角点击`添加流水线`，选择 `feature/demo` 分支创建新的流水线任务。
2. 流水线任务分析完成后，处于待执行状态，右上角点击 `立即执行`，开始执行构建。
3. 流水线任务执行过程中，可以实时查看流水线各步骤的执行状态，并点击`日志`查看对应节点执行状况的日志信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/11/0fc68583-4a77-4eda-a553-affe74bf1bab.gif)

## 查看应用部署结果

通过流水线构建源码，并成功完成部署动作后，可在部署中心看到已经成功部署的应用实例 Runtime，进入 Runtime 中可以进一步进行 [应用管理](/manual/deploy/management.md) 相关的操作，比如：配置域名、服务实例扩缩容等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/10/4352a321-7351-4d8b-a9db-2db087deaa4a.png)

仔细观察可以注意到刚才部署的 Runtime 属于开发环境中，这是由平台默认的 [分支规范](./branch-rule.md) 所决定的，当然可以通过应用设置来自定义分支规范。

#### 下一步推荐学习

* [应用管理](/manual/deploy/management.md)
* [流水线](/manual/deploy/pipeline.md)
* [dice.yml](./dice-yml.md)
