# 工作流管理

完成数据源和数据模型配置后，需要对数据进行处理，包括数据清洗、数据萃取、数据导出这些常规的ETL外，还可以选择标签计算，ONE ID 等。

## 创建工作流

1. 进入 **工作流管理**，（可选）创建文件夹。
2. 在文件夹下添加工作流。
3. 配置工作流信息。

![img](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/23856803/1629355380803-68987316-14f4-4d5c-bc24-c7ca5c276123.png)



- 周期：可选单次任务、周期任务和实时任务，其中单次任务和周期任务属于离线任务计算。

- 单次任务：运行一次任务就结束。
- 周期任务：每隔一段时间运行一次任务。

- 实时任务：始终运行任务。

- 参数设置：工作流需要的全局参数，使用“，”分隔。

  如：设置时间参数： pt=${yyyy-MM-dd-1},在下游节点中可以填写${pt}来引用这个参数,FDP会在后台替换这个变量成具体某天的日期

- 依赖工作流：若当前工作流需要在另一个工作流运行完成的基础上再执行，就需要配置依赖工作流。

- 所属目录：当前工作流所在文件夹。

- 提交队列：可以实现更精细的分配和管理工作流的运行，在配置管理-队列管理配置。详细见配置管理-队列管理功能介绍。
- 优先级：可以设置工作流运行的优先级，数字越大，优先级越高。

工作流中的节点配置顺序和个数并不限于下方举例，需要根据用户需求和实际情况来配置。

## 数据集成

将数据从数据源中集成到系统内部

### 创建集成节点

选择数据集成节点

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/49aad63a-f315-4de2-b27c-9186dbcb8a9e.png)

### 编辑集成节点

1. 选择需要读取的数据源和数据模型。

2. 点击“+”创建系统内部cassandra模型名称。　　

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/7d36cae6-71da-4998-b30a-d434ad949bd1.png)

3) 左边选择好需要的字段后，点击箭头添加到cassandra模型。

4. 点击编辑可以对右边模型字段进行修改，可以设置主键，分区键，能否为空。模型中必须含有**主键。**

5. 点击添加按钮可以自行添加字段，需要注意的是，自行添加的字段需要设置**默认值。**

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/c012975c-166f-4da9-9b54-b4c2bffe2826.png)6. 在编辑和添加中可以添加 **质量规则**

质量规则：脏数据如果不满足规则算出质量分，超出一定范围认为这个数据不可靠，在配置管理下的质量规则可以修改或者新增规则。

在数据质量中可以查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/f42f0967-f423-431a-9545-6d726688aa80.png)

7. 点击确定保存配置。

## 数据清洗

### 创建清洗节点

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/9f1a4e56-5438-4a9c-a21a-7ced1c936345.png)

### 编辑清洗节点

1. 设置清洗表表名；
2. 主模型中选择需要清洗的系统内部表名，下方过滤条件可以针对表中字段进行筛选，相当于sql中的where语句；

3. 可选新增关联模型 可以选择左联右联全关联等；

4. 从模型中选择用户需要的字段同步到清洗表；

5. 点击➡️进行同步；

6. 可以对字段进行编辑或者添加字段。  **注意：右边模型必须含有分区键**

   配置方式有关联字段或自定义编辑

   自定义编辑，可以写一些简单的函数，如${age}+1

SQL 预览，查看底层实际执行的SQL语句，如果与预期不符，就修改工作流。

## 数据萃取

清洗和萃取都是对数据的处理，配置过程基本相同。

### 创建萃取节点

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/c3584b90-d956-4d8d-bff4-4cb422b397df.png)

### 编辑萃取节点

1. 设置萃取清洗表表名
2. 主模型中选择需要萃取的系统内部表名，下方过滤条件可以针对表中字段进行筛选，相当于sql中的where语句

3. 可选新增关联模型 可以选择左联右联全关联等

4. 从模型中选择用户需要的字段同步到萃取表

5. 点击➡️进行同步

6. 可以对字段进行编辑或者添加字段。

## 数据导出

将系统内部处理好的数据导出到外部数据源中。

### 创建导出节点

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/7e2188f2-4f4f-4857-94b3-0c739f523e8d.png)

### 编辑导出节点

和集成节点正好相反，左边是系统内部数据，右边是要导出到的外部数据源

1. 选择要导出的数据模型
2. 选择数据源，数据源必须是EXTERAL类型的
3. 在此数据源下选择数据模型，需要提前建好，并且导出的字段名,数量和顺序两模型要求一致

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/b1e9886e-6c1d-46be-a0cf-5cf61db6d9ed.png)

4. 点击确定完成保存

## ONE ID

One ID 是根据用户所选的字段，针对这个字段的每一条数据进行加密后所生成的唯一性 ID（Unique ID）。

- 用户可以根据自己所配置的字段按照优先级顺序生成唯一的 One ID，然后会针对相同的 One ID 的数据作为对照进行对比，以用于查找不同系统下的相同用户以及达到排查同异的效果。
- 用户通过工作流 One ID 节点生成的数据会存放在数据湖的dim_cust_oneid纬度表中，每生成一次新的One ID数据会清空掉之前所生成的 One ID 的数据，然后重新加载最新的数据。

- One ID 生成的数据表 dim_cust_oneid 中现在共有6个字段（one_id、phone、app_id、open_id、member_id、email），如果用户为选中这其中的某些字段，则这些字段会显示为空。
- 用户生成 One ID 的优先级依次根据 phone、member_id、email、app_id&open_id 的字段进行生成，用户设置了第一优先级字段为空，则生成规则根据优先级依次后延。

举例：用户如果设置了 phone、member_id、email 三个字段，则 One ID 是针对 phone 进行加密后生成的，若，member_id、email 两个字段，此时的第一优先级字段 phone 字段为空，则 One ID 是针对 member_id 进行加密后生成的，其他情况以此类推。

One ID 的功能主要是为了解决在多系统或者多数据来源下，无法判断用户是否是相同用户的问题，合理的使用该功能，可以关键字段有效的查找出不同数据源中的相同用户，并切对比其他的信息的异同。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/404d113f-c7bd-4787-a75e-b25654fd83f4.png)

操作步骤

1. 创建工作流，并创建所需节点（此处操作步骤省略），One ID 的创建需要基于上层节点。

2. 基于上一级节点创建新的节点，选择 One ID 节点。

3. 新建数据模型（一般为 2 个），重复两次该操作。

4. 首先点击新建数据模型；

5. 选择相应的数据模型；

6. 对数据模型中的字段进行业务说明；

7. 点击确定，保存配置。

8. 启动运行工作流。

结果检验

One ID 生成的结果检验可以在数据集市的即席查询中进行查询，已验证结果。

1. 找到 dim_cust_oneid 纬度表

2. 复制相应的查询 SQL（也可自定义编写）

3. 执行 SQL，获取相应结果

## 标签计算

可以对表中字段配置标签，fdp会将源数据同步给会员，会员可以在此基础上给此字段添加规则，规则会同步到fdp，fdp就能根据字段上的规则进行计算，如果会员那边没有配置规则，那么此节点实际上是没有进行计算的。

举例：一百万数据，其中包含年龄字段。用户在标签计算节点中设置年龄字段作为指标，会员设置规则age>18为成年人，age<18为未成年人，fdp这边经过计算就能知道哪些是成年，哪些未成年。

### 创建标签节点

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/71d33d4a-7766-49e8-95ad-691cc91050f9.png)

### 编辑标签节点

1. 点击添加指标

2. 选择需要计算的表名和字段

3. 点击确定完成保存

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/01d0af00-594b-42b6-8dd8-a2e6341019c0.png)

## 数据注销

如果用户不希望数据留存在系统内部，数据注销能够将留存在系统内部的数据进行清除。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/4e95fb16-3e40-474a-af3f-2ab5d24f9368.png)

## Python执行

能够利用python做机器学习，深度学习或者一些简单的测试，通过日志看到运行结果。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/07929184-88bf-4181-b6c2-945ac9429aaf.png)

## 群组计算

在标签计算的基础上，对人群进行划分。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/5b0fcbf1-97ed-4669-b1f3-184940dfca39.png)

## 工作流明细

点击工作流明细中选择查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/24/73269ce5-2b22-4926-8713-2e1efe32a0c9.png)
