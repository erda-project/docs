# 快速接入

日志分析服务可收集应用的日志进行存储，并提供全文搜索和日志统计等功能。

## 编辑 erda.yml 添加日志分析 Addon

日志分析以 Addon 的形式提供，因此需编辑应用的 `erda.yml` 文件添加日志分析的 Addon，并重建流水线进行部署。

* 以可视化方式添加日志分析 Addon

  ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/92c30d23-243e-442a-93af-9fc234e36c13.png)

* 以代码方式添加日志分析 Addon

  ```yaml
  version: 2.0
  envs: {}
  services:
    foobar:
  ...
  ...
  addons:
    log-analytics:
      plan: "log-analytics:basic"
  ```

:::tip 提示
应用需添加 `log-analytics` Addon 后，该应用的日志才可被日志分析服务收集。
:::

## 重建流水线执行部署

编辑并保存 `erda.yml` 后，需重建应用对应分支的流水线并执行部署。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/49d71878-5d1d-4c50-923d-b43d43b3ef0f.png)

流水线执行成功后，将在所部署的集群中部署日志分析的必要组件，包括：

- **monitor-collector**：用于接收 `filebeat` 采集的应用日志，写入 `kafka`。
- **kafka**：作为缓冲通道存储 `monitor-collector` 收集的日志，供 `log-exporter` 消费。
- **zookeeper**：提高 `kafka` 使用。
- **log-exporter**：读取 `kafka` 存储的日志，写入 `elaticsearch`。
- **elasticsearch**：存储并索引日志数据。

## 进入日志分析模块查看数据

完成部署后，应用容器的日志将被收集并写入日志分析的 `elasticsearch` 中，您可进入 **微服务治理平台 > 日志分析 > 日志查询** 查看。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/1b02f752-a542-4dfe-b7c7-c212449a8a0c.png)

