# O&M Dashboard

Currently, most surveillance products support O&M dashboard, including [Grafana](https://grafana.com/) and [Kinaba](https://www.elastic.co/kibana/). Erda also provides O&M dashboard with rich features, allowing customization to present data, including but not limited to monitoring data.

## New Dashboard

Go to **Cloud Management > Custom Dashboard > New Custom Dashboard**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/74668137-4372-48a2-8d58-94072399a4a2.png)

Click the edit button.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/eb0531c4-26d6-4818-94aa-29224252878f.png)

## Configure Dashboard

Here is an example of configuring a line chart of CPU usage of an application. Fill in the title (required) and description of the dashboard as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/5923ed99-5d4a-4030-810a-5e6ec66dcb80.png)

### Add a Chart

Click **+ ** to add charts.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/d7ce5dbb-b1a6-49ce-9650-186cf2248770.png)

* **Chart Type**

   The dashboard supports eight chart types including line charts and area charts. Take a line chart as an example here.

* **Metric Group**

   The platform groups numerous metrics and you can directly select a group or enter text to search. Take the container instance under the project resource as an example here.

* **Dimension**

   It is similar to `GROUP BY` in SQL. In general, select time or container ID for monitoring indicators.

* **Value**

   It refers to the specific metric and the aggregation method, which is similar to `SELECT avg(cpu_usage_percent)` in SQL. Here takes the average of CPU usage as an example.

* **Result Sort**

   Similar to `ORDER BY` in SQL.

* **Result Limit**

   Similar to `LIMIT` in SQL.

* **Fixed Time Range**

   If set, the time range is fixed and will not change with the overall time range. It is unnecessary to set in most cases.

After completing the configuration, the chart is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/8ffcd0bb-865c-4f51-9084-78bac085765e.png)

### Adjust the Chart

Drag the chart to adjust its size if necessary.

### Save the Chart

Click the save button on the upper right corner to save the chart and dashboard.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/aa55b840-8b9d-43cc-b4dc-98eed916a601.png)

## View the Dashboard

Go to **Cloud Management > O&M Dashboard** to view the created dashboard.

Adjust the time range as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/1e2321dc-4c3b-4c4f-9da5-371d24a9d2d3.png)

