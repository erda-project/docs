# 自定义和扩展

详细的 action 开发请查看<action 开发者手册>[link]

现在 action 扩展市场已经有丰富的节点仓库，可以满足大部分场景下的需求，在某些特定的情况下，可能需要自定义的 action，erda 的扩展市场同样支持自定义扩展。

## 自定义 ACTION
下面以开发 dingding-robot 为例
dingding-robot 功能介绍
用户通过输入 dingding 机器人的 token 和 关键词,来发送消息到指定钉钉群.
Action 的开发流程图
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/1f649c8c-2e9c-4dd1-9326-59cbe187eeed.png)


### 第一步 通过 spce.yml 来描述入参
spec.yml 是 Action 的描述文件，它描述了 Action 的名称、logo、版本、入参等。
基本配置
```
name: dingding-robot
version: '1.0'
type: action
displayName: 钉钉机器人
category: data_management
desc: 给指定的钉钉群发送消息
public: true
supportedVersions:
- ">= 4.0"
  params:
- name: Msg
  desc: 用户发送的信息
  required: true
- name: Token
  desc: 机器人的Token
  type: string
  required: true
- name: Keyword
  desc: 机器人的关键词
  required: true
```


参数说明
* params：入参列表
* Msg: 用户想要发送的信息
* Token: 机器人的Token
* Keyword: 机器人的关键词
字段说明：
* name：action 的名称，也是 action 的标识。
* version：action 的版本，与目录版本应当保持一致。
* type：分为 action 和 addon，此处我们开发的是 action，所以统一填写 “action”。
* displayName：action 的显示名称，应当是易于理解的、有语义的。
* category：action 分目 (目前分类主要有代码管理，构建管理，部署管理，版本管理，测试管理，数据治理，自定义任务等）
* desc：action 描述
* public：是否公开
* supportedVersion：action 支持的 dice 版本
* labels: 标签 流水线将在执行action时将其打入标签和env
* accessibleAPIs: erda的开放接口，用来访问erda的openapi，它主要有一下几个字段构成：
    1. path 访问路径
    2. method 请求方法
    3. schema 协议

### 第二步 编写调试 Action
main.go 完整代码
```
package main

import (
"os"

	"github.com/blinkbean/dingtalk"
)

func main() {
cli := dingtalk.InitDingTalk([]string{os.Getenv("ACTION_TOKEN")}, os.Getenv("ACTION_KEYWORD"))
err := cli.SendTextMessage(os.Getenv("ACTION_MSG"))
if err != nil {
panic(err)
}
return
}
```

备注: pipeline 会把 spec.yml 中的 params 转化成环境变量
为什么 spec.yml 中的 params 定义的是Msg而在环境变量中成了 ACTION_MSG ?
是因为 pipeline 会将自定义参数改为全大写，并在之前拼接 ACTION_
#### 本地调试代码
##### 配置环境变量
开发者可以通过配置不同的环境变量来调试自己的代码
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/a64f81d4-a077-45da-a56b-83f21c94e499.png
)

##### 调试结果
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/8117002b-6681-449a-8bc5-18dc5b40b107.png)

### 第三步 编写 dockerfile 打包构建
action 的最终交付物是一个 K8s Job 描述文件，真正执行 Job 任务的，是一个具体的 Pod，也就是说，我们要提供一个 image。所以首先我们要编写 Dockerfile 定义 base image。

Dockerfile 由开发者自由编写，有两点要求
* 提供可执行的 /opt/action/run 。执行 Job 时，会运行运行镜像中的 /opt/action/run。也就是说，/opt/action/run 是你的业务程序的入口（K8s Job container 的 CMD）.上一步中我们可以得到一个 main.go ,只要把 main.go 编译到 /opt/action/run 即可.
* 任务一定会结束。也就是说，我们不能开启一个阻塞进程（如不能开启一个不停服的 HTTP 服务). pipeline task 的运行最长运行时间是 60 分钟.

Dockerfile 全文：
```
FROM registry.cn-hangzhou.aliyuncs.com/terminus/terminus-golang:1.14 AS builder
COPY main.go /go/src/github.com/dingding/main.go
RUN yum install -y git
RUN cd /go/src/github.com/dingding && go get -d -v ./... && GOOS=linux GOARCH=amd64 go build -o /opt/action/run ./main.go
```
#### 构建镜像
docker build -t xxx/dingding-robot:tag .
#### 把镜像推送到 dockerhub 上

docker push xxx/dingding-robot
### 第四步 编写 dice.yml
Action 制品是一个 dice.yml 文件。全文如下：
```
### job 配置项
jobs:
dingding-robot:
image: xxx/dingding-robot:tag
resources:
cpu: 0.5
mem: 1024
```
注意镜像不要用 latest tag ,相同的 tag 宿主机不会拉取最新的镜像执行。所以每次打镜像都要重新标记下 tag
### 第五步 调试 action

原来需要通过 Makefile 制作镜像, 编写 dice.yml，在通过 erda-cli 命令行工具发布 action。
为了让开发者能够快速调试Action，流水线支持从外置git仓库中获取action。

仓库目录例子：
repo-root
├── spec.yml
├── dice.yml

#### 编写一个简单的发送钉钉消息的action:

在git仓库根目录下创建dice.yml
```
### job 配置项
jobs:
dingding-robot:
image: xxx/dingding-robot
resources:
cpu: 0.5
mem: 1024
```

创建spec.yml
```
name: dingding-robot
version: '1.0'
type: action
displayName: 钉钉机器人
category: data_management
desc: 给指定的钉钉群发送消息
public: true
supportedVersions:
- ">= 4.0"

params:
- name: Msg
  desc: 用户发送的信息
  required: true
- name: Token
  desc: 机器人的Token
  type: string
  required: true
- name: Keyword
  desc: 机器人的关键词
  required: true
 ```

然后就可以创建流水线文件pipeline.yml，在action的version参数处，填写git仓库地址
由于图形化界面不支持手动填写version，因此该修改只能通过手动编辑流水线文件实现。
tip：如果仓库是私有仓库，需要在URL中用username:password的方式访问
```
version: "1.1"
stages:
- stage:
    - dingding-robot:
      alias: dingding-robot
      description: 给指定的钉钉群发送消息
      version: https://username:password@erda.dev.terminus.io/terminus/dop/erda/dingding-rotbot
      params:
      Keyword: .
      Msg: 调试action
      Token: a162074cc81de8xxxxxxxxxxxxxxxxx71a028df831cdcb
```

执行流水线后效果如下
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/aea856bb-90c4-4f79-bbed-2c54c8d59ee7.png)

查看钉钉消息，预设的群机器人已经成功发送消息
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/be792e07-6e12-4d64-ba7c-54a5e52ff63c.png)

### 第五步 编写Readme.md介绍
在"辛苦"写完一个action后，如何让更多的人都用起来呢，虽然action本身的功能很重要，但是有一个好的readme也是必不可少，
最后就是写一个action的文档介绍，虽然对readme的内容没有强制要求，但是建议从以下几个方面来写：

* 名称
* 简介
* 详细介绍
* params入参
* 其它

这样可以更方便的让其它使用者更快的了解action的功能和使用方法.

## Custom-Script Action

Custom-Script 是一个特殊的 action，它支持运行自定义命令，平台默认提供的镜像包括 java, nodejs, golang 等编译环境，
它接受执行的脚本命令列表，按顺序执行，可以方便的进行扩展开发。
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/8298a0a0-67e3-4620-93a6-453cbc043b70.png)
可以看到它支持输入自定义命令