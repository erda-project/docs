# 制品部署
## 部署制品

进入 **我的应用 > 部署中心**，选择对应环境、分支和制品 ID，即可完成部署。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/3b24b392-b938-4914-a570-37b86d479ca9.png)

:::tip 提示
制品 ID 可在制品管理中查看。
:::

完成部署后，点击制品卡片，可查看制品的终端、微服务、动态和日志信息。

## 修改部署

在部署中心选择目标制品，点击下拉菜单中的更新、删除或重启即可。

* **更新**：重新选择制品以覆盖原有部署制品。

* **删除**：从环境中删除该部署制品。

* **重启**：重新部署该制品。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/1e87174c-73a2-4f22-9d57-6331988848fc.png)

## 跨集群部署

在流水线文件中 Relese Action 部分的 `params` 添加 `cross_cluster: "true"`，则流水线生成的制品可跨集群部署。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/a615715f-7491-4195-aadd-1dfe51607446.png)

