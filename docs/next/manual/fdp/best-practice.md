# 基于数据平台的标签群组构建

数据平台可采集业务系统产生的数据，经过一系列标准化处理后，按照约定输出至存储系统（默认为 ElasticSearch 或 ClickHouse），供业务读取，进行人群圈选，进而营销触达等。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/3712a89f-b70b-43a5-b2c5-164cbc71d1e1.png)

标签群组数据实施的基本流程如下：

1. 确认需求，确定输入数据来源、数据输出方式及格式。
2. 配置工作流，包括数据集成、清洗、萃取、数据导出、标签计算节点等，根据实际需求制定详细实施方案。
3. 在业务系统中查询 CDP 标签指标，并以列表展示。
4. 在业务系统的标签模块中，为上述展示的指标配置标签规则。
5. 在业务系统中同步标签配置，配置元数据下发 CDP 进行工作流运行。
6. 从 CDP 自动同步数据至 ES，验证无误后设定定时任务。
7. CDP 定时任务检测发现标签计算结束，将回调业务系统发送的 URL 通知更新状态。

## 前提条件

着手实施前，请先确认以下几点：

1. 确定群组圈选目标，圈选会员 ID、OneID，抑或手机号、微信 OpenID。
2. 确定输入数据信息，包括所需字段来源、数据库链接信息和表的 DDL 语句。
3. 确定输出数据信息，包括输出 ES 的链接信息、输出索引和输出格式。

## 配置流程

此处将以数据集成 > 数据计算 > 数据服务 > 标签配置的流程配置工作流。

1. 数据集成
   * 配置数据源
   * 配置源数据模型
   * 配置数据集成节点

2. 数据计算
   * 配置清洗节点
   * 配置萃取节点

3. 数据服务

   * 配置导出节点

   * 配置标签计算节点

您可为表中字段配置标签，数据平台将同步源数据至会员平台，会员平台可在此基础上为字段添加规则并同步至数据平台，数据平台即可根据字段规则进行计算。若会员平台未配置规则，则该节点在实际执行中无法进行计算。

例如，某一百万数据中包含年龄字段。您可在标签计算节点中设置年龄字段为指标，在会员平台设置规则（年龄大于 18 为成年人，小于 18 为未成年人），数据平台即可通过计算了解成年和未成年的具体人群。

4. 标签配置

   * 进入会员平台，点击 **标签群组 > 标签库 > 新增** 新增标签。

     ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/293e0e29-2f8e-43e3-84e2-06dc3085184f.png)

   * 完成创建后，点击该标签的 **查看** 按钮。

     ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6ddfaaeb-5fc5-4747-9cd1-c30a91715131.png)

   * 点击 **新增标签值**。

     ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4884c8b7-dc09-41ed-b9af-ad3a1fc91094.png)

   * 设置萃取规则，规则需关联萃取指标中的字段。

     ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/958699ce-5b65-4269-ad20-ebd9d4cd8f92.png)

     ::: tip 提示

     同步标签前务必完成萃取规则配置，否则将导致同步失败。

     :::

   * 启用标签。
   
     ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/56f6b7b0-e3c9-44a3-a117-2f144b3917ea.png)
   
   * 同步标签。
   
     ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/7ca51003-7a62-45cb-b9cd-61e035c4407f.png)

## 标签价值

通过数据平台标签化用户多维度的信息，能够以低成本构建用户标签体系，灵活配置群组并分类用户，从而形成企业目标用户的人群画像。通过对不同特征群组的区别化营销以及会员生命周期监控，可帮助企业实现精细化的运营闭环，降本增效，最终提升客户满意度。
