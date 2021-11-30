# 数据源管理

## 概述

### 数据源的作用

FDP 根据数据源来读取数据所在位置。

### 数据源的类型

数据源分为内部（INTERAL）和外部（EXTERAL)两种类型。

**内部数据源**：

内部数据源类型目前主要支持mysql,主要针对企业内部系统。

在创建内部数据模型时，需要选择内部数据源，在此数据源上创建数据模型。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d931b9c8-eacd-47c9-9723-6a52bfa4e151.png)

在数据集成步骤中，指定从那个数据源中集成数据。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/7285b034-2620-4897-aff6-823475b26ebd.png)

**外部数据源**：

外部数据源除支持mysql外，还支持Oracle,DB2,CUSTOM,HANA,POSTGRESQL,KAFKA,ODPS等类型，后续可以根据客户需求来新增支持的数据类型，主要针对外部客户所提供的数据。

外部数据源和内部数据源一样，同样可以在创建外部数据模型，数据集成中使用，另外在数据导出中只能选择外部数据源进行导出

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/aab3cdd2-c1b3-48ef-a181-153961e71541.png)

## 添加数据源

### 添加 MySQL 数据源步骤

1.在数据源管理界面中选择新增数据源：

1）选择创建数据源的分类，此处选择EXTERAL进行举例；

2）选择数据源的类型,此处选择mysql。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f4461f2d-b08a-4191-9d8d-e818adcb2c1f.png)

2.选择类型后，需要对数据库进行连接配置，如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6ea6492d-8d23-4294-a313-d66c001148af.png)

3.测试 ： 点击测试连接，确保数据源能连通。

  如测试失败，可检查用户名或者密码是否配置失误，一般是以下几项配置错误造成：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4c7a6ddb-40ab-4907-9ffc-6b4bb38b1509.png)

成功后保存则可在数据源管理中看到配置好的数据源。

4. 自动探知：对于mysql类型的数据源，可自动探知模型，不需要手动建模型

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/7e834f8a-429e-43df-992b-942bfb42aae0.png)

   勾选模型后，点击保存，会自动建对于的模型。

### Kafka 的导出数据源配置

基础的配置如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/eea16de7-1530-4e84-8293-e2d849b973c4.png)

针对特定需求要做配置修改。

如果需要写入的数据覆盖，去重，则建的模型指定对应的字段为主键。

### ES 的导出数据源配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/82b81967-36ae-4458-94fd-93d92ed3add5.png)

本次导入的索引和类型信息在描述中添加

```
{"index":"label","type":"label"}
```

### ODPS 的导出数据源配置

基础配置如下

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/1bcfa4b8-a330-4d27-924b-1d2607763b75.png)

在描述框中添加补充信息，分区信息,多个用逗号分隔

```
{"partition":"ds=123,ms=123","tunnelServer":"http://dt.odps.aliyun.com"}
```

链接地址填写endpoint信息；

数据库名称填写 projectName；

用户名 ：对方提供的id或者称为ak；

密码 ： 对方提供的secret 或者称为sk；

导出的模型名与maxcompute的tableName一致。

### 同一个数据源下多个前缀相同的mysql表（分库分表）

使用场景限制：同一个数据库下，有多张表，多张表表名均为 ABC_数字 。

格式：1.ABC相同（ABC中可以包含下划线）；2.数字连续。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/96254e39-f0c0-4c6a-bccd-661a1db1c0db.png)

```
{"tablePrefix":"c_level_change_log_","tableMin":"0","tableMax":"251"}
```

tablePrefix 代表表名的前缀。

tableMin 代表开始的后缀。

tableMax 代表结束的后缀。

对于这种数据源，在配置数据模型时，只需配置一个数据模型即可，模型名为上文提到的ABC部分，不需要加后面的数字部分。在配置数据集成节点且运行后，上述所有表中的数据会集成到同一张表中。

## 数据源查询

对数据源名称，分类，类型，数据源标示等一个或多个填写后进行搜索

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/52daefbf-6a00-4214-8e8b-f2d5de9c5582.png)

## 数据源一键同步

若数据源连接信息有变更，在数据源页面，可进行工作流一键同步。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/77c5f8aa-d9b3-4725-b6d4-03d4e32d0a0a.png)

操作后，可通过历史同步记录查看同步状态。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/08aba45d-772f-47f6-8691-92becda65abc.png)

## 数据源导入导出

对数据源可进行批量导入导出，方便操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/f39c0bb1-a143-4725-9632-d001c2fa8d7d.png)
