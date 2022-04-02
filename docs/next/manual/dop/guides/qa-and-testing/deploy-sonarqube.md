# 在 Erda 中使用 SonarQube
SonarQube（Sonar）是一个开源的代码质量管理系统。 提供重复代码、编码标准、单元测试、代码覆盖率、代码复杂度、潜在Bug、注释和软件设计报告等功能。

本文主旨是介绍如何在erda的项目中使用sonar，为应用提供一个代码质量管理的系统。

## 准备工作
着手使用 sonar 前，你需要对 Erda 有一个初步的了解。Erda 是以 [项目和应用](../../../quick-start/premise.html) 为中心来展开一系列功能的，所以你首先需要有一个 [项目](../../../quick-start/premise.html#项目)，并且需要为此项目分配资源【[如何为项目分配资源](../../../dop/guides/deploy/resource-management.html#资源管理)】。

::: tip
请确保分配的资源满足和匹配应用构建的环境以及其他限制，我们发现有很多用户往往对此有所忽略而导致无法进行正常构建。具体详情请参看：[资源管理](../../../dop/guides/deploy/resource-management.html#资源管理)
:::

如果你正打算创建一个全新的项目，我们建议你先阅读下面两篇：
1. [项目和应用创建](../../../quick-start/newbie.html#加入项目)
2. [项目资源管理](../../../ecp/resource.md)

如果你对如何管理项目资源有所疑惑，我们建议你继续阅读以下几篇：
1. [管理配额](../../../dop/guides/deploy/resource-management.html#管理配额)
2. [节点标签](./../../cmp/guide/cluster/cluster-node-labels.html#节点标签)

## 准备一个可用的 SonarQube 服务
首先你需要有一个可用的 SonarQube 服务，以开启使用教程。你可以选择其他供应商提供的 SonarQube 服务，也可以选择自建服务。当然 SonarQube 官方也提供了 SaaS 服务的可选项，你可以在其 [官网](https://sonarcloud.io/) 方便的获取一个立刻能够使用的实例。

这个章节，我们简单罗列了几种常见的搭建方案。当然如果你急着想要看到 Erda 是如何与 SonarQube 并肩保障你程序质量的话，我们也提供了一种“快速”的方案，我们称之为「临时 Sonar 实例」的方案，它借由 Erda 一键发布应用的能力，通过简单的 pipeline.yml 和 erda.yml 就可以把 Sonar 当作一个应用快速弹起了。

::: Warning
这种「临时 Sonar 实例」不可用于真实使用场景，只用于文档读者快速进入后续教程之便。
:::

下面子章节我们将按照推荐的方案进行排布，请读者选择性阅读：

1. [SonarCloud](#SonarCloud)
2. [已有自建 Sonar 服务](#已有自建sonar服务)
3. [临时 Sonar 实例](#临时Sonar实例)【不可用于真实使用场景】

### SonarCloud
SonarCloud 是一sonar官方提供的代码检测平台，当是开源项目时还是免费，详情可以查看 [官网](https://sonarcloud.io/) 。

### 已有自建sonar服务
自建sonar服务可以参考一下集中方式：
1. 人工运维搭建sonar服务，sonarQube目前已开源，可以到 [github](https://github.com/SonarSource/sonarqube) 下载并安装
2. docker容器搭建sonar服务 [官方镜像](https://hub.docker.com/_/sonarqube)
3. 通过helm在k8s集群搭建sonar服务 [helm chart](https://docs.sonarqube.org/latest/setup/sonarqube-on-kubernetes/)


### 临时Sonar实例
#### 新建应用
想要快速构建一个sonar服务，需要在项目下新建一个应用用来部署自建的sonar，比如新建一个叫做`sonarqube`的应用，这只是为了快速开始，不建议生产环境使用
![新建应用](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/29/91b408d9-e279-42db-9542-7fdba9a3db74.png)
建好应用之后， 我们需要编写`pipeline.yml`和`erda.yml`帮助我们快速的部署sonar服务，其中`pipeline.yml`帮助我们快速输出sonarQube服务制品【 [更多关于流水线](../../../dop/concepts/pipeline.html) 】,`erda.yml`让我们以声明的方式运行服务【 [更多关于erda.yml](../../../dop/concepts/erda.html) 】

::: tip
你也可以直接使用我们准备好的例子，免去从零调试的麻烦，代码仓库: [代码示例](https://github.com/chengjoey/erda-sonarqube)
:::

#### 编写流水线
```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
          description: 代码仓库克隆
  - stage:
      - release:
          alias: release
          params:
            dice_yml: ${{ dirs.git-checkout }}/erda.yml
  - stage:
      - dice:
          alias: dice
          description: 用于 Erda 平台部署应用服务
          params:
            release_id: ${{ outputs.release.releaseID }}
```

#### 编写erda.yml
在上面的流水线里已经能成功输出制品，现在我们需要用erda.yml来描述sonar的部署。
可以到[sonar官方](https://hub.docker.com/_/sonarqube)选择一个版本，然后将`image`进行替换，当然也可以直接使用我们做好的8.9.6版本。
```yaml
version: '2.0'
services:
  sonar:
    image: registry.cn-hangzhou.aliyuncs.com/dice-third-party/sonar:8.9.6
    ports:
      - port: 9000
        expose: true
    resources:
      cpu: 0.5
      mem: 2048
    deployments:
      replicas: 1
```
可以根据需要自行修改cpu和内存资源。

#### 执行流水线
在选择sonar的版本并编写好流水线后，通过执行流水线可以构建部署sonarqube，
如果想指定sonar的管理员密码和token，可以在应用设置里的环境部署里设置参数。
* SONAR_ADMIN_PASSWORD：sonar的管理员密码
* SONAR_ADMIN_TOKEN：sonar的管理员token
![参数配置](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/29/1fdf0c11-29e6-4a7c-bd03-cf61f10bf5ca.png)

点击执行流水线，等待部署完成。

#### 测试sonar
在部署完成后，可以到部署中心点击设置域名，开放sonar服务
![设置域名](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/29/35869374-5c41-42d1-ae9f-34a417858df7.png)
打开部署好的sonar链接地址，可以看到一个全新的sonar服务
![sonar服务](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/29/a555eacf-f436-41df-ac4a-c134387f30b6.png)
至此完成了一个自建的sonarqube服务

## 在 SonarQube 中创建项目和授权凭证（Token）
无论是哪个方案，现在我们都已经拥有了一个服务，现在让我们在sonarQube上新建一个项目和token为我们的应用进行代码检查
![新建项目](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/30/63ff9cec-6216-401d-87f2-8fa998556c6c.png)
如图所示，新建一个项目,然后为项目新建一个token密钥
![新建token](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/30/87bb47b4-d0e0-4671-b93b-47f798919df2.png)
具体可以参考sonar [官方文档](https://docs.sonarqube.org/latest/)

## 开始为你的业务应用配置sonar
至此我们已经准备好了代码质量检查所有前置条件，接下来可以选择需要代码检查的应用，到应用设置里配置sonar的信息
进入 **DevOps 平台 > 我的项目 > 选择应用 > 应用设置 > sonar设置** 
![sonar设置](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/30/910afa2b-cbae-4944-8e85-759875dfec0f.png)

1. sonar服务地址
2. sonar密钥
3. sonar的项目名称(可选)

在配置完sonar信息后，到应用里新建流水线选择`sonar action`(2.0)并执行即可使用sonar服务
流水线示例:
```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
          version: "1.0"
          params:
            branch: master
            depth: 1
  - stage:
      - sonar:
          alias: sonar
          version: "2.0"
          params:
            # 这里指定了sonar分析的应用代码
            code_dir: ${{ dirs.git-checkout }}
            # 默认不需要代码检查为ok
            must_gate_status_ok: false
```

::: tip
在通常情况下，只有在代码门禁检查状态为`OK`时才允许流水线后续的打包部署等，这个时候可以将参数`must_gate_status_ok`置为true，这样将强制要求代码质量检查通过。【更多代码门禁检查点击 [链接](https://docs.sonarqube.org/latest/user-guide/quality-gates/) 查看】
:::


::: tip
在使用`sonar action`时请选择2.0版本以支持自定义sonarQube服务，若不指定版本，则默认为 1.0 版本【 [1.0版本请查看](../../../dop/guides/qa-and-testing/sonar-report.html) 】
:::

执行成功后`sonar action`将会返回sonar项目的链接地址
![sonar](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/30/722b7cb9-7dbe-4684-9b91-d429f47fb70d.png)
打开项目链接地址即可到sonar查看具体的代码质量报告

## 查看应用的代码质量报告
在成功执行流水线后，可以看到`sonar action`返回了你的应用在sonar服务的链接，打开该链接即可看到应用的质量报告
![质量报告](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/31/4aaad428-1439-49ad-97db-affe4ad4bba2.png)
代码质量报告大概包含了一下几个内容
1. 漏洞(bug)
2. 代码异味
3. 覆盖率
4. 重复代码
5. 其它

每一项还可以区分每次扫描新增的数量，可以说sonar质量报告从可靠性、安全性、可维护性、覆盖率、重复率等方面分析项目，风险等级从A~E划分为5个等级，有助于我们严格把关代码工程的质量。
具体内容可查看 [官方文档](https://docs.sonarqube.org/latest/analysis/overview/)