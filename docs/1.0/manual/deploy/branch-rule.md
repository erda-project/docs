# 分支管理

## 修改默认分支

应用仓库默认会以第一个推送上来的分支作为默认分支,默认分支作为创建合并请求的默认目标分支,并且不能删除默认分支

默认分支配置入口：

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 分支管理

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/09/15/cf1e1d85-9d0f-4d08-a224-20a63c236a33.png)

## 修改分支规则

平台默认会根据 GitFlow 在项目设置中生成对应分支规则配置，可以按需修改

分支规则配置入口：

> DevOps 平台 -> 项目 -> 分支规则

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/09/15/e5fa2272-8f3f-4d82-b3de-e459bd3819bf.png
)

## 分支名称与部署环境

### 建议分支规范

平台建议代码分支（branch & tag）的命名遵循 GitFlow 命名规范。该规范由 [Vincent Driessen at nvie](http://nvie.com/posts/a-successful-git-branching-model/) 提出并广泛使用。分支名称分为 `master`，`develop`，`feature branches`，`release branches`，`hotfix branches` ，`support branches` 六种类型。平台会对新建的项目应用设置符合GitFlow的默认规则，不符合规范的分支，在平台上无法进行打包部署等相关操作。

### 核心分支

在采用 Git Flow 工作流的项目中，代码的中央仓库会一直存在以下两个长期分支：

* master
* develop

### develop 分支

develop 分支记录完整的研发过程，是开发人员平时主要交互的分支。

### master 分支

master 分支的 HEAD 代表着应用当前的"生产"分支，并关联了所有上线过的历史版本。

### 支撑分支

使用四类分支进行研发过程支撑：

* feature 分支
* release 分支
* hotfix 分支
* support 分支

### feature 分支

feature 分支用于开发新特性，必需满足：

* 从 develop 分支开辟出来
* 最终合并到 develop 分支
* 命名必需以 `feature/` 为前缀

一般一个迭代周期中会并行存在多个 feature 分支，由多名研发人员独立开发实现功能需求。当完成各个 feature 的开发后，研发人员协同好将各个 feature 分支一起合并到 develop 分支进行冒烟测试。

### release 分支

release 分支用于新版本发布。测试人员基于 develop 分支完成功能测试后，开辟 release 分支进行预发环境发布。release 分支必需满足：

* 从 develop 分支开辟出来
* 最终合并到 master 和 develop 分支
* 命名必需以 `release/` 为前缀，一般后接版本号

### hotfix 分支

hotfix 分支用于紧急修复线上 bug。线上发现紧急 bug 后由开发人员基于 master 分支开辟 hotfix 分支进行快速修复。hotfix 分支必需满足：

* 从 master 分支（或者 support 分支）开辟出来
* 最终合并到 master 和 develop 分支，（或者 support 分支）
* 命名必需以 `hotfix/` 为前缀，一般后接版本号

### support 分支

support 分支用于历史版本的支持。一般情况下 master 分支会持续迭代，但有些系统会停留在某个版本不再做频繁迭代。那就需要基于 master 分支上的某次 release tag 开辟出一个 support 分支进行单独维护。support 分支必需满足：

* 从 master 分支开辟出来
* 命名必需以 `support/` 为前缀，一般后接版本号

### 分支与环境

Erda 平台内置了四个部署环境，分别是`development`、`test`、`staging`和`production`，对应应用的整改研发过程。平台约定了代码分支名和四个部署环境的对应关系：

| 分支          | 环境          | 保护 |
| ------------- | ------------- | ---- |
| feature/*     | DEV           | ❌ |
| develop       | TEST          | ❌ |
| release/*     | STAGING       | ✅ |
| support/*     | PROD          | ✅ |
| master        | PROD          | ✅ |

主要在流水线新建页面中会有所体现：

> DevOps 平台 -> 项目 -> 应用 -> 流水线

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/23/043742c0-b78b-4067-bcb1-fd12157801fe.jpeg)

## 研发过程

![Erda Git-Flow](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2018/10/28/d3069d57-0fcb-4c72-9c21-a2da2a4076e3.jpeg)

### 应用创建

1. 项目管理员创建应用仓库；
2. 创建 master 分支；
3. 基于 master 分支开辟 develop 分支。

### 开发迭代

1. 开发工程师基于 develop 分支开辟 feature/A、feature/B 等等，发布 development 环境进行自测；
2. 开发工程师合并所有 feature 分支到 develop 分支，发布 test 环境 冒烟测试；
3. 如果测试有 bug，迭代上面两步，直到冒烟测试通过，然后提交测试。

### 测试集成

1. 测试工程师人员基于开发工程师提测的 develop 分支在 test 环境进行集成测试；
2. 开发工程师从 develop 分支开辟 feature 分支修复测试工程师发现的 bug，自测后合并入 develop 分支公测试工程师继续测试；
3. 迭代上面两步直到集成测试通过，然后开辟 release 分支提交发布。

### 预发验证

1. 测试工程师将 release 分支部署 staging 环境进行回归验证；
2. 开发工程师在 release 分支修复测试工程师发现的 bug，直到回归测试通过；
3. 开发工程师将 release 分支上的修复合并回 develop 分支，同时将 release 分支合并 master 分支。

### 生产上线

1. 运维工程师将 master 分支发布到 production 环境，测试工程师线上环境进行功能验证；
2. 开发工程师基于 master 分支开辟 hotfix 分支修复测试工程师发现的 bug；
3. 测试工程师将 hotfix 分支部署 staging 环境进行 bugfix 验证，直到验证通过；
4. 开发将 hotfix 分支合并 master 和 develop 分支；
5. 迭代上面四步直到线上版本发布通过，基于 master 分支开辟 tag 记录版本。

### 分支合并

release、master 分支合并操作权限只有应用管理员才有，其他分支合入全部需要线上走合并请求流程。

合并请求入口：

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 合并请求

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/23/1a06b727-9dfb-4305-96a7-f9605aec7d73.jpeg)
