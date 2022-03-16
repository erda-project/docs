# CLI Command

## Command Description

`--interactive`: Boolean type that specifies whether the CLI is interactive, and the default value is `true`.

`--remote`: String type that specifies the remote name used by the CLI to get the Erda code repository, and the default value is `origin`. With the Erda address not specified, if the CLI working directory is the code repository of the Erda application, it will get the Git address based on the remote name, and resolve the information of organization, project, and application.

`--host`: String type that specifies the Erda address to which the CLI accesses. The CLI is essentially accessing Erda's OpenAPI address, so if it is set to *https://erda.cloud*, the CLI will convert it to *https://openapi.erda.cloud*.

`--username`: Username that specifies the login user for CLI access to the Erda platform.

`--password`: Password that specifies the login password for CLI access to the Erda platform.

All parameters are shown below:

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

You can clone projects on Erda with the `clone` command.

```shell
$ erda-cli clone https://erda.cloud/trial/dop/projects/599
  Application 'echo-service' cloning ...
  Application 'echo-service' cloned.
  Application 'echo-web' cloning ...
  Application 'echo-web' cloned.
✔ Project 'bestpractice' and your applications cloned.
```

The parameters are as follows:

```shell
 Args:
   url               project url
 Flags:
       --cloneApps   if false, don't clone applications in the project (default true)
```

## erda-cli push

You can push applications to Erda with the `push` command.

```shell
$ erda-cli push https://erda.cloud/trial/dop/projects/599 --application new-app
  Application 'new-app' pushed.
✔ Project 'bestpractice' pushed to server https://openapi.erda.cloud.
```

The parameters are as follows:

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

You can create projects on Erda with the `create` command.

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

The parameters are as follows:

```shell
Flags:
  -d, --description string    description of the project
      --init-package string   package for init the project
  -n, --name string           the name of the project
      --org string            the name of an organization
      --wait-import int       minutes wait for package to be import (default 1)
```

## erda-cli build

You can build applications on Erda with the `build` command.

```shell
$ erda-cli build <path-to/pipeline.yml> --host=https://erda.cloud -u 'YourName' -p 'YourPassword'
✔ building for branch: feature/echo-web, pipelineID: 12639533, you can view building status via `erda-cli status -i <pipelineID>`
```

The parameters are as follows:

```shell
 Flags:
      --branch string   branch to create pipeline, default is current branch
  -h, --help            help for build
  -w, --watch           watch the status
```

See the building process of the application with the `--watch` command.

## erda-cli view

You can build applications on Erda with the `view` command.

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

The parameters are as follows:

```
Flags:
  -b, --branch string     specify branch to show pipeline status, default is current branch
  -h, --help              help for view
  -i, --pipelineID uint   specify pipeline id to show pipeline status
  -w, --watch             watch the status
```

## erda-cli ext

You can list all extensions on Erda with the `ext` command.

```shell
erda-cli ext --host=https://erda.cloud -u 'YourName' -p 'YourPassword'
ID                            TYPE     CATEGORY                  PUBLIC   UPDATED_AT
canal                         addon    database                  true     2021-11-18 01:12:56
consul                        addon    distributed_cooperation   true     2021-11-18 01:12:56
terminus-elasticsearch        addon    search                    true     2021-11-18 01:13:17
kafka                         addon    message                   true     2021-11-18 01:12:57
```

## erda-cli ext pull

You can get extensions on Erda with the `ext pull` command.

```shell
$ erda-cli ext pull --host=https://erda.cloud -u 'YourName' -p 'YourPassword' git-checkout@1.0 -o git-checkout
✔ extension pull success
```

The parameters are as follows:

```
Flags:
  -o, --output string   which directory to export to
```

## erda-cli ext push

You can update extensions on Erda with the `ext push` command. This operation needs to be performed by the admin.

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

## erda-cli migrate

You can manage data changes in a MySQL database with the `migrate` command.

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
