# Data Source Management

## Feature

The platform reads the data location according to the data source.

## Type

Data sources are divided into two categories: internal and external.

### Internal

Currently the internal data source is only for viewing historical data, with MySQL supported.

### External

In addition to MySQL, external data source supports Oracle, Db2, CUSTOM, HANA, PostgreSQL, Kafka, ODPS and other types, mainly for the data provided by external customers.

External data sources can also be used to create external data models and for data integration, and only external data sources can be selected for data exporting.

## Add Data Source

### Add MySQL Data Source

Go to **Data Governance > Data Source Management > New Data Source**, select the data source type as MySQL and configure the database. Once saved successfully, you can view it on the data source management page.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/6db2922a-fbdd-4d29-8b3f-32ccc08bc64f.png)

* **Test Connection**: Click to check whether the data source is connected. If the test fails, please check the username, password and other configurations.

* **Automatic Detection**: For MySQL data sources, the model can be detected automatically without manual modeling.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/3ba876e9-88bf-4fa8-88fe-7fff6c286144.png)

### Add Kafka Data Source

Select the data source type as Kafka and configure as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/78c21f07-a2a6-4f11-b262-22b07a48786d.png)

### Add Elasticsearch Data Source

Select the data source type as Elasticsearch and configure as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/09728b41-fb3c-4cd7-b424-83a350481725.png)

Add import index and type information in the description box.

```
{"index":"label","type":"label"}
```

### Add ODPS Data Source

Select the data source type as ODPS and configure as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/ebf229bf-e5e7-437e-9b07-d0cf85d0a180.png)

Add additional information in the description box, separated by commas.

```
{"partition":"ds=123,ms=123","tunnelServer":"http://dt.odps.aliyun.com"}
```

### Multiple MySQL Tables with the Same Prefix under the Same Data Source

It is suitable for scenarios where there are multiple tables named "ABC_number" in the same database.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/d8394cee-0cbf-4862-8766-721a1681a314.png)

```
{"tablePrefix":"c_level_change_log_","tableMin":"0","tableMax":"251"}
```

* **tablePrefix**: The prefix representing the table name.

* **tableMin**: The suffix representing the start.

* **tableMax**: The suffix representing the end.

For this type of data source, you only need to configure one data model with the model name being the ABC part mentioned above without numbers. After the data integration node is configured and starts running, the data from all the above tables will be integrated into the same table.

## Data Source Query

The platform supports filtering data sources by data source name, classification, type, label and other conditions.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/1db1e74e-e3a9-4ff2-8174-0e1aba25cd0a.png)

## Data Source Synchronization with One Click

If the data source connection information changes, you can synchronize the workflow with one click on the data source details page.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/98f68573-3fe8-4d0a-ab38-f2660642ec3d.png)

Then you can view the synchronization status in the operation record.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/84e4848c-35d0-4c1c-b8e2-613d91bfbf08.png)

## Data Source Importing and Exporting

The platform supports batch importing and exporting of data sources, which is fast and convenient.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/4b57e2d5-dbd4-4610-aa9b-f3609f62fd35.png)
