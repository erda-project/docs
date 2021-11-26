# 接入 API 全生命周期管理


## API 设计

在 Erda API 设计中心，您可以几乎零成本地学习 API 文档设计。

平台提供可视化的编辑方式，以直观而友好的交互界面帮助您轻松编写出一份具有专业水准的 API 文档，且无需了解 REST API 规范标准或 API 描述语言。

设计中心兼容标准的 OAS 协议，在其他平台托管的 API 文档、代码中生成的 Swagger 文件等，均可轻松迁移至 Erda。API 设计中心输出的文档符合 OAS 3.0 协议标准，随时可交付、迁出文档，一次设计，多次使用。

Erda API 设计中心将 API 文档托管于代码仓库中，这一设计将接口描述与接口实现紧密地绑定在一起。
```json
// API 文档保存到 .erda/apidocs 目录下
// 非侵入式目录, 不影响仓库目录主要结构
// 如果应用下有多个微服务, 文档按服务名命名

root_from_repo
    ├── .erda
    │   ├── apidocs
    │   │   ├── {micro_service_a}.yaml
    │   │   ├── {micro_service_b}.yaml
    │   │   └── {micro_service_c}.yaml
    │   │
    │   ├── migrations
    │   └── pipelines
    │
    ├── other_files
    └── other_dirs
```

进入 **DevOps 平台 > 我的应用 > 选择应用 > API 设计**，通过目录树控件可展开应用下所有分支，打开任意文档开始编辑。若仓库当前暂无文档，可在有权限的分支下新建文档。

同一时间下，平台仅允许一名用户对同一篇文档进行编辑。若他人正在编辑某一篇文档，打开该文档将提示文档已被锁定。

文档在编辑过程中将自动保存。若出现意外中断编辑，平台将自动提交此前保存的文档至 Git 仓库中。用户也可手动保存文档，保存成功后将自动退出编辑状态。如需再次编辑，可点击 **编辑** 进入编辑状态。

完成文档设计后，可将文档发布至 API 集市。

### API 文档结构
当前最流行的 API 文档标准为 OAS，主要有 Swagger 2.0 和 OpenAPI 3.0 两个版本，即 OAS2 和 [OAS3](https://spec.openapis.org/oas/v3.0.3)。API 设计中心输出的文档采用 OpenAPI 3.0 协议，API 集市则同时支持 Swagger 2.0 和 OpenAPI 3.0。

在 API 设计中心，一篇文档主要由三部分组成：概况、接口列表和数据类型列表。

* 概况包含当前文档名称、版本名称、基本介绍等内容。

* 接口列表由一系列 PathItem 组成，每个 URL 确定一个 PathItem。单个 PathItem 下可添加 7 种 HTTP 方法：GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH。

  URL + HTTP Method 确定一个接口，又称为 Operation。一个接口一般由 Summary、Parameters、Headers、Body 和 Response 组成。

  * Summary 包含接口名称、描述等基本信息。
  * Parameters 表示 Query Parameters，即跟在 URL 后以“&”连接的“key=value”的键值对列表。
  * Headers 表示请求的 Header，同样为键值对列表。
  * Body 代表请求体，GET 和 HEAD Operation 无请求体。
  * Response 包含响应体信息。

* 数据类型列表由一系列自定义数据类型组成，可在此定义数据类型，并在接口设计时进行引用。预定义的类型有 String、Number、Boolean、Array、Object 五类，所有的自定义类型均由这五种预定义类型复合而成。

以上即一篇 API 文档的组织结构。

### API 设计操作
#### 进入编辑状态

点击 **新建文档**，选择对应分支并为文档命名。建议文档名称与文档所描述的服务名称保持一致。新建文档后将自动跳转至该文档的编辑页面，点击 **编辑** 进入编辑状态。您也可以从目录树控件中选择需编辑的分支文档。

#### 编辑 API 概况

在左侧目录栏中选择 **API 概况**，填写 API 名称（建议与文件名保持一致）、版本名称以及文档描述信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/955fa5c6-f3aa-438a-947f-3e34ed9f7e4a.png)

#### 定义数据模型

建议在定义接口前优先定义数据模型。

在左侧目录栏中选择 **数据类型**，根据提示添加数据类型，并填写参数名称、类型、描述等基本信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/bec6fe96-237a-4073-b616-69eda187120c.png)

#### 定义接口

在左侧目录栏中选择 **API 列表**，根据提示新建 URL 并填写 Path。URL 对应的结构被称为 PathItem。在 PathItem 中选择一个 HTTP 方法进行编辑。

##### 编写接口 Summary

接口也被称为 Operation，URL + HTTP Method 即可确定一个接口。选择接口的 Summary Tab，填写接口名称、分组、描述等信息。接口名称为选填项，若选择填写，需保证该名称在文档中的唯一性。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e3116213-d4a5-4075-a704-cbb1514f48c8.png)

##### 编写 Params、Headers

Params 和 Headers 都是键值对，可以在 Params tab 和 Headers tab 下添加其参数。

##### 编写 Request Body

GET 和 HEAD Method 均无 Request Body。对于有 Request Body 的方法，可在 Body Tab 下编辑。Body 通常为 Object 类型，其编写方式与定义数据类型相似。

##### 编写 Response Body

可在 Response Tab 下进行编辑。其编辑方式与编写 Request Body 相似。

##### 引用数据类型

定义接口的参数（Params、Headers、Body、Response 以及任意子字段）时，可自定义参数类型。若被引用类型的父类型为 Object，则可以在其基础上继续添加参数。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fe0ef856-6d2d-4633-9c97-545143847e85.png)

##### 导入参数

若数据库模型同样托管于仓库中，可导入与 API 文档同名的服务下的库表模型字段。添加参数时，选择导入参数，再选择需导入的模型及其字段即可。

##### 发布至集市

发布文档至集市前请先保存文档。

填写 API 名称、ID 和语义化版本号，将文档发布至集市，随后即可在集市中查看和管理已发布的文档。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d40a8ecf-d6b3-4d16-b0e2-5d9bc8a2aca8.png)


## API 集市

API 是服务对外提供能力的入口，API 集市可聚合服务的能力，在平台上统一展现，从而提升跨团队、跨组织之间共享通用的能力，改善产品研发效率，促进业务创新。

### 发布文档

#### 方法一：上传本地文件发布文档

进入 **DevOps 平台 > API 管理 > API 集市**，可查看 **我负责的** 和 **所有** 的 API 集市资源。点击 **新建资源** 即可上传本地 Swagger 2.0 或 OpenAPI 3.0 文档。

如需为已存在的 API 集市资源追加新版本的文档，可点击 **添加版本** 进行操作，或点击 **管理** 进入该 API 资源的管理页面，在 **版本管理** 中添加版本。

#### 方法二：通过流水线发布文档

通过 publish-api-asset action 将 API 文档发布至 API 集市。

| 参数名称    | 参数含义                                          | 是否必填 |
| :---------- | :------------------------------------------------ | :------- |
| display_name   |  API 文档的展现名称，未填写时使用 asset_id          | 否       |
| asset_id | API 文档的标识 ID | 是       |
| version |  API 资源版本，需遵循 X.Y.Z 的格式，未填写时自动生成             | 否       |
| spec_path |  API 描述文档的路径，eg:${git-checkout}/swagger.json              | 是       |
| runtime_id |  runtime_id 值，eg:${dice:OUTPUT:runtimeID}              | 是       |
| service_name |  服务名称，需与 erda.yml 中的名称保持一致          | 是       |

示例如下：

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: java-demo
          description: 代码仓库克隆
  - stage:
      - java:
          alias: build-java-demo
          description: 针对 java 工程的编译打包任务，产出可运行镜像
          version: "1.0"
          params:
            build_type: maven
            container_type: spring-boot
            jdk_version: "11"
            target: ./target/docker-java-app-example.jar
            workdir: ${java-demo}
  - stage:
      - release:
          alias: release-java-demo
          description: 用于打包完成时，向dicehub 提交完整可部署的dice.yml。
          params:
            dice_yml: ${java-demo}/dice.yml
            image:
              java-demo: ${build-java-demo:OUTPUT:image}
  - stage:
      - dice:
          alias: dice
          description: 用于部署应用服务
          params:
            release_id: ${release-java-demo:OUTPUT:releaseID}
  - stage:
    - publish-api-asset:
        params:
          display_name: 测试                     # API 资源名称
          asset_id: test                        # API 资源 ID
          spec_path: ${java-demo}/swagger.json  # API 文档所在的路径
          runtime_id: ${dice:OUTPUT:runtimeID}  # 用于将 API 资源与实例关联起来
          service_name: test-service            # 服务名称, 与 dice.yml 中一致
```

#### 方法三：在 API 设计中发布文档

请参见 [发布至集市](#发布至集市)。

### 查看文档

进入 **DevOps 平台 > API 管理 > API 集市**，点击列表中的任一条目进入该 API 文档的预览页面，在此可查看文档具体信息，包括每一个接口的描述细节，同时支持版本切换、接口搜索、文档下载等操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/34f45f91-aa45-40da-a05a-15185f36a036.png)

### 管理文档

进入 **DevOps 平台 > API 管理 > API 集市**，点击列表中任一条目的 **管理** 按钮即可进入该 API 资源的管理页面，在此可进行 API 资源信息编辑、将 API 资源设为公开或私有、删除 API 资源等操作。

通过 **关联关系**，可将 API 资源关联至具体的项目和应用。通过流水线和 API 设计中心发布的文档将自动关联项目和应用，通过本地文件发布的文档则需手动关联。完成项目和应用关联后，将自动获取对应的权限配置：

- 企业管理员、关联项目的管理员和关联应用的管理员拥有该 API 资源的管理权限。
- 关联项目的成员拥有查看权限。
- 所有项目成员均有公开 API 资源的查看权限。

在 **版本管理** 中，可为 API 资源增删版本、标记版本为"弃用"、导出某版本的文档等，也可将不同版本的文档关联至服务实例。这类关联属于 Minor 级别，即一个 Minor 版本关联至一个实例，表明该 Minor 版本下的文档是对该服务实例接口的描述。下文中的访问管理将依赖此关联关系。

## 访问管理

### 创建访问管理条目

进入 **DevOps 平台 > API 管理 > 访问管理**，即可查看访问管理列表。

如需对目标 API 资源及其关联实例进行访问管理，请先创建一个访问管理条目，点击 **创建** 按钮进行操作。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/bf408a13-fc08-4279-b819-a8f6fd6edca9.png)

- API 名称：API 资源名称。
- API 版本：API 版本名称，对应 Major 版本号。
- 资源版本：语义化版本号，仅精确至 Minor 版本号。
- 关联项目名称：该版本 API 文档关联的项目名称，不可修改。
- 绑定域名：该 API 文档及其关联实例需绑定的域名。域名格式为“服务名称.平台泛域名后缀”，其中服务名称可自定义，平台泛域名由平台定义。若服务名称为"my-website"，平台域名为 "terminus-org.app.terminus.io"，则绑定域名为"my-website.app.terminus.io"。
- API 网关：选择对应环境的 API 网关，若无 API 网关，将引导新建一个 API 网关。
- 鉴权方式：外部访问域名时的鉴权方式，支持 Key 认证和参数签名认证。
- 授权方式：访问服务需申请和授权，支持自动授权和手动授权。

完成信息填写后，即可创建该 API 版本及其实例的访问管理条目，并自动进入访问管理后台页（即详情页）。在详情页，可根据需要重新编辑其基本信息、删除该条目、查看流量概览等。

### 访问申请与审批

API 使用者可在 API 集市页或 API 资源详情页对 API 资源提出申请调用。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e36db9aa-1be3-4d49-9d87-deb0baec407f.png)

审批流程进入 API 访问管理后台，管理人员在客户端列表对调用申请进行审批。若授权方式为自动授权，申请人将自动获得授权，否则需管理人员手动授权。对已授权的客户端，可撤销授权或删除申请。若已提前配置 SLA，可更换 SLA 为该客户端设置特定的访问级别。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/570feb8e-0bf0-4d44-b184-1277691991ec.png)

### 配置 API 策略

API 访问管理人员可从访问管理后台跳转至 API 策略页，为 API 开启安全策略和业务策略。

### 配置 SLA
SLA（service-level agreement），即服务级别协议。API 访问管理人员可添加若干 SLA 规则，用于限制客户端的访问级别。SLA 类别中需至少有一条默认的 "无限制 SLA"。

### 访问 API

若 API 管理人员对该 API 进行访问管理，则用户可在 API 集市页或预览页对该 API 提出申请调用，随后进入 **API 管理 > 我的访问 > 客户端详情** 查看申请情况。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/703fa43b-1df8-4552-bad6-114dc356b9f0.png)

审批通过后，进入 API 资源预览页，通过客户端 ID 和密钥进行认证，随后即可在平台对接口进行调用测试。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/303c1bb4-9841-4305-8b21-dea35b20a285.png)

用户开发自己的应用程序时，可用该客户端 ID 和密钥访问服务。

