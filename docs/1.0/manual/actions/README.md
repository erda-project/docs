# Actions

Action 是 流水线 Pipeline 的最小运行单元。

在服务市场中，平台内置了许多强大的 Action，涵盖 代码管理、构建管理、部署管理、版本管理、测试管理、数据治理等方面，开箱即用。

## 设计理念

### 使用简单

用户只需要配置几个必要的参数就可以轻松地使用 Action，无需手写大量脚本来实现指定功能。

Action 对用户隐藏了具体实现，用户只需关注功能。

### 可编排组合

有些复杂场景，无法由单一 Action 来完成。此时，可以通过流水线任务编排，利用多个 Action 的能力，共同解决复杂场景问题。

比如，DevOps 中的一个 Java 应用的 CI/CD 场景，可以组合使用 `git-checkout`、`java`、`release`、`deploy` 来实现。

### 快速开发

平台定义一整套开发规范，开发者可以基于此快速开发 Action。

## 用户手册

### 使用 caches 加速构建

例子:

```yaml
- java-build:
      version: "1.0"
      params:
        build_cmd:
          - mvn install
        jdk_version: "8"
      caches:
        - path: /root/.m2/repository
```

```yaml
- js-build:
      version: "1.0"
      params:
        build_cmd:
          - cnpm i
      caches:
        - key: '{{basePath}}/master/{{endPath}}'
          path: ${git-checkout}/node_modules
```

caches 是个数组对象

path: 指定目录进行缓存，下次构建会使用这次缓存的数据，path 只能是绝对路径(以 / 开头)，或者是 dice 中构建路径 ${} (也是绝对路径)

key: 没有指定 key 的时候，系统会自动生成一个 key, 当缓存发生冲突的时候用户就需要自定义 key 了，key 需要以 {basePath} 开头和 {endPath} 结尾 (还缺一个 {}), 中间路径用户可以自定义


**为什么会发生冲突**

默认缓存是以 `/appId/projectId/hash(path)` 来进行存储，所以同一个项目中的同一个路径会发生冲突

### 如何使用

有两种推荐的使用方式。

方式一：

在服务市场中根据功能搜索想要使用的 Action，将其中的代码片段粘贴到 pipeline.yml 对应位置。

方式二：

使用图形化界面选择 Action。入口为：

> DevOps 平台 -> 我的应用 -> 应用 A -> 代码仓库 -> pipeline.yml 文件 -> 图形化编辑

## 开发者手册

### 以镜像做交付

Action 的交付产物是一个 Docker 镜像。开发者只需要在镜像中提供一个可执行文件（`/opt/action/run`），并且提前赋予执行权限（`chmod +x`）。

流水线执行时，会使用该镜像创建一个 Docker 容器，并且调用 `/opt/action/run` 文件，运行开发者定义好的逻辑。

因此，Action 可以使用任何语言进行开发。

一个最简单的 echo Action 的 Dockerfile 如下：

```Dockerfile
FROM alpine
WORKDIR /opt/action
RUN echo -e "#!/bin/sh" > /opt/action/run && \
    echo -e "echo \${ACTION_WHAT-'Nothing I can echo :('}" >> /opt/action/run && \
    chmod +x /opt/action/run
```

### 平台提供的能力

Action 在运行时，可以使用平台注入的一些 **环境变量** 来进行特殊的处理。

#### 文件输出

平台使用环境变量 **WORKDIR** 为当前 Action 运行时实例分配的工作目录。

放置在该目录下的所有文件和目录，在 Action 运行结束后会由平台统一处理，后续任务通过流水线上下文引用语法引用到其中的文件。

例如，某 Action 的逻辑是在 WORKDIR 生成了一个 hosts 文件，则后续任务都可以通过文件引用语法来引用该文件。

#### 值输出

平台提供了两种值输出的方式。

后续任务可以通过值引用语法来引用该值。

##### 通过环境变量 METAFILE

开发者可以通过该环境变量拿到 meta 文件，该文件已由平台预创建完毕。

开发者只需往该文件追加内容，每行一组键值对，格式为 `key=value`。

##### 直接打印指定格式日志

平台为开发者提供了一种更简便的方式：

直接打印指定格式的日志至标准输出(stdout) 或标准错误(stderr)，格式为：`action meta: key=value`。

注意，`action meta` 前面不允许有其他字符。否则不会被认为是 meta 日志。
