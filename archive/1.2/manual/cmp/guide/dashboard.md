# 运维大盘

目前几乎所有监控产品均支持大盘功能，常见的开源大盘工具有 [Grafana](https://grafana.com/)、[Kinaba](https://www.elastic.co/cn/kibana/)。Erda 的大盘功能同样十分强大，能够让您自定义选择如何呈现自己的数据，包括但不限于监控数据。

## 新建大盘

进入 **多云管理平台 > 运维大盘 > 新建运维大盘**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/ebf5a67e-20e0-4d3d-912d-5102854243ef.png)

点击编辑按钮进入编辑模式。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/877a7b35-4757-4abf-bb28-6f8b7fef1bc7.png)

## 配置大盘

此处以配置某应用的 CPU 使用率折线图为例，填写大盘标题（必填）和大盘描述如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/ad3b4116-30bd-46d9-9862-614432ef9a23.png)

### 新建图表

点击 **+** 新增图表，进入配置图表界面。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/10d94739-fa65-4b4f-9443-b4393a55052b.png)

* **图表类型**

  目前大盘支持折线图、面积图等八种图表类型。此处以折线图为例。

* **指标分组**

  平台对大量指标进行了分组，您可以直接选择合适的指标或输入文字搜索。此处以项目资源下的实例资源为例。

* **维度**

  可理解为分组，类似于 SQL 中的 `GROUP BY`，对于监控指标一般选择时间和容器 ID。

* **值**

  具体指标并配置聚合方法，类似于 SQL中 的 `SELECT avg(cpu_usage_percent)`。此处以 CPU 使用率的平均值为例。

* **结果排序**

   类似于 SQL 中的 `ORDER BY`。

* **结果截取**

  类似于 SQL 中的 `LIMIT`。

* **固定图表时间范围**

  指定后图表的时间范围为固定，不会随整体时间范围变化而变化，一般不作指定。

完成配置后，得到图表如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/257fc958-57be-4dcf-affa-ba0c89434107.png)

### 调整图表

若您不满意默认的图表大小，可以通过拖拽的方式重新调整。

### 保存图表

点击右上角保存图表保存大图。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/dda55ba1-7a65-41dc-a9e0-96a15f40f73b.png)

## 查看大盘

进入 **多云管理平台 > 运维大盘 > 新建运维大盘**，即可查看已创建的大盘。

您可以调整时间范围，查看任意时间段的数据。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/21/ddc92183-dfb9-4348-be93-fcc71d88ef7e.png)

