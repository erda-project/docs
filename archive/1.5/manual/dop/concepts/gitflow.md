# Gitflow

Gitflow 即 Git 工作流，有助于持续软件开发和实施 DevOps 实践，其概念由文森特·德里森在 [nvie](http://nvie.com/posts/a-successful-git-branching-model/) 首次提出并广受欢迎。Gitflow 定义了围绕项目发布设计的严格分支模型，适用于有计划的发布周期项目和持续交付。

标准的 Gitflow 示例如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/63182c72-d730-4690-8d09-bc1d8959a137.png)

Gitflow 完整工作流程如下：
1. Develop 分支从 Master 分支切出。
2. Release 分支从 Develop 分支切出。
3. Feature 分支从 Develop 分支切出。
4. 当 Feature 分支完成时，合并至 Develop 分支。
5. 当 Release 分支完成时，合并至 Develop 分支和 Master 分支。
6. 若 Master 分支检测到问题，则会从 Master 分支切出 Hotfix 分支。
7. 当 Hotfix 分支完成时，合并至 Develop 分支和 Master 分支。

## Develop/Master 分支

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/5ba6cca2-d6ac-42b0-839a-22550cc963ee.png)

标准的 Gitflow 使用两个分支记录项目的演进历史。其中 Master 分支记录正式发布记录，Develop 记录演进历程。Develop 分支和各个 Feature 分支进行交互：Feature 分支不断集成至到 Develop 分支，Develop 分支则不断切出分支作为新的 Feature 分支基线。

Master 分支可通过 Tag 标记版本，并以 Tag 为节点发布至生产环境。

## Feature 分支

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/b7400cec-f674-4814-9821-d8574ab4591d.png)

任一 Feature 均应有一个对应的 Feature 分支，不同 Feature 不可混用同一分支。

Feature 分支需以最新的 Develop 分支为基线，完成开发后，再合并回 Develop 分支中。Feature 分支不会与 Master 分支产生关联。

## Release 分支

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/7d73a92b-a5f4-4687-86e2-b16456ab8235.png)

当 Develop 分支中已集成一定量的 Feature 或预定的发布日期临近时，即可考虑发版。发版是从 Develop 分支切出一个 Release 分支，同时表示本 Release 周期已结束，并开启下一个 Release 周期。此后所有新 Feature 均不会体现在此 Release 分支上，将集成至 Develop 分支并最终切到下一个 Release 分支。

Release 分支上的修改仅限于缺陷修复、自动化工具生成的文档等，不允许出现新的 Feature。

对于 Release 分支上的缺陷修复，应切出新的分支进行问题修复并验证，之后再合并回该 Release 分支和 Develop 分支。

Release 分支可合并至 Master 分支并打上对应 Tag。

## Hotfix 分支

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/ce4125be-7826-4fd0-987b-d5db9a51c705.png)

Hotfix 分支用于快速修复生产上的问题。当生产线上出现问题并定位后，从对应 Tag 的 Master 分支切出 Hotfix 分支，解决问题并验证后，Hotfix 分支需合并回 Master 分支和 Develop 分支，并在 Master 分支上打上 Tag。

