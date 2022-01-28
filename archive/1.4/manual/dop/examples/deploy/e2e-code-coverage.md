# 集成测试代码覆盖率统计

## 介绍

统计代码覆盖率是检查代码质量的重要工具，通过分析项目中未覆盖部分的代码，一方面可以逆向反推代码设计中不合理的地方，理清代码逻辑关系，提升代码质量，另一方面可以反推测试设计的是否合理，是否有遗漏的场景等等。

相对单元测试的代码覆盖率，集成测试的代码覆盖率更接近真实业务，更为准确得体现代码在真实场景中的执行情况。

## 快速上手

下面以一个典型的使用 Spring 框架的 Java 后端应用为例，说明如何启用集成测试覆盖率统计功能。

> 学习这个例子前，请学习如何在 Erda 上如何使用[创建一个应用并使用流水线部署一个应用](https://docs.erda.cloud/latest/manual/dop/examples/deploy/deploy-from-git.html)。

### 创建示范应用

使用 [https://github.com/erda-project/jacoco-code-coverage.git](https://github.com/erda-project/jacoco-code-coverage.git) 仓库的源码创建一个应用，并使用流水线部署该应用到测试环境。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/26/ae31392a-4dc0-40b7-a64f-dd9d635c7fa7.png)

请注意在此项目中，**sourcecov** addon 被引入到了 erda.yml 中，用以对该应用开启代码覆盖率收集。若要对其他应用开启此 addon，同样也在 erda.yml 中引用此 addon。

_引用示范_
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

根据需要收集的 java 应用数量的多少，您可以合理调整 sourcecov addon 的规格，加快覆盖率分析速度。

**sourcecov 规格**

| 规格名称 | 说明 |
| :-----| ----: | 
| basic | 支持少量应用(1-2)的覆盖率收集  |
| professional | 支持中等数量应用(3-10)的覆盖率收集 |
| ultimate|支持更多数量应用(10+)的覆盖率收集|


### 检查部署情况

进入 **应用 > 部署中心** , 等待应用 java-demo 和 addon **sourcecov** 部署完成。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/26/1760036a-b455-4572-8253-f9898f1ca9d7.png)

### 开始执行覆盖率收集计划

进入 **应用所在项目 > 测试管理 > 统计 > 代码覆盖率统计**，选择应用部署的环境，示范应用中为**测试环境**.

点击 **开始** 按钮，系统会进入执行计划的数据准备阶段，此刻您可以同时执行自动化或者手动测试用例对应用进行测试。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/26/675bbaad-6653-4fbe-8ea6-983510e0a09e.png)

### 结束收集计划

结束测试之后，刷新统计页面，可以点击**结束**按钮 （若此按钮还不可点击，说明系统还未完成计划的数据准备，等待一段时间即可）。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/26/4cae5fa1-bc15-447d-a8a4-79729214d0e8.png)

### 查看覆盖率

点击**结束**按钮之后，系统开始分析覆盖率数据，等待一段时间后刷新页面，即可看到集成测试的覆盖率数据，并通过点击执行记录中的**下载报告**按钮，下载 jacoco html 格式的 覆盖率报告。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/10/26/577db89c-b10c-491f-a6c8-f7d8f2c8ac86.png)