---
title: 超好玩：使用 Erda 构建部署应用是什么体验？
author: 郑成
date: 2021-07-16
category: dop
---


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/d1db4bb6-16e7-401f-8566-0cfb2eb01d3d.png)

**导读**：最近在 Erda 上体验了一下构建并部署一个应用，深感其 DevOps 平台的强大与敏捷，不过为了大家能够快速上手，我尽量简化应用程序，用一个简单的返回 "Hello, World!"go web 应用来进行阐释。

## Erda DOP
相信有很多和我一样的开发人员，在完成应用新功能后，不希望将很多注意力放在运维相关的任务上（如应用的打包，构建，部署等）。我希望平台能够屏蔽底下基础设施的复杂逻辑，让我像写代码一样“声明”应用的运行过程和结果，能够方便快速地构建部署我的应用，使我无需关心运维方面的任务。Erda DOP 便是以应用为中心，企业一站式的 DevOps 平台，下面让我们写一个 go web 应用，看它是如何帮助我们快速进行构建部署的。

## 部署前准备
1. 在创建部署我们的 go 应用之前，我们需要加入或创建一个组织，并为组织添加相应的集群用于资源的管理和服务的部署运行。
2. 在组织里创建项目，项目 (Project) 是研发运维的主要对象。
3. 在我们刚刚创建的项目下新建应用，这个应用我认为相当于 Github Repo，用来存放我们的应用程序和构建部署所需的声明文件。

关于更多组织,项目和应用相关的知识可以点击[介绍](https://docs.erda.cloud/1.0/manual/platform-design.html#%E7%A7%9F%E6%88%B7-%E7%BB%84%E7%BB%87)查看


现在假设我们已经在组织下新建了一个叫 base-project 的项目，并在项目中创建了名为 go-web 的应用，下文 git 地址将会涉及到这两个名字。


## 准备 go web 代码

示例代码只是一个 golang 的简单 web 服务，只需要能输出 Hello, World! 就可以了，现在新建一个文件夹并创建一个 main.go 文件，在其中写入：

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

初始化 go 应用的包管理:

```
go mod init github.com/erda/go-web
```

当然了，这只是我为简化应用程序写的代码，你也可以写入自己的 Go 代码（Erda 平台可以部署运行任意语言、任意框架开发的代码，并不局限于 Go / Java 等）。

然后我们先在本地初始化 git 仓库，并进行 commit：

```bash
git init
git add .
git commit -m "initialize"
```

#### 推送示范代码到 Erda 平台

平台基于标准的 Git 协议内置实现了一个 git 代码仓库，用户不需要依赖外部仓库（比如：gitlab 等）就可以完成从源码开发到部署全流程。

平台远程仓库服务器地址查看入口位于：

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 代码浏览 -> 仓库地址

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/8c57a78e-4fa9-4a47-847f-2c54d215068c.png)

```bash
git remote add erda https://erda-org.erda.cloud/wb/base-project/go-web
git push -u erda --all
git push -u erda --tags
```

## 定义流水线

对于应用开发人员来说，我们已经完成了新功能的开发，并且推送了我们的代码到 Git 仓库，然后我们希望通过一些声明式的文件来定义如何构建我们的应用，以及我们的应用所需的资源、依赖的基础设施。Erda DOP 提供了两种声明式文件来达到一键部署的目的。

pipeline.yml 描述一个从代码编译构建到应用部署的流水线的配置文件，语法较为简单, 整体只有 stage / action 两级。stage 就是阶段，它用于控制串行和并行；action 则是实际的执行单位。

dice.yml 则是一个应用部署的描述文件，由服务基本信息和服务编排关系两部分组成，具体包含了微服务的 Docker 镜像、资源需求（CPU 和 Memory 等）、微服务之间的依赖关系、环境变量以及 AddOn 等信息，特别是 AddOn，可以让应用开发者完全不需要关心诸如 mysql 等的搭建过程，只需要“声明”应用依赖哪些 AddOn，平台就会自动拉起。(不过由于本次的例子相对简单，没有对 AddOn 进行展示，有兴趣的可以查看[官方文档](https://docs.erda.cloud/1.0/manual/addons/out-of-the-box.html))

给该示范代码工程添加平台配置文件 pipeline.yml 和 dice.yml。

#### pipeline.yml
简单的完成部署，一般可以设置 4 个 stage 来组成 pipeline.yml，4 个 stage 按照书写顺序依次执行，分别是：

1. 拉取 Git 源码
2. 基于源码编译、构建，制作 Docker 镜像
3. 生成版本产物
4. 基于版本产物完成部署

4 个 stage 分别可用如下 Action 来执行：

1. [git-checkout](https://www.erda.cloud/market/action/git-checkout)
2. [golang](https://www.erda.cloud/market/action/golang)
3. [release](https://www.erda.cloud/market/action/release)
4. [dice](https://www.erda.cloud/market/action/dice)

该示例的完整 pipeline.yml:

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

#### dice.yml

dice.yml 来描述我们的应用所需的资源大小，副本数量等。

该示例的完整dice.yml：

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

#### 提交文件

将新增的两个 yaml 文件提交至平台的代码仓：

```bash
git add .
git commit -m "add pipeline.yml and dice.yml"
git push erda
```

## 执行流水线

1. 进入`流水线`，右上角点击`新建流水线`。
2. 流水线任务分析完成后，处于待执行状态，右上角点击 `立即执行`，开始执行构建。
3. 流水线任务执行过程中，可以实时查看流水线各步骤的执行状态，并点击`日志`查看对应节点执行状况的日志信息。

## 查看应用部署结果

通过流水线构建源码，并成功完成部署动作后，可在部署中心看到已经成功部署的应用实例。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/06/10/f1e73336-607c-422a-9e25-7a2ec5f56c9f.png)

点击 master进入应用管理，可以进一步进行配置域名、服务实例扩缩容等操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/06/18/de6b2aa6-f443-41c6-ac1d-f970370eddcc.png)

查看实例 IP 地址并复制到浏览器，加上我们应用服务的端口 8080 可以看到已经成功打印出“Hello,World!”。

## 最后
本文中使用的示例代码直接托管在了 [Github](https://github.com/chengjoey/erda-go-web-deploy-example.git)上，可直接 clone 下来使用。

以上只是通过构建部署一个 go web 应用体验了一下 Erda - DOP 的几个核心功能，Erda 还有微服务治理、多云管理平台等其它强大的功能，且 Erda 现已开源并发布 1.0 版本，通过下方链接即可下载并快速开始。

* Erda Github 地址：https://github.com/erda-project/erda
* Erda Cloud 官网：https://www.erda.cloud/
