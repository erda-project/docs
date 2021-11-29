# 统计分析

## 迭代选择

您可通过仪表盘右上角的下拉菜单选择迭代，平台将过滤出相关迭代的缺陷和任务。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/27b3cf76-6af5-4087-aaba-32a07463fdac.png)

## 缺陷

### 缺陷按状态分布

项目协同中的缺陷可按照以下状态区分：

- OPEN：待处理
- RESOLVED：已完成
- CLOSE：已关闭
- REOPEN：重新打开
- WONTFIX：无需修复

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c32963be-7af3-46cd-a5dc-938bac72c163.png)

### 缺陷按严重等级分布

项目协同中的缺陷可按照以下严重程度区分：

- FATAL：致命
- SERIOUS：严重
- NORMAL：一般
- SLIGHT：轻微
- SUGGEST：建议

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c1605fed-6b2d-45a1-85a0-ffb365ff6591.png)

### 缺陷新增/关闭趋势

展示每天缺陷的新增数量和关闭数量，您可通过图中滚轮调整具体时间，

若未选择迭代，则开始时间即项目创建时间，结束时间即当天。若已选择迭代，则开始时间为迭代的开始时间，结束时间为迭代的结束时间。每天临晨两点统计前一天的数据。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/730815cb-a355-40bf-bc0f-07d4093003d4.png)

### 缺陷按人员分布

展示当前迭代下，项目中各成员名下的缺陷总数及未关闭缺陷数量。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6fa6abbb-37b2-4fe8-9e73-ab2bc735abc3.png)

### 缺陷按重新打开分布

展示整个项目或迭代中，缺陷重新打开的次数。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/313ce542-b1f7-4a86-b423-3fd8f7aa7334.png)

- is_re_open_FATAL：致命缺陷重新打开
- is_re_open_SERIOUS：严重缺陷重新打开
- is_re_open_NORMAL：一般缺陷重新打开
- is_re_open_SLIGHT：轻微缺陷重新打开
- is_re_open_SUGGEST：建议缺陷重新打开

### 缺陷平均修复工作量（人天）

缺陷关闭时，所用时间除以投入人数的均值。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f4ae6e89-0381-4595-b39f-526be711aa4a.png)

### 缺陷平均响应时间（天）

缺陷最后更新时间与创建时间的间隔均值。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f4ae6e89-0381-4595-b39f-526be711aa4a.png)

### 缺陷按优先级分布

展示当前迭代下，项目中各成员名下的缺陷总数及未关闭缺陷数量。您可通过右上角下拉框根据缺陷优先级进行过滤。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/5d5971f1-9aba-4da4-ad47-567aa09f1cda.png)

## 工作量

### 实际工作量（人天）

所有任务已用工时的总和。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f5267d98-6065-4f28-99d7-2cab94a0b7e4.png)

### 预计工作量（人天）

所有任务分配工时的总和。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c7245d69-922d-459e-8b85-54f0ac3b4a89.png)

### 成员工作量分布（人天）

展示项目中各成员的已用工作量和预估工作量总和。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/5dc9effb-9937-4163-abd3-e99ce5b74a4e.png)

### 按人员事件分布（个）

展示项目中各成员名下的任务和缺陷总数。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6c8cc459-8be2-4319-930d-ad3774315b58.png)

### 缺陷耗时 TOP10（人天）

展示耗时排名前 10 的缺陷及其工作量。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/25cd0023-40dd-4fc1-b89a-1edd5b13e837.png)

### 任务耗时 TOP10（人天）

展示耗时排名前 10 的任务及其工作量。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6c9077b7-36ad-4888-934b-b597223a7ee8.png)
