# API 网关进阶一（API 策略） 

 API 具体策略配置通过流量入口进行配置，配置分为全局策略配置和具体 API 策略配置。

- 全局策略

  全局策略会对其下所有 API 生效。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/afb8977a-fc74-4df0-a52d-0c3683ec624d.png)

- 具体 API 策略配置

是对指定 API 进行配置策略，其影响范围只会在这个 API 内。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/5ebac677-8b32-438f-994d-349436ed570a.png)

在对 API 配置策略时，可以选择某个策略继承全局策略的配置，或者某个策略使用自己的独立配置：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/fdf62bca-89e5-435b-a1a4-6b7d096c6e30.png)

注意修改这个“使用全局策略”的开关后，会展现全局配置的内容，需要你确认后，提交配置才能生效

## 流量接收转发

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/e962266a-a052-4ece-bd15-9a3ffa5f3c26.png)

**一、强制跳转HTTPS**

这里的配置可以控制特定域名或特定 API，强制不跳转或者跳转 HTTPS。

:::tip

如果在 SLB 上进行了 HTTPS 强制跳转配置，则此处配置不会起作用

:::

**二、入口域名透传**

关闭策略或使用默认配置时，后端服务接收到请求中的 Host 头是创建 API 时填写的转发地址，客户端访问的入口域名可以通过 X-Forwarded-Host 这个请求头获取到；如果后端服务希望直接从 Host 头中拿到入口域名，可以开启入口域名透传这个配置

**三、请求/应答缓冲区**

关闭策略或使用默认配置时，网关会对客户端请求和后端应答分别设立缓冲区。

请求缓冲区的作用是接收完客户端完整的 HTTP 请求后，再转发给后端服务，这样在客户端网络上行速度慢时，可以避免跟后端服务建立长时间的连接，减少连接数带来的压力；应答缓冲区的作用是将后端返回的应答一次性接收完，在客户端网络下行速度慢时，同样避免跟后端服务建立长时间的连接。

若希望后端能立即接收到客户端的请求首字节，请关闭请求缓冲区；若希望客户端能立即接收到服务端的应答首字节 (TTFB 优化)，请关闭应答缓冲区。

**四、客户端请求限制**

当 HTTP 请求的 Body 大小超过此限制时，会返回 HTTP 413 Request Entity Too Large 的错误

**五、超时时间设置**

* 客户端请求超时：网关接收客户端请求的超时
* 客户端应答超时：网关向客户端发送应答的超时
* 后端建连超时：网关与后端服务建立连接的超时
* 后端请求超时：网关向后端服务发送请求的超时
* 后端应答超时：网关接收后端服务应答的超时

## 跨域访问

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/49d71d80-efbd-4c2e-b42f-87aa39d89a0f.png)

**配置项说明**

| 配置项           | 含义                                                         |
| ---------------- | ------------------------------------------------------------ |
| 允许的 HTTP 方法   | 作为跨域应答头 Access-Control-Allow-Methods 的值             |
| 允许的 HTTP 请求头 | 作为跨域应答头 Access-Control-Allow-Headers 的值，注意不能配置成通配符 '*'，有浏览器兼容性问题 |
| 允许的跨域地址   | 作为跨域应答头 Access-Control-Allow-Origin 的值              |
| 允许携带 cookie  | 是否设置跨域应答头 Access-Control-Allow-Credentials 为 true  |
| 预检请求缓存时间 | 作为跨域应答头 Access-Control-Max-Age 的值                   |

:::tip

允许的跨域地址给出了默认值：$from_request_origin_or_referer。这个变量的含义是，优先从请求头 Origin 中获取跨域地址，如果获取不到从请求头 Referer 中获取，如果仍然获取不到，则这个值是‘*’

允许的HTTP请求头给出了默认值：$http_access_control_request_headers。这个变量的含义是，取请求头Access-Control-Request-Headers 的值作为这个应答头的值

以上给出的默认值，可以方便业务解决跨域的问题，但属于安全性比较低的配置，对于生产环境，建议对 Access-Control-Allow-Origin 配置准确的域名，以避免跨域风险

:::

## 自定义 nginx 配置

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/129b8584-19cd-43c1-8973-906f5409a780.png)

**配置说明**

允许配置 nginx 所有 location 区块下的指令，详情请参考 [nginx 官方文档](http://nginx.org/en/docs/dirindex.html)

**示例一:  增加客户端的 HTTP 应答头**

```bash
add_header hello world;
```
添加这个配置后，客户端收到的 HTTP 应答头中会增加一项: hello:world

**示例二：增加给后端服务的 HTTP 请求头**

```bash
proxy_set_header hello world;
```
添加这个配置后，后端服务收到的 HTTP 请求头中会增加一项: hello:world

:::tip

对于自定义设置应答头，建议使用 more_set_headers 指令来代替 add_header，这个指令可以实现应答头的覆盖，而非追加。

配置方式: `more_set_headers  "hello: world";`

具体可以参考 [more_set_headers](https://github.com/openresty/headers-more-nginx-module#more_set_headers)

:::

## IP 拦截

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/41f70704-13ef-4a5f-a662-bf10d9a0e042.png)

**用户 IP 来源**

如果是客户端直连网关，或者 SLB 配置了 TCP 协议转发，使用对端 IP 地址即可识别用户 IP；如果 SLB 配置了 HTTP/HTTPS 协议转发，请选择从请求头 x-forwarded-for 中获取用户 IP。

**IP 黑白名单**

* 黑名单模式：对配置在 IP 列表框中的 IP，在访问时返回 403 状态码
* 白名单模式：对配置在 IP 列表框中的IP除外的所有 IP，在访问时返回 403 状态码

**CC防护**

针对用户 IP，计算每个 IP 的并发连接数和请求速率，当超过的时候返回 503 状态码；注意这里的请求速率是针对两个连续请求的间隔进行计算的，例如配置了10 请求/分钟，则如果两个请求间隔小于 6 秒，就会返回 503

## 服务负载保护

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/101dad99-2141-4e29-aeba-c4e351060170.png)

**吞吐和转发延时**

网关会按照配置的**服务最大吞吐**，对请求服务的流量去峰填谷，确保到达后端服务的请求速率在限定的吞吐内。

当网关接收到的请求超过吞吐速率时，网关会根据超过的程度计算惩罚延时，若惩罚延时小于**最大额外延时**，则增加惩罚延时后再将请求发送给服务；若惩罚延时超过**最大额外延时**，则立即拒绝请求。

**自定义状态码和应答**

当超过服务吞吐，网关会根据配置返回给客户端**拒绝状态码**和**拒绝应答**。

**拒绝状态码**非 3xx 时，**拒绝应答**会作为 http body 返回；**拒绝状态码**为 3xx 时，**拒绝应答**需要配置一个 http 地址，用于重定向被拒绝的请求。

一种较常用的方式是，设计一个对用户友好的"稍后重试"静态页面，放到 CDN 上，同时在这里配置**拒绝状态码**为 302，**拒绝应答**为该静态页面的 CDN 链接。

## 跨站防护 (csrf 校验)

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/2da9fd0a-28e9-4a35-bd1f-5c310003610e.png)

**防护机制**

**跨站攻击**示意图：

![csrf1](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/30/f8d7b58e-ca94-44dd-97b2-f07e4a5334c9.jpg)

用户在访问恶意站点时通过触发恶意脚本，可以在用户无感知的情况下，发起修改用户信息的请求，因为浏览器记录了用户 cookie，能顺利通过认证，实现恶意篡改

**跨站防护**示意图：

![csrf2](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2019/08/30/bb252336-b2cf-44d4-89be-92581ccd2d52.jpg)

在开启 API 网关的跨站防护功能后，会在用户登录成功后种下 csrf token，配合前端改造，对所有请求带上 csrf token；

网关在收到请求后，会对 csrf token 进行校验，确认是属于当前用户的 token，才会将请求正常转发给后端。

**配置说明**

| 配置项                 | 含义                                                         |
| ---------------------- | ------------------------------------------------------------ |
| 鉴别用户的 cookie 名称   | 用于生成 csrf-token，不带该 cookie 时不会进行 csrf 校验，后端识别该 cookie 过期时需要配合前端进行清除，避免缺失 csrf token 导致登录报错 |
| 关闭校验的 http 方法     | 对这些请求方法，将跳过 csrf 校验，但仍然会种下 csrf-token的cookie |
| token 的名称           | 网关将生成的 csrf token 设置到这个名称的 cookie 里，前端需要从 cookie 中获取 csrf token，带在同名请求头里发起请求 |
| token cookie 的生效域名 | 不填写时，只会针对发起请求的域名种下 csrf token 的 cookie    |
| cookie 开启 secure 属性  | 开启 secure 时，所有 http 请求都将无法通过 csrf 校验             |
| token 过期时间         | 过期的 token 将无法通过校验                                    |
| token 更新周期         | 请求携带 token 距离签发超过更新周期时，会进行重签              |
| 校验失败的状态码       | csrf 校验失败时返回的 HTTP 状态码                              |
| 校验失败的应答         | csrf 校验失败时返回的 HTTP 应答                                |




