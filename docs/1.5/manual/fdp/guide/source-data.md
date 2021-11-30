# 源数据管理

数据源配置完成后，下一步是对数据的结构进行规范。

## 概述

### 数据模型作用

定义读取的数据的数据结构。

### 数据模型分类

内部模型：从内部数据源读取数据，是有实体的物理表，如果内部（INTERNAL）数据源中不存在此表，则会进行创建（已废弃）

外部模型：从外部数据源读取数据，不会执行建表操作，可能没有实体。由使用者保证外部（EXTERAL）数据源中表的存在。如果外部数据源不存在此表，如果后续的使用中用到了这张表，就会报错。

## 添加数据模型步骤

因为数据模型依赖数据源，所以首先需要确定读取的数据源是外部还是内部，再创建对应的数据模型。此处举例创建外部数据模型（内部数据模型已废弃，仅供查看历史数据使用）。

1.新增数据模型（非mysql类型数据，如果是mysql类型数据通过数据源探知勾选模型进行同步）

1）选择EXTERNAL；

2）点击新增数据模型；

3）编辑数据模型。

数据源名称：如果创建的是外部数据模型，那么可供选择的数据源也只能是外部数据源，反之亦然。

数据模型标示：相当于给数据模型打上tag，一般用来分类数据模型。可在配置管理的数据标示中新建自己需要的tag。

描述：可不写，对当前数据模型作用进行业务描述。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9e85f508-8605-4092-b9ce-9bf6bf056d22.png)

点击确定创建完成后，展示框最上方会显示刚才创建的数据模型。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/740eee3f-bb6b-4360-acd7-3a4168f0bd99.png)

2.点击刚才创建的数据模型，对字段进行编辑（非mysql类型的数据才可编辑，mysql类型的字段数据通过数据源探知进行数据同步）

如果创建的数据模型名称在数据源中有相同名称的表，那么数据源内表的数据结构会自动同步过来。

此处支持两种编辑模式：自定义模式和SQL编译模式。

**1). 自定义模式：**

（1）选择自定义模式；

（2）点击新增字段；

（3）对字段进行配置；

（4）点击确定，保存配置。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/3642f9e2-5f73-44de-933f-6d1e56522c9b.png)

若需要添加索引，可以点击下方新增索引，对索引进行配置

**2). SQL编译模式 （INTEREAL）（已废弃）**

（1）选择SQL编译模式；

（2）在空白框输入语句**（在****内部****模型中仅支持ALTER TABLE ）**；

（3）点击执行；

（4）如果在执行结果中字段出现则表示成功，若没有出现，可以在下方日志中查看SQL报错信息进行排查。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/81a5fca4-1384-485b-9dac-0a992f5721ff.png)

**SQL编译模式 （EXTERAL）**

创建外部数据模型和内部数据模型使用自定义模式时步骤一致，但在使用**SQL编译模式**时略有不同

针对当表的字段过多，一个一个新增字段太过麻烦的情况。

（1）选择SQL编译模式；

（2）在空白框输入语句**（在****外部****模型中支持CREATE TABLE ）；**

（3）点击执行；

（4）如果在执行结果中字段出现则表示成功，若没有出现，可以在下方日志中查看SQL报错信息进行排查。
对es的数据源建数据模型建表语句示例：

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

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fdd3a840-7fc8-455d-ac15-31d3425fcc50.png)

点击数据模型内的编辑，可以在字段已经生成情况下修改字段配置（非mysql类型数据可修改）。

点击数据模型外的编辑，可以修改数据模型。

批量打标功能是当在左边复选框选择一个或多个数据模型时，点击后可以对这些数据模型同步添加数据模型标示。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9acc208a-f786-447f-bd02-4bd4ec4cba8e.png)

## 数据模型查询

1. 首先确定要查询的数据模型是内部还是外部，选择对应的类型；

2. 数据源名称，数据模型名称，数据模型标示，创建时间等填写一个或多个后进行搜索。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/991488ca-41ae-4ec5-8669-ed34789b455d.png)

## 即席查询

能在页面上查询cassandra模型的数据。

注：在原数据管理-即席查询下，只能查询ods模型。如需查询其他模型，请移步数据集市-即席查询进行。

1) 选择即席查询；

2) 选择模型类型和模型名称；

3) 点击复制查询语句；

4) 点击执行进行查询。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c502c385-ba88-4242-a468-e3557a31db60.png)

如果查询的模型不是本人创建的话，会出现没有权限的提示，如下图。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/cbf1c3a3-c61f-4c1b-85b5-623e79f6c103.png)

申请权限步骤：

1）点击数据模型；

2）在模型名称中输入要申请的模型；

3）点击图标进行申请。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/97caba8b-17a3-46ae-a709-4cca85ab142f.png)

提交的申请会在数据权限中显示。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e532a58d-5883-40af-b630-bc802b463115.png)

## 字段配置

可以对数据模型中的一些字段进行脱敏加密。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/67c81a6d-97be-4241-a0c3-0483d16a504f.png)
