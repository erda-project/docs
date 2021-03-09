# 签名认证算法

在平台提供的几种认证鉴权方式中，HMAC 签名认证和参数签名认证，都是可以在识别出调用方的同时，对请求参数、body 进行签名检查，从而进一步确保请求没有被篡改或伪造

## HMAC 签名认证 (推荐)

该算法主要依据 [HTTP 签名草案](https://tools.ietf.org/html/draft-cavage-http-signatures-12) 建立，使用的 Kong 原生的[hmac-auth 插件](https://docs.konghq.com/hub/kong-inc/hmac-auth/) 


### 签名方式

#### Authorization 请求头的构成

首先来看一个标准的 Authorization 请求头:

```text
Authorization: hmac appkey="wsK8t77fvAAs3i7878NSkC0j95ib3oVu", algorithm="hmac-sha256", headers="date request-line", signature="gaweQbATuaGmLrUr3HE0DzU1keWGCt3H96M28sSHTG8="
```

逐个部分来看具体含义

**第1部分：hmac**

表明使用了 hmac 签名，这是个静态字段，所有请求都是一样的，无需变化

**第2部分：appkey="wsK8t77fvAAs3i7878NSkC0j95ib3oVu"**

即凭证中的 App Key 字段，取如图所示的值：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/12/10/3499f817-8bed-43aa-89dc-bb3a6dda94fa.png)

需要与第1部分之间用 ASCII 空格` `分隔

**第3部分：algorithm="hmac-sha256"**

表示使用的签名算法，这部分也无需变化

需要与第2部分之间用 ASCII 字符 `,` 和 ASCII 空格 ` `分隔

**第4部分：headers="date request-line"**

参与签名的请求头，都需要是小写的，注意这里是有序的，表明了签名过程中字段拼接的顺序，具体会在签名算法中介绍

::: tip request-line
request-line 这个字段比较特殊，表示请求行，例如`GET /api?name=bob HTTP/1.1`，虽然这里写在 headers 里，但其实并不是 header
:::

需要与第3部分之间用 ASCII 字符 `,` 和 ASCII 空格 ` `分隔

**第5部分：signature="gaweQbATuaGmLrUr3HE0DzU1keWGCt3H96M28sSHTG8="**

基于签名算法生成的签名值

需要与第4部分之间用 ASCII 字符 `,` 和 ASCII 空格 ` `分隔

#### 签名算法

1. 不存在请求 body 时

**必须请求头**

- Date
- Authorization

**Date 请求头**

其中 Date 请求头需要遵循 RFC1123 HTTP 规范，例如`Thu, 10 Dec 2020 08:47:43 GMT`

Unix 命令生成：

```bash
env LANG=eng TZ=GMT date  '+%a, %d %b %Y %T %Z'
```
Java 代码生成：

```java
System.out.println(DateTimeFormatter.RFC_1123_DATE_TIME.format(ZonedDateTime.now(ZoneOffset.UTC)));
```

::: tip
如果 Date 请求头里的时间与服务器时间的差值绝对值超过 5 分钟，会被认为是请求重放，拒绝请求
:::

**Authorization 请求头**

对于请求头的构造，上面已经阐述。这里说明其中的 `signature` 部分是如何生成的

首先是`待签名字符串`的生成，生成规则如下：

1. 如果不是`request-line`，拼接小写的请求头的 key，并跟上 ASCII 字符 `:` 和 ASCII 空格 ` `
2. 如果不是`request-line`， 拼接上请求头的 value; 如果是 `request-line`，拼接上 HTTP request line
3. 如果不是最后，拼接上 ASCII 换行符 `\n`

通过具体例子来说明，对于以下请求：

```bash
curl -i -X GET http://localhost/requests?name=bob \
      -H 'Host: hmac.com' \
      -H 'Date: Thu, 22 Jun 2017 21:12:36 GMT' \
      -H 'Authorization: hmac appkey="wsK8t77fvAAs3i7878NSkC0j95ib3oVu", algorithm="hmac-sha256", headers="date host request-line", signature="FiPTWoayUGvlaAk6HbnxEzlXo0JO2HhiDGEwsR4yKPo="' 
```

Authorization 头中指定了用于签名的请求头，`date`,`host` 以及特殊的请求行`request-line`，按顺序进行字符串拼接，获得`待签名字符串`：

```text
date: Thu, 22 Jun 2017 21:12:36 GMT
host: hmac.com
GET /requests?name=bob HTTP/1.1
```

接着，对`待签名字符串`进行签名，签名规则如下：

```text
signed_string=HMAC-SHA256(<signing_string>, "secret")
signature=base64(<signed_string>)
```

如果 App Secret 为 `qdWre3pJxitNm9NOBRH3EpWeVYepnt3f`

可以得到签名值为 `FiPTWoayUGvlaAk6HbnxEzlXo0JO2HhiDGEwsR4yKPo=`

对于上面的例子，使用 Unix 命令生成签名:

```bash
echo -ne "date: Thu, 22 Jun 2017 21:12:36 GMT\nhost: hmac.com\nGET /requests?name=bob HTTP/1.1" | \
openssl dgst -sha256 -hmac "qdWre3pJxitNm9NOBRH3EpWeVYepnt3f" -binary | base64 
```

使用 java 代码生成签名:

```java
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
// ...
String digest =
    new String(
        Base64.encodeBase64String(
            new HmacUtils(HmacAlgorithms.HMAC_SHA_256, "qdWre3pJxitNm9NOBRH3EpWeVYepnt3f")
                .hmac("date: Thu, 22 Jun 2017 21:12:36 GMT\nhost: hmac.com\nGET /requests?name=bob HTTP/1.1")));
```

2. 存在请求 body 时

**必须请求头**

- Date
- Digest
- Authorization

**Date 请求头**

与不存在 body 时一致

**Digest 请求头**

需要使用 SHA-256 对请求 Body 进行签名，例如 body 为 `{"name": "bob"}`，则对应的 Digest 请求头为：`Digest: SHA-256=956ba28434677d7d825157df180ef8123067cd58277c73f2c0f5e461a2830b52`

注意 Digest 请求头的 value 需要用 `SHA-256=` 开头

使用 Unix 命令生成

```bash
echo -n '{"name": "bob"}' | openssl dgst -sha256
```

::: warning 请求限制
请求 body 大小不能超过 10m
:::

**Authorization 请求头**

与不存在 body 时的区别是，headers 部分必须带上 digest，举例如下：

```bash
curl -i -X POST http://localhost/requests \
      -H 'Host: hmac.com' \
      -H 'Date: Thu, 22 Jun 2017 21:12:36 GMT' \
      -H 'Digest: SHA-256=956ba28434677d7d825157df180ef8123067cd58277c73f2c0f5e461a2830b52' \
      -H 'Authorization: hmac appkey="wsK8t77fvAAs3i7878NSkC0j95ib3oVu", algorithm="hmac-sha256", headers="date host request-line digest", signature="CZSUv+kxWHN/vPEbwARg4r+NN3Vnb9+Aaq5XOQiENJA="' 
      -d '{"name": "bob"}'
```

Authorization 头中指定了用于签名的请求头，`date`,`host`，特殊的请求行`request-line`，以及请求 body 的签名值`digest`，按顺序进行字符串拼接，获得`待签名字符串`：

```text
date: Thu, 22 Jun 2017 21:12:36 GMT
host: hmac.com
GET /requests?name=bob HTTP/1.1
digest: SHA-256=956ba28434677d7d825157df180ef8123067cd58277c73f2c0f5e461a2830b52
```

生成 `signature` 的方式与不存在 body 时是一致的，不再赘述

## 参数签名认证 

所有的参数（包括 appKey，但不包括签名参数 sign 自身）都按字符序增序排列，然后在排列好的参数串末尾加上 appSecret，对这整个字符串进行 SHA512 签名，生成签名参数 sign

### 基于 URL 参数的签名

比如调用参数为:

```js
/api?appKey=foobar&name=dadu&abc=123
```

则首先参数名按照字母序升序排列，得到:

```js
abc=123&appKey=foobar&name=dadu
```

再假设调用凭证中的 App Secret 为 my.secret，则将其附加到参数末尾，得到:

```js
abc=123&appKey=foobar&name=dadumy.secret
```

再计算这段字符串的SHA512，得到签名值为:

```text
f97efc239eef4eafe69bfe41438740199d939e2e123c4c5a6b5d0b5e58d295a2818d6444c5c7b9e5985e751ad93f9c854e1966e59a63a1eeceb31e46641e291a
```

所以最后的请求为:

```js
/api?appKey=foobar&name=dadu&abc=123&sign=f97efc239eef4eafe69bfe41438740199d939e2e123c4c5a6b5d0b5e58d295a2818d6444c5c7b9e5985e751ad93f9c854e1966e59a63a1eeceb31e46641e291a
```


### 基于 body 的签名

对于 POST 等带了 body 的请求，会对 body 进行签名，此时分为两种情况：

#### 1、Content-Type 是 application/x-www-form-urlencoded

此时与 URL 参数签名的方式一致，只不过将参数放到了 body 里面

**请求限制：**

- body 大小不能超过 10m
- 参数个数不能大于 100 个

#### 2、Content-Type 是 application/json

例如原始请求为：

```bash
POST --header 'Content-Type: application/json'
     -d '
{"userName":"abc","gender":"male"}
'
```

则将 body 整体作为名为 data 的参数，按照字母序升序排列，得到:

```js
appKey=foobar&data={"userName":"abc","gender":"male"}
```

再假设调用凭证中的 App Secret 为 my.secret，则将其附加到参数末尾，得到:

```js
appKey=foobar&data={"userName":"abc","gender":"male"}my.secret
```

再计算这段字符串的 SHA512，得到签名值为:

```text
ec23eeda5f88abe26311ed020439172eea409e3475875c87e9abfa8a6856138e767608e8497435f573ccb417a90448c78abdca4a0de12c4da4583aa3add7bf52
```

所以最终调用方需要发起的请求为:

```bash
POST --header 'Content-Type: application/json'
     -d '
{
  "data": "{\"userName\":\"abc\",\"gender\":\"male\"}",
  "appKey": "foobar",
  "sign": "ec23eeda5f88abe26311ed020439172eea409e3475875c87e9abfa8a6856138e767608e8497435f573ccb417a90448c78abdca4a0de12c4da4583aa3add7bf52"
}'
```

网关收到请求后，发给后端服务的真正请求和原始请求一致：

```bash
POST --header 'Content-Type: application/json'
     -d '
{"userName":"abc","gender":"male"}
'
```

**请求限制：**

- body 大小不能超过 2m



### 加上时间戳的签名（可选）

增加一个名为 "apiTimestamp" 的时间戳参数，和其他参数一起进行字符序升序排列之后，进行签名生成sign

#### 时间戳取值

按照 Unix 时间戳标准：从 1970 年 1 月 1 日（UTC/GMT 的午夜 ）开始所经过的秒数

不同语言的获取方式：

| Java       | System.currentTimeMillis() / 1000     |
| ---------- | ------------------------------------- |
| JavaScript | Math.round(new Date().getTime()/1000) |

#### 时间的校验

在添加了 apiTimestamp 时间戳参数后，网关会判断是否和服务端时间接近，允许正负误差在 5 分钟内。如果超过这个时间范围，则会鉴权失败。

#### example

以 URL 参数的签名为例

```js
/api?appKey=foobar&name=dadu&abc=123
```

加上参数 apiTimestamp=1581565619，进行字符序升序排列，并加上 App Secret( 假设为 my.secret)

```js
abc=123&apiTimestamp=1581565619&appKey=foobar&name=dadumy.secret
```

再计算这段字符串的 SHA512，得到签名值为:

```
61cabbc719e5edff3021ab5047bd3c5981e6348066d0416254dd529241a7135d57498dac56d2400139bc1040c5759d1c0798f1673913c537d10769c149879edd
```

所以最后的请求为:

```js
/api?appKey=foobar&name=dadu&abc=123&apiTimestamp=1581565619&sign=61cabbc719e5edff3021ab5047bd3c5981e6348066d0416254dd529241a7135d57498dac56d2400139bc1040c5759d1c0798f1673913c537d10769c149879edd
```

基于 body 签名的方式也是类似的，apiTimestamp 也需要带在 body 的 json 结构体里，例如：

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

### 示例代码

#### 签名实现

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

#### 测试程序

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
