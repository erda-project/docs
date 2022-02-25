# 代码质量（Sonar 报告）
## Sonar

质量报告由 Sonar Action 提供，主要涉及参数：

* **code_dir**：需扫描的代码目录。

* **language**：语言类型，需由用户指定，支持 Java、Go、JS。

## 获取质量报告

在流水线文件中添加 Sonar Action（任务类型 > 测试管理 > Sonar 代码质量检查）。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/f7dc6a11-a055-419e-b56e-a55a5c7a30d0.png)

执行流水线后可进入 **DevOps 平台 > 项目 > 应用 > 代码质量** 查看质量报告和问题列表。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/5465bc06-3914-4444-b323-fc8c4e578e76.png)

* **代码缺陷**：代码中存在的 Bug。

* **代码脆弱点**：可能导致代码 Bug 的问题。

* **代码异味**：代码中某处可能存在错误的提示。

* **代码覆盖率**：测试过程中被执行的源代码占全部源代码的比例。

* **代码重复率**：结构和语法一致的代码或功能和逻辑一致的代码占全部源代码的比例。

问题列表展示检测出的问题，可根据类型、优先级、名称进行过滤。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/3d617df1-e740-4c91-8c29-2d17454cdce7.png)

问题详情页提供链接可快速跳转至代码所在文件。您可在该页面评论问题或关联事项。问题解决后可点击 **关闭** 按钮关闭问题。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/3d714cfe-57ed-4727-a371-f8ebdf4093c2.png)
