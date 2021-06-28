# 开启 HTTPS
越来越多的企业倾向于使用 HTTPS 来连接自己的应用，[HTTPS](https://en.wikipedia.org/wiki/HTTPS) 比 HTTP 多了安全验证，通过传输加密和身份认证保证了传输过程的安全性。谷歌 Chrome 、微软 IE、百度等浏览器会把非 HTTPS 网站标注为不安全，HTTPS 对提升搜索引擎排名也有积极作用。

## 使用场景

用户可以在 Erda 上开启两种不同场景下的 HTTPS ：
- 单一应用的 HTTPS 防护（比如支付，控制台等业务）
- 整站的 HTTPS 防护

## 证书申请
#### 测试证书

[OpenSSL](https://zh.wikipedia.org/wiki/OpenSSL) 提供了快速创建 SSL 证书的工具集，可以使用它快速创建用于测试的 HTTPS 证书。

```bash
$  openssl genrsa -out tls.key 2048

Generating RSA private key, 2048 bit long modulus
................................................................+++
........................................................................................+++
e is 65537 (0x10001)

$  openssl req -sha256 -new -x509 -days 365 -key tls.key -out tls.crt

You are about to be asked to enter information that will be incorporated
...
-----
Country Name (2 letter code) [XX]:CN
State or Province Name (full name) []:zhejiang
Locality Name (eg, city) [Default City]:hangzhou
Organization Name (eg, company) [Default Company Ltd]:alibaba
Organizational Unit Name (eg, section) []:test
Common Name (eg, your name or your server's hostname) []:foo.bar.com           #注意，您需要正确配置域名。
Email Address []:a@alibaba.com
```

:::tip
证书制作过程中需要提供正确的域名，不能随便输入
:::

#### 免费证书

由于目前各大浏览器厂商都会校验证书的合法性，即必须是通过互联网上的权威 CA 签发的证书浏览器才会标记为安全证书，上述使用 OpenSSL 创建的证书只能在测试场景下使用，会在浏览器的地址栏被标记为红色的不安全，[FreeSSL](https://freessl.cn/) 是一个提供免费 HTTPS 证书申请的网站，由 Let's Encrypt 与 TrustAsia 提供技术支持，非常适合个人项目以及购买正式证书之前的过渡阶段。

#### 正式证书
HTTPS 证书按照域名类型可以分为通配符域名，单域名，多域名，按照证书类型可以分为 DV、EV、OV，同时也可以由不同的 CA 机构来签发，这些 CA 机构会委托其他证书提供商来对外发售域名，国内用户推荐 [阿里云](https://common-buy.aliyun.com/?spm=a2c4g.11186623.2.11.19ff3c93wcWbr0&commodityCode=cas#/buy), 海外用户推荐 [GoDaddy](https://www.godaddy.com)。

按照域名类型分类：

|  域名类型   | 应用场景  |
|  ----  | ----  |
| 通配符域名（整站HTTPS）  | 如果需要保护一个主域名和这个主域名下所有的某一级子域名，请选择通配符域名（泛域名）类型。 |
| 单域名（单一站点HTTPS）  | 如果只需要保护 1 个主域名或者子域名（非通配符域名），请选择单域名（1 个域名）类型。支持保护：主域名，子域名 |
| 多域名  | 如果需要保护多个域名，包括同一个域名下的不同级别的多个域名或者不同的域名及其子域名，请选择多域名类型 |

按照证书类型分类：

|  证书类型   | 适用网站类型  | 公信等级 | 认证强度 | 安全性 |
|  ----  | ----  | --- | --- | --- |
|  DV SSL | 个人网站 | 一般 | CA 机构审核个人网站真实性、不验证企业真实性 | 一般 |
|  OV SSL | 政府组织、企业、教育机构等 | 高 | CA 机构审核组织及企业真实性 | 高 |
|  EV SSL | 大型企业、金融机构等 | 最高 | 严格认证 | 最高（地址栏绿色）|
常见证书品牌介绍

|  证书品牌   | 说明  | 补充说明 |
|  ----  | ----  | --- |
|  Digicert  | Digicert（原 Symantec）是全球第一大数字证书颁发机构、全球最值得信赖的SSL证书品牌，所有证书都采用业界领先的加密技术，为不同的网站和服务器提供安全解决方案 | 无 |
|  CFCA  | 中国金融认证中心（CFCA）通过了国际 WebTrust 认证，遵循全球统一鉴证标准，是国际 CA 浏览器联盟的组织成员。CFCA 提供全球信任证书，由中国权威数字证书认证机构自主研发，纯国产证书。CFCA 提供 7x24 小时金融级的安全保障服务，且有完善的风险承保计划。提供中文版全球信任体系电子认证业务规则（CPS），便于用户理解双方权利和义务。 | 目前不支持苹果iOS 10.1 及 10.1以前的版本，不支持安卓 6.0 及以前的版本 |
|  GeoTrust  | GeoTrust 是全球第二大数字证书颁发机构， 也是身份认证和信任认证领域的领导者，采用各种先进的技术使任何大小的机构和公司都能安全、低成本地部署 SSL 数字证书和实现各种身份认证。 | 无 |
| GlobalSign | GlobalSign 是全球最早的数字证书认证机构之一，一直致力于网络安全认证及数字证书服务，是一个备受信赖的 CA 和 SSL 数字证书提供商。 | 无 |

## 单一应用的 HTTPS 防护

1. Erda 平台通过 kubernets 的 secret 来管理 HTTPS 证书，登录到 master 节点，根据准备好的证书创建 secret。

```bash
$  kubectl create secret tls secret-https --key tls.key --cert tls.crt
```

2. 修改域名对应的 ingress 配置，增加 TLS，证书配置以及 HTTP 转 HTTPS，配置完成后，foo.bar.com 站点默认将使用 HTTPS 来访问。

```bash
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: tls-example-ingress
annotations:
  nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  tls:
  - hosts:
      - foo.bar.com
    secretName: secret-https  #该域名对应的secret
  rules:
  - host: foo.bar.com
    http:
      paths:
      - path: /
        backend:
          serviceName: service1
          servicePort: 80
```

## 整站的 HTTPS 防护

整站 HTTPS， 即所有对互联网开发的域名都只能使用 HTTPS 访问，根据谷歌的统计，网络上最热门的 100 个网站中有 81 个默认使用 HTTPS，这个占比还会不断提升。从2018 年 7 月开始，谷歌 Chrome 浏览器会将所有 HTTP 网站标记为“不安全”。为了更好的用户体验以及更健壮的用户数据保护，对整站实施 HTTPS 方式是已成为目前所有企业的主流做法。
* 采购泛域名证书
* 根据准备好的证书创建 secret

```bash
kubectl create secret tls secret-https --key tls.key --cert tls.crt -n kube-system
```
3. Erda 平台采用 [Nginx](http://nginx.org/) 作为整个集群的入口并且默认会开启所有域名的 TLS 端口，因此可以在 Nginx 处配置统一的证书以及 HTTP 转 HTTPS 规则。

在 Nginx 的启动参数中配置默认证书：

```bash
$  kubectl edit ds nginx-ingress-controller -n kube-system

      containers:
      - args:
        - /nginx-ingress-controller
        - --validating-webhook=:8081
        - --default-ssl-certificate=kube-system/secret-https  #配置默认证书
        - --validating-webhook-certificate=/etc/nginx/ingress-validation/cert.pem
        - --validating-webhook-key=/etc/nginx/ingress-validation/key.pem
        - --enable-dynamic-certificates=false
        - --default-ssl-certificate=$(POD_NAMESPACE)/ingress-nginx-https
        - --configmap=$(POD_NAMESPACE)/nginx-configuration
        - --tcp-services-configmap=$(POD_NAMESPACE)/tcp-services
        - --udp-services-configmap=$(POD_NAMESPACE)/udp-services
        - --publish-service=$(POD_NAMESPACE)/ingress-nginx
```

在 Nginx 的配置文件中增加 HTTP 转 HTTPS 的全局配置:

```bash
$ kubectl edit cm nginx-template -n kube-system

    proxy-body-size: "100m"
    proxy-connect-timeout: "10"
    server-tokens: "false"
    ssl-redirect: "true"  #开启所有域名的http转https
```

