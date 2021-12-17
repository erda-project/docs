# 数据源管理

## 数据源作用

平台将根据数据源读取数据所在位置。

## 数据源类型

数据源分为内部（INTERNAL）和外部（EXTERNAL）两类。

### 内部数据源

当前支持 MySQL，主要针对企业内部系统。在创建内部数据模型时，需选择内部数据源。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d931b9c8-eacd-47c9-9723-6a52bfa4e151.png)

在数据集成时，指定从该数据源中集成数据。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/7285b034-2620-4897-aff6-823475b26ebd.png)

### 外部数据源

外部数据源除支持 MySQL 外，还支持 Oracle、Db2、CUSTOM、HANA、PostgreSQL、Kafka、ODPS 等类型，主要针对外部客户所提供的数据。

外部数据源同样可用于创建外部数据模型以及数据集成，此外在数据导出中仅可选择外部数据源进行导出。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/aab3cdd2-c1b3-48ef-a181-153961e71541.png)

## 添加数据源

### 添加 MySQL 数据源

进入 **数据治理 > 数据源管理 > 新建数据源**，选择数据源类型为 MySQL 并配置数据库。保存成功后即可在数据源管理页面查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6ea6492d-8d23-4294-a313-d66c001148af.png)

* **测试连接**：点击确认数据源是否连通。若测试失败，请检查用户名或密码以及其他相关配置是否正确。

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/4c7a6ddb-40ab-4907-9ffc-6b4bb38b1509.png)

* **自动探知**：对于 MySQL 类型的数据源，可自动探知模型，无需手动建模。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/7e834f8a-429e-43df-992b-942bfb42aae0.png)

### 添加 Kafka 数据源

选择数据源类型为 Kafka，配置示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/eea16de7-1530-4e84-8293-e2d849b973c4.png)

### 添加 Elasticsearch 数据源

选择数据源类型为 Elasticsearch，配置示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/82b81967-36ae-4458-94fd-93d92ed3add5.png)

在描述框中添加导入索引和类型信息。

```
{"index":"label","type":"label"}
```

### 添加 ODPS 数据源

选择数据源类型为 ODPS，配置示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/1bcfa4b8-a330-4d27-924b-1d2607763b75.png)

在描述框中添加补充信息，以逗号分隔。

```
{"partition":"ds=123,ms=123","tunnelServer":"http://dt.odps.aliyun.com"}
```

### 同一数据源下多个前缀相同的 MySQL 表（分库分表）

适用于同一数据库下有多张名称为 “ABC_数字” 的表的场景。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/96254e39-f0c0-4c6a-bccd-661a1db1c0db.png)

```
{"tablePrefix":"c_level_change_log_","tableMin":"0","tableMax":"251"}
```

* **tablePrefix**：代表表名的前缀。

* **tableMin**：代表开始的后缀。

* **tableMax**：代表结束的后缀。

对于此类数据源，仅需配置一个数据模型即可，模型名称为上文提及的 ABC 部分，无需添加数字。完成数据集成节点配置且运行后，上述所有表的数据将集成至同一表中。

## 数据源查询

平台支持根据数据源名称、分类、类型、标签等条件筛选数据源。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/52daefbf-6a00-4214-8e8b-f2d5de9c5582.png)

## 数据源一键同步

若数据源连接信息发生变化，可在数据源详情页面一键同步工作流。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/77c5f8aa-d9b3-4725-b6d4-03d4e32d0a0a.png)

随后可通过历史同步记录查看同步状态。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/08aba45d-772f-47f6-8691-92becda65abc.png)

## 数据源导入导出

平台支持批量导入导出数据源，快速便捷。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/f39c0bb1-a143-4725-9632-d001c2fa8d7d.png)
