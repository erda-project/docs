# 日志查询

完成日志分析部署后，部署在业务集群中的 Filebeat 组件将采集日志并上报至 monitor-collector，最终存储在 Elasticsearch。您可以进入 **微服务平台 > 项目列表 > 选择项目 > 日志分析 > 日志查询** 查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/1a4717e3-341e-443d-974f-30e4b50c7098.png)

## 查询条件

日志的字段主要分为两类，内容字段（content）和标签字段（tags.*），其中日志内容字段为全文匹配模式，日志标签字段为精确匹配模式。

查询语法的基本形式为 `field:"keyword"`（当 Keyword 不包含空格时可省略引号），同时支持操作符 `AND` 、`OR` 和 `NOT`，以及使用 `()` 分组实现更复杂的查询条件。

由于内容字段（content）是相对常用的搜索字段，平台为此做了简化，当搜索的字段为 content 时，可以将 `field:keyword` 简化为 `keyword` 形式，查询引擎将默认未指明字段的查询语句目标字段为 content 字段。

示例如下：

- 搜索内容字段包含关键词 quick 的日志

  `quick` 或 `content:quick`


- 搜索内容字段精确匹配 John Smith 的日志

  `"John Smith"` 或 `content:"John Smith"`


- 搜索内容字段包含关键词 quick 或 brown 的日志

  `quick OR brown` 或 `content:quick OR content:brown`


- 搜索内容字段包含关键词 quick 且同时包含 brown 的日志

  `quick AND brown` 或 `content:quick AND content:brown`


- 搜索内容字段包含关键词 John Smith 且同时包含 quick 或 brown 任意一个关键词的日志

  `"John Smith" AND (quick OR brown)` 或 `content:"John Smith" AND (content:quick OR content:brown)`


- 搜索应用标签为 erda-demo 且日志内容包含 quick 的日志

  `tags.application_name:"erda-demo" AND quick` 或 `tags.application_name:"erda-demo" AND content:quick`

标签数据主要来源于平台内置标签和应用自定义标签。

### 平台内置标签

部署在业务集群中的采集组件在上报数据时，将自动提取部分环境上下文信息作为标签上报，主要有以下标签：

| 标签             | 含义                   | 示例                                             |
| ---------------- | :--------------------- | :----------------------------------------------- |
| org_id           | 所属组织 ID            | org_id:2                                         |
| org_name         | 所属组织名称           | org_name:integration                             |
| cluster_name     | 所属集群名称           | cluster_name:erda-hongkong                       |
| project_id       | 所属项目 ID            | project_id:123                                   |
| project_name     | 所属项目名称           | project_name:base-project                        |
| application_id   | 所属应用 ID            | application_id:667                               |
| application_name | 所属应用名称           | application_name:log-analytics-demo              |
| runtime_id       | 所属 Runtime ID        | runtime_id:593                                   |
| runtime_name     | 所属 Runtime 名称      | runtime_name:master                              |
| workspace        | 所属环境               | workspace:prod                                   |
| service_name     | 所属服务名称           | service_name:apm-demo-api                        |
| pod_namespace    | Pod 所在 K8s Namespace | pod_namespace:project-123-prod                   |
| pod_name         | Pod 名称               | pod_name:apm-demo-api-9c7963be16-69f4d9fc6-fwzd5 |
| container_name   | 容器名称               | container_name:apm-demo-api                      |

### 自定义标签

除平台内置的标签外，Erda 的采集组件同样支持业务自定义标签。自定义标签需以规定格式写入日志方可识别。从日志中提取标签的正则表达式如下：

```regexp
(?P<timedate>^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}:\d{1,2}(\.\d+)*)\s+(?P<log_level>[Aa]lert|ALERT|[Tt]race|TRACE|[Dd]ebug|DEBUG|[Nn]otice|NOTICE|[Ii]nfo|INFO|[Ww]arn(?:ing)?|WARN(?:ING)?|[Ee]rr(?:or)?|ERR(?:OR)?|[Cc]rit(?:ical)?|CRIT(?:ICAL)?|[Ff]atal|FATAL|[Ss]evere|SEVERE|[Ee]merg(?:ency)?|EMERG(?:ENCY))\s+\[(?P<ext_info>.*?)\](?P<content>.*?$)
```

匹配示例：

```text
2021-08-09 10:27:57.704 DEBUG [apm-demo-api,bc3d8ffa-5388-4c76-861b-f121955c2dec,tag1=value1,tag2=value2] - [qtp1590404373-19] org.eclipse.jetty.io.ManagedSelector    : content
```

如上所示，正则表达式的 `ext_info` 分组将匹配出 `apm-demo-api`、`bc3d8ffa-5388-4c76-861b-f121955c2dec`、`tag1=value1`、`tag2=value2`，其中 `tag1=value1`、`tag2=value2` 部分即为允许业务插入自定义标签的位置。 前两项目前作为保留字段，专用于 Trace 信息的插入，如示例中的 `bc3d8ffa-5388-4c76-861b-f121955c2dec` 即为当前日志所对应的请求 ID。

若为 Java 或 Node.js 应用，可通过平台提供的对应 Agent，自动注入 Trace 信息，当前主要为请求 ID：

| 标签     | 含义        | 示例                                             |
| :------- | :---------- | :----------------------------------------------- |
| trace_id | 关联请求 ID | trace_id: "bc3d8ffa-5388-4c76-861b-f121955c2dec" |

对于 Java 应用，还可结合使用 SLF4J 提供的 Mapped Diagnostic Context（MDC）在日志中插入自定义键值对，Agent 将感知 MDC 中的值并自动按照上述格式作为标签插入日志的 `ext_info` 位置。

## 数据统计

日志数据统计柱状图用于展示符合上方查询条件的数据在指定时间段内的分布情况。您可以在此查看数据分布特征，并通过鼠标滑选范围快速更改查询时间区段，从而聚焦关注时间段内的日志情况。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/26/8ad36e8f-607c-44bb-bdba-27db7993dc95.png)

## 标签数据

标签数据统计分布区与数据统计柱状图的作用相似，主要用于：

- 展示符合查询条件的数据，以及在某一特征标签上不同值的分布情况。
- 点击某个标签，可快速添加至查询条件进行查询。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/26/7026942d-1c9b-423c-9635-5d42be217a58.png)

## 日志列表

日志列表区以分页形式展示搜索结果，查询关键字将高亮显示。

- **时间**：点击切换时间顺序重新查询。
- **下载**：日志列表仅能查看前 10000 条日志，如需查看更多日志，可点击该按钮将日志下载至本地。
- **设置**：点击该按钮可设置日志列表显示的字段和标签（以 tags.* 开头的字段），用于排除无关字段。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/17/a0c4a791-0275-4abe-8b45-08ea9abb54e3.png)

每条日志均有对应的快捷操作按钮，具体说明如下：

- **复制**：点击可快速复制 content 字段内容。
- **上下文浏览**：点击将弹出新窗口，可进一步查看该条日志前后的相关日志。
- **创建分析规则**：作为创建分析规则的快捷入口，点击将跳转至 **分析规则** 页面，并自动将日志的部分标签和内容作为信息输入。关于日志分析相关信息，请参见 [分析规则](rules.md)。

当鼠标悬停在列表中某条日志的标签和内容时，点击可快速将该关键词添加为查询条件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/26/79f2b3df-fda9-40e9-8ddd-6a633e17119f.png)

- **添加到查询**：将选中的关键词追加至查询输入框。
- **新建查询**：将选中的关键词作为查询条件替换查询输入框中的内容。

若希望保留当前的查询条件和结果，可点击右侧图标打开新页面。
