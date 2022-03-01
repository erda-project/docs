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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/68bd9aa1-9f1c-4914-b69f-1b2ea193310c.png)

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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/04622e37-309d-452e-884e-b7199154d877.png)

点击右上角的新建流水线按钮，Erda 会为该流水线创建一条流水线实例，点击执行按钮（下图中红圈标注处）开始执行该流水线实例。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/434c3dcd-0a0d-40d2-8410-44953488677c.png)

流水线执行过程中，可实时查看流水线各步骤的执行状态，点击日志图表可查看对应节点执行状况的日志信息。

流水线执行成功后，点击 release action 上的超链接，可以进入制品详情页面查看制品信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/203c45fe-72e9-4be1-bf46-54d4dd9d1afd.png)

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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/a4498006-f3af-4544-8204-ce76b6a6e642.png)

### 正式发布

通过测试后需要发布正式制品。点击 Release Action 上的超链接，跳转至制品详情页面，点击转正式按钮，在弹出的确认对话框中点击确定即成功转为正式制品。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/fa05cbf0-a9ae-4d17-a6fc-fc606b208cae.png)

或者在 **DevOps > 项目 > base-project > 应用中心 > 制品** 中通过筛选或搜索找到刚才创建的制品，在操作栏中点击转为正式版。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/b12f0fb8-57cf-4fd8-8458-3ab55e54e169.png)

正式制品一经创建就不能修改，包括删除、编辑、转正。

## 部署

制品制作完成后，您可以进入 **应用中心 > 环境部署 > 部署**，选择对应的环境，实施部署。

### 资源配额

在执行部署操作前，您需要确认该项目目标环境下的资源配额是否满足本次部署的要求。  

请进入 **DevOps > 项目 > 项目设置 > 项目配额** 查看配额。更多资源管理相关的内容，请参考 [资源管理](../guides/deploy/resource-management.html)。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/dbc2bac6-108e-4402-bef7-cea1e40384b3.png)

### Addon 部署

[自定义类型的 Addon](../guides/deploy/addon-custom.html) 需要在部署前准备完成。

请进入 **DevOps > 项目 > 应用中心 > 环境部署 > Addons**, 点击添加服务，选择 `Custom` 并配置所需信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/13be9e0b-1983-4a7c-90f5-0c210e748bd6.png)
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/250afbbf-af0f-4386-bcf9-be4fa174f10a.png)

### 部署配置

请进入 **DevOps > 项目 > 应用中心 > 环境部署 > 配置**，修改您部署所需要的配置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/8a6c030a-5f82-44b4-b064-1edf26a3ad62.png)

:::tip 提示
部署完成后再次对配置修改，需要重启服务或重新部署才可以生效。
Erda 提供了多种配置对方式，请参考 [配置](../guides/deploy/config.html)。
:::

### 实施部署

在资源以及配置准备就绪后，您可以进入 **DevOps > 项目 > 应用中心 > 环境部署 > 部署** 实施部署操作。

选择对应的环境，选择您期望部署的制品并创建部署。

:::tip 提示
创建部署时会对制品在当前环境的部署行为进行前置校验，请按照提示修改。
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/e5140066-dcbf-440c-86d4-2e8a3a2393e6.png)

点击开始部署后，会按照制品中的分组编排依次执行部署操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/a19f3d1d-9ca6-43f3-82ad-817c62cc30df.png)

部署过程中您可以点击部署记录查看当前部署的进度。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/147d9172-7266-44c5-903f-02756b5d839b.png)

等待部署完成即可，更多部署操作请参考 [部署管理](../guides/deploy/deploy-order.html)。