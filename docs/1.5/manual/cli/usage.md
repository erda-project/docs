# 初次使用

## 配置

您可以设定 Erda CLI 配置文件，默认的存放地址是 `~/.erda.d/config`。配置文件中主要设置 Erda 平台的信息及当前的上下文。

一个完整配置示例（yaml 格式）：

```yaml
version: "1.0"
platforms:
    - name: erda
      server: https://openapi.erda.cloud
      org_info:
        id: 0
        name: trial
        desc: ""
contexts:
    - name: erda
      platform_name: erda
current_context: erda
```

### erda-cli config

您可以通过 `erda-cli config` 命令完成配置文件。例如可以通过以下命令完成示例配置：

```shell
$ erda-cli config set-platform erda --server=https://openapi.erda.cloud --org=trial
✔ Platform "erda" set.

$ erda-cli config set-context erda --platform=erda
✔ Context "erda" set.

$ erda-cli config use-context erda
✔ Use context "erda".

$ erda-cli config
// 此处省略输出，见“一个完整的配置示例”
```

## 登录

CLI 有少数命令无需登录也可执行，例如 `migrate` 相关命令。

CLI 的多数子命令需在登陆后执行，登录相关参数如下：

1. `--host` 指定需要登录的 Erda 平台地址。
2. `-u`，`--username ` 指定登录用户名。
3. `-p`，`--password` 指定登录密码。

::: tip 提示

当前目录为代码目录，CLI 则会通过 `git remote get-url <remote-name>` 尝试获取平台地址、企业名称、项目ID、应用ID，其中 remote-name 可以通过 `--remote` 指定，默认是  `origin`。

:::

如果您未通过登录参数制定平台信息，则会基于 `~/.erda.d/config` 配置中的 context 去获取平台信息。并通过交互方式填写。

```shell
$ erda-cli org
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

::: warning 警告

CLI 暂未支持组织（Org）和项目（Project）的创建，请您先在 Erda 的 Web 界面上进行创建。

本文假设创建的组织名称为 trial，项目的名称为 bestpractice。

:::

通过 `erda-cli org` 列出您所在的组织，然后使用 `erda-cli switch trial` 切换到 trial 组织里。

```shell
$ erda-cli org
ORGID    NAME         DESCRIPTION
100060   erda         Erda 开源组织
100046   trial        Trial 企业

$ erda-cli org switch trial
  Before : trial          (100046)
✔ Current: trial          (100046)
```

进一步，通过 `erda-cli project` 列出 trial 企业下面的您的项目。

```shell
$ erda-cli project
PROJECTID   NAME               DISPLAYNAME                 DESCRIPTION
273         trial-demo         trial-demo                  培训示例项目
599         bestpractice       bestpractice                最佳实践项目
```

### 代码准备

克隆开源代码到本地 example 目录，生成 erda.yml 和 pipeline.yml 配置文件。

```shell
$ git clone https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git example
Cloning into 'example'...
remote: Enumerating objects: 48, done.
remote: Total 48 (delta 0), reused 0 (delta 0), pack-reused 48
Receiving objects: 100% (48/48), 22.06 KiB | 85.00 KiB/s, done.
Resolving deltas: 100% (11/11), done.

$ cd example
$ erda-cli erda init
✔ Init .erda/erda.yml success.
$ erda-cli pipeline init
✔ Init .dice/pipelines/pipeline.yml success.

$ git add . && git commit -m 'init erda'
[master 1c57e2f] init erda
 2 files changed, 109 insertions(+)
 create mode 100644 .dice/pipelines/pipeline.yml
 create mode 100644 .erda/erda.yml
```

在 bestpractice 项目下创建 example 应用，并推送代码到 Erda 平台

```shell
$ erda-cli application create --name=example --project-id=599 --description='demo application'
✔ Application created.

$ erda-cli application inspect --application=example --project=bestpractice --only-repo --interactive=false | xargs -I {} git remote add erda {}

$ git push -u erda --all
Enumerating objects: 48, done.
Counting objects: 100% (48/48), done.
Delta compression using up to 8 threads
Compressing objects: 100% (21/21), done.
Writing objects: 100% (48/48), 22.06 KiB | 22.06 MiB/s, done.
Total 48 (delta 11), reused 48 (delta 11), pack-reused 0
To https://erda.cloud/trial/dop/bestpractice/example
 * [new branch]      master -> master
```

### 应用构建

执行流水线并查看构建状态。

```shell
$ erda-cli pipeline run --remote erda
✔ run pipeline: .dice/pipelines/pipeline.yml for branch: master, pipelineID: 12814099, you can view building status via `erda-cli pipeline status -i 12814099`

$ erda-cli pipeline view -i 12814099 --remote erda
pipeline progress (currentStage/totalStages): 4/4

PIPELINEID   TASKID     TASKNAME   TASKSTATUS   STARTEDAT
12814099     10642147   dice       Running      2021-12-10 18:12:03

$ erda-cli pipeline status -i 12814099 --remote erda
✔ Pipeline 12814099 run successfully.
```

### 应用查看

```shell
$ erda-cli application open --application=example --projec
t=bestpractice
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/5e031465-4945-45bf-a516-1276ee76a2e2.png)

