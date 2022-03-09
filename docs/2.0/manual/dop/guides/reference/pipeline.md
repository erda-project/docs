# 流水线

流水线（Pipeline）是平台自研的工作流引擎，覆盖平台所有的流水线相关任务，为平台提供强大及灵活的任务编排执行能力和动态配置能力等，具体包含 DevOps 平台的 CI/CD、快数据平台的流式计算、运维 Ops 和监控报表等。

## 功能清单

- 配置即代码，通过 [YAML 文件（pipeline.yml）](#格式规范) 描述流水线定义，基于 [Stage（阶段）](#stage) 语法简化编排复杂度。
- 可视化编辑，通过图形界面交互快速配置流水线。
- 支持任务串行或并行执行策略。
- [定时流水线](#定时流水线)，同时提供强大的定时补偿功能。
- [动态配置](#动态配置)，通过动态配置满足实现同一流水线满足不同场景需求，配置类型包含值和文件，配置内容均支持加密存储，确保数据安全性。
- 多维度重试机制和中止处理。支持从失败节点开始重试；支持全流程重试；运行中可以取消中止。
- 超时配置（任务级别）。
- 归档策略可配置（流水线级别）。
- 任务分为短任务和长任务，任务之间可传递上下文（可传递内容包含：值和文件）。
- 扩展市场，平台预置丰富的 Action 满足大部分场景的同时，能够帮助用户沉淀自己的 Action。
- 内置丰富的制品仓库，满足主流框架的编译构建需要，主要包含：Docker 镜像、Maven JARs、NPM Packages 等。
- 对外开放 OpenAPI 接口，方便第三方系统快速接入使用。
- Event 事件订阅，提供流水线级别和任务级别事件消息订阅。

## 基本元素

### Action

Action 是流水线的最小执行单元，表示一个 **任务** 或 **动作**。

一条流水线包含若干个 Action。

### Stage

Stage 表示一个 **阶段**。

一条流水线由若干个 Stage 构成，多个 Stage 之间串行顺序执行；
一个 Stage 由若干个 Action 构成，多个 Action 之间并行执行。

## 格式规范

pipeline.yml 是一个 [YAML](https://yaml.org/spec/1.2/spec.html) 格式的文件，描述了任务编排的全流程。

pipeline.yml 的字段详细说明如下：

### version

version 表示 pipeline.yml 的版本号。目前最新版本为 1.1。

只需要配置为：`version: "1.1"` 即可。

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

**策略调度说明**

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/81aee7e0-dcdc-418f-8cbe-be248be55185.png)
如图，策略目前只关心几个点

1. 是否是定时的记录(非定时任务不会被策略调度)
2. 状态是，分析完成，成功，进行中


![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/08/06/f6dd03f2-d203-4ff2-a6db-2d782eb263b4.png)

调度策略过程, 途中画的 1，2，3，4 其实就是执行记录中的版本



**支持策略配置如下**

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

YAML 示例

``` yaml
commands:
- echo "hello Action!"
- cat /etc/hosts
- sleep 10
```

#### timeout

Action 执行的超时时间。超过该时间，平台会强制停止 Action 的执行。

timeout 单位为秒, 系统默认的 timeout 为 3600（1小时）

::: details YAML 示例

```yaml
version: "1.1"
stages:
  - stage:
      - custom-script:
          alias: 自定义shell脚本
          version: "1.0"
          commands:
            - sleep 60s
          timeout: 50
```

:::

#### resources

Action 运行资源。

可配置项包括：

- cpu
- mem (单位为 MB)

流水线引擎在执行的时候会根据三个维度的cpu大小来设定cpu的limits值

- 设定的 CPU 核数较小


  这时 pipeline 自动将用户设定的值乘以一个超卖比（默认超卖比为2），如果得到值仍然小于 action 本身默认的值，pipeline 会将 CPU 的值设定为 action 本身的值。


- 设定的 CPU 核数适中


  仍然将设定的 CPU  大小乘以超卖比，如果得到的值大于 action 默认的值且没有超过 pipeline 默认的最大 CPU 值，将以该值作为 action 执行的时候的 CPU limits 值，因为通常情况下资源的 CPU 都是空闲的。


- 设定的 CPU 过大


  如果请求的 CPU 资源过大，pipeline 会自动将 action 的 CPU limits 值设定为默认的最大值（目前默认最大值为2）。

mem 的 limits 值不会进行超卖的处理，因为内存通常在服务器上是一种比较紧俏的资源，其大小将自动取用户设定的值与默认值中两个较小的值。

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

例子

循环 10000 次，每次循环间隔 10 秒
```yaml
loop:
  break: 'false' == 'true'
  strategy:
     max_times: 10000        
     interval_sec: 10 
```

当前任务如果执行失败重试
```yaml
loop:
  break: task_status == 'Success'
  strategy:
     max_times: 10000
```

*某个任务或当前任务的出参 xxx 不为 401 时候重试*
```yaml
loop:
  break: '${{ outputs.任务的alias.xxx }}' == '401'
  strategy:
     max_times: 10000
```

多条件组合判断
```yaml
loop:
  break: '1' == '2' && '1' == '3' || '1' == '3' || '${{ outputs.任务的alias.xxx }}' == '401'
  strategy:
     max_times: 10000
```

#### caches

caches 缓存

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

使用<code v-pre>${{ xxx }}</code>，中间 xxx 输入数学表达式(注意xxx前后有空格)，可以使用前置任务出参作为执行条件

目前 pipeline 执行的时候假如没有加入条件执行，那么当一个任务失败，下面的任务就会自动失败，而当下面的任务加上了条件执行，条件成立的话还是会继续执行

**内置表达式**

- task_status: 可选值 Success / Failed (注意大小写)

**配置失败重试**

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

YAML 示例

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

### 示例

YAML 示例

``` yaml
version: "1.1"

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
      version: "1.0"
      params:
        dice_yml: ${git-checkout}/dice.yml # dice.yml 文件路径
        replacement_images: # 通过 ${backend}/${frontend} 引用打包结果
        - ${backend}/pack-result
        - ${frontend}/pack-result

- stage: # 该 stage 只有一个 Action
  - dice:
      params:
        release_id_path: ${release}
```

## 定时流水线

定时流水线是指按照预先配置的执行计划，定时触发并执行的流水线。

`定时流水线 = 流水线 + 定时配置`。因此，只需在原来流水线定义上增加定时配置，即可将流水线升级为定时流水线。

定时配置 (Cron) 支持以下格式:

- 分钟级 (Linux Crontab)
- 秒级 (Spring Schedule)

具体配置见规范 [Cron 部分](#cron)。

由于 `cron` 语法无法描述从某个时间点开始的周期任务，因此在 **REST API** `POST /api/pipelines` 的请求参数中增加了 `cronStartFrom` 参数，用于指定周期任务的开始时间点。

定时流水线的补偿

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

### 某个参数的值需要动态设置

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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/d7b75bcf-eddd-4790-8d2a-35d7e55f48f6.png)

:::

### 某个参数的值不应该明文写在文件中

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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/2b25fce7-7d5a-4f57-811a-f299124f1a3b.png)

:::

### 流水线内置环境变量

流水线中在运行中含有以下环境变量

流水线环境变量
 pipeline 相关的环境变量

 ```code
 PIPELINE_CRON_EXPR
 PIPELINE_TYPE
 PIPELINE_TIME_BEGIN_TIMESTAMP
 PIPELINE_TRIGGER_MODE
 PIPELINE_STORAGE_URL
 PIPELINE_TASK_LOG_ID
 PIPELINE_TASK_NAME
 PIPELINE_ID
 PIPELINE_LIMITED_DISK
 PIPELINE_CRON_TRIGGER_TIME
 PIPELINE_DEBUG_MODE
 PIPELINE_LIMITED_MEM
 PIPELINE_TASK_ID
 PIPELINE_LIMITED_CPU
 ```

dice 相关的环境变量
 ```code
DICE_VERSION
DICE_INTERNAL_CLIENT
DICE_MEM_REQUEST
DICE_PROJECT_APPLICATION
DICE_OPENAPI_ADDR
DICE_ORG_NAME
DICE_ENV=DEV
DICE_APPLICATION_ID
DICE_CPU_ORIGIN
DICE_INSIDE
DICE_OPENAPI_PUBLIC_URL
DICE_CPU_REQUEST
DICE_NAMESPACE
DICE_IS_EDGE
DICE_PROJECT_ID
DICE_STORAGE_MOUNTPOINT
DICE_OPERATOR_ID
DICE_OPERATOR_NAME
DICE_PROTOCOL
DICE_PROJECT_NAME
DICE_MEM_ORIGIN
DICE_ROOT_DOMAIN
DICE_APPLICATION_NAME
DICE_WORKSPACE
DICE_CPU_LIMIT
DICE_ORG_ID
DICE_HTTPS_PORT
DICE_CLUSTER_TYPE
DICE_SIZE
DICE_CLUSTER_NAME
DICE_HTTP_PORT
DICE_USER_ID
DICE_MEM_LIMIT
 ```

gittar 相关的环境变量

 ```code
GITTAR_AUTHOR
GITTAR_BRANCH
GITTAR_COMMIT
GITTAR_MESSAGE
GITTAR_REPO
 ```

## 流水线表达式语法

### <code v-pre>${{ random.key }}</code>

随机表达式占位符，用户填入对应的随机表达式，流水线运行的时候会随机生成数据来替换 <code v-pre>${{ random.integer }}</code> 占位符

随机参数支持的类型如下：

integer：整型，例如 100    
string：所有字符串，例如 Abc    
float：浮点型，例如 13.14    
boolean：布尔型，例如 true/false    
upper：大写字母，例如 ABC    
lower：小写字母，例如 abc    
mobile：11位手机号，例如 18888888888   
digital_letters：数字和大小写字母，例如 Abc123   
letters：大小写字母，例如 Abc   
character：单个字符，例如 a   
timestamp：当前时间戳格式：1586917254，单位是 s   
timestamp_hour：1小时前时间戳格式：1583317290，单位是 s   
timestamp_ns：当前时间戳ns格式：1586917325230422166，单位是 ns   
timestamp_ns_hour：1小时前时间戳格式：1586913750801408626，单位是 ns   
date：当前日期、格式：2020-01-01   
date_day：1天前日期、格式：2020-01-01   
datetime：当前时间、格式：2020-01-01 15:04:05   
datetime_hour：1小时前时间、格式：2020-01-01 14:04:05

除此之外还支持还见的日期格式化：
- ${{ random.datetime_custom_ANSIC }}: `Tue Mar  8 16:33:06 2022`
- ${{ random.datetime_custom_UnixDate }}: `Tue Mar  8 16:33:06 CST 2022`
- ${{ random.datetime_custom_RubyDate }}: `Tue Mar 08 16:33:06 +0800 2022`
- ${{ random.datetime_custom_RFC822 }}: `08 Mar 22 16:33 CST`
- ${{ random.datetime_custom_RFC822Z }}: `08 Mar 22 16:33 +0800`
- ${{ random.datetime_custom_RFC850 }}: `Tuesday, 08-Mar-22 16:33:06 CST`
- ${{ random.datetime_custom_RFC1123 }}: `Tue, 08 Mar 2022 16:33:06 CST`
- ${{ random.datetime_custom_RFC1123Z }}: `Tue, 08 Mar 2022 16:33:06 +0800`
- ${{ random.datetime_custom_RFC3339 }}: `2022-03-08T16:33:06+08:00`
- ${{ random.datetime_custom_RFC3339Nano }}: `2022-03-08T16:33:06.629310528+08:00`
- ${{ random.datetime_custom_Kitchen }}: `4:33PM`
- ${{ random.datetime_custom_Stamp }}: `Mar  8 16:33:06`
- ${{ random.datetime_custom_StampMilli }}: `Mar  8 16:33:06.629`
- ${{ random.datetime_custom_StampMicro }}: `Mar  8 16:33:06.629326`
- ${{ random.datetime_custom_StampNano }}: `Mar  8 16:33:06.629330204`

以及自定义日期格式化：
- ${{ random.datetime_custom_20060102150405 }}: `20220308163306`

表达式是 "datetime_custom_" 拼接 Go 语言风格的日期格式模板。

```yaml
version: "1.1"
stages:
  - stage:
      - custom-script:
          alias: custom-script
          description: 运行自定义命令
          version: "1.0"
          commands:
            - echo ${{ random.integer }}

```

### <code v-pre>${{ outputs.alias.val }}</code>

前置任务输出值，后面的任务使用占位符获取该值

```yaml
- stage:
  - custom-script:
      alias: action1
      version: "1.0"
      commands:
        - echo "key=value" >> $METAFILE # 输出 key 值为 value 给下个任务使用
- stage:
  - custom-script:
      alias: action2
      version: "1.0"
      commands:
        - echo ${{ outputs.action1.key }} # 使用上面任务的输出值(key对应的value)
```

说明:

$METAFILE 是一个文件, 写入到这个文件是固定写法

### <code v-pre>${{ params.val }}</code>

流水线运行入参，在 yaml 文件中在 params 字段下填写多个输入框的定义，用户在运行流水线的时候就会弹出定义的输入框，输入框填入的值就会替换掉 <code v-pre>${{ params.key }}</code> 占位符

```yaml
version: "1.1"

params:
  - name: key1 # 定义输入框的 key
    required: true # 是否必填
    default: 111 # 没有输入值给的默认值
    type: int # 定义输入框的类型
  - name: key2
    required: true
    default: 111 
    type: string

stages:
  - stage:
      - custom-script:
          alias: action1
          description: 运行自定义命令
          version: "1.0"
          commands:
            - echo ${{ params.key1 }} # 替换 key1 输入框填的值
            - echo ${{ params.key2 }} # 替换 key2 输入框填的值
```

### <code v-pre>${{ dirs.alias }}</code>

每个 action 都会有个工作目录, 可以使用 <code v-pre>${{ dirs.xxx }}</code> 占位符进入和获取 action 的工作目录文件和地址

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
          description: 代码仓库克隆
          version: "1.0"
  - stage:
      - custom-script:
          alias: custom-script
          description: 运行自定义命令
          version: "1.0"
          commands:
            - echo ${{ dirs.git-checkout }} # 打印任务工作目录的地址
            - cd ${{ dirs.git-checkout }} # 进入任务的工作目录
            - ls # 打印目录下的文件
```

action 之间文件传递，每个任务只有在自己的工作目录下创建的文件才能被其他任务使用，否则产生的文件将会被丢弃，`$WORKDIR` 或者 <code v-pre>${{ dirs.xxx }}</code> 都可以获取当前任务的工作目录

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git
          description: 代码仓库克隆
          version: "1.0"
  - stage:
      - custom-script:
          alias: script1
          description: 运行自定义命令
          version: "1.0"
          commands:
            - cd ${{ dirs.git }}
            - touch test.txt # 在 action git 的工作目录下创建 test.txt 文件
            - touch test1.txt # 在 action git 的工作目录下创建 test1.txt 文件
            - cp test1.txt $WORKDIR # 将 action git 工作目录下的 test1.txt 文件拷贝到当前 action(script1) 的工作目录
  - stage:
      - custom-script:
          alias: script2
          description: 运行自定义命令
          version: "1.0"
          commands:
            - cd ${{ dirs.git }} # 进入 action git 的工作目录
            - ls # action script1 创建的 test.txt,test1.txt 文件不会存在
            - cd ${{ dirs.script1 }} # 进入 action script1 的工作目录
            - ls # test1.txt 文件可以看到，test.txt 文件丢失, 因为只有 test1.txt 文件拷贝到了 script1 的工作目录
```

::: tip 
如果使用共享目录的方案，并行任务由于执行完成顺序的不确定性，当 Stage 完成时，共享目录里最终看到的是当前 Stage 里最后一个完成的任务的改动。
:::

### <code v-pre>${{ configs.val }}</code>

获取平台流水线配置

进入 **DevOps > 我的应用 > 选择应用 > 应用设置 > 流水线 > 变量配置 > 选择环境**。

点击 **增加变量**，变量名称定义为 `TEST_CONFIG_KEY` 值为 `xxx`

```yaml
version: "1.1"
stages:
  - stage:
      - custom-script:
          alias: custom-script
          description: 运行自定义命令
          version: "1.0"
          commands:
            - echo ${{ configs.TEST_CONFIG_KEY }}
```

### <code v-pre>${{ base64-decode.xxx }}</code>

base64 解码参数

如果参数本身是一个 base64 加密过的一段内容，可以直接用base64-decode表达式将内容解码。

```yaml
version: "1.1"
stages:
  - stage:
      - custom-script:
          alias: custom-script
          description: 运行自定义命令
          version: "1.0"
          commands:
            - echo ${{ base64-decode.aGVsbG8gd29ybGQh }}
```

如果参数的值本身包含占位符，但是在执行流水线时并不想被替换掉，也可以先将内容进行 base64 加密一下，再用`base64-decode`进行解码。

## Action 输出 Meta

每个 Action 可以输出一组 Meta 表示执行过程中的一些信息，比如拉取的代码版本、制作好的镜像名等。
通过这些 Meta 可以很方便地在界面上看到 Action 的关键信息，当鼠标移动到节点上时，会展示如下图所示的界面：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/20/228b6f5e-94b1-4b50-b365-b7665cf9c7ae.png)

后续 Action 可以通过 [<code v-pre>${{ outputs.alias.val }}</code>](#outputs-alias-val) 获取并使用 Meta 信息。

Action 如何生成 Meta

Action 目前有以下几种生成方式，Action 开发者和使用者均可以使用。

### 输出日志到 STDOUT/STDERR

这是最简单的一种方式。用户只需要将 Meta 按指定格式输出到标准输出(STDOUT) 或标准错误(STDERR)。
平台会拦截这些日志，解析出 Meta 信息。

格式：
```
action meta: key=value
```

#### 解析规则

1. 获取日志行 `rawLine`
2. 删除 `rawLine` 前后的空格，得到 `polishedLine`
3. `polishedLine` 必须包含前缀 `action meta:`；否则忽略该日志行
4. `polishedLine` 删除前缀 `action meta:`，得到 `KV`
5. 以第一个 `=` 作为分隔符，将 `KV` 分隔为两部分；如果没有 `=`，则忽略该日志行
6. 得到 `K` 和 `V`
7. 删除 `K` 和 `V` 前后的空格，得到 `polishedK` 和 `polishedV`，即为最终的一个 Meta 信息

注意

- 输出日志时注意 value 不要换行，否则只能拿到换行前的 value；因为日志行是按行处理的

#### 示例

```bash
# key: image
# value: alpine:3.12
$ echo action meta: image=alpine:3.12

# key: tag
# value: 3.12
$ echo action meta: tag=3.12

# key: expr
# value: a=b=c=d
$ echo action meta: expr=a=b=c=d

# key: c
# value: dd d
$ echo action meta:c = dd d
```
结果如图所示:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/20/4410f1e2-7ff8-483a-aa26-e491c940d81f.png)

### 输出日志到 METAFILE 文件

使用者可以通过环境变量 `METAFILE` 获取到 Meta 文件的完整路径，将内容写入到该文件中即可。

文件内容支持以下两种格式:

#### 日志行

每行格式为 `k=v`，每行解析规则见 [日志行解析规则](#解析规则) 5-7条。

#### JSON 格式

这种格式的优势是支持 value 换行

```json
{
    "metadata":[
        {
            "name":"k1",
            "value":"v1"
        },
        {
            "name":"k2",
            "value":"line1\nline2\nline3"
        }
    ]
}
```
结果如图所示:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/20/6f41c1d1-8153-47b8-a62e-9ef420e4b470.png)
