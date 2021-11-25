# 统计分析

## 迭代选择

您可通过项目大盘右上角的下拉菜单选择迭代，平台将过滤出相关迭代的缺陷和任务。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/27b3cf76-6af5-4087-aaba-32a07463fdac.png)

## 缺陷分布

### 按状态分布

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c32963be-7af3-46cd-a5dc-938bac72c163.png)

项目协同中的缺陷可按照以下状态区分：

- OPEN：待处理
- RESOLVED：已完成
- CLOSE：已关闭
- REOPEN：重新打开
- WONTFIX：无需修复

### 按严重等级分布

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c1605fed-6b2d-45a1-85a0-ffb365ff6591.png)

项目协同中的缺陷可按照以下严重程度区分：

- FATAL：致命
- SERIOUS：严重
- NORMAL：一般
- SLIGHT：轻微
- SUGGEST：建议

### 按优先级分布

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/5d5971f1-9aba-4da4-ad47-567aa09f1cda.png)

该图表中 Y 轴按人员排列，X 轴分为两个柱状图，分别代表缺陷总数和未关闭总数，人员过多的时候下方会有左右滚轮拖动。通过这张图可以知道当前迭代，人员身上还有多少缺陷未完成和缺陷最多的人员。

右上方有个下拉框可以根据缺陷优先级进行过滤。

### 按重新打开分布

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/313ce542-b1f7-4a86-b423-3fd8f7aa7334.png)

统计整个项目或者迭代，人员缺陷重新打开的次数。如果一个缺陷被重新打开多次，每次都会被记录。

Y 轴按人员分布，X 轴分 5 个柱状图，每个柱状图按照缺陷的严重等级划分。

- is_re_open_FATAL：致命缺陷重新打开
- is_re_open_SERIOUS：严重缺陷重新打开
- is_re_open_NORMAL：一般缺陷重新打开
- is_re_open_SLIGHT：轻微缺陷重新打开
- is_re_open_SUGGEST：建议缺陷重新打开

### 按人员分布

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6fa6abbb-37b2-4fe8-9e73-ab2bc735abc3.png)

项目下的成员都有两个柱状图，一个代表缺陷总数，一个代表未关闭的总数，人员过多的时候下方会有左右滚轮拖动。通过这张图可以知道当前迭代，人员身上还有多少缺陷未完成和缺陷最多的人员。

Y 轴按人员排列，X 轴分两个柱状图，一个是缺陷总数，一个是未关闭缺陷总数。

### 按人员事件分布

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6c8cc459-8be2-4319-930d-ad3774315b58.png)

展示成员身上的任务和缺陷的数量，Y 坐标展示的是人员名称，X 坐标有两根柱状图，一根表示任务数，一根表示缺陷数。

- issue_type_BUG：缺陷
- issue_type_TASK：任务

### 按成员工作量分布（人天）

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/5dc9effb-9937-4163-abd3-e99ce5b74a4e.png)

展示成员身上的任务按照已用和预估工时的分布图，Y 坐标展示的是人员名称，X 坐标有两根柱状图，一根表示预估工时，一根表示已用工时。

## 缺陷新增/关闭趋势

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/730815cb-a355-40bf-bc0f-07d4093003d4.png)

表单记录了每天缺陷新增的数量和每天缺陷关闭的数量，图形下面有左右滚轮可以滚动时间，当未选迭代的时候开始时间就是项目创建时间，结束时间就是当天。

当选了迭代后开始时间就是迭代的开始时间，结束时间就是迭代的结束时间，当天的数据都不会被统计，每天临晨两点会统计昨天的数据，通过该趋势图可以看到项目协同中的缺陷每天新增和关闭的趋势图。

Y 轴按时间分布，X 轴有两条折线，一条代表新增的趋势，一条代表关闭的趋势。

## 缺陷平均修复工作量（天）
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f4ae6e89-0381-4595-b39f-526be711aa4a.png)

缺陷关闭的时候填写的 **时间跟踪** 中的 **所用时间** 除以人数的一个平均值。

## 缺陷平均响应时间（天）
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f4ae6e89-0381-4595-b39f-526be711aa4a.png)

缺陷的最后更新时间减去创建时间的均值。

## 实际工作量

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/f5267d98-6065-4f28-99d7-2cab94a0b7e4.png)

所有任务的已用工时的总和。

## 预计工作量

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/c7245d69-922d-459e-8b85-54f0ac3b4a89.png)

所有任务的分配工时的总和。




## 缺陷 耗时TOP10（人天）
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/25cd0023-40dd-4fc1-b89a-1edd5b13e837.png)

展示前 10 的缺陷耗时排名，Y 坐标展示的是缺陷 ID，X 坐标展示的是耗时人天。

## 任务 耗时TOP10（人天）
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/6c9077b7-36ad-4888-934b-b597223a7ee8.png)

展示前 10 的任务耗时排名，Y 坐标展示的是缺任务 ID，X 坐标展示的是耗时人天。
