# Source Model Management

After data source configuration, the next step is to standardize the data structure.

## Feature

It is used to define the structure of the read data.

## Type

* **Internal**: Read data from internal data sources, with physical tables existed. If the table does not exist in the internal data source, it will be created automatically.

* **External**: Read data from external data sources without creating tables. Users should ensure that there is a table existed in the external data source. If not, an error may occur if the table is required in later operations.

## Add Data Model

The data model depends on the data source, so first confirm the type of data source to be read and then create a data model correspondingly. Take the external data model as an example here (the internal data model is only for viewing historical data).

1. Add new data model (for non-MySQL type, as MySQL type can be synchronized through data source detection). Select **EXTERNAL**, click **New Data Model** and fill in the required information.
   * **Data Source Name**: Only external data sources are available for the external data model.
   * **Data Model Label**: Set labels for the data model for classification.
   * **Description**: Optional, to describe the data model in business.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/5b1c00a4-767f-42be-9f4f-74ef1d31a781.png)

After the data model is created, it will be displayed on the source model management page.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/b5d62160-b009-4059-a9fb-c80fd4145c79.png)

2. Click the created data model to edit fields (for non-MySQL type, as MySQL type can be synchronized through data source detection). The platform supports two editing modes: custom mode and SQL mode.

   * **Custom mode**

      Select **Custom Mode**, click **New Column** to configure, and click **OK** to save the configuration. 

      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/969b1d2b-9bd5-4c1f-9e9b-adc026b04d09.png)

      Click **New Index** below to configure it if necessary.

   * **SQL mode (EXTERNAL) **

      Define data model table structure in the SQL mode.

      Select **SQL Mode**, enter the statement in the edit box and click **Execute**. If the execution result is successful, it means the creation is successful. If it fails, you can check the SQL error message in the log for troubleshooting. Here is an example:
   
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

Batch tagging is used to add labels to the selected data model in batches.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/692fab57-db03-40eb-830d-edf515af0a87.png)

## Query Data Model

1. Select the data model type (INTERNAL or EXTERNAL).

2. Fill in the search criteria such as data source name, data model name, data model label and creation time to query.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/754e63ed-8e1b-4f6d-b092-192b5ee0f3f3.png)

## Ad Hoc Query

You can get the model data processed by workflow.

Go to **Data Integration > Ad Hoc Query**, select the model type and model name, click to copy the query statement and then click **Execute** to query.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/94e67d9c-6e73-4d2f-b204-c6281bbd7f2d.png)

If the queried model is not created by yourself, a prompt of no permission will appear.

To apply for permission, go to **Data Governance > Workflow Table**, enter the name of the model and click the icon to apply for authorization.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/b2e21aad-c1b9-4013-824f-502536ecf46f.png)

The submitted application can be viewed in **Data Permission > Initiated by Me**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/5accd34a-1436-4ab8-b0f7-7d23d2eb2068.png)

## Configure Fields

You can desensitize or encrypt the fields in the data model.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/211bc079-ec94-4a22-8f59-3427a39488c3.png)
