# API 驱动开发
## API First 原则
API First 原则即优先设计和完成 API，随后再安排其他事项，其主要优势如下：

### 优先业务逻辑
进行 API 设计前必须清楚梳理业务逻辑，并明确功能边界和数据交互格式。

微服务架构要求服务单元功能内聚、职责单一，此类要求均可在 API 设计阶段作出清晰界定。高度抽象的 API 有利于刻画功能框架，从而避免过早陷入繁复的设计之中。

相比功能设计文档，规范的 API 文档显得更为清晰、更便于维护。API 定义中的结构化数据格式可直接用于后续的功能实现及场景测试。

### 提升敏捷协同
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/27/829372ab-1ac2-4bbe-ab69-c239d530e0b4.png)
参与项目研发的前后端工程师、测试工程师均可基于 API 开展各自的工作。

* **前端工程师**：使用 API 完成界面呈现和交互。
* **后端工程师**：实现 API 功能并完成自测。
* **测试工程师**：基于 API 完成接口测试场景设计。

一致的 API 可解偶依赖，有效协同各方工作，从而实现并行开发。

微服务开发同样提倡 API First 原则，优先完成不同模块的 API 设计，确定功能边界并避免循环依赖，随后开发工程师再完成各自负责模块的功能逻辑实现。

## API 开发测试
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/27/54c615f0-880a-4349-a24d-e4216a6b7425.png)
## API 提供者
API 提供者的工作流程主要包括：设计 > 发布 > 自测 > 缺陷修复。

### API 设计
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/17/b89cce49-3ca3-4e6b-b49f-1a67df1879ad.png)

平台基于 OpenAPI 3.0 标准协议，并通过可视化界面支持 API 编辑，同时实践 RESTful 规范，从而轻松完成 API 设计。

平台遵循配置即代码的 GitOps 理念，在可视化编辑的同时，API 文档将自动保存至 Git 仓库，便于后续跟踪修改，并支持快速回滚。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/17/c1838049-7a87-4eb7-a8b5-c6340a0ecddd.png)

### API 发布并自测
完成 API 开发后，您可将 API 直接 [发布至集市](../../msp/practice/apigw/apim.html#发布到集市)，随后创建 [访问管理](../../msp/practice/apigw/apim.html#访问管理) 并进行 API 测试。

## API 调用方
API 调用方的工作流程主要包括：查阅 > 调用 > 联调 > 缺陷修复。

调用方可进入 **DevOps 平台 > API 管理 > API 集市** 查看已发布的 API 文档，点击 **申请调用** 获取客户端的 ClientID 和 ClientSecret，随后完成调用端编码。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/17/0aa945ea-c895-4357-bc29-6b8bd703af32.png)

若联调测试过程中 API 调用报错，需注意 API 定义是否发生变化，可通过 Git History 进行排查 。

## API 自动化测试
测试工程师通过 API 完成接口测试的流程主要包括：查阅 > 设计接口测试场景 > 执行测试 > 提交缺陷。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/17/6160b9ba-06dc-4beb-bfa5-16280853313b.png)

设计测试用例场景时可直接搜索 API 市场，获取接口定义。

## 运行期管理
完成开发测试进入生产运行后，建议重新发布一份 API 文档并绑定生产环境的应用实例，随后授权客户端进行访问。

::: tip 提示

后续迭代将持续优化 API 文档与多个运行环境的关联关系。

:::

### API 版本演进
#### 语义化版本
平台采用 [语义化版本](https://semver.org/lang/zh-CN/) 机制以实现 API 文档的版本管理。版本号格式形如 major.minor.patch。

* major 为主版本号，其变化通常表示发生了重大或不向下兼容的变更。
* minor 为次版本号，其变化通常表示增加了新特性，仍向下兼容。
* patch 为修订号，其变化通常表示对现有版本作较小的、局部的修正。

版本化管理的优势在于将 API 文档的增长与应用程序的增长一视同仁，可从 API 角度审视应用程序的功能。版本号用于解释服务更迭间的兼容性和依赖关系，无论提供者抑或调用方，均可根据版本号语义清晰了解服务的变更情况。

#### 代码兼容性
major.minor.patch 版本中 minor 和 patch 版本提升时，所有的 API 必须保持向下兼容。

若 major 版本提升，需确保不兼容的 API 调用方已完成适配。建议通过新增 API 实现新功能，保留旧 API 并通知调用方切换至新接口，直至所有调用方均已完成切换后再行下线。

### API 安全
* Open API 

  通过 API 网关对公网开放，并在网关上对调用者设置 **认证通过+授权许可** 进行管控。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/17/d2640856-da28-4d99-886d-3531a086cb18.png)

  推荐使用 ClientID 和 ClientSecret 签名方式，并配置每秒请求次数的调用量限制，以保证安全稳定。

  ::: tip 提示

  您也可以进入**DevOps 平台 > API 管理 > 访问管理** 完成调用方管理。

  :::

* 域名管控

  后端服务需避免配置域名直接对公网开放。测试 API 可使用内部地址而非公网域名。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/17/9439ec5b-adfe-470e-b461-a7671d7c4d79.png)