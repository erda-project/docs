# 数据服务

## API 管理

用于对外提供接口，外部可通过该接口获取系统内部数据，而无需更改源码。

进入 **数据服务 > API 管理**，点击 **新增 API**，根据提示完成信息填写。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/b4920eb9-7dc9-49a2-846d-512c08dbab37.png)

若用户注重数据安全，可在字段配置中对数据信息进行加密。

1. 进入 **数据集成 > 字段配置**。

2. 点击 **新增配置**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/0658f039-6367-4653-9535-7291d7faf3c5.png)

3. 选择数据源和数据模型。

4. 配置规则。

5. 点击 **确定** 保存配置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/a30a1331-c660-4a2b-8786-94a2be9d9e53.png)

## 调用方管理

可通过设置调用方对 API 进行分组，通过授权 AccessKey 和 SecretKey 的方式，控制 API 的访问权限。

1. 进入 **数据服务 > 调用方管理**，新增调用方。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/e658332c-41cb-467b-b209-35459d75ffc1.png)

2. 点击 **授权**，在弹出的列表中勾选需授权的 API。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/a5cbce8a-5836-435f-be81-9e84bd8cabab.png)

3. 在调用方列表中点击调用方名称查看详情，复制 AccessKey 和 SecretKey 提供至访问方。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/29/899b928b-7f07-472f-978e-3ff2be384c89.png)