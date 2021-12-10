# Erda CLI 命令

## 命令说明

### 全局参数

`--interactive` 布尔类型，指定 CLI 是否采用交互式，默认值为 `true`。

`--remote` 字符串类型，指定 CLI 用于获取 Erda 代码仓库的 remote 名称，默认值 `origin`。在未指定 Erda 地址的情况下，如果 CLI 的工作目录是 Erda 应用的代码仓库，则会根据 remote 名称获取 git 地址并解析出组织（org）、项目（project）、应用（application） 信息。

`--host` 字符串类型，指定 CLI 访问的 Erda 地址。CLI 本质上是访问了 Erda 的 openapi 地址，所有如果设置的是 https://erda.cloud，CLI 会转换成访问 https://openapi.erda.cloud。

全部参数说明如下：

```shell
Global Flags:
      --host string       Erda host to visit (e.g. https://erda.cloud)
      --interactive       if true, interactive with user (default true)
  -p, --password string   Erda password to authenticate
  -r, --remote string     the remote for Erda repo (default "origin")
  -u, --username string   Erda username to authenticate
  -V, --verbose           if true, enable verbose mode
```

### 分页展示



### 使用管道



## 命令详情

### erda-cli addon

### erda-cli addon create

### erda-cli addon delete

### erda-cli addon inspect

### erda-cli application create

### erda-cli application delete

### erda-cli application inspect

### erda-cli application member

### erda-cli application open

### erda-cli config

您可以通过 `config ` 命令获取当前配置文件内容。

```shell
$ erda-cli config
version: "1.0"
platforms:
    - name: erda
      server: https://openapi.erda.cloud
      org_info:
        id: 100046
        name: trial
        desc: 客户试用 Trial
contexts:
    - name: erda
      platform_name: erda
current_context: erda
```

### erda-cli config current-context

您可以通过 `config current-context` 命令获取当前上下文。

```shell
$ erda-cli config current-context
erda
```

参数说明如下：

```
Flags:
  -h, --help         help for current-context
      --no-headers   if true, don't print headers (default print headers)
```

### erda-cli config delete-context

### erda-cli config delete-platform

### erda-cli config get-contexts

您可以通过 `config get-contexts` 命令列出上下文

```shell
$ erda-cli config get-contexts
CURRENT   NAME   PLATFORM
*         erda   erda
```

参数说明如下：

```shell
Flags:
  -h, --help         help for current-context
      --no-headers   if true, don't print headers (default print headers)
```

### erda-cli config get-platforms

您可以通过 `config get-platforms` 命令列出平台信息。

```shell
$ erda-cli config get-platforms
NAME   SERVER                       ORGINFO(ID/NAME/DESC)
erda   https://openapi.erda.cloud   100046/trial/客户试用 Trial
```

参数说明如下：

```shell
Flags:
  -h, --help         help for current-context
      --no-headers   if true, don't print headers (default print headers)
```

### erda-cli config set-context

您可以通过 `config set-context` 命令设置上下文信息。

```shell
$ erda-cli config set-context erda --platform=erda
✔ Context "erda" set.
```

参数说明如下：

```shell
Flags:
  -h, --help              help for set-context
      --platform string   the name of platform
```

### erda-cli config set-platform

您可以通过 `config set-platform` 命令设置平台信息。

```shell
$ erda-cli config set-platform erda --server=https://openapi.erda.cloud --org=trial
✔ Platform "erda" set.
```

参数说明如下：

```shell
Flags:
  -h, --help            help for set-platform
      --org string      an org under the platform
      --server string   the http endpoint for openapi of platform (default "https://openapi.erda.cloud")
```

### erda-cli config use-context

您可以通过 `config use-context` 命令使用上下文。

```shell
$ erda-cli config use-context erda
✔ Use context "erda".
```

### erda-cli erda

您可以通过 `erda` 命令列出本地代码仓库中的 erda.yml 文件。

```shell
$ erda-cli erda
BRANCH   ERDAYML
master   /tmp/example/.erda/erda.yml
```

参数说明如下：

```shell
Flags:
  -h, --help         help for erda
      --no-headers   if true, don't print headers (default print headers)
```

### erda-cli erda init

您可以通过 `erda init` 命令初始化 erda.yml 文件。

```shell
$ erda-cli erda init
✔ Init .erda/erda.yml success.
```

::: warning 警告

当前该命令仅支持对基于 spring boot 框架的单体应用生成 erda.yml 文件

::: 

参数说明如下：

```
Flags:
  -c, --cpu float    the quota of CPU for service (default 0.5)
  -h, --help         help for init
  -m, --memory int   the quota of Memory for service (default 1024)
```

### erda-cli erda check

您可以使用 `erda check` 命令检查 erda.yml 的格式，如果有异常会显示错误信息。

```shell
$ erda-cli erda check
✔ Check /tmp/example/.erda/erda.yml OK.
```

参数说明如下：

```shell
Flags:
  -f, --file string   specify the path of erda.yml file, default: .erda/erda.yml
  -h, --help          help for check
```

### erda-cli erda parse

您可以使用 `erda parse` 命令解析 erda.yml。

```shell
$ erda-cli erda parse --test
environments:
  development: null
  production: null
  staging: null
  test: null
meta: null
services:
  docker-java-app-example:
    cmd: ""
    deployments:
      policies: shuffle
      replicas: 1
    health_check:
      exec: {}
      http: {}
    image: ""
    image_password: ""
    image_username: ""
    ports:
    - port: 8080
    resources:
      cpu: 0.5
      disk: 0
      max_cpu: 0
      max_mem: 0
      mem: 1024
      network:
        mode: container
    traffic_security: {}
version: "2.0"
```

 参数说明如下：

```
Flags:
      --dev             if true, parse the erda.yml file in development environment
  -f, --file string     specify the path of erda.yml file, default: .erda/erda.yml
  -h, --help            help for parse
  -o, --output string   output format, one of yaml|json (default "yaml")
      --prod            if true, parse the erda.yml in production environment
      --staging         if true, parse the erda.yml file in staging environment
  -s, --str string      provide the content of erda.yml as a string
      --test            if true, parse the erda.yml file in test environment
```

### erda-cli ext

您可以通过 `ext` 命令罗列 Erda 上所有的 Extension。

```shell
erda-cli ext --host=https://erda.cloud -u 'YourName' -p 'YourPassword'
ID                            TYPE     CATEGORY                  PUBLIC   UPDATED_AT
canal                         addon    database                  true     2021-11-18 01:12:56
consul                        addon    distributed_cooperation   true     2021-11-18 01:12:56
terminus-elasticsearch        addon    search                    true     2021-11-18 01:13:17
kafka                         addon    message                   true     2021-11-18 01:12:57
```

### erda-cli ext pull

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

### erda-cli ext push

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

### erda-cli migrate

您可以通过 `migrate` 命令管理 MySQL 数据库中的数据变更。

```shell
$ erda-cli migrate -h
erda-cli migrate --mysql-host localhost --mysql-username root --mysql-password my_password --database erda

Usage:
  erda-cli migrate  [flags]
  erda-cli migrate [command]

Examples:
erda-cli migrate --mysql-host localhost --mysql-username root --mysql-password my_password --database erda

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
```

### erda-cli org

您可以使用 `erda-cli org` 命令列车自己所在的所有组织。

```shell
$ erda-cli org
ORGID    NAME         DESCRIPTION
100060   erda         Erda 开源组织
100046   trial        Trial 企业
```

 参数说明如下：

```shell
Flags:
  -h, --help            help for org
      --no-headers      if true, don't print headers (default print headers)
      --page-size int   the number of page size (default 10)
```

### erda-cli org inspect

您可以使用 `erda-cli org inspect` 命令查看一个组织的详细信息（json 格式）。 

```shell
$ erda-cli org inspect --org=trial
{
  "auditMessage": {
    "messageEN": "",
    "messageZH": ""
  },
  "blockoutConfig": {
    "blockDev": false,
    "blockProd": false,
    "blockStage": false,
    "blockTest": false
  },
  "config": {
    "auditInterval": 0,
    "enableMS": false,
    "enablePersonalMessageEmail": false,
    "smsKeyID": "",
    "smsKeySecret": "",
    "smsMonitorTemplateCode": "",
    "smsSignName": "",
    "smtpHost": "",
    "smtpIsSSL": false,
    "smtpPassword": "",
    "smtpPort": 0,
    "smtpUser": "",
    "vmsKeyID": "",
    "vmsKeySecret": "",
    "vmsMonitorCalledShowNumber": "",
    "vmsMonitorTtsCode": ""
  },
  "createdAt": "2019-11-07T19:08:37+08:00",
  "creator": "55",
  "desc": "客户试用 Trial 企业",
  "displayName": "试用",
  "domain": "erda.cloud",
  "enableReleaseCrossCluster": false,
  "id": 100046,
  "isPublic": false,
  "locale": "zh-CN",
  "logo": "",
  "name": "trial",
  "openFdp": true,
  "operation": "",
  "publisherId": 0,
  "selected": false,
  "status": "",
  "type": "ENTERPRISE",
  "updatedAt": "2020-08-13T10:35:35+08:00",
  "version": 0
}
```

 参数说明如下：

 ```shell
 Flags:
   -h, --help          help for inspect
       --org string    the name of an organization
       --org-id uint   the id of an organization
 ```

### erda-cli org member

您可以使用 `erda-cli org member` 命令列出该组织下的成员。

```shell
$ erda-cli org member
NICK        NAME             EMAIL                      MOBILE        ROLES
徐峰        136-706166651    x*f@highzap.com            139****9258   Dev
徐伟        13-32924571      xw2****8@alibaba-inc.com   158****2501   Manager
巫昌宏      巫昌宏           *@b.com                    189****3839   Dev
yk-leex     1761078643628    <nil>                      176****6900   Dev
五月        126924566938     <nil>                      156****2300   Dev
leo         17436902426      mab******4@gmail.com       <nil>         Dev
Cai         792109634082     <nil>                      177****4463   Dev
勿忘心安~   1371174656027    <nil>                      178****6113   Dev
rlag        186-1484399479   <nil>                      138****9691   Dev
<nil>       1551662291413    <nil>                      178****3836   Dev
```

 参数说明如下：

```shell
Flags:
  -h, --help            help for member
      --no-headers      if true, don't print headers (default print headers)
      --org string      the name of an organization
      --org-id uint     the id of an organization
      --page-size int   the number of page size (default 10)
      --roles strings   roles to list
```

### erda-cli org open

您可以使用 `erda-cli org open` 命令在浏览器中打开组织的 Erda 页面。 

```shell
$ erda-cli org open --org=trial
✔ Open trial in browser.
```

 参数说明如下：

```shell
Flags:
  -h, --help          help for open
      --org string    the name of an organization
      --org-id uint   the id of an organization
```

### erda-cli org switch

您可以使用 `erda-cli org switch` 命令切换 CLI 运行上下文中的当前组织。

```
$ erda-cli org switch terminus
  Before : trial          (100046)
✔ Current: terminus       (2)
```

注意，切换成功会同时持久化在 ~/.erda.d/config 配置文件中，此后如果不指定组织（org）参数，默认都会使用该组织。 

### erda-cli pipeline

### erda-cli pipeline init

### erda-cli pipeline check

### erda-cli pipeline run

### erda-cli pipeline status

### erda-cli project

您可以使用 `erda-cli org project` 命令列出您所参与的项目。

```shell
$ erda-cli project
PROJECTID   NAME                         DISPLAYNAME             DESCRIPTION
420         gaia-app-mix                 Gaia-App-mix            项目描述：BBC & OMS 融合功能验证，及 BBC 的压测环境；
385         gaia-app                     Gaia-App-Source         项目描述：Gaia应用
327         99RanchMarket                美*大*                <nil>
841         terminus-shejijiaohuyouhua   Terminus_设计交互优化   <nil>
241         T-Product                    Gaia                    Gaia 新商业软件套件
615         gaia-app-store               Gaia-App-Store          项目描述：谢顿四期的产品研发
56          Ragnarok                     Dice回归测试            erda 回归测试
190         T-Project                    Trantor                 <nil>
393         ysmy-digital                 源**语数字化项目      项目负责人：张* / *旭
388         gaia-app-runtime             Gaia-App-Oms            负责人：孙*
```

 参数说明如下：

```shell
Flags:
  -h, --help            help for project
      --no-headers      if true, don't print headers (default print headers)
      --org string      the name of an organization
      --org-id uint     the id of an organization
      --page-size int   the number of page size (default 10)
```

### erda-cli project clear

您可以通过 `project clear` 命令清理项目。

```shell
$ erda-cli project clear --project-id=599
✔ Project clear success.
```

默认情况下 `project clear` 仅删除项目中的 runtimes 和 Erda 启动的 addons。可以通过指定 `--delete-custom-addons=true` 删除第三方 addons。可以通过指定 `--delete-apps=true` 删除所有的应用。

参数说明如下：

```shell
Flags:
      --delete-apps            if true, delete all applications
      --delete-custom-addons   if true, delete all custom addons
  -h, --help                   help for clear
      --org string             the name of an organization
      --org-id uint            the id of an organization
      --project string         the name of a project
      --project-id uint        the id of a project
      --wait-addon int         minutes to wait addons deleted (default 3)
      --wait-runtime int       minutes to wait runtimes deleted (default 3)
      --workspace string       the env workspace of a project, if set only clear runtimes and addons in the specific workspace
```

### erda-cli project delete

### erda-cli project inspect

您可以通过 `project inspect` 命令查看项目详情。

```shell
$ erda-cli project inspect --project=bestpractice
{
  "CanManage": false,
  "activeTime": "2021-12-10 18:11:02",
  "blockStatus": "",
  "canUnblock": null,
  "clusterConfig": {
    "DEV": "terminus-captain",
    "PROD": "terminus-captain",
    "STAGING": "terminus-captain",
    "TEST": "terminus-captain"
  },
  "cpuAddonUsed": 0,
  "cpuQuota": 6,
  "cpuServiceUsed": 0,
  "createdAt": "2021-08-13T13:45:30+08:00",
  "creator": "19",
  "ddHook": "",
  "desc": "最佳实践项目",
  "displayName": "bestpractice",
  "id": 599,
  "isPublic": false,
  "joined": true,
  "logo": "",
  "memAddonUsed": 0,
  "memQuota": 16,
  "memServiceUsed": 0,
  "name": "bestpractice",
  "orgId": 100046,
  "owners": [
    "19"
  ],
  "resourceConfig": {
    "DEV": {
      "clusterName": "terminus-captain",
      "cpuAvailable": 248.12900000000008,
      "cpuQuota": 2,
      "cpuRequest": 0,
      "cpuRequestByAddon": 0,
      "cpuRequestByAddonRate": 0,
      "cpuRequestByService": 0,
      "cpuRequestByServiceRate": 0,
      "cpuRequestRate": 0,
      "memAvailable": 937.8409999999999,
      "memQuota": 8,
      "memRequest": 0,
      "memRequestByAddon": 0,
      "memRequestByAddonRate": 0,
      "memRequestByService": 0,
      "memRequestByServiceRate": 0,
      "memRequestRate": 0,
      "tips": ""
    },
    "PROD": {
      "clusterName": "terminus-captain",
      "cpuAvailable": 108.66,
      "cpuQuota": 2,
      "cpuRequest": 0,
      "cpuRequestByAddon": 0,
      "cpuRequestByAddonRate": 0,
      "cpuRequestByService": 0,
      "cpuRequestByServiceRate": 0,
      "cpuRequestRate": 0,
      "memAvailable": 340.111,
      "memQuota": 4,
      "memRequest": 0,
      "memRequestByAddon": 0,
      "memRequestByAddonRate": 0,
      "memRequestByService": 0,
      "memRequestByServiceRate": 0,
      "memRequestRate": 0,
      "tips": ""
    },
    "STAGING": {
      "clusterName": "terminus-captain",
      "cpuAvailable": 111.08999999999999,
      "cpuQuota": 2,
      "cpuRequest": 0,
      "cpuRequestByAddon": 0,
      "cpuRequestByAddonRate": 0,
      "cpuRequestByService": 0,
      "cpuRequestByServiceRate": 0,
      "cpuRequestRate": 0,
      "memAvailable": 365.2179999999999,
      "memQuota": 4,
      "memRequest": 0,
      "memRequestByAddon": 0,
      "memRequestByAddonRate": 0,
      "memRequestByService": 0,
      "memRequestByServiceRate": 0,
      "memRequestRate": 0,
      "tips": ""
    },
    "TEST": {
      "clusterName": "terminus-captain",
      "cpuAvailable": 251.36900000000009,
      "cpuQuota": 0,
      "cpuRequest": 0,
      "cpuRequestByAddon": 0,
      "cpuRequestByAddonRate": 0,
      "cpuRequestByService": 0,
      "cpuRequestByServiceRate": 0,
      "cpuRequestRate": 0,
      "memAvailable": 940.2189999999998,
      "memQuota": 0,
      "memRequest": 0,
      "memRequestByAddon": 0,
      "memRequestByAddonRate": 0,
      "memRequestByService": 0,
      "memRequestByServiceRate": 0,
      "memRequestRate": 0,
      "tips": ""
    }
  },
  "rollbackConfig": {
    "DEV": 5,
    "PROD": 5,
    "STAGING": 5,
    "TEST": 5
  },
  "stats": {
    "countApplications": 7,
    "countMembers": 0,
    "doneBugCount": 0,
    "doneBugPercent": 0,
    "planningIterationsCount": 0,
    "planningManHourCount": 0,
    "runningIterationsCount": 0,
    "totalApplicationsCount": 0,
    "totalBugCount": 0,
    "totalIterationsCount": 0,
    "totalManHourCount": 0,
    "totalMembersCount": 0,
    "usedManHourCount": 0
  },
  "type": "",
  "updatedAt": "2021-12-10T18:11:02+08:00"
}
```

 参数说明如下：

```shell
Flags:
  -h, --help              help for inspect
      --org string        the name of an organization
      --org-id uint       the id of an organization
      --project string    the name of a project
      --project-id uint   the id of a project
```



### erda-cli project load



### erda-cli project member

您可以通过 `` 列出项目中的成员。

```shell
$ erda-cli project member --project=bestpractice
NICK      NAME            EMAIL                          MOBILE        ROLES
陈忠润    u931393614340   zho********r@alibaba-inc.com   159****5411   Lead
刘浩杨    terminus10370   lhy*****4@alibaba-inc.com      185****5501   Lead
陈建锋    jferic          che**f@terminus.io             186****9827   Owner
Support   support         <nil>                          <nil>         Lead
```

 参数说明如下：

```shell
Flags:
  -h, --help              help for member
      --no-headers        if true, don't print headers (default print headers)
      --org string        the name of an organization
      --org-id uint       the id of an organization
      --page-size int     the number of page size (default 10)
      --project string    the name of a project
      --project-id uint   the id of a project
      --roles strings     roles to list
```

### erda-cli project open

```shell
$ erda-cli project open --project=bestpractice
✔ Open bestpractice in browser.
```

 参数说明如下：

```shell
Flags:
  -h, --help              help for open
      --org string        the name of an organization
      --org-id uint       the id of an organization
      --project string    the name of a project
      --project-id uint   the id of a project
```

### erda-cli release

### erda-cli release inspect

### erda-cli release open

### erda-cli service

### erda-cli version

获取 erda-cli 的版本信息：

```shell
$ erda-cli version
Version: 1.4
BuildTime: 2021-11-17 01:01:59
GoVersion: go version go1.15.15 linux/amd64
CommitID: 02583bd49fc57841bdcb05b02486e27dd868cf00
DockerImage:
```
