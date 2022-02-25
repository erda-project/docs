# 代码质量（Sonar 门禁规则）

对于应用开发而言，最终目标是交付可用的、高质量的代码。因此，代码质量至关重要。

平台通过 Sonar 为应用提供代码质量扫描能力。

## 快速上手

平台支持在流水线中快速嵌入 Sonar Action 节点进行代码质量扫描，建议通过流水线图形化编排的方式添加，如下图所示：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/50a59004-9242-4ce8-8191-077dd975ab76.png)

移动鼠标至参数后的图标可查看具体说明：

* **code_dir**：需扫描的代码目录。
* **language**：语言类型，需由用户指定，当前支持 Java、Go 和 JS。
* **sonar_exclustions**：声明无需代码质量扫描的文件。
* **quality_gate**：添加门禁指标。

## 设置自定义门禁

若使用自定义门禁，则内置规则不再生效，以用户自定义的配置为准。

关于门禁指标配置更多信息，请参见 [Sonar 官方文档](https://docs.sonarqube.org/latest/user-guide/metric-definitions/)。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/2f984343-8440-4924-a451-8b2878ba599f.png)

上图示例已添加两个自定义门禁指标：

- Bug 数量小于 5 个。
- 代码注释总行数大于 100 行。

同时满足以上两个指标方可通过门禁，否则将判定代码质量不合格。

## 修改内置门禁

平台内置 60 余种门禁规则，请进入 **DevOps 平台 > 项目 > 项目设置 > 代码质量门禁** 操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/ae2a1d2d-9b20-434d-9c5f-e2cfe27fe27b.png)

## 查看扫描报告

进入 **DevOps 平台 > 项目 > 应用 > 代码质量 > 质量报告** 查看报告。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/6b00a873-53f9-497e-b495-ae690da46864.png)

报告内容包括代码缺陷、代码弱点、代码异味、测试覆盖率、代码重复率等。

进入 **DevOps 平台 > 项目 > 应用 > 代码质量 > 问题列表** 可查看具体问题。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/3e0aa10c-0e69-4d1b-a136-3a580a220d1d.png)
