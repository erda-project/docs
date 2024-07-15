# Platform Environment Variables

## Pipleline Envs

| Env Name                        | Description                          | Example                        |
|---------------------------------|--------------------------------------|--------------------------------|
| `PIPELINE_TIME_BEGIN_TIMESTAMP` | pipeline begin timestamp             | 1707048002                     |
| `PIPELINE_TASK_LOG_ID`          | pipeline task log id                 | pipeline-task-1486922756137087 |
| `PIPELINE_TASK_NAME`            | pipeline task name                   | uc-latest-release              |
| `PIPELINE_LIMITED_DISK`         | maximum disk size for pipeline（MB）   | 128                            |
| `PIPELINE_LIMITED_MEM`          | maximum memory size for pipeline（MB） | 128                            |
| `PIPELINE_DEBUG_MODE`           | enable pipeline debug mod            | false                          |
| `PIPELINE_TASK_ID`              | pipeline task id                     | 1486922756137087               |
| `PIPELINE_LIMITED_CPU`          | maximum number of CPUs for pipeline  | 0.4                            |

## Dice Envs

| Env Name                   | Description                               | Example                                    |
|----------------------------|-------------------------------------------|--------------------------------------------|
| `DICE_VERSION`             | erda version                              | 2.4                                        |
| `DICE_MEM_REQUEST`         | requested memory size                     | 256                                        |
| `DICE_MEM_LIMIT`           | maximum memory size                       | 256                                        |
| `DICE_OPENAPI_ADDR`        | service DNS name of openapi in kubernetes | erda-server.default.svc.cluster.local:9529 |
| `DICE_ORG_NAME`            | organization name                         | erda-development                           |
| `DICE_APPLICATION_ID`      | application ID                            | 8766                                       |
| `DICE_CPU_ORIGIN`          | total of CPUs                             | 0.1                                        |
| `DICE_OPENAPI_PUBLIC_URL`  | domain address for openapi                | https://openapi.erda.daily.terminus.io/    |
| `DICE_CPU_REQUEST`         | requested CPUs                            | 0.05                                       |
| `DICE_NAMESPACE`           | kubernetes namespace                      | project-1904-test                          |
| `DICE_IS_EDGE`             | whether it is an edge cluster?            | true                                       |
| `DICE_PROJECT_ID`          | project Id                                | 1904                                       |
| `DICE_STORAGE_MOUNTPOINT`  | storage path                              | /netdata                                   |
| `DICE_PROTOCOL`            | protocol                                  | https                                      |
| `DICE_PROJECT_NAME`        | project name                              | erda-development                           |
| `DICE_MEM_ORIGIN`          | maximum memory size                       | 128                                        |
| `DICE_ROOT_DOMAIN`         | erda domain                               | daily.terminus.io                          |
| `DICE_APPLICATION_NAME`    | application name                          | go-demo                                    |
| `DICE_WORKSPACE`           | workspace                                 | test                                       |
| `DICE_CPU_LIMIT`           | maximum CPUs size                         | 0.1                                        |
| `DICE_ORG_ID`              | organization ID                           | 633                                        |
| `DICE_HTTPS_PORT`          | https port                                | 443                                        |
| `DICE_CLUSTER_TYPE`        | cluster type                              | kubernetes                                 |
| `DICE_CLUSTER_NAME`        | cluster name                              | erda-jicheng                               |
| `DICE_HTTP_PORT`           | http port                                 | 80                                         |
| `DICE_USER_ID`             | user ID                                   | 22304                                      |
| `DICE_SERVICE_NAME`        | service name                              | golang-check                               |

## Gittar环境变量

| Env Name         | Description    | Example |
|------------------|----------------|---------|
| `GITTAR_AUTHOR`  | author         | -       |
| `GITTAR_BRANCH`  | branch         | -       |
| `GITTAR_COMMIT`  | commit ID      | -       |
| `GITTAR_MESSAGE` | commit message | -       |
| `GITTAR_REPO`    | repositories   | -       |



























