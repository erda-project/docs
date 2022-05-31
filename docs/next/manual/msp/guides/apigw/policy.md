# API 策略

API 具体策略可通过流量入口进行配置，分为全局策略配置和具体 API 策略配置。

- 全局策略配置

  全局策略配置对所有 API 生效。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/1ab68433-66dc-43c4-8ef9-418bff992977.png)

- 具体 API 策略配置

  对指定 API 进行配置，策略仅对该 API 生效。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/683c8fe4-c1cf-46da-9d21-93db7d4c64b1.png)

配置 API 策略时，可以选择某个策略继承全局策略的配置，也可以选择使用自己的独立配置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/d37dd1e4-8139-4d86-b832-fecd1ac98d21.png)

::: tip 提示 开启 **使用全局策略** 后，页面将展示全局配置的内容，配置需确认并提交后方可生效。
:::

## 流量接收转发

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/f09fab52-52a6-45c7-9a47-c3021c59aaff.png)

* **强制跳转 HTTPS**

  用于控制特定域名或特定 API，强制跳转或不跳转 HTTPS。

  :::tip 提示

  若已在 SLB 设置了 HTTPS 强制跳转，则此处配置不会生效。

  :::

* **入口域名透传**

  关闭策略或使用默认配置时，后端服务接收到的请求 `Host` 头是创建 API 时填写的转发地址，客户端访问的入口域名可以通过 `X-Forwarded-Host` 请求头获取。

  若后端服务希望直接从 `Host` 头中获取入口域名，请开启 **入口域名透传**。

* **请求/应答缓冲区**

  开启策略或使用默认配置时，网关会分别为客户端请求和后端应答设立缓冲区。

  请求缓冲区的作用是接收到客户端完整的 HTTP 请求后，再转发给后端服务，从而在客户端网络上行速度慢时，避免和后端服务建立长时间的连接，减少连接数带来的压力。应答缓冲区则是将后端返回的应答一次性接收，当客户端网络下行速度慢时，同样可以避免和后端服务建立长时间的连接。

  若希望后端能立即接收到客户端的请求首字节，请关闭请求缓冲区。若希望客户端能立即接收到服务端的应答首字节（TTFB 优化），请关闭应答缓冲区。

* **客户端请求限制**

  当 HTTP 请求的 Body 大小超过限制时，会返回 HTTP 413 Request Entity Too Large 的错误。

* **超时时间设置**
    * 客户端请求超时：网关接收客户端请求的超时。
    * 客户端应答超时：网关向客户端发送应答的超时。
    * 后端建连超时：网关与后端服务建立连接的超时。
    * 后端请求超时：网关向后端服务发送请求的超时。
    * 后端应答超时：网关接收后端服务应答的超时。

## 跨域访问

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/484c05a4-f13a-444f-bba8-9082ed927472.png)

| 配置项           | 含义                                                         |
| :--------------- | :----------------------------------------------------------- |
| 允许的 HTTP 方法   | 作为跨域应答头 `Access-Control-Allow-Methods` 的值           |
| 允许的 HTTP 请求头 | 作为跨域应答头 `Access-Control-Allow-Headers` 的值（因浏览器兼容性问题，请勿配置为通配符 “*”） |
| 允许的跨域地址   | 作为跨域应答头 `Access-Control-Allow-Origin` 的值            |
| 允许携带 Cookie | 是否设置跨域应答头 `Access-Control-Allow-Credentials` 为 true |
| 预检请求缓存时间 | 作为跨域应答头 `Access-Control-Max-Age` 的值                 |

:::tip 提示

* 允许的跨域地址提供了默认值：`$from_request_origin_or_referer`。该变量代表优先从请求头 `Origin` 中获取跨域地址，若失败则从请求头 `Referer` 中获取，若仍失败则该值为 “*”。

* 允许的 HTTP 请求头提供了默认值：`$http_access_control_request_headers`。该变量代表取请求头 `Access-Control-Request-Headers` 的值作为应答头的值。

* 以上提供的默认值便于解决跨域的业务问题，但安全性较低。对于生产环境，建议为 `Access-Control-Allow-Origin` 配置准确的域名，以避免跨域风险。

:::

## 自定义 Nginx 配置

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/bd116c73-1acd-4d7b-9585-aa46a0808edf.png)

平台支持 Nginx 所有 Location 区块下的指令配置，具体请参见 [Nginx 官方文档](http://nginx.org/en/docs/dirindex.html)。

**示例一：增加客户端的 HTTP 应答头**

```bash
add_header hello world;
```

添加该配置后，客户端收到的 HTTP 应答头中会增加 `hello:world`。

**示例二：增加给后端服务的 HTTP 请求头**

```bash
proxy_set_header hello world;
```

添加该配置后，后端服务收到的 HTTP 请求头中会增加 `hello:world`。

:::tip 提示

* 对于自定义设置应答头，建议使用 `more_set_headers` 指令代替 `add_header`，实现应答头的覆盖，而非追加。

* 配置方式：`more_set_headers  "hello: world";`，具体请参见 [more_set_headers](https://github.com/openresty/headers-more-nginx-module#more_set_headers)。

:::

## IP 拦截

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/7d7daea0-a433-4c79-99df-a2a6cb852e79.png)

* **用户 IP 来源**

  若客户端直连网关，或者 SLB 配置了 TCP 协议转发，使用对端 IP 地址即可识别用户 IP；若 SLB 配置了 HTTP/HTTPS 协议转发，请选择从请求头 `x-forwarded-for` 中获取用户 IP。

* **IP 黑白名单**
    * 黑名单模式：访问列表中 IP 时返回 403 状态码。
    * 白名单模式：访问列表外 IP 时返回 403 状态码。

* **CC 防护**

  针对用户 IP，计算每个 IP 的并发连接数和请求速率，超过则返回 503 状态码。

  此处的请求速率针对两个连续请求的间隔来计算，例如配置了 10 请求/分钟，若两个请求间隔小于 6 秒则返回 503。

## 服务负载保护

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/755fe840-7bf6-43eb-892c-733d610e5f0e.png)

* **最大吞吐**

  网关以毫秒为粒度衡量服务吞吐。例如最大吞吐为 10 次/秒，即表示每间隔 100 毫秒，仅能通过 1 个请求。若当前请求到达网关的时间距上一请求小于 100 毫秒，则网关将认为当前请求速率已超过服务的吞吐。

* **最大额外延时**

  配置最大额外延时，可在网关判定请求速率超过吞吐时，不会立即拒绝请求，而是将请求放入一个排队队列，延后转发给后端服务，从而实现对流量的削峰填谷。

  请求实际延后转发的时间，取决于当前排队队列长度，配置的最大额外延时即决定了队列的最大长度。

  例如最大吞吐为 10 次/秒，最大额外延时为 500 毫秒，则实际队列长度为 10 * 0.5 = 5（次）。若在 100 毫秒内接连收到 7 个请求，因请求之间时间间隔均小于 100 毫秒，超过限定的吞吐速率，因此第 2～6 个请求均将进入排队队列，并依次添加 100 毫秒、200 毫秒、300 毫秒、400
  毫秒、500 毫秒的延时，此时队列已满，第 7 个请求将被直接拒绝访问。

  :::warning 警告

    1. 网关以毫秒为粒度计算吞吐、延时，因此若请求间隔小于 1 毫秒，即配置吞吐大于 1000 次/秒时，削峰填谷的计算会出现一定误差（给未超过最大吞吐的请求附加额外延时），可通过扩容网关节点降低误差，例如 10 个网关节点即可在 10000 次/秒的场景下确保削峰填谷的准确性。
    2. 最大额外延时决定队列的最大长度，队列最大长度决定支持的瞬时并发值大小。上述示例中队列长度为 5，导致 100 毫秒内收到的第 7 个请求被拒绝访问。若 1 秒内的请求均在 100 毫秒内瞬发到来，则实际上 1 秒内仅能通过 6 个请求，与配置的 10 次/秒的预期不一致。配置最大额外延时为 1
       秒，可确保网关的限流机制在任意场景下均可达到预期。
    3. 在 Erda 1.3 版本之后，若用户将最大额外延时配置为 0，则网关不会为超过最大吞吐速率的请求附加额外延时，并且将瞬时并发上限设置为与最大吞吐一致（保障用户预期）。此类设置可在对延时相对敏感的业务场景下使用。请注意此时的限流已无法对流量进行削峰填谷，瞬时并发也有将后端服务击穿的风险。

  :::

* **自定义状态码和应答**

  当网关接收到的请求速率超过吞吐速率时，网关将根据配置返回客户端拒绝状态码和拒绝应答。

  拒绝状态码非 3xx 时，拒绝应答将作为 HTTP Body 返回；拒绝状态码为 3xx 时，拒绝应答需配置一个 HTTP 地址，用于重定向被拒绝的请求。

  例如，设计一个对用户友好的"稍后重试"静态页面放在 CDN 上，同时配置拒绝状态码为 302，拒绝应答为该静态页面的 CDN 链接。

## 跨站防护（CSRF 校验）

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/fbea5df7-4ba3-48c1-8bbf-247901fd4cf6.png)

用户在访问恶意站点时会触发恶意脚本。跨站攻击能够在用户无感知的情况下，发起修改用户信息的请求。由于浏览器记录了用户 Cookie，该请求便可以顺利通过认证，进行恶意篡改。具体示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/30/f8d7b58e-ca94-44dd-97b2-f07e4a5334c9.jpg)

跨站防护开启后，会在用户登录成功时种下 CSRF Token，同时配合前端改造，对所有请求均带上 CSRF Token。网关收到请求后会对 CSRF Token 进行校验，确认属于当前用户后，才会将请求正常转发给后端。具体示意如下：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/30/bb252336-b2cf-44d4-89be-92581ccd2d52.jpg)

| 配置项                 | 含义                                                         |
| :--------------------- | :----------------------------------------------------------- |
| 鉴别用户的 Cookie 名称 | 用于生成 CSRF Token，未携带该 Cookie 则不会进行 CSRF 校验，后端识别该 Cookie 过期时需配合前端进行清除，避免缺失 CSRF Token 导致登录报错 |
| 关闭校验的 HTTP 方法 | 对于这类请求方法，将跳过 CSRF 校验，但仍会种下 CSRF Token 的 Cookie |
| Token 名称       | 网关将生成的 CSRF Token 设置在该名称的 Cookie 里，前端需从 Cookie 中获取 CSRF Token，带在同名请求头里发起请求 |
| Token Cookie 的生效域名 | 如未填写，则仅针对发起请求的域名种下 CSRF Token 的 Cookie |
| Cookie 开启 Secure 属性 | 开启 Secure 后，所有 HTTP 请求均无法通过 CSRF 校验    |
| Token 过期时间     | 过期 Token 将无法通过校验                                |
| Token 更新周期     | 请求携带 Token 签发时间超过更新周期时，将重新签发     |
| 校验失败的状态码   | CSRF 校验失败时返回的 HTTP 状态码                      |
| 校验失败的应答     | CSRF 校验失败时返回的 HTTP 应答                        |

## 基于第三方服务的访问控制 SBAC (Server Based Access Control)

**基于第三方服务的的访问控制** **SBAC (Server Based Access Control)** 是一种接口访问控制方式，启用该策略后，请求经过 API 网关时，API 网关会先携带参数请求用户提供的 API，根据该 API 返回结果决定是否准许该请求到达后端服务。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/05/31/265c6288-972a-4a25-9a59-ee260c06512e.png)

| 配置项                | 含义                                                             |
|:-------------------|:---------------------------------------------------------------|
| Access Control API | 用于访问控制的 API. 网关携带特定参数请求该 API，若返回非 2xx 响应，则拦截请求                 |
| HTTP 方法            | 要进行访问控制的方法，不填则对所有方法进行访问控制                                      |
| 匹配规则               | 正则表达式的列表，要请求的 path 若能匹配到任意一个正则表达式，就要进行访问控制。不填则默认对该 path 进行访问控制 |
| 携带请求头              | 网关请求访问控制服务 API 的请求体中要携带的原始请求头名称列表. '*' 表示携带所有请求头(最多 1000 个)    |
| 携带 Cookie          | 网关请求访问控制服务 API 的请求体中携带的请求头列表中包含 Cookie                         |
| 携带 Raw Body        | 网关请求访问控制服务 API 的请求体中携带原始的请求体                                   |

注意，Access Control 服务和 API 需要开发者自行实现，开发者应当评估开启策略后请求这个 API 造成的开销。
Access Control API 接口协议：
```yaml
openapi: 3.0.3
info:
  title: ServerBasedAccessControl
  description: |-
    ServerBasedAccessControl
    基于服务的访问控制
  version: 1.0.0
paths:
  "/{access-control-api}":
    parameters:
      - name: access-control-api
        in: path
        required: true
        schema:
          type: string
          example: /access-contorl
    post:
      tags:
        - sbac
      summary: |-
        Access Contorl
        访问控制
      requestBody:
        $ref: "#/components/requestBodies/AccessControlServer"
      responses:
        "200":
          description: |-
            successful operation if the response status code is 2xx
            响应码为 2xx 时表示请求成功
          content:
            "application/json":
              schema:
                type: object

components:
  requestBodies:
    AccessControlServer:
      content:
        "application/json":
          schema:
            type: object
            properties:
              "path":
                type: string
                description: |-
                  raw query.
                  原始请求路径, 包含 query.
                example: /api?a=A&b=B
              "method":
                type: string
                description: |-
                  http method in raw query. '*' means all headers(the max is 1000).
                  原始请求方法. '*' 表示所有请求头(最多 1000 个).
                example: GET
              "headers":
                type: object
                additionalProperties:
                  items:
                    type: array
                    items:
                      type: string
                description: |-
                  the headers you want to check, it's value is a String array.
                  要传递的请求头, 值是 String 类型二维数组.
                example: {"Session-ID": ["xxx-yyy"], "UC-Token": ["aaa-bbb", "aaa-ccc"]}
              "body":
                type: object
                description: |-
                  the raw body in the request.
                  要传递的原始请求体. 注意: 传递的是未经转义的原始请求体而非转义后的 String.
                example: {"key-1": value-1, "key-2": value-2}
            example: {"path": "/uniform/resource/identity?a=A&b=B", "method": "POST", "headers": {"Session-ID": ["xxx-yyy"], "UC-Token": ["aaa-bbb", "aaa-ccc"]}, "body": {"key-1": "value-1", "key-2": "value-2"}}
      required: true
```

接口请求体示例:
```json5
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
  },
  "body": {
    "key-1": "value-1",
    "key-2": "value-2"
  }
}
```