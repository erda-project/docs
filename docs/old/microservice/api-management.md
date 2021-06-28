# API 管理

## API 设计

<!-- API 设计中心是干什么用的 -->

在 Erda API 设计中心，可以几乎 0 学习成本地使用该产品设计 API 文档。

基于可视化的编辑方式，通过直观而友好的交互界面，不需要了解任何 REST API 规范标准，
也无需具备任何关于API 描述语言的知识，就可以轻松编写出一份具有专业水平的 API 文档。

设计中心完全兼容标准的 OAS 协议，在其他平台托管的 API 文档、代码中生成的 swagger 文件等，都能轻松迁移到 Erda。
API 设计中心输出的文档完全符合 OAS3 协议标准，任何时候都可以交付、迁出文档，一次设计，随处使用。

<!-- API 设计中心的设计思路 -->

Erda API 设计中心将 API 文档托管到代码仓库中，这一设计使得接口描述和接口实现紧密地绑定到一起。
```text
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

API 设计的入口在应用详情页。
进入 API 设计，通过目录树控件可以展开应用下所有分支，打开任意文档开始编辑。
如果仓库当前还没有文档，可以在有权限的分支下新建文档。

平台限制同一篇文档同一时刻只能有一个用户正在编辑，当打开一篇他人正在编辑的文档时，会提示文档当前已被锁定。

编辑过程中，文档会自动保存，当意外中断工作时，平台会自动将此前保存的文档提交到 git 仓库中。
用户也可以手动保存文档，保存成功后，会自动退出编辑状态，如果还须编辑，可以再次点击"编辑"进入编辑状态。

设计完成后，可以将文档发布到 API 集市。

### API 文档的结构
当前最流行的 API 文档标准是 OAS，OAS 分为 swagger 2.0 和 openapi 3.0 两个主要版本，即 OAS2 和 [OAS3](http://spec.openapis.org/oas/v3.0.3)。
API 设计中心输出的文档采用 openapi 3 协议，API 集市则同时支持 swagger 2.0 和 openapi 3.0。

API 设计中心，将一篇文档分为三个主要部分，分别是概况、接口列表、数据类型列表。

概况包含当前文档名称、版本名称、基本介绍等内容。

接口列表由一系列 pathItem 组成，每个 URI 确定一个 pathItem。每个 pathItem 下，
可以添加 7 种 HTTP 方法：GET，POST，PUT，DELETE，HEAD，OPTIONS，PATCH。
URI + HTTP Method 确定一个接口，接口又被称为 operation。
一个接口一般由 Summary，Parameters，Headers，Body，Response 组成。
Summary 包含接口名称、描述等基本信息。
Parameters 表示 query parameters，也就是跟在 URI 后面以“&”连接的“key=value”的键值对列表。
Headers 表示请求的 header，也是键值对列表。
Body 是请求体，GET 和 HEAD operation 没有请求体。
Response 包含响应体信息。

数据类型列表由一系列自定义数据类型组成，可以在这里定义数据类型，并在接口设计时引用它们。
预定义的类型有 String，Number，Boolean，Array，Object 五种，所有的自定义类型都由这五种预定义类型复合而成。

以上就是一篇 API 文档的组织结构。

### API 设计引导
#### 1 进入文档编辑页面

通过页面的"新建"按钮可以创建文档，创建文档时要选择分支，为文档命名。建议文档名与文档所描述的服务同名。
新建文档后会自动跳转到该文档的编辑页面。点击"编辑"可以进入编辑状态。

也可以选择从目录树控件选择要编辑的分支文档.

#### 2 编辑 API 概况

在编辑器左侧目录栏选择 API 概况，在这里填写API名称（建议与文件名同名），版本名称，以及文档描述信息。

![编辑 API 概况](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/03/ddc30f61-81a9-4d1f-be8a-d1557d0d1808.jpg)

#### 3 定义数据模型

建议在定义接口前先定义数据模型。在编辑器左侧目录栏选择数据类型，按指引添加数据类型，并填写参数名称、类型、描述等基本信息。

![定义数据模型](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/03/36db20b3-2706-4a34-906c-fad74cb671ee.png)

#### 4 定义接口

在左侧目录栏选择 API 列表，按引导新建一个 URI，并填写 path。 URI 对应的结构被称为 pathItem。
在 pathItem 中选择一个 HTTP 方法进行编辑。
    
##### 4.1 编写接口 Summary

接口也被成为 operation，URI + HTTP Method 确定一个接口。
选择接口的 Summary tab，填写接口名称、分组、描述等信息。
其中接口名称可以不填，但如果填写了，应当在整篇文档中唯一。

![编辑方法为 GET 的接口 Summary](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/03/fcbb9192-50cc-4578-8e74-67ba2568aad9.png)

##### 4.2 编写 Params、Headers

Params 和 Headers 都是键值对，可以在 Params tab 和 Headers tab 下添加其参数。

##### 4.3 编写 Request Body

GET 和 HEAD Method 没有 Request Body。
对有 Request Body 的方法，可以在 Body tab 下编辑。
Body 通常是 Object 类型，其编写方式与定义数据类型类似。

##### 4.4 编写 Response Body

可以在 Response tab 下编辑 Response Body。
其编辑方式与编写 Request Body 类似。

##### 4.5 引用数据类型

定义接口的参数（Params、Headers、Body、Response以及任意子字段）时，可以设置参数类型为自定义的类型。
如果被引类型的父类型是 Object，还可以在其基础上继续添加参数。

![在 Response Body 中引用自定义类型并扩展字段](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/03/e6c66315-521f-48fb-aa1a-24b83887ab70.png)

##### 4.6 导入参数

如果数据库模型也托管在仓库中，可以导入与 API 文档同名的服务下的库表模型字段。
在要添加参数时，选择导入参数，选择要导入的模型及其字段即可。

#### 4.7 发布到集市

建议发布到集市前先保存文档。

填写 API 名称、ID、语义化版本号后可以将文档发布到集市。然后可以在集市查看和管理已发布的文档。

![发布文档到 API 集市](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/03/132f1ade-2186-4721-a60a-b0bb31cb5d11.png) 
    
### API 设计 FAQ
#### 我的文档保存到了哪里？

如正文所述，文档被保存到了 `.erda/apidocs/{文档名}.yaml` 。

#### 我有文档，如何迁移到 Erda API 设计中心来？

可以将文档保存到代码目录 `.erda/apidocs` 的目录下，然后提交到仓库的某个分支，推送到 Erda 仓库。
就可以在 API 设计中心查看并编辑文档了。

建议一旦将文档迁移到本平台，以后就继续在本平台进行维护。

须要注意的是，文档名称应当与文档所描述的服务同名；文档应当是符合 openapi 3 的 YAML 文件。
如果要迁入的 API 文档是 JSON 格式，或是 RAML、swagger 2.0 协议，请先转换成 openapi 3 YAML 格式。

#### 文档如何导出？

建议在本平台继续维护 API 文档。

要导出 API 文档，可以 pull 该文档对应分支的代码，打开 `.erda/apidocs` 目录即可查看文档。
也可以先将文档发布到集市，再从集市导出。

#### 如何导入数据库表模型字段？

要在 API 设计中导入数据库表模型字段，要求将数据迁移脚本按本平台建议的最佳实践组织在相应的目录。
目录结构如下：
```text
root_from_repo
    ├── .erda
    │   ├── apidocs
    │   │   ├── {micro_service_a}.yaml
    │   │   ├── {micro_service_b}.yaml
    │   │   └── {micro_service_c}.yaml
    │   │
    │   ├── migrations      // 将数据迁移脚本放到 migrations 目录下, 按服务名区分
    │   │   ├── my_service
    │   │   │    ├── 0000_my_service_base   // 子目录以迁移序号和有语义的短语命名
    │   │   │    │   ├── schema.sql         // schema.sql 用以存放 DDL 脚本
    │   │   │    │   └── data.sql           // data.sql 用以存放 DML 脚本
    │   │   │    └── 0001_my_service_some_feature 
    │   │   │        ├── schema.sql
    │   │   │        └── data.sql
    │   │   │
    │   │   └── {micro_service_b}
    │   │
    │   └── pipelines
    │
    ├── other_files
    └── other_dirs
```

按以上目录结构组织 migration 脚本，在编辑该分支下同服务名的文档时，就可以导入模型字段了。

注意导入的模型是库表的最终状态，如建表时创建了某字段，后来的脚本中又删除了该字段，导入模型时该字段是不存在的。

数据库迁移脚本托管到上文所述的目录中，按微服务名归类，这是平台推荐的一种最佳实践。
API 设计与模型的联动提升了 API 设计的便捷性，提升了接口字段的语义。

#### 为什么我的文档没有自动保存或手动保存失败？

可能是由于文档不符合 openapi 3 协议造成的保存失败，请根据提示到代码仓库中修改文档不合法之处。

#### 如何理解文档中的 version 和集市里的版本号？

API 集市里的版本号是[语义化版本号](https://semver.org/lang/zh-CN/)，标记文档发布历程；API 文档里的 version 是当前文档的版本名称。

语义化版本号格式形如 `major.minor.patch` ，其中 major 为主版本号，主版本号的变化通常表示发生了重大变更或不向下兼容的变更；
minor 是次版本号，次版本号的变化通常表示增加了新特性，仍向下兼容；
patch 是修订号，修订号的变化通常表示对现有版本作较小的、局部的修正。

API 文档里的版本名称一般是有自解释性的单词或短语，表示文档当前版本的命名。
版本名称与语义化版本号中的 major 是一一对应的，也就是说，major 是主版本的编号，版本名称是主版本的命名。
比如 macOS 的某个版本号 `Big Sur 11.2.2`，其中“Big Sur” 是操作系统的版本名，“11”是该版本的主版本编号，"Big Sur" 与 "11" 是对应的，2.2 分别是次版本号和修订号。

版本名称是文档的一部分，在编辑文档时编写。
API 集市的版本号在发布时确定，根据前文提提到的版本号语义确定如何填写。
有时发布文档到集市时提示版本号冲突，就是因为版本名称与 major 编号没有对应。


## API 集市

API 是服务对外提供能力的入口，API 集市可以将服务的能力聚合起来，在平台上统一展现。从而促进跨团队，跨组织之间共享通用的能力，促进产品研发效率，促进业务创新。

API 集市的入口在 DevOps 平台 -> API 管理 -> API 集市。

### 发布 API 文档到集市

#### 方法一：上传本地文件发布文档集市

进入 DevOps 平台页面，展开 API 管理，即可进入 API 集市页面。
在 API 集市页面，可以查看到 "我负责的" 和 "所有" 的 API 集市资源。
在此页面 "新建资源" 即可上传本地 Swagger 2.0 或 Openapi 3.0 文档。

要为已存在的 API 集市资源追加新版本的文档，可以在 API 集市列表页为该 API 集市资源添加版本，操作与创建 API 集市资源类似。
也可以从 API 集市列表页，进入该 API 资源的管理页面，在 "版本管理" 中添加新的版本。

#### 方法二：通过流水线发布文档到集市

##### publish-api-asset action

使用说明：publish-api-asset action 用于将 API 文档发布到 API 集市

| 参数名      | 参数含义                                          | 是否必填 |
| ----------- | ------------------------------------------------- | -------- |
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

#### 方法三： 在 API 设计中发布文档到集市

可以参考前文对 API 设计中发布文档到集市的说明。

### 在 API 集市中查看文档

在 API 集市列表页，点击列表中的任意条目可以进入到 API 文档的预览页。
在此页面可以图形化地查看文档，可以轻松地查看每一个接口的描述细节。
此页面还支持版本切换、接口搜索、文档下载等。

![API 集市资源预览页](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/15/7a103b49-825e-481e-bf7e-a2b657cf5d35.png)

### 在 API 集市中管理已发布的文档

从 API 集市列表页，点击列表中任意条目的 "管理" 即可进入到该 API 资源的管理页面。
此页面支持编辑 API 资源的基本信息、将 API 资源设为公开或私有、删除 API 资源等基本操作。

通过编辑 "关联关系"，可以在将 API 资源关联到具体的项目和应用。从流水线和 API 设计中心发布的文档会自动关联上项目和应用，
从本地文件发布的文档须要手动关联到项目和应用。
API 集市资源与项目和应用关联后，自动获得项目和应用的权限配置：

- 企业的管理员、关联项目的管理员、关联应用的管理员对该 API 资源有管理权限；
- 关联项目的成员有查看权限；
- 任何项目成员对公开的 API 资源都有查看权限。

在 "版本管理" 中，可以为 API 资源增删版本、标记版本为"弃用"、导出某版本的文档等。
还可以将不同版本的文档关联到服务实例。注意这种关联是 minor 级别的关系，即一个 minor 版本关联到一个实例，
表明该 minor 下的文档是对该服务实例的接口的描述。后文中的 "访问管理" 会依赖此关联关系。

## 访问管理

### 创建访问管理条目

访问管理的入口在 DevOps 平台 -> API 管理 -> 访问管理。
进入页面可以查看到访问管理列表。

要对目标 API 资源及其关联的实例进行访问管理，要先创建一个访问管理条目。
可以通过访问管理列表页的 "新建访问管理" 进入创建访问管理条目的交互页面。

![访问管理的创建页面](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/15/60f31fa0-5b1b-4448-948c-19e68440052c.png)

按引导填写表单：

- API 名称：即 API 资源名称
- API 版本：即 API 的版本名称，对应 major 版本号。可以参见前文对语义化版本号的说明。
- 资源版本：即语义化版本号。注意该版本号只精确到 minor 版本号。
- 关联项目名称：该版本 API 文档关联的项目名称，不可修改。
- 绑定域名：该 API 文档及其关联实例要绑定的域名。注意该域名格式是 `服务名称.平台泛域名后缀`，其中服务名称可以自定义，
  平台泛域名是由平台既定的。如服务名称为"my-website"，平台的域名为 "terminus-org.app.terminus.io"，那么此处应填写
  "my-website.app.terminus.io"。
- API 网关：选择对应环境的 API 网关，如果没有 API 网关，会引导新建一个 API 网关。
- 鉴权方式：外部访问域名时的鉴权方式，支持 key 认证和参数签名认证。
- 授权方式：访问服务须要申请和授权，授权方式分为自动授权和手动授权。

提交表单后，即可创建该 API 版本及其实例的访问管理条目，并自动进入到访问管理后台页（也称详情页）。

在访问管理详情页，可以重新编辑其基本信息、删除该条目、查看流量概览等。

### 访问申请与审批

API 的使用者可以在 API 集市列表页或 API 资源详情页对 API 资源提出申请调用。

![提出申请调用](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/15/9f881e9b-ea43-40b8-8bd5-a81c89832b26.png)

审批流程进入 API 访问管理后台，管理人员在客户端列表对调用申请进行审批。
如果授权方式是 "自动授权"，申请人已经申请，就会自动获得授权，否则需要管理人员手动授权。
对已授权的客户端，可以撤销授权、删除申请等。
如果提前配置了 SLA，可以更换 SLA 以为该客户端设置特定的访问级别。

![审批调用申请](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/15/502f1894-93b7-4676-8dba-77a04cf05aa7.png)

### 配置 API 策略

API 访问管理人员可以从访问管理后台跳转到 API 策略页，为 API 开启安全策略和业务策略。

### 配置 SLA
SLA（service-level agreement），即服务级别协议。
API 访问管理人员可以添加若干 SLA 规则，用以限制客户端的访问级别。
SLA 类别中至少有一条默认的 "无限制 SLA"。

### 访问 API

如果 API 管理人员对该 API 进行了访问管理，则用户可以在 API 集市列表页或预览页对该 API 提出申请调用。
提出调用申请后，用户可以来到 API 管理 -> 我的访问 -> 客户端详情页查看申请情况。

![客户端详情页查看审批情况](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/15/45e3d3f8-ab2b-4e46-81e7-0dcaae83c18b.png)

审批通过后，进入 API 资源预览页，用客户端 ID 和密钥进行认证后，就可以在平台对接口进行调用测试了。

![对接口进行调用测试](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/15/8fbeefff-cb63-43f9-89bf-c7a787e1ddea.png)

用户开发自己的应用程序时，可以用这个客户端 ID 和密钥访问服务。


## 功能列表

|功能|二级功能|描述|
|---|---|---|
|API 设计|-|在友好的交互界面，编写具有专业水平的 API 文档。|
|       |API 文档设计稿托管|API 文档设计稿托管在仓库中，其工作流完全符合 gitflow。|
|       |在交互设计页面设计 API 文档|通过友好的交互页面，用户可以自引导地编写基于 OAS 协议的 API 文档。|
|       |编写 API 概况|在 API 概况中编写文档名称、版本、描述等基本信息。|
|       |编写数据类型|在数据类型中编写复杂的数据类型，以便在其他地方引用。|
|       |编写接口文档|在 API 列表编写接口文档，接口路径和方法共同确定一个接口。|
|       |引用数据类型|在设计接口的 Body 时可以引用此前设计过的数据类型，并且这些类型是可以嵌套的。|
|       |导入数据模型|导入托管在仓库中的数据库表模型。|
|       |发布文档到集市|将设计好的 API 文档设计稿发布到集市，以便归档、查看和管理。|
|API 集市|-|发布、查看 API 文档及调用测试|
|       |API 资源列表|查看权限范围内的或公开的 API 资源列表|
|       |新建 API 资源|导入 OAS 协议的 API 文档，发布成 API 资源|
|       |为 API 资源添加版本|导入 OAS 协议的 API 文档到已有的 API 资源，发布成 API 资源的新版本|
|       |API 详情|API 文档 UI 界面，以友好直观的方式渲染 API 文档。可以任意切换 API 版本。|
|       |API 管理页|查看和修改 API 资源的基本信息；将 API 与项目、应用、实例关联；管理 API 的版本|
|       |编辑 API 资源基本信息|编辑 API 名称、描述、图标等基本信息|
|       |删除 API 资源|删除 API 资源及其所有版本。|
|       |公开或私有化 API 资源|公开 API 资源是指让组织下所有用户都可以查看 API 资源，私有化是指仅允许用户相关权限的用户查看文档。|
|       |关联项目和应用|关联项目和应用，表示文档描述的是该应用的接口。API 资源自动获取项目和应用的权限设置。|
|       |关联应用实例|关联应用实例，表示文档描述的是该实例的服务能力。关联后可能通过文档的测试调用能力调用实例接口。|
|       |导出文档|导出指定版本、格式和协议版本的文档文件，支持的格式：OAS3/2-JSON/YAML。|
|       |删除指定版本|将指定的版本从 API 资源从删除。|
|       |标记版本为弃用及其通知|弃用版本时，订阅了该版本的用户会收到通知。|
|       |申请调用 API|申请调用某个版本的 API，这条申请会流转到访问管理，管理人员会对其进行审批。|
|       |新建客户端|申请调用 API 时可以创建一个客户端，它将是调用方调用 API 的凭证。|
|       |测试调用 API|认证客户端后可以打开一个接口测试界面，编写参数后即可向 API 绑定的真实实例发起调用。|
|访问管理|-|访问管理组织了 API 资源、服务以及网关的关系。从 API 的角度对服务调用进行授权、鉴权、流控、监控等。|
|       |访问管理列表|查看进行了访问管理的 API 资源。从这里也可以编辑、删除访问管理条目。|
|       |新建访问管理|将 API 资源、服务、网关的关系组织起来，接下来可以从 API 的角度对服务授权、鉴权、流控、监控等。|
|       |访问管理基础信息|查看访问管理条目的基础信息，如引用的 API、资源版本、入口域名、鉴权和授权方式、关联的项目及环境等。|
|       |访问管理流量概览|通过图表查看访问管理条目的调用量、调用客户端占比、调用延时等信息。|
|       |客户端管理|通过客户端管理当前 API 的申请调用情况，并对其审批（同意、拒绝、撤销、删除等），设置 SLA。|
|       |申请调用的通知|客户端管理中的审批和设置 SLA 操作，都会通知申请人。|
|       |客户端管理审计|简单的客户端审计功能，记录申请方和审批方的操作记录。|
|       |客户端流量审计|审计客户端流量，如请求量、错误量、延时、总流量、响应码分布、错误分类等。|
|       |SLA 管理|管理 SLA，用以限定客户端调用量。|
|       |API 策略|跳转到 API 网关流量入口管理，在此处设置 IP 拦截、服务负载保护、跨站防护等安全策略以及业务策略。|
|我的访问|-|调用方视角的客户端管理。客户端 ID 及其密钥是调用方调用服务的凭证。|
|       |客户端列表|查看调用方的客户端，在此可以重置客户端密钥、删除客户端等。|
|       |已授权 API 列表|查看不同状态（已通过、待审批、已拒绝）下的申请调用了的 API 资源列表。|
|       |申请更换 SLA|在已授权 API 列表可以申请更换 SLA。|
|       |客户端流量审计|审计客户端流量，如请求量、错误量、延时、总流量、响应码分布、错误分类等。|
|从流水线发布文档到集市|-|用户可以从流水线将 API 文档发布到集市。|
