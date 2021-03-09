# API 网关进阶二（API 开放鉴权）


## 创建流量入口

想要做 API 的开放鉴权，创建流量入口时需要选择“面向合作伙伴开放 API ”这个场景

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/cd9bda74-e31e-4c1d-9efd-99dc86bb08e3.png)

调用方认证方式可以选择：
* key 认证：通过请求参数中的 appKey 字段，或者请求头中的 X-App-Key 来识别调用方
* hmac 签名认证：使用 hmac 对请求行、请求头、请求 body 进行加密，具备较高的安全性，因为根据 HTTP 签名算法标准草案设计，也具备一定的通用性，推荐使用([签名算法细节](./sign-auth.md#hmac-签名认证-推荐))
* 参数签名认证：通过请求参数中的 appKey 字段来识别调用方，同时使用对参数进行签名的 sign 字段进行校验([签名算法细节](./sign-auth.md#参数签名认证))
* OAuth2 认证：基于 OAuth2 Client Credentials 模式，通过动态 Token 识别调用方，调用方可以借助类似 Spring Cloud Security 之类的库实现

调用方访问条件可以选择：
* 认证通过：只要携带的调用凭证正确，能被识别出，即可访问
* 认证通过 + 授权许可：需要额外针对调用方授权后，对应调用方才可以访问

## 调用者授权

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/82342c0b-16c0-42b0-97c3-389a56cadd18.png)

如果调用方访问条件选择了“认证通过 + 授权许可”，则需要进行调用者授权。授权调用方可以在创建流量入口的步骤中进行，也可以在创建完成之后，编辑流量入口时进行。

## 调用量控制

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/96632b46-3fa9-4191-aaec-392b5d8d124c.png)

调用量控制可以在创建流量入口的步骤中进行，也可以在创建完成之后，编辑流量入口时进行。

## 调用方凭证管理

点击操作列表中的“凭证”


![c2](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/0be4a024-9a3b-4273-a8f1-4726033d1b2e.png)

分别对应流量入口中可配置的三种认证方式，调用方要根据流量入口的认证方式，选择正确的凭证

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/f805fca0-d3aa-4283-9acc-6a6175a8e268.png)


