# 制品部署
## 部署制品

进入 **DevOps 平台 > 项目 > 应用 > 部署中心**，选择一个环境，选择分支，选择制品 ID，即可完成部署，

:::tip 提示
制品 ID 可在制品管理中查看。
:::

部署完成之后，点击制品卡片，可查看制品的终端、微服务、动态、日志。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d4ac420c-fe43-4c2a-8514-17ac02339acb.png)

## 修改部署
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/ced8ac9b-2634-4912-8675-4745d1620700.png)

在部署中心中选择想要更新或删除的已被部署的制品旁的下拉菜单，点击更新、删除、重启即可。

* 更新操作可以重新选择一个制品以覆盖原有部署制品。

* 删除操作会从环境中删除一个制品的部署。

* 重启操作会重新部署该制品。

## 跨集群部署
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/13f6a8d4-59d8-4159-a2f3-7eca15aefdc0.png)

在流水线文件中的 Relese Action 的 `params` 中添加 `cross_cluster: "true"`，则流水线生成的制品可以跨集群部署。

