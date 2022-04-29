# 命令行工具

CLI 是 Erda 为开发者提供的命令行工具，您可以通过该工具在终端设备上轻松构建 Erda 应用。

## 下载安装

### macOS

```bash
wget -O /usr/local/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/mac/erda-1.5 && chmod +x /usr/local/bin/erda-cli
```

### Linux

```bash
wget -O /usr/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/linux/erda-1.5 && chmod +x /usr/bin/erda-cli
```

## 使用操作

完成安装后，您可以通过 `erda-cli help` 命令列出所有可用的 Erda Command，再通过子命令的 `help` 信息查看详细用法。

```bash
$ erda-cli help

    _/_/_/_/       _/_/_/        _/_/_/          _/_/
   _/             _/    _/      _/    _/      _/    _/
  _/_/_/         _/_/_/        _/    _/      _/_/_/_/
 _/             _/    _/      _/    _/      _/    _/
_/_/_/_/       _/    _/      _/_/_/        _/    _/

Usage:
  erda-cli [command]

Available Commands:
  build       Create an pipeline and run it
  completion  generate the autocompletion script for the specified shell
  ext         Extensions operation sets,including search, pull, push, retag
  help        Help about any command
  migrate     Erda MySQL Migrate
  status      Show build status
  version     Show dice version info

Flags:
  -h, --help              help for erda-cli
      --host string       dice host to visit, format: <org>.<wildcard domain>, eg: https://terminus-org.app.terminus.io
  -p, --password string   dice password to authenticate
  -u, --username string   dice username to authenticate
  -V, --verbose           enable verbose mode

Use "erda-cli [command] --help" for more information about a command.
```

### 登录

CLI 的多数子命令需在登陆后执行，有少数命令无需登录也可执行，例如 `migrate` 相关命令。

登录相关参数如下：

1. `--host` 指定需要登录的 Erda 平台地址，若未指定且在代码目录则通过 `git remote get-url origin` 获取平台地址。
2. `-u`，`--username ` 指定登录用户名。
3. `-p`，`--password` 指定登录密码。

::: tip 提示

登录成功后将保存 Session，Session 过期则需重新登录。

:::

### erda-cli version

```bash
$ erda-cli version
Version: 1.4
BuildTime: 2021-11-17 01:01:59
GoVersion: go version go1.15.15 linux/amd64
CommitID: 02583bd49fc57841bdcb05b02486e27dd868cf00
DockerImage:
```

### erda-cli build

您可以通过 `build` 命令构建 Erda 上的应用。

::: tip 提示

* 请先在 Erda 上创建应用并编写 pipeline.yml 和 dice.yml。
* 1.5 以及上版本不推荐使用。

:::

```shell
$ erda-cli build --host=https://erda.cloud -u 'YourName' -p 'YourPassword'
✔ building for branch: feature/echo-web, pipelineID: 12639533, you can view building status via `erda-cli status -i <pipelineID>`
```

### erda-cli status

您可以通过 `status` 命令构建 Erda 上的应用。

::: tip 提示

1.5 以及上版本不推荐使用。

:::

```shell
$ erda-cli status -i 12639533
pipeline progress (currentStage/totalStages): 4/4

PIPELINEID   TASKID     TASKNAME   TASKSTATUS   STARTEDAT
12639533     10169335   dice       Running      2021-11-22 13:38:46
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
