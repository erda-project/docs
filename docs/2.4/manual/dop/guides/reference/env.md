# 平台级环境变量

## 公共环境变量

> 以下环境变量，[流水线](pipeline.md)和[Runtime](../../../quick-start/premise.md#服务和-runtime)都会存在

| 变量名称                | 说明                | 示例                |
|---------------------|-------------------|-------------------|
| `DICE_NAMESPACE`    | 当前应用所在的 Namespace | project-1904-test |
| `DICE_ROOT_DOMAIN`  | erda中心域名          | daily.terminus.io |
| `DICE_CLUSTER_NAME` | 集群名称              | erda-jicheng      |
| `DICE_PROTOCOL`     | 协议                | https             |

## 流水线环境变量

> 以下环境变量，存在于[流水线](pipeline.md)Action中

| 变量名称                            | 说明            | 示例                                                              |
|---------------------------------|---------------|-----------------------------------------------------------------|
| `GITTAR_AUTHOR`                 | 作者            | Demo                                                            |
| `GITTAR_BRANCH`                 | 分支            | feature/1.0                                                     |
| `GITTAR_COMMIT`                 | commit ID     | 3ad7a17163ee8f1a431389bea75a2738e710a4f0                        |
| `GITTAR_MESSAGE`                | 提交信息          | feat: update pipeline                                           |
| `GITTAR_REPO`                   | 仓库地址          | http://gittar.namespace.svc.cluster.local/demo-project/demo-app |
| `PIPELINE_TIME_BEGIN_TIMESTAMP` | 流水线开始时间戳      | 1707048002                                                      |
| `PIPELINE_TASK_LOG_ID`          | 流水线Task日志ID   | pipeline-task-1486922756137087                                  |
| `PIPELINE_TASK_NAME`            | 流水线Task名称     | uc-latest-release                                               |
| `PIPELINE_LIMITED_DISK`         | 流水线最大磁盘大小（MB） | 128                                                             |
| `PIPELINE_LIMITED_MEM`          | 流水线最大内存大小（MB） | 128                                                             |
| `PIPELINE_DEBUG_MODE`           | 流水线Debug模式    | false                                                           |
| `PIPELINE_TASK_ID`              | 流水线TaskID     | 1486922756137087                                                |
| `PIPELINE_LIMITED_CPU`          | 流水线最大CPU数     | 0.4                                                             |
| `DICE_OPENAPI_ADDR`             | openapi集群内部地址 | erda-server.default.svc.cluster.local:9529                      |
| `DICE_OPENAPI_PUBLIC_URL`       | openapi外部域名地址 | https://openapi.erda.daily.terminus.io/                         |
| `DICE_VERSION`                  | erda版本        | 2.4                                                             |
| `DICE_HTTPS_PORT`               | https端口       | 443                                                             |
| `DICE_STORAGE_MOUNTPOINT`       | 存储路径点         | /netdata                                                        |

## 应用运行时环境变量

> 以下环境变量，存在于[Runtime](../../../quick-start/premise.md#服务和-runtime)

| 变量名称                    | 说明                    | 示例                                    |
|-------------------------|-----------------------|---------------------------------------|
| `POD_IP`                | Pod IP                | 10.16.3.194                           |
| `SELF_PORT`             | Pod端口                 | 25565                                 |
| `SELF_PORT(n)`          | Pod开放的端口(n >= 0)      | 25565                                 |
| `SELF_HOST`             | Pod集群内部地址             | demo.demo-namespace.svc.cluster.local |
| `TERMINUS_TA_ENABLE`    | 开启前端Ta监控              | true                                  |
| `TERMINUS_AGENT_ENABLE` | 是否开启JavaAgent等监控Agent | true                                  |
| `DICE_RUNTIME`          | Runtime ID            | 19635                                 |
| `DICE_MEM_REQUEST`      | 申请的内存大小               | 256                                   |
| `DICE_MEM_LIMIT`        | 最大内存大小                | 256                                   |
| `DICE_ORG_NAME`         | 组织名称                  | erda-development                      |
| `DICE_APPLICATION_ID`   | 应用ID                  | 8766                                  |
| `DICE_CPU_ORIGIN`       | CPU配置的原始值             | 0.1                                   |
| `DICE_CPU_REQUEST`      | 申请的CPU大小              | 0.05                                  |
| `DICE_IS_EDGE`          | 是否为边缘集群               | true                                  |
| `DICE_PROJECT_ID`       | 项目ID                  | 1904                                  |
| `DICE_PROJECT_NAME`     | 项目名称                  | erda-development                      |
| `DICE_MEM_ORIGIN`       | 内存配置的原始值              | 128                                   |
| `DICE_APPLICATION_NAME` | 应用名称                  | go-demo                               |
| `DICE_WORKSPACE`        | 应用工作空间                | test                                  |
| `DICE_CPU_LIMIT`        | 最大CPU数                | 0.1                                   |
| `DICE_ORG_ID`           | 组织ID                  | 633                                   |
| `DICE_CLUSTER_TYPE`     | 集群类型                  | kubernetes                            |
| `DICE_HTTP_PORT`        | http端口                | 80                                    |
| `DICE_USER_ID`          | 用户ID                  | 22304                                 |
| `DICE_SERVICE_NAME`     | service名称             | golang-check                          |