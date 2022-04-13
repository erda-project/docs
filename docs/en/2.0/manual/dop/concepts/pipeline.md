# pipeline.yml

Erda pipeline, written in Go, is an enterprise-level pipeline service developed by Terminus. Why develop a pipeline by self:

- As for now, there is no standard for pipeline in the open source community.
- Jobs such as K8s and DC/OS cannot meet actual business needs.
- It is easier and faster to respond to business needs and carry out customized development.

As a basic service, pipeline supports CI/CD, fast data process, automated testing, operation and maintenance on Erda. This article will introduce from the following aspects.

## Origin
It starts with application building, and is developed from Packer and CI.

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/a3100f52-404b-4a8a-a418-ee600d9cf283.png)

### Packer
Erda is a PaaS platform used internally by Terminus originally. Since 2017, Erda has managed all R&D projects of the company. Each application under projects follows the standard process of "code > compile > image > deploy". Packer is developed as a component responsible for packaging. User needs to provide Dockerfile with pretty high learning cost.

### CI
With the popularity of CI/CD (continuous integration and continuous delivery) concept, the platform releases an upgraded version of Packer, that is CI. Meanwhile, the concept of Infrastructure as Code (IaC) is also implemented here, to declare the microservice architecture and building process of application with dice.yml.

For user experience, the platform shields Dockerfile and provides best practices in the form of BuildPack. Users can run the CI/CD process by the automatic detection and identification of BuildPack.

### Pipeline
As CI/CD itself is a standard process, the platform abstracts a more general process engine, namely pipeline. 

The platform makes the following improvements:

- External: Reduces the learning cost with simple and clear grammar of pipeline.yaml.
- Internal: Abstracts the task definition and combines with ActionExecutor plugin mechanism docking with various single-task platforms, such as DC/OS metronome, K8s job, Flink/Spark job, etc.
- Supports powerful process orchestration by pipeline.

## Features
Pipeline provides various flexible and powerful features, such as:

- Configuration as code, to describe process by pipeline.yaml and simplify orchestration based on the stage grammar.
- Rich addons, with over 100 built-in actions provided by Erda that is scalable and out of box, to meet needs of most scenarios.
- Visual editing, to configure pipeline in graphical interface.
- Nested pipelines, to reuse at the pipeline level to create more powerful ones.
- Flexible execution strategies, including parallelism, loop, branch strategy, timeout, manual confirmation, etc.
- Workflow queue, with the priority adjustable in real time to ensure the execution of pipelines with high priority.
- Multiple retry mechanism, for both breakpoint and whole process.
- Timing pipeline, with powerful timing compensation supported.
- Dynamic configuration, for types of value and file, with encrypted storage supported to ensure data security.
- Context passing, as the post task can refer to the value and file of the predecessor one.
- OpenAPI interface, to enable quick access for third-party systems.

## Architecture
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/17/b9bf907a-776a-4ffe-b2af-8b85396769dc.png)

Pipeline supports multiple interactions such as UI, OpenAPI and CLI, as well as horizontal expansion to ensure high availability. It can be divided into service layer, core layer and engine layer.

### Service Layer
- The yaml parser supports flexible variable grammar, such as context value reference <code v-pre>${{ outputs.preTaskName.key }}</code>, configuration management reference <code v-pre>${{ configs.key }}</code>, etc.
- Dock with addon market to obtain expansion capabilities.

### Core Layer
- Cron daemon.
- EventManager abstracts internal event sending and decouples monitoring indicator reporting, sends WS messages and supports Webhook in adapter mode.
- AOP extension mechanism exposes the key nodes of code, making it easy for developers to customize pipeline without modifying the core code.

At present, most functions are achieved by the extension mechanism, such as the nested generation of automated testing reports and the cookie retention of API testing.

<img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/15a5d020-19d3-492a-9797-10aebd7902ca.png" style="zoom:50%;" />

### Engine Layer
- Reconciler
- Priority queue manager
- Task executor plugin mechanism

### Dependency
- Uses MySQL for data persistence.
- Uses etcd watch for multi-instance status synchronization and distributed locking.
- Uses etcd key ttl for data defer GC.

## How to Advance Pipeline
On the engine side, pipeline.yaml is parsed into DAG (Directed Acyclic Graph) structure.

In other words, the engine does not care about the pipeline.yaml grammar. There can be a variety of grammars for different users as long as these grammars can be converted into [DAG structure](https://github.com/erda-project/erda/blob/master/pkg/dag/dag.go#L27) that is simply encapsulated by pipeline.

At the pipeline level, [Reconciler](https://github.com/erda-project/erda/blob/master/pkg/dag/dag.go#L27) figures out the tasks that can be advanced according to the DAG, and each task executes the advancing logic asynchronously.

[TaskFramework](https://github.com/erda-project/erda/blob/master/modules/pipeline/pipengine/reconciler/taskrun/framework.go#L37) processes task advancement and abstracts the standard process of prepare > create > start > queue > wait. Once any task is advanced, it will run for recursion with reconcile to repeat the process above until the entire process is completed.

[The code of schedulable task figured out by DAG](https://github.com/erda-project/erda/blob/master/modules/pipeline/pipengine/reconciler/scheduable.go#L27) in Reconciler is asfollows:

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
        // Any node can be disabled in the pipeline DAG, i.e. dag.WithAllowMarkArbitraryNodesAsDone=true
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

## ActionExecutor Plugin Mechanism
As mentioned above, pipeline supports flexible and powerful orchestration with the premise that the execution of a single task is well abstracted.

In pipeline, the abstraction for a task execution is ActionExecutor:

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

Thus an executor can register as ActionExecutor by carrying out basic operations such as creation, start, update, status query and deletion of a single task.

Appropriate abstraction of task executor makes the configuration and usage of batch/streaming/InMemory job completely consistent and shields the underlying details from users to achieve non-perceptual switching. Various ActionExecutors can be applied in the same pipeline.

Pipeline runs scheduling of tasks to the corresponding task executors according to the task type and cluster information.

The platform supports multiple ActionExecutors:

<img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/71b5b9dd-b11e-4fbf-85fe-1aa66cb27bcf.png" style="zoom:50%;" />

## pipeline.yaml in User Access Layer
[pipeline.yaml](../guides/cicd-pipeline/pipeline-yml-config.html) is the practice of IaC. The platform describes the pipeline definition in YAML format, and simplifies orchestration based on the stage grammar.

An example is as follows:

```yaml
version: "1.1"

cron: 0 */10 * * * ?

# stage means a stage, and multiple stages in serial are stages
stages:

# A stage contains multiple parallel actions
- stage:
  - git-checkout: # Action type
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
      commands: # Support executing commands directly
      - sleep 5
      - echo hello world
      - cat ${{ dirs.git-checkout }}/dice.yml # Here the file is referenced by the ${{ dirs.git-checkout }} syntax
```

## Pipeline as Technical Base
As the technical base, pipeline supports the following:

- DevOps: CI/CD, including continuous integration and release of Erda.
- Fast data: Workflow orchestration and workflow queue supported to ensure the execution of pipelines with high priority.
- Automated testing: Testing process orchestration, and task orchestration of different types such as API (output parameter, assertion), data bank, etc.
- Operation and maintenance by SRE.
- Unlimited expansion: Expansion mechanism and addon market based on ActionExecutor.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/17/a6f7a018-7a84-428a-88b8-a69af9ca7b63.png)

## Architecture Upgrade
All codes are open source and refactoring tasks in process includes:

- Reorganizes function modules with Erda-Infra microservice architecture.
- Supports independent deployment of the platform and auto adaptation of UI.
- Supports local agent with ActionExecutor plugin mechanism to make full use of local resources.
- Releases an app of Erda Cloud pipeline on GitHub to provide free CI.
