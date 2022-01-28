# 源模型管理

完成数据源配置后，需规范数据结构。

## 数据模型作用

用于定义读取数据的结构。

## 数据模型分类

* **内部模型**：从内部数据源读取数据，存在实体的物理表。若内部数据源中不存在该表，将自动进行创建。

* **外部模型**：从外部数据源读取数据，不执行建表操作，使用者需保证外部数据源存在表。若不存在，后续操作如涉及该表，平台将报错。

## 添加数据模型

数据模型依赖于数据源，因此请先确定读取的数据源类型，再创建对应的数据模型。此处以外部数据模型为例（内部数据模型仅供查看历史数据使用）。

1. 新增数据模型（非 MySQL 类型，MySQL 类型可通过数据源探知进行同步）。选择 **EXTERNAL**，点击 **新增数据模型** 并填写相关信息。
   * **数据源名称**：外部数据模型仅有外部数据源可供选择。
   * **数据模型标签**：为数据模型配置标签，用于分类数据模型。
   * **描述**：选填，对当前数据模型进行业务描述。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9e85f508-8605-4092-b9ce-9bf6bf056d22.png)

完成数据模型创建后，源模型管理页面将展示该数据模型。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/740eee3f-bb6b-4360-acd7-3a4168f0bd99.png)

2. 点击已创建的数据模型，编辑字段（仅可编辑非 MySQL 类型数据，MySQL 类型的数据字段可通过数据源探知进行同步）。平台支持两种编辑模式：自定义模式和 SQL 编译模式。

   * **自定义模式**

     选择 **自定义模式**，点击 **新增字段** 后配置字段，点击 **确定** 保存配置。![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/3642f9e2-5f73-44de-933f-6d1e56522c9b.png)

     如需添加索引，点击下方 **新增索引** 进行配置。

   * **SQL 模式 （EXTERNAL）**

     SQL 模式中可定义源数据模型表结构。

     选择 **SQL 模式**，在编辑框中输入语句后点击 **执行**。若执行结果为成功则表示创建成功，若失败可通过日志查看 SQL 报错信息进行错误排查。示例如下：

     ```
     create table if not exists member (
     ID id ,
     PROFILE3 keyword comment '',
     PROFILE19 keyword comment '',
     PHONE keyword comment '',
     PROFILE45 keyword comment '',
     PROFILE80 keyword comment '',
     OBJECTID keyword comment '',
     tagCode502_VALUE keyword comment '',
     primary key (id)
     )
     ```

批量打标用于对选择的数据模型批量添加数据模型标签。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/b206b15b-5a11-4d64-ac90-08bdeda55195.png)

## 查询数据模型

1. 选择数据模型类型（INTERNAL 或 EXTERNAL）。

2. 填写数据源名称、数据模型名称、数据模型标签及创建时间等搜索条件进行查询。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/991488ca-41ae-4ec5-8669-ed34789b455d.png)

## 即席查询

可查询经工作流处理后的模型数据。

进入 **数据集成 > 即席查询**，选择模型类型和模型名称，点击复制查询语句后再点击 **执行** 进行查询。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c502c385-ba88-4242-a468-e3557a31db60.png)

若查询的模型非本人创建，将出现无权限的提示，如下图所示：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/cbf1c3a3-c61f-4c1b-85b5-623e79f6c103.png)

如需申请权限，请进入 **数据治理 > 工作流表**，输入需申请的模型名称，点击图标申请授权。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/97caba8b-17a3-46ae-a709-4cca85ab142f.png)

提交的申请可在 **数据权限 > 我发起的** 页面查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e532a58d-5883-40af-b630-bc802b463115.png)

## 配置字段

您可对数据模型中的字段进行脱敏或加密设置。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/67c81a6d-97be-4241-a0c3-0483d16a504f.png)
