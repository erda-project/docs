# API 开放鉴权

## 流量入口管理

### 创建流量入口

如需开放 API 鉴权，创建流量入口时需选择 **面向合作伙伴开放 API** 场景。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/29/5ac9fdae-9494-43e5-9399-2f61b3c2bde4.png)

**调用方认证方式**

* **Key 认证**：通过请求参数中的 `appKey` 字段，或请求头中的 `X-App-Key` 识别调用方。
* **HMAC 签名认证**：使用 HMAC 对请求行、请求头、请求 Body 进行加密，具备较高的安全性，因根据 HTTP 签名算法标准草案设计，同时具备一定的通用性，具体请参见 [HMAC 签名认证](./auth.md#hmac-签名认证-推荐)。
* **参数签名认证**：通过请求参数中的 `appKey` 字段识别调用方，同时通过对参数进行签名的 `sign` 字段完成校验，具体请参见 [参数签名认证](./auth.md#参数签名认证)。
* **OAuth2 认证**：基于 OAuth2 Client Credentials 模式，通过动态 Token 识别调用方，调用方可借助类似 `Spring Cloud Security` 的库实现。

**调用方访问条件**

* **认证通过**：仅需携带的调用凭证正确，即可通过识别进行访问。
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

## 签名认证算法

在平台提供的认证鉴权方式中，HMAC 签名认证和参数签名认证均可在识别出调用方的同时，对请求参数、Body 进行签名检查，从而进一步确保请求未被篡改或伪造。

### HMAC 签名认证（推荐）

该算法主要依据 [HTTP 签名草案](https://tools.ietf.org/html/draft-cavage-http-signatures-12) 建立，使用 Kong 原生的 [HMAC-Auth 插件](https://docs.konghq.com/hub/kong-inc/hmac-auth/)。

#### Authorization 请求头构成

标准的 Authorization 请求头示例如下：

```json
Authorization: hmac appkey="wsK8t77fvAAs3i7878NSkC0j95ib3oVu", algorithm="hmac-sha256", headers="date request-line", signature="gaweQbATuaGmLrUr3HE0DzU1keWGCt3H96M28sSHTG8="
```

* **HMAC**

  表明使用 HMAC 签名，此为静态字段，在所有请求中均为一致，无需变化。

* **appkey="wsK8t77fvAAs3i7878NSkC0j95ib3oVu"**

  即凭证中的 App Key 字段（如下图所示），需与 HMAC 以 ASCII 空格 ` ` 分隔。


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/f9e03585-7162-4799-a915-e72fa786307b.png)

* **algorithm="hmac-sha256"**

  表示使用的签名算法，无需变化，需与 appkey 以 ASCII 字符 `,` 和 ASCII 空格 ` ` 分隔。

* **headers="date request-line"**

  参与签名的请求头，均为小写，其内容是有序的，表明签名过程中字段拼接的顺序（具体请参见 [签名算法](./auth.md#签名算法)），需与 algorithm 以 ASCII 字符 `,` 和 ASCII 空格 ` ` 分隔。

  ::: tip 提示
  字段 `request-line` 相对特殊，表示请求行，例如 `GET /api?name=bob HTTP/1.1`，此处虽写在 headers 中，实质上并不是 header。
  :::

* **signature="gaweQbATuaGmLrUr3HE0DzU1keWGCt3H96M28sSHTG8="**

  基于签名算法生成的签名值，需与 headers 以 ASCII 字符 `,` 和 ASCII 空格 ` ` 分隔。

#### 签名算法

1. 不存在请求 Body

* **必须请求头**
  * Date
  * Authorization

* **Date 请求头**

  Date 请求头需遵循 RFC1123 HTTP 规范，例如 `Thu, 10 Dec 2020 08:47:43 GMT`。

  * Unix 命令生成：

    ```bash
    env LANG=eng TZ=GMT date  '+%a, %d %b %Y %T %Z'
    ```

  ::: tip 提示
  若 Date 请求头时间与服务器时间的绝对差值大于 5 分钟，将被认为请求重放而拒绝请求。
  :::

* **Authorization 请求头**

  请求头的构造，请参见 [Authorization 请求头构成](./auth.md#authorization-请求头构成)。此处将介绍如何生成签名。

  例如，对于以下请求：

  ```bash
  curl -i -X GET http://localhost/requests?name=bob \
        -H 'Host: hmac.com' \
        -H 'Date: Thu, 22 Jun 2017 21:12:36 GMT' \
        -H 'Authorization: hmac appkey="wsK8t77fvAAs3i7878NSkC0j95ib3oVu", algorithm="hmac-sha256", headers="date host request-line", signature="FiPTWoayUGvlaAk6HbnxEzlXo0JO2HhiDGEwsR4yKPo="'
  ```

  Authorization 头中指定了用于签名的请求头，`date`、`host` 以及特殊的请求行 `request-line`，按序拼接字符串，获得待签名字符串：

  ```json
  date: Thu, 22 Jun 2017 21:12:36 GMT
  host: hmac.com
  GET /requests?name=bob HTTP/1.1
  ```

  对待签名字符串进行签名，规则如下：

  ```json
  signed_string=HMAC-SHA256(<signing_string>, "secret")
  signature=base64(<signed_string>)
  ```

  若 App Secret 为 `qdWre3pJxitNm9NOBRH3EpWeVYepnt3f`，可得到签名值为 `FiPTWoayUGvlaAk6HbnxEzlXo0JO2HhiDGEwsR4yKPo=`。

  使用 Unix 命令生成签名：

  ```bash
  echo -ne "date: Thu, 22 Jun 2017 21:12:36 GMT\nhost: hmac.com\nGET /requests?name=bob HTTP/1.1" | \
  openssl dgst -sha256 -hmac "qdWre3pJxitNm9NOBRH3EpWeVYepnt3f" -binary | base64
  ```

2. 存在请求 Body

* **必须请求头**
  * Date
  * Digest
  * Authorization

* **Date 请求头**

  与不存在 Body 时一致。

* **Digest 请求头**

  需使用 SHA-256 对请求 Body 进行签名，例如 Body 为 `{"name": "bob"}`，则对应的 Digest 请求头为 `Digest: SHA-256=lWuihDRnfX2CUVffGA74EjBnzVgnfHPywPXkYaKDC1I=`，
  其中 Digest 请求头的 `value` 需以 `SHA-256=` 开头。

  使用 Unix 命令生成：

  ```bash
  echo -n '{"name": "bob"}' | openssl dgst -sha256 -binary | base64
  ```

  请求限制：请求 Body 大小不超过 10 m。

* **Authorization 请求头**

  区别于不存在 Body 的情况，Headers 部分必须带上 Digest，示例如下：

  ```bash
  curl -i -X POST http://localhost/requests \
        -H 'Host: hmac.com' \
        -H 'Date: Thu, 22 Jun 2017 21:12:36 GMT' \
        -H 'Digest: SHA-256=956ba28434677d7d825157df180ef8123067cd58277c73f2c0f5e461a2830b52' \
        -H 'Authorization: hmac appkey="wsK8t77fvAAs3i7878NSkC0j95ib3oVu", algorithm="hmac-sha256", headers="date request-line digest", signature="CZSUv+kxWHN/vPEbwARg4r+NN3Vnb9+Aaq5XOQiENJA="'
        -d '{"name": "bob"}'
  ```

  Authorization 头中指定了用于签名的请求头，`date`、`host` 、特殊的请求行 `request-line` 以及请求 Body 的签名值 `digest`，按序拼接字符串，获得待签名字符串：

  ```json
  date: Thu, 22 Jun 2017 21:12:36 GMT
  GET /requests?name=bob HTTP/1.1
  digest: SHA-256=lWuihDRnfX2CUVffGA74EjBnzVgnfHPywPXkYaKDC1I=
  ```

  生成签名的方式请参见 [不存在请求 Body](./auth.md#签名算法)。

#### 示例代码（Java 语言实现带 Body 的 Post 请求客户端 Hmac 认证）
> 注意：仅包含生成必要请求参数的示例代码，不包含发起 http 请求的示例代码
```java
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class HmacTest {

    private static final String APP_KEY = "000f9e29249a4618baf52f22392344bb";
    private static final String APP_SECRET = "ae854c899eff4c178fda3e1e53ff577c";
    
    public static void main(String[] args) {
        String requestBody = "{\"logisticNo\":\"packNo123\",\"shippingLines\":[{\"orderLineId\":123456,\"remark\":\"备注信息\",\"shippingQty\":1,\"skuId\":10001}],\"carrierName\":\"FEDEX_GROUND\",\"carrierCode\":\"FEDEX_GROUND\",\"tradeOrderId\":104037,\"shippingAt\":1644854400000}";

        // generate date
        // 注意：日期小于 10 时，使用 RFC_1123_DATE_TIME 格式化后的字符串会因省略十位的 0 而被认为错误
        DateTimeFormatter timeFormatter = DateTimeFormatter
                .ofPattern("EEE, dd MMM yyyy HH:mm:ss z", Locale.ENGLISH)
                .withZone(ZoneId.of("GMT"));
        String date = timeFormatter.format(ZonedDateTime.now(ZoneOffset.UTC));

        // generate digest
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(requestBody.getBytes(StandardCharsets.UTF_8));
        String digest = "SHA-256=" + Base64.encodeBase64String(messageDigest.digest());

        // generate signature 
        String signStrFormat = "date: %s\n%s %s HTTP/1.1\ndigest: %s";
        String signStr = String.format(signStrFormat, date, "POST", "/api/open/shipping", digest);
        String signature = Base64.encodeBase64String(new HmacUtils(HmacAlgorithms.HMAC_SHA_256, APP_SECRET).hmac(signStr));

        // generate Authorization
        String authorizationFormat = "hmac appkey=\"%s\", algorithm=\"hmac-sha256\", headers=\"date request-line digest\", signature=\"%s\"";
        String authorization = String.format(authorizationFormat, APP_KEY, signature);

        System.out.println("signStr: \n" + signStr);
        System.out.println("Date: " + date);
        System.out.println("Digest: " + digest);
        System.out.println("Authorization: " + authorization);
        
        // 发起 http 请求时, 将上述打印的 Date, Digest, Authorization 设置到请求头
    }
}
```

#### 示例代码（Go 语言实现带 Body 的 Post 请求客户端 Hmac 认证）
> 注意：包含计算各必要参数和发起 http 请求的完整示例代码
```go
package main

import (
	"bytes"
	"crypto/hmac"
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
		appKey = "088ed68d41504123b76d0812f328b560"
		appSec = "01c28076047a46a9a3d46d9082f2a716"
		host   = "https://go-http-demo-auth.daily.terminus.io"
		uri    = "/envs"
	)

	request, err := http.NewRequest(http.MethodPost, host+uri, bytes.NewBufferString(body))
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
	fmt.Printf("response body: %s", string(data))
}

// digest 实现对 Body 的摘要算法
// 注意：计算签名时，要从 binary 以 Base64 方法编码为 string
func digest(data []byte) (string, error) {
	h := sha256.New()
	if _, err := h.Write(data); err != nil {
		return "", err
	}
	return "SHA-256=" + base64.StdEncoding.EncodeToString(h.Sum(nil)), nil
}

// date 获取计算签名所需的日志，注意 Location 是 Europe/London 时间，时间格式是 RFC1123
func date() (string, error) {
	location, err := time.LoadLocation("Europe/London")
	if err != nil {
		return "", err
	}
	return time.Now().In(location).Format(time.RFC1123), nil
}

// signature 根据给定的 date, method, reqeustLine, digest 和 appSecret 生成签名
func signature(date, method, requestLine, digest, appSecret string) (signString, sign string, err error) {
	signString = fmt.Sprintf("date: %s\n%s %s HTTP/1.1\ndigest: %s", date, method, requestLine, digest)
	h := hmac.New(sha256.New, []byte(appSecret))
	if _, err := h.Write([]byte(signString)); err != nil {
		return signString, "", err
	}
	sign = base64.StdEncoding.EncodeToString(h.Sum(nil))
	return signString, sign, nil
}

// authorization 构造请求头 Authorization 的值
func authorization(appKey, sign string) string {
	const authorizationPat = `Authorization: hmac appkey="%s", algorithm="hmac-sha256", headers="date request-line digest", signature="%s"`
	return fmt.Sprintf(authorizationPat, appKey, sign)
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
	digest, err := digest(data)
	if err != nil {
		return err
	}
	fmt.Printf("digest: %s\n", digest)

	// make date
	date, err := date()
	if err != nil {
		return err
	}
	fmt.Printf("date: %s\n", date)

	// make signature
	signString, sign, err := signature(date, r.Method, r.URL.RequestURI(), digest, appSecret)
	if err != nil {
		log.Fatalf("failed to sinature: %v", err)
	}
	fmt.Printf("signString: %s\n", signString)
	fmt.Printf("sign: %s\n", sign)

	// make auth
	author := authorization(appKey, sign)
	fmt.Printf("authorization: %s\n", author)

	// set headers
	r.Header.Set("date", date)
	r.Header.Set("digest", digest)
	r.Header.Set("Authorization", author)

	return nil
}
```

### 参数签名认证

所有参数（包括 `appKey`，但不包括签名参数 `sign` 自身）均按照字符序增序排列，随后在排列的参数串末尾加上 `appSecret`，对完整字符串进行 SHA512 签名，生成签名参数 `sign`。

#### 基于 URL 参数的签名

例如，调用参数为：

```js
/api?appKey=foobar&name=dadu&abc=123
```

参数名按照字母序升序排列，得到：

```js
abc=123&appKey=foobar&name=dadu
```

假设调用凭证中的 App Secret 为 `my.secret`，并将其附加到参数末尾，得到：

```js
abc=123&appKey=foobar&name=dadumy.secret
```

计算该字符串的 SHA512，得到签名值为：

```json
f97efc239eef4eafe69bfe41438740199d939e2e123c4c5a6b5d0b5e58d295a2818d6444c5c7b9e5985e751ad93f9c854e1966e59a63a1eeceb31e46641e291a
```

最终得到请求为：

```js
/api?appKey=foobar&name=dadu&abc=123&sign=f97efc239eef4eafe69bfe41438740199d939e2e123c4c5a6b5d0b5e58d295a2818d6444c5c7b9e5985e751ad93f9c854e1966e59a63a1eeceb31e46641e291a
```


#### 基于 Body 的签名

对于 Post 等带有 Body 的请求，将对 Body 进行签名，此时分为两种情况：

1. Content-Type 为 `application/x-www-form-urlencoded`

   此时与 URL 参数签名的方式一致，仅需将参数放至 Body 里面。

   请求限制：

   * Body 大小不超过 10 m。
   * 参数个数不大于 100 个。

2. Content-Type 为 `application/json`

   例如，原始请求为：

   ```bash
   POST --header 'Content-Type: application/json'
        -d '
   {"userName":"abc","gender":"male"}
   '
   ```

   将 Body 整体作为名为 Data 的参数，按照字母升序排列，得到：

   ```js
   appKey=foobar&data={"userName":"abc","gender":"male"}
   ```

   假设调用凭证中的 App Secret 为 `my.secret`，并将其附加到参数末尾，得到：

   ```js
   appKey=foobar&data={"userName":"abc","gender":"male"}my.secret
   ```

   计算该字符串的 SHA512，得到签名值为：

   ```json
   ec23eeda5f88abe26311ed020439172eea409e3475875c87e9abfa8a6856138e767608e8497435f573ccb417a90448c78abdca4a0de12c4da4583aa3add7bf52
   ```

   最终调用方需发起的请求为：

   ```bash
   POST --header 'Content-Type: application/json'
        -d '
   {
     "data": "{\"userName\":\"abc\",\"gender\":\"male\"}",
     "appKey": "foobar",
     "sign": "ec23eeda5f88abe26311ed020439172eea409e3475875c87e9abfa8a6856138e767608e8497435f573ccb417a90448c78abdca4a0de12c4da4583aa3add7bf52"
   }'
   ```

   网关收到请求后，发至后端服务的真正请求和原始请求一致：

   ```bash
   POST --header 'Content-Type: application/json'
        -d '
   {"userName":"abc","gender":"male"}
   '
   ```

   请求限制：Body 大小不超过 2 m。

#### 加上时间戳的签名（可选）

增加名为 `apiTimestamp` 的时间戳参数，同其他参数一起字符升序排列之后，进行签名生成 `sign`。

* **时间戳取值**

  Unix 时间戳标准：从 1970 年 1 月 1 日（UTC/GMT 的午夜 ）开始所经过的秒数

  不同语言的获取方式：

  | Java       | System.currentTimeMillis() / 1000     |
  | :--------- | :------------------------------------ |
  | JavaScript | Math.round(new Date().getTime()/1000) |

* **时间校验**

  添加 `apiTimestamp` 时间戳参数后，网关将判断是否和服务端时间接近，允许正负误差在 5 分钟内，否则鉴权失败。

* **Example**

  以 URL 参数的签名为例：

  ```js
  /api?appKey=foobar&name=dadu&abc=123
  ```

  加上参数 `apiTimestamp=1581565619`，进行字符升序排列，并加上 App Secret（假设为 `my.secret`）：

  ```js
  abc=123&apiTimestamp=1581565619&appKey=foobar&name=dadumy.secret
  ```

  计算该字符串的 SHA512，得到签名值为：

  ```
  61cabbc719e5edff3021ab5047bd3c5981e6348066d0416254dd529241a7135d57498dac56d2400139bc1040c5759d1c0798f1673913c537d10769c149879edd
  ```

  最终得到请求为：

  ```js
  /api?appKey=foobar&name=dadu&abc=123&apiTimestamp=1581565619&sign=61cabbc719e5edff3021ab5047bd3c5981e6348066d0416254dd529241a7135d57498dac56d2400139bc1040c5759d1c0798f1673913c537d10769c149879edd
  ```

  基于 Body 签名的方式类似，`apiTimestamp` 需带在 Body 的 JSON 结构体中，例如：

  ```bash
  POST --header 'Content-Type: application/json'
       -d '
  {
    "data": "{\"userName\":\"abc\",\"gender\":\"male\"}",
    "appKey": "foobar",
    "apiTimestamp": 1581565619,
    "sign": "xxxx",
  }'
  ```

#### 代码示例

签名实现：

```java
// SignAuthHelper.Java
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang.StringUtils;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.security.MessageDigest;
import java.util.stream.Collectors;

/**
 * SignAuthHelper.java (JAVA 8+)
 */
public class SignAuthHelper {

    public static Map<String, String> sign(Map<String,String> args, String appSecret) {
        args.put("appKey", args.get("appKey"));
        List<String> keyList = args.entrySet().stream().map(Map.Entry::getKey).sorted().collect(Collectors.toList());
        List<String> kvList = new ArrayList<>();
        for (String key: keyList) {
            kvList.add(key + "=" + args.get(key));
        }
        String argsStr = StringUtils.join(kvList, "&") + appSecret;
        String sign = string2SHA512(argsStr);
        args.put("sign", sign);
        return args;
    }




    private static String string2SHA512(String str) {
        MessageDigest messageDigest;
        String encdeStr = "";
        try {
            messageDigest = MessageDigest.getInstance("SHA-512");
            byte[] hash = messageDigest.digest(str.getBytes("UTF-8"));
            encdeStr = Hex.encodeHexString(hash);
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encdeStr;
    }
}
```

测试程序：

```java
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

/**
 * Main.java (JAVA 8+)
 */
public class Main {

    public static void main(String[] args) {

        // Sign Request URL Parameter
        // GET https://domain.com?param1=123&param2=Abc&appKey=foobar&pampasCall=query.coupon
        Map<String, String> params = new HashMap<>(2);
        params.put("param1", "123");
        params.put("param2", "Abc");
        params.put("appKey", "foobar");
        params.put("pampasCall", "query.coupon");
        params = SignAuthHelper.sign(params, "my.secret");
        String expect = "d6fee3145be668425f70878084f9d"
            + "39fce3f7c5fca283ffc4c5d5a5568077334e9a505"
            + "26e7e806758a66b7647ae9951f9324a0f921e28417e07d69beed79f7ef";
        assertEquals(expect, params.get("sign"));
        System.out.println("Verify Success");


        // Sign Request Body
        // POST --header 'Content-Type: application/json'
        //      --header 'Accept: application/json'
        //      -d '{"userName":"abc","gender":"male"}'
        // 'https://domain.com'

        params = new HashMap<>(4);

        // request body use data as param name
        params.put("data", "{\"userName\":\"abc\",\"gender\":\"male\"}");
        params.put("appKey", "foobar");
        expect = "ec23eeda5f88abe26311ed020439172eea409e34"
            + "75875c87e9abfa8a6856138e767608e8497435f573c"
            + "cb417a90448c78abdca4a0de12c4da4583aa3add7bf52";
        params = SignAuthHelper.sign(params, "test-secret");
        assertEquals(expect, params.get("sign"));
        System.out.println("Verify Request Body Success");
    }
}
```
