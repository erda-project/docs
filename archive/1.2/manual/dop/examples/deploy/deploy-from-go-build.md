# 部署一个 Go Web 程序

着手应用部署前，请确认已完成 [项目和应用创建](../../../quick-start/newbie.html#加入项目)。

:::tip 提示

假设新建项目名为 base-project，新建应用名为 go-web。下文 Git 仓库地址将涉及这两个名字。

:::


## 准备示范代码

示范代码是一个 Golang 的简单 Web 服务，仅需输出 `Hello, World!` 即可。

新建文件夹并创建 main.go 文件，写入如下信息：

```code
package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello World!")
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

初始化 Go 应用的包管理：

```
go mod init github.com/erda/go-web
```

:::tip 提示

Erda 平台上可部署运行任意语言、任意框架开发的代码，并不局限于 Go、 Java 等。

:::

在本地初始化 Git 仓库并提交：

```bash
git init
git add .
git commit -m "initialize"
```

平台基于标准的 Git 协议内置 Git 代码仓库，您无需依赖于外部仓库（例如 GitLab 等）即可完成从源码开发到部署的全流程。

进入 **DevOps 平台 > 我的应用 > 选择应用 > 代码仓库 > 代码浏览 > 仓库地址**，查看平台远程仓库服务器地址。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/d8be2930-db24-40f2-8b62-97c140c2cc41.png)

```bash
git remote add erda https://erda-org.erda.cloud/wb/base-project/go-web
git push -u erda --all
git push -u erda --tags
```

## 定义流水线
为该示范代码工程添加平台配置文件 pipeline.yml 和 erda.yml。

### pipeline.yml

pipeline.yml 是描述从代码编译构建到应用部署的流水线配置文件，一般可设为 4 个 Stage，按照书写顺序依次执行：

1. 拉取 Git 源码。
2. 基于源码编译、构建，制作 Docker 镜像。
3. 生成版本产物。
4. 基于版本产物完成部署。

4 个 Stage 可分别以下列 Action 执行：

1. [Git-Checkout](https://www.erda.cloud/market/action/git-checkout)
2. [Java](https://www.erda.cloud/market/action/java)
3. [Release](https://www.erda.cloud/market/action/release)
4. [Erda](https://www.erda.cloud/market/action/dice)

该示例工程对应的 pipeline.yml 参考如下，更多信息请参见 [Pipeline](../../guides/reference/pipeline.html)。

```yml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - golang:
          alias: go-demo
          params:
            command: go build -o web-server main.go
            context: ${git-checkout}
            service: web-server
  - stage:
      - release:
          alias: release
          params:
            dice_yml: ${git-checkout}/dice.yml
            image:
              go-demo: ${go-demo:OUTPUT:image}
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

### erda.yml

erda.yml 用于描述应用所需的资源大小、副本数量等。

该示例工程对应的 erda.yml 参考如下，更多信息请参见 [erda.yml](../../guides/reference/erda-yaml.html)。

```yml
version: "2.0"
services:
  go-demo:
    ports:
      - port: 8080
        expose: true
    resources:
      cpu: 0.2
      mem: 512
    deployments:
      replicas: 1
```

### 提交文件

将新增的两个 yaml 文件提交至平台的代码仓库。

```bash
git add .
git commit -m "add pipeline.yml and dice.yml"
git push erda
```

## 执行流水线

1. 进入 **流水线** 页面，点击右上角 **新建流水线**。
2. 完成流水线任务分析后，流水线处于待执行状态。点击右上角执行图标，开始流水线构建。
3. 流水线任务执行过程中，可实时查看流水线各步骤的执行状态，点击日志可查看对应节点执行状况的日志信息。

## 查看部署结果

通过流水线构建源码并完成部署后，可在部署中心查看已成功部署的应用实例 Runtime。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/73570275-0bfb-46e9-920f-5a628c431360.png)

点击 **master** 进入应用管理，可进一步进行配置域名、服务实例扩缩容等操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/eafe8179-6751-434a-bf50-a8cd6a566f11.png)

复制实例 IP 地址至浏览器，加上应用服务的端口 8080 即可看到“Hello,World!”。

