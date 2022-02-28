# 制品的创建和部署

## 从代码到制品

### 上传代码

新建项目名为 base-project，新建应用名为 go-web（详情请参考 [项目和应用创建](../../quick-start/newbie.html#加入项目) ）。

以一个简单的 Go 语言 Hello World 服务为例。

在本地新建 go-web 文件夹，并在该文件夹中创建 `main.go` 文件，写入以下内容：

```go
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

初始化 Go 的包管理：

```bash
go mod init github.com/erda/go-web
```

初始化 Git 仓库：

```bash
git init
git add .
git commit -m "initialize"
```

将 Erda 平台的代码仓库地址添加到本地并推送。可以在 **DevOps > 项目 > base-project > 应用中心 > 应用 > go-web** 页面上，点击右上角的仓库地址按钮查看该代码仓库的地址、账号和口令。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/ce433206-97e9-456f-95c8-f9b669aa0d38.png)

```bash
git remote add erda <your-url>
git push -u erda --all
git push -u erda --tags
```

### 创建流水线

在之前创建的本地 go-web 文件夹中，创建 `pipeline.yml` 文件，写入以下内容。`pipeline.yml` 文件是描述从代码编译构建到应用部署的流水线配置文件，关于 pipeline.yml 的更多信息请参考 [pipeline.yml](../guides/reference/pipeline.html) 。

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - golang:
          alias: go-demo
          params:
            command: go build -o go-web main.go
            context: ${git-checkout}
            service: web-server
  - stage:
      - release:
          alias: release
          params:
            dice_yml: ${git-checkout}/erda.yml
            image:
              go-demo: ${go-demo:OUTPUT:image}
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}

```

在本地的 go-web 文件夹中创建 `erda.yml` 文件，写入以下内容。`erda.yml` 文件用于描述应用所需的资源大小、副本数量等，关于 `erda.yml` 的更多信息请参考 [erda.yml](../guides/reference/erda-yaml.html) 。

```bash
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

提交文件：

```bash
git add .
git commit -m "add pipeline.yml and erda.yml"
git push erda
```

### 执行流水线

在 go-web 应用页面中，点击上方流水线标签，进入应用流水线页面。可以看到在 master 分支下有一个默认流水线，这就是刚才创建的 `pipeline.yml` 文件解析后的流水线。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/b47d647a-f556-4676-8de8-805618745f6f.png)

点击右上角的新建流水线按钮，Erda 会为该流水线创建一条流水线实例，点击执行按钮（下图中红圈标注处）开始执行该流水线实例。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/1a6678ac-9fc8-48e7-a129-3846c3b1a447.png)

流水线执行过程中，可实时查看流水线各步骤的执行状态，点击日志图表可查看对应节点执行状况的日志信息。

流水线执行成功后，点击 release action 上的超链接，可以进入制品详情页面查看制品信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/f5acc3dc-a402-4ac1-b9cd-bd72c0981e32.png)

## 交付制品

按照上面的步骤创建的制品是临时制品，不能在制品管理页面上找到，且可能会被垃圾回收。关于制品类型的详细描述以及制品的操作请参考 [制品](../guides/deploy/release.html) 。

临时制品不适合用于交付，只适用于开发者临时部署自测。开发者完成自测后需要将制品交付给测试者进行测试，此时需要发布非临时制品。本节介绍如何创建非临时制品。

### 交付测试

在本地的 go-web 文件夹中，创建 release 分支，这里创建 release/1.0 分支：

```bash
git checkout -b release/1.0
```

对代码进行一些修改，例如，将 `main.go` 文件中的 "Hello World！" 改为 "Hello Erda!" ，然后提交文件：

```bash
git add .
git commit -m "release 1.0"
git push --set-upstream erda release/1.0
```

此时在流水线页面中就可以看到 feature/1.0 分支，按照和上面同样的步骤执行该分支下的流水线。执行成功后获得的制品为非临时制品。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/22ce3fb5-26ca-4ea8-936b-607113821298.png)

### 正式发布

通过测试后需要发布正式制品。点击 Release Action 上的超链接，跳转至制品详情页面，点击转正式按钮，在弹出的确认对话框中点击确定即成功转为正式制品。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/f513eb9a-19cf-4192-a939-65a17c0c2171.png)

或者在 **DevOps > 项目 > base-project > 应用中心 > 制品** 中通过筛选或搜索找到刚才创建的制品，在操作栏中点击转为正式版。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/5c58a9bf-feb0-4187-b591-13dea7f930ee.png)

正式制品一经创建就不能修改，包括删除、编辑、转正。