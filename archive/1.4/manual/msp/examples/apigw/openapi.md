# 向合作方开放 API

[流量入口](../../concepts/apigw/core.md#流量入口-endpoint) 除了可以设置为“Web 或 App 聚合 API”的场景，还可以设置为“面向合作伙伴开放 API”的场景。

此时访问该流量入口，默认需要 [调用方](../../concepts/apigw/core.md#调用方-consumer) 携带调用凭证，通过和凭证对应的 [认证](../../concepts/apigw/core.md#认证-authentication-authn) 校验以及 [授权](../../concepts/apigw/core.md#授权-authorization-authz) 校验，方可访问对应的 API。

:::warning 警告

该功能是 API 开放最简单便捷的方式，但仅限于管理者控制调用方的凭证和授权。调用方无法自助申请 API，亦无法自行管理调用凭证。

若调用方需自助申请 API，请参见 [API 全生命周期管理](../../practice/apigw/apim.md#访问管理)。请注意，此方式下 API 授权和流量限制的最小粒度为一个 API 资源包，不再是单个的 API。因此，对于有不同权限级别 API 的场景，可能需要封装多个 API 资源包。

:::

### 示例一

若需求为：

- 对于流量入口 *example.erda.cloud* 下的接口访问，有认证机制可识别接口调用方。
- 控制调用方仅能访问流量入口下的 API：*example.erda.cloud/example*。
- 有一个特定 API ，无需认证即可访问：*example.erda.cloud/special*。

则配置示意如下：

创建一个场景为“面向合作伙伴开放 API”的流量入口，将 **调用方认证方式** 设置为最简单的 **Key 认证** 模式。

该模式下调用方仅需在请求上添加一个参数 `appKey` 或者请求头 `X-App-Key`，即可用于认证识别。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/86b58008-2bca-4d45-a12c-a3cf26f4b9e7.png)

（可选）在创建流量入口的过程中，一并创建调用方（或之后通过编辑流量入口进行配置）并授权。授权后，调用方将拥有流量入口下所有接口的调用权限。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/f1c64c8e-c2ea-413f-be7d-2986b47c916d.png)

（可选）对调用方设置调用量限制。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/ba590271-e90f-4c43-85b2-23ff8c9f114a.png)

若仅将 *example.erda.cloud/example* 授权给调用方，点击流量入口详情中对应 API 的 **授权** 按钮进行操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/8887142f-9377-4260-889b-820019e71519.png)

将 *example.erda.cloud/special* 设置为无需认证即可访问。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/96954ef0-101a-4c56-a738-2b65b80da9b1.png)
