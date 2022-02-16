# Low-Code Data Computing

After underlying data integration, the data is still fragmented and of low value density, and cannot directly provide data services for upper layer algorithms and DI applications. At this time, data processing is required, mainly including data cleaning, data extraction and data export.

## Data Cleaning

### Offline Data Cleaning

1. When configuring an offline data cleaning task, select single task or periodic task for the workflow cycle to which the task node belongs.

2. Drag and drop the anchor point to create a new node and select **Data Cleaning**.

3. Fill in the basic information of the data cleaning node.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/f85e3250-7f65-4d9c-a045-547ed2bb7d45.png)

   | Parameter | Description | Required |
   | ------------ | ------------------------------------------------------------ | -------- |
   | Node name | Name the node | Yes |
   | Node description | Describe the node | No |
   | View type | Select view wizard or custom edit  | Yes |
   | Storage method | Select PersistA or PersistB | Yes |
   | Type of cleaning | Select fact table or dimension table | Yes |
   | Create method | Create manually or choose existing (if creating a table for the first time, select create manually)  | Yes |
   | Table name | Dimension table/fact table name | Yes |
   | Chinese name of table | Chinese name of dimension table/fact table | Yes |
   | Loading strategy | Full amount/increment | Yes |
   | Table description | Dimension table/fact table description | No |
   | CPU | Allocate CPU for this task node | Yes |
   | Maximum allocated memory | Allocate the maximum memory for the task | Yes |

4. Select a master model and add associated models.

   | Parameter | Description | Required |
   | ------------ | ------------------------------ | -------- |
   | Choose master model | Select the data source table | Yes |
   | Filter condition | Fill in the filter criteria for data source tables | No |
   | Choose associated model | Select the associated data table | Yes |
   | Association type | LEFT JOIN/RIGHT JOIN/FULL JOIN | Yes |
   | Filter condition | Fill in the filter criteria for data source tables | No |
   | Configure fields | Association types of master model and associated mode | Yes |
   | Configuration method | Associated fields/Custom edit | Yes |
   | Associated fields | Associated fields of master model | Yes |

5. Configure the target model fields.

   | Parameter | Description | Required |
   | --------------------- | ------------------------------------------------------------ | -------- |
   | Filter condition | Filter datasets for main and associated models | No |
   | Field name | Name the field | Yes |
   | Field description | Describe the field | No |
   | Field type | Select field type | Yes |
   | Field length | Field length | No |
   | Whether primary key | Primary key | No |
   | Whether partition key | Partition key | No |
   | Configuration method | Associated fields/custom edit (select custom edit for custom logic)  | Yes |
   | Associate model fields/Configuration rules | For associated fields, select the corresponding fields in the associated model; for custom edit, write rules in the configuration rules | Yes |

### Real-Time Data Cleaning

1. When configuring a real-time data cleaning task, select real-time task for the workflow cycle to which the task node belongs.
2. Drag and drop the anchor point to create a new node and select **Data Cleaning**.
3. Fill in the basic information of the data cleaning node.
4. Currently, only custom edit is supported for real-time data cleaning. Write Flink-SQL logic in custom text editing. For detailed syntax and parameter configuration, see [Flink](https://flink.apache.org/).

## Data Extraction

### Offline Data Extraction

1. When configuring an offline data extraction task, select single task or periodic task for the workflow cycle to which the task node belongs.

2. Drag and drop the anchor point to create a new node and select **Data Extraction**.

3. Fill in the basic information of the data extraction node.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/ce8b818d-b689-4798-b32f-ecfd89d6b95d.png)

   | Parameter | Description | Required |
   | ------------ | ------------------------------------------------------------ | -------- |
   | Node name | Name the node | Yes |
   | Node description | Describe the node | No |
   | View type | Select view wizard or custom edit  | Yes |
   | Storage method | Select PersistA or PersistB | Yes |
   | Extraction type | Select summary table or application data sheet | Yes |
   | Create method | Create manually or choose existing (if creating a table for the first time, select create manually)  | Yes |
   | Table name | Summary table/application table name | Yes |
   | Chinese name of table | Chinese name of summary table/application table  | Yes |
   | Loading strategy | Full amount/increment | Yes |
   | Table description | Summary table/Application sheet description | No |
   | CPU | Allocate CPU for this task node | Yes |
   | Maximum allocated memory | Allocate the maximum memory for the task | Yes |

4. Select a master model and add associated models.

   | Parameter | Description | Required |
   | ------------ | ------------------------------ | -------- |
   | Choose master model | Select data source table | Yes |
   | Filter condition | Fill in the filter criteria for data source tables | No |
   | Choose associated model | Select the associated data table | Yes |
   | Association type | LEFT JOIN/RIGHT JOIN/FULL JOIN | Yes |
   | Filter condition | Fill in the filter criteria for data source tables | No |
   | Configure fields | Association types of master model and associated mode | Yes |
   | Configuration method | Associated fields/Custom edit | Yes |
   | Associated fields | Associated fields of master model | Yes |

5. Configure the target model fields.

   | Parameter | Description | Required |
   | --------------------- | ------------------------------------------------------------ | -------- |
   | Filter condition | Filter datasets for main and associated models | No |
   | Field name | Name the field | Yes |
   | Field description | Describe the field | No |
   | Field type | Select field type | Yes |
   | Field length | Field length | No |
   | Whether primary key | Primary key | No |
   | Whether partition key | Partition key | No |
   | Configuration method | Associated fields/custom edit (select custom edit for custom logic)  | Yes |
   | Associate model fields/Configuration rules | For associated fields, select the corresponding fields in the associated model; for custom edit, write rules in the configuration rules | Yes |

### Real-Time Data Extraction

1. When configuring a real-time data extraction task, select real-time task for the workflow cycle to which the task node belongs.
2. Drag and drop the anchor point to create a new node and select **Data Extraction**.
3. Fill in the basic information of the data extraction node.
4. Currently, only custom edit is supported for real-time data extraction. Write Flink-SQL logic in custom text editing. For detailed syntax and parameter configuration, see [Flink](https://flink.apache.org/).

## Data Output

### Offline Data Output

1. When configuring an offline data output task, select single task or periodic task for the workflow cycle to which the task node belongs.

2. Drag and drop the anchor point to create a new node and select **Data Output**.

3. Fill in the basic information of the data output node.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/9c436692-b9e6-4ce6-a8cd-4ef83ca43d29.png)

   | Parameter | Description | Required |
   | ------------ | ---------------------------- | -------- |
   | Node name | Name the node | Yes |
   | Description | Describe the node | No |
   | View type | Currently only view edit is supported | Yes |
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
      	    <td>The default is the storage component of the data platform</td>
      	</tr>
      	<tr>
      	    <td>Data model</td>
      	    <td>Select the developed data model</td>
      	</tr>
      	<tr>
      	    <td>Export strategy</td>
      	    <td>Full amount/increment</td>
      	</tr>
      	<tr>
      	    <td>Loading Time</td>
      	    <td>Minutes/hours/days (select increment) </td>
      	</tr>
      	<tr><td>Filter condition</td>
      	    <td>Determine the data range of the exported table</td>
      	</tr>
      	<tr >
      	    <td rowspan="4">Model synchronization target</td>
      	    <td>Data source</td>
      	    <td>Select the configured data source</td>
      	</tr>
      	<tr>
      	    <td>Data model</td>
      	    <td>Select the configured data model</td>
      	</tr>
      	<tr>
      	    <td>Writing mode</td>
      	    <td>Select update/overwrite</td>
      	</tr>
        <tr>
      	    <td>Preconditions</td>
      	    <td>Enter pre-statement logic, such as truncate table xxx</td>
      	</tr>
      </table>


5. After completing the above information, you can configure fields in the lower left corner.

6. Click **Sure** to complete the data output node configuration.

### Real-Time Data Output

1. When configuring a real-time data output task, select real-time task for the workflow cycle to which the task node belongs.
2. Drag and drop the anchor point to create a new node and select **Data Output**.
3. Fill in the basic information of the data output node.
4. Currently, only custom edit is supported for real-time data output. Write Flink-SQL logic in custom text editing. For detailed syntax and parameter configuration, see [Flink](https://flink.apache.org/).

