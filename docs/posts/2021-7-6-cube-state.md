---
title: 灵魂拷问：我们该如何写一个适合自己的状态管理库？
author: 李骏（涅尘）
date: 2021-07-06
category: frontend
---

## 引言
大家好，这里是  [Erda 开源项目](https://github.com/erda-project/erda) 前端技术团队，今天聊一聊前端的状态管理。

说到状态管理库，想必前端同学随口都能说出好几个来，社区里的轮子一个接一个数不胜数。今天不是讲某个库的技术细节，而是跟大家聊一聊实现一个状态管理库的过程，以及我在这个过程中的一些思考。

## 背景
Erda 项目的前端状态管理，从最开始的 redux，到 dva，再到现在的  [cube-state](https://github.com/daskyrk/cube-state) ，也在逐渐跟着社区的趋势发展。redux 就不说了，dva 在我看来是一个优秀的库，设计思想挺符合个人口味。之所以会抛弃它转为自研的状态管理库，是由于 dva 是基于 redux 做的封装，而 redux 的字符串匹配形式的 dispatch action，天然就很难支持类型。在项目发展到几百个页面，近 2000 文件时，**如果没有完整可靠的类型定义，对于后面的开发维护绝对是一场灾难**。

举个栗子，dva 中一个常见的 reducer 长这样：

`dispatch({ type: ‘products/delete’, payload: id });`

灵魂拷问来了：

* 怎么确定 type 没写错呢？
* 怎么知道 products 下的 delete 这个 reducer 是否还存在呢？
* 怎么知道 payload 这个数据的类型是匹配 reducer 的呢？
* connect 到组件的数据怎么知道是符合组件需要的类型呢？

## 目标
因为上述问题在没有类型定义时无解，且对于废弃代码不敢删除，担心哪里还在用，所以当时我们迫切地想找一个支持类型定义的状态管理库，同时为了避免改造太大影响正常业务开发，需要能平滑渐进地改造。

我们的目标很明确：

* 有完整的类型定义链路，从 API 获取数据 -> 数据放入 store -> 组件从 store 取数据 -> 组件调用 store 的 effect 或 reducer，整个链路都有类型。
* 兼容 dva，做渐进式改造，最好架构和 API 也很像，没有额外的学习成本。
* 易于扩展，把项目相关的逻辑放在扩展中，保持库本身简单可靠。

## 过程
### 探索开源库
当时调研了许多库，但基本没有支持完整的类型定义链路，或者要切换到另一个体系上，改造难度很大，业务上的风险太高。我们也想过不如自研一个轮子，但在尝试过程中遇到些问题没解决，直到某一天发现了 stamen 这个库，里面利用 React Hooks 做监听和取消监听的方式启发了我们。

![stamen 架构图](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/aa03084a-eaef-401f-8307-4f38b926dfc5.png)

上图是 stamen 仓库中的架构图，可以看到结构和 dva 很相似，每个 store 里分 state、effects、reducers 三部分，通过 hooks 方式调用，在组件 mount 的时候注册 state 的监听，unmount 时移除监听。因为 hooks 就是普通的函数，很容易定义类型，对 Typescript 非常友好。所以 store 里的 state 结构类型、effects 和 reducers 函数的类型都可以很容易的获取到，如果组件也是函数形式，那整个类型链路就已经通了。

为什么我们没有直接用，而是基于这个又做了改造呢？因为在我们项目中基于 dva 做了一些增强功能，stamen 无法满足，同时这些逻辑并不适用于每个团队，所以不适合放在别人的库中。

无法满足的有以下几点：

* 没有 key 或 name 属性，必须具名引入，某些场景下不方便。
* 没有提供类似 dva 里的 subscriptions 能力，而路由监听是我们项目里很常用的功能。
* 使用 dispatch(“action”, payload) 的形式其实 payload 类型是确定不了的，造成链路类型中断，而且不如直接调用 effect 或 reducer 直观方便。
* 不支持在 effect 和 reducer 的前后加钩子函数，所以也没法支持中间件，比如 loading。
* 不支持对 store 做扩展，比如加一个自定义字段，或者对 effect 做些定制增强。
* 没有提供 state 的类型和类组件配合使用，类组件的 props 类型需要重新定义一遍。


### 基于开源改造

因此，在 stamen 的实现思想上，我们结合自身项目需要做了改造。

首先，结构和 API 上向 dva 靠拢，添加 name、subscriptions 字段，name 的作用后文会讲到，加了 subscriptions 后可以把路由监听、ws 连接等放在这里面，例如我们项目中常见的路由监听：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/7d745737-7e92-4a21-8a87-7760f2e18c01.png)

API 上，dva 把 payload 放在第一个参数里，把 call、put 等方法放在第二个参数里，这样限制了只能把所有数据都放在 payload 中传递，但有些其实可能不是接口需要的数据，比如 API 路径参数、特殊逻辑标记等，透传时还需要抽离出来会比较麻烦，如下图所示：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/ebadfff4-fa59-4db0-afbf-af63a0bcba99.png)

所以在 cube-state 中，我们把 call、select 等方法放在了第一个参数，第二个参数是 payload，后面还可以继续传其他参数，但调用时还是普通的形式，如下图所示：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/92290238-50a8-4960-8b6e-d55f2c7e109d.png)

然后，我们从 dispatch 方式改造为能够直接调用的形式，比如 countStore.effects.addLater(payload)，这样类型定义就完美了，执行的地方必须传入 effect 定义的类型，而且 effect 内部也能直接调用 store 自身的 reducer。同时为了方便调用，我们还支持了展平形式的创建方式，把 effects 和 reducers 作为根属性，即 countStore.addLater(payload) 的形式。

接着，我们添加了 effect 和 reducer 的 hook，支持在前后执行一些逻辑，由此能够支持中间件系统。比如 loading 中间件，就是在每个 effect 执行前后自动更新 loadingStore 里的状态。这里就用到了 store 的 name 字段。
![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/ed35b806-b79f-460a-9ee7-f4895743a862.png)


接下来，支持 store 的扩展。这个是为了支持一些自定义的逻辑，在我们项目中，前后端对于请求返回结构做了如下封装：
```json
{
  success: true,
  data: {},
  err: {}
}
```

一般只需要处理 data 字段，如果每个 effect 都从结构体里提取 data 会有很多冗余代码，最好在调用 service 过程中默认处理掉。因此支持了 extendEffect 用来扩展或覆写默认提供的 effet 第一个参数，比如我们项目中扩展了 getParams、getQuery 两个方法，覆盖了原有的 call 方法，在内部处理请求返回结构体，以及做提示的一些逻辑。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/4d7c8a91-3ac1-402e-aa49-1ec60bfcc3d6.png)

扩展后可以在 effect 中方便地获取路径参数、query 参数，以及一些成功、错误提示，比如下图中，获取路径上的 appId 作为请求参数，请求成功后给用户提示：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/69e9aecf-61e4-4882-ba87-33c0e12ed135.png)

最后，把 state 类型暴露出来，在和类组件配合时不用再定义一遍：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/76d29059-f074-41f8-958a-95d77eab3e22.png)

至此，大致结构就已经差不多了，后面增加的基本是一些深入配合具体业务场景的需求，比如支持基于一个 store 扩展另一个 store，支持全局单例模式等等。整体的架构图如下所示：

![cube-state 架构图](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/f23bca67-6273-423a-89df-6d580c5d21ca.png)

### 完善测试及文档
做一个稳定可靠的库，一方面是尽量简单，另一方面测试用例是必不可少的，所以我们也补充了比较全面的测试，基本覆盖到了每一个逻辑。并且，在后来发现 bug 时，我们也不断补充新的测试用例，这块是另一个话题，此处暂不细讲。

至于文档，因为本身很简单， 总共没几个 API，所以直接放在 README 里了。文档中提供了基础、进阶用法说明，也提供了在线 demo 供体验。

## 结语
在 cube-state 初版完成后，我们就逐渐开始在项目中做迁移改造，因为用法类似，除了补充大量的类型定义外，很多时候是比较机械的劳动。在打通了类型定义的完整链路后，项目的开发维护终于不再像以前那样，唯恐牵一发而动全身，能够避免很多因类型导致的错误。

当然现在也依然有些问题没有解决，比如扩展的 getParams 等方法没有类型定义，必须直接用 createStore 方法包装源对象的方式在某些场景下不适合等，我们也希望后面能逐渐解决这些问题，或者找到更好的升级方案。

后来也看到一些很简单优秀并且很相似的库，不过**只有自己才知道自己的项目适合什么**，这不是为了造轮子而造轮子，而是为了更好地支持项目的开发维护。所以，我们不做无意义的事。

之前听玉伯在分享时提到：其实在前端领域，还有很多基础的东西有待深入去做，比如像 webpack 这种打包工具，虽然已经很完善了，但臃肿难用的问题很难解决，如果谁能继续去“造轮子”，过程中探索出不一样的路，就是很有意义的。最后，愿各位在前端之路上，也能探索出自己的精彩。

## 欢迎参与开源
Erda 作为开源的一站式云原生 PaaS 平台，具备 DevOps、微服务观测治理、多云管理以及快数据治理等平台级能力。
点击下方链接即可参与开源 ，和众多开发者一起探讨、交流，共建开源社区。 欢迎大家关注、贡献代码和 Star！


* Erda Github 地址：[https://github.com/erda-project/erda](https://github.com/erda-project/erda)

* Erda Cloud 官网：[https://www.erda.cloud/](https://www.erda.cloud/)

