# 合并请求

内置代码仓库支持合并请求操作。关于 Git 工作流更多信息，请参见 [Gitflow 设计理念](../../concepts/gitflow)。

进入 **DevOps 平台 > 我的应用 > 选择应用 > 代码仓库 > 合并请求**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/49bf76fb-408c-4bed-a4f4-048053b4fb66.png)

点击右上角 **新建合并请求** 创建新的合并请求。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/96cb6ae4-1f3d-4cd4-9190-3818101d17fe.png)

在默认分支 `.gitlab/merge_request_templates` 目录下添加模板 md 文件。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fd0954be-0faa-4e05-8d63-ec915fc71250.png)

:::tip 提示

应用设置中暂不支持合并请求描述模板功能。

:::

完成模板添加后，即可在新建合并请求时选择模板。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/b9c474d7-5c93-4f22-9b64-f00b55074110.png)

完成合并请求添加后，点击该合并请求，可查看合并请求信息以及对比结果，您可在对比结果中查看评论、提交和变更。 点击右上角按钮，合并或关闭请求。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/bd2ca145-a456-41e6-a252-e0a03a1b4e17.png)

查看变更内容时，鼠标悬浮位置将出现对话按钮，点击按钮可添加评论。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/0a55d3e6-cde0-4d19-a92d-39ebeb4d4111.png)
