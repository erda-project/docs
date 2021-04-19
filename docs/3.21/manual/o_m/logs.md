# 企业日志分析

从多云管理平台->日志分析进入，可以对企业下所有的日志进行查看分析。还可以根据日志创建分析规则，并进一步配置图表和告警通知。

日志主要包含两部分来源：

* Erda 上部署的应用日志
* 企业使用的云厂商服务日志

对于云厂商服务日志，当前支持的有：

* 阿里云 WAF 
* 阿里云 API 网关
* 阿里云 RDS

:::tip

应用日志，需要在 dice.yml 中添加日志分析 addon，才能支持查询，例如：

```yaml
addons:
  logs:
    plan: "log-analytics:basic"

```

云厂商服务日志，仅私有化完整部署 Erda 平台时支持，SaaS 模式不提供支持

:::

## 日志查询

除了提供基于内容的搜索功能外，还可以基于日志标签进行搜索。日志标签由`key=value`组成，可以点开一行日志，在 JSON 视图下，对应的 tags 字段中包含了此条日志的所有标签。

在`按标签搜索` 输入框中，可以手动输入`key=value`的标签，搜索包含对应标签的日志；也可以通过标签菜单的引导，自动完成标签的输入。

例如要查看项目下指定应用的日志，需要在菜单第一级选中`平台`，第二级是项目列表，选中对应的项目名称，第三级是应用列表，选中对应的应用名称。

## 日志链路

对每一条查询出的日志，如果该日志中存在 Request ID 信息，则可以点击链路追踪操作，将具有同一个 Request ID 的日志悉数展现出来。

这样就可以对一个请求经过链路上所有服务的日志进行查询。

## 日志分析

对于应用日志，创建日志分析规则，是进行自定义图表和告警项配置的基础。

对于云厂商服务日志，日志分析规则是内置的，无需单独进行配置

### 创建规则

从多云管理平台->日志分析->分析规则进入，可以手动创建日志分析规则。提供了两种模版：nginx，tomcat。其中 nginx 模版对应的 nginx
 配置命令如下：

```bash
log_format main '[$time_local]\t$http_x_forwarded_for\t$remote_addr\t$scheme\t$host\t$request\t$status\t$request_time\t$request_length\t$bytes_sent\t$http_referer\t$http_user_agent\t$ssl_protocol\t$ssl_server_name\t$ssl_cipher\t$upstream_addr\t$upstream_status\t$upstream_response_time\t$connection\t$connection_requests';
```

也可以从日志查询出的条目中，点击`创建分析规则`操作，可以帮助配置日志标签。

:::tip

云厂商服务日志的条目，会看到`创建分析规则`操作是置灰的，因为对应规则已经内置，无需创建

:::

### 配置自定义图表

从多云管理平台->自定义大盘进入，选择指标分组为对应的日志分析来源，即可创建自定义图表

### 配置自定义告警

从多云管理平台->运维告警->自定义告警进入，选择指标为对应的日志分析来源，即可创建自定义告警
