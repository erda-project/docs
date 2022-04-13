# 通过部署单部署

着手部署前，请确认已完成制品创建，具体请参见 [制品](./release.html)。  

进入 **应用中心 > 环境部署 > 部署** 后选择对应的环境，即可进行部署管理操作。

## 创建部署

请按照以下步骤创建部署单：

1. 点击页面右上角的 **+** 图标。
1. 选择需部署的项目或应用制品。
2. 根据前置检查的提示，确认您选择的制品已满足部署要求。
3. 点击 **创建**。

:::tip 提示 

创建部署单前，平台将进行如下检查：

* 制品格式是否符合规范
* 是否已部署制品所涉及的自定义 Addon
* 当前平台是否支持制品所涉及的 Addon 及其版本
* 部署涉及的应用在该环境下是否处于部署中的状态

:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/e5140066-dcbf-440c-86d4-2e8a3a2393e6.png)

若选择的制品为项目制品，则还需要选择部署模式。选择模式后，平台会对您当前选择的模式中包含的应用进行上述检查。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/13/1696b2f0-c448-43d3-a9ef-ecc0ce461a9d.png)

部署项目制品时，平台会自动在部署的所有服务中添加环境变量 `ERDA_DEAPLOY_MODES`，其值为部署时勾选的模式，用英文逗号分隔。例如，部署时勾选了 modeA 和 modeB，则部署成功的所有服务中都会被自动注入环境变量 `ERDA_DEPLOY_MODES=modeA,modeB`。

## 开始部署

在部署记录中可查看已创建的部署。点击 **开始部署**，即可根据制品中的分组编排依次执行部署。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/a19f3d1d-9ca6-43f3-82ad-817c62cc30df.png)

您可点击该部署记录，查看详细部署进度及本次部署应用相关的配置信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/147d9172-7266-44c5-903f-02756b5d839b.png)

## 重新部署

:::tip 提示 
已成功部署的部署单无法执行重新部署操作，需创建新的部署单。
:::

若部署过程中存在失败或触发了取消部署，可点击 **重新部署**，从当前失败的批次重新部署。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/f21c698a-fd90-4a5e-a89e-b012074f2a21.png)
