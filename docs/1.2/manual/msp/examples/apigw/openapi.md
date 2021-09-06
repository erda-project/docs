# 向合作方开放 API

[流量入口](../../concepts/apigw/core.md#流量入口-endpoint) 除了可以设置为`Web或者APP聚合API`的场景，还可以设置为`面向合作伙伴开放API`场景。

此时，访问该流量入口，默认需要[调用方](../../concepts/apigw/core.md#调用方-consumer)带上调用凭证, 通过和凭证对应的[认证](../../concepts/apigw/core.md#认证-authentication-authn)校验，以及[授权](../../concepts/apigw/core.md#授权-authorization-authz)校验，才可以访问对应的 API。

:::warning 功能局限

此功能是 API 开放最简单便捷的方式，但局限于管理者自己控制调用方的凭证和授权。调用方无法自助申请API，也无法自己管理调用凭证。

如果调用方需要自助申请 API，请参考最佳实践中的[API 全生命周期管理——访问管理](../../practice/apigw/apim.md#访问管理)。需要注意的是，此方式下，API 授权和流量限制的最小粒度是一个 API 资源包，不再是单个的 API。因此，对于有不同权限级别 API 的场景，可能需要封装多个 API 资源包。

:::

### 示例一

若需求为：

- 对于流量入口`example.erda.cloud`下的接口访问，希望有认证机制识别出接口调用方
- 希望控制调用方只能访问流量入口下的 API : `example.erda.cloud/example`
- 希望一个特定 API ，无需认证即可访问：`example.erda.cloud/special`

则配置示意如下：

创建一个场景为`面向合作伙伴开放API`的流量入口，将`调用方认证方式`设置为最简单的`key认证`模式；

此模式下调用方只需在请求上添加一个参数`appKey`或者请求头`X-App-Key`，即可用于认证识别。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/86b58008-2bca-4d45-a12c-a3cf26f4b9e7.png)

(**可选**) 可以在创建流量入口的步骤中，顺带创建好调用方(不是必须的，之后可以通过编辑流量入口，再进行配置)，并且进行授权，此处授权后，调用方将拥有流量入口下所有接口的调用权限。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/f1c64c8e-c2ea-413f-be7d-2986b47c916d.png)

(**可选**) 可以对调用方设置调用量限制

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/ba590271-e90f-4c43-85b2-23ff8c9f114a.png)

只将 `example.erda.cloud/example` 授权给调用方，可以点击流量入口详情中，对应 API 操作一栏中的`授权`

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/8887142f-9377-4260-889b-820019e71519.png)

将 `example.erda.cloud/special` 配置成无需认证即可访问

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/96954ef0-101a-4c56-a738-2b65b80da9b1.png)
