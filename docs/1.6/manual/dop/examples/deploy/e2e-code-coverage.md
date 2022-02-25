# 集成测试代码覆盖率统计

统计代码覆盖率是检查代码质量的有效方式之一。通过分析项目中未覆盖的代码，可逆向排查代码设计中不合理之处，理清代码逻辑关系，提升代码质量，同时检查测试设计是否合理，是否有遗漏的场景等等。

相比单元测试的代码覆盖率，集成测试的代码覆盖率更接近真实业务，能够更准确地体现代码在实际场景中的执行情况。

下文将以一个使用 Spring 框架的 Java 后端应用为例，介绍如何使用集成测试覆盖率统计功能。

::: tip 提示

学习下文示例前，请先学习如何在 Erda 上 [创建并通过流水线部署应用](../../../quick-start/newbie.md)。

::: 

## 创建应用

使用 [示例源码](https://github.com/erda-project/jacoco-code-coverage.git) 创建一个应用，并通过流水线部署该应用至测试环境。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/9f32adb4-c59d-4261-997c-cbb4d9177da8.png)

在该项目中，erda.yml 中引入了 sourcecov addon 用于对该应用开启代码覆盖率收集。

示例如下：
```yaml
version: "2.0"
services:
  jacoco-demo:
    ports:
      - port: 8080
        expose: true
    resources:
      cpu: 0.2
      mem: 512
    deployments:
      replicas: 1
addons:
  sourcecov:
    plan: sourcecov:basic
```

您可以根据需收集的 Java 应用数量，合理调整 sourcecov addon 的规格，加快覆盖率分析速度。

| 规格 | 说明 |
| ------| :---- |
| Basic | 支持少量应用（1～2）的覆盖率收集  |
| Professional | 支持中等数量应用（3～10）的覆盖率收集 |
| Ultimate|支持更多数量应用（10+）的覆盖率收集|


## 检查部署情况

进入 **应用中心 > 环境部署**，等待应用 ss-amp-demo 和 addon sourcecov 部署完成。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/6ded1989-96b4-4ffe-a9ee-bf9ad04c497a.png)

## 执行覆盖率收集计划

进入 **应用所在项目 > 测试管理 > 统计 > 代码覆盖率统计**，选择应用部署的环境。

点击 **开始** 按钮，系统将进入执行计划的数据准备阶段，此时您可以同时执行自动化或手动测试用例对应用进行测试。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/38f32891-5a16-49f9-8110-e13b2f436cc1.png)

## 结束收集计划

测试结束后刷新该页面，可点击 **结束** 按钮（若该按钮不可点击，表明系统尚未完成数据准备，请继续等待）。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/b701cc7b-7b05-4993-a58f-3aa96489f8d8.png)

## 查看覆盖率

点击 **结束** 按钮后，系统开始分析覆盖率数据，等待一段时间后刷新页面，即可查看集成测试的覆盖率数据，并通过点击执行记录中的 **下载报告** 按钮，下载 JaCoCo HTML 格式的覆盖率报告。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/996fe5e0-153f-4dd8-83b7-33b4f1b4ff67.png)
