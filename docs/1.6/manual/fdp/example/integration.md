# 多渠道数据集成

在企业中（尤其大型企业），程序开发时间、开发部门以及软硬件平台的差异，将导致程序运行时产生的数据以不同的数据结构独立存储，形成“数据孤岛”。随着企业数字化、智能化的深度发展，部门内部、部门之间以及企业之间数据通讯的需求愈加迫切，但存在于数据孤岛之间的数据冗余、不一致和不互通将严重阻碍企业信息化建设的进程。

数据集成是高效稳定、可弹性伸缩的数据同步平台，可在复杂网络环境下为异构数据源提供高速稳定的数据移动及同步能力。

## 支持的数据源

数据集成包括离线同步和实时同步，以下为两者分别支持的数据源类型：

* **离线同步**

  | 数据源类型         | 抽取（Reader） | 导出（Writer） |
  | ------------------ | -------------- | -------------- |
  | MySQL              | 支持           | 支持           |
  | Oracle             | 支持           | 支持           |
  | Db2                | 支持           | 支持           |
  | SQL Server         | 支持           | 支持           |
  | Analytic for MySQL | 支持           | 支持           |
  | OSS                | 支持           | 支持           |
  | SAP HANA           | 支持           | 支持           |
  | PostgreSQL         | 支持           | 支持           |

* **实时同步**

  | 数据源类型     | Source | Sink   |
  | -------------- | ------ | ------ |
  | MySQL          | 支持   | 支持   |
  | MySQL-CDC      | 支持   | 支持   |
  | Kafka          | 支持   | 支持   |
  | Redis          | 支持   | 支持   |
  | MinIO          | 支持   | 支持   |
  | SQL Server     | 支持   | 支持   |
  | SQL Server-CDC | 支持   | 不支持 |
  | Oracle         | 支持   | 支持   |
  | Oracle-CDC     | 支持   | 不支持 |

## 离线数据集成配置

### 新建数据源

1. 进入 **数据治理 > 数据源管理**，点击 **新增数据源**。

2. 填写数据源配置信息。

   | 参数         | 说明                              | 是否必填 |
   | ------------ | --------------------------------- | -------- |
   | 数据源名称   | 数据源命名                        | 是       |
   | 数据源标签   | 数据源标识                        | 是       |
   | 描述         | 数据源描述                        | 否       |
   | 分类         | INTERNAL（内部）/EXTERNAL（外部） | 是       |
   | 类型         | 数据源类型                        | 是       |
   | 连接地址     | 数据源访问地址                    | 是       |
   | 端口         | 数据源访问端口                    | 是       |
   | 数据库名称   | 数据源库名                        | 是       |
   | 数据库用户名 | 数据库用户名                      | 是       |
   | 数据库密码   | 数据库密码                        | 是       |
   | 服务器 ID    | 数据库所在服务器 Host             | 否       |
   | 服务器名称   | 数据库所在服务器名称              | 否       |

3. 点击右上角 **测试连接** 测试数据平台与数据库的连通性。

4. 测试成功后，若数据源类型为 MySQL，可点击右上角 **自动探知**，查看同步数据库下对应表模型信息。

5. 模型列表中，已勾选模型表示已创建的源数据模型。您可勾选目标模型创建对应的源数据模型，随后进入 **数据治理 > 源模型管理** 查看。

6. 点击右侧 **编辑** 和 **删除** 可对已创建的数据源进行管理。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/20/fa8cc751-0c35-4c10-8d3e-06d585ca70f1.gif)

:::tip 提示
1. 删除数据源时，若该数据源存在关联源数据模型及工作流，则该数据源无法删除。
2. INTERNAL/EXTERNAL 数据源区别如下：
   * 面向对象：INTERNAL 用于企业内部系统数据源，EXTERNAL 用于企业外部系统数据源。
   * 功能：内部数据源创建内部数据模型时，对应数据库中有相同的表随之创建，外部数据源仅有外部数据模型的读取权限。

:::

### 新建源数据模型

1. 进入 **数据治理 > 源模型管理**，选择创建 INTERNAL 或 EXTERNAL 源数据模型。源数据模型的类型取决于数据源类型，即 INTERNAL 数据源对应 INTERNAL 源数据模型，EXTERNAL 数据源对应 EXTERNAL 源数据模型。

2. 点击右上角 **新增数据模型**，并填写相应信息（非 MySQL 类型可新建，MySQL 类型可通过数据源探知获取）。

   | 参数         | 说明                     | 是否必填 |
   | ------------ | ------------------------ | -------- |
   | 数据模型名称 | 数据模型名称             | 是       |
   | 数据源名称   | 选择数据模型所在的数据源 | 是       |
   | 数据模型标签 | 配置方式                 | 是       |
   | 描述         | 对模型进行描述           | 否       |


3. 自定义模式中可新增模型的字段信息。

4. SQL 模式中可定义源数据模型表结构。

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

5. 点击右侧 **编辑** 和 **删除** 可对已创建的源数据模型进行管理。

:::tip 提示
1. INTERNAL 模型仅支持 ALTER TABLE 语法。
2. SQL 模式中若执行结果为成功则表示创建成功，若失败可通过日志查看 SQL 报错信息进行错误排查。

:::

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/20/643b2df9-ff98-4335-bbc0-06c5e0a7e19e.gif)

### 新建数据集成任务节点

1. 配置离线数据集成任务时，任务节点所属工作流周期选择单次任务或周期任务。

2. 拖拽锚点可创建新的节点任务，选择 **数据集成**。

3. 填写数据集成节点基本信息。

   | 参数         | 说明                                   | 是否必填 |
   | ------------ | -------------------------------------- | -------- |
   | 节点名称     | 任务节点名称                           | 是       |
   | 描述         | 任务节点描述                           | 否       |
   | 视图类型     | 选择视图编辑或自定义编辑（Datax 代码） | 是       |
   | 存储方式     | 选择存储一或存储二                     | 是       |
   | CPU          | 分配该任务节点使用 CPU                 | 是       |
   | 最大分配内存 | 分配该任务占用队列的最大内存           | 是       |

4. 填写配置信息参数。

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
   	    <td>根据业务规则过滤数据</td>
   	</tr>
   	<tr >
   	    <td rowspan="3">模型同步目标</td>
   	    <td>数据源</td>
   	    <td>默认为数据平台存储组件</td>
   	</tr>
   	<tr>
   	    <td>数据模型</td>
   	    <td>对应数据平台 ODS 表（若首次同步，点击 + 新建表)</td>
   	</tr>
   	<tr>
   	    <td>是否去重</td>
   	    <td>是否对抽取的数据集进行去重操作</td>
   	</tr>
   </table>

5. 完成以上信息填写后，可在左下角进行字段配置，选择左侧字段移动至右侧 ODS 表中。

8. 点击 **确认** 完成数据集成节点配置。 

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/20/841da3df-d329-464d-9680-082d862811c1.gif)

## 实时数据集成配置

1. 配置实时数据集成任务时，任务节点所属工作流周期选择实时任务。
2. 拖拽锚点可创建新的节点任务，选择 **数据集成**。当前实时数据集成仅支持自定义编辑操作。
3. 实时数据集成采用 flink-connector，具体语法及参数配置请参见 [Flink 官网](https://flink.apache.org/)。

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
