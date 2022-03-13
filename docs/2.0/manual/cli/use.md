# 初次使用

## 登录

CLI 有少数命令无需登录也可执行，例如 `migrate` 相关命令。

CLI 的多数子命令需在登陆后执行，登录相关参数如下：

1. `--host` 指定需要登录的 Erda 平台地址。
2. `-u`，`--username ` 指定登录用户名。
3. `-p`，`--password` 指定登录密码。

::: tip 提示

当前目录为代码目录，CLI 则会通过 `git remote get-url <remote-name>` 尝试获取平台地址、企业名称、项目ID、应用ID，其中 remote-name 可以通过 `--remote` 指定，默认是  `origin`。

:::

如果您未通过登录参数指定登陆信息，则需要通过交互方式填写。

```shell
$ erda-cli clone https://erda.cloud/trial/dop/projects/599
Enter your erda username: <YourName>
Enter your erda password: <YourPassword>
ORGID    NAME         DESCRIPTION
100060   erda         Erda 开源组织
100046   trial        Trial 企业
```

::: tip 提示

登录成功后将保存 Session。Session 过期后需重新登录。

:::

## 应用部署

### 代码准备

::: warning 警告

请您先在 Erda 的 Web 界面上创建项目和应用，并提交代码。

本文假设创建的组织名称为 trial，项目的名称为 bestpractice，应用名称为 echo-service。

:::

克隆项目到本地 ：

```shell
$ erda-cli clone https://erda.cloud/trial/dop/projects/599
  Application 'echo-service' cloning ...
  Application 'echo-service' cloned.
  Application 'echo-web' cloning ...
  Application 'echo-web' cloned.
✔ Project 'bestpractice' and your applications cloned.
```

### 应用构建

执行流水线并查看构建状态。

```shell
$ cd bestpractice/echo-service
$ erda-cli  build pipeline.yml
✔ run pipeline: pipeline.yml for branch: master, pipelineID: 14174832, you can view building status via `erda-cli view -i 14174832`

$ erda-cli view -i 14174832
Pipeline progress (current/total): 1/4
PIPELINEID   TASKID     TASKNAME       TASKSTATUS   STARTEDAT
14174832     14411986   git-checkout   Success      2022-03-11 15:38:27
14174832     14411988   java-build     Running      2022-03-11 15:38:36
14174832     0          release        Analyzed     0001-01-01 00:00:00
14174832     0          dice           Analyzed     0001-01-01 00:00:00
```

## 项目初始化

### 创建项目

#### 基于工程包

可以基于标准产品的项目制品生产项目工程包，用于在实施环境快速创建项目。

* 在标准项目中创建流水线

  ```yaml
  version: "1.1"
  stages:
    - stage:
        - project-package:
            alias: project-package
            description: 用于 Erda 平台制作项目工程包
            version: "1.0"
            params:
              artifacts:
                - name: gaia-oms
                  type: project
                  version: "1.0"
  ```

​		其中 artifacts 描述了工程包关联的制品。运行流水线完成工程包制作，然后通过下载链接获取。

* 工程包中结构如下：

  ```shell
  .
  ├── artifacts
  │   └── gaia-oms_1.0.zip
  ├── environments
  │   ├── DEV-env.yml
  │   ├── PROD-env.yml
  │   ├── STAGING-env.yml
  │   └── TEST-env.yml
  ├── metadata.yml
  ├── project.yml
  ├── repos
  │   ├── gaia-oms-go-demo-release-1.0.zip
  │   └── gaia-oms-rust-demo-release-1.0.zip
  ├── values.yml
  ```

  工程包中包含：

    1. 应用列表
    2. 应用代码
    3. 项目制品
    4. 环境配置，包括 Custom Addon、集群及配额

* 填写配置

  工程包中的 `values.yml` 文件需要填写新项目需要的具体配置：

  ```yaml
  values.DEV.addons.oss.config.OSS_ACCESS_KEY_ID: ""
  values.DEV.addons.oss.config.OSS_ACCESS_KEY_SECRET: ""
  values.DEV.addons.oss.config.OSS_BUCKET: ""
  values.DEV.addons.oss.config.OSS_ENDPOINT: ""
  values.DEV.addons.oss.config.OSS_HOST: ""
  values.DEV.addons.oss.config.OSS_PROVIDER: ""
  values.DEV.addons.oss.config.OSS_REGION: ""
  values.DEV.addons.oss.config.OSS_STORE_DIR: ""
  values.DEV.addons.test.config.abc: ""
  values.DEV.cluster.name: ""
  values.DEV.cluster.quota.cpuQuota: 0
  values.DEV.cluster.quota.memoryQuota: 0
  ...
  values.PROD.cluster.name: ""
  values.PROD.cluster.quota.cpuQuota: 0
  values.PROD.cluster.quota.memoryQuota: 0
  ```

* 使用工程包初始化项目

  ```shell
  $ erda-cli create --host https://erda.cloud --org erda -n demo-project -d 'demo project' --init-package project_package_20220310194452.zip
  Enter your erda username: <Your Username>
  Enter your erda password: <Your Password>
    Devops project demo-project creating...
    Devops project demo-project created.
    Msp tenant demo-project creating...
    Msp tenant demo-project created.
    Project package importing...
    Project package importing...
    Project package imported.
  ✔ Project 'demo-project' created.
  ```

  其中 project_package_20220310194452.zip 是项目工程包。

  初始化过程会完成：

    1. 项目创建
    1. 监控租户创建
    1. 工程包导入：创建应用、推送代码、创建 Custom Addon、导入制品

### 项目工程

#### 项目克隆

使用 `clone` 命令将 Erda 上的项目克隆到本地，进而可以在本地项目空间中进行操作：

```shell
$ erda-cli clone https://erda.cloud/trial/dop/projects/599
  Application 'echo-service' cloning ...
  Application 'echo-service' cloned.
  Application 'echo-web' cloning ...
  Application 'echo-web' cloned.
✔ Project 'bestpractice' and your applications cloned.
```

默认 `--cloneApps` 选项为 `true`，会将项目中各个应用及代码也克隆到本地。

完成克隆后，会在本地以项目名称创建目录，项目目录即为项目空间，其下有隐藏文件记录项目信息。

```yaml
$ cd bestpractice/
$ cat .erda.d/config
version: v0.0.1
server: https://openapi.erda.cloud
org: trial
org_id: 100046
project: bestpractice
project_id: 599
applications:
    - name: echo-service
      id: 7097
      mode: SERVICE
      desc: "web server supplies services"
    - name: echo-web
      id: 7083
      mode: SERVICE
      desc: "web server supplies apis"
```

在项目空间中执行 CLI 命令，默认会加载项目及应用的信息。

#### 项目推送

可以将本地项目空间中的应用及代码推送到任一 Erda 平台上的项目里，方便快速的部署和二次开发。

```shell
$ erda-cli push https://one.gts.terminus.io/trial/dop/projects/127 --application echo-web --application echo-service
  Application 'xxx' pushed.
✔ Project 'bestpractice' pushed to server https://openapi.erda.cloud.
```

