# 分支和标签管理

## 分支管理

内置代码仓库提供分支管理功能。

进入 **DevOps 平台 > 我的应用 > 选择应用 > 代码仓库 > 分支管理**。应用仓库默认以第一个推送上来的分支作为默认分支。默认分支是创建合并请求的默认目标分支，可点击 **...** 修改默认分支。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/5f8a2db7-5e0d-48c0-9822-3f44e1f2123f.png)

## 删除分支

点击对应分支的 **删除** 即可删除分支，其中默认分支无法删除。

## 分支对比

点击 **对比** 可比较两个分支的差异。您可选择 **基于源** 或 **对比分支** 进行对比。当前页面下可查看分支的提交历史。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9f9c9307-f362-4ded-ab6a-2c6e8e23e08a.png)

也可查看不同文件的内容差异。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/7f4cab4a-ec3e-4945-bd3a-772176ac8cc4.png)

## 项目分支规则

平台对于分支与环境有着严格的管理，内置有 DEV、TEST、STAGING 和 PROD 四个部署环境。系统内置最佳实践配置的同时，支持用户进行自定义编辑配置。 关于分支管理更多信息，请参见 [Gitflow 设计理念](../../concepts/gitflow.md)。

您可在此设置分支对应的部署环境（流水线部署环境）和制品部署环境。

请进入 **DevOps 平台 > 项目 > 项目设置 > 代码仓库 > 分支规则** 设置环境。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/57c1237c-ba53-4333-a797-736a4d3bb1a5.png)

## 应用分支规则

应用分支规则是对应用代码分支的保护和持续集成的开关设置，请根据应用实际需要合理配置。

* 持续集成：该分支代码发生变化时触发持续集成。

* 分支保护：分支保护开启后，仅应用所有者、应用研发主管方可操作，其他成员需通过 MR 提交代码。

请进入 **DevOps 平台 > 我的应用 > 选择应用 > 应用设置 > 代码仓库 > 分支规则** 创建规则。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9555b13d-530c-43dc-8e18-47f1f84a5f7d.png)

## 标签管理

内置代码仓库支持标签管理，在标签管理页可下载源代码压缩包。

进入 **DevOps 平台 > 我的应用 > 选择应用 > 代码仓库 > 分支管理**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/b8b34de9-b50d-4bae-b7bf-d515ba579701.png)

点击右上角 **添加标签** 即可添加标签，基于 Branch 或 commit SHA 进行设置。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4803e91d-7d3c-44b3-b3c1-f0df3c5a1b73.png)

