# 在 Erda 中使用 SonarQube

SonarQube（Sonar）是一个开源的代码质量管理系统，提供重复代码、编码标准、单元测试、代码覆盖率、代码复杂度、潜在 Bug、注释及软件设计报告。

本文旨在为您介绍如何在 Erda 项目中使用 Sonar，为应用提供一个代码质量管理系统。

## 准备工作

着手使用 Sonar 前，您需要对 Erda 有初步的了解。Erda 以 [项目和应用](../../../quick-start/premise.html) 为中心展开一系列功能，因此请先创建一个 [项目](../../../quick-start/newbie.html#加入项目)，并为该项目分配资源（具体请参见 [资源配额](../../../dop/guides/deploy/resource-management.html#管理配额)）。

::: tip 提示
请确保分配的资源满足应用构建所需，避免因资源不足导致构建失败。具体请参见 [资源配额](../../../dop/guides/deploy/resource-management.html)。
:::

若您计划创建一个全新的项目，建议优先阅读以下文档：

1. [项目和应用创建](../../../quick-start/newbie.html#加入项目)
2. [项目资源管理](../../../dop/guides/deploy/resource-management.html)

若您对如何管理项目资源存在疑问，建议优先阅读以下文档：

1. [管理配额](../../../dop/guides/deploy/resource-management.html#管理配额)
2. [节点标签](./../../cmp/guide/cluster/cluster-node-labels.html#节点标签)

## 准备一个可用的 SonarQube 服务

首先您需要有一个可用的 SonarQube 服务，用于后续操作。您可以选择其他供应商提供的 SonarQube 服务，也可以选择自建服务。SonarQube 官方同样提供了 SaaS 服务的可选项，您可以在其 [官网](https://sonarcloud.io/) 快速获取一个可用的实例。

本章节为您罗列了几种常见的搭建方案。若您急于了解 Erda 如何与 SonarQube 并肩保障程序质量，此处另提供一种快速的方案，即“临时 Sonar 实例”。该方案借由 Erda 一键发布应用的能力，通过简单的 pipeline.yml 和 dice.yml 即可将 Sonar 作为一个应用快速弹起。

::: Warning 警告
此类“临时 Sonar 实例”不可用于真实应用场景，仅供快速入门参考。
:::

您可以根据实际需要，有选择性地阅读以下内容：

1. [SonarCloud](#SonarCloud)
2. [已有自建 Sonar 服务](#已有自建-Sonar-服务)
3. [临时 Sonar 实例](#临时-Sonar-实例)（不可用于真实应用场景）

### SonarCloud

SonarCloud 是由 Sonar 官方提供的代码检测平台，对开源项目免费提供，具体请参见 [SonarCloud 官网](https://sonarcloud.io/)。

### 已有自建 Sonar 服务

自建 Sonar 服务可参考以下几种方式：

1. 人工运维搭建 Sonar 服务，SonarQube 目前已开源，可前往 [GitHub](https://github.com/SonarSource/sonarqube) 下载安装。
2. Docker 容器搭建 Sonar 服务 [官方镜像](https://hub.docker.com/_/sonarqube)。
3. 通过 Helm 在 K8s 集群搭建 Sonar 服务 [Helm Chart](https://docs.sonarqube.org/latest/setup/sonarqube-on-kubernetes/)。


### 临时 Sonar 实例

#### 新建应用

如需快速构建一个 Sonar 服务，请在项目下新建一个应用用于部署自建 Sonar，例如新建一个应用命名为 sonarqube（该示例仅供快速入门参考，不建议在生产环境中使用）。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/e1ce4759-3da1-418e-b04a-5d5a7f28fd23.png)

完成应用创建后，需编写 pipeline.yml 和 dice.yml 以快速部署 Sonar 服务，其中 pipeline.yml 用于快速输出 SonarQube 服务制品（关于流水线更多信息，请参见 [pipeline.yml](../../../dop/concepts/pipeline.html)），dice.yml 则以声明的方式运行服务（关于 dice.yml 更多信息，请参见 [dice.yml](../../../dop/concepts/dice-yaml.html)）。

::: tip 提示
您也可以前往 [GitHub](https://github.com/chengjoey/erda-sonarqube) 直接获取代码示例，免去从零调试的麻烦。
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
            dice_yml: ${{ dirs.git-checkout }}/dice.yml
  - stage:
      - dice:
          alias: dice
          description: 用于 Erda 平台部署应用服务
          params:
            release_id: ${{ outputs.release.releaseID }}
```

#### 编写 dice.yml

上文的流水线可成功输出制品，此时需用 dice.yml 描述 Sonar 的部署。

您可以前往  [Sonar 官方](https://hub.docker.com/_/sonarqube) 选择目标版本，随后替换 Image，或直接使用现成的 8.9.6 版本。

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

您可以根据需要自行修改 CPU 和内存资源。

#### 执行流水线

完成 Sonar 版本选择及流水线编写后，执行流水线即可构建部署 SonarQube。

如需指定 Sonar 的管理员密码和 Token，可进入应用的 **设置 > 环境部署** 设置参数。

* SONAR_ADMIN_PASSWORD：Sonar 的管理员密码

* SONAR_ADMIN_TOKEN：Sonar 的管理员 Token


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/73af4041-7323-4384-bbf8-c4412531d183.png)

点击执行流水线，等待部署完成。

#### 测试 Sonar

完成部署后，可进入部署中心点击 **设置域名**，开放 Sonar 服务。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/b6c2d8f6-d794-40cd-b3e4-36f49380d006.png)

前往该 Sonar 链接地址，即可看到一个全新的 Sonar 服务。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/6e2e8eba-08c0-43d3-b322-cdd195b486be.png)

至此，您已完成一个自建的 SonarQube 服务。

## 在 SonarQube 中创建项目和授权凭证（Token）

完成服务创建后，请在 SonarQube 中新建一个项目和 Token，用于后续的应用代码检查。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/62537862-8e97-41a4-bfff-4d02b02852b1.png)

如图所示，新建一个项目，随后为该项目新建一个 Token 密钥。具体请参见 [Sonar 官方文档](https://docs.sonarqube.org/latest/)。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/1396bc2a-b8e6-4130-92c8-b464ebcc01b8.png)

## 开始为您的业务应用配置 Sonar

至此您已完成代码质量检查的所有前置条件。请选择需代码检查的应用，进入该应用的 **设置 > Sonar 设置** 配置 Sonar 信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/72fdd639-5c73-4d89-bb97-0a2e9fbba50f.png)

完成 Sonar 信息配置后，进入应用新建流水线，选择 Sonar Action （2.0）并执行即可使用 Sonar 服务。

流水线示例如下：

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

::: tip 提示

* 通常情况下，仅在代码门禁检查状态为 OK 时允许流水线后续的打包部署等操作。此时可将参数 `must_gate_status_ok` 设为 true，即为强制要求代码质量检查通过。关于代码门禁检查更多信息，请参见  [官网文档](https://docs.sonarqube.org/latest/user-guide/quality-gates/)。
* 使用 Sonar Action 时请选择 2.0 版本以支持自定义 SonarQube 服务。若未指定版本，则默认为 1.0 版本（具体请参见 [代码质量](../../../dop/guides/qa-and-testing/sonar-report.html)）。

::: 

执行成功后，Sonar Action 将返回 Sonar 项目的链接地址。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/7be77dac-4a68-4e7c-a32a-b29ed71123bf.png)

打开该链接地址即可进入 Sonar 查看具体的代码质量报告。

## 查看应用的代码质量报告

成功执行流水线后，Sonar Action 将返回您的应用在 Sonar 服务的链接地址，打开该链接即可查看应用的质量报告。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/08/4e80257c-2790-4d6a-8602-255b400a3b23.png)

代码质量报告包含以下内容：

* 漏洞
* 代码异味
* 覆盖率
* 重复代码
* 其它

任意一项可区分每次扫描新增的数量。Sonar 质量报告从可靠性、安全性、可维护性、覆盖率、重复率等多方面对项目进行分析，并从 A～E 划分为 5 个风险等级，有助于您严格把关代码工程的质量。更多信息请参见 [官方文档](https://docs.sonarqube.org/latest/analysis/overview/)。
