# 接口测试【deprecating】

## 接口测试介绍

### 什么是接口测试？

接口测试是测试系统组件间接口的一种测试，主要用于测试系统与外部其他系统之间的接口，以及系统内部各个子模块之间的接口。测试的重点是要检查接口参数传递的正确性，接口功能实现的正确性，输出结果的正确性，以及对各种异常情况的容错处理的完整性和合理性。

### 为什么要做接口测试？

* 越底层发现 bug ，它的修复成本是越低的。
* 前端随便变，接口测好了，后端不用变，前后端是两拨人开发的。
* 检查系统的安全性、稳定性，前端传参不可信，比如京东购物，前端价格不可能传入 -1 元，但是通过接口可以传入 -1 元。
* 如今的系统复杂度不断上升，传统的测试方法成本急剧增加且测试效率大幅下降，接口测试可以提供这种情况下的解决方案。
* 接口测试相对容易实现自动化持续集成，且相对UI自动化也比较稳定，可以减少人工回归测试人力成本与时间，缩短测试周期，支持后端快速发版需求。接口持续集成是为什么能低成本高收益的根源。
* 现在很多系统前后端架构是分离的，从安全层面来说：
    + 只依赖前端进行限制已经完全不能满足系统的安全要求（绕过前面实在太容易）， 需要后端同样进行控制，在这种情况下就需要从接口层面进行验证。
    + 前后端传输、日志打印等信息是否加密传输也是需要验证的，特别是涉及到用户的隐私信息，如身份证，银行卡等。

### 怎样做接口测试？

　　一般情况下，由于项目前后调用主要是基于http协议的接口，所以测试接口时主要是通过工具或代码模拟http请求的发送和接收。 接口测试用例设计的整体方案：
+ 第一步：分析出测试需求，并拿到开发提供的接口说明文档；
+ 第二步：从接口说明文档中整理出接口测试用例场景和具体 API，API 要包括详细的入参和出参数据以及明确的格式和检查点，并将数据录入平台
+ 第三步：和开发一起对接口测试用例进行评审；
+ 第四步：准备接口测试数据、配置环境变量、根据接口测试用例设计、调试单接口、调试场景用例；
+ 第五步：接口调试通过后加入测试计划中批量执行用例、跟踪测试结果。

### 接口自动化适用场景

* 需求稳定
* 项目周期长
* 新的项目，先手工测试，然后逐渐开始自动化测试
* 回归测试

## 快速上手

### 创建第一个 API

在新增测试用例页面中，添加接口并按照页面规范填写接口名称、路径和参数信息即可，具体填写的参数本文下面章节会详细介绍。

平台页面入口：

> DevOps 平台 -> 我的项目 -> 项目详情 -> 测试管理 -> 测试用例

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/15/2a58ba02-1268-4c5b-a17b-875c4a3d6709.png)

### 接口设置

新建测试用例后，在测试用例中可以完成接口的基本设置和请求参数的设置，详细的接口设置内容请参考下面的接口设置。

#### 基本设置

* 接口路径：可以更改 HTTP 请求方式，并且支持 restful 动态路由，例如 /api/{id}/{name}, id 和 name 是动态参数

#### 请求参数设置

- Params
- Headers
- Body

#### 出参和断言设置

- Tests

具体一个 post 请求使用示例：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/ebce24a7-3345-4fa0-90b7-f07c62ef428d.png)

出参和断言设置示例：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/227edc2f-34b6-4e85-8622-0b403d6f4852.png)

如果多接口中使用的共同的域名、Header 信息、使用相同的全局参数，可以通过项目环境配置添加全局环境配置，具体参考[环境配置](./interface-test.html#环境配置)。

#### 接口运行

如果参数设置中使用了环境配置变量，需要选择对应的环境后才能执行测试。
没有使用环境配置变量的，可直接点击执行按钮进行测试。

测试结果可查看请求执行的 request、 response 和断言结果，如不符合预期结果，可通过调整接口或者修改断言的方式来调整。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/16aebd38-7e24-472e-9043-628a61b5028d.png)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/1110522a-7bde-4110-922b-29e14d7e3b86.png)

## 进阶篇

### 场景接口测试

场景接口测试的时候会涉及多个接口的一起测试，需要在测试用例中先有序加入相关接口信息。
:::tip
用例中的接口采用串行执行的方式，所以需要注意接口顺序
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/e900fcfd-8e8e-43e2-8d79-2d096e1b3c1f.png)

### 登录保持设置

+ 登录接口的 Response 中有 Set-cookie ，该接口的 Set-cookie 自动带入后面 API 的请求头中
+ 不使用登录接口实现登录保持的，也可以通过全局环境变量、用例环境变量或接口中配置 cookie 实现登录保持

示例：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/dda751d7-6116-463a-83de-f2d825da9619.png)

### 上下文参数使用
示例：创建采购需求(接口返回一个需求 ID ) -> 提交需求（使用创建需求返回的 ID ）

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/cb651d62-4674-484a-8a24-3c00bf8a2d8a.png)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/c55e5328-b151-42a0-8e7a-f2cce2ac5960.png)

### 用例接口调试

+ 单接口调试，调试通过之后执行用例调试（检查请求的 request、response、出参和断言设置）
+ 点击用例最上方的执行按钮、执行用例调试

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/d754f141-2e1e-4942-9607-3eb27bda8c80.png)

* 创建测试计划、将已经调试通过的用例引入到对应的测试计划

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/44f24309-efda-492e-8dba-ef91396c0e96.png)

* 点击测试计划中的执行接口测试选择对应的环境、执行测试
* 查看测试报告和测试详情

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/bcd73e24-ef06-48c3-b448-c15e7dc53e33.png)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/21/10502bf4-74ab-419f-98d5-4276eeadf4ec.png)

## 环境配置

项目设置-环境配置中可以添加该项目下接口的实际环境、供接口测试使用，环境配置中支持全局域名、Header、参数配置，在用例执行测试时可选择已配置环境执行

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/171bbaf1-de70-4cf3-9876-4c15a3293f0e.png)

参数配置支持数据类型

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/f2665c86-a5c7-4f5a-8e4b-f80b9327d753.png)

## 接口设置

### 基本设置
::: v-pre 
* 接口路径：支持填写带有域名的 URL 、域名优先级高于环境配置、也可以选择已配置环境执行（域名从环境配置中读取），支持动态参数，使用示例： /api/projects/{{projectId}} 
:::

### 请求参数设置
::: v-pre
* Query 参数：Params 中添加参数、支持动态参数：环境配置中的全局环境变量、上下文参数，使用示例：/api/applications?appId={{appId}}
::: 

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/eba8b8b6-9c7c-41db-958e-a0c94bd1c902.png)

* Headers：请求头，在 request body 形式是 application/json 请求时 header 中自动带上 'Content-Type application/json'请求头；
支持动态配置、API中填写和环境配置相同key的参数时API的优先级最高、其次是用例环境变量、环境配置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/ecac7f1d-bf0b-4f17-a81d-b62060afec62.png)

* 请求Body：http 请求 body 部分，如果http请求方式是 post, put 等请求方式时会有 request body 部分。形式支持两种： x-www-form-urlencoded 和 raw(application/json) 。
body 中使用环境变量或上下文参数方式、使用示例：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/0c20e91e-a52f-474c-b999-6854e8b64d4c.png)

### 出参 & 断言设置
API 执行结果返回的 Response，出参是从当前请求的 Response 中截取需要的内容，该参数可以在该用例后面的API请求中作为参数使用，在一个 API 中可以定义多个出参。
参数解析支持状态响应码，Header:K/V，Body:JSON(body) 三种形式。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/83f831a5-de2e-4078-8050-fd9a234cdb1b.png)

#### 出参说明：
* 出参名：只能包含英文字母、数字和下划线。
* 来源： 
      + Body：JSON ：以 JSON 格式解析 Response Body
      + Header：K/V ：以键值对格式解析 Response Header
      + 响应状态码 ：提取 Response 中的状态码
* 解析表达式：从 Response 截取需要的内容，对应到当前变量。例如：data.items[0].id

#### 断言说明：
断言用于从业务维度判断请求是否成功。
将某个出参的临界值定义为业务异常判断标准，类似检查点，格式为: Key + Value + Description，
检查点可分为响应状态码、响应 Header、响应 Body 3 种类型。
多个断言之间是"且"关系。支持形式如下：

* 大于、大于等于、小于、小于等于: 支持整数，小数。
* 等于、不等于: 支持整数，小数，字符串，对象(数组，Map)。
* 包含、不包含: 支持字符串和正则匹配。
* 为空、不为空: 支持判断数组，Map，字符串是否为空。
* 存在、不存在: 判断出参是否存在。出参为 Response 的 Key。
* 属于、不属于: 支持正负整数、0、字符串。
    + 数值：请按照标准的数学表达式规范填写。示例如下：
        区间支持开区间和闭区间、示例闭区间：[-20,20]
        表示集合：{[-200,200],-1,2}
    + 字符串仅支持集合、示例：{“abc”,”bcd”,”200”,”-200”,”已报名”,”报名成功”}

### 接口调试
#### 单条api调试
* API添加、填写好参数配置、依赖上下文参数暂时无法获取到的先填写固定值调试、调试通过后改为动态参数、点击右上角选择环境执行进行单条 API 的调试

#### 上下文接口调试
::: v-pre 
* 用例场景的 API 填写好，点击用例最上方执行按钮选择环境执行（直接点击按钮是不使用任何环境配置执行）
* 上下文参数使用：前面的 API 出参定义的参数，在后面的API 的 Header、Params、 Body 中都可以使用，示例：{{projectId}}
* 全局环境变量使用： 环境配置中配置的全局环境变量，在API 的 Header、 Params、 Body 中都可以使用，示例：{{projectId}}
* 用例环境变量使用： 用例环境变量中配置的参数，在API 的 Header、 Params、 Body 中都可以使用，示例：{{projectId}}
:::

#### 批量执行
* 测试计划中引入接口测试用例、点击执行接口测试、选择环境执行

## 登录保持
* 环境配置在 Header 中配置全局 Cookie，用例选择该环境执行的时候、请求自动带上该 Cookie
* 用例环境变量配置在 Header 中配置用例 Cookie，用例执行的时候、用例下的 API 请求自动带上该 Cookie，优先级高于项目环境配置中的配置
* 单条API 在 Header 中配置 cookie，API 执行的时候、请求自动带上该 Cookie，优先级高于用例环境变量配置和项目环境配置中的配置
* 支持一条测试用例中的 Cookie 上下文自动传递，用例中录入了登录接口，Response 中有 Set-cookie ，上个接口的 Set-cookie 自动带入后面 API 的请求头中

## mock 参数
参数的随机生成，支持在 Query 参数和 Request body 中使用、使用示例: 

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/d115acc4-be27-4b20-afbd-06672868e58c.png)

* string: 所有字符串，如: Abc,
* integer: 整型，如: 100
* float: 浮点型，如: 13.14
* boolean: 布尔型，如: true/false
* upper: 大写字母，如: ABC
* lower: 小写字母，如: abc
* mobile: 11位手机号，如: 18888888888
* digital_letters: 数字和大小写字母，如: Abc123
* letters: 大小写字母，如: Abc
* character: 单个字符，如: a
* timestamp: 当前时间戳格式：1586917254，单位是s
* timestamp_hour: 1小时前时间戳格式：1583317290，单位是s
* timestamp_ns: 当前时间戳ns格式：1586917325230422166，单位是ns
* timestamp_ns_hour: 1小时前时间戳格式：1586913750801408626，单位是ns
* date: 当前日期、格式：2020-01-01
* date_day: 1天前日期、格式：2020-01-01
* datetime: 当前时间、格式：2020-01-01 15:04:05
* datetime_hour: 1小时前时间、格式：2020-01-01 14:04:05


## 自动化测试

### 测试用例录入
接口测试用例场景设计，根据场景录入 API，单条 API 调试通过后执行单条用例调试（上下文参数只限在当前单条用例中使用）

### 测试计划创建
执行计划中创建对应的测试计划

### 添加、引入测试用例
测试计划中新增或引入已经调试好的接口用例

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/331be6bc-67cb-4309-bf4e-5181721177ab.png)

### 执行测试
* 选择执行：勾选需要执行的用例、选择环境、执行接口测试
* 全部执行：选择环境、执行接口测试、默认执行测试计划中全部用例


### 测试记录（进度、日志）查看
接口测试记录中查看当前接口测试执行进度

### 测试报告查看分析
生成测试报告，填写测试总结；
测试用例列表中查看单条用例对应的测试通过率，用例详情中可查看 API 测试详情：Request（URL、Params、Headers、Body） 和 Response（Headers、Body）

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/e927e0f0-6a34-4283-b4b3-0fc6f94a8c66.png)



