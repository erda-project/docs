# 制品和构建

## 创建制品
创建制品前需要配置项目的集群设置和分支规则。

进入 **DevOps 平台 > 项目 > 项目设置 > 通用设置 > 集群设置** 设置集群。

进入 **DevOps 平台 > 项目 > 项目设置 > 代码设置 > 分支规则** 创建分支规则。

目前制品仅支持通过 Release Action 创建。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/5a492871-c40d-4e5d-8ee5-d45269a5b015.png)

1. 进入 **DevOps 平台 > 项目 > 应用 > 代码仓库 > 代码浏览**，创建流水线文件，添加 Action（任务类型->应用打包发布制品）并填写配置参数。

2. 进入 **DevOps 平台 > 项目 > 应用 > 流水线**，选择分支，选择流水线文件，点击新建流水线，构建完成之后执行流水线。

3. 流水线执行成功则制品创建成功。

流水线根据所在分支，匹配分支规则，确认制品的制品部署环境，部署环境在集群设置中有对应的集群。

## 查看制品

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d17563cc-b4bc-4004-b070-9712f19c7e75.png)

进入 **DevOps 平台 > 项目 > 应用 > 制品管理**，可以根据分支、关键字搜索指定制品。

选择制品后可以查看制品的信息，所属集群、分支、应用、创建人、操作人、创建时间、提交 ID、erda.yml。

## 更新制品
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9bb491f4-7921-4216-a898-b07f5bc47770.png)
只可以编辑制品的描述，其余信息不可修改。

## 删除制品

制品的 erda.yml 信息中定义了制品所引用的 Docker Image 的信息。

制品的过期时间根据环境变量 RELEASE_MAX_TIME_RESERVED 决定，默认为 3 天。

每天零点集群会搜索已过期而且未被部署而且 Version 为空的制品。

首先删除制品存储的 Image 信息，如该制品下的 Image 已无其他制品使用，则会删除 Image Manifest。如果删除成功，则会删除制品。





