# CLI 命令

## 命令说明

`--interactive`：布尔类型，指定 CLI 是否采用交互式，默认值为 `true`。

`--remote`：字符串类型，指定 CLI 用于获取 Erda 代码仓库的 Remote 名称，默认值为 `origin`。在未指定 Erda 地址的情况下，若 CLI 的工作目录为 Erda 应用的代码仓库，则将根据 Remote 名称获取 Git 地址并解析出组织（Org）、项目（Project）和应用（Application）信息。

`--host`：字符串类型，指定 CLI 访问的 Erda 地址。CLI 本质为访问 Erda 的 OpenAPI 地址，因此若设置为 *https://erda.cloud*，CLI 将转换为访问 *https://openapi.erda.cloud*。

`--username`：用户名，指定 CLI 访问 Erda 平台的登陆用户。

`--password`：密码，指定 CLI 访问 Erda 平台的登陆密码。

全部参数示意如下：

```shell
Global Flags:
      --host string       Erda host to visit (e.g. https://erda.cloud)
      --interactive       if true, interactive with user (default true)
  -p, --password string   Erda password to authenticate
  -r, --remote string     the remote for Erda repo (default "origin")
  -u, --username string   Erda username to authenticate
  -V, --verbose           if true, enable verbose mode
```

## erda-cli version

```bash
$ erda-cli version
Version: 1.4
BuildTime: 2021-11-17 01:01:59
GoVersion: go version go1.15.15 linux/amd64
CommitID: 02583bd49fc57841bdcb05b02486e27dd868cf00
DockerImage:
```

## erda-cli clone

您可以通过 `clone` 命令克隆 Erda 平台上的项目。

```shell
$ erda-cli clone https://erda.cloud/trial/dop/projects/599
  Application 'echo-service' cloning ...
  Application 'echo-service' cloned.
  Application 'echo-web' cloning ...
  Application 'echo-web' cloned.
✔ Project 'bestpractice' and your applications cloned.
```

参数说明如下：

```shell
Args:
   url               project url
Flags:
       --cloneApps   if false, don't clone applications in the project (default true)
```

## erda-cli issue
您可以通过 `issue` 命令列出项目协同中的待办事项。
```shell
// 进入项目空间
$ cd bestpractice

$ erda-cli issue
ISSUEID   FINISHDATE   STATE    ISSUENAME
298064    2022-03-31   待处理   实现公司统一单点登录
298068    2022-03-30   待处理   移动端登陆认证
298067    2022-03-28   待处理   用户身份统一认证
```

参数说明如下：

```shell
Flags:
      --bug             if true, list bugs
      --no-headers      if true, don't print headers (default print headers)
      --page-size int   the number of page size (default 10)
      --requirement     if true, list requirements
      --task            if true, list tasks
```

您可以通过 `--bug` 指定事项类型为缺陷，通过 `--requirement` 指定事项类型为需求，通过 `--task` 指定事项类型为任务。

## erda-cli issue fix

您可以通过 `issue fix` 命令创建代码分支以处理项目协同中的待办事项。

```shell
$ erda-cli issue fix 298067 --application echo-service --branch feature/auth
[INFO] No base branch set, use branch 'master'.
[INFO] Switched to a new branch 'feature/auth'
[INFO] [feature/auth f7add11] init branch 'feature/auth'
[INFO] remote:
remote: Create a pipeline request for 'feature/auth' on Erda by visiting:
remote:      https://erda.cloud/trial/dop/projects/599/pipelines/list
remote:
To https://erda.cloud/trial/dop/bestpractice/echo-service
 * [new branch]      feature/auth -> feature/auth
Branch 'feature/auth' set up to track remote branch 'feature/auth' from 'origin'.
[INFO] Branch 'feature/auth' created in application 'echo-service' to fix issue '298067'.
```

该命令将在应用的 `echo-service` 目录下创建 Git 分支 `feature/auth` 并提交至 Erda 代码仓库，同时在事项 298067 中添加评论，关联代码分支便于跟踪。

参数说明如下：

```shell
Args:
      issue-id               id of issue to fix
Flags:
      --application string   name of the application
      --base-branch string   branch as base to create from
      --branch string        branch to create and checkout
```

您可以通过 `--application` 指定创建代码分支的应用（若当前工作目录已是应用目录，可忽略），通过 `--branch` 指定代码分支名称，通过 `--base-branch` 指定基础分支（默认为 Master 分支）。

## erda-cli issue open

您可以通过 `issue open` 命令在浏览器中打开具体事项的页面。

```shell
$ erda-cli issue open 298067
✔ Open issue '298067' in browser.
```

参数说明如下：

```shell
Args:
      issue-id               id of issue to open
```

## erda-cli issue close

您可以通过 `issue close` 命令关闭事项。

```shell
$ erda-cli issue close 298067 --man-hour=2h
✔ Issue '298067' closed.
```

参数说明如下：

```shell
Flags:
      --man-hour string   time for work, in format of 2m/2h/2d/2w
```

您可以通过 `--man-hour` 指定使用的工时。

## erda-cli mr create

您可以通过 `mr create` 命令创建合并请求。

```shell
$ erda-cli mr create --from=feature/auth --to=master --title='auth service' --description='all auth handle by the same service'
[INFO] source branch feature/auth, target branch master
[INFO] Merge request created.
[INFO] To https://erda.cloud/trial/dop/projects/599/apps/7097/repo/mr/open/1
```

参数说明如下：

```shell
Flags:
      --application string   name of the application
      --description string   desc of merge request
      --from string          branch contains source code
      --issue-id uint        relate issue id
      --open                 if true, open merge request page in browser
      --remove               if true, remove merge source branch (default true)
      --title string         title of merge request
      --to string            branch contains base code
```

您可以通过 `--title` 指定合并请求的标题，通过 `--description` 描述合并请求的内容，通过 `--from` 指定合并请求的源代码分支，通过 `--to` 指定目标代码分支，通过 `--application` 指定应用（若当前工作空间为应用目录，则无需指定）。

## erda-cli push

您可以通过 `push` 命令将应用推送至 Erda 平台。

 ```shell
 $ erda-cli push https://erda.cloud/trial/dop/projects/599 --application new-app
   Application 'new-app' pushed.
 ✔ Project 'bestpractice' pushed to server https://openapi.erda.cloud.
 ```

参数说明如下：

```shell
Args:
  url                         project url
Flags:
      --all                   if true, push all applications
      --application strings   applications to push
      --configfile string     config file contains applications
      --force                 if true, git push with --force flag
  -h, --help                  help for push
```

## erda-cli create

您可以通过 `create` 命令在 Erda 上创建项目。

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

参数说明如下：

```shell
Flags:
  -d, --description string    description of the project
      --init-package string   package for init the project
  -n, --name string           the name of the project
      --org string            the name of an organization
      --wait-import int       minutes wait for package to be import (default 1)
```

## erda-cli build

您可以通过 `build` 命令构建 Erda 上的应用。

```shell
$ erda-cli build <path-to/pipeline.yml> --host=https://erda.cloud -u 'YourName' -p 'YourPassword'
✔ building for branch: feature/echo-web, pipelineID: 12639533, you can view building status via `erda-cli status -i <pipelineID>`
```

参数说明如下：

```shell
 Flags:
      --branch string   branch to create pipeline, default is current branch
  -h, --help            help for build
  -w, --watch           watch the status
```

`--watch` 可持续观察应用的构建过程。

## erda-cli view

您可以通过 `view` 命令构建 Erda 上的应用。

```shell
$ erda-cli view -i 12639533
✹ Stage 0
    ✔ Success task: git-checkout
✹ Stage 1
    ✔ Success task: java
✹ Stage 2
    ✔ Success task: release
✹ Stage 3
    ☕ Run task: dice
    ✔ Success task: dice

build succ, time elapsed: 00:02:15
Pipeline progress (current/total): 4/4
PIPELINEID   TASKID     TASKNAME       TASKSTATUS   STARTEDAT
12918029     10940839   git-checkout   Success      2021-12-20 15:46:09
12918029     10940840   java           Success      2021-12-20 15:46:35
12918029     10940854   release        Success      2021-12-20 15:46:53
12918029     10940877   dice           Success      2021-12-20 15:46:58
```

参数说明如下：

```
Flags:
  -b, --branch string     specify branch to show pipeline status, default is current branch
  -h, --help              help for view
  -i, --pipelineID uint   specify pipeline id to show pipeline status
  -w, --watch             watch the status
```

## erda-cli ext

您可以通过 `ext` 命令罗列 Erda 上所有的 Extension。

```shell
erda-cli ext --host=https://erda.cloud -u 'YourName' -p 'YourPassword'
ID                            TYPE     CATEGORY                  PUBLIC   UPDATED_AT
canal                         addon    database                  true     2021-11-18 01:12:56
consul                        addon    distributed_cooperation   true     2021-11-18 01:12:56
terminus-elasticsearch        addon    search                    true     2021-11-18 01:13:17
kafka                         addon    message                   true     2021-11-18 01:12:57
```

## erda-cli ext pull

您可以通过 `ext pull` 命令获取 Erda 上的 Extension。

```shell
$ erda-cli ext pull --host=https://erda.cloud -u 'YourName' -p 'YourPassword' git-checkout@1.0 -o git-checkout
✔ extension pull success
```

参数说明如下：

```
Flags:
  -o, --output string   which directory to export to
```

## erda-cli ext push

您可以通过 `ext push` 命令更新 Erda 上的 Extension。该操作需由平台管理员执行。

```shell
$ erda-cli ext push --host=https://erda.cloud -u 'YourName' -p 'YourPassword' -d git-checkout
✔ extension git-checkout push success
```

参数说明如下：

```shell
Flags:
  -a, --all               override exist extension and version,must with -f
  -d, --dir string        extension dir
  -f, --force             override exist version
  -r, --registry string   new registry
```

## erda-cli migrate

您可以通过 `migrate` 命令管理 MySQL 数据库中的数据变更。

```shell
$ erda-cli migrate -h
erda-cli migrate --mysql-host localhost --mysql-username root --mysql-password my_password --database erda

Usage:
  erda-cli migrate  [flags]
  erda-cli migrate [command]

Examples:
  $ erda-cli migrate --mysql-host localhost --mysql-username root --mysql-password my_password --database erda

Available Commands:
  lint        Erda MySQL Migration lint
  mkpy        make a python migration script pattern
  record      manually insert the migration record

Flags:
      --database string         [MySQL] database to use. env: ERDA_MYSQL_DATABASE
      --debug-sql               [Migrate] print SQLs
  -h, --help                    help for migrate
      --lint-config string      [Lint] Erda MySQL Lint config file
      --modules strings         [Lint] the modules for migrating
      --mysql-host string       [MySQL] connect to host. env: ERDA_MYSQL_HOST
      --mysql-password string   [MySQL] password to use then connecting to server. env: ERDA_MYSQL_PASSWORD
      --mysql-port int          [MySQL] port number to use for connection. env: ERDA_MYSQL_PORT (default 3306)
      --mysql-username string   [MySQl] user for login. env: ERDA_MYSQL_USERNAME
      --output string           [Migrate] the directory for collecting SQLs
      --sandbox-port int        [Sandbox] sandbox expose port. env: ERDA_SANDBOX_PORT (default 3306)
      --skip-lint               [Lint] don't do Erda MySQL Lint
      --skip-mig                [Migrate] skip doing pre-migration and real migration
      --skip-pre-mig            [Migrate] skip doing pre-migration
      --skip-sandbox            [Migrate] skip doing migration in sandbox

Global Flags:
      --host string       Erda host to visit (e.g. https://erda.cloud)
      --interactive       if true, interactive with user (default true)
  -p, --password string   Erda password to authenticate
      --remote string     the remote for Erda repo (default "origin")
  -u, --username string   Erda username to authenticate
  -V, --verbose           if true, enable verbose mode

Use "erda-cli migrate [command] --help" for more information about a command.
```


## erda-cli config

您可以通过 `config` 命令在 Erda 上为指定组织下的指定项目设置、更新、查询或删除指定 Workspace 支持的功能，包括开启 ECI，后续还将支持更多的功能，例如自动扩缩容 HPA/VPA 等。

```shell
$ erda-cli config  --help 
Config Project workspace configurations operation,including set, get, update, delete

Usage:
  erda-cli config [command]

Examples:
  erda-cli config

Available Commands:
  delete      delete project workspace config
  get         get project workspace config
  set         set project workspace config
  update      update project workspace config
```

### erda-cli config set
您可以通过 `set` 命令设置指定组织下指定项目的指定 Workspace 支持的功能，例如开启 ECI。

```shell
$ erda-cli  config set  --help 
set project workspace config

Usage:
  erda-cli config set <feature> [flags]

Examples:
  $ erda-cli config set HPA=enable --org xxx --project yyy --workspace DEV
```

其中，feature 为 `key=value` 的格式设置，若同时设置多个，请用逗号隔开，例如 `key1=value1,key2=value2`。

如需为 erda-demo 组织下 testeci 项目的 DEV Workspace 设置功能 ECI 为 enable，则命令如下：

```shell
$ erda-cli config set ECI=enable --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
✔ config set success 
```

### erda-cli config get
您可以通过 `get` 命令获取指定组织下指定项目的指定 Workspace 支持的功能信息。

```shell
$ erda-cli  config get  --help 
get project workspace config

Usage:
  erda-cli config get  [flags]

Examples:
  $ erda-cli config get --org xxx --project yyy --workspace DEV
```

如需获取 erda-demo 组织下 testeci 项目的 DEV Workspace 当前的功能详情，则命令如下：

```shell
$ erda-cli  config  get --host --host=https://erda.cloud  -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
[INFO] Configs get result: {"ECI":"enable"}
✔ config get success
```


### erda-cli config update
您可以通过 `update` 命令更新指定组织下指定项目的指定 Workspace 支持的功能，例如关闭 ECI。

```shell
$ erda-cli  config update  --help 
update project workspace config

Usage:
  erda-cli config update <feature> [flags]

Examples:
  $ erda-cli config update ECI=disable --org xxx --project yyy --workspace DEV
```

其中， feature 为 `key=value` 的格式设置，若同时设置多个，请用逗号隔开，例如 `key1=value1,key2=value2`。

如需为 erda-demo 组织下 testeci 项目的 DEV Workspace 更新功能 ECI 为 disable，则命令如下：

```shell
$ erda-cli config update ECI=disable --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
✔ config set success 
```


### erda-cli config delete
您可以通过 `delete` 命令删除指定组织下指定项目的指定 Workspace 支持的所有功能。若未指定 Workspace，则表示删除指定组织下指定项目的所有 Workspace 已设置的信息。

`delete` 命令不支持删除功能列表中的具体项，例如功能列表支持 ECI 和 HPA，则无法仅删除 HPA 而保留 ECI。此类情况下请使用 `update` 命令，将需删除的 HPA 设置为 disable 即可。

```shell
$ erda-cli  config delete  --help 
delete project workspace config

Usage:
  erda-cli config delete  [flags]

Examples:
  $ erda-cli config delete --org xxx --project yyy  --workspace DEV 
  $ erda-cli config delete --org xxx --project yyy
```

如需删除 erda-demo 组织下 testeci 项目的 DEV Workspace 的所有功能，则命令如下：

```shell
$ erda-cli config delete --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
✔ config delete success
```


## erda-cli project-deployment

您可以通过 `project-deployment` 命令在 Erda 上对指定组织下指定项目的指定 Workspace 下已部署的所有应用实例（及其 Addon 组件）进行停止或启动操作。

* **停止**：表示将已部署的所有应用实例（及其 Addon 组件）的副本数（Pod 数量）设置为 0，删除对应 Pod，但保留 Pod 所属的控制器如 StatefulSet、Deployment、CRD 等，仅设置副本数为 0。
* **启动**：表示将已部署且已停止的所有应用实例（及其 Addon 组件）的副本数（Pod 数量）由 0 恢复至停止前的状态。

通过 `project-deployment stop` 命令可快速释放集群资源，通过 `project-deployment start` 命令可快速恢复部署实例及其 Addon 至停止前的状态。

```shell
$ erda-cli project-deployment  --help 
Project workspace deployment operation, including stop, start

Usage:
  erda-cli project-deployment [command]

Examples:
  dice project-deployment

Available Commands:
  start       start project's runtimes and addons
  stop        stop project's runtimes and addons
```

### erda-cli project-deployment stop
您可以通过 `stop` 命令停止指定组织下指定项目的指定 Workspace 下已部署的所有应用实例（及其 Addon 组件）的副本数（Pod 数量）设置为 0，删除对应 Pod，但保留 Pod 所属的控制器如 StatefulSet、Deployment、CRD 等，仅设置副本数为 0。

```shell
$ erda-cli project-deployment stop --help 
stop project's runtimes and addons

Usage:
  erda-cli project-deployment stop  [flags]

Examples:
  $ erda-cli project-deployment stop --org xxx  --project yyy --workspace DEV
```

如需停止 erda-demo 组织下 testeci 项目的 DEV Workspace 的所有应用实例及其 Addon，则命令如下：

```shell
$ erda-cli project-deployment stop --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
[INFO] Project's applications IDs to stop is:[6 5]
[INFO] Begin to stop project's runtimes for runtime IDs:[186]
[INFO] Waitting 1 minutes for project's runtimes to Terminating        
✔ project-deployment stop project's runtimes success
[INFO] No addons found for project to stop
✔ project-deployment stop project's addons success
```
:::tip 提示
* Addon 和 Runtime 的停止有顺序依赖，优先停止 Runtime，并等待一分钟确保 Runtime 对应的 Pod 均已删除，随后停止 Addon。该执行过程可在命令执行输出中查看处理顺序。
* 目前不支持停止 6.8.9 和 6.8.22 版本以上的 Elasticsearch 的 Addon。

:::

### erda-cli project-deployment start

您可以通过 `start` 命令重新启动指定组织下指定项目的指定 Workspace 下已部署的所有应用实例（及其 Addon 组件），对应的所有应用实例（及其 Addon 组件）的副本数（Pod 数量）由 0 恢复至停止前的状态。

```shell
$ erda-cli project-deployment start --help 
start project's runtimes and addons

Usage:
  erda-cli project-deployment start  [flags]

Examples:
  $ erda-cli project-deployment start --org xxx --project yyy --workspace DEV
```

如需启动 erda-demo 组织下 testeci 项目的 DEV Workspace 的所有应用实例及其 Addon，则命令如下：

```shell
$ erda-cli project-deployment start --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
[INFO] Project's applications IDs to start is:[6 5]
[INFO] Begin to start project's addons for addon IDs:[o35a6a94a48b749f59b0258de68825727 s3746b6adfbce415ab4ca74c0b0f28fbe]
[INFO] Successed to start all addons: [o35a6a94a48b749f59b0258de68825727 s3746b6adfbce415ab4ca74c0b0f28fbe]
[INFO] Waitting 3 minutes for project's addons to Running
✔ project-deployment start project's addons success
[INFO] Begin to start project's runtimes for runtime IDs:[186]
✔ project-deployment start project's runtimes success
```

:::tip 提示
* Addon 和 Runtime 的停止有顺序依赖，优先停止 Runtime，并等待一分钟确保 Runtime 对应的 Pod 均已删除，随后停止 Addon。该执行过程可在命令执行输出中查看处理顺序。
* 目前不支持启动 6.8.9 和 6.8.22 版本以上的 Elasticsearch 的 Addon。

:::
