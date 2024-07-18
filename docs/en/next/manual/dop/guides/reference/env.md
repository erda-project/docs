# Platform Environment Variables

## Common Environment Variables

> The following environment variables are present during both pipeline execution and application [runtime](../../../quick-start/premise.md#service-and-runtime).

| Variable Name       | Description                          | Example           |
|---------------------|--------------------------------------|-------------------|
| `DICE_NAMESPACE`    | Namespace of the current application | project-1904-test |
| `DICE_ROOT_DOMAIN`  | Erda central domain                  | daily.terminus.io |
| `DICE_CLUSTER_NAME` | Cluster name                         | erda-jicheng      |
| `DICE_PROTOCOL`     | Protocol                             | https             |

## Pipeline Environment Variables

> The following environment variables are present in the pipeline Action.

| Variable Name                   | Description                             | Example                                                         |
|---------------------------------|-----------------------------------------|-----------------------------------------------------------------|
| `GITTAR_AUTHOR`                 | Author                                  | Demo                                                            |
| `GITTAR_BRANCH`                 | Branch                                  | feature/1.0                                                     |
| `GITTAR_COMMIT`                 | Commit ID                               | 3ad7a17163ee8f1a431389bea75a2738e710a4f0                        |
| `GITTAR_MESSAGE`                | Commit message                          | feat: update pipeline                                           |
| `GITTAR_REPO`                   | Repository address                      | http://gittar.namespace.svc.cluster.local/demo-project/demo-app |
| `PIPELINE_TIME_BEGIN_TIMESTAMP` | Pipeline start timestamp                | 1707048002                                                      |
| `PIPELINE_TASK_LOG_ID`          | Pipeline task log ID                    | pipeline-task-1486922756137087                                  |
| `PIPELINE_TASK_NAME`            | Pipeline task name                      | uc-latest-release                                               |
| `PIPELINE_LIMITED_DISK`         | Max disk size for the pipeline (MB)     | 128                                                             |
| `PIPELINE_LIMITED_MEM`          | Max memory size for the pipeline (MB)   | 128                                                             |
| `PIPELINE_DEBUG_MODE`           | Pipeline debug mode                     | false                                                           |
| `PIPELINE_TASK_ID`              | Pipeline task ID                        | 1486922756137087                                                |
| `PIPELINE_LIMITED_CPU`          | Max CPU count for the pipeline          | 0.4                                                             |
| `DICE_OPENAPI_ADDR`             | Internal address of the OpenAPI cluster | erda-server.default.svc.cluster.local:9529                      |
| `DICE_OPENAPI_PUBLIC_URL`       | External domain address of OpenAPI      | https://openapi.erda.daily.terminus.io/                         |
| `DICE_VERSION`                  | Erda version                            | 2.4                                                             |
| `DICE_HTTPS_PORT`               | HTTPS port                              | 443                                                             |
| `DICE_STORAGE_MOUNTPOINT`       | Storage mount point                     | /netdata                                                        |

## Application Runtime Environment Variables

> The following environment variables are present during application [runtime](../../../quick-start/premise.md#service-and-runtime)..

| Variable Name           | Description                               | Example                               |
|-------------------------|-------------------------------------------|---------------------------------------|
| `POD_IP`                | Pod IP                                    | 10.16.3.194                           |
| `SELF_PORT`             | Pod port                                  | 25565                                 |
| `SELF_PORT(n)`          | Possible open ports of the Pod (n >= 0)   | 25565                                 |
| `SELF_HOST`             | Internal address of the Pod in Kubernetes | demo.demo-namespace.svc.cluster.local |
| `TERMINUS_TA_ENABLE`    | Enable frontend TA monitoring             | true                                  |
| `TERMINUS_AGENT_ENABLE` | Enable agent proxy                        | true                                  |
| `DICE_RUNTIME`          | Runtime ID                                | 19635                                 |
| `DICE_MEM_REQUEST`      | Requested memory size                     | 256                                   |
| `DICE_MEM_LIMIT`        | Max memory size                           | 256                                   |
| `DICE_ORG_NAME`         | Organization name                         | erda-development                      |
| `DICE_APPLICATION_ID`   | Application ID                            | 8766                                  |
| `DICE_CPU_ORIGIN`       | Total CPU size                            | 0.1                                   |
| `DICE_CPU_REQUEST`      | Requested CPU size                        | 0.05                                  |
| `DICE_IS_EDGE`          | Is it an edge cluster?                    | true                                  |
| `DICE_PROJECT_ID`       | Project ID                                | 1904                                  |
| `DICE_PROJECT_NAME`     | Project name                              | erda-development                      |
| `DICE_MEM_ORIGIN`       | Total memory size                         | 128                                   |
| `DICE_APPLICATION_NAME` | Application name                          | go-demo                               |
| `DICE_WORKSPACE`        | Application workspace                     | test                                  |
| `DICE_CPU_LIMIT`        | Max CPU count                             | 0.1                                   |
| `DICE_ORG_ID`           | Organization ID                           | 633                                   |
| `DICE_CLUSTER_TYPE`     | Cluster type                              | kubernetes                            |
| `DICE_HTTP_PORT`        | HTTP port                                 | 80                                    |
| `DICE_USER_ID`          | User ID                                   | 22304                                 |
| `DICE_SERVICE_NAME`     | Service name                              | golang-check                          |
