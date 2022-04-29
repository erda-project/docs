# 制品部署
## 部署制品

进入 **DevOps 平台 > 项目 > 应用 > 部署中心**，选择对应环境、分支和制品 ID，即可完成部署。

:::tip 提示
制品 ID 可在制品管理中查看。
:::

完成部署后，点击制品卡片，可查看制品的终端、微服务、动态和日志信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d4ac420c-fe43-4c2a-8514-17ac02339acb.png)

## 修改部署

在部署中心选择目标制品，点击下拉菜单中的更新、删除或重启即可。

* **更新**：重新选择制品以覆盖原有部署制品。

* **删除**：从环境中删除该部署制品。

* **重启**：重新部署该制品。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/ced8ac9b-2634-4912-8675-4745d1620700.png)

## 跨集群部署

在流水线文件中 Relese Action 部分的 `params` 添加 `cross_cluster: "true"`，则流水线生成的制品可跨集群部署。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/13f6a8d4-59d8-4159-a2f3-7eca15aefdc0.png)

