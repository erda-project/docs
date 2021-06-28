# 流水线

流水线 (Pipeline) 是平台自研的工作流引擎，覆盖平台所有的流水线相关任务，为平台提供了强大及灵活的任务编排执行能力和动态配置能力等，具体包含 DevOps 平台中的 CI/CD 、快速数据平台中的流式计算、运维Ops和监控报表等。

## 功能清单

- 配置即代码，通过 [YAML 文件 (pipeline.yml)](#格式规范) 描述流水线定义，基于 [Stage (阶段)](#stage) 语法简化编排复杂度
- 可视化编辑，通过图形界面交互快速配置流水线
- 支持任务串行或并行执行策略
- [定时流水线](#定时流水线)，同时提供强大的定时补偿功能
- [动态配置](#动态配置)，通过动态配置满足实现同一流水线满足不同场景需求，配置类型包含：**值** 和 **文件**，配置内容均支持加密存储，确保数据安全性。
- 多维度重试机制和中止处理。支持从失败节点开始重试；支持全流程重试；运行中可以取消中止。
- 超时配置 (任务级别)
- 归档策略可配置 (流水线级别)
- 任务分为短任务和长任务，任务之间可传递上下文（可传递内容包含：值和文件）
- 扩展市场，平台预置丰富的 Action 满足大部分场景的同时，能够帮助用户沉淀自己的 Action
- 内置丰富的制品仓库，满足主流框架的编译构建需要，主要包含: Docker 镜像、Maven JARs、NPM Packages 等
- 对外开放 OpenAPI 接口，方便第三方系统快速接入使用
- Event 事件订阅，提供流水线级别和任务级别事件消息订阅

## 如何编写 pipeline.yml 文件

### 基本构成元素

#### Action

Action 是流水线的最小执行单元，表示一个 **任务** 或 **动作**。

一条流水线包含若干个 Action。

请参考 Action [详细文档](../actions)。

#### Stage

Stage 表示一个 **阶段**。

一条流水线由若干个 Stage 构成，多个 Stage 之间串行顺序执行；
一个 Stage 由若干个 Action 构成，多个 Action 之间并行执行。

### 格式规范

pipeline.yml 是一个 [YAML](https://yaml.org/spec/1.2/spec.html) 格式的文件，描述了任务编排的全流程。

pipeline.yml 的字段详细说明如下：

### version

version 表示 pipeline.yml 的版本号。目前最新版本为 1.1。

只需要配置为：`version: 1.1` 即可。

### envs

envs 表示全局环境变量，会注入到所有 Action 中。

envs 的典型场景为：

- 用于多个 自定义脚本 (custom-script) Action 共享环境变量

envs 格式为 `map[string]string`，比如：

``` yaml
envs:
  PLATFORM: PIPELINE
  DEBUG: true
```

### cron

定时配置。配置该字段后，在流水线界面可以操作 **定时按钮** 来启用和禁用 定时功能。

目前支持两种格式：

**分钟级 (Linux Crontab)**

`* * * * *`

示例：

- `0 3 * * *` 每天凌晨 3 点执行
- `*/2 * * * *` 每 2 分钟执行一次

**秒级 (Spring Schedule)**

`* * * * * *`

示例：

- `15 * * * * *` 在每分钟的第 15 秒执行
- `0 0 3 * * *` 每天凌晨 3 点执行

### cron_compensator

#### enable

未执行补偿策略开关，系统会根据下面的策略调度执行

- false (默认) 代表补偿是关闭的
- true 代表补偿开启

::: tip

补偿的2种类型

- `中断补偿` 平台原因导致短暂中断，在中断时间内的定时任务无法触发，流水线记录没创建, 中断补偿无法关闭
- `未执行补偿` 流水线记录已经创建，但未开始执行，这时候就需要补偿策略去调度这些记录了
:::

#### latest_first

当有多个未执行的记录的时候，从最新的记录往老记录依次执行，或者从老的记录往新的记录依次执行

- false (默认) 代表从老记录往新记录依次执行
- true 代表从新记录往老记录依次执行

#### stop_if_latter_executed

依赖 latest_first = true, 2个策略结合就是只调度最新的记录

- false (默认) 跟随 latest_first 进行策略
- true  在 latest_first 策略之上就只跑一次最新的记录

##### 策略调度说明

![依赖图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/08/06/33c82405-6bd2-4890-a18a-74e642b1ef6f.png)
如图，策略目前只关心几个点
1. 是否是定时的记录(非定时任务不会被策略调度)
2. 状态是，分析完成，成功，进行中


![调度过程](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/08/06/f6dd03f2-d203-4ff2-a6db-2d782eb263b4.png)

调度策略过程, 途中画的 1，2，3，4 其实就是执行记录中的版本



##### 支持策略配置如下

- 执行补偿，只跑最新的记录

```yaml
cron_compensator:
  enable: true
  latest_first: true
  stop_if_latter_executed: true
```

- 执行补偿，从老记录往新的记录依次执行

```yaml
cron_compensator:
  enable: true
  latest_first: false

# ----- 上面和下面配置相同

cron_compensator:
  enable: true
```

- 执行补偿，从新记录往老记录依次执行

```yaml
cron_compensator:
  enable: true
  latest_first: true
```

### stages

stages 是 pipeline.yml 的核心字段，定义了具体的一组 stage 集合，它们组成了整个流水线的执行过程。

依赖关系为：

- stages 由 stage 列表组成
- stage 由 Action 列表组成

::: details YAML 示例

``` yaml{3,7}
# stage 和 stage 之间是串行的，即前面一个 stage 执行完毕才会开始执行下一个 stage.
# 该例子中一共有 2 个 stage.
stages:

# 在一个 stage 中，多个 Actions 是并行的，不会有依赖关系;
# 该例子中，该 stage 包含 2 个并行 Action.
- stage:
  # Action1-1 是 Action 的类型，不能任意填写，需要能在扩展市场中找到该类型.
  - Action1-1:
      params:
        ...
  # Action1-2 是 Action 的类型，不能任意填写，需要能在扩展市场中找到该类型.
  - Action1-2:
      params:
        ...

# 这里定义了第二个 stage，它在第一个 stage 执行结束后才会开始执行.
# 该 stage 只有一个 Action.
- stage:
  # Action2-1 是 Action 的类型，不能任意填写，需要能在扩展市场中找到该类型.
  - Action2-1:
      params:
        ...
```

:::

### Action 配置项

Action 配置项是用来描述一个具体的 Action。

#### alias

alias 是 Action 的别名，Action 之间可以通过 alias 来进行引用，为非必填项，

未设置的时候，系统默认把 alias 设置为 Aciton 类型，

也正是因为默认值的原因，当一个类型的 Action 多次出现的时候，若不设置 alias，会导致无法正确引用 Action。

#### params

Action 的参数，主要用来定义 Action 的行为。

每个 Action 的参数都不一样，具体 Action 的参数信息请参考 [扩展市场](https://www.erda.cloud/market/pipeline) 里具体内容。

#### version

Action 的版本。

一般来说，用户不需要填写。默认会使用扩展市场里该 Action 的最新可用版本。

当用户需要使用特定版本的 Action 的时候，才需要填写该字段。

#### image

::: tip

该字段仅在 Action 类型为 custom-script 时有效。

:::

custom-script Action 运行时的镜像。

默认使用的镜像可以在 [扩展市场-自定义脚本 Action](https://www.erda.cloud/market/Action/custom-script) 里看到。

#### commands

::: tip

该字段仅在 Action 类型为 custom-script 时有效。

:::

用户声明的命令列表。

::: details YAML 示例

``` yaml
commands:
- echo "hello Action!"
- cat /etc/hosts
- sleep 10
```

:::

#### timeout

Action 执行的超时时间。超过该时间，平台会强制停止 Action 的执行。

默认为 2 小时。

#### resources

Action 运行资源。

可配置项包括：

- cpu
- mem (单位为 MB)

::: details YAML 示例

``` yaml
- git-checkout:
    params:
      ...
    resources:
      cpu: 0.5
      mem: 2048
```

:::

#### loop

Action 的循环执行策略。

可配置项包括：

- break: 退出条件
- strategy: 循环策略
  - max_times: 最大重试次数，-1 表示不限制
  - decline_ratio: 循环衰退速率
  - decline_limit_sec: 循环间隔最大值（秒）
  - interval_sec: 循环起始间隔（秒）

用公式表示循环策略：
``` text
loop_interval = min(interval_sec * (decline_ratio)^N, decline_limit_sec)

其中 N 为循环次数，从 0 开始计数。
```

#### caches

caches 缓存

[actions-caches](../actions/#用户手册)

#### if

Action 条件执行

```yaml
- stage:
  - custom-script:
      alias: script1
      version: "1.0"
      commands:
        - echo 1
        - echo "image=123" >> $METAFILE # 输出出参给下个任务使用
      if: ${{ 1==1 }}

- stage:
  - custom-script:
      alias: script2
      version: "1.0"
      commands:
        - echo 1
      if: ${{ ${{ outputs.script1.image }}==123 && ${{ outputs.script1.image }}==123 }}
```

使用 ${{ xxx }}，中间 xxx 输入数学表达式(注意xxx前后有空格)，可以使用前置任务出参作为执行条件

目前 pipeline 执行的时候假如没有加入条件执行，那么当一个任务失败，下面的任务就会自动失败，而当下面的任务加上了条件执行，条件成立的话还是会继续执行

##### 内置表达式

- task_status: 可选值 Success / Failed (注意大小写)

##### 配置失败重试

``` text
loop:
  break: task_status == 'Success' # 
  strategy:
     max_times: 5            # 最多循环5次
     decline_limit_sec: 60   # 衰退最大值，60s
     interval_sec: 5         # 起始间隔，5秒
     decline_ratio: 2        # 衰退比例为 2，即 5 -> 10(5*2) -> 20(10*2) -> 40(20*2) -> 60(40*2>60)
```

该配置同样适用于在 extension 的 spec.yml 中顶层配置。

### 上下文引用

在一条流水线中，Action 独立运行的场景很少，大多数 Action 需要拿上一个 Action 的输出作为输入。

例如：

用于编译和制作镜像的 buildpack Action 需要代码作为输入，而代码一般由 git-checkout Action 拉取。

因此在 buildpack Action 中可以使用类似 ${git-chekcout} 的语法来引用指定 git-checkout Action 命名空间里的代码仓库。

::: details YAML 示例

``` yaml
...
stages:
- stage:
  - git-checkout: # 代码仓库1
      alias: repo1
      params:
        uri: xxx
  - git-checkout: # 代码仓库2
      alias: repo2
      params:
        uri: yyy

- stage:
  - buildpack:
      params:
          code_dirs:
          - ${repo1} # 引用代码仓库1的代码
          - ${repo2} # 引用代码仓库2的代码
```

:::

### CI/CD 的一个例子

::: details YAML 示例

``` yaml
version: 1.1

# 定时配置
cron: 0 */10 * * * ?

# 环境变量, map[string]string 格式
envs:
  PLATFORM: pipeline
  ENV: production

# 关键字，表示流水线流程定义
# stage 表示 阶段，多个 stage 串行成为 stages
stages:

# 关键字，表示流水线的一个阶段
# 一个 stage 内包含多个 并行 的 Action
- stage: # 该 stage 只有一个 Action
  - git-checkout: # Action 类型
      params: # Action 参数，key/value pairs，key 为 string，value 为简单类型或任意可 JSON 序列化的结构体
        depth: 1

- stage: # 该 stage 拥有三个并行执行的 Action
  - buildpack: # Action 类型
      # 同一个类型的 Action 可以被声明多次，但是每个 Action 需要能被唯一标识，
      # 因此需要用 别名 来标识
      alias: backend
      params:
        context: ${git-checkout}/services/showcase # 使用 ${xxx} 语法来引用其他 Action 的目录地址
        modules: # value 支持复杂结构
        - name: blog-web
        - name: blog-service
          path: blog-service/blog-service-impl
        - name: user-service
          path: user-service/user-service-impl
      resources: # 预计该 Action 运行时需要分配的资源
        cpu: 0.5 # 0.5 核
        mem: 2048 # 2G 内存

  - buildpack:
      # 上面已经声明了一个 buildpack 类型的 Action，为了唯一标识，需要 alias 区分
      alias: frontend
      params:
        context: ${git-checkout}/endpoints/showcase-front
        modules:
        - name: showcase-front

  - custom-script: # custom-script 为自定义脚本类型
      image: centos:7 # 声明运行时镜像
      commands: # 声明 Commands
      - sleep 5
      - echo hello world
      - cat ${git-checkout}/dice.yml # 这里通过 ${git} 语法来 cat git Action 目录下的 dice.yml 文件

- stage: # 该 stage 只有一个 Action
  - release:
      # 指定 Action 版本，Action 可以拥有多个历史版本
      # 若不指定，则使用平台当前的稳定版
      version: 1.0
      params:
        replacement_images: # 通过 ${backend}/${frontend} 引用打包结果
        - ${backend}/pack-result
        - ${frontend}/pack-result

- stage: # 该 stage 只有一个 Action
  - dice:
      params:
        release_id_path: ${release}
```

:::

## 定时流水线

定时流水线是指按照预先配置的执行计划，定时触发并执行的流水线。

`定时流水线 = 流水线 + 定时配置`。因此，只需在原来流水线定义上增加定时配置，即可将流水线升级为定时流水线。

定时配置 (Cron) 支持以下格式:

- 分钟级 (Linux Crontab)
- 秒级 (Spring Schedule)

具体配置见规范 [Cron 部分](#cron)。

由于 `cron` 语法无法描述从某个时间点开始的周期任务，因此在 **REST API** `POST /api/pipelines` 的请求参数中增加了 `cronStartFrom` 参数，用于指定周期任务的开始时间点。

#### 定时流水线的补偿

具体策略配置见规范 [cron_compensator 部分](#cron-compensator)。

::: tip 常见原因

需要补偿的原因很多，比如：

- 定时间隔不合理，导致新的流水线定时触发时，仍有正在运行中的流水线实例（未执行补偿）
- 平台升级导致的短暂中断，定时触发时间恰好在中断时间内，导致流水线实例未能按时执行（中断补偿）

:::

## 代码更新触发流水线

当配置对应规则的分支代码被更新时，会自动创建当前分支的流水线并执行

配置参数作为顶级pipeline参数

::: details YAML 示例

```yml
version: "1.1"
on:
  push:
    branches:
      - develop
      - feature/*
stages:
...
```

:::

## 动态配置

流水线拥有独立的配置管理体系。

流水线配置从类型上分为 **值** 和 **文件** 两类。

两种类型均支持 **明文存储** 和 **加密存储**，保证数据安全。

动态配置使得 pipeline.yml 模板化成为现实，同一份流程定义文件，通过不同配置可以实现截然不同的行为。

同时，**加密配置** 使得用户在 pipeline.yml 中无需存储明文，更加安全。

DevOps 平台中流水线配置入口位于：

> DevOps 平台 -> 我的应用 -> 应用 A -> 应用设置 -> 流水线 -> 变量配置

#### 某个参数的值需要动态设置

示例：buildpack-Action 里打包需要感知环境，不同的环境使用不同的 profile 进行构建。

::: details YAML 示例

``` yaml
...
stages:
- stage:
  - buildpack:
      params:
        bp_args:
          MAVEN_EXTRA_ARGS: ((maven.profile)) # maven 编译时可以动态设置 profile
...
```

可以在 **默认设置** 里设置默认值，并且针对不同分支设置不同的值。

例如配置：

``` config
default:
maven.profile = dev

master:
maven.profile = prod
```

![界面配置](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/01/e172f0cf-543d-4c70-b5f8-6136f9370b5f.png)

:::

#### 某个参数的值不应该明文写在文件中

例如：git-checkout Action 拉取一个需要鉴权的 git repo 时，需要用到 username 和 password。

::: details YAML 示例

``` yaml
...
stages:
- stage:
  - git-checkout:
      params:
        uri: http://git.terminus.io/xxx/yyy.git
        username: ((your.username))
        password: ((your.password))
...
```

![界面配置](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/01/aa6bd69c-eb5a-47c2-832c-addaa891f33c.png)

:::


