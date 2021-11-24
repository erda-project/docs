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

点击 **新建文档**，选择对应分支并为文档命名。建议文档名称与文档所描述的服务名称保持一致。新建文档后将自动跳转至该文档的编辑页面，点击 **编辑** 进入编辑状态，或从目录树控件中选择需编辑的分支文档。

#### 编辑 API 概况

在编辑器左侧目录栏选择 API 概况，在这里填写 API 名称（建议与文件名同名）、版本名称以及文档描述信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/955fa5c6-f3aa-438a-947f-3e34ed9f7e4a.png)

#### 定义数据模型

建议在定义接口前先定义数据模型。在编辑器左侧目录栏选择数据类型，按指引添加数据类型，并填写参数名称、类型、描述等基本信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/bec6fe96-237a-4073-b616-69eda187120c.png)

#### 定义接口

在左侧目录栏选择 API 列表，按引导新建一个 URI，并填写 path。 URI 对应的结构被称为 PathItem。在 PathItem 中选择一个 HTTP 方法进行编辑。

##### 编写接口 Summary

接口也被成为 operation，URI + HTTP Method 确定一个接口。选择接口的 Summary tab，填写接口名称、分组、描述等信息。其中接口名称可以不填，但如果填写了，应当在整篇文档中唯一。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e3116213-d4a5-4075-a704-cbb1514f48c8.png)

##### 编写 Params、Headers

Params 和 Headers 都是键值对，可以在 Params tab 和 Headers tab 下添加其参数。

##### 编写 Request Body

GET 和 HEAD Method 没有 Request Body。对有 Request Body 的方法，可以在 Body tab 下编辑。Body 通常是 Object 类型，其编写方式与定义数据类型类似。

##### 编写 Response Body

可以在 Response tab 下编辑 Response Body。其编辑方式与编写 Request Body 类似。

##### 引用数据类型

定义接口的参数（Params、Headers、Body、Response 以及任意子字段）时，可以设置参数类型为自定义的类型。如果被引类型的父类型是 Object，还可以在其基础上继续添加参数。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fe0ef856-6d2d-4633-9c97-545143847e85.png)

##### 导入参数

如果数据库模型也托管在仓库中，可以导入与 API 文档同名的服务下的库表模型字段。在要添加参数时，选择导入参数，选择要导入的模型及其字段即可。

##### 发布至集市

建议发布到集市前先保存文档。

填写 API 名称、ID、语义化版本号后可以将文档发布到集市。然后可以在集市查看和管理已发布的文档。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d40a8ecf-d6b3-4d16-b0e2-5d9bc8a2aca8.png)


## API 集市

API 是服务对外提供能力的入口，API 集市可以将服务的能力聚合起来，在平台上统一展现。从而促进跨团队，跨组织之间共享通用的能力，促进产品研发效率，促进业务创新。

API 集市的入口在 **DevOps 平台 > API 管理 > API 集市**。

### 发布文档

#### 方法一：上传本地文件发布文档

进入 DevOps 平台页面，展开 API 管理，即可进入 API 集市页面。在 API 集市页面，可以查看到 "我负责的" 和 "所有" 的 API 集市资源。在此页面 "新建资源" 即可上传本地 Swagger 2.0 或 Openapi 3.0 文档。

要为已存在的 API 集市资源追加新版本的文档，可以在 API 集市列表页为该 API 集市资源添加版本，操作与创建 API 集市资源类似。也可以从 API 集市列表页，进入该 API 资源的管理页面，在 "版本管理" 中添加新的版本。

#### 方法二：通过流水线发布文档

publish-api-asset action

使用说明：publish-api-asset action 用于将 API 文档发布到 API 集市

| 参数名      | 参数含义                                          | 是否必填 |
| :---------- | :------------------------------------------------ | :------- |
| display_name   |  API 文档的展现名称, 不填时使用 asset_id           | 否       |
| asset_id | API 文档的标识 id | 是       |
| version |  API 资源版本，需要使用 X.Y.Z 的格式，不填时自动生成              | 否       |
| spec_path |  API 描述文档的路径，eg:${git-checkout}/swagger.json              | 是       |
| runtime_id |  runtime_id 值，eg:${dice:OUTPUT:runtimeID}              | 是       |
| service_name |  服务名称，需要和 dice.yml 中的一致              | 是       |

示例：

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

#### 方法三： 在 API 设计中发布文档

可以参考前文对 API 设计中发布文档到集市的说明。

### 查看文档

在 API 集市列表页，点击列表中的任意条目可以进入到 API 文档的预览页。在此页面可以图形化地查看文档，可以轻松地查看每一个接口的描述细节。此页面还支持版本切换、接口搜索、文档下载等。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/34f45f91-aa45-40da-a05a-15185f36a036.png)

### 管理文档

从 API 集市列表页，点击列表中任意条目的 "管理" 即可进入到该 API 资源的管理页面。此页面支持编辑 API 资源的基本信息、将 API 资源设为公开或私有、删除 API 资源等基本操作。

通过编辑 "关联关系"，可以在将 API 资源关联到具体的项目和应用。从流水线和 API 设计中心发布的文档会自动关联上项目和应用，从本地文件发布的文档须要手动关联到项目和应用。API 集市资源与项目和应用关联后，自动获得项目和应用的权限配置：

- 企业的管理员、关联项目的管理员、关联应用的管理员对该 API 资源有管理权限；
- 关联项目的成员有查看权限；
- 任何项目成员对公开的 API 资源都有查看权限。

在 "版本管理" 中，可以为 API 资源增删版本、标记版本为"弃用"、导出某版本的文档等。还可以将不同版本的文档关联到服务实例。注意这种关联是 minor 级别的关系，即一个 minor 版本关联到一个实例，表明该 minor 下的文档是对该服务实例的接口的描述。后文中的 "访问管理" 会依赖此关联关系。

## 访问管理

### 创建访问管理条目

访问管理的入口在 **DevOps 平台 > API 管理 > 访问管理**。进入页面可以查看到访问管理列表。

要对目标 API 资源及其关联的实例进行访问管理，要先创建一个访问管理条目。可以通过访问管理列表页的 "新建访问管理" 进入创建访问管理条目的交互页面。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/bf408a13-fc08-4279-b819-a8f6fd6edca9.png)

按引导填写表单：

- API 名称：即 API 资源名称。
- API 版本：即 API 的版本名称，对应 major 版本号。可以参见前文对语义化版本号的说明。
- 资源版本：即语义化版本号。注意该版本号只精确到 minor 版本号。
- 关联项目名称：该版本 API 文档关联的项目名称，不可修改。
- 绑定域名：该 API 文档及其关联实例要绑定的域名。注意该域名格式是 `服务名称.平台泛域名后缀`，其中服务名称可以自定义，平台泛域名是由平台既定的。如服务名称为"my-website"，平台的域名为 "terminus-org.app.terminus.io"，那么此处应填写"my-website.app.terminus.io"。
- API 网关：选择对应环境的 API 网关，如果没有 API 网关，会引导新建一个 API 网关。
- 鉴权方式：外部访问域名时的鉴权方式，支持 key 认证和参数签名认证。
- 授权方式：访问服务须要申请和授权，授权方式分为自动授权和手动授权。

提交表单后，即可创建该 API 版本及其实例的访问管理条目，并自动进入到访问管理后台页（也称详情页）。

在访问管理详情页，可以重新编辑其基本信息、删除该条目、查看流量概览等。

### 访问申请与审批

API 的使用者可以在 API 集市列表页或 API 资源详情页对 API 资源提出申请调用。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e36db9aa-1be3-4d49-9d87-deb0baec407f.png)

审批流程进入 API 访问管理后台，管理人员在客户端列表对调用申请进行审批。如果授权方式是 "自动授权"，申请人已经申请，就会自动获得授权，否则需要管理人员手动授权。对已授权的客户端，可以撤销授权、删除申请等。如果提前配置了 SLA，可以更换 SLA 以为该客户端设置特定的访问级别。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/570feb8e-0bf0-4d44-b184-1277691991ec.png)

### 配置 API 策略

API 访问管理人员可以从访问管理后台跳转至 API 策略页，为 API 开启安全策略和业务策略。

### 配置 SLA
SLA（service-level agreement），即服务级别协议。API 访问管理人员可添加若干 SLA 规则，用于限制客户端的访问级别。SLA 类别中至少有一条默认的 "无限制 SLA"。

### 访问 API

如果 API 管理人员对该 API 进行了访问管理，则用户可以在 API 集市列表页或预览页对该 API 提出申请调用。提出调用申请后，用户可以来到 API 管理 > 我的访问 > 客户端详情页查看申请情况。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/703fa43b-1df8-4552-bad6-114dc356b9f0.png)

审批通过后，进入 API 资源预览页，用客户端 ID 和密钥进行认证后，就可以在平台对接口进行调用测试了。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/303c1bb4-9841-4305-8b21-dea35b20a285.png)

用户开发自己的应用程序时，可以用这个客户端 ID 和密钥访问服务。

