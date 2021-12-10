# 流水线配置（文本）

## 编辑流水线
进入 **DevOps 平台 > 我的应用 > 选择应用 > 流水线 > 选择分支**，点击编辑图标并切换至文本编辑模式。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/86d13308-677c-4c5e-9772-b68871864b30.png)

## 编写 pipeline.yml

pipeline.yml 是一个 [YAML](https://yaml.org/spec/1.2/spec.html) 格式的文件，其基本语法规则如下：

- 使用缩进表示层级关系。
- 缩进不允许使用 Tab 键，仅允许使用空格。
- 缩进空格数目不做要求，仅需相同层级的元素左侧对齐即可。

YAML 语法中的对象是一组键值对，使用冒号结构表示。

 ``` yaml
 version: "1.1"
 ```

一组连字符开头的行构成一个数组，例如：

``` yaml
stages
 - stage
 - stage
 - stage
```


数据结构的子成员是一个数组，则可在该项下缩进一个空格。

``` yaml
stages
 - stage
    - action
    - action
 - stage
    - action
    - action
 - stage
    - action
    - action
```

一个 Stages 下包含多个 Stage，因此在编辑流水线文本时，需将 Stage 当作数组而非对象。同理 Stage 下包含多个 Action。

### 配置 Version
Version 表示 pipeline.yml 的版本号。目前最新版本为 1.1，则配置为 `version: "1.1"` 即可。

初始化 pipeline.yml：

``` yaml
version: "1.1"
stages:[]
```

### 配置 Stages
Stages 由 Stage 列表组成。Stage 表示一个阶段， 其中至少存在一个 Action。Action 是流水线的最小执行单元，表示一个任务或动作。

Stages、Stage 和 Action 的关系如下所示：

``` yaml
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

### 配置 Action

* **alias**

  alias 是 Action 的别名，且不可重复。

* **version**

  Action 的版本。

* **params**

  Action 的参数，主要用于定义 Action 的行为。

  每个 Action 的参数各不相同。关于 Action 更多信息，请参见 [扩展市场](https://www.erda.cloud/market/pipeline)。

* **resources**

  Action 运行资源，可配置项包括：
  * CPU

  * Mem（单位为 MB）

    ```yaml
    - git-checkout:
        params:
          ...
        resources:
          cpu: 0.5
          mem: 2048
    ```

* **上下文引用**

  在一条流水线中，少有 Action 独立运行的场景，多数 Action 需以上一个 Action 的输出作为输入。

  例如，用于编译和制作镜像的 buildpack Action 需要代码作为输入，而代码一般由 git-checkout Action 拉取。因此在 buildpack Action 中可使用类似 ${git-chekcout} 的语法引用指定 git-checkout Action 命名空间里的代码仓库。

  ```yaml
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

* **Action 示例**

  ```yaml
  version: "1.1"
  stages:
    - stage:
        - git-checkout:
            alias: git-checkout
            version: "1.0"
            params:
              branch: ((gittar.branch))
              password: ((gittar.password))
              uri: ((gittar.repo))
              username: ((gittar.username))
            resources:
              cpu: 0.53
              mem: 1024
  ```

### 配置 on push

Push 代码时将触发所有包含 on push 的 pipeline。

``` yaml
version: "1.1"
"on":
  push:
    branches:
      - master
      - develop
      - feature/*
stages:
  - stage:
      - custom-script:
          alias: custom-script
          version: "1.0"
          commands:
            - echo "hello world"
```

### 配置 on merge

从 develop 分支合并至 master 分支。

develop 中包含 on merge 的 pipeline 可触发，master 中包含 on push 的 pipeline 亦可触发。

``` yaml
version: "1.1"
"on":
  merge:
    branches:
      - master
      - develop
      - feature/*
stages:
  - stage:
      - custom-script:
          alias: custom-script
          version: "1.0"
          commands:
            - echo "hello world"
```

提交合并请求将触发 check run。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9bdbb705-35e4-4bab-bb6a-5622df894ec8.png)

check run 将查看流水线结果，若流水线运行失败则 check run 失败。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/460e8019-0b9c-480d-b925-539662be6d8d.png)

流水线运行成功则 check run 成功。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9af6c5c1-689b-4cc4-ad81-261d28706b24.png)

