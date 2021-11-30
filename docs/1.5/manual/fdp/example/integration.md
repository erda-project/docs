# 多渠道数据集成

在企业中，尤其是大型企业中，由于程序的开发时间不同，开发的部门不同，运行所在的软硬件平台不同，导致程序运行产生的数据以不同的数据结构存在于相互独立的存储中，形成“数据孤岛”。随着企业数字化智能化的深度开展，部门内，部门间，企业间数据通讯的需求愈加迫切，但孤岛间的数据冗余，不一致，不互通，严重阻碍了企业信息化建设的进程。

## 概述

数据集成是稳定高效、弹性伸缩的数据同步平台，致力于提供复杂网络环境下、丰富的异构数据源之间高速稳定的数据移动及同步能力。

## 支持的数据源

数据集成包括离线同步和实时同步，本文为您介绍离线和实时同步支持的数据源类型。

**1.离线同步支持数据源**

| 数据源类型         | 抽取（Reader） | 导出（Writer） |
| ------------------ | -------------- | -------------- |
| Mysql              | 支持           | 支持           |
| Oracle             | 支持           | 支持           |
| DB2                | 支持           | 支持           |
| Sqlserver          | 支持           | 支持           |
| Analytic for Mysql | 支持           | 支持           |
| OSS                | 支持           | 支持           |
| SAP HaNa           | 支持           | 支持           |
| PostgreSQL         | 支持           | 支持           |

**2.实时同步支持数据源**

| 数据源类型    | Source | Sink   |
| ------------- | ------ | ------ |
| Mysql         | 支持   | 支持   |
| Mysql-cdc     | 支持   | 支持   |
| Kafka         | 支持   | 支持   |
| Redis         | 支持   | 支持   |
| Minio         | 支持   | 支持   |
| sqlserver     | 支持   | 支持   |
| sqlserver-cdc | 支持   | 不支持 |
| Oracle        | 支持   | 支持   |
| oracle-cdc    | 支持   | 不支持 |

## 离线数据集成配置

### 新建数据源

1. 选择数据源管理页面点击新建数据源。

2. 填写数据源配置信息。

   | **参数**     | **说明**                          | **是否必填项** |
   | ------------ | --------------------------------- | -------------- |
   | 数据源名称   | 数据源命名                        | 是             |
   | 数据源标识   | 数据源标识（配置方式参考4.3.3.2） | 是             |
   | 描述         | 数据源描述                        | 否             |
   | 分类         | INTERNAL/EXTERNAL                 | 是             |
   | 类型         | 数据源类型                        | 是             |
   | 连接地址     | 数据源访问地址                    | 是             |
   | 端口         | 数据源访问端口                    | 是             |
   | 数据库名称   | 数据源库名                        | 是             |
   | 数据库用户名 | 数据库用户名                      | 是             |
   | 数据库密码   | 数据库密码                        | 是             |
   | 服务器ID     | 数据库所在服务器HOST              | 否             |
   | 服务器名称   | 数据库所在服务器名称              | 否             |

3. 填写参数完毕后，点击右上角测试连接进行数据平台与将连接数据库进行连通性测试。
4. 点击测试成功后，如果是MYSQL类型数据源可点击右上角自动探知，进行查看，同步数据库下对应表模型信息。
5. 展示列表中，已勾选模型表示已创建源数据模型，可对未勾选模型进行创建源数据模型至源模型管理界面查看。
6. 点击页面右侧编辑和删除可对已创建数据源进行管理。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/20/fa8cc751-0c35-4c10-8d3e-06d585ca70f1.gif)

**注意：**

1. 删除数据源时，如该数据源存在关联源数据模型及工作流，该数据源无法删除；
2. INTERNAL(内部)/EXTERNAL(外部)区别：

- 面向对象：INTERNAL主要针对企业内部系统数据源（已废弃），EXTERNAL针对企业外部系统数据源。
- 功能：内部数据源在数据平台中创建的内部数据模型对应数据库有相同的表随之创建，外部数据源对应外部数据模型只拥有读取权限；

### 新建源数据模型

1. 进入源模型管理页面选择创建INTERNAL(内部)/EXTERNAL(外部)源数据模型。源数据模型的类型取决去数据源的类型，即INTERNAL(内部)数据源对应INTERNAL(内部)源数据模型，EXTERNAL(外部)数据源对应EXTERNAL(外部)源数据模型；

2. 点击右上角开始新增源数据模型（非mysql类型可以新建，mysql类型的直接通过数据源探知获取）；

   | **参数**     | **说明**                 | **是否必填项** |
   | ------------ | ------------------------ | -------------- |
   | 数据模型名称 | 数据模型名称             | 是             |
   | 数据源名称   | 选择数据模型所在的数据源 | 是             |
   | 数据模型标识 | 配置方式(参考4.3.3.2）   | 是             |
   | 描述         | 对模型进行描述           | 否             |


3. 自定义模式可新增模型中字段信息，也可通过右侧编辑和删除（非mysql类型可以编辑删除，mysql类型通过探知得到的模型不可修改删除）
4. SQL编译模式可写SQL对源数据模型进行定义表结构；

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
```

5. 点击页面右侧编辑和删除可对已创建源数据模型进行管理；

**注意：**

1. 在内部模型中仅支持ALTER TABLE语法（已废弃）。
2. 如果在SQL编译模式执行结果中成功则表示创建成功，若失败，可以在下方日志中查看SQL报错信息进行错误排查。
3. 操作演示。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/20/643b2df9-ff98-4335-bbc0-06c5e0a7e19e.gif)

### 新建数据集成任务节点

1. 离线数据集成任务配置时，任务节点所属工作流周期选择单次任务或周期任务。

2. 拖拽锚点可创建新的节点任务，选择数据集成。

3. 填写数据集成节点基础信息

   | **参数**     | **说明**                                            | **是否必填项** |
   | ------------ | --------------------------------------------------- | -------------- |
   | 节点名称     | 任务节点名称                                        | 是             |
   | 描述         | 任务节点描述                                        | 否             |
   | 视图类型     | 选择视图编辑 / 自定义编辑（Datax代码）              | 是             |
   | 存储方式     | 选择存储一/存储二（存储一和存储二详见产品功能介绍） | 是             |
   | CPU          | 分配该任务节点使用CPU                               | 是             |
   | 最大分配内存 | 分配该任务占用队列的最大内存                        | 是             |

4. 填写配置信息参数

   <table>
   	<tr>
   	    <th>模块</th>
   	    <th>参数</th>
   	    <th>说明</th>  
   	</tr >
   	<tr >
   	    <td rowspan="5">模型同步来源</td>
   	    <td>数据源</td>
   	    <td>选择已配置完成的业务数据源</td>
   	</tr>
   	<tr>
   	    <td>数据模型</td>
   	    <td>选择已配置完成的业务源数据模型</td>
   	</tr>
   	<tr>
   	    <td>加载策略</td>
   	    <td>全量/增量</td>
   	</tr>
   	<tr>
   	    <td>加载时间</td>
   	    <td>分/时/天（选择增量）</td>
   	</tr>
   	<tr><td>过滤条件</td>
   	    <td>对数据源中数据根据业务规则进行过滤</td>
   	</tr>
   	<tr >
   	    <td rowspan="3">模型同步目标</td>
   	    <td>数据源</td>
   	    <td>默认数据平台存储组件</td>
   	</tr>
   	<tr>
   	    <td>数据模型</td>
   	    <td>对应数据平台ods表(如是第一次同步，点击加号进行新建ods表)</td>
   	</tr>
   	<tr>
   	    <td>是否去重</td>
   	    <td>是否对抽取的数据集进行去重操作</td>
   	</tr>
   </table>

5. 完成基础信息和配置信息参数填写后，可在左下角进行指标配置字段配置，左侧字段可选择性移动到右侧ods表中。
6. 移动到右侧字段表示ods表所有的字段信息，可点击最右侧功能进行字段信息的配置。
7. 可对每一个字段进行质量规则的配置，质量规则详情参考上述质量规则操作。
8. 最后点击确认按钮完成数据集成节点配置。
9. 操作演示。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/20/841da3df-d329-464d-9680-082d862811c1.gif)

## 实时数据集成配置

1. 实时任务配置时，任务节点所属工作流周期选择实时任务。
2. 拖拽锚点可创建新的节点任务，选择数据集成，目前实时数据集成仅支持自定义编辑操作。
3. 实时数据集成采用flink-connector，书写语法及参数配置可参考flink官网。
4. 操作演示。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/20/5eafe366-ea30-4341-8403-826f165814ce.gif)

```
-- source
CREATE TABLE `rt_test1`
(
    `freezeQty`                 DOUBLE COMMENT '冻结库存 '
    ,`distributionCode`         STRING COMMENT '分区编码 '
    ,`id`                       BIGINT
) with (
'connector' = 'mysql-cdc',
'hostname' = 'rm-bp1p4wb6181in436c33150.mysql.rds.aliyuncs.com',
'port' = '3306',
'username' = 'sync_binlog',
'password' = 'I5bWu6G515U9eX0gerpWeS8p6kJ0F461',
'database-name' = 'Demo_test',
'table-name' = 'rt_test1'
);

-- sink
CREATE TABLE `ods_rt_test1`
(
    `freezeQty`                DOUBLE COMMENT '冻结库存 ',
    `distributionCode`         STRING COMMENT '分区编码 ',
    `id`                       BIGINT,
     PRIMARY KEY (id) NOT ENFORCED
) with (
    'connector' = 'upsert-kafka',
    'topic' = 'ods_rt_test1',
    'properties.bootstrap.servers' = 'xxx.xxx.xxx.xxx:9092',
    'key.format' = 'json',
    'value.format' = 'json'
);

-- exec
insert into ods_rt_test1
select *
from rt_test1;
```
