# 单元测试

为保证系统的稳定性，单元测试必不可少。平台通过 UT Action 提供针对单元测试的能力抽象。

用户推送代码时将触发 UT Action，Action 将探测应用的语言框架，并选择相应的方式进行单元测试。

## 执行测试

平台支持在流水线中快速嵌入单元测试节点，建议通过流水线图形化编排的方式添加 UT Action，如下图所示：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/cc74b0fa-e7f8-4ca5-8048-9f41cb01e427.png)

* **context**：必填， 作为 UT 的代码存放目录，通常为 Git Action 的 Destination 目录。若项目存在多种语言，必须指定模块路径并以 "," 分隔，例如 “repo/path1,repo/path2”。
* **name**：选填，本次 UT 测试名称。
* **go_dir**：选填，若 UT 的对象为 Golang，则该项为必填。该值为 $GOPATH 下的项目路径。

## 测试结果

测试结果可进入 **DevOps 平台 > 项目 > 应用 > 代码质量 > 执行列表** 查看，包括执行分支、耗时以及执行结果等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/c613db4f-2042-4bf1-94d1-c7fa8e9530be.png)

点击任一执行记录可查看其测试详情。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/4c4712bb-fd81-41c3-9f4b-31540b015e75.png)
