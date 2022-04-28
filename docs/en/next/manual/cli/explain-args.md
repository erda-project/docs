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

## erda-cli issue
You can list backlog issues in project collaboration with the `issue` command.
```shell
// Enter project space
$ cd bestpractice

$ erda-cli issue
ISSUEID   FINISHDATE   STATE    ISSUENAME
298064    2022-03-31   Pending  Achieve single sign-on in the enterprise
298068    2022-03-30   Pending  Mobile login authentication
298067    2022-03-28   Pending  User identity authentication
```

The parameters are as follows:

```shell
Flags:
      --bug             if true, list bugs
      --no-headers      if true, don't print headers (default print headers)
      --page-size int   the number of page size (default 10)
      --requirement     if true, list requirements
      --task            if true, list tasks
```

You can specify the issue type as bug by `--bug`, requirement by `-requirement`, and task by `--task`.

## erda-cli issue fix

You can create branches for issues in project collaboration with the `issue fix` command.

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

It creates a Git branch `feature/auth` in the `echo-service` directory of the application and commits it to the Erda repository, adds a comment to the issue 298067, and relates it to the code branch to follow.

The parameters are as follows:

```shell
Args:
      issue-id               id of issue to fix
Flags:
      --application string   name of the application
      --base-branch string   branch as base to create from
      --branch string        branch to create and checkout
```

You can specify the application to create code branches by `--application` (ignored if the current working directory is already an application directory), specify branch name by `-branch` and specify the base branch by `--base-branch` (which is the master branch by default).

## erda-cli issue open

You can open issue pages in your browser with the `issue open` command.

```shell
$ erda-cli issue open 298067
✔ Open issue '298067' in browser.
```

The parameters are as follows:

```shell
Args:
      issue-id               id of issue to open
```

## erda-cli issue close

You can close issues with the `issue close` command.

```shell
$ erda-cli issue close 298067 --man-hour=2h
✔ Issue '298067' closed.
```

The parameters are as follows:

```shell
Flags:
      --man-hour string   time for work, in format of 2m/2h/2d/2w
```

You can specify the used man-hours by `--man-hour`.

## erda-cli create

You can create merge requests with the `mr create` command.

```shell
$ erda-cli mr create --from=feature/auth --to=master --title='auth service' --description='all auth handle by the same service'
[INFO] source branch feature/auth, target branch master
[INFO] Merge request created.
[INFO] To https://erda.cloud/trial/dop/projects/599/apps/7097/repo/mr/open/1
```

The parameters are as follows:

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

You can specify the merge request title by `--title`, describe the merge request content by `--description`, specify the source code branch by `--from`, target code branch by `--to`, and application by `--application` (not required if the current workspace is an application directory).

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


## erda-cli config

You can set, update, query or delete features supported by a specified workspace on Erda for a specified project under a specified organization with the `config` command, including enabling ECI, and more features are coming soon, such as automatic scaling of HPA/VPA, etc.

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
You can set features supported by a specified workspace for a specified project under a specified organization with the `set` command, such as enabling ECI.

```shell
$ erda-cli  config set  --help
set project workspace config

Usage:
  erda-cli config set <feature> [flags]

Examples:
  $ erda-cli config set HPA=enable --org xxx --project yyy --workspace DEV
```

feature is set in the format of `key=value`, and separated with commas if there are more than one, such as `key1=value1,key2=value2`.

To enable ECI for the dev workspace of the testeci project under the erda-demo organization, the command is as follows:

```shell
$ erda-cli config set ECI=enable --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
✔ config set success
```

### erda-cli config get
You can obtain information about features supported by a specified workspace for a specified project under a specified organization with the `get` command.

```shell
$ erda-cli  config get  --help
get project workspace config

Usage:
  erda-cli config get  [flags]

Examples:
  $ erda-cli config get --org xxx --project yyy --workspace DEV
```

To get the current function details of the dev workspace for the testeci project under the erda-demo organization, the command is as follows:

```shell
$ erda-cli  config  get --host --host=https://erda.cloud  -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
[INFO] Configs get result: {"ECI":"enable"}
✔ config get success
```


### erda-cli config update
You can update features supported by a specified workspace for a specified project under a specified organization with the `update` command, such as disabling ECI.

```shell
$ erda-cli  config update  --help
update project workspace config

Usage:
  erda-cli config update <feature> [flags]

Examples:
  $ erda-cli config update ECI=disable --org xxx --project yyy --workspace DEV
```

feature is set in the format of `key=value`, and separated with commas if there are more than one, such as `key1=value1,key2=value2`.

To disable ECI for the dev workspace of the testeci project under the erda-demo organization, the command is as follows:

```shell
$ erda-cli config update ECI=disable --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
✔ config set success
```


### erda-cli config delete
You can remove all features supported by a specified workspace for a specified project under a specified organization with the `delete` command. If no workspace is specified, it means that the information set in all workspaces for a specified project under a specified organization will be deleted.

The `delete` command cannot delete a specific item in the feature list. For example, if both ECI and HPA are supported, then you cannot delete only HPA and keep ECI. In such cases, use the `update` command to set the HPA to be deleted as disable.

```shell
$ erda-cli  config delete  --help
delete project workspace config

Usage:
  erda-cli config delete  [flags]

Examples:
  $ erda-cli config delete --org xxx --project yyy  --workspace DEV
  $ erda-cli config delete --org xxx --project yyy
```

To remove all functions of the dev workspace for the testeci project under the erda-demo organization, the command is as follows:

```shell
$ erda-cli config delete --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
✔ config delete success
```


## erda-cli project-deployment

You can stop or start all application instances (and their addon components) deployed under a specified workspace for a specified project under a specified organization on Erda with the `project-deployment`.

* **Stop**: Indicates that set the number of replicas (pods) of all deployed application instances (and their addon components) as 0, delete the corresponding pod, but keep the controller to which the pod belongs, such as StatefulSet, Deployment, CRD, etc.
* **Start**: Indicates that restore the number of replicas (pods) of all deployed and stopped application instances (and their addon components) from 0 to their pre-stop state.

The `project-deployment stop` command can allows you to quickly release cluster resources, and the `project-deployment start` allows you to quickly restore the deployed instance and its addon to their pre-stop state.

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
You can use the `stop` command to stop all deployed application instances (and their addon components) under a specified workspace for a specified project under a specified organization and set the number of replicas (pods) as 0, delete the corresponding pod, but keep the controller to which the pod belongs, such as StatefulSet, Deployment, CRD, etc.

```shell
$ erda-cli project-deployment stop --help
stop project's runtimes and addons

Usage:
  erda-cli project-deployment stop  [flags]

Examples:
  $ erda-cli project-deployment stop --org xxx  --project yyy --workspace DEV
```

To stop all application instances and its addon of the dev workspace for the testeci project under erda-demo organization, the command is as follows:

```shell
$ erda-cli project-deployment stop --host=https://erda.cloud -u 'YourName' -p 'YourPassword' --org erda-demo --project testeci  --workspace DEV
[INFO] Project's applications IDs to stop is:[6 5]
[INFO] Begin to stop project's runtimes for runtime IDs:[186]
[INFO] Waitting 1 minutes for project's runtimes to Terminating        
✔ project-deployment stop project's runtimes success
[INFO] No addons found for project to stop
✔ project-deployment stop project's addons success
```
:::tip Tips
* The stop of addon and runtime has a sequential dependency. Stop runtime first and wait for a minute to ensure that the pod corresponding to the runtime is deleted, then stop addon. The execution process can be viewed in the command execution output.
* Currently the addon of Elasticsearch from version 6.8.9 and 6.8.22 or later cannot be stopped.

:::

### erda-cli project-deployment start

You can use the `start` command to restart all application instances (and their addon components) deployed under a specified workspace for a specified project under a specified organization, and restore the number of replicas (pods) of all corresponding application instances (and their addon components) from 0 to their pre-stop state.

```shell
$ erda-cli project-deployment start --help
start project's runtimes and addons

Usage:
  erda-cli project-deployment start  [flags]

Examples:
  $ erda-cli project-deployment start --org xxx --project yyy --workspace DEV
```

To start all application instances and its addon of the dev workspace for the testeci project under erda-demo organization, the command is as follows:

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

:::tip Tips
* The stop of addon and runtime has a sequential dependency. Stop runtime first and wait for a minute to ensure that the pod corresponding to the runtime is deleted, then stop addon. The execution process can be viewed in the command execution output.
* Currently the addon of Elasticsearch from version 6.8.9 and 6.8.22 or later cannot be started.

:::
