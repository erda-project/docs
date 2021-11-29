# 单元测试

## 介绍

为了保证系统的稳定性，单元测试必不可少。平台通过 UT action，提供针对单元测试的能力抽象。

UT action 主要对用户的项目进行单元测试，当用户 push 代码时，会触发 UT action，其中会探测应用的语言框架，选择相应的单测方式进行单元测试。

## 快速上手

通过平台可以很方便地在流水线中嵌入该节点，然后进行单元测试。

建议通过流水线图形化编排的方式添加 UT Action，如下图所示：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d4909f65-d593-4e93-bdcf-9e60d2d24b44.png)

参数说明：

**context**：必填， 需要做UT的代码存放目录。一般为 git action 的 destination 目录。如repo。若项目存在多种语言，必须指定模块路径，中间用 "," 分隔；如 "repo/path1,repo/path2"

**name**：选填，该次UT测试名称。

**go_dir**：选填，若UT的对象为golang，则必填。该值为$GOPATH下的项目路径。



## 测试结果

测试结果展示在代码质量里的执行列表中，在列表中我们可以看到执行的分支、耗时时间以及执行结果等。

进入 **DevOps 平台 > 项目 > 应用 > 代码质量 > 执行列表**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/901da9af-f3dd-471c-a6a4-a030842617ac.png)

点击执行列表中的一项，我们可以看到具体的测试详情。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/207a4e12-b4de-4c5b-bad1-d37d6653349f.png)
