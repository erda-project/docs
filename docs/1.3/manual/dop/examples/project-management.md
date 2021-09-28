# 业务项目管理
本文旨在为您介绍如何通过 Devops 平台管理一个需求从设计到开发上线的完整生命周期。

假设当前有一个“商城系统”的项目，对应有项目经理、产品经理、研发主管、测试工程师、前端开发工程师、后端开发工程师等角色，开发周期为一周，其迭代目标为完成一个用户的注册、注销、更新、查看的需求并上线。由此，该迭代可分为以下几个阶段：
1. 需求设计
2. 开发
   * 任务分发
   * API 设计
   * 开发实现
3. 提测
4. 上线
5. 简单监控
6. 迭代质量

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/a235ef6c-c1b2-40ca-a500-dfb55b02c81c.png)

## 需求设计
进入 **Devops 平台 > 我的项目 > 选择项目 > 项目协同**，新建为期一周、名为“迭代-1.0”的迭代。后续创建的需求、缺陷和任务都将纳入该迭代中。

关于迭代、需求、任务、缺陷等更多信息，请参见 [高效协同](../concepts/agile-info.md)。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/4a474094-a373-490e-9eb0-67c62c694643.png)

由产品经理新建“用户系统”的需求，纳入“迭代-1.0”，并将需求描述、设计稿等信息补充完整。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/1a637e68-fcf7-46a0-a41c-25c14b082bcd.png)

完成需求创建后，创建“用户系统需求评审”的任务，并将其关联“用户系统”需求（下文创建的所有相关事项均将关联该需求），随后组织相关开发及测试同学进行线上或线下评审，讨论该需求的合理性、复杂性、工作量等事宜。评审信息可同步在该任务的描述或备注中，便于后续查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/b84d959a-8029-4f9e-9928-fb1acd7bcac2.png)

## 开发
完成需求设计后，将进入开发实现和测试用例设计、评审阶段。

### 任务分发
由研发主管拆分需求的开发工作，对应创建任务并分配给开发工程师，例如分配用户增删的开发任务给 A 开发工程师，分配用户改查的任务给 B 开发工程师。

由测试工程师新建“用户系统测试用例编写”和“用户系统测试用例评审”的任务，指派给相关测试工程师，同时编写测试用例，具体请参见 [测试用例](../best-practices/manual-test.md#测试用例)。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/ffaae1f0-1bae-44e7-9e1c-73f60a3e6e55.png)

### API 设计
由后端开发工程师进入 **Devops 平台 > 我的应用 > 选择应用 > API 设计**，遵循 API First 原则，通过 [API 设计](../guides/api/api-design.md) 功能定义开发工作中涉及的 API。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/24903e4d-edc9-44a3-9ddc-deca00fd2520.png)

### 开发实现
前后端开发工程师在完成具体开发工作后，将代码合入主干分支，通过  CI/CD 将主干分支部署至测试环境。

## 提测

### 冒烟测试
由测试工程师新建“用户系统冒烟测试”的任务并指派给对应开发工程师。

开发工程师根据测试用例在测试环境上进行冒烟测试，并修复期间出现的缺陷，直至冒烟测试通过率为 100%，则标记该冒烟测试任务为已完成。

### 提交测试
测试工程师为自己新建“用户系统一轮测试”的任务，随后根据测试用例进行测试。

1. 若测试过程中出现缺陷，则标记该条测试用例为不通过，并新建缺陷指派给相关开发工程师进行修复。
2. 开发工程师修复完成后，将缺陷标记为已解决并转回给测试工程师再次进行测试。
3. 测试通过则标记缺陷状态为已关闭，转回给相关开发工程师。
4. 直至测试用例通过率为 100%，则标记该测试任务为已完成。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/20ad675a-4232-4af6-b2bd-e6c59be4957f.png)

### 缺陷跟踪
在 **缺陷** 页面将过滤条件设置为“迭代-1.0”，即可查看当前迭代所有缺陷的状态及相关信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/af54a9ea-cd3a-4f08-af6e-f17bee8fb2c0.png)

开发工程师将按照如下流程对名下缺陷进行流转。当缺陷标记为已解决转给测试工程师时，可在缺陷单中关联修复该问题的 MR，便于后续追踪。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/5aceb444-b9a0-4c8d-8743-6dba765cba5e.png)

## 上线
当迭代下的所有事项均完成后，需将 v1.0 版本通过主干分支的 CI/CD 自动化部署至生产环境，发布上线。

若线上新版本出现严重问题，可在平台中一键回滚至之前版本。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/a10d16bb-046b-48b4-8250-3a1cb1b73dfb.png)

## 简单监控
应用上线后，可进入 **Devops 平台 > 我的应用 > 选择应用 > 部署中心 > 服务插件 > 应用监控**，通过平台的应用监控功能查看新版本是否正常工作，具体请参见 [全局拓扑](../../msp/guides/apm/topology.md)。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/5675c9f0-ca3c-49cf-886c-35867feb019a.png)


## 迭代质量
项目经理可进入 **Devops 平台 > 我的项目 > 选择项目 > 项目大盘**，查看缺陷分布情况、修复进度、修复工作量等信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/36a80c29-0f88-4c2c-9a4c-362575c8d355.png)

也可在 **项目协同 > 迭代** 页面查看迭代整体进度，或通过不同的看板查看当前迭代事项的具体完成情况，便于及时调整工作安排以保证该迭代的交付时间和质量。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/22/ed0d9b19-8211-40c6-b6b6-75fab2ae8744.png)

