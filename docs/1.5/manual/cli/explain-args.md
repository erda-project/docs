# CLI 命令

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

如果总的条目数量超过单页展示的个数，交互模式下会在终端上提示分页，根据用户输入决定是否继续展示。下面是列出 bestpractice 项目中的应用，分页交互的示例：

```shell
$ erda-cli application --page-size=2 --project=bestpractice
APPLICATIONID   NAME      DISPLAYNAME   DESCRIPTION
8307            example   example       <nil>
8104            z         z             <nil>
Continue to display applications?[Y/N]Y
APPLICATIONID   NAME        DISPLAYNAME   DESCRIPTION
8057            bpipeline   bpipeline     项目级应用
7823            y           y             <nil>
Continue to display applications?[Y/N]N
```

### 使用管道

使用管道 "|" 可以将多个命令串联起来完成较复杂的任务。

默认情况下 erda-cli 是交互式，例如会展示一些过程提示信息、分页交互等等。可以通过 `--interactive=false` 参数来指定 erda-cli 使用非交互式命令，进而运用于管道。例如，下面是一些示例：

```shell
$ erda-cli application --project=bestpractice --interactive=false --no-headers | wc -l
       7
       
$ erda-cli application --project=bestpractice --interactive=false --no-headers | awk '{print $1}'
8307
8104
8057
7823
7815
7097
7083

$ erda-cli application --project=bestpractice --interactive=false --no-headers | awk '{print $1}' | xargs -I {} erda-cli application open --application-id={} --project=bestpractice
✔ Open application in browser.
✔ Open application in browser.
✔ Open application in browser.
✔ Open application in browser.
✔ Open application in browser.
✔ Open application in browser.
✔ Open application in browser.
```

## 命令详情

### erda-cli addon

您可以通过 `addon ` 命令列出项目中的 `addons`。

```shell
$ erda-cli addon --project=bestpractice
ADDONID                             NAME       ADDONNAME        ENV       REFERENCE   DISPLAYNAME
j5116d5167695468abaa43e9d2d77bd30   redis      redis            STAGING   2           Redis
j618a1adaf8414d18aad8367c8ba76afa   应用监控    monitor          STAGING   2           应用监控
sdf3a1e70893e408eba26d382eb5a4dd5   注册中心    registercenter   STAGING   1           注册中心
```

可以通过 `--workspace` 参数筛选环境。

参数说明如下：

```shell
Flags:
  -h, --help               help for addon
      --no-headers         if true, don't print headers (default print headers)
      --org string         the name of an organization
      --org-id uint        the id of an organization
      --project string     the name of a project
      --project-id uint    the id of a project
      --workspace string   the env workspace
```

### erda-cli addon create

您可以通过 `addon create ` 命令创建  `addon` 。

```shell
$ erda-cli addon create --name myredis --addon-type=erda --addon-name=redis --plan=redis:basic --workspace=DEV --project=bestpractice
✔ Addon created.

$ erda-cli addon create --name mykeyvalue --addon-type=custom --workspace=DEV --configs='MYURL=http://example.com,MYUSER=user,MYPASSWORD=pwd' --project=bestpractice
✔ Addon created.
```

通过 `--addon-type` 参数声明 addon 的类型，"erda" 表示此 addon 由 Erda 平台创建， "custom" 表示此 addon 为三方服务，Erda 平台上只管理其配置信息。

通过 `--addon-name` 参数声明 custom 类型的 addon 的名称，可选的名称包括 "mysql"，"redis"，"consul"，"canal"，"kafka"，"rabbitmq"，"rocketmq"，"terminus-elasticsearch"，"terminus-zookeeper"。

通过 `--plan` 参数声明 erda 类型的 addon 的规格，具体可以参考[文档](https://www.erda.cloud/market/addon)。

通过 `--configs` 参数声明 custom 类型 addon 的键值对配置。

参数说明如下：

```shell
Flags:
      --addon-name string   the name of the addon (default "custom")
      --addon-type string   the type of the addon, one of [erda|custom] (default "custom")
      --configs string      the configs of the addon instance in format of key/value. (e.g. --configs='key1=value1,key2=value2')
  -h, --help                help for create
      --name string         the name of the addon instance
      --org string          the name of an organization
      --org-id uint         the id of an organization
      --plan string         the plan of the addon instance
      --project string      the name of a project
      --project-id uint     the id of a project
      --wait-minutes int    the minutes to wait erad addon create (default 3)
      --workspace string    the env workspace of an addon
```

### erda-cli addon delete

您可以通过 `addon delete ` 命令删除  `addon` 。

```shell
$ erda-cli addon delete --addon-id=e6359f44f7e6b4260bca22ac4a5a7cb21
✔ Addon deleted.
```

参数说明如下：

```shell
Flags:
      --addon-id string   the id of an addon
  -h, --help              help for delete
      --org string        the name of an organization
      --org-id uint       the id of an organization
```

### erda-cli addon inspect

您可以通过 `addon inspect ` 命令查看 `addon` 的信息。

```shell
$ erda-cli addon inspect --addon-id=j5116d5167695468abaa43e9d2d77bd30
{
  "addonName": "redis",
  "attachCount": 2,
  "canDel": true,
  "category": "database",
  "cluster": "terminus-captain",
  "config": {
    "REDIS_HOST": "redis.addon-redis--yec0e99630b7f48bb90800e567a423795.svc.cluster.local",
    "REDIS_PASSWORD": "y**5oXPprgLsuk2",
    "REDIS_PORT": "6379"
  },
  "consoleUrl": "",
  "createdAt": "2021-12-17T11:47:32+08:00",
  "customAddonType": "",
  "desc": "Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。",
  "displayName": "Redis",
  "instanceId": "j5116d5167695468abaa43e9d2d77bd30",
  "logoUrl": "//terminus-dice.oss-cn-hangzhou.aliyuncs.com/addon/ui/icon/redis.png",
  "name": "redis",
  "orgId": 100046,
  "plan": "basic",
  "platform": false,
  "platformServiceType": 0,
  "projectId": 599,
  "projectName": "bestpractice",
  "realInstanceId": "yec0e99630b7f48bb90800e567a423795",
  "recordId": 0,
  "reference": 2,
  "shareScope": "PROJECT",
  "status": "ATTACHED",
  "tag": "",
  "tenantOwner": "",
  "updatedAt": "2021-12-20T02:03:35+08:00",
  "version": "3.2.12",
  "workspace": "STAGING"
}
```

参数说明如下：

```shell
Flags:
      --addon-id string   the id of an addon
  -h, --help              help for inspect
      --org string        the name of an organization
      --org-id uint       the id of an organization
```

### erda-cli application

您可以通过 `application ` 命令列出项目中的应用。

```shell
$ erda-cli application --project=bestpractice
APPLICATIONID   NAME           DISPLAYNAME    DESCRIPTION
7097            echo-service   echo-service   <nil>
7083            echo-web       echo-web       web server supplies apis
```

参数说明如下：

```shell
Flags:
  -h, --help              help for application
      --no-headers        if true, don't print headers (default print headers)
      --org string        the name of an organization
      --org-id uint       the id of an organization
      --page-size int     the number of page size (default 10)
      --project string    the name of a project
      --project-id uint   the id of a project
      --with-owner        if true, return owners of projects
```

### erda-cli application create

您可以通过 `application create`  命令创建应用。

```shell
$ erda-cli application create --project-id=599 -n example
✔ Application created.
{
  "blockStatus": "",
  "config": null,
  "createdAt": "2021-12-20T10:12:08.464183125+08:00",
  "creator": "19",
  "desc": "",
  "displayName": "example",
  "gitRepo": "https://gittar.erda.cloud/trial-bestpractice/example",
  "gitRepoAbbrev": "trial-bestpractice/example",
  "gitRepoNew": "erda.cloud/trial/dop/bestpractice/example",
  "id": 8307,
  "isExternalRepo": false,
  "isPublic": false,
  "logo": "",
  "memberRoles": null,
  "mode": "SERVICE",
  "name": "example",
  "orgDisplayName": "试用",
  "orgId": 100046,
  "orgName": "trial",
  "pined": false,
  "projectDisplayName": "",
  "projectId": 599,
  "projectName": "bestpractice",
  "repoConfig": {
    "desc": "",
    "password": "",
    "type": "",
    "url": "",
    "username": ""
  },
  "stats": {
    "countMembers": 0,
    "countRuntimes": 0,
    "timeLastModified": ""
  },
  "token": "",
  "unBlockEnd": null,
  "unBlockStart": null,
  "updatedAt": "2021-12-20T10:12:08.601133058+08:00",
  "workspaces": [
    {
      "clusterName": "",
      "configNamespace": "app-8307-DEFAULT",
      "workspace": "DEFAULT"
    },
    {
      "clusterName": "terminus-captain",
      "configNamespace": "app-8307-DEV",
      "workspace": "DEV"
    },
    {
      "clusterName": "terminus-captain",
      "configNamespace": "app-8307-PROD",
      "workspace": "PROD"
    },
    {
      "clusterName": "terminus-captain",
      "configNamespace": "app-8307-STAGING",
      "workspace": "STAGING"
    },
    {
      "clusterName": "terminus-captain",
      "configNamespace": "app-8307-TEST",
      "workspace": "TEST"
    }
  ]
}
```

Erda 有多种类型的应用：

* LIBRARY
* SERVICE
* BIGDATA
* PROJECT_SERVICE

可以通过 `--mode` 指定应用类型，不指定默认是 SERVICE。

参数说明如下：

```shell
Flags:
  -d, --description string   description of the application
  -h, --help                 help for create
  -m, --mode string          application type, available values：LIBRARY, SERVICE, BIGDATA, PROJECT_SERVICE (default "SERVICE")
  -n, --name string          the name of an application
      --project-id uint      the id of a project
```

### erda-cli application delete

您可以通过 `application delete`  命令删除应用。

```shell
$ erda-cli application delete --application-id=8150
✔ Application deleted.
```

参数说明如下：

```shell
Flags:
      --application-id uint   the id of an application
  -h, --help                  help for delete
```

### erda-cli application inspect

您可以通过 `application inspect`  命令查询应用信息。

```shell
$ erda-cli application inspect --application=example --project=bestpractice
{
  "blockStatus": "",
  "config": null,
  "createdAt": "2021-12-20T10:12:08+08:00",
  "creator": "19",
  "desc": "",
  "displayName": "example",
  "gitRepo": "https://gittar.erda.cloud/trial-bestpractice/example",
  "gitRepoAbbrev": "trial-bestpractice/example",
  "gitRepoNew": "erda.cloud/trial/dop/bestpractice/example",
  "id": 8307,
  "isExternalRepo": false,
  "isPublic": false,
  "logo": "",
  "memberRoles": null,
  "mode": "SERVICE",
  "name": "example",
  "orgDisplayName": "试用",
  "orgId": 100046,
  "orgName": "trial",
  "pined": false,
  "projectDisplayName": "",
  "projectId": 599,
  "projectName": "bestpractice",
  "repoConfig": {
    "desc": "",
    "password": "",
    "type": "",
    "url": "",
    "username": ""
  },
  "stats": {
    "countMembers": 0,
    "countRuntimes": 0,
    "timeLastModified": ""
  },
  "token": "1cbb0c48231e4dc2b51c67d7e465a3b7",
  "unBlockEnd": null,
  "unBlockStart": null,
  "updatedAt": "2021-12-20T10:12:09+08:00",
  "workspaces": [
    {
      "clusterName": "",
      "configNamespace": "app-8307-DEFAULT",
      "workspace": "DEFAULT"
    },
    {
      "clusterName": "terminus-captain",
      "configNamespace": "app-8307-DEV",
      "workspace": "DEV"
    },
    {
      "clusterName": "terminus-captain",
      "configNamespace": "app-8307-PROD",
      "workspace": "PROD"
    },
    {
      "clusterName": "terminus-captain",
      "configNamespace": "app-8307-STAGING",
      "workspace": "STAGING"
    },
    {
      "clusterName": "terminus-captain",
      "configNamespace": "app-8307-TEST",
      "workspace": "TEST"
    }
  ]
}
```

可以通过 `--only-repo=true` 参数仅展示代码仓库地址。

参数说明如下：

```shell
Flags:
      --application string    the name of an application
      --application-id uint   the id of an application
  -h, --help                  help for inspect
      --only-repo             If true, only show git repo url
      --org string            the name of an organization
      --org-id uint           the id of an organization
      --project string        the name of a project
      --project-id uint       the id of a project
```

### erda-cli application member

您可以通过 `application member ` 命令列出应用中的成员。

```shell
$ erda-cli application member --project=bestpractice --application=example
NICK     NAME     EMAIL                MOBILE        ROLES
陈**     jferic   che**f@terminus.io   186****9827   Owner
```

可以通过 `--roles` 过滤成员的角色。

参数说明如下：

```shell
Flags:
      --application string    the name of an application
      --application-id uint   the id of an application
  -h, --help                  help for member
      --no-headers            if true, don't print headers (default print headers)
      --org string            the name of an organization
      --org-id uint           the id of an organization
      --page-size int         the number of page size (default 10)
      --project string        the name of a project
      --project-id uint       the id of a project
      --roles strings         roles to list
```

### erda-cli application open

您可以通过 `application open ` 命令用浏览器打开应用页面。

```shell
$ erda-cli application open --project=bestpractice --application=example
✔ Open application in browser.
```

参数说明如下：

```shell
Flags:
      --application string    the name of an application
      --application-id uint   the id of an application
  -h, --help                  help for open
      --org string            the name of an organization
      --org-id uint           the id of an organization
      --project string        the name of a project
      --project-id uint       the id of a project
```

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

您可以通过 `config delete-context` 命令删除配置文件中的上下文。

```shell
$ erda-cli config delete-context erda
✔ Deleted context "erda".
```

### erda-cli config delete-platform

您可以通过 `config delete-platform` 命令删除配置文件中的平台。

```shell
$ erda-cli config delete-platform erda
✔ Deleted platform "erda".
```

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

当前该命令仅支持对基于 spring boot 框架的单体应用生成 erda.yml 文件。

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

您可以使用 `org inspect` 命令查看一个组织的详细信息（json 格式）。 

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

您可以使用 `org member` 命令列出该组织下的成员。

```shell
$ erda-cli org member
NICK        NAME             EMAIL                      MOBILE        ROLES
徐*         136-706166651    x*f@highzap.com            139****9258   Dev
徐*         13-32924571      xw2****8@alibaba-inc.com   158****2501   Manager
巫*宏       巫*宏             *@b.com                    189****3839   Dev
yk-leex     1761078643628    <nil>                      176****6900   Dev
五*         126924566938     <nil>                      156****2300   Dev
leo         17436902426      mab******4@gmail.com       <nil>         Dev
Cai         792109634082     <nil>                      177****4463   Dev
勿忘心安~    1371174656027    <nil>                      178****6113   Dev
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

您可以使用 `org open` 命令在浏览器中打开组织的 Erda 页面。 

```shell
$ erda-cli org open --org=trial
✔ Open organization in browser.
```

 参数说明如下：

```shell
Flags:
  -h, --help          help for open
      --org string    the name of an organization
      --org-id uint   the id of an organization
```

### erda-cli org switch

您可以使用 `org switch` 命令切换 CLI 运行上下文中的当前组织。

```shell
$ erda-cli org switch terminus
  Before : trial          (100046)
✔ Current: terminus       (2)
```

注意，切换成功会同时持久化在 ~/.erda.d/config 配置文件中，此后如果不指定组织（org）参数，默认都会使用该组织。 

### erda-cli pipeline

您可以使用 `pipeline` 命令列出当前代码仓库中的 pipeline.yml 配置文件。

```shell
$ erda-cli pipeline
BRANCH   PIPELINE
master   .dice/pipeline.yml
```

 参数说明如下：

```shell
Flags:
  -h, --help         help for pipeline
      --no-headers   if true, don't print headers (default print headers)
```

### erda-cli pipeline init

您可以使用 `pipeline init` 命令初始化应用生成 pipeline.yml 流水线配置文件。

```shell
$ erda-cli pipeline init
✔ Init .dice/pipelines/pipeline.yml success.
```

::: warning 警告

当前该命令仅支持对基于 spring boot 框架的单体应用生成 pipeline.yml 文件，并且要求存在标准的 .erda/erda.yml 配置文件。

::: 

 参数说明如下：

```shell
Flags:
  -f, --filename string   specify the path of pipeline.yml file, default: .dice/pipelines/pipeline.yml
  -h, --help              help for init
```

### erda-cli pipeline check

您可以使用 `pipeline check` 命令检查 pipeline.yml 文件格式是否正确。

```shell
$ erda-cli pipeline check
✔  .dice/pipelines/pipeline.yml ok!
```

 参数说明如下：

```shell
Flags:
  -f, --file string   specify the path of pipeline.yml file (default ".dice/pipelines/pipeline.yml")
  -h, --help          help for check
```

### erda-cli pipeline run

您可以使用 `pipeline run` 命令在 Erda 平台上运行流水线。

```shell
$ erda-cli pipeline run --remote=erda
✔ run pipeline: .dice/pipelines/pipeline.yml for branch: master, pipelineID: 12918029, you can view building status via `erda-cli pipeline view -i 12918029`
```

 ::: warning 警告

运行流水线会检查当前代码工作目录是否已经提交，如果未提交会执行失败。

:::

参数说明如下：

```shell
Flags:
      --branch string     branch to create pipeline, default is current branch
  -f, --filename string   filename for 'pipeline.yml' (default ".dice/pipelines/pipeline.yml")
  -h, --help              help for run
```

### erda-cli pipeline view

您可以使用 `pipeline view` 命令查看流水线的执行情况

```shell
$ erda-cli pipeline view --remote=erda --watch=true -i 12918029
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

Pipeline Metadata
- git-checkout:
    author: jferic
    author_date: 2021-12-20 14:45:29 +0800
    branch: master
    commit: 2586d27968e0bf5866afe569b1da71b503a2e011
    committer: jferic
    committer_date: 2021-12-20 14:45:29 +0800
    message: |
        init app
- java:
    image: addon-registry.default.svc.cluster.local:5000/trial-bestpractice/example:java-1639986403473496906
- release:
    releaseID: b5738c7547d646ab85e16d24c02c6aaa
- dice:
    appID: "8307"
    deploymentID: "287875"
    operatorID: "19"
    projectID: "599"
    runtimeID: "15417"
see more at https://erda.cloud/trial/dop/projects/599/apps/8307/pipeline?nodeId=NTk5LzgzMDcvdHJlZS9tYXN0ZXIvODMwNy9QUk9EL21hc3Rlci8uZGljZS9waXBlbGluZXMvcGlwZWxpbmUueW1s&pipelineID=12918029
```

 参数说明如下：

```shell
Flags:
  -b, --branch string     specify branch to show pipeline status, default is current branch
  -h, --help              help for view
  -i, --pipelineID uint   specify pipeline id to show pipeline status
  -w, --watch             watch the status
```

### erda-cli project

您可以使用 `org project` 命令列出您所参与的项目。

```shell
$ erda-cli project
PROJECTID   NAME                         DISPLAYNAME             DESCRIPTION
420         gaia-app-mix                 Gaia-App-mix            项目描述：BBC & OMS 融合功能验证，及 BBC 的压测环境；
385         gaia-app                     Gaia-App-Source         项目描述：Gaia应用
327         99RanchMarket                美*大华                  <nil>
841         terminus-shejijiaohuyouhua   Terminus_设计交互优化     <nil>
241         T-Product                    Gaia                    Gaia 新商业软件套件
615         gaia-app-store               Gaia-App-Store          项目描述：谢顿四期的产品研发
56          Ragnarok                     Dice回归测试             erda 回归测试
190         T-Project                    Trantor                 <nil>
393         ysmy-digital                 源*语数字化项目           项目负责人：张* / *旭
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
      --with-owner      if true, return owners of projects
```

### erda-cli project clear

您可以通过 `project clear` 命令清理项目。默认情况下 `project clear` 仅删除项目中的 runtimes 和 Erda 启动的 addons。

```shell
$ erda-cli project clear --project-id=599
✔ Project clear success.
```

可以通过指定 `--delete-custom-addons=true` 删除第三方 addons。

可以通过指定 `--delete-apps=true` 删除所有的应用。

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

您可以通过 `project delete` 命令删除项目。

```shell
$ erda-cli project delete --project=bestpractice
✔ Project deleted.
```

可以通过指定 `--clear=true` 先清理项目内的 runtimes 和 addons。

如果项目中有未清理的 runtimes 或 平台自建的 addons，删除会失败。

参数说明如下：

```
Flags:
      --clear              if true, clear runtimes and addon first
  -h, --help               help for delete
      --org string         the name of an organization
      --org-id uint        the id of an organization
      --project string     the name of a project
      --project-id uint    the id of a project
      --wait-addon int     minutes to wait addons deleted (default 3)
      --wait-runtime int   minutes to wait runtimes deleted (default 3)
```

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

您可以通过 `project load` 命令加载项目。

```shell
$ erda-cli project load  --branch=release/2.0 --version=v2.0 --workspace=STAGING --project=bestpractice
✔ Project bestpractice loaded.
```

默认情况下部署项目中的每个应用，可以通过 `--skip-apps` 跳过不需要部署的应用。

通过 `--workspace` 确定项目部署的环境，可以选择 `DEV`, `TEST`, `STAGING`, `PROD`  中的任何一个，且必须。

通过 `--branch` 和 `--version` 确定部署的分支及版本，加载过程中会基于分支和版本获取制品用于应用部署，如果未获取到的应用则跳过。

特别的，可以通过 `--config` 配置文件定制项目中各个应用的分支、版本，同时配置文件中声明的配置项会覆盖命令行参数。下面是一个配置文件示例，其中 `web-service` 是项目 bestpractice 中的一个应用的名称：

```shell
$ cat c.yml
web-service:
  branch: "release/1.0"
  version: "v1.0"
```

 参数说明如下：

```shell
Flags:
      --branch string       if branch is specified, all applications use the same one
      --config string       the name of the configuration file, specify workspace and version for applications
  -h, --help                help for load
      --org string          the name of an organization
      --org-id uint         the id of an organization
      --project string      the name of the project
      --project-id uint     the id of a project
      --skip-apps strings   applications to skip deploying
      --version string      if version is specified, all applications use the same one
      --wait-time int       the number of minutes to wait for runtime creating (default 5)
      --workspace string    the env workspace to deploy
```

### erda-cli project member

您可以通过 `project member` 命令列出项目中的成员。

```shell
$ erda-cli project member --project=bestpractice
NICK      NAME            EMAIL                          MOBILE        ROLES
陈**      u931393614340   zho********r@alibaba-inc.com   159****5411   Lead
刘**      terminus10370   lhy*****4@alibaba-inc.com      185****5501   Lead
陈**      jferic          che**f@terminus.io             186****9827   Owner
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

您可以通过 `project open` 命令在浏览器打开项目页面。

```shell
$ erda-cli project open --project=bestpractice
✔ Open project in browser.
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

您可以通过 `release` 命令列出应用的制品。

```shell
$ erda-cli release --application-id=7083
RELEASEID                          RELEASENAME   VERSION   UPDATEDAT                       GITBRANCH     GITCOMMIT
ef951d4f29624ada85b6a20ffa56cc75   release/2.0   v2.0      2021-12-17 11:47:37 +0800 CST   release/2.0   880dc481390fe71f66450b94ff7bcb00da8b0359
```

 参数说明如下：

```shell
Flags:
      --application-id uint   the id of an application
      --branch string         the branch of an application
  -h, --help                  help for release
      --is-version            if true, only list releases having version
      --no-headers            if true, don't print headers (default print headers)
      --org string            the name of an organization
      --org-id uint           the id of an organization
```

### erda-cli release inspect

您可以通过 `release inspect` 命令查看制品信息。

```shell
$ erda-cli release inspect --release-id=ef951d4f29624ada85b6a20ffa56cc75
{
  "applicationId": 7083,
  "applicationName": "echo-web",
  "clusterName": "terminus-captain",
  "createdAt": "2021-12-06T16:24:41+08:00",
  "diceyml": "addons:\n  redis:\n    options:\n      version: 3.2.12\n    plan: redis:basic\n  注册中心:\n    options:\n      version: 2.0.0\n    plan: registercenter:basic\nenvs: {}\njobs: {}\nservices:\n  echo-web:\n    binds: []\n    cmd: java -javaagent:/spot-agent/spot-agent.jar -jar /target/echo-web.jar\n    deployments:\n      replicas: 2\n    envs: {}\n    expose: []\n    health_check:\n      http:\n        duration: 15\n        path: /api/healthy\n        port: 8080\n    hosts: []\n    image: addon-registry.default.svc.cluster.local:5000/trial-bestpractice/echo-web:echo-web-1638779072983240970\n    ports:\n    - port: 8080\n      protocol: TCP\n    resources:\n      cpu: 0.5\n      mem: 512\n",
  "images": [
    "addon-registry.default.svc.cluster.local:5000/trial-bestpractice/echo-web:echo-web-1638779072983240970"
  ],
  "labels": {
    "gitBranch": "release/2.0",
    "gitCommitId": "880dc481390fe71f66450b94ff7bcb00da8b0359",
    "gitCommitMessage": "Update pipeline.yml",
    "gitRepo": "http://gittar.erda.cloud/trial-bestpractice/echo-web"
  },
  "orgId": 100046,
  "projectId": 599,
  "projectName": "bestpractice",
  "reference": 7,
  "releaseId": "ef951d4f29624ada85b6a20ffa56cc75",
  "releaseName": "release/2.0",
  "updatedAt": "2021-12-17T11:47:37+08:00",
  "userId": "19",
  "version": "v2.0"
}
```

 参数说明如下：

```shell
Flags:
  -h, --help                help for inspect
      --org string          the name of an organization
      --org-id uint         the id of an organization
      --release-id string   the id of a release
```

### erda-cli release open

您可以通过 `release open` 命令在浏览器中打开制品页面。

```shell
$ erda-cli release open --release-id=ef951d4f29624ada85b6a20ffa56cc75
✔ Open release in browser.
```

参数说明如下：

```shell
Flags:
  -h, --help                help for open
      --org string          the name of an organization
      --org-id uint         the id of an organization
      --release-id string   the id of a release
```

### erda-cli runtime

您可以通过 `runtime` 命令列出应用中的 runtimes。

```shell
$ erda-cli runtime --application-id=8307
RUNTIMEID   NAME     CREATEAT
15417       master   2021-12-20 15:00:42 +0800 CST
```

参数说明如下：

```shell
Flags:
      --application-id uint   the id of an application
  -h, --help                  help for runtime
      --no-headers            if true, don't print headers (default print headers)
      --org string            the name of an organization
      --org-id uint           the id of an organization
      --workspace string      the env workspace of an application
```

### erda-cli runtime delete

您可以通过 `runtime delete` 命令删除 runtime。

```shell
$ erda-cli runtime delete --runtime-id=15417
✔ Runtime deleted.
```

参数说明如下：

```shell
Flags:
  -h, --help              help for delete
      --org string        the name of an organization
      --org-id uint       the id of an organization
      --runtime-id uint   the id of a runtime
```

### erda-cli runtime inspect

您可以通过 `runtime inspect` 命令查看 runtime 的信息。

```shell
$ erda-cli runtime inspect --runtime=15417
{
  "clusterId": 48,
  "clusterName": "terminus-captain",
  "clusterType": "k8s",
  "createdAt": "2021-12-20T07:00:42Z",
  "deleteStatus": "",
  "deployStatus": "OK",
  "errors": [],
  "extra": {
    "applicationId": 8307,
    "buildId": 12918029,
    "workspace": "PROD"
  },
  "id": 15417,
  "lastMessage": {},
  "name": "master",
  "projectID": 599,
  "releaseId": "b5738c7547d646ab85e16d24c02c6aaa",
  "resources": {
    "cpu": 0.5,
    "disk": 0,
    "mem": 1024
  },
  "serviceGroupName": "670dfe05af",
  "serviceGroupNamespace": "services",
  "services": {
    "docker-java-app-example": {
      "addrs": [
        "docker-java-app-example-670dfe05af.project-599-prod.svc.cluster.local:8080"
      ],
      "deployments": {
        "replicas": 1
      },
      "envs": {},
      "errors": [],
      "expose": [],
      "resources": {
        "cpu": 0.5,
        "disk": 0,
        "mem": 1024
      },
      "status": "Healthy"
    }
  },
  "source": "PIPELINE",
  "status": "Healthy",
  "timeCreated": "2021-12-20T07:00:42Z",
  "updatedAt": "2021-12-20T07:48:01Z"
}
```

参数说明如下：

```shell
Flags:
      --application-id uint   the id of an application
  -h, --help                  help for inspect
      --org string            the name of an organization
      --org-id uint           the id of an organization
      --runtime string        the id/name of a runtime
      --workspace string      the workspace of a runtime
```

### erda-cli service

您可以通过 `service` 命令列出 runtime 中的服务。

```shell
$ erda-cli service --runtime=15417 --application-id=8307 --workspace=PROD
NAME                      STATUS    CPU    MEMORY(MB)   DISK(MB)   REPLICAS
docker-java-app-example   Healthy   0.50   1024         0          1
```

参数说明如下：

```shell
Flags:
      --application-id uint   the id of an application
  -h, --help                  help for service
      --no-headers            if true, don't print headers (default print headers)
      --org string            the name of an organization
      --org-id uint           the id of an organization
      --runtime string        the id of an application
      --workspace string      the env workspace for runtime
```

### erda-cli version

您可以通过 `version` 命令查看版本信息。

```shell
$ erda-cli version
Version: 1.4
BuildTime: 2021-11-17 01:01:59
GoVersion: go version go1.15.15 linux/amd64
CommitID: 02583bd49fc57841bdcb05b02486e27dd868cf00
DockerImage:
```
