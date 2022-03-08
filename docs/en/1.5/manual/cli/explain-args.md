# Command Line Tool

CLI is a command line tool provided by Erda for developers, which allows you to easily build applications on terminal devices.

## Download and Install

### macOS

```bash
wget -O /usr/local/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/mac/erda-1.5 && chmod +x /usr/local/bin/erda-cli
```

### Linux

```bash
wget -O /usr/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/linux/erda-1.5 && chmod +x /usr/bin/erda-cli
```

## Operations

After installation, you can list all available Erda commands via `erda-cli help`, and then view detailed usage via `help` of the subcommands.

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

### Login

Most subcommands of CLI need to be executed after logging in, and a few can be executed without logging in, such as commands related to `migrate`.

The login-related parameters are as follows:

1. `--host` specifies the address of Erda you need to log in to. If not specified, get the platform address via `git remote get-url origin`.
2. `-u`, `--username` specifies the login username.
3. `-p`, `--password` specifies the login password.

:::tip Tips

The session will be saved after successful login, and you need to login again if the session expires.

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

You can build applications on Erda with the `build` command.

:::tip Tips

* Please create an application on Erda first and write pipeline.yml and erda.yml.
* It is not recommended for 1.5 or later versions.

:::

```shell
$ erda-cli build --host=https://erda.cloud -u 'YourName' -p 'YourPassword'
✔ building for branch: feature/echo-web, pipelineID: 12639533, you can view building status via `erda-cli status -i <pipelineID>`
```

### erda-cli status

You can build applications on Erda with the `status` command.

:::tip Tips

It is not recommended for 1.5 or later versions.

:::

```shell
$ erda-cli status -i 12639533
pipeline progress (currentStage/totalStages): 4/4

PIPELINEID   TASKID     TASKNAME   TASKSTATUS   STARTEDAT
12639533     10169335   dice       Running      2021-11-22 13:38:46
```

### erda-cli ext

You can list all extensions on Erda with the `ext` command.

```shell
erda-cli ext --host=https://erda.cloud -u 'YourName' -p 'YourPassword'
ID                            TYPE     CATEGORY                  PUBLIC   UPDATED_AT
canal                         addon    database                  true     2021-11-18 01:12:56
consul                        addon    distributed_cooperation   true     2021-11-18 01:12:56
terminus-elasticsearch        addon    search                    true     2021-11-18 01:13:17
kafka                         addon    message                   true     2021-11-18 01:12:57
```

### erda-cli ext pull

You can get the extension on Erda with the `ext pull` command.

```shell
$ erda-cli ext pull --host=https://erda.cloud -u 'YourName' -p 'YourPassword' git-checkout@1.0 -o git-checkout
✔ extension pull success
```

The parameters are as follows:

```
Flags:
  -o, --output string   which directory to export to
```

### erda-cli ext push

You can update the extension on Erda with the `ext push` command. This operation needs to be performed by admin.

```shell
$ erda-cli ext push --host=https://erda.cloud -u 'YourName' -p 'YourPassword' -d git-checkout
✔ extension git-checkout push success
```

The parameters are as follows:

```shell
Flags:
  -a, --all               override exist extension and version,must with -f
  -d, --dir string        extension dir
  -f, --force             override exist version
  -r, --registry string   new registry
```

### erda-cli migrate

You can manage data changes in a MySQL database with the `migrate` command.

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
