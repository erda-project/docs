# Data Standard Management

## Domain Definition

It is used to define the subject domain, which can be selected when creating data to classify the data tables in different data warehouses according to the subject.

Go to **Data Governance > Data Standard Management > Subject Definition**, and add, edit or delete subject domains as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/e894303a-40f3-447e-a14e-7e4bcae5efb9.png)

## Model Management

It is used to define the data model, currently supporting creating fields in custom mode or SQL mode. When creating a data model, you can select different model types to correspond to different levels in the data warehouse standard, and choose different subject domain prefixes to classify the model. Once the creation is completed, you can physicalize the model to add it to the database.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/f8f66b1b-b595-4598-8b2e-981eeef9e357.png)

After physicalizing the model, you can also select an existing model in the creation method when configuring the workflow.

## Relation Network

It is used to define the field relationship between different models. Currently it supports LEFT, RIGHT, FULL and INNER association types, and can automatically generate SQL statements for the association between two tables when generating custom workflows.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/21eb4637-d77c-4358-b58a-9c25e2f41045.png)

## Indicator Definition

It is used to define the data to be counted and the statistical logic based on the table fields. The indicator type includes atomic index and derived index, as the former one can specify statistical fields and statistical logic while the latter can only specify business limits, statistical periods and statistical granularity based on atomic index definitions.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/677640a5-d223-41fe-8cc7-977727e16ded.png)

## Statistical Period

It is used for subsequent indicator statistics according to the configured time range. It cannot be modified or deleted if associated with an indicator.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/fd9259d8-cbba-4448-8a9b-5fa527c4089f.png)

## Service Restriction

It is used to add business limits for a certain field on the model. If it is specified when creating a derived index, the corresponding SQL statement will be created when generating a custom workflow.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/255bff5e-ad10-4d92-85ca-2f820418223d.png)