# 数据标准管理

## 域定义

用于定义主题域，在创建模型时可选择某一主题域前缀，按主题划分不同数仓层次中的数据表。

进入 **数据治理 > 数据标准管理 > 域定义**，根据需要新增、编辑或删除主题域。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/5eec4292-a4b8-4a8b-b279-ce5ad363fcc0.png)

## 模型管理

用于定义数据模型，当前支持以自定义模式或 SQL 模式创建字段。创建数据模型时，可选择不用的模型类型对应数仓标准中的不同层次，选择不同的主题域前缀对模型进行分类。完成创建后，可物理化模型将该模型创建至数据库中。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/7744d11a-2a60-4d43-b553-00b6656bb79e.png)

物理化模型后，配置工作流时也可在创建方式中选择已有模型。

## 关系网

用于定义不同模型之间的字段关联关系，目前支持 Left、Right、Full 和 Inner 关联类型，后续生成自定义工作流时可自动生成两个表之间的关联关系 SQL 语句。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/e7184d3c-b6ae-479c-a531-936fe7726894.png)

## 指标定义

基于表字段定义需统计的数据和统计逻辑。指标类型分为原子指标和派生指标，原子指标可指定统计字段和统计逻辑，派生指标仅能基于原子指标定义，指定业务限定、统计周期和统计粒度。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/48beec03-72b6-4ced-bfa2-8c95f72ab3d2.png)

## 统计周期

用于后续的指标统计，根据配置的时间范围统计指标数据。若被指标关联，则无法修改或删除。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/cabb90ad-3e24-43f3-bd8b-a0ed501e8d4a.png)

## 业务限定

针对模型上某个字段进行业务上的限定条件约束。若在创建派生指标时指定，生成自定义工作流时将创建对应的 SQL 语句。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/35551110-f2c5-43da-a9ee-8e43b6be6986.png)