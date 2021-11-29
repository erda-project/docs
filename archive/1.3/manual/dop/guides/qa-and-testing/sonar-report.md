# 代码质量（Sonar 报告）
## Sonar

质量报告由Sonar Action提供,主要有以下参数

### code_dir

需要扫描的代码目录

### language

语言类型，当前版本需要用户需要明确指定。支持 java / go / js

## 获取质量报告

在流水线文件中添加Sonar Action（任务类型 -> 测试管理 -> sonar 代码质量检查）

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9b851e6c-bce0-41f4-b8d5-02c1bba92bd4.png)

执行流水线后可查看质量报告和问题列表

请进入 **DevOps 平台 > 项目 > 应用 > 代码质量** 查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4ee56727-0e1d-445a-b1da-be76111f04ae.png)

代码缺陷：代码中存在的BUG

代码脆弱点：可能导致代码BUG的地方

代码异味：代码中某个地方可能存在错误的一个提示

代码覆盖率：测试过程中被执行的源代码占全部源代码的比例

代码重复率：结构和语法一致的代码或功能和逻辑上一致的代码占全部源代码的比例

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/0dd696be-0ebd-4c46-97de-0191d23b9d32.png)

检测出的问题会被列在问题列表中，可以根据类型、优先级、名称进行过滤

被关闭的问题会显示在已关闭列表中

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fc6ce561-139d-412f-ac67-db3dd7add5d2.png)

详情页面提供来跳转链接快速跳转至代码所在文件

可以在问题详情页面对问题进行评论、关联事项来进行协作

问题被解决后可点击关闭按钮来关闭问题

