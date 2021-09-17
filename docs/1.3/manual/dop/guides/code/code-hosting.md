# 代码托管

## 新建仓库

Erda 代码托管支持系统内置 Git 仓库和外置通用 Git 仓库，可在创建应用时进行选择。

进入 **DevOps 平台 > 项目 > 应用列表 > 新建应用**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e950ef5a-6ad5-43ce-aa8a-9133f3c53b18.png)

若选择外置仓库，需指定仓库地址、用户名、密码等信息。

:::tip 提示

选择配置外置代码仓库后，DevOps 平台将不再提供代码浏览、提交历史查看、分支管理和合并请求等在线代码仓库功能，流水线和部署中心等其他功能不受影响。

:::

完成应用创建后，点击应用默认进入 **如何开始** 页面，在此可查看 Git 使用相关命令。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/093e4f61-d833-4f2d-9a41-9a0cd131bb9d.png)

点击右上角 **?** 图标也可查看初始介绍。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f072a19f-414e-4197-be80-2e597eda319e.png)

## 代码浏览

进入 **DevOps 平台 > 项目 > 应用 > 代码仓库 > 代码浏览**，点击右上角 **仓库地址** 可查看代码仓库地址、用户名和 Token。

您可使用内置的 Git 和 Token 克隆代码 ，也可使用登陆 Erda 平台的用户名和密码进行操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a1d60c64-c59f-485a-aeb2-b7b978901fbd.png)

## 新建分支

点击右上角 **新建分支** 即可创建新的分支。

在 **添加分支** 页面，您可基于 Branch、Tag 以及 commit SHA 三类源创建分支。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a062dd84-9857-4e71-b878-c311012a03e9.png)

完成分支创建后，点击分支下拉框查看所有分支，选中某个分支即可进行分支切换。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a901db2d-89d8-4dff-842c-dc0f6f70bdce.png)

### 新建文件和文件夹

点击右上角 **新建** 可选择新建文件或文件夹 。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/2e36f008-4bb2-470e-9c9d-deb8cd63c956.png)

在新建文件页，输入文件名、文件内容和提交信息，点击 **保存** 即可新建文件。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e6ddfe7e-2d6a-4816-aaae-51e0e2dabb48.png)

### 文件内容

在文件内容页，您可查看当前文件内容、提交者以及当前文件的提交历史。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fcd973bd-e05b-4988-a7d2-4323656f6f4f.png)

### 文件修改和删除

在文件内容页，点击下图所示编辑和删除图标即可修改和删除文件。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/0d9bd012-977c-42dc-8c1e-2ec9c35fb136.png)

### 最新提交

在代码浏览页，可查看当前目录最新提交信息。点击提交信息即可查看具体提交的改动信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4ae170d9-274f-4bde-aa52-929112ab18dd.png)

## 提交历史

进入 **DevOps 平台 > 项目 > 应用 > 代码仓库 > 提交历史**，可查看历史提交记录，并支持根据分支名、提交信息进行过滤。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/46d8a7e1-017f-4cee-b779-640c3f45bb27.png)

点击提交信息可查看具体提交的改动信息，包括修改的具体文件和内容。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/1388e88d-77f6-4078-ae91-8c5ebb03ae41.png)

点击右上角的 **单行** 和 **分栏** 可切换查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/739fc62a-08fb-4706-86dd-529a6efc4e16.png)

如图所示，点击 **...** 可向前向后查看文件内容。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6ddd6b0a-682d-4c73-aba2-8dde84464e44.png)

您也可以在代码浏览页中查看当前目录最新提交信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/00d78ad6-d8b8-4de7-9efc-8e6a7b329b1b.png)

## 流水线

进入 **DevOps 平台 > 我的应用 > 选择应用 > 流水线**。

平台提供流水线的可视化操作，在代码更新后也可触发流水线。关于流水线更多信息，请参见 [流水线](../cicd-pipeline/pipeline-yml-graph )。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/2b0dafe3-923b-452d-9641-4ee5503e5d0f.png)

点击下图按钮即可进行可视化编辑和文本编辑切换。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/00a76c57-d35c-463d-994e-6f09fc2aef40.png)

## erda.yml

erda.yml 文件采用 YAML 语法编写，是一个微服务应用部署的描述文件。关于 erda.yml 更多信息，请参见 [erda.yml](../reference/erda-yaml )。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/0e3be7df-290c-415f-9abb-9474de0be6dc.png)
