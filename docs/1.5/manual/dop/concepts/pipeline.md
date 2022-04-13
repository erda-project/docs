# pipeline.yml

Erda Pipeline 是由端点自研、用 Go 编写的一款企业级流水线服务。自研流水线的原因在于：

- 时至今日，开源社区尚无事实上的流水线标准。
- K8s、DC/OS 等 Job 实现偏弱，以及上下文传递等缺失，无法满足实际业务需求。
- 自研能更快地响应业务需求，进行定制化开发。

作为基础服务，Pipeline 在 Erda 内部支撑了 CI/CD、快数据平台、自动化测试平台、SRE 运维链路等产品化场景。本文将从以下几个方面展开介绍。

## Pipeline 由来
Pipeline 的由来需从应用构建开始说起。Pipeline 的前身是 Packer 和 CI。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/a3100f52-404b-4a8a-a418-ee600d9cf283.png)

### Packer
Erda 最初是端点内部使用的 PaaS 平台。自 2017 年开始，Erda 已管理公司所有的研发项目。项目下各个应用均无法脱离 “代码 > 编译 > 镜像制作 > 部署”的标准流程。Packer 便由此诞生，成为专门负责打包的组件。用户需提供 Dockerfile，学习成本相对较高。

### CI
随着 CI/CD（持续集成、持续交付）概念的深入人心，平台推出了 Packer 的升级版 CI 。同时，基础设施即代码（IaC）的理念也在此得到了实践，通过 dice.yml 1.0 语法同时声明应用的微服务架构和构建过程。

在用户体验上，平台不再直接暴露 Dockerfile，而是将最佳实践以 BuildPack 大礼包的方式提供给使用者。使用者无需声明应用的开发语言和构建方式，即可通过 BuildPack 的自动探测和识别，完成 CI/CD 流程。

### Pipeline
由于 CI/CD 本身是一个很标准的流程，平台可以由此抽象出一个更通用的流程引擎，即 Pipeline。CI/CD 成为了 Pipeline 最开始支撑的场景。

在设计之初，平台还做了以下改进：

- 对外：通过清晰易用的 pipeline.yaml 语法，降低使用者的上手成本。
- 对内：抽象出任务定义，配合 ActionExecutor Plugin Mechanism（任务执行器插件机制），便于对接各个单任务执行平台，譬如 DC/OS Metronome、K8s Job、Flink/Spark Job 等。
- 由 Pipeline 提供一致、强大的流程编排能力。

## Pipeline 特性
Pipeline 拥有众多灵活、强大的功能，例如：

- 配置即代码，通过 pipeline.yaml 语法描述流程，基于 Stage 语法简化编排复杂度。
- 丰富的扩展市场，平台内置超过百款开箱即用的 Action，满足多数日常场景，同时可轻松扩展您的 Action。
- 可视化编辑，通过图形界面交互快速配置流水线。
- 支持嵌套流水线，在流水线级别进行复用，组合出更强大的流水线。
- 灵活的执行策略，包括串并行、循环、分支策略、超时、人工确认等。
- 支持工作流优先队列，优先级可实时调整，保证高优先级流水线优先执行。
- 多维度的重试机制，支持断点重试、全流程重试。
- 定时流水线，同时提供强大的定时补偿功能。
- 动态配置，支持值和文件两种类型，均支持加密存储，确保数据安全性。
- 上下文传递，后置任务可引用前置任务的值和文件。
- 开放的 OpenAPI 接口，便于第三方系统快速接入。

## Pipeline 架构
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/3d1e0115-0ec2-47b2-beb0-519405845859.png)

Pipeline 支持 UI、OpenAPI、CLI 等多种交互方式，同时支持水平扩展，保证高可用，并可将其划分为服务层、核心层和引擎层。

### 服务层
- yaml parser 解析流程定义文件，支持灵活的变量语法，例如上下文值引用 <code v-pre>${{ outputs.preTaskName.key }}</code>，配置管理引用 <code v-pre>${{ configs.key }}</code> 等。
- 对接扩展市场获取扩展能力。

### 核心层
- Cron 守护进程。
- EventManager 抽象内部事件发送，使用适配器模式解耦监控指标上报、发送 WS 消息、支持 Webhook 等。
- AOP 扩展点机制（借鉴 Spring），暴露代码关键节点，便于开发同学在不修改核心代码的前提下定制流水线行为。

目前多数功能均通过扩展点机制实现，例如自动化测试报告嵌套生成、队列弹出前检查、接口测试 Cookie 保持等。
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/15a5d020-19d3-492a-9797-10aebd7902ca.png)

### 引擎层
- 流程推进器（Reconciler）
- 优先队列管理器
- 任务执行器插件机制

### 中间件依赖
- 使用 MySQL 做数据持久化。
- 使用 etcd watch 功能实现多实例状态同步以及分布式锁。
- 使用 etcd key ttl 实现数据 defer GC。

## 如何推进流水线
在引擎侧，pipeline.yaml 被解析为 DAG（Directed Acyclic Graph，有向无环图）结构后被推进。

换言之，引擎并不认识、也不关心 pipeline.yaml 语法，用户侧完全可以提供多种多样的语法便于不同用户使用，只需最终能转换成 Pipeline 简单封装过的 [DAG 结构](https://github.com/erda-project/erda/blob/master/pkg/dag/dag.go#L27) 即可。

Pipeline 级别由推进器 [Reconciler](https://github.com/erda-project/erda/blob/master/modules/pipeline/pipengine/reconciler/define.go#L44) 根据 DAG 计算出当前可被推进的任务，各任务异步执行推进逻辑。

任务的推进则由 [TaskFramework](https://github.com/erda-project/erda/blob/master/modules/pipeline/pipengine/reconciler/taskrun/framework.go#L37) 处理，并抽象出 prepare > create > start > queue > wait 标准步骤。当任一任务推进完毕时，将再次递归调用 reconcile 方法以重复上述流程，直至流程整体执行完毕。

Reconciler 中 [通过 DAG 计算可调度任务代码如下](https://github.com/erda-project/erda/blob/master/modules/pipeline/pipengine/reconciler/scheduable.go#L27)：

```go
// getSchedulableTasks return the list of schedulable tasks.
// tasks in list can be schedule concurrently.
func (r *Reconciler) getSchedulableTasks(p *spec.Pipeline, tasks []*spec.PipelineTask) ([]*spec.PipelineTask, error) {

    // construct DAG
    dagNodes := make([]dag.NamedNode, 0, len(tasks))
    for _, task := range tasks {
        dagNodes = append(dagNodes, task)
    }
    _dag, err := dag.New(dagNodes,
        // pipeline DAG 中目前可以禁用任意节点，即 dag.WithAllowMarkArbitraryNodesAsDone=true
        dag.WithAllowMarkArbitraryNodesAsDone(true),
    )
    if err != nil {
        return nil, err
    }

    // calculate schedulable nodes according to dag and current done tasks
    schedulableNodeFromDAG, err := _dag.GetSchedulable((&spec.PipelineWithTasks{Tasks: tasks}).DoneTasks()...)
    if err != nil {
        return nil, err
    }
    ......
}
```

## ActionExecutor 插件机制
上文提到，由流水线提供灵活、一致的流程编排能力，其前提是单个任务的执行已经被很好地抽象。

在 Pipeline 中，平台对一个任务执行的抽象是 ActionExecutor：

```go
type ActionExecutor interface {
    Kind() Kind
    Name() Name

    Create(ctx context.Context, action *spec.PipelineTask) (interface{}, error)
    Start(ctx context.Context, action *spec.PipelineTask) (interface{}, error)
    Update(ctx context.Context, action *spec.PipelineTask) (interface{}, error)

    Exist(ctx context.Context, action *spec.PipelineTask) (created bool, started bool, err error)
    Status(ctx context.Context, action *spec.PipelineTask) (apistructs.PipelineStatusDesc, error)
    // Optional
    Inspect(ctx context.Context, action *spec.PipelineTask) (apistructs.TaskInspect, error)

    Cancel(ctx context.Context, action *spec.PipelineTask) (interface{}, error)
    Remove(ctx context.Context, action *spec.PipelineTask) (interface{}, error)
}
```

因此，一个执行器只需实现单个任务的创建、启动、更新、状态查询、删除等基础方法，即可注册成为一个 ActionExecutor。

恰当的任务执行器抽象，使得 Batch/Streaming/InMemory Job 的配置和使用方式完全一致，批流一体，对使用者屏蔽底层细节，做到无感知切换。在同一条流水线中，可以混用各种 ActionExecutor。

调度时，Pipeline 根据任务类型和集群信息，将任务调度至对应的任务执行器上。

当前平台支持多种 ActionExecutor：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/71b5b9dd-b11e-4fbf-85fe-1aa66cb27bcf.png)

## 用户接入层 pipeline.yaml
[pipeline.yaml](../guides/cicd-pipeline/pipeline-yml-config.html) 是 IaC 的实践，平台通过 YAML 格式描述流水线定义，基于 Stage 语法简化编排复杂度。

示例如下：

```yaml
version: "1.1"

cron: 0 */10 * * * ?

# stage 表示 阶段，多个 stage 串行成为 stages
stages:

# 一个 stage 内包含多个 并行 的 Action
- stage:
  - git-checkout: # Action 类型
      params:
        depth: 1
- stage:
  - buildpack:
      alias: backend
      params:
        context: ${{ dirs.git-checkout }}
      resources:
        cpu: 0.5
        mem: 2048
  - custom-script:
      image: centos:7
      commands: # 支持直接执行命令
      - sleep 5
      - echo hello world
      - cat ${{ dirs.git-checkout }}/dice.yml # 这里通过 ${{ dirs.git-checkout }} 语法来引用文件
```

## 以 Pipeline 为技术底座
Pipeline 作为技术底座，可向上支撑：

- DevOps：CI/CD 场景，包括 Erda 自身的持续集成和 Release 版本发布。
- 快数据：工作流编排，流批一体，支持工作流优先级队列，保证高优先级数据任务必须执行。
- 自动化测试：测试流程编排，API（出参、断言）、数据银行等不同类型的任务统一编排。
- SRE 集群运维链路。
- 提供无限扩展：基于 ActionExecutor 扩展机制和扩展市场。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/eec20458-383f-4c03-9dd0-0b263008a5f3.png)

## 开源架构升级
目前，Pipeline 所有代码均已完成开源，进行中的重构工作包括：

- 使用 Erda-Infra 微服务架构重新梳理功能模块。
- Pipeline 平台支持独立部署，UI 自动适配。
- 通过 ActionExecutor 插件机制支持使用者本地 Agent，充分利用本地资源。
- 在 GitHub 上推出 Erda Cloud Pipeline App，提供免费的 CI 能力。
