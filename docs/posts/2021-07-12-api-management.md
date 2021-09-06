---
title: API 管理在云原生场景下的机遇与挑战
author: 张添翼
date: 2021-07-12
category: dop
---


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/606a446b-ba5b-43ab-b2d0-a65a051523ba.png)
# 云原生下的机遇和挑战
## 标准和生态的意义
自从 Kubernetes v1.0 于 2015 年 7 月 21 日发布，CNCF 组织随后建立以来，其后几年，Kubernetes 和 CNCF 都经历了如火如荼的发展。时至今日，Kubernetes 已经进入成熟期，云原生时代则刚刚开始。虽然说云原生不只是围绕着 Kubernetes 的生态，但无可质疑，Kubernetes 已经是云原生生态的基石。通过规范 API 和 CRD 标准，Kubernetes 已经建立起了一个云原生 PaaS 生态帝国，成为了 PaaS 领域的事实标准。<br />​

这一层事实标准，对企业交付有着巨大的意义。在 K8s 生态出现之前，类比于土木工程，连螺丝螺帽这样的东西都缺少统一的标准，而企业甲方如果只关注上层业务功能，很容易把万丈高台架构于浮沙之上，导致业务的倾覆。不夸张的说，在企业交付领域，真是“天不生 K8s，万古如长夜”。<br />​

以 API 管理中的 API 路由功能为例，如果不使用 K8s，企业可能会选择 F5/Nginx/HAProxy/Zuul 等各式网关软件，做对应的路由配置。有的软件提供了控制台 UI，有的可能是人肉脚本运维，缺乏标准，运维技能也无法沉淀，关键人员离职可能会带来灾难。K8s 把 API 路由的能力抽象为了 Ingress 资源，定义了标准，屏蔽了底层软件细节，通过 CNCF CKA 认证的人员都会具备 API 路由运维的能力。在 API 管理的领域，除了 API 路由，还有 API 流量治理策略，API 开放鉴权，以及调用量观测审计等环节，K8s 以及 Istio 等生态都给出了一些标准定义，虽然其中很多尚未成熟，但标准和生态的未来已经愈发清晰。Erda Cloud 一直坚定地走在这条道路上，为企业提供符合标准，值得信赖的 API 管理产品。<br />​<br />
## 云原生网关各家争鸣
网关是构成 API 管理产品的关键一环。在云原生生态中，对于 K8s Ingress 标准，涌现出了众多不同的 Ingress Provider。有人整理了如下这张表格：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/cbebc7aa-2a3b-4a44-ba47-b7cf0bc8248c.png)<br />​

从表格中看到，这些 Ingress Provider 的底层网关实现有：Nginx，HAProxy，Envoy，Traefik，Skipper。<br />​

Kubernetes Nginx Ingress 作为官方实现，有最广大的用户生态群体，也是现在大规模生产部署使用最多的。在云原生生态出现之前，Nginx 就已经凭借高性能易扩展坐稳了 Web 2.0 时代网关第一的位置，具备很好的开发和运维生态，所以才会被 K8s 选中作为默认的 Ingress Provider，继而凭借着 Ingress，将生态进一步扩大。<br />​

HAProxy 跟 Nginx 的经历比较相似，都出现在 Web 2.0 刚兴起的时代，凭借高性能、极低的资源占用，占据了网关生态的一席之地。在和 K8s Ingress 结合之前，HAProxy 和 Nginx 在软件系统架构中扮演的更多是类似 ADC （Application delivery controller）接入层负载均衡的角色，即使采用了微服务架构，也不会直接负责微服务的流量暴露，通常是再增加一层微服务网关转发，如 Spring Cloud Gateway。因为微服务网关通常需要和微服务架构中的注册中心打通，实现服务发现，而这并不是 HAProxy 和 Nginx 的强项，在 Spring Cloud 微服务体系里，没有比 Spring Cloud Gateway 更佳的选择。但是 K8s 改变了这一切，它提供了 Ingress / Service / Endpoint 配套的服务发现机制，并且依托外置于代码的健康检查机制，可以实现无语言限制更通用的服务发现，扩展性也更强。这帮助 HAProxy 和 Nginx 将触手伸向了微服务治理领域。

其实早在 K8s 之前，已经有网关软件试图从传统的负载均衡领域扩展到微服务治理，Kong 就是此中翘楚。借助于 OpenResty，在依托 Nginx 高性能高可靠的基础上，能实现业务功能插件的快速开发。 所以 Kong 也实现了自己的服务发现和健康检查机制。<br />
<br />不过比较可惜的是，在 K8s 出现之后，独立的健康检查机制就比较鸡肋了，Kong Ingress 依然保留了这套鸡肋的机制，私以为不是一个明智的选择。而且 Kong Ingress 在路由策略配置这块，只支持自己的 Lua 插件生态，并不支持原生的 Nginx 配置指令，虽然 Kong 的插件生态已经很完善，但对于比如添加 HTTP 应答头这种一行 Nginx 配置指令就能搞定的事情，Kong 的插件未免有些低水平重复建设，冗杂且低效。不过，Kong 的插件生态丰富，尤其是认证和鉴权功能相当成熟，这也是 Erda Cloud 虽然没有选择 Kong Ingress，但仍然用 Kong 来实现部分 API 管理能力的主要原因。<br />​

一个软件的生命周期，如果跟架构生态发展的周期相契合，会迸发出耀眼的光芒。如果说 Kong 没有在最好的年纪遇上 K8s，“我生君未生，君生我已老”。Envoy 和 Istio 的相辅相成，可以称得上是一对完美 CP。Istio 将 Envoy 网关的能力从入口南北向管理拓展到了微服务之间的东西向流量管理，基于 xDS 协议的配置动态更新机制也优于 HAProxy 和 Nginx。不过 Envoy 的配置文件是用 json 描述的，自描述性比较差，所以像 Istio / Ambassador / Gloo 等都是对配置进行二次抽象，能更方便运维。虽然 Istio + Envoy 的未来想象空间是最大的，不过在基于配置抽象的网关能力覆盖度上，Gloo 是现在做的最好的，但跟 Nginx Ingress 相比还是有差距，尤其是类 ADC 部分的功能。网关能力的覆盖，跟生态需求的推动分不开，因为 Envoy 自身对配置的抽象程度不高，面向 Envoy 进行各自二次抽象的 Ingress Providers 又在一定程度上割裂了生态，要追上 Nginx Ingress 的生态，还有很长一段路要走。<br />​

Traefik 和 Skipper 等基于 Golang 的后起之秀，也不容忽视，虽然用户生态群体比不上老前辈们，但有着很好的开发者生态，这也得益于 Golang 这门让处理并发和 IO 变得如此简单的语言。迎合开发者也有两面性，比如因为有 GC 存在，要在大量并发连接和请求之下，保持理想的内存占用情况，难度会变的很大，为了达到 C/C++ 网关的性能，会在一定程度上增加代码设计的复杂度，从而变得不再简单可依赖。<br />​

云原生网关各家争鸣，原因是没有哪一家的产品能完全覆盖用户的需求，从类 ADC 到微服务发现，再到鉴权认证等更贴近业务的 API 管理域。Erda Cloud 的云原生 API 管理解决方案也是采用了 Nginx Ingress + Kong 的两层架构。不过相信随着标准的发展，网关边界的拓展，未来一定会出现既能完全满足底层网络运维需求，又能很好地扩展支撑上层业务策略的单层全栈网关软件，且一定是面向云原生架构的。<br />​<br />
## API 管理产品的鱼与熊掌
2010 年前后，Apigee 和 MuleSoft 的 API 管理产品前后脚出现了，并且给出了 API 全生命周期管理这一概念，旨在打通从设计开发到测试部署，再到对外开放集成，最终实现 API 货币化的全流程。到如今，如 Gartner 等咨询机构，也把 API 全生命周期管理当作企业数字化的关键一环，每年都会产出分析报告，为企业提供咨询服务。下图是 2020 年的 Gartner API 全生命周期管理魔力象限：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/b16219fb-f7de-4003-a294-53a4d7f3ef79.png)<br />​

如上图所示，Apigee 和 MuleSoft 因为先发优势，牢牢占据着领导者象限的高位。可以看到 Kong 也位于领导者象限，甚至在战略层面领先于 Apigee 和 MuleSoft，这很大程度上是因为 Kong 丰富的业务插件生态，以及 Kong Ingress 等云原生的设计，领先于老牌的 API 管理产品。不过跟 MuleSoft 等成熟的 API 管理 SaaS 产品比起来，Kong 在产品化上并没有亮眼的表现。<br />​

现有的比较成熟的 API 管理 SaaS 产品，都有自己实现的 API 网关作为内核。但不同于云原生 Ingress 网关，这些 API 网关并不直接路由到 K8s 服务上，而是架构在整个业务系统之上，做应用系统层面的 API 管理。这也意味着，一旦选择这类 SaaS 产品，就必须要接受网络上多一层转发的开销，而且可能是跨越公网，要承担额外的 TLS 加密传输开销，这可能会在网络传输上增加数十到数百毫秒的延时。<br />
<br />Erda Cloud 提供的全生命周期的 API 管理产品，既利用了 Kong 成熟的 API 管理插件生态，同时又结合 Nginx Ingress 能更快更方便地直连云原生应用，让用户不必在延时开销和 API 管理能力之间做鱼和熊掌的抉择。这是 Erda Cloud 的云原生 API 管理产品与市面上其他产品最大的区别。<br />​<br />
# Erda Cloud 云原生网关
## 架构简介

<br />结合功能覆盖面，用户生态和企业生产实践规模的考量，Erda Cloud 的网关产品选择了优先适配 Nginx Ingress 来作为 K8s Ingress Provider。Erda Cloud 可以托管用户自建（或使用云厂商 K8s 服务）的 K8s 集群，只要集群内安装的 [Nginx Ingress Controller](https://link.zhihu.com/?target=https%3A//github.com/kubernetes/ingress-nginx) 版本高于 0.25，即可直接使用 Erda Cloud 云原生网关产品。<br />​

Erda Cloud 将 Kong 作为一个扩展组件，当用户有 API 开放鉴权等业务层面 API 管理的需求时，可以选择安装此扩展。用户在 Erda Cloud 上配置对应域名/API 的功能需求，Kong 会自动接管对应的 Ingress，再二次路由到对应的 K8s Service 上。基于 Unix domain socket/eBPF sockmap 等手段，可以将 Nginx Ingress 转发到 Kong 的延时降到忽略不计。<br />​

当然，增加一层代理转发，肯定会带来额外的资源占用，是这套架构的不足之处。但是拥有云原生的 Ingress Provider 让用户平滑接入这样的好处，具备从类 ADC 功能到业务层 API 管理功能这样全覆盖的能力，以及用户可以自主管理哪些流量经 Kong 转发此类灵活的设计，这个 trade off 还是很值得做的。<br />​<br />
## 扬 Ingress Annotation 之长
Nginx Ingress 可以基于 Ingress Annotation 实现强大的流量治理功能，例如要对请求速率进行限制的功能：<br />​<br />
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-example-host
  annotations:
    # 每个 IP 每秒可以访问 5 次
    nginx.ingress.kubernetes.io/limit-rps: 5
    # 为计算限速漏桶算法的 burst size，和 limit-rps 的相乘系数
    nginx.ingress.kubernetes.io/limit-burst-multiplier: 5
    # 配合 limit-window 表示全局限速 100 次每秒（需要依赖 memcached）
    nginx.ingress.kubernetes.io/global-rate-limit: 100
    nginx.ingress.kubernetes.io/global-rate-limit-window: 1s
    # 限制发送给后端服务的发送速率为 1MB 每秒
    nginx.ingress.kubernetes.io/limit-rate: 1024
    # 发送给后端服务的前 10MB 数据不进行限速
    nginx.ingress.kubernetes.io/limit-rate-after: 10240
spec:
  rules:
  - host: "foo.bar.com"
    http:
      paths:
      - path: "/bar"
        backend:
          service:
            name: bar
            port:
              number: 80
```
​

请求限速是 Ingress Annotation 能力的冰山一角，这简单的配置方式，是很多其他网关无法比拟的，例如使用 Istio Ingress Gateway 的时候，得通过复杂的 EnvoyFillter 配置来实现。相比之下 Gloo 做了一些配置上的简化，但也把这部分功能放到了商业化版本中，开源版本并不提供。<br />​

Erda Cloud 进一步强化了 Ingress Annotation 的能力。仍以限制请求速率为例，Nginx Ingress 提供的全局流量限速，需要依赖外置的 memcached 来进行多个 Nginx Ingress 实例之间的同步。Erda Cloud 可以实现对 Nginx Ingress 实例个数的感知，自动更新限速的配置。比如在 Erda Cloud 的网关策略配置了 100 次每秒的请求限制，并且当前 Nginx Ingress 实例个数为 2，则实际在 Ingress 中做的限速配置是 50 次每秒。不止于此，Erda Cloud 还降低了用户做此类配置时的心智成本。熟悉 Nginx 的人应该知道，请求速率限制是基于漏桶算法实现的，burst size 是实现去峰填谷的关键，如果 burst 大小为 0，偶发的请求间隔过段也会被拒绝访问。但是普通的用户可能并不了解这一机制，对于 Nginx Ingress 的 nginx.ingress.kubernetes.io/limit-burst-multiplier 配置项也会很困扰。<br />​

下面来看一下：Erda Cloud 是如何让用户做配置的吧。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/a2ec15a1-1d5f-4511-b43f-5341cb4c362d.png)<br />​

Erda Cloud 的网关配置将限流的 burst 配置替代为了最大额外延时的配置，这基于一个简单的算式：<br />​<br />
```
Burst Size = 最大额外延时 (秒) * 最大吞吐 (请求/秒)
```
​

所谓最大额外延时，解释起来就简单很多：当请求速率超过限定速率时，进行去峰填谷，为当前请求附加额外延时，如果需要附加的延时超过限定的最大额外延时，则直接拒绝访问。<br />
<br />Nginx Ingress 并没有提供现成的 Annotation 支持这种 local 模式的全局速率限制，但依然可以基于 snippet Annotation 来自定义 Nginx 的配置：

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-example-host
  annotations:
    # 会在对应的 server{} 下添加以下 nginx 配置片段
    nginx.ingress.kubernetes.io/server-snippet: |
      ###ERDA-AUTO-CONFIG###
      location @server-guard-65feeb {
        more_set_headers 'Content-Type: text/plain; charset=utf-8';
        return 429 "System is busy, please try it later.";
      }
      ###ERDA-AUTO-CONFIG###
    # 会在对应的 location{} 下添加以下 nginx 配置片段
    nginx.ingress.kubernetes.io/configuration-snippet: |
      ###ERDA-AUTO-CONFIG###
      limit_req zone=server-guard-65feeb burst=5;
      limit_req_status 581;
      error_page 581 = @server-guard-65feeb;
      ###ERDA-AUTO-CONFIG###

spec:
  rules:
  - host: "foo.bar.com"
    http:
      paths:
      - path: "/bar"
        backend:
          service:
            name: bar
            port:
              number: 80
```
​

这段 Nginx 配置原理是，当拒绝请求时，先内部返回一个 581 状态码，通过 error_page 跳转到自定义的 named location，然后在 named location 内返回用户配置的拒绝状态码和拒绝应答 body。<br />​

因为 limit_req_zone 指令只能配置在 Nginx 的 http block 内，所以 Erda Cloud 除了更新对应的 Ingress Annotation，还需要更新对应的 Configmap nginx-configuration :<br />​<br />
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-configuration
  namespace: kube-system
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  http-snippet: |
    ###ERDA-AUTO-CONFIG###
    limit_req_zone 1 zone=server-guard-65feeb:1m rate=100r/s;
    ###ERDA-AUTO-CONFIG###
```
​

这些，Erda Cloud 生成的配置会被 ###ERDA-AUTO-CONFIG### 注释块包起来，在这些注释块之外，用户仍然可以添加自定义的配置项，并不会受 Erda Cloud 配置的影响。<br />​

基于这个例子，想必大家已经见识到了 Nginx 和 Ingress 结合起来的威力，基于 snippet 片段，可以将 Nginx 原生配置的能力，在 Ingress 上发挥得淋漓尽致。这也是云原生的魅力，将 Nginx 配置运维提升到了一个全新的层次，更好地解耦、更好地适配微服务架构。Erda Cloud 则更进一步，通过产品化封装，让这些配置对研发运维人员的心智成本要求降到更低。<br />​<br />
## 取 Kong 之长补 Ingress 之短
Nginx Ingress 虽然依托于 K8s Service 可以实现微服务发现和路由，但因为无法支持 HTTP Method 级别的路由控制，在微服务 API 管理上的能力是欠缺的。比如某服务只希望将一个特定的 API GET /api/assets/{assetID} 对外暴露，基于 Nginx Ingress 的路由机制是无法实现的。在 Erda Cloud 的云原生网关上，则可以很容易实现这个需求。<br />​

首先，在微服务 API 管理中给对应的服务添加要暴露的 API，如下图只暴露了一个 API GET /api/assets/{assetID} 。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/c1f31287-e802-4c4f-805a-02555374d91b.png)

然后再将指定域名的 URL 路由到这个微服务上，例如域名为 helloworld.erda.cloud，按照如下配置，当请求 helloworld.erda.cloud/api/example/assets/100 时，网关会将请求路径改写为 /api/assets/100 再转发给后端微服务。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/26725ef1-4c88-4727-82ac-f2f2ffb230c7.png)<br />
<br />这一功能是借助于 Kong 实现的。当用户创建微服务 API 时，会将微服务和 Kong 的 Route/Service 关联起来；当用户在特定域名上配置路由时，会创建一个转发到 Kong 的 Ingress：<br />​<br />
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /c517f0f2/api/assets$1
    nginx.ingress.kubernetes.io/upstream-vhost: dev.gateway.inner
    nginx.ingress.kubernetes.io/use-regex: "true"
  name: erda-route-ed71b6-6de9f1
  namespace: addon-kong-pb8210
spec:
  rules:
  - host: helloworld.erda.cloud
    http:
      paths:
      - backend:
          service:
            name: kong
            port:
              number: 8000
        path: /api/example/assets(.*)
        pathType: ImplementationSpecific
```
​

借助于 Kong 的能力，还补足了 Nginx Ingress 在认证鉴权能力上的欠缺，Kong 提供了丰富的 AuthN 插件，Erda Cloud 主要使用了 OAuth2 、Key Auth、HMAC Auth 这三个插件，可以在 Erda Cloud 中统一地管理各调用方对不同 AuthN 插件的调用凭证：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/d1d00859-b3d3-4ce0-b9d5-c9d1c86621ad.png)<br />​

可以将整个域名或者域名下的特定路由，授权给不同的调用方：<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/30c42030-8c0a-4a0b-8414-c29768591ef3.png)<br />​

API 的开放鉴权是企业做 API 管理的关键能力，Erda Cloud 希望能更好地满足这部分需求，让提供者更方便地开放 API；让调用方能自主申请调用，自动获取凭证和 SLA 配额限制；进而整体提升 API 管理的效率。Erda Cloud 基于此云原生网关能力，推出了面向 API 全生命周期管理的产品。<br />​<br />
# Erda Cloud API 管理产品
Erda Cloud API 管理产品由三个模块构成：API 设计中心、API 集市、API 访问管理。<br />
<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/c564a3f3-7c9e-4f3f-bfd0-a21d8a0b0d8a.png)<br />
<br />接口提供者在 API 设计中心进行接口设计，然后发布到 API 集市；接口调用方在 API 集市中寻找接口，申请调用凭证和 SLA 配额；接口提供者或者管理人员，在 API 访问管理中授权调用方访问，同时可以审计分析来自各个调用方的请求流量。<br />​<br />
## API 设计中心
市面上一些 API 设计产品，会要求用户充分了解 swagger 2.0/openapi 3.0 协议，要逐字地敲出一篇文档；另一些产品虽然支持以比较友好的方式设计 API，但没有采用标准协议，其输出的文档失去了通用性。<br />​

Erda Cloud API 设计中心基于可视化的编辑方式，通过直观而友好的交互界面，用户无需了解任何 REST API 规范标准，也无需具备任何关于 API 描述语言的知识，就可以轻松编写出一份具有专业水平的 API 文档。同时采用 openapi 3.0 协议标准，任何时候都可以交付、迁出文档，一次设计，随处使用；在其他平台托管的 API 文档、代码中生成的 swagger 文件等，也都能轻松迁移上来。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/522e9e38-caca-47f1-a6bd-a362bc9f0308.png)<br />​

Erda API 设计中心将 API 文档托管到代码仓库中，这一设计使得接口描述和接口实现代码关联在一起。开发人员进入代码仓库，选择对应的代码分支，维护接口文档，可以很好地保持文档和新开发功能的同步。这样的理念遵循了 GitOps 配置即代码的思想。<br />​

文档托管到仓库中，还意味着可以基于分支进行文档协作。不同用户编写同一篇文档时，只要从源分支切出新的分支，在新的分支上编辑文档，然后再进行分支的合并。同一服务不同接口的负责人，随时可以设计自己负责的接口，又随时合并回去，不会相互影响和阻塞。<br />​<br />
## API 集市
API 集市是 API 的门户，用来发布、归档、公开以及调试 API。API 提供者将设计好的文档发布到集市，以便后续管理、监控。API 使用者在 API 集市查阅、探索、调试、订阅 API。集市是 API 所有者和使用者完成“交易”的地方。<br />![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/61876ef9-34a7-4fa0-af9c-cb4e0aa3b8be.png)<br />​

API 集市使用了[语义化版本](https://link.zhihu.com/?target=https%3A//semver.org/lang/zh-CN/)机制来实现 API 文档的版本管理。版本号格式形如 major.minor.patch ，其中：<br />​<br />

- major 为主版本号，主版本号的变化通常表示发生了重大变更或不向下兼容的变更。
- minor 是次版本号，次版本号的变化通常表示增加了新特性，仍向下兼容。
- patch 是修订号，修订号的变化通常表示对现有版本作较小的、局部的修正。

​

除了语义化版本号外，还有一个称为“版本名称”的版本标记，它一般是有自解释性的单词或短语，表示当前文档版本的命名。版本名称与语义化版本号中的 major 是唯一对应的，版本名称可以视作是主版本号 major 的别名。比如 macOS 的某个版本号 Big Sur 11.2.2 ，其中“Big Sur” 是操作系统的版本名，“11”是该版本名对应的主版本号，2.2 分别是次版本号和修订号。这样版本化管理的好处是，将 API 文档的增长与应用程序的增长一视同仁，可以从 API 的角度审视应用程序的功能。版本号解释了服务更迭间的兼容性和依赖关系，不管是所有者还是使用者，都能根据版本号语义清晰地了解服务的变更情况。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/a0c82fce-04a2-4bac-ab61-19c3ffa030d9.png)<br />​

API 资源可以关联到 Erda Cloud 上具体的服务实例地址。通过这样的关联，API 提供方可以进一步实现 API 的访问管理，调用方也就可以在 API 集市中申请调用并测试接口。<br />​<br />
## API 访问管理
API 访问管理是指在向外部开放接口时，对被调用的 API 进行管理、保护和审计。向外开放 API 时，往往需要鉴别、约束以及审计客户端行为，此时就要为 API 资源创建访问管理。访问管理的具体手段是客户端认证鉴权和 SLA 配额管理。<br />​

API 提供者在集市中将 API 资源与 Erda Cloud 上具体的服务实例地址关联之后，再为 API 资源创建访问管理，调用者就可以在 API 集市中申请调用该 API；提供者收到调用申请后进行审批，为客户端设置 SLA 配额；获批的客户端获得访问资质，就可以从外部访问接口了。此后，调用方还可以在访问管理中切换 API 版本，将请求转发到不同版本对应的服务实例上，从而在客户不感知的情况下进行 API 版本的升级或回滚。<br />​

API 访问管理的功能都是基于 Erda 云原生网关产品的能力实现的，相比直接使用网关的配置能力，使用 API 访问管理简化了很多 —— 用户仅仅跟 API 打交道。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/5c5af7bf-429e-4881-9041-3260d0290ef4.png)调用量审计分析<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/8da840ca-8c92-4680-8f86-5605cbf322dc.png)调用方申请 API
## API 全生命周期管理最佳实践
基于 Erda Cloud 的 API 管理产品，可以实现 API 全生命周期管理的最佳实践。如下图所示，可以分别从 API 的提供者和调用方两个视角来看看待。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/9d9dc15f-ddfe-4800-9031-2edf6aae286d.png)

**从 API 提供者的视角来看**：首先需要跟随服务功能变更，及时更新 API 设计中心的文档，因为文档也基于代码仓库管理，可以通过 code review 的方式确保 API 文档的及时同步。在开发联调阶段，API 提供者可以将 API 文档发布到集市，依赖此接口的其他模块功能就可以并行开发。如果有 API 对外开放的需求，API 提供者就为对应的 API 资源设置访问管理功能，在访问管理控制台可以实时观测外部的调用流量。<br />​

**从 API 调用方的视角来看**：如果是测试工程师，应该基于开发人员提供的 API 文档，进行自动化接口测试用例的设计，而不是维护一份测试专用的接口文档。如果是外部集成方，通过 API 集市去发现所需的功能接口，申请调用成功后，应该在 API 集市进行简单的接口访问测试，确认功能符合预期；然后根据 API 文档进行集成模块的代码编写、部署；最后可以在 “我的访问” 中查看调用流量。<br />​

软件在自己的生命周期里不断迭代变化，API 也是一样。无论 API 提供者还是调用方，都要重视 API 迭代的影响。提供方要严格遵循 API 集市的语义化版本机制，当出现 Breaking Change 时，应该为新的 Major 版本创建独立的访问管理入口，并将旧版本标记弃用，引导调用方使用新的版本；调用方应该及时关注订阅通知，了解所使用 API 文档的最新版本情况。<br />​

Erda Cloud 的 DevOps 功能提供了云原生场景下 CI/CD 能力，应该把 API 管理也视作 CI/CD 的一部分。可以使用 Erda Cloud 的自动化测试平台，对接 API 集市，在 CI 流程中加入自动化接口测试；可以使用 Erda 的流水线扩展，在 CD 流程后自动发布 API 版本，并自动关联上服务的 K8s Service 地址。<br />​

Erda Cloud 为企业基于云原生进行系统架构提供了一站式服务，Erda Cloud 的 API 管理亦是在云原生的土壤上自然生长出的产品。API 全生命周期管理作为企业数字化的关键一环，企业如果采用云原生的架构，一定要选择与之契合的 API 管理产品，否则可能导致适配成本的增加和管理效率的低下。<br />​

欢迎从我们的官网 [erda.cloud](https://link.zhihu.com/?target=https%3A//www.erda.cloud/) 了解更多关于 Erda Cloud 产品的最新资讯。也欢迎关注我们的 [Github repo](https://link.zhihu.com/?target=https%3A//github.com/erda-project/erda)，我们的代码已经全部开源，期待你的 star ~~~<br />​<br />
# 欢迎参与开源
Erda 作为开源的一站式云原生 PaaS 平台，具备 DevOps、微服务观测治理、多云管理以及快数据治理等平台级能力。**点击下方链接即可参与开源**，和众多开发者一起探讨、交流，共建开源社区。**欢迎大家关注、贡献代码和 Star！**<br />**​**<br />

- **Erda Github 地址：**[_https://github.com/erda-project/erda_](https://github.com/erda-project/erda)
- **Erda Cloud 官网：**[_https://www.erda.cloud/_](https://www.erda.cloud/)
