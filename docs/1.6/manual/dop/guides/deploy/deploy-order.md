# 部署管理

进行部署前，请确认已经准备好了制品，请参考 [制品管理](./release.html)。  

进入项目，在 **应用中心 > 环境部署 > 部署** 选择对应的环境，可以进行部署管理。

## 创建部署

在环境部署页面，可以按照如下步骤创建部署单：

1. 选择您期望部署的 **项目/应用** 制品。
2. 根据前置检查的提示，确保您的项目/应用制品已经满足部署要求。
3. 点击创建部署。

:::tip 提示 
创建部署单前会进行如下检查：

* 制品格式的规范性
* 制品中涉及的自定义 Addon 是否已经部署
* 制品中涉及的 Addon 及版本当前平台是否支持
* 部署涉及的应用在该环境是否处于部署中的状态
  :::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/d76f3d83-848f-4cbb-be09-cc6c601e948e.png)

## 开始部署

在部署记录列可以查看已经创建的部署，点击 **开始部署** ，将按照制品中的分组编排依次执行部署。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/d01e82cc-b937-4af8-aa3e-3325f89ce3d1.png)

您可以点击查看详细部署进度以及本次部署应用相关的配置信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/92bd476e-7e85-4a2e-839b-2c60f3bad97b.png)

## 重新部署

:::tip 提示 
已经部署成功的部署单无法执行重新部署操作，需要创建新的部署单。
:::

如果部署过程中存在失败或者触发了取消部署，您可以点击 **重新部署** ，将从 **当前失败的批次** 重新部署。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/d57696d3-9e33-4d99-aa1a-6d4c559f9eac.png)
