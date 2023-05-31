# Erda MSE 网关路由策略

## MSE 网关概述
这里主要介绍基于 MSE 的 Erda API 网关的相关路由策略。

MSE 网关相比较 Erda 早期基于 Nginx-Kong 网关的路由策略，主要包含如下 6 种 网关路由策略（不支持 nginx 自定义配置策略）：
* 流量接收转发（proxy）
  * 降级处理
  * 仅支持设置 `强制跳转 HTTPS` 和设置 `后端请求超时`
* 跨域访问（cors）
  * 参数配置项完全兼容 基于 Nginx-Kong 的参数配置项
  * 但 `HTTP 请求头` 和 `跨域地址` 不能从原来的 Nginx-Kong 网关的环境变量读取，需要用户填写具体的值
* IP 拦截(ip)
  * 降级处理
  * 支持设置 `用户IP 来源` 、 `黑/白名单`、 `IP 黑白名单` 列表
* 服务负载保护（server_guard，限流）
  * 只支持设置 `最大吞吐量`、
  * `拒绝状态码` 显示为 503，用户不可设置
  * `拒绝应答` 显示 为 text/plain 内容  'local_rate_limited'， 用户不可设置 
  * 并发 burst 设置后端逻辑自动处理，对用户不可见（相当于基于 Nginx-Kong 网关下服务负载保护对应的 最大额外延时 对应产生的效果）
    * 采用限流数据越小，burst 参数越大的策略（限流本来应该就是避免流量太大）
      * tps > 1000 r/s, 设置为 1
      * tps > 100 r/s, 设置为 2
      * tps > 10 r/s, 设置为 3
      * 默认设置为 4   
* 跨站防护（CSRF 校验）
  * 降级处理, 不支持设置 `Token 更新周期`
  * 支持设置: 
    * `鉴别 cookie` 
    * `Secure 开关` 
    * `Token 名称` 
    * `Token 域名` 
    * `Token 过期时间` 
    * `失败状态码` 
    * `失败应答` 
    * `关闭校验`
    * `Token 更新周期`
* 基于第三方服务的访问控制 SBAC (Server Based Access Control)
  * 降级处理，不支持携带原始 Raw body 配置项（也就是默认都是不携带原始 Body，主要原因是基于 tinygo 开发的 MSE 插件不能进行 json 序列化和反序列化，由于对用户请求 body 的 json 格式化结果不可预知，因此即使采用硬编码实现序列化和反序列化的方式也是走不通的）
  * 其他配置项完全等同 Nginx-Kong 网关下的配置设置

下面主要介绍有差异的 5 个网关策略相关的说明。


## 流量接收转发

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/f09fab52-52a6-45c7-9a47-c3021c59aaff.png)

* **强制跳转 HTTPS**

  用于控制特定域名或特定 API，强制跳转或不跳转 HTTPS。

  :::tip 提示

  若已在 SLB 设置了 HTTPS 强制跳转，则此处配置不会生效。

  :::


* **超时时间设置**
  * 后端请求超时：网关向后端服务发送请求的超时。

**注意: 其他配置项 MSE 不支持**


## IP 拦截

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/7d7daea0-a433-4c79-99df-a2a6cb852e79.png)

* **用户 IP 来源**

支持 3 种 IP 来源设置:
* `对端 IP 地址`
* `请求头 x-forwarded-for`
* `请求头 x-real-ip`

若客户端直连网关，或者 SLB 配置了 TCP 协议转发，使用 `对端 IP 地址` 即可识别用户 IP；若 SLB 配置了 HTTP/HTTPS 协议转发，请选择从请求头 `x-forwarded-for` 中获取用户 IP。

* **IP 黑白名单**
  * 黑名单模式：用户 IP 在 访问列表中时 返回 403 状态码。
  * 白名单模式：用户 IP 不在 访问列表中时 返回 403 状态码。


**注意：MSE 网关不支持设置 最大并发和 请求限速，请通过 服务负载保护 策略设置**


## 服务负载保护

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/755fe840-7bf6-43eb-892c-733d610e5f0e.png)

* **最大吞吐**

  网关以毫秒为粒度衡量服务吞吐。例如最大吞吐为 10 次/秒，即表示每间隔 100 毫秒，仅能通过 1 个请求。若当前请求到达网关的时间距上一请求小于 100 毫秒，则网关将认为当前请求速率已超过服务的吞吐。



* **自定义状态码和应答**

  * MSE显示 '拒绝状态码'为 503，用户不可设置
  * MSE 显示 '拒绝应答' 为 text/plain 内容  'local_rate_limited',用户不可设置

* ** MSE 网关不支持设置 `最大额外延时`**
  * 并发 burst 设置后端逻辑自动处理，对用户不可见，采取默认策略
    - 采用限流数据越小，burst 参数越大的策略（限流本来应该就是避免流量太大）
    - tps > 1000 r/s, 设置为 1
    - tps > 100 r/s, 设置为 2
    - tps > 10 r/s, 设置为 3
    - 默认设置为 4

**注意: 负载保护的限流是策略限流，能达到限流的效果，但并不是完全精确的限流，无论是 Kong 网关的限流还是 MSE 网关的限流，目前均无法支持完全 100% 精确的限流效果**


## 跨站防护（CSRF 校验）

### 跨站防护（CSRF 校验）机制原理

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/fbea5df7-4ba3-48c1-8bbf-247901fd4cf6.png)

用户在访问恶意站点时会触发恶意脚本。跨站攻击能够在用户无感知的情况下，发起修改用户信息的请求。由于浏览器记录了用户 Cookie，该请求便可以顺利通过认证，进行恶意篡改。具体示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/30/f8d7b58e-ca94-44dd-97b2-f07e4a5334c9.jpg)

跨站防护开启后，会在用户登录成功时种下 CSRF Token，同时配合前端改造，对所有请求均带上 CSRF Token。网关收到请求后会对 CSRF Token 进行校验，确认属于当前用户后，才会将请求正常转发给后端。具体示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/30/bb252336-b2cf-44d4-89be-92581ccd2d52.jpg)

### 配置说明

| 配置项                 | 含义                                                         |
| :--------------------- | :----------------------------------------------------------- |
| 鉴别用户的 Cookie 名称 | 用于生成 CSRF Token，未携带该 Cookie 则不会进行 CSRF 校验，后端识别该 Cookie 过期时需配合前端进行清除，避免缺失 CSRF Token 导致登录报错 |
| 关闭校验的 HTTP 方法 | 对于这类请求方法，将跳过 CSRF 校验，但仍会种下 CSRF Token 的 Cookie |
| Token 名称       | 网关将生成的 CSRF Token 设置在该名称的 Cookie 里，前端需从 Cookie 中获取 CSRF Token，带在同名请求头里发起请求 |
| Token Cookie 的生效域名 | 如未填写，则仅针对发起请求的域名种下 CSRF Token 的 Cookie |
| Cookie 开启 Secure 属性 | 开启 Secure 后，所有 HTTP 请求均无法通过 CSRF 校验    |
| Token 过期时间     | 过期 Token 将无法通过校验                                |
| 校验失败的状态码   | CSRF 校验失败时返回的 HTTP 状态码                      |
| 校验失败的应答     | CSRF 校验失败时返回的 HTTP 应答                        |


### 使用说明

由于 MSE 网关 erda-csrf 插件是自定义开发，受限于框架 tinygo 的限制，在 MSE 网关 跨域防护 csrf 网关路由策略的情况下，用户的应用场景应当满足如下图所示的情况，核心要点是:
* 步骤 1（用户登录用户中心): 用户登录页的原始请求不带 鉴别用户的 Cookie ，登录页的请求返回中需要在 "Set-Cookie" 中设置 鉴别用户的 Cookie 名称 （如 `uc-token`) 及其对应的值;
* 步骤 2（MSE 网关，用户无需关心): MSE 网关 erda-csrf 插件根据登录页的返回，从返回的 "Set-Cookie" 中获取 鉴别用户的 Cookie  （如 `uc-token`)（ 如果获取不到，则默认设置 `uc-token` = `1ba855fcb59caa9d82370495d`），然后采用相关算法生成 csrf token, 将其作为 Token 名称 （如 `csrf-token`） 对应的值设置到返回的  "Set-Cookie" 中
* 步骤 3（用户访问业务详情）: 用户根据登录页返回的  "Set-Cookie" 中的 鉴别用户的 Cookie （如 `uc-token`)  和 Token 名称（如 `csrf-token`） 发起下一步请求。（如果用户的登录页返回的逻辑中不设置 鉴别用户的 Cookie （如 `uc-token`)，则默认设置 鉴别用户 Cookie  （如 `uc-token`) 为 `uc-token` = `1ba855fcb59caa9d82370495d`））


![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/30/bb252336-b2cf-44d4-89be-92581ccd2d52.jpg)


**注意**，登录用户中心的服务 和 后续请求的服务需要用户自己开发且满足请求返回的 header 和/或 cookie 设置，用户应当评估开启策略后 进行 token 生成和 token 校验 造成的开销。

#### 使用示例

假设登录页返回的  "Set-Cookie" 中的  鉴别用户 Cookie （如 `uc-token`) 为  和 Token 名称（如 `csrf-token`）分别为:
* uc-token=`1ba855fcb59caa9**********`
* csrf-token: `eyJhbGciOiJIUzI1NiIsInR5cC**********.**********J1cHN0cmVhbSIsImV4cCI6IjE2ODQ4MzU1ODgiLCJpYXQiOiIxNjg0ODMzNzg4IiwiaXNzIjoiRXJkYS1BUEktR2F0ZXdheSIsImp0aSI6IjFiYTg1NWZjYjU5Y2FhOWQ4MjM3MDQ5NWQiLCJuYmYiOiIxNjg0ODMzNzg4Iiwic3ViIjoiZnJvbnRlbmQifQ.afZWTG5s0b7l_-9e1-iYEe8W5xMEIC1kRgCSe607DZs`

则使用  鉴别用户 Cookie 和 Token 名称 分别在 Cookie 和 Header 中设置相关配置发起请求即可：
* uc-token 设置在 Cookie 中
* csrf-token 设置在 Header 中

##### 正常返回:

```bash
curl -v 'http://test-gateway.mse-daily.terminus.io/testmse/test/policy' \
    -H 'Cookie: uc-token=1ba855fcb59caa9*********; OPENAPISESSION=937ec28c-b3a7-4f64-95ad-4fa0e4e19ad3' \
    -H 'Csrf-Token: eyJhbGciOiJIUzI1NiIsInR5cC**********.**********J1cHN0cmVhbSIsImV4cCI6IjE2ODQ4MzU1ODgiLCJpYXQiOiIxNjg0ODMzNzg4IiwiaXNzIjoiRXJkYS1BUEktR2F0ZXdheSIsImp0aSI6IjFiYTg1NWZjYjU5Y2FhOWQ4MjM3MDQ5NWQiLCJuYmYiOiIxNjg0ODMzNzg4Iiwic3ViIjoiZnJvbnRlbmQifQ.afZWTG5s0b7l_-9e1-iYEe8W5xMEIC1kRgCSe607DZs' \
    --compressed \
    --insecure
*   Trying 116.62.243.103:80...
* Connected to test-gateway.mse-daily.terminus.io (116.62.243.103) port 80 (#0)
> GET /testmse/test/policy HTTP/1.1
> Host: test-gateway.mse-daily.terminus.io
> User-Agent: curl/7.79.1
> Accept: */*
> Accept-Encoding: deflate, gzip
> Cookie: uc-token=1ba855fcb59caa9d82370495d; OPENAPISESSION=937ec28c-b3a7-4f64-95ad-4fa0e4e19ad3
> Csrf-Token: eyJhbGciOiJIUzI1NiIsInR5cC**********.**********J1cHN0cmVhbSIsImV4cCI6IjE2ODQ4MzU1ODgiLCJpYXQiOiIxNjg0ODMzNzg4IiwiaXNzIjoiRXJkYS1BUEktR2F0ZXdheSIsImp0aSI6IjFiYTg1NWZjYjU5Y2FhOWQ4MjM3MDQ5NWQiLCJuYmYiOiIxNjg0ODMzNzg4Iiwic3ViIjoiZnJvbnRlbmQifQ.afZWTG5s0b7l_-9e1-iYEe8W5xMEIC1kRgCSe607DZs
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< server: istio-envoy
< date: Tue, 23 May 2023 09:23:39 GMT
< content-type: text/html
< content-length: 612
< last-modified: Tue, 16 Nov 2021 14:44:02 GMT
< etag: "6193c3b2-264"
< accept-ranges: bytes
< req-cost-time: 5
< req-arrive-time: 1684833819034
< resp-start-time: 1684833819040
< x-envoy-upstream-service-time: 4
< set-cookie: csrf-token=eyJhbGciOiJIUzI1NiIsInR5cC**********.**********J1cHN0cmVhbSIsImV4cCI6IjE2ODQ4MzU2MTkiLCJpYXQiOiIxNjg0ODMzODE5IiwiaXNzIjoiRXJkYS1BUEktR2F0ZXdheSIsImp0aSI6IjFiYTg1NWZjYjU5Y2FhOWQ4MjM3MDQ5NWQiLCJuYmYiOiIxNjg0ODMzODE5Iiwic3ViIjoiZnJvbnRlbmQifQ.2tIc_7DVIZ_pwq83CI63syU4mY_w5SPwl5Zlb9wxdjU; Path=/
< 
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

##### token 超期返回

csrf token 有效但超期 则返回 用户自定义的 校验失败应答（如: `{"message":"This form has expired. Please refresh and try again."}` ）
另外，在返回的 Header 中 x-error-message 一般详细说明了请求访问失败的原因

```bash
 curl -v 'http://test-gateway.mse-daily.terminus.io/testmse/test/policy' \
    -H 'Cookie: uc-token=1ba855fcb59caa9**********; OPENAPISESSION=937ec28c-b3a7-4f64-95ad-4fa0e4e19ad3' \
    -H 'Csrf-Token: eyJhbGciOiJIUzI1NiIsInR5cC**********.**********J1cHN0cmVhbSIsImV4cCI6IjE2ODQ4MzE5NzMiLCJpYXQiOiIxNjg0ODMwMTczIiwiaXNzIjoiRXJkYS1BUEktR2F0ZXdheSIsImp0aSI6IjFiYTg1NWZjYjU5Y2FhOWQ4MjM3MDQ5NWQiLCJuYmYiOiIxNjg0ODMwMTczIiwic3ViIjoiZnJvbnRlbmQifQ.yea0wLNSeOfMw67b3fSqmJdOQZMzg2rWOCj_VvxL9z4' \
    --compressed \
    --insecure
*   Trying 116.62.243.103:80...
* Connected to test-gateway.mse-daily.terminus.io (116.62.243.103) port 80 (#0)
> GET /testmse/test/policy HTTP/1.1
> Host: test-gateway.mse-daily.terminus.io
> User-Agent: curl/7.79.1
> Accept: */*
> Accept-Encoding: deflate, gzip
> Cookie: uc-token=1ba855fcb59caa9**********; OPENAPISESSION=937ec28c-b3a7-4f64-95ad-4fa0e4e19ad3
> Csrf-Token: eyJhbGciOiJIUzI1NiIsInR5cC**********.**********J1cHN0cmVhbSIsImV4cCI6IjE2ODQ4MzE5NzMiLCJpYXQiOiIxNjg0ODMwMTczIiwiaXNzIjoiRXJkYS1BUEktR2F0ZXdheSIsImp0aSI6IjFiYTg1NWZjYjU5Y2FhOWQ4MjM3MDQ5NWQiLCJuYmYiOiIxNjg0ODMwMTczIiwic3ViIjoiZnJvbnRlbmQifQ.yea0wLNSeOfMw67b3fSqmJdOQZMzg2rWOCj_VvxL9z4
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 403 Forbidden
< x-error-message: csrf-token is expired
< content-type: application/json; charset=utf-8
< content-length: 22
< set-cookie: csrf-token=eyJhbGciOiJIUzI1NiIsInR5cC**********.**********J1cHN0cmVhbSIsImV4cCI6IjE2ODQ4MzU1MjgiLCJpYXQiOiIxNjg0ODMzNzI4IiwiaXNzIjoiRXJkYS1BUEktR2F0ZXdheSIsImp0aSI6IjFiYTg1NWZjYjU5Y2FhOWQ4MjM3MDQ5NWQiLCJuYmYiOiIxNjg0ODMzNzI4Iiwic3ViIjoiZnJvbnRlbmQifQ.y4aa0pgoo8smy_XuBJWqTbBwTCfzCgJmKPd-2yMnLGM; Path=/
< date: Tue, 23 May 2023 09:22:08 GMT
< server: istio-envoy
< 
* Connection #0 to host test-gateway.mse-daily.terminus.io left intact
{"message":"This form has expired. Please refresh and try again."}%  
```

## 基于第三方服务的访问控制 SBAC (Server Based Access Control)

**基于第三方服务的访问控制** **SBAC (Server Based Access Control)** 是一种接口访问控制方式，启用该策略后，请求经过 API 网关时，API 网关会先携带参数请求用户提供的 API，根据该 API 返回结果决定是否准许该请求到达后端服务。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/05/31/265c6288-972a-4a25-9a59-ee260c06512e.png)

| 配置项                | 含义                                                             |
|:-------------------|:---------------------------------------------------------------|
| Access Control API | 用于访问控制的 API. 网关携带特定参数请求该 API，若返回非 2xx 响应，则拦截请求                 |
| HTTP 方法            | 要进行访问控制的方法，不填则对所有方法进行访问控制                                      |
| 匹配规则               | 正则表达式的列表，要请求的 path 若能匹配到任意一个正则表达式，就要进行访问控制。不填则默认对该 path 进行访问控制 |
| 携带请求头              | 网关请求访问控制服务 API 的请求体中要携带的原始请求头名称列表. '*' 表示携带所有请求头(最多 1000 个)    |
| 携带 Cookie          | 网关请求访问控制服务 API 的请求体中携带的请求头列表中包含 Cookie                         |

注意，Access Control 服务和 API 需要开发者自行实现，开发者应当评估开启策略后请求这个 API 造成的开销。
Access Control API 接口协议：

### 工作机制说明

sbac 策略的机制是: 网关接收到原始请求后，根据原始请求相关的 Path、Method 和 Headers 构建请求体 (如下的 AccessControlAPIRequest)，然后使用 POST 方法调用 Access Control API (如 `http://httpserver-ae04bf88cb.project-4717-test.svc.cluster.local:8080/`). 如果 POST Access Control API 返回的结果状态码是 2XX，则继续原始请求处理，否则拦截原始请求，并通过 Header X-Error-Messag 返回 POST Access Control API 请求的返回码。

```go
type AccessControlAPIRequest struct {
	Path    string              `json:"path"`     // 原始请求 URL 中的  path
	Method  string              `json:"method"`   // 原始请求 使用的 Http 方法
	Headers map[string][]string `json:"headers,omitempty"`  // 原始请求中的  Headers 中需要继续作为 Header 传递给 access control API 请求的
}
```

接口请求体示例:
```json
{
  "path": "/uniform/resource/identity?a=A&b=B",
  "method": "POST",
  "headers": {
    "Session-ID": [
      "xxx-yyy"
    ],
    "UC-Token": [
      "aaa-bbb",
      "aaa-ccc"
    ]
  }
}
```