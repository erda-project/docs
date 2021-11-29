# 代码质量（Sonar 门禁规则）

## 介绍

在整个开发流程中，大家的目标都是交付可用的、高质量的代码。因此，代码质量至关重要。

平台通过 Sonar 为应用提供代码质量扫描能力。

## 快速上手

平台提供 Sonar Action，用户可以很方便地在流水线中嵌入该节点，进行代码质量扫描卡点。

建议通过流水线图形化编排的方式添加 Sonar Action，如下图所示：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/16d109f4-84dc-4d72-bda6-b91e05dd4c5e.png)

各个参数的解释说明将鼠标移至问好处即可查看。

下面对重要参数进行解释：

> **code_dir:** 需要扫描的代码目录
>
> **language**: 语言类型，当前版本需要用户需要明确指定。支持 java / go / js
>
> **sonar_exclustions**: 声明哪些文件不进行代码质量扫描
>
> **quality_gate**: 添加门禁指标

## 如何设置自定义门禁

当使用自定义门禁时，内置的规则不再生效，完全以用户自定义配置为准。

具体门禁指标配置请参考 [Sonar 官方文档](https://docs.sonarqube.org/latest/user-guide/metric-definitions/)

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a793c421-3a59-4055-967c-828f5b1f7d1b.png)

如上图所示，添加了两个自定义门禁指标：

- Bug 数小于 5 个
- 代码注释总行数大于 100 行

只有当这两个指标同时满足时，才算通过门禁。否则，判定代码质量不合格。

## 如何修改内置门禁

平台内置60余种门禁规则，添加门禁规则进行覆盖。

请进入 **DevOps 平台 > 项目 > 项目设置 > 代码质量门禁** 操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c4d80b7c-68cf-4958-be4d-042ce9550d51.png)

## 查看扫描报告

报告内容包括：

- 代码缺陷
- 代码弱点
- 代码异味
- 测试覆盖率
- 代码重复率

以及具体的问题列表。

进入 **DevOps 平台 > 项目 > 应用 > 代码质量 > 质量报告**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/23281a5b-539a-4271-8106-b05ce1c5c1b8.png)

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4ba081ed-ff9c-4fe4-bc29-0132976d5732.png)
