# 平台上手

在开始使用平台前，首先需要搭建好 [本地环境](./local-environment.md)。

## 准备工作

1. 需要企业开启了 [发布商能力](./management.md#发布商) (用于发布移动 App)
2. 准备好一个项目
3. 项目中创建应用，选择 `移动应用`，选择模版 `terminusMobileTemplates` 填写必要信息
4. 等待片刻后代码初始化完毕

## 订阅所需模块库

[模块库](./libraries.md) 是由企业内部各团队研发，用于共享的代码，一般通俗的称为“二方包”。通过使用已被共享的模块库，可以有效的复用公共逻辑，显著加快研发工作。

::: tip
使用 [三端统一框架](./framework.md) 技术时，模块库等同于 npm 包
:::

通过申请订阅模块可以将模块引入应用中，同时通过一键复制方便快速将依赖库使用配置同步进入代码。

申请入口在：
> DevOps 平台 -> 我的项目 -> 应用列表 -> 应用设置 -> 更多设置 -> 订阅模块

::: tip
申请订阅模块库后，需要企业管理员在后台同意后才能够使用“一键复制”功能。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/18/be102218-5262-4af2-bc66-ce22066f1b95.png)

## 证书准备

Android/iOS 打包需要提前准备 [证书](./certificates.md)。证书由企业管理员进行 [创建](./management.md#证书管理)

在平台上使用 `引用证书` 功能，向企业管理员申请证书授权。

申请入口在：
> DevOps 平台 -> 我的项目 -> 应用列表 -> 应用设置 -> 更多设置 -> 引用证书

授权通过后开启“推送到变量配置”，选择将变量推送到的环境，以及 keystore 文件路径、密码，key 别名、密码等设置变量名，平台将通过环境变量的方式将具体的文件路径、密码，key 别名、密码等配置传入打包环境。通过环境变量将这些参数传入打包命令：

```bash
cd android && ./gradlew clean assembleRelease -DRelease-keystore=((RELEASE_CERT_FILE_PATH)) -DRelease-keystore-password=((RELEASE_CERT_FILE_PASSWORD)) -DRelease-key-alias=((RELEASE_CERT_KEY_ALIAS)) -DRelease-key-password=((RELEASE_CERT_KEY_PASSWORD))
```

::: tip
关于如何运行这个命令，将会在 [构建出第一个 APP](#构建出第一个-app) 提及。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/18/fc53b7c2-f7f4-41d0-868a-b6f01bcf0136.png)

## 监控集成

::: warning
当前版本需要先 [获得 APP 内测分发](#获得-app-内测分发)
:::

配置完内测分发 APP 之后，在打包命令中可以通过 `((AK))`, `((AI))` 的方式取得监控埋点 id (AK 和 AI 联合作为 APP 分发的唯一标识)

```bash
cd android && ./gradlew clean assembleRelease -Dak=((AK)) -Dai=((AI))
```

::: tip
关于如何运行这个命令，将会在 [构建出第一个 APP](#构建出第一个-app) 提及。
:::

## 获得 APP 内测分发

平台提供了 APP 内测分发能力。通过将开发者构建出的 APP 安装包推送到 APP 内测分发，企业内成员可以从平台的分发渠道下载和安装 APP：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/18/924a20fa-d65f-4ce0-be88-7707d36a94e9.png)

用户手机扫码安装界面：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/18/88558524-6d5d-4b4c-974e-e79456a72657.png)

在开始构建前，要先获得 APP 内测分发。

::: warning
请确保企业开启了 [发布商功能](./management.md#发布商)，并且管理员已在内测分发平台创建了一个 APP。
:::

通过版本推送设置，将应用与内测分发平台中的 APP 关联，可分别为四个构建环境设置推送的 APP。

::: tip
设置关联后，平台会自动同步 `AK`, `AI` 到环境配置，打包命令可以直接使用这个配置，并 [集成监控埋点](#监控集成)
:::

设置入口在：
> DevOps 平台 -> 我的项目 -> 应用列表 -> 应用设置 -> 更多设置 -> 版本推送

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/18/75db5baa-c4f2-47cc-9958-4d8912763d75.png)

## 构建出第一个 APP

基于 [准备工作](#准备工作) 初始化后的代码，进行构建。

### 定义流水线

首先需要编写 pipeline.yml 以描述构建过程。

pipeline.yml 是描述一个从代码编译构建到应用部署的流水线的配置文件；简单的完成基于 APP 构建和推送，一般可以设置 4 个 stage 来组成 pipeline.yml，4 个 stage 按照书写顺序依次执行，分别是：

1. 拉取 Git 源码
2. 基于源码编译、构建，制作 APP 安装包
3. 生成版本产物
4. 基于版本产物推送至 APP 内测分发平台

4 个 stage 分别可用如下 Action 来执行：

1. [git-checkout](https://www.erda.cloud/market/action/git-checkout)
2. [android](TODO)
3. [ios](TODO)
4. [release](https://www.erda.cloud/market/action/release)
5. [mobile-publish](https://www.erda.cloud/market/action/mobile-publish)

:::tip

此处介绍的 4 个 stage 只能算是最基本的，可以按照自己的需求设置更多的 stage，比如：单元测试等。另外，stage 和 Action 并不是一对一的关系，一个 stage 中可以设置多个 Action 同时并行执行。

:::

完整 pipeline.yml，更多功能可以参考 [pipeline.yml 规范](TODO)。

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: repo
          params:
            depth: 1
  - stage:
      - ios:
          params:
            context: ${repo}
            commands:
              - jenkins-mobile-cli build --platform=rn-ios --ios-scheme=example_test --ios-configurations=Test  --GCC_PREPROCESSOR_DEFINITIONS='$(inherited) TERMINUS_AI=\@\"((AI))\" TERMINUS_AK=\@\"((AK))\"' --log-quiet=true --static-scan=false
            targets:
              - ios/build/Build/Products/Test-iphoneos/example_test.ipa
      - android:
          params:
            context: ${repo}
            commands:
              - npm i
              - cd android && ./gradlew clean assembleRelease -Dai=((AI)) -Dak=((AK)) -DENV_SWITCH=1
            target: android/app/build/outputs
  - stage:
      - release:
          params:
            release_mobile:
                files:
                  - ${ios}/example_test.ipa
                  - ${android}/outputs/apk/release/app-release.apk
  - stage:
      - mobile-publish:
          params:
            release_id: ${release:OUTPUT:releaseID}
            readme_file: ${repo}/README.md
```

### 执行流水线

1. 进入`流水线`，右上角点击`添加流水线`，选择 `feature/demo` 分支创建新的流水线任务。
2. 流水线任务分析完成后，处于待执行状态，右上角点击 `立即执行`，开始执行构建。
3. 流水线任务执行过程中，可以实时查看流水线各步骤的执行状态，并点击`日志`查看对应节点执行状况的日志信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/11/0fc68583-4a77-4eda-a553-affe74bf1bab.gif)

### 查看构建结果

进入 APP 内测分发平台，进入 APP 查询版本列表，可以看到最近一次推送的版本，默认是下架状态。

访问入口：
> DevOps 平台 -> 我的发布 -> APP -> 版本内容

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/18/215b9599-73b1-4d4d-97f5-0181668fa6e4.png)

## 持续集成

::: warning
建设中
:::

## 持续运营

运营包含了用户安全管理配置和 App 运营数据统计，针对用户安全管理相关的配置具体提供了包括认证列表、黑名单、数据擦出等功能配置。运营数据的统计具备了数据实时统计的大盘功能，帮助运营商实时清晰把握用户数据的走向。

### 版本管理
持续集成后的版本信息可以在我的发布中进行预览，包括已上架和未上架的版本信息的同时，还可以管理版本的上、下架。

![版本列表](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/17/8618d9eb-24e1-4e9e-a9db-43b804cb9a01.png)

### 灰度分发
设置灰度值为 10%，则有 10% 用户会默认下载最新版本，90% 用户下载旧版本

### 安全管理
注册用户的基本信息，提供了基本预览功能，可以通过此处的 “拉黑”、“数据擦出”功能，实现对用户安全简单高效的管理。

![认证列表](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/17/54686097-2cc2-4dab-84de-b6ea246c86d5.png)

### 统计大盘
