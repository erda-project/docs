# 制品创建和部署

## 从代码到制品

### 上传代码

新建一个项目命名为 base-project，新建一个应用命名为 go-web（具体请参见 [项目和应用创建](../../quick-start/newbie.html#加入项目)）。

此处以一个简单的 Go 语言 Hello World 服务为例。

在本地新建 go-web 文件夹，并在该文件夹中创建 main.go 文件，写入如下信息：

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

将 Erda 平台的代码仓库地址添加至本地并推送。

您可以进入 **DevOps 平台 > 项目 > base-project > 应用中心 > 应用 > go-web > 仓库地址**，查看该代码仓库的地址、账号和口令。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/68bd9aa1-9f1c-4914-b69f-1b2ea193310c.png)

```bash
git remote add erda <your-url>
git push -u erda --all
git push -u erda --tags
```

### 创建流水线

pipeline.yml 文件是描述从代码编译构建到应用部署的流水线配置文件，更多信息请参见 [pipeline.yml](../guides/reference/pipeline.html)。

在本地的 go-web 文件夹中创建 pipeline.yml 文件，写入以下内容：

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

erda.yml 文件用于描述应用所需的资源大小、副本数量等，更多信息请参见 [erda.yml](../guides/reference/erda-yaml.html)。

在本地的 go-web 文件夹中创建 erda.yml 文件，写入以下内容：

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

进入应用的流水线页面，Master 分支下的默认流水线即由 pipeline.yml 文件解析而成。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/04622e37-309d-452e-884e-b7199154d877.png)

点击右上角 **新建流水线**，平台将为该流水线创建一条流水线实例。随后点击执行按钮，执行该流水线实例。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/434c3dcd-0a0d-40d2-8410-44953488677c.png)

流水线执行过程中，可实时查看流水线各步骤的执行状态，点击日志图标可查看对应节点执行状况的日志信息。

流水线执行成功后，点击 Release Action 上的链接，可进入制品详情页查看制品信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/203c45fe-72e9-4be1-bf46-54d4dd9d1afd.png)

## 交付制品

按上述步骤创建的制品为临时制品。关于制品的分类及更多信息，请参见 [制品](../guides/deploy/release.html)。

临时制品不适用于交付，仅适用于开发工程师临时部署自测。开发工程师完成自测后，需将制品交付至测试工程师进行测试，以发布非临时制品。下文将为您介绍如何创建非临时制品。

### 交付测试

在本地的 go-web 文件夹中，创建 Release 分支，此处以 release/1.0 分支为例：

```bash
git checkout -b release/1.0
```

修改代码，例如将 main.go 文件中的 "Hello World!" 改为 "Hello Erda!" ，随后提交文件：

```bash
git add .
git commit -m "release 1.0"
git push --set-upstream erda release/1.0
```

此时的流水线页面将显示 release/1.0 分支。执行该分支下的流水线，执行成功后得到的制品即为非临时制品。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/a4498006-f3af-4544-8204-ce76b6a6e642.png)

### 正式发布

测试通过后需发布正式制品。

点击 Release Action 上的链接跳转至制品详情页，点击 **转正式** 将其转为正式制品。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/fa05cbf0-a9ae-4d17-a6fc-fc606b208cae.png)

您也可以进入 **DevOps 平台 > 项目 > base-project > 应用中心 > 制品**，将目标制品转为正式版。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/b12f0fb8-57cf-4fd8-8458-3ab55e54e169.png)

正式制品一经创建将无法修改，包括删除、编辑或转正。

## 部署

完成制品创建后，您可以进入 **应用中心 > 环境部署 > 部署**，选择对应的环境以实施部署。

### 资源配额

在执行部署操作前，请先确认该项目目标环境下的资源配额是否满足部署要求。

请进入 **DevOps 平台 > 项目 > 项目设置 > 项目配额** 查看配额。更多资源管理相关内容，请参见 [资源配额](../guides/deploy/resource-management.html)。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/dbc2bac6-108e-4402-bef7-cea1e40384b3.png)

### 部署 Addon

[自定义类型的 Addon](../guides/deploy/addon-custom.html) 需在部署前准备完成。

进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署 > Addons**，点击 **添加服务**，选择 **三方服务** 为 **Custom**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/13be9e0b-1983-4a7c-90f5-0c210e748bd6.png)

按需配置信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/250afbbf-af0f-4386-bcf9-be4fa174f10a.png)

### 部署配置

进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署 > 配置**，按需修改配置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/8a6c030a-5f82-44b4-b064-1edf26a3ad62.png)

:::tip 提示

若完成部署后再次修改配置，则新配置需重启服务或重新部署方可生效。

Erda 提供多种配置方式，具体请参见 [配置](../guides/deploy/config.html)。

:::

### 实施部署

资源及配置准备就绪后，您可以进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署 > 部署** 实施部署操作。

选择对应的环境后，选择需部署的制品并创建部署。

:::tip 提示

创建部署时， 平台将对制品在当前环境的部署行为进行前置校验，请按照提示操作。

:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/e5140066-dcbf-440c-86d4-2e8a3a2393e6.png)

点击 **开始部署**，平台将根据制品中的分组编排依次执行部署操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/a19f3d1d-9ca6-43f3-82ad-817c62cc30df.png)

部署过程中，您可以点击该部署记录查看当前部署的进度，等待部署完成即可。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/147d9172-7266-44c5-903f-02756b5d839b.png)

关于部署更多信息，请参见 [部署管理](../guides/deploy/deploy-order.html)。