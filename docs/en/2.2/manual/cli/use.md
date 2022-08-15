# First Use

## Login

There are a few commands of CLI that can be executed without logging in, such as commands related to `migrate`. But most need to be executed after logging in. The login-related parameters are as follows:

1. `--host` specifies the Erda platform address to log in to.
2. `-u`, `--username` specifies the login username.
3. `-p`, `--password` specifies the login password.

:::tip Tips

The current directory is the code directory, and the CLI will try to get the platform address, enterprise name, project ID, and application ID via `git remote get-url <remote-name>`, where remote-name can be specified through `--remote` and its default value is `origin`.

:::

If you do not specify login information via the login parameters, you need to fill it in interactively.

```shell
$ erda-cli clone https://erda.cloud/trial/dop/projects/599
Enter your erda username: <YourName>
Enter your erda password: <YourPassword>
ORGID    NAME         DESCRIPTION
100060   erda         Erda open-source organization
100046   trial        Trial enterprise
```

:::tip Tips

The session will be saved after successful login, and you need to login again if the session expires.

:::

## Local Development

### Project Preparation

:::warning Warning

Please first create a project and application on Erda and submit the code.

Assuming that the organization is named trial, the project is named bestpractice, and the application is named echo-services.

:::

Clone the project to local:

```shell
$ erda-cli clone https://erda.cloud/trial/dop/projects/599
  Application 'echo-service' cloning ...
  Application 'echo-service' cloned.
  Application 'echo-web' cloning ...
  Application 'echo-web' cloned.
✔ Project 'bestpractice' and your applications cloned.

# Enter project space
$ cd bestpractice
```

### Issue Processing

List requirements:

```shell
$ erda-cli issue --requirement
ISSUEID   FINISHDATE   STATE    ISSUENAME
298064    2022-03-31   Pending  Achieve single sign-on in the enterprise
```

List tasks:

```shell
$ erda-cli issue --task
ISSUEID   FINISHDATE   STATE    ISSUENAME
298068    2022-03-30   Pending  Mobile login authentication
298067    2022-03-28   Pending  User identity authentication
```

Create branches for issues:

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

Create a branch `feature/auth` in the application `echo-service` for issue 298067. Then write code in the new feature branch.

### Application Building

Execute the pipeline and view the build status.

```shell
$ cd echo-service
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

### Branch Merge

Commit a merge request after coding and building:

```shell
$ erda-cli mr create --from=feature/auth --to=master --title='auth service' --description='all auth handle by the same service'
[INFO] source branch feature/auth, target branch master
[INFO] Merge request created.
[INFO] To https://erda.cloud/trial/dop/projects/599/apps/7097/repo/mr/open/1
```

## Project Initialization

### Project Creation

#### Based on Engineering Package

You can produce project engineering packages based on the project artifacts of standard products, for quick project creation in an implementation environment.

* Create a pipeline in a standard project.

   ```yaml
   version: "1.1"
   stages:
     - stage:
         - project-package:
             alias: project-package
             description: to make project packages on Erda
             version: "1.0"
             params:
               artifacts:
                 - name: gaia-oms
                   type: project
                   version: "1.0"
   ```

The artifacts describe the artifacts associated with the project package. Run the pipeline to complete the project package, and get it through the download link.

* The structure of the project package is as follows:

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

   It includes:

   1. Application list
   2. Application code
   3. Project artifact
   4. Environment configuration, including custom addon, cluster and quota

* Fill in the configuration.

   Please fill the configuration required for the new project in the values.yml file of the project package:

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

* Initialize the project using the project package.

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

   project_package_20220310194452.zip is the project package.

   The initialization process will complete the following:

   1. Create a project
   1. Create a monitoring tenant
   1. Import the project package, including creating application, pushing code, creating custom addon, importing artifact

### Project Process

#### Project Clone

Clone the project on Erda to local via the `clone` command for later operations.

```shell
$ erda-cli clone https://erda.cloud/trial/dop/projects/599
  Application 'echo-service' cloning ...
  Application 'echo-service' cloned.
  Application 'echo-web' cloning ...
  Application 'echo-web' cloned.
✔ Project 'bestpractice' and your applications cloned.
```

The default value of `--cloneApps` is `true`, which will clone each application and code in the project to local as well.

After the cloning is completed, a directory will be created locally with the project name, and the project directory will be the project space with hidden files under it to record the project information.

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

Executing the CLI command in the project space will load the project and application information by default.

#### Project Push

You can push applications and code from your local project space to any project on the Erda platform for quick deployment and secondary development.

```shell
$ erda-cli push https://one.gts.terminus.io/trial/dop/projects/127 --application echo-web --application echo-service
  Application 'echo-web' pushed.
✔ Project 'bestpractice' pushed to server https://openapi.erda.cloud.
```

