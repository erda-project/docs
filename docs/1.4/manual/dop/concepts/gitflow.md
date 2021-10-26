# Gitflow

Gitflow 即 Git 工作流，有助于持续软件开发和实施 DevOps 实践，其概念由文森特·德里森在 [nvie](http://nvie.com/posts/a-successful-git-branching-model/) 首次提出并广受欢迎。Gitflow 定义了围绕项目发布设计的严格分支模型，适用于有计划的发布周期项目和持续交付。

标准的 Gitflow 示例如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/63182c72-d730-4690-8d09-bc1d8959a137.png)

Gitflow 完整工作流程如下：
1. develop 分支从 master 分支切出。
2. release 分支从 develop 分支切出。
3. feature 分支从 develop 分支切出。
4. 当 feature 分支完成时，合并至 develop 分支。
5. 当 release 分支完成时，合并至 develop 分支和 master 分支。
6. 若 master 检测到问题，则会从 master 分支切出 hotfix 分支。
7. 当 hotfix 分支完成时，合并至 develop 分支和 master 分支。

## develop/master 分支

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/5ba6cca2-d6ac-42b0-839a-22550cc963ee.png)

标准的 Gitflow 使用两个分支记录项目的演进历史。其中 master 分支记录正式发布记录，develop 记录演进历程。develop 分支和各个 feature 分支进行交互：feature 分支不断集成到 develop 分支，develop 分支则不断切出分支作为新的 feature 分支基线。

master 分支可通过 tag 标记版本，并以 tag 为节点发布至生产环境。

## feature 分支

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/b7400cec-f674-4814-9821-d8574ab4591d.png)

任何 feature 理应有一个自己的 feature 分支，不同 feature 不能混用同一分支。

feature 分支需以最新的 develop 分支为基线，完成开发后，再合并回 develop 分支中。feature 分支不会与 master 分支产生关联。

## release 分支

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/7d73a92b-a5f4-4687-86e2-b16456ab8235.png)

当 develop 分支中集成了一定量的 feature 或预定的发布日期临近时，即可考虑发版了。发版是从 develop 分支切出一个 release 分支，同时表示本 release 周期已结束，并开启了下一个 release 周期。此后所有新的 feature 都不会体现在这个已 release 的分支上，只会集成至 develop 并最终切到下一个 release 分支。

release 分支上的修改仅限于缺陷修复、自动化工具生成的文档等，不允许出现新的 feature。

对于 release 分支上的缺陷修复，应切出新的分支进行问题修复并验证，之后再合并回该 release 和 develop 分支。

release 分支可以合并到 master 分支并打上对应 tag 。

## hotfix 分支

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/ce4125be-7826-4fd0-987b-d5db9a51c705.png)

hotfix 分支用以快速修复生产上的问题。当生产线上出现问题并定位后，从对应 tag 的 master 分支切出 hotfix 分支，解决问题并验证后，hotfix 分支需合并回 master 和 develop 分支，并在 master 分支上 tag 。

