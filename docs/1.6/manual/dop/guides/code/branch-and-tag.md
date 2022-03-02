# 分支和标签管理

## 分支管理

内置代码仓库提供分支管理功能。

进入 **我的应用 > 选择应用 > 分支**。应用仓库默认以第一个推送上来的分支作为默认分支。默认分支是创建合并请求的默认目标分支，可点击 **...** 修改默认分支。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/3d8befcf-2fc1-48a6-acff-3ca770ed9506.png)

## 删除分支

点击对应分支的 **删除** 即可删除分支，其中默认分支无法删除。

## 分支对比

点击 **对比** 可比较两个分支的差异。您可选择 **基于源** 或 **对比分支** 进行对比。当前页面下可查看分支的提交历史。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/465203c1-5874-449d-a4dd-1b932cdcdaf7.png)

也可查看不同文件的内容差异。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/55ef2a8f-ffcb-4962-91ac-a54e578ad5fd.png)

## 项目分支规则

平台对于分支与环境有着严格的管理，内置有 DEV、TEST、STAGING 和 PROD 四个部署环境。系统内置最佳实践配置的同时，支持用户进行自定义编辑配置。 关于分支管理更多信息，请参见 [Gitflow 设计理念](../../concepts/gitflow.md)。

您可在此设置分支对应的部署环境（流水线部署环境）和制品部署环境。

请进入 **DevOps 平台 > 项目 > 项目设置 > 代码仓库 > 分支规则** 设置环境。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/73a94c84-87ca-4284-b769-1e25e925ad20.png)

## 应用分支规则

应用分支规则是对应用代码分支的保护和持续集成的开关设置，请根据应用实际需要合理配置。

* 持续集成：该分支代码发生变化时触发持续集成。
* 分支保护：分支保护开启后，仅应用所有者、应用研发主管方可操作，其他成员需通过 MR 提交代码。

请进入 **我的应用 > 选择应用 > 设置 > 代码仓库 > 分支规则** 创建规则。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/a00b8644-c279-4fa5-b5f9-f8bade0ba52b.png)

## 标签管理

内置代码仓库支持标签管理，在标签管理页可下载源代码压缩包。

进入 **我的应用 > 选择应用 > 分支 > 标签**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/82862ffa-be54-40b5-8843-7380e2ec324b.png)

点击右上角 **添加标签** 即可添加标签，基于 Branch 或 commit SHA 进行设置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/b0c3e42f-ecc5-4ba4-a745-e95792aaf9a2.png)

