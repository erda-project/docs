# 事项自定义&工作流

## 自定义字段

如默认的事项字段无法满足使用需求，您可以创建自定义事项字段。

### 创建自定义字段

进入 **管理中心 > 组织设置 > 项目 > 事项自定义字段**，新建事项字段。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/171bbc2f-67db-4f69-9afe-18c800121023.png)

自定义事项字段支持多种类型：

* Select 单选框
* MultiSelect 多选框
* Text  文本
* URL 网址
* Email 电子邮箱
* Date 日期
* Person 人员
* Number 数字
* Phone 电话

其中 Select 和 MultiSelect 属于枚举类型，需要您自定义枚举值。

### 配置自定义字段

完成自定义字段创建后，可选择配置该自定义字段的事项类型。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/4b0299d6-29aa-4c10-9a4c-86afd8552379.png)

选择事项类型，即可选择自定义字段进行引用，则组织下该类型的全部事项都将新增一个字段。

事项处自定义字段的显示顺序与配置顺序保持一致。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/4b73158f-5ce7-4b7d-9832-77ac20eb2b87.png)

### 更新自定义字段

除枚举类型外，其余自定义字段均可自由修改类型。

枚举类型字段仅允许由 Select 类型转换为 MultiSelect 类型。

## 事项工作流

工作流是事项状态的流转集合，事项状态能否流转由工作流决定。

事项工作流拥有多个主状态，每个主状态均为若干个子状态的集合，子状态之间拥有流转状态。

需求、缺陷和任务均拥有单独的工作流，您可以自定义管理各个事项类型的工作流。

请进入 **DevOps 平台 > 项目 > 项目设置 > 事项工作流**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/2ce1d19f-6d95-407d-aab2-3981577db0b2.png)

创建项目时，平台将自动为其创建默认工作流。

如需改变工作流，您可选择具体的事项类型进行修改，设置状态或流转。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/436b3261-a6bf-4e83-bccb-63f4c754baa1.png)

