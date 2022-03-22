# 数据源管理

## 数据源作用

平台将根据数据源读取数据所在位置。

## 数据源类型

数据源分为内部（INTERNAL）和外部（EXTERNAL）两类。

### 内部数据源

支持 MySQL，主要针对企业内部系统。当前内部数据源仅供查看历史数据使用。

### 外部数据源

外部数据源除支持 MySQL 外，还支持 Oracle、Db2、CUSTOM、HANA、PostgreSQL、Kafka、ODPS 等类型，主要针对外部客户所提供的数据。

外部数据源同样可用于创建外部数据模型以及数据集成，此外在数据导出中仅可选择外部数据源进行导出。

## 添加数据源

### 添加 MySQL 数据源

进入 **数据治理 > 数据源管理 > 新增数据源**，选择数据源类型为 MySQL 并配置数据库。保存成功后即可在数据源管理页面查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/5c466ee5-ec28-4582-8369-1393c05fa255.png)

* **测试连接**：点击确认数据源是否连通。若测试失败，请检查用户名或密码以及其他相关配置是否正确。

* **自动探知**：对于 MySQL 类型的数据源，可自动探知模型，无需手动建模。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/00791e7f-527d-4cf3-9615-a8e39fa3be63.png)

### 添加 Kafka 数据源

选择数据源类型为 Kafka，配置示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/086c3c98-d309-473f-9a55-c1bce2c1a177.png)

### 添加 Elasticsearch 数据源

选择数据源类型为 Elasticsearch，配置示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/276b94ac-f342-4463-a095-f89348b72863.png)

在描述框中添加导入索引和类型信息。

```
{"index":"label","type":"label"}
```

### 添加 ODPS 数据源

选择数据源类型为 ODPS，配置示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/e26db46a-2045-46f0-b59e-52a6223cfe55.png)

在描述框中添加补充信息，以逗号分隔。

```
{"partition":"ds=123,ms=123","tunnelServer":"http://dt.odps.aliyun.com"}
```

### 同一数据源下多个前缀相同的 MySQL 表（分库分表）

适用于同一数据库下有多张名称为 “ABC_数字” 的表的场景。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/c01f20a4-6e9e-4890-b292-126ba619e9fb.png)

```
{"tablePrefix":"c_level_change_log_","tableMin":"0","tableMax":"251"}
```

* **tablePrefix**：代表表名的前缀。

* **tableMin**：代表开始的后缀。

* **tableMax**：代表结束的后缀。

对于此类数据源，仅需配置一个数据模型即可，模型名称为上文提及的 ABC 部分，无需添加数字。完成数据集成节点配置且运行后，上述所有表的数据将集成至同一表中。

## 数据源查询

平台支持根据数据源名称、分类、类型、标签等条件筛选数据源。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/ca0aa066-d9f8-4e62-b047-594146ef7ff1.png)

## 数据源一键同步

若数据源连接信息发生变化，可在数据源详情页面一键同步工作流。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/17a9f2d6-1d13-493c-89f4-a1364fb20613.png)

随后可通过历史同步记录查看同步状态。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/f0498dcb-f1c9-4025-a9b7-71e11d78e673.png)

## 数据源导入导出

平台支持批量导入导出数据源。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/76221536-575b-47ef-8de9-4910ebea6d12.png)
