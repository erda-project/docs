# 压测场景的监控大盘配置

对性能有高要求的系统在开发完成后或在线上环境遇到性能瓶颈时，多数将借助性能压测工具来提升服务应对大流量时的能力，此时可借助 Erda 的大盘能力查看压测过程中需关注的指标，例如：

- 服务运行中出现的慢 SQL
- 服务运行中出现的慢请求
- 压测场景下服务的内存及 CPU 使用情况

下文将以 apm-demo-api 为例，介绍如何通过 Erda 在性能压测场景下配置监控大盘。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/781b37e9-efbe-4e86-9866-2fa86ae0ec91.png)

## 慢 SQL 大盘配置

针对慢 SQL，您可在 Erda 大盘中选择表格类型的图表，查看 SQL 语句、SQL 请求的平均时间、SQL 请求的最大时间等信息，相关配置如下图所示：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a4c98180-7363-4f42-8038-7f3c2243fbc1.png)

## 慢请求大盘配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a240030d-ee37-40e6-b75b-e6da6e688792.png)

除慢请求外，您还可以查看特定请求路径的请求折线图。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/94cb4ba1-5f0a-4d6b-a272-c8723a0c06eb.png)

若服务为 Java 服务，您可通过大盘查看堆内存使用情况以及 GC 情况。

### 堆内存使用情况大盘配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/0261bcb6-3370-4537-af9d-bd81ddacba83.png)

### 服务 GC 使用情况大盘配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/8036d7ee-d8a1-4a2e-b3bf-d5595933a119.png)

## 内存及 CPU 使用情况大盘配置

您还可以通过运维大盘配置容器内存及 CPU 水位图表，需注意的是，在压测场景下需多关注 CPU 或者内存的峰值，以通过最大值来获取峰值。

### 单个实例 CPU 限制值卡片配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/80eec90b-de81-41b5-ad6c-8494027fc959.png)

### 单个实例 MEM 限制值卡片配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/426b4517-5713-4b1d-ba13-ad67801a3a2e.png)

### 实例数量卡片配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9f6bb228-08b1-410b-9358-f15af957b433.png)

### 实例 CPU 水位配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/561e8a59-df9e-4f6f-a040-341b2a593f7e.png)

### 实例 MEM 水位配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/3e79ee6e-0e51-470b-a179-34d3d2dcfb02.png)

如需基于 Pod Name 筛选，可在部署中心查看 Pod Name。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/6bcbaf74-9209-4c95-af78-25521b2dbd7f.png)

