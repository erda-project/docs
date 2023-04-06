# 基于 MSE 网关的  API 开放鉴权

## 流量入口管理

### 创建流量入口

如需开放 API 鉴权，创建流量入口时需选择 **面向合作伙伴开放 API** 场景。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/5ac9fdae-9494-43e5-9399-2f61b3c2bde4.png)

**调用方认证方式**

* **Key 认证**：通过请求参数中的 `appKey` 字段，或请求头中的 `X-App-Key` 识别调用方。
* **HMAC 签名认证**：使用 HMAC 对请求行、请求头、请求 Body 进行加密，具备较高的安全性，因根据 HTTP 签名算法标准草案设计，同时具备一定的通用性，具体请参见 [HMAC 签名认证](./mse_auth.md#hmac-签名认证-推荐)。
* **参数签名认证**：通过请求参数中的 `appKey` 字段识别调用方，同时通过对参数进行签名的 `sign` 字段完成校验，具体请参见 [参数签名认证](./mse_auth.md#参数签名认证)。


**调用方访问条件**

* **认证通过 + 授权许可**：需额外针对调用方授权后，对应调用方才可访问。

### 调用者授权

若调用方访问条件选择 **认证通过 + 授权许可**，则需进行调用者授权。

您可以在创建流量入口时完成调用者授权，也可以在后续通过流量入口编辑操作完成。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/520a9eae-ea46-43fe-a0fe-e6ac5a8900d8.png)

### 调用量控制

您可以在创建流量入口时完成调用量控制，也可以在后续通过流量入口编辑操作完成。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/a954e069-0188-463c-b126-ab47c33a2f1e.png)

## 调用方凭证管理

选择对应调用方后，点击 **凭证**。


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/febb1840-5479-4595-beec-493bc55f107e.png)

调用方需根据流量入口的认证方式，选择正确的凭证。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/df953d25-5378-4125-9374-75e4cc49a8d8.png)

## 签名认证方式使用引导


### Key-Auth 认证 

`key-auth` 插件实现了基于 API Key 进行认证鉴权的功能，支持从 HTTP 请求的 URL 参数或者请求头解析 API Key，同时验证该 API Key 是否有权限访问。

#### 使用引导 

通过请求参数中的 appKey 字段，或请求头中的 X-App-Key 识别调用方。假如， appKey 为 `5575742f92814e23892fe53348dffb1d`

* 从 HTTP 请求的 URL 参数 

```bash
curl -v -XGET  'http://key-auth-mse.mse-test.terminus.io/test-mse/key-auth?appKey=5575742f92814e23892fe53348dffb1d'
```

* HTTP 请求的请求头解析 API Key
```bash
curl -v -XGET  -H "X-App-Key:5575742f92814e23892fe53348dffb1d"  http://key-auth-mse.mse-test.terminus.io/test-mse/key-auth
```


### HMAC 签名认证（推荐）

#### 功能说明

`hmac-auth` 插件实现了基于 HMAC 算法为 HTTP 请求生成不可伪造的签名，并基于签名实现身份认证和鉴权


#### 配置字段

备注: **此部分为插件开发、运维人员需要关注的内容**。使用者仅需关注 《签名机制说明》部分。

| 名称         | 数据类型                                  | 填写要求   | 默认值 | 描述  |
|------------|---------------------------------------|--------|-----|-----|
| consumers  | array of object                       | 必填 |   -  |   配置服务的调用者，用于对请求进行认证  |
| date_offset | number |     选填   |   300  |  配置允许的客户端最大时间偏移，单位为秒，未配置时，不做校验   |
| _rules_     | array of object                |    选填   |  -   |   配置特定路由或域名的访问权限列表，用于对请求进行鉴权  |


`consumers` 中每一项的配置字段说明如下：

| 名称         | 数据类型                                  | 填写要求   | 默认值 | 描述                    |
|------------|---------------------------------------|--------|-----|-----------------------|
| key        | string                                 | 选填  | - | 调用方凭证信息中的  App Key    |
| secret     | string                                 | 必填  | - | 调用方凭证信息中的  App Secret |
| name       | string                                 | 必填  | - | 配置该 consumer 的名称      |

`_rules_` 中每一项的配置字段说明如下：

| 名称         | 数据类型              | 填写要求   | 默认值 | 描述                              |
|------------|-------------------|--------|-----|---------------------------------|
| _match_route_  | array of string   | 选填，`_match_route_`，`_match_domain_`中选填一项  | - | 配置要匹配的路由名称                      |
| _match_domain_ | array of string   | 选填，`_match_route_`，`_match_domain_`中选填一项  | - | 配置要匹配的域名                        |
| allow          | array of string   | 必填  | - | 对于符合匹配条件的请求，配置允许访问的 consumer 名称 |

注意：
* 需要 `_rules_` 字段，且建议使用 `_match_route_` 规则配置。 如不配置  `_rules_` 字段会影响全局路由，对于 Erda 这种平台上多用户多项目的情况，全局配置场景不适用。
* 对于通过认证鉴权的请求，请求的 header 会被添加一个 `X-Mse-Consumer` 字段，用以标识调用者的名称。

#### 配置示例

以下配置将对网关特定路由或域名开启 Hmac Auth 认证和鉴权，注意 `key` 字段不能重复

对特定路由或域名开启

```yaml
consumers:
- key: appKey-example-1
  secret: appSecret-example-1
  name: consumer-1
- key: appKey-example-2
  secret: appSecret-example-2
  name: consumer-2
# 使用 _rules_ 字段进行细粒度规则配置
_rules_:
# 规则一：按路由名称匹配生效
- _match_route_:
  - route-a
  - route-b
  allow:
  - consumer-1
# 规则二：按域名匹配生效
- _match_domain_:
  - "*.example.com"
  - test.com
  allow:
  - consumer-2
```

每条匹配规则下的 `allow` 字段用于指定该匹配条件下允许访问的调用者列表；

此例 `_match_route_` 中指定的 `route-a` 和 `route-b` 即在创建网关路由时填写的路由名称，当匹配到这两个路由时，将允许 `name` 为 `consumer-1` 的调用者访问，其他调用者不允许访问；

此例 `_match_domain_` 中指定的 `*.example.com` 和 `test.com` 用于匹配请求的域名，当发现域名匹配时，将允许 `name` 为 `consumer-2` 的调用者访问，其他调用者不允许访问；

认证成功后，请求的header中会被添加一个 `X-Mse-Consumer` 字段，其值为调用方的名称，例如 `consumer-1`。

网关实例级别开启
以下配置将对网关实例级别开启 Hamc Auth 认证

```yaml
consumers:
- key: appKey-example-1
  secret: appSecret-example-1
  name: consumer-1
- key: appKey-example-2
  secret: appSecret-example-2
  name: consumer-2
```

#### 签名机制说明

##### 配置准备

如上所述，在插件配置中配置生成和验证签名需要用的凭证配置
* key: 用于请求头 x-ca-key 中设置
* secret: 用于生成请求签名

##### 客户端签名生成方式

客户端生成签名一共分三步处理：
1. 从原始请求中提取关键数据，得到一个用来签名的字符串
2. 使用加密算法和配置的 secret 对关键数据签名串进行加密处理，得到签名
3. 将签名所相关的所有头加入到原始HTTP请求中，得到最终HTTP请求

如下图所示:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2023/04/06/mse-hmac-auth.png)

##### 签名串提取流程

客户端需要从 Http 请求中提取出关键数据，组合成一个签名串，生成的签名串的格式如下：

```
HTTPMethod
Accept
Content-MD5
Content-Type
Date
Headers
PathAndParameters
```

以上 7 个字段构成整个签名串，字段之间使用 `\n` 间隔，如果 `Headers` 为空，则不需要加 `\n`，其他字段如果为空都需要保留 `\n`。签名大小写敏感。下面介绍下每个字段的提取规则：
* HTTPMethod：HTTP 的方法，全部大写，比如POST
* Accept：请求中的 `Accept`头的值，可为空。建议显式设置 Accept Header。当 `Accept` 为空时，部分 Http 客户端会给 `Accept` 设置默认值为 `*/*`，导致签名校验失败。
* Content-MD5：请求中的 `Content-MD5` 头的值，可为空, 只有在请求存在 Body 且 Body 为非 Form 形式时才计算 `Content-MD5` 头，下面是 Content-MD5 值的参考计算方式：
  * Java
  ```java
  String content-MD5 = Base64.encodeBase64(MD5(bodyStream.getbytes("UTF-8")));
  ```

  * Golang
  ```go
  func getBodyContentMD5(r *http.Request) (string, error) {
    body, err := r.GetBody()
       if err != nil {
          return "", err
      }
      // read body
      data, err := ioutil.ReadAll(body)
      if err != nil {
          return "", err
    }

    // 实现对请求 Body 的摘要算法
    // 注意：计算签名时，要从 binary 以 Base64 方法编码为 string
    h := md5.New()
    if _, err := h.Write(data); err != nil {
      return "", err
    }
    return base64.StdEncoding.EncodeToString(h.Sum(nil)), nil
  }
  ```

* Content-Type：请求中的 `Content-Type` 头的值，可为空
* Date：请求中的 `Date` 头的值，当未开启 `date_offset` 配置时，可为空，否则将用于时间偏移校验
* Headers：用户可以选取指定的 header 参与签名，关于 header 的签名串拼接方式有以下规则：
    * 参与签名计算的Header的Key按照字典排序后使用如下方式拼接
  ```
  HeaderKey1 + ":" + HeaderValue1 + "\n"\+
  HeaderKey2 + ":" + HeaderValue2 + "\n"\+
  ...
  HeaderKeyN + ":" + HeaderValueN + "\n"
  ```  
  * 某个 Header 的 Value 为空，则使用 HeaderKey+":"+"\n" 参与签名，需要保留 Key 和英文冒号
  * 所有参与签名的 Header 的 Key 的集合使用英文逗号分割放到 Key 为 `X-Ca-Signature-Headers` 的 Header 中
  * 以下 Header 不参与 Header 签名计算：`X-Ca-Signature`、`X-Ca-Signature-Headers`、`Accept`、`Content-MD5`、`Content-Type`、`Date`

* PathAndParameters: 这个字段包含 Path，Query 和 Form 中的所有参数，具体组织形式如下
```
Path + "?" + Key1 + "=" + Value1 + "&" + Key2 + "=" + Value2 + ... "&" + KeyN + "=" + ValueN
```

注意：
1. Query 和 Form 参数对的 Key 按照字典排序后使用上面的方式拼接
2. Query 和 Form 参数为空时，则直接使用 Path，不需要添加 `?`
3. 参数的 Value 为空时只保留 Key 参与签名，等号不需要再加入签名
4. Query 和 Form 存在数组参数时（key 相同，value 不同的参数） ，取第一个 Value 参与签名计算

##### 签名串提取示例

初始的HTTP请求：

```
POST /http2test/test?param1=test HTTP/1.1
host:api.aliyun.com
accept:application/json; charset=utf-8
ca_version:1
content-type:application/x-www-form-urlencoded; charset=utf-8
x-ca-timestamp:1525872629832
date:Wed, 09 May 2018 13:30:29 GMT+00:00
user-agent:ALIYUN-ANDROID-DEMO
x-ca-nonce:c9f15cbf-f4ac-4a6c-b54d-f51abf4b5b44
content-length:33
username=xiaoming&password=123456789
```

生成的正确签名串为：

```
POST
application/json; charset=utf-8

application/x-www-form-urlencoded; charset=utf-8
Wed, 09 May 2018 13:30:29 GMT+00:00
x-ca-key:203753385
x-ca-nonce:c9f15cbf-f4ac-4a6c-b54d-f51abf4b5b44
x-ca-signature-method:HmacSHA256
x-ca-timestamp:1525872629832
/http2test/test?param1=test&password=123456789&username=xiaoming
```

##### 签名计算流程
客户端从 HTTP 请求中提取出关键数据组装成签名串后，需要对签名串进行加密及编码处理，形成最终的签名
具体的加密形式如下，其中 `stringToSign` 是提取出来的签名串，`secret` 就是插件配置中填写的，`sign` 是最终生成的签名：
* Java 
```java
Mac hmacSha256 = Mac.getInstance("HmacSHA256");
byte[] secretBytes = secret.getBytes("UTF-8");
hmacSha256.init(new SecretKeySpec(secretBytes, 0, secretBytes.length, "HmacSHA256"));
byte[] result = hmacSha256.doFinal(stringToSign.getBytes("UTF-8"));
String sign = Base64.encodeBase64String(result);
```
* Golang 
```go
  appSec = "0efc182dea9245e996b5825abbf89374"
  h := hmac.New(sha256.New, []byte(appSecret))
  if _, err := h.Write([]byte(signString)); err != nil {
	  return signString, "", err
  }
  sign = base64.StdEncoding.EncodeToString(h.Sum(nil))
```

总结一下，就是将 stringToSign 使用 UTF-8 解码后得到 Byte 数组，然后使用加密算法对 Byte 数组进行加密，然后使用 Base64 算法进行编码，形成最终的签名。

##### 添加签名流程

客户端需要将以下四个 Header 放在 HTTP 请求中传输给 API 网关，进行签名校验：
* x-ca-key：取值 APP Key，必选
* x-ca-signature-method：签名算法，取值 HmacSHA256 或者 HmacSHA1，可选，默认值为 HmacSHA256
* x-ca-signature-headers：所有签名头的 Key 的集合，使用英文逗号分隔，可选
* x-ca-signature：签名，必选

下面是携带签名的整个HTTP请求的示例：

```
POST /http2test/test?param1=test HTTP/1.1
host:api.aliyun.com
accept:application/json; charset=utf-8
ca_version:1
content-type:application/x-www-form-urlencoded; charset=utf-8
x-ca-timestamp:1525872629832
date:Wed, 09 May 2018 13:30:29 GMT+00:00
user-agent:ALIYUN-ANDROID-DEMO
x-ca-nonce:c9f15cbf-f4ac-4a6c-b54d-f51abf4b5b44
x-ca-key:203753385
x-ca-signature-method:HmacSHA256
x-ca-signature-headers:x-ca-timestamp,x-ca-key,x-ca-nonce,x-ca-signature-method
x-ca-signature:xfX+bZxY2yl7EB/qdoDy9v/uscw3Nnj1pgoU+Bm6xdM=
content-length:33
username=xiaoming&password=123456789
```

##### 服务端签名验证方式 
备注: **此部分对作为调用方的客户端用户仅需了解即可** 

服务器验证客户端签名一共分四步处理：
* 从接收到的请求中提取关键数据，得到一个用来签名的字符串
* 从接收到的请求中读取 key ，通过 key 查询到对应的 secret
* 使用加密算法和 secret 对关键数据签名串进行加密处理，得到签名
* 从接收到的请求中读取客户端签名，对比服务器端签名和客户端签名的一致性

##### 签名排错方法
网关签名校验失败时，会将服务端的签名串（StringToSign）放到 HTTP Response 的Header中返回到客户端，Key为：`X-Ca-Error-Message`，用户只需要将本地计算的签名串（StringToSign）与服务端返回的签名串进行对比即可找到问题；

如果服务端与客户端的 StringToSign 一致请检查用于签名计算的 APP Secret 是否正确；

因为 HTTP Header 中无法表示换行，因此 StringToSign 中的换行符都被替换成#，如下所示：

```
X-Ca-Error-Message:  Server StringToSign:`GET#application/json##application/json##X-Ca-Key:200000#X-Ca-Timestamp:1589458000000#/app/v1/config/keys?keys=TEST`
```

#### 相关错误码


| HTTP 状态码 | 出错信息                 | 原因说明  |
|------------|-------------------------|--------|
| 401 | Invalid Key | 请求头未提供 x-ca-key，或者 x-ca-key 无效 |
| 401 | Empty Signature | 请求头未提供 x-ca-signature 签名串 |
| 400 | Invalid Signature | 请求头 x-ca-signature 签名串，与服务端计算得到签名不一致 |
| 400 | Invalid Content-MD5 | 请求头 content-md5 不正确 |
| 400 | Invalid Date | 根据请求头 date 计算时间偏移超过配置的 date_offset |
| 413 | Request Body Too Large | 请求 Body 超过限制大小：32 MB|
| 413 | Payload Too Large | 请求 Body 超过全局配置 DownstreamConnectionBufferLimits，请在参数配置页调高此项|
| 403 | Unauthorized Consumer | 请求的调用方无访问权限 |

注意谨慎调高 `DownstreamConnectionBufferLimits` 此参数配置，调高后网关内存使用将有显著增加。



#### 代码示例：Go 语言实现带 Body 的请求客户端 HMAC 认证

该示例包含计算各必要参数和发起 HTTP 请求的完整代码。

```go
package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/md5"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

func main() {
	const (
		body   = `{"name": "bob"}`
		appKey = "ac62e20d0c814bb0b5a0652747012e40"
		appSec = "0efc182dea9245e996b5825abbf89374"
		host   = "http://hmac-auth-mse.mse-daily.terminus.io"
		uri    = "/test-mse/hmac-auth"
	)

	request, err := http.NewRequest(http.MethodGet, host+uri, bytes.NewBufferString(body))
	if err != nil {
		log.Fatalf("failed to NewRequest: %v", err)
	}
	if err = hmacRequest(request, appKey, appSec); err != nil {
		log.Fatalf("failed to hmacRequest: %v", err)
	}
	response, err := http.DefaultClient.Do(request)
	if err != nil {
		log.Fatalf("failed to Do: %v", err)
	}
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatalf("failed to ReadAll: %v", err)
	}
	fmt.Printf("response Header X-Ca-Error-Message=%s", response.Header.Get("X-Ca-Error-Message"))
	fmt.Printf("response body: %s", string(data))
}

func dateInfo() (string, string, error) {
	tTime := time.Now()
	tTime.UnixMilli()
	fmt.Printf("tTime = %d\n", tTime.UnixMilli())
	fmt.Printf("tTime Format= [%s]\n", tTime.Format(time.RFC1123))
	timeStamp := fmt.Sprintf("%d", tTime.UnixMilli())
	return tTime.Format(time.RFC1123), timeStamp, nil
}

// bodyMD5Content 实现对 Body 的摘要算法
// 注意：计算签名时，要从 binary 以 Base64 方法编码为 string
func bodyMD5Content(data []byte) (string, error) {
	h := md5.New()
	if _, err := h.Write(data); err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(h.Sum(nil)), nil
}

// signature 根据给定的 签名串的格式 生成 签名串 和 签名结果
func signature(HTTPMethod, Accept, ContentMD5, ContentType, Date, appKey, timestamp, appSecret string, data []byte) (signString, sign string, err error) {
	appKey = "ac62e20d0c814bb0b5a0652747012e4x"
	signString = fmt.Sprintf("%s\n"+
		"%s\n"+
		"%s\n"+
		"%s\n"+
		"%s\n"+
		"x-ca-key:%s\n"+
		"x-ca-signature-method:HmacSHA256\n"+
		"x-ca-timestamp:%s\n"+
		"/test-mse/hmac-auth?%s=", HTTPMethod, Accept, ContentMD5, ContentType, Date, appKey, timestamp, string(data))

	h := hmac.New(sha256.New, []byte(appSecret))
	if _, err := h.Write([]byte(signString)); err != nil {
		return signString, "", err
	}
	sign = base64.StdEncoding.EncodeToString(h.Sum(nil))
	return signString, sign, nil
}

// hmacRequest 将计算出的 date, digest, signature 等放入 *http.Request 的 headers
func hmacRequest(r *http.Request, appKey, appSecret string) error {

	body, err := r.GetBody()
	if err != nil {
		return err
	}
	// read body
	data, err := ioutil.ReadAll(body)
	if err != nil {
		return err
	}

	// make digest
	digest, err := bodyMD5Content(data)
	if err != nil {
		return err
	}
	fmt.Printf("digest: %s\n", digest)

	_, timestamp, err := dateInfo()
	if err != nil {
		return err
	}
	fmt.Printf("date timestamp: %s\n", timestamp)

	// set headers
	r.Header.Set("accept", "application/json; charset=utf-8")
	r.Header.Set("content-type", "application/x-www-form-urlencoded; charset=utf-8")
	r.Header.Set("content-md5", digest)
	r.Header.Set("x-ca-timestamp", timestamp)
	r.Header.Set("x-ca-key", appKey)

	// make signature
	signString, sign, err := signature("GET", "application/json; charset=utf-8", digest, "application/x-www-form-urlencoded; charset=utf-8", "", appKey, timestamp, appSecret, data)
	if err != nil {
		log.Fatalf("failed to sinature: %v", err)
	}

	fmt.Printf("request signString=%s\n", signString)
	fmt.Printf("request sign=%s\n", sign)

	// set signature headers
	r.Header.Set("x-ca-signature-method", "HmacSHA256")
	r.Header.Set("x-ca-signature-headers", "x-ca-timestamp,x-ca-key,x-ca-signature-method")
	r.Header.Set("x-ca-signature", sign)

	return nil
}
```


### 参数签名认证

`para-sign-auth` 插件实现了基于请求参数的签名认证。

所有参数（包括 `appKey`，但不包括签名参数 `sign` 自身）均按照字符序增序排列，随后在排列的参数串末尾加上 `appSecret`，对完整字符串进行 SHA512 签名，生成签名参数 `sign`。


#### 配置字段  

备注: **此部分为插件开发、运维人员需要关注的内容**。使用者仅需关注 《签名机制说明》部分。

| 名称         | 数据类型                                  | 填写要求   | 默认值 | 描述  |
|------------|---------------------------------------|--------|-----|-----|
| consumers  | array of object                       | 必填 |   -  |   配置服务的调用者，用于对请求进行认证  |
| date_offset | number |     选填   |   300  |  配置允许的客户端最大时间偏移，单位为秒，未配置时，不做校验   |
| request_body_size_limit | number |     选填   |   10485760  |  配置允许的请求 Body 的大小，默认 10mb   |
| _rules_     | array of object                |    选填   |  -   |   配置特定路由或域名的访问权限列表，用于对请求进行鉴权  |


`consumers` 中每一项的配置字段说明如下：

| 名称         | 数据类型                                  | 填写要求   | 默认值 | 描述  |
|------------|---------------------------------------|--------|-----|-----|
| key        | string                                 | 选填  | - | 配置从请求的x-ca-key头中提取的key  |
| secret     | string                                 | 必填  | - | 配置用于生成签名的secret  |
| name       | string                                 | 必填  | - | 配置该consumer的名称  |

`_rules_` 中每一项的配置字段说明如下：

| 名称         | 数据类型              | 填写要求   | 默认值 | 描述  |
|------------|-------------------|--------|-----|-----|
| _match_route_  | array of string   | 选填，`_match_route_`，`_match_domain_`中选填一项  | - | 配置要匹配的路由名称  |
| _match_domain_ | array of string   | 选填，`_match_route_`，`_match_domain_`中选填一项  | - | 配置要匹配的域名  |
| allow          | array of string   | 必填  | - | 对于符合匹配条件的请求，配置允许访问的consumer名称  |

注意：
* 需要 `_rules_` 字段，且建议使用 `_match_route_` 规则配置。 如不配置  `_rules_` 字段会影响全局路由，对于 Erda 这种平台上多用户多项目的情况，全局配置场景不适用。
* 对于通过认证鉴权的请求，请求的 header 会被添加一个 `X-Mse-Consumer` 字段，用以标识调用者的名称。

#### 配置示例

以下配置将对网关特定路由或域名开启 Para Sign Auth 认证和鉴权，注意 `secret` 字段不能重复

对特定路由或域名开启

```yaml
consumers: 
- key: appKey-example-1
  secret: appSecret-example-1
  name: consumer-1
- key: appKey-example-2
  secret: appSecret-example-2
  name: consumer-2
request_body_size_limit: 10485760
date_offset: 300
# 使用 _rules_ 字段进行细粒度规则配置
_rules_:
# 按路由名称匹配生效
- _match_route_:
  - route-a
  - route-b
  allow:
  - consumer-1
```

每条匹配规则下的 `allow` 字段用于指定该匹配条件下允许访问的调用者列表；

此例 `_match_route_` 中指定的 `route-a` 和 `route-b` 即在创建网关路由时填写的路由名称，当匹配到这两个路由时，将允许 `name` 为 `consumer-1` 的调用者访问，其他调用者不允许访问；

认证成功后，请求的 `header` 中会被添加一个 `X-Mse-Consumer` 字段，其值为调用方的名称，例如 `consumer-1`。

网关实例级别开启
以下配置将对网关实例级别开启 Para Sign Auth 认证

```yaml
consumers: 
- key: appKey-example-1
  secret: appSecret-example-1
  name: consumer-1
- key: appKey-example-2
  secret: appSecret-example-2
  name: consumer-2
request_body_size_limit: 10485760
date_offset: 300
```


#### 签名机制说明

##### 基于 URL 参数的签名

例如，调用参数为：

```js
/api?appKey=foobar&name=dadu&abc=123
```

参数名按照字母序升序排列，得到：

```
abc=123&appKey=foobar&name=dadu
```

假设调用凭证中的 App Secret 为 `5c0abe2a37ae419191c61fdf75cc30d3`，并将其附加到参数末尾，得到：

```
abc=123&appKey=foobar&name=dadu5c0abe2a37ae419191c61fdf75cc30d3
```

计算该字符串的 SHA512，得到签名值为：

```
1f18cb6f4cabfb7cc7b359582c2ffbb4c13e446c85826c9be48898ad0c503b4bac1f6672c0de2e7dba58dbafe9f908a5b133858ab1d50dec5608bbb25975a9de
```

结合 Secret 最终得到请求为：

```bash
-H "X-Ca-Secret:5c0abe2a37ae419191c61fdf75cc30d3"  /api?appKey=foobar&name=dadu&abc=123&sign=1f18cb6f4cabfb7cc7b359582c2ffbb4c13e446c85826c9be48898ad0c503b4bac1f6672c0de2e7dba58dbafe9f908a5b133858ab1d50dec5608bbb25975a9de
```


##### 带 Body 的基于 URL 参数的签名

对于 Post 等带有 Body 的请求，将对 Body 结合 URL 参数进行签名。

例如，原始请求为：

```sh
POST --header 'Content-Type: application/json'  /api?appKey=foobar&name=dadu&abc=123 
-d '
{"name": "bob"}
'
```

将 Body 整体 MD5 编码得到：

```
j6rnb8MCtCWr8lHZC7dbEg==
```

将 Body 对应的 MD5编码 作为 Header

```bash
 -H "Content-MD5:j6rnb8MCtCWr8lHZC7dbEg==" 
```

同时将  Body 整体 MD5 编码 的值 `j6rnb8MCtCWr8lHZC7dbEg==` 作为 data 加入到 url 参数中

```js
/api?appKey=foobar&name=dadu&abc=123&data=j6rnb8MCtCWr8lHZC7dbEg== 
```

参数名按照字母序升序排列，得到：

```
abc=123&appKey=foobar&data=j6rnb8MCtCWr8lHZC7dbEg==&name=dadu
```

假设调用凭证中的 App Secret 为 `5c0abe2a37ae419191c61fdf75cc30d3`，并将其附加到参数末尾，得到：

```
abc=123&appKey=foobar&data=j6rnb8MCtCWr8lHZC7dbEg==&name=dadu5c0abe2a37ae419191c61fdf75cc30d3
```


计算该字符串的 SHA512，得到签名值为：

```
4f59d7eef4d968ae6c9d05fbf24f8fda7bc0273a0843583a5307c68947deea00c6504701e28e954d664eb77658d347a68c7920b17f6f68fb22cdfe7229d7bb3d
```

结合 Secret, 最终调用方需发起的请求为：

```sh
POST --header 'Content-Type: application/json' \
  --header  'Secret: 5c0abe2a37ae419191c61fdf75cc30d3'  \
  --header 'Content-MD5:j6rnb8MCtCWr8lHZC7dbEg==' \
   /api?appKey=foobar&name=dadu&abc=123&sign=4f59d7eef4d968ae6c9d05fbf24f8fda7bc0273a0843583a5307c68947deea00c6504701e28e954d664eb77658d347a68c7920b17f6f68fb22cdfe7229d7bb3d
-d '
{"name": "bob"}
'
```


##### 请求限制

Body 大小默认设置为不超过 10 mb。

如果需要支持更大的请求 Body，可以通过调整参数 request_body_size_limit 来设置。


##### 加上时间戳的签名（可选）
增加名为 apiTimestamp 的时间戳参数，同其他参数一起字符升序排列之后，进行签名生成 sign。

###### 时间戳取值

时间戳取值如 `apiTimestamp=1680505000`

Unix 时间戳标准：从 1970 年 1 月 1 日（UTC/GMT 的午夜 ）开始所经过的秒数，不同语言的获取方式如下表：

| 语言 | 示例  |
|----|-----|
| Java | System.currentTimeMillis() / 1000  |
| JavaScript | Math.round(new Date().getTime()/1000)|
| Golang | time.Now().UnixMilli()|


###### 时间校验

添加 apiTimestamp 时间戳参数后，网关将判断是否和服务端时间接近，默认允许正负误差在 5 分钟内（可以通过参数 date_offset 设置允许偏差范围），否则鉴权失败。

以不带 Body 的 URL 参数的签名为例：

```js
/api?appKey=foobar&name=dadu&abc=123
```

加上参数 apiTimestamp=1680505000，进行字符升序排列，并加上 App Secret（假设为 `5c0abe2a37ae419191c61fdf75cc30d3`）：

```
abc=123&apiTimestamp=1680505000&appKey=foobar&name=dadu5c0abe2a37ae419191c61fdf75cc30d3
```

计算该字符串的 SHA512，得到签名值为：

```
a716d54ee315bea0685d9c46fc46f1194f95ce2cf41f66588ff288f9e13b5774da98da6ee14e1a5fbe2613f43dcb2f66f0bd8ff593900e801c10e9b3442155f5
```

最终得到请求为：

```js
/api?appKey=foobar&name=dadu&abc=123&apiTimestamp=1680505000&sign=61cabbc719e5edff3021ab5047bd3c5981e6348066d0416254dd529241a7135d57498dac56d2400139bc1040c5759d1c0798f1673913c537d10769c149879edd
```


#### 签名排错方法
网关签名校验失败时，会将服务端的签名串（StringToSign）放到HTTP Response的Header中返回到客户端，Key为：`X-Ca-Error-Message`，用户只需要将本地计算的签名串（StringToSign）与服务端返回的签名串进行对比即可找到问题；
除此之外，会将请求的 客户端 和 服务端 的计算的签名结果分别 放到HTTP Response的Header 中返回到客户端，Key 分别为 `X-Ca-Error-Client-Sign` 和 `X-Ca-Error-Server-Sign`，
如果服务端与客户端的StringToSign一致请检查用于签名计算的 APP Secret 是否正确；

如下所示：

```bash
 x-ca-error-message: abc=123&apiTimestamp=1680519800&appKey=foobar&data=j6rnb8MCtCWr8lHZC7dbEg==&name=dadu5c0abe2a37ae419191c61fdf75cc30d3
 x-ca-error-server-sign: a6e998b4eb71e1d6bda2ada143ba01c0562d27b622447621fb3e7b0fcf2bb90cf2bbe3592568bd13948ed3dee34e7c6ddaef4aece073b7c4666bdcc543c7c0d6
 x-ca-error-client-sign: a716d54ee315bea0685d9c46fc46f1194f95ce2cf41f66588ff288f9e13b5774da98da6ee14e1a5fbe2613f43dcb2f66f0bd8ff593900e801c10e9b3442155f5
```

#### 相关错误码

| HTTP 状态码 | 出错信息                 | 原因说明  | 
|------------|-------------------------|--------|
| 401 | Invalid Secret | 请求头未提供 x-ca-secret，或者 x-ca-secret 无效 |
| 401 | Empty Signature | 请求参数未提供 sign 签名串或提供的 sign 值为空 |
| 400 | Invalid Signature | 请求参数提供的 sign 签名与服务端计算得到的签名不一致 |
| 400 | Invalid Content-MD5 | 请求头 content-md5 不正确 |
| 400 | Invalid Date | 根据请求参数 apiTimestamp 计算时间偏移超过配置的 date_offset |
| 413 | Request Body Too Large | 请求 Body 超过插件配置参数 request_body_size_limit 限制大小：默认 10 MB|
| 403 | Unauthorized Consumer | 请求的调用方无访问权限 |
