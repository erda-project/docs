# 代码托管

## 新建仓库

Erda 代码托管支持系统内置 Git 仓库和外置通用 Git 仓库，可在创建应用时进行选择。

进入 **DevOps 平台 > 项目 > 应用中心 > 应用 > 新建应用**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/27f67214-f0d3-4918-8b3c-e9620743018f.png)

若选择外置仓库，需指定仓库地址、用户名、密码等信息。

:::tip 提示

选择配置外置代码仓库后，DevOps 平台将不再提供代码浏览、提交历史查看、分支管理和合并请求等在线代码仓库功能，流水线和部署中心等其他功能不受影响。

:::

完成应用创建后，点击应用默认进入 **如何开始** 页面，在此可查看 Git 使用相关命令。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/61f931e6-2d1c-4a0d-ac63-570a8a6e732b.png)

点击右上角 **?** 图标也可查看初始介绍。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/619eef5b-6c9e-477b-8395-7b095c0a2574.png)

## 代码浏览

进入 **DevOps 平台 > 项目 > 应用 > 代码**，点击右上角 **仓库地址** 可查看代码仓库地址、用户名和 Token。

您可使用内置的 Git 和 Token 克隆代码 ，也可使用登陆 Erda 平台的用户名和密码进行操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/420a8548-d8cc-42f2-bf16-df7c715a260d.png)

## 新建分支

点击右上角 **新建分支** 即可创建新的分支。

在 **添加分支** 页面，您可基于 Branch、Tag 以及 commit SHA 三类源创建分支。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/388320cd-60a3-41da-aac1-f857f0a398cb.png)

完成分支创建后，点击分支下拉框查看所有分支，选中某个分支即可进行分支切换。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/564e7558-9f8b-47d5-8ea2-3418a8314cb3.png)

### 新建文件和文件夹

点击右上角 **新建** 可选择新建文件或文件夹 。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/c83e67d8-ee6d-4623-9411-7f4d6cd5ace1.png)

在新建文件页，输入文件名、文件内容和提交信息，点击 **保存** 即可新建文件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/2acb6137-f6c7-4819-b8af-ada76217417a.png)

### 查看文件内容

在文件内容页，您可查看当前文件内容、提交者以及当前文件的提交历史。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/6dff7ff8-9177-4922-bcd8-8502f5bb61cf.png)

### 修改和删除文件

在文件内容页，点击下图所示编辑和删除图标即可修改和删除文件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/61958e41-68e2-419f-ac68-cdb87398eb5c.png)

### 查看最新提交

在代码浏览页，可查看当前目录最新提交信息。点击提交信息即可查看具体提交的改动信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/a499eae2-b84a-4289-b26c-dbea7b20a3a1.png)

## 提交历史

进入 **DevOps 平台 > 项目 > 应用 > 提交**，可查看历史提交记录，并支持根据分支名、提交信息进行过滤。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/fd4d8d7a-e303-489e-a0c8-47ebc3d95a61.png)

点击提交信息可查看具体提交的改动信息，包括修改的具体文件和内容。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/6dd318cd-1432-4ba6-860e-90ef617fb4fe.png)

点击右上角的 **单行** 和 **分栏** 可切换查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/561fc2bf-1316-4184-b5fb-40b69e18a98b.png)

如图所示，点击 **...** 可向前向后查看文件内容。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/10ab2c70-3528-4df2-b30c-ef391c97588e.png)

## 流水线

进入 **我的应用 > 选择应用 > 流水线**。

平台提供流水线的可视化操作，在代码更新后也可触发流水线。关于流水线更多信息，请参见 [流水线](../cicd-pipeline/pipeline-yml-graph.md )。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/ab1357df-44ca-4d9b-98cd-2177243e21db.png)

点击下图按钮即可进行可视化编辑和文本编辑切换。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/4623bb5d-a3bf-4260-9398-5c2742ebcf06.png)

## erda.yml

erda.yml 文件采用 YAML 语法编写，是一个微服务应用部署的描述文件。关于 erda.yml 更多信息，请参见 [erda.yml](../reference/erda-yaml.md )。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/70ee61b3-5d94-4d9e-a720-0fef4de7af59.png)
