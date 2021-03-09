# 代码质量扫描

## 介绍

在整个开发流程中，大家的目标都是交付可用的、高质量的代码。因此，代码质量至关重要。

平台通过 Sonar 为应用提供代码质量扫描能力。

## 快速上手

平台提供 Sonar Action，用户可以很方便地在流水线中嵌入该节点，进行代码质量扫描卡点。

建议通过流水线图形化编排的方式添加 Sonar Action，如下所示：

![在流水线中添加代码扫描节点](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/12/07/cf9840c8-85c1-4f5b-ba30-ff880aaa0d25.png)

下面对重要参数进行解释：

完整文档请将鼠标移至每个参数后的问号处查看。

### code_dir

需要扫描的代码目录

### language

语言类型，当前版本需要用户需要明确指定。支持 java / go / js

## 如何设置自定义门禁

通过 Action 的 `quality_gate` 参数进行设置。

当使用自定义门禁时，内置的规则不再生效，完全以用户自定义配置为准。

具体门禁指标配置请参考 [Sonar 官方文档](https://docs.sonarqube.org/latest/user-guide/metric-definitions/)

![自定义门禁](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/12/07/2ffef76f-7c58-45cd-9336-90f9cf985f43.png)

例如上图，添加了两个自定义门禁指标：

- Bug 数小于 5 个
- 代码注释总行数大于 100 行

只有当这两个指标同时满足时，才算通过门禁。否则，判定代码质量不合格。

## 查看扫描报告

报告内容包括：

- 代码缺陷
- 代码弱点
- 代码异味
- 测试覆盖率
- 代码重复率

以及具体的问题列表。

入口：

> DevOps 平台 -> 我的应用 -> 具体应用 -> 代码质量 -> 质量报告、问题列表

![查看报告](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/12/07/3296cbb5-6d8a-4f35-a582-5ce75578de88.png)

![问题列表](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/12/07/0e3dd3f2-2334-4bf0-aa66-d5228ad3f1bc.png)
