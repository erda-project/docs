# Multi-Channel Data Integration

For enterprises (especially large ones), differences in application development time, departments, hardware and software platforms will result in the data generated during application running being stored independently in different data structures, forming "data island". With the rapid development of enterprise digitalization and intelligence, the demand for data communication within and between departments and enterprises is becoming more and more urgent, but the data redundancy, inconsistency and disconnection existing between data islands will seriously hinder the process of enterprise information construction.

Data integration is an efficient, stable and scalable data synchronization platform that supports high-speed and stable data movement and synchronization for heterogeneous data sources in complex network environments.

## Supported Data Sources

Data integration includes offline synchronization and real-time synchronization. The following are the data source types supported by the two respectively:

* **Offline synchronization**

   | Data Source Type | Extract (Reader)  | Export (Writer)  |
   | ------------------ | -------------- | -------------- |
   | MySQL | Yes | Yes |
   | Oracle | Yes | Yes |
   | Db2 | Yes | Yes |
   | SQL Server | Yes | Yes |
   | Analytic for MySQL | Yes | Yes |
   | OSS | Yes | Yes |
   | SAP HANA | Yes | Yes |
   | PostgreSQL | Yes | Yes |

* **Real-time synchronization**

   | Data Source Type | Source | Sink |
   | -------------- | ------ | ------ |
   | MySQL | Yes | Yes |
   | MySQL-CDC | Yes | Yes |
   | Kafka | Yes | Yes |
   | Redis | Yes | Yes |
   | MinIO | Yes | Yes |
   | SQL Server | Yes | Yes |
   | SQL Server-CDC | Yes | No |
   | Oracle | Yes | Yes |
   | Oracle-CDC | Yes | No |

## Offline Data Integration Configuration

### Add Data Source

1. Go to **Data Governance > Data Source Management**, and click **New Data Source**.

2. Fill in the data source configuration information.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/bb8184ce-30db-4271-9994-7e7107abcfc4.png)

   | Parameter | Description | Required |
   | ------------ | --------------------------------- | -------- |
   | Data source name | Name the data source | Yes |
   | Data source label | Data source identifier | Yes |
   | Description | Describe the data source | No |
   | Category | INTERNAL/EXTERNAL  | Yes |
   | Type | Data source type | Yes |
   | Connection address | Data source access address | Yes |
   | Port | Data source access port | Yes |
   | Database name | Data source library name | Yes |
   | Username | Database username | Yes |
   | Password | Database password | Yes |
   | Server ID | Server host where the database is located | No |
   | Server name | Name of the server where the database is located | No |

3. Click **Test Connection** on the upper right corner to test the connection of the data platform to the database.

4. After successful test, if the data source type is MySQL, you can click **Automatic Detection** in the upper right corner to view the corresponding table model information under the synchronized database.

5. In the model list, the checked model indicates the data model that has been created. You can check the target model to create the corresponding data model, and then go to **Data Governance > Source Model Management** to view.

6. Click **Edit** and **Delete** on the right to manage the created data sources.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/a6694d2c-bab1-46da-9e58-706f3bae55e8.png)

:::tip Tips
1. The data source cannot be deleted if it is associated to a data model or workflow.
2. The difference between INTERNAL and EXTERNAL data sources is as follows:
   * Object: INTERNAL is used for internal system data sources, and EXTERNAL for external system data sources.
   * Feature: When an internal data source creates an internal data model, the same table is created in the corresponding database, and the external data source only has the read permission of the external data model.

:::

### Add Data Model

1. Go to **Data Governance > Source Model Management** and choose to create an INTERNAL or EXTERNAL data model. The type of data model depends on the type of data source, that is, INTERNAL data source corresponds to INTERNAL data model and EXTERNAL data source corresponds to EXTERNAL data model.

2. Click **New Data Model** in the upper right corner, and fill in the information required (non-MySQL data model can be created, and MySQL data model can be obtained through data source detection).

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/e7296044-6495-45d3-ace7-1b5efd7eda02.png)
   
   | Parameter | Description | Required |
   | ------------ | ------------------------ | -------- |
   | Data model name | Data model name | Yes |
   | Data source name | Select the data source where the data model is located | Yes |
   | Data model label | Configuration method | Yes |
   | Description | Describe the model | No |


3. Add field information of the model in the custom mode.

4. Define data model table structure in the SQL mode.

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

5. Click **Edit** and **Delete** on the right to manage the created data models.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/90b72c41-6292-4c46-b754-2a6897ca322d.png)

:::tip Tips
1. The INTERNAL model only supports ALTER TABLE syntax.
2. If the execution result is successful in SQL mode, it means the creation is successful. If it fails, you can check the SQL error message in the log for troubleshooting.

:::

### Add Data Integration Node

1. When configuring an offline data integration task, select single task or periodic task for the workflow cycle to which the task node belongs.

2. Drag and drop the anchor point to create a new node and select **Data Integration**.

3. Fill in the basic information of the data integration node.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/d5368a0f-6b0b-4ce1-8c27-bb449a409cd5.png)

   | Parameter | Description | Required |
   | ------------ | -------------------------------------- | -------- |
   | Node name | Name the node | Yes |
   | Description | Describe the node | No |
   | View type | Select view wizard or custom edit (Datax code)  | Yes |
   | Storage method | Select PersistA or PersistB | Yes |
   | CPU | Allocate CPU for this task node | Yes |
   | Maximum allocated memory | Allocate the maximum memory for the task | Yes |

4. Fill in the configuration information.

   <table>
      	<tr>
      	    <th>Section</th>
      	    <th>Parameter</th>
      	    <th>Description</th>  
      	</tr >
      	<tr >
      	    <td rowspan="5">Model synchronization source</td>
      	    <td>Data source</td>
      	    <td>Select the configured data source</td>
      	</tr>
      	<tr>
      	    <td>Data model</td>
      	    <td>Select the configured data model</td>
      	</tr>
      	<tr>
      	    <td>Loading strategy</td>
      	    <td>Full amount/increment</td>
      	</tr>
      	<tr>
      	    <td>Loading Time</td>
      	    <td>Minutes/hours/days (select increment) </td>
      	</tr>
      	<tr><td>Filter condition</td>
      	    <td>Filter data based on business rules</td>
      	</tr>
      	<tr >
      	    <td rowspan="3">Model synchronization target</td>
      	    <td>Data source</td>
      	    <td>The default is the storage component of the data platform</td>
      	</tr>
      	<tr>
      	    <td>Data model</td>
      	    <td>Corresponds to the ODS table of the data platform (if it is synchronized for the first time, click + to add new table)</td>
      	</tr>
      	<tr>
      	    <td>Whether to remove heavy</td>
      	    <td>Whether to remove heavy of the extracted data set</td>
      	</tr>
      </table>


5. After completing the above information, you can configure fields in the lower left corner and select the left field to move to the ODS table on the right.

8. Click **Sure** to complete the data integration node configuration.

## Real-Time Data Integration Configuration

1. When configuring a real-time data integration task, select real-time task for the workflow cycle to which the task node belongs.
2. Drag and drop the anchor point to create a new node and select **Data Integration**. Currently real-time data integration only supports custom editing operations.
3. Real-time data integration uses flink-connector. For detailed syntax and parameter configuration, see [Flink](https://flink.apache.org/).

```
-- source
CREATE TABLE `rt_test1`
(
    `freezeQty`                 DOUBLE COMMENT 'freeze stock '
    ,`distributionCode`         STRING COMMENT 'distribution code '
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
    `freezeQty`                DOUBLE COMMENT 'freeze stock ',
    `distributionCode`         STRING COMMENT 'distribution code ',
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
