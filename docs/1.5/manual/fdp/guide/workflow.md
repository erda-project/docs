# 工作流管理

完成数据源和数据模型配置后，需对数据进行处理，包括数据清洗、数据萃取、数据导出等常规操作，此外还可以选择标签计算、One ID 等。

## 创建工作流

进入 **数据集成 > 工作流管理**，创建文件夹（可选）后在文件夹下添加工作流，根据需要配置工作流信息。
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/21/2bc217c0-83aa-4c1d-885f-567d1b348375.png)

- **周期**：可选单次任务、周期任务和实时任务，其中单次任务和周期任务属于离线任务计算。

  - 单次任务：运行一次任务即结束。
  - 周期任务：每隔一段时间运行一次任务。
  - 实时任务：始终运行任务。

- **参数设置**：工作流所需全局参数。

  假设设置时间参数为 pt=${yyyy-MM-dd-1}，在下游节点中可填写 ${pt} 以引用该参数，平台将替换该变量为某个具体日期。

- **依赖工作流**：若当前工作流需在另一个工作流运行完成的基础上再执行，即需配置依赖工作流。

- **提交队列**：可实现更精细的工作流分配和管理，具体请参见 [队列管理](configure-manage.md#队列管理)。

- **任务优先级**：可设置工作流运行的优先级，数字越大，优先级越高。

- **所属目录**：当前工作流所在文件夹。

## 数据集成

将数据从数据源中集成至系统内部。

### 创建集成节点

选择数据集成节点。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/49aad63a-f315-4de2-b27c-9186dbcb8a9e.png)

### 编辑集成节点

1. 选择需读取的数据源和数据模型。

2. 点击 **+** 创建系统内部 Cassandra 模型名称。　　

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/7d36cae6-71da-4998-b30a-d434ad949bd1.png)

3) 选择所需字段后，点击 **>** 添加至 Cassandra 模型。

4. 点击 **编辑** 修改模型字段，包括主键、分区键等。模型中必须包含主键。

5. 点击 **添加** 可自行添加字段，添加的字段需设置默认值。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/c012975c-166f-4da9-9b54-b4c2bffe2826.png)

6. 在编辑模型字段或添加字段时，可添加质量规则。

7. 点击 **确定** 保存配置。

## 数据清洗

### 创建清洗节点

选择数据清洗节点。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/9f1a4e56-5438-4a9c-a21a-7ced1c936345.png)

### 编辑清洗节点

1. 设置清洗表表名。
2. 选择需清洗的系统内部表名为主模型，添加过滤条件以筛选表中字段，等同于 SQL 中的 Where 语句。
3. 可选新增关联模型。
4. 在模型中选择用户所需字段，点击箭头图标同步至清洗表。
6. 可根据需要编辑或新增字段（右侧模型必须含有分区键）。


## 数据萃取

### 创建萃取节点

选择数据萃取节点。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/c3584b90-d956-4d8d-bff4-4cb422b397df.png)

### 编辑萃取节点

1. 设置萃取表表名。
2. 选择需萃取的系统内部表名为主模型，添加过滤条件以筛选表中字段，等同于 SQL 中的 Where 语句。
3. 可选新增关联模型。
4. 在模型中选择用户所需字段，点击箭头图标同步至萃取表。
6. 可根据需要编辑或新增字段。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/30/48b06b1d-ed2d-4935-8568-d261785d152f.png)

## 数据导出

将系统内部已处理的数据导出至外部数据源。

### 创建导出节点

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/7e2188f2-4f4f-4857-94b3-0c739f523e8d.png)

### 编辑导出节点

1. 选择需导出的数据模型。
2. 选择数据源（EXTERNAL 类型）。
3. 选择该数据源下的数据模型（需提前创建，且导出的字段名、数量和顺序需保持一致）。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/b1e9886e-6c1d-46be-a0cf-5cf61db6d9ed.png)

## ONE ID

One ID 是针对用户所选字段的每一条数据加密后生成的唯一性 ID（Unique ID）。

- 用户可按照优先级针对所配置的字段生成唯一的 One ID，随后对比相同的 One ID 数据以排同查异，查找不同系统下的同一用户。
- 通过工作流中 One ID 节点生成的数据将存储于数据湖的 dim_cust_oneid 纬度表中，新生成的 One ID 数据将替代原有数据，随后重新加载最新数据。
- One ID 生成的数据表 dim_cust_oneid 存在 6 个字段（one_id、phone、app_id、open_id、member_id、email），若用户所选字段来源于此，则该部分字段将显示为空。
-  One ID 将依次根据 phone、member_id、email、app_id 和 open_id 字段生成。若用户设置第一优先级为空，则生成规则将根据优先级依次顺延。

例如，用户已设置 phone、member_id、email 三个字段，则 One ID 将针对 phone 加密生成。若第一优先级字段 phone 字段为空，则 One ID 将针对 member_id 加密生成，以此类推。

One ID 旨在解决多系统或多数据来源下，无法判断用户是否为同一用户的问题。合理使用该功能，可通过关键字段查找不同数据源中的相同用户，并且对比信息异同。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/404d113f-c7bd-4787-a75e-b25654fd83f4.png)

1. 创建工作流并创建所需节点。

2. 基于已创建的节点，选择 One ID 节点。

3. 新建数据模型（通常为两个，即重复两次以下操作）：
   
   3.1 点击 **新建数据模型**。
   
   3.2 选择相应的数据模型。

   3.3 对数据模型中的字段进行业务说明。
   
   3.4 点击 **确定** 保存配置。
   
4. 运行工作流。

One ID 的生成结果可在 **数据集成 > 即席查询** 中查询。

1. 查找 dim_cust_oneid 纬度表。

2. 复制相应的查询 SQL（也可自定义编写）。

3. 执行 SQL，获取相应结果。


## 标签计算

您可为表中字段配置标签，数据平台将同步源数据至会员平台，会员平台可在此基础上为字段添加规则并同步至数据平台，数据平台即可根据字段规则进行计算。若会员平台未配置规则，则该节点在实际执行中无法进行计算。

例如，某一百万数据中包含年龄字段。您可在标签计算节点中设置年龄字段为指标，在会员平台设置规则（年龄大于 18 为成年人，小于 18 为未成年人），数据平台即可通过计算了解成年和未成年的具体人群。

### 创建标签节点

选择标签计算节点。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/71d33d4a-7766-49e8-95ad-691cc91050f9.png)

### 编辑标签节点

1. 点击 **添加指标**。

2. 选择需计算的表名和字段。

3. 点击 **确定** 保存配置。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/01d0af00-594b-42b6-8dd8-a2e6341019c0.png)

## 数据注销

若您不希望系统保留数据，可通过数据注销清除留存于系统内部的数据。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/4e95fb16-3e40-474a-af3f-2ab5d24f9368.png)

## Python 执行

您可通过 Python 进行机器学习，并通过日志查看运行结果。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/07929184-88bf-4181-b6c2-945ac9429aaf.png)

## 群组计算

您可在标签计算的基础上，通过群组计算划分人群。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/5b0fcbf1-97ed-4669-b1f3-184940dfca39.png)

## 工作流明细

您可进入 **数据集成 > 工作流管理** 查看工作流明细。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/73269ce5-2b22-4926-8713-2e1efe32a0c9.png)

## 工作流导入导出

如需导出工作流，勾选工作流目录或工作流后，点击 **批量导出**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/057fdd8d-a0ed-4ce1-a777-80e5366058a7.png)

如需导入工作流，点击 **批量导入 > 上传** 后，在本地选择后缀为 .worflow 的文件即可。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/31/c8dd11b0-0520-485f-bcca-80d66ab49289.png)
