# 日志查询

完成日志分析部署后，部署在业务集群中的 `filebeat` 组件将采集日志并上报至 `monitor-collector`，最终存储在 `elasticsearch`。您可以进入 **微服务治理平台 > 日志分析 > 日志查询** 查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/84fd032e-2c77-4708-b90a-0df6af429448.png)

## 日志筛选

目前支持以下三种条件筛选：

- **日志时间**：基于日志产生的时间范围过滤。
- **日志内容**：基于日志内容的全文搜索过滤。
- **日志标签**：基于日志上报时附带的标签信息过滤。

### 内容筛选方式
基于内容的搜索为全文搜索模式，支持操作符 `AND` 和 `OR`，同时支持使用 `()` 分组，具体如下：

- 搜索包含关键词 _quick_ 的日志：
  
  `quick`


- 搜索精确匹配 _John Smith_ 的日志：
  
  `"John Smith"`


- 搜索包含关键词 _quick_ 或 _brown_ 的日志：
  
  `quick OR brown`


- 搜索包含关键词 _quick_ 且同时 包含 _brown_ 的日志：
  
  `quick AND brown`


- 搜索包含关键词 _John Smith_ 且同时包含 _quick_ 或 _brown_ 任意一个关键词的日志：

  `"John Smith" AND (quick OR brown)`


### 标签筛选方式

标签过滤的基本输入形式为 `tagKey=tagValue`，`tagValue` 为精确匹配（非模糊匹配）。若您掌握需搜索的标签键值信息，可直接在标签搜索框内输入内容，按回车键确认输入的标签筛选条件。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/309bf2c3-cd1e-4ef1-bbe8-ad6545214fbb.png)

标签下拉菜单中的 **平台** 列表即当前项目下的应用列表，若选择该列表中的标签，将过滤出属于该应用的日志。

### 标签数据来源

标签数据主要来源于平台内置标签和应用自定义标签。

#### 平台内置标签
部署在业务集群中的采集组件在上报数据时，将自动提取部分环境上下文信息作为标签上报，主要有以下标签：

| 标签 | 含义 | 示例 |
| ---- | :--- | :--- |
| origin | 来源 | origin=dice |
| dice_org_id | 所属组织 ID | dice_org_id=2 |
| dice_org_name | 所属组织名称 | dice_org_name=integration |
| dice_cluster_name | 所属集群名称 | dice_cluster_name=erda-hongkong |
| dice_project_id | 所属项目 ID | dice_project_id=123 |
| dice_project_name | 所属项目名称 | dice_project_name=base-project |
| dice_application_id | 所属应用 ID | dice_application_id=667 |
| dice_application_name | 所属应用名称 | dice_application_name=log-analytics-demo |
| dice_runtime_id | 所属 Runtime ID | dice_runtime_id=593 |
| dice_runtime_name | 所属 Runtime 名称 | dice_runtime_name=master |
| dice_workspace | 所属环境 | dice_workspace=prod |
| dice_service_name | 所属服务名称 | dice_service_name=apm-demo-api |
| pod_namespace | Pod 所在 K8s namespace | pod_namespace=project-123-prod |
| pod_name | Pod 名称 | pod_name=apm-demo-api-9c7963be16-69f4d9fc6-fwzd5 |
| container_name | 容器名称 | container_name=apm-demo-api |

#### 自定义标签

除平台内置的标签外，Erda 的采集组件同样支持业务自定义标签。自定义标签需以规定格式写入日志方可识别。从日志中提取标签的正则表达式如下：
```regexp
(?P<timedate>^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}:\d{1,2}(\.\d+)*)\s+(?P<log_level>[Aa]lert|ALERT|[Tt]race|TRACE|[Dd]ebug|DEBUG|[Nn]otice|NOTICE|[Ii]nfo|INFO|[Ww]arn(?:ing)?|WARN(?:ING)?|[Ee]rr(?:or)?|ERR(?:OR)?|[Cc]rit(?:ical)?|CRIT(?:ICAL)?|[Ff]atal|FATAL|[Ss]evere|SEVERE|[Ee]merg(?:ency)?|EMERG(?:ENCY))\s+\[(?P<ext_info>.*?)\](?P<content>.*?$)
```
匹配示例：
```text
2021-08-09 10:27:57.704 DEBUG [apm-demo-api,bc3d8ffa-5388-4c76-861b-f121955c2dec,tag1=value1,tag2=value2] - [qtp1590404373-19] org.eclipse.jetty.io.ManagedSelector    : content
```
如上所示，正则表达式的 `ext_info` 分组将匹配出 `apm-demo-api`、`bc3d8ffa-5388-4c76-861b-f121955c2dec`、`tag1=value1`、`tag2=value2`，其中 `tag1=value1`、`tag2=value2` 部分即为允许业务插入自定义标签的位置。 前两项目前作为保留字段，专用于 Trace 信息的插入，如示例中的`bc3d8ffa-5388-4c76-861b-f121955c2dec` 即为当前日志所对应的请求 ID。

若为 Java 或 Node.js 应用，可通过平台提供的对应 Agent，自动注入 Trace 信息，当前主要为请求 ID：

| 标签 | 含义 | 示例 |
| :--- | :--- | :--- |
| request-id | 关联请求 ID | request-id=bc3d8ffa-5388-4c76-861b-f121955c2dec |

对于 Java 应用，还可结合使用 SLF4J 提供的 Mapped Diagnostic Context（MDC）在日志中插入自定义键值对，Agent 将感知到 MDC 中的值并自动按照上述格式作为标签插入日志的 `ext_info` 位置。

## 日志数量

日志数量图表可根据筛选条件统计指定时间段内的日志数量分析信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/1a6f880a-7116-46fa-aa63-844749abc057.png)

## 日志信息

日志信息展示符合筛选条件的日志详细列表。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/673d0128-ff28-4aec-aae1-928dbae72482.png)

您可点击数据行首的 **+** 展开查看日志的 Text 或 Json 格式。

针对各条日志，平台支持两项快捷操作：

- **链路追踪**：对于已关联 Trace 请求信息的日志，**链路追踪** 将呈现可点击状态。点击该选项可自动将该条日志关联的 `request-id` 作为标签筛选项输入并执行搜索。若您需查看某条日志关联的 Trace 相关信息，可执行该操作。
- **创建分析**：作为创建分析规则的快捷入口，点击该选项将跳转至 **分析规则** 页面，并自动将日志的部分标签和内容作为信息输入。关于日志分析相关信息，请参见 [分析规则](rules.md)。

