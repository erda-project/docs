# 数据服务

## API 管理

用于对外提供接口，外部可通过该接口获取系统内部数据，而无需更改源码。

进入 **数据服务 > API 管理**，点击 **新增 API**，根据提示完成信息填写。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/1524725b-469e-4357-bbb0-48e1c33d255e.png)

若用户注重数据安全，可在字段配置中对数据信息进行加密。

1. 进入 **数据集成 > 字段配置**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/1f118010-f63f-4c9b-9268-856768dc1ba4.png)

2. 点击 **新增配置**。

3. 选择数据源和数据模型。

4. 配置规则。

5. 点击 **确定** 保存配置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/affc6686-d68d-4934-9b23-aeec78eea575.png)

## 调用方管理

可通过设置调用方对 API 进行分组，通过授权 AccessKey 和 SecretKey 的方式，控制 API 的访问权限。

1. 进入 **数据服务 > 调用方管理**，新增调用方。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/9fe806b9-08b2-4152-b762-749459782006.png)

2. 点击 **授权**，在弹出的列表中勾选需授权的 API。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/f2bb151c-571b-46d5-a3bd-00c7dfe05781.png)

3. 在调用方列表中点击调用方名称查看详情，复制 AccessKey 和 SecretKey 提供至访问方。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/725fcdbd-5055-4fde-a885-f86b76866692.png)