# API 设计

在 Erda API 设计中心，您可以几乎 0 学习成本地使用该产品设计 API 文档。

基于可视化的编辑方式，通过直观而友好的交互界面，不需要了解任何 REST API 规范标准，也无需具备任何关于API 描述语言的知识，就可以轻松编写出一份具有专业水平的 API 文档。

设计中心完全兼容标准的 OAS 协议，在其他平台托管的 API 文档、代码中生成的 swagger 文件等，都能轻松迁移到 Erda。

API 设计中心输出的文档完全符合 OAS3 协议标准，任何时候都可以交付、迁出文档，一次设计，随处使用。

Erda API 设计中心将 API 文档托管到代码仓库中，这一设计使得接口描述和接口实现紧密地绑定到一起。
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

进入 **DevOps > 平台 > 我的应用 > 选择应用 > API 设计**，通过目录树控件可以展开应用下所有分支，打开任意文档开始编辑。如果仓库当前还没有文档，可以在有权限的分支下新建文档。

平台限制同一篇文档同一时刻只能有一个用户正在编辑，当打开一篇他人正在编辑的文档时，会提示文档当前已被锁定。

编辑过程中，文档会自动保存，当意外中断工作时，平台会自动将此前保存的文档提交到 git 仓库中。
用户也可以手动保存文档，保存成功后，会自动退出编辑状态，如果还须编辑，可以再次点击"编辑"进入编辑状态。

设计完成后，可以将文档发布到 API 集市。

## API 文档结构
当前最流行的 API 文档标准是 OAS，OAS 分为 swagger 2.0 和 openapi 3.0 两个主要版本，即 OAS2 和 [OAS3](http://spec.openapis.org/oas/v3.0.3)。
API 设计中心输出的文档采用 openapi 3 协议，API 集市则同时支持 swagger 2.0 和 openapi 3.0。

API 设计中心，将一篇文档分为三个主要部分，分别是概况、接口列表、数据类型列表。

概况包含当前文档名称、版本名称、基本介绍等内容。

接口列表由一系列 pathItem 组成，每个 URI 确定一个 pathItem。每个 pathItem 下，可以添加 7 种 HTTP 方法：GET，POST，PUT，DELETE，HEAD，OPTIONS，PATCH。URI + HTTP Method 确定一个接口，接口又被称为 operation。一个接口一般由 Summary，Parameters，Headers，Body，Response 组成。Summary 包含接口名称、描述等基本信息。Parameters 表示 query parameters，也就是跟在 URI 后面以“&”连接的“key=value”的键值对列表。Headers 表示请求的 header，也是键值对列表。Body 是请求体，GET 和 HEAD operation 没有请求体。Response 包含响应体信息。

数据类型列表由一系列自定义数据类型组成，可以在这里定义数据类型，并在接口设计时引用它们。
预定义的类型有 String，Number，Boolean，Array，Object 五种，所有的自定义类型都由这五种预定义类型复合而成。

以上就是一篇 API 文档的组织结构。

## API 设计引导
### 进入文档编辑页面

通过页面的"新建"按钮可以创建文档，创建文档时要选择分支，为文档命名。建议文档名与文档所描述的服务同名。
新建文档后会自动跳转到该文档的编辑页面。点击"编辑"可以进入编辑状态。

也可以选择从目录树控件选择要编辑的分支文档.

### 编辑 API 概况

在编辑器左侧目录栏选择 API 概况，在这里填写API名称（建议与文件名同名），版本名称，以及文档描述信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/955fa5c6-f3aa-438a-947f-3e34ed9f7e4a.png)

### 定义数据模型

建议在定义接口前先定义数据模型。在编辑器左侧目录栏选择数据类型，按指引添加数据类型，并填写参数名称、类型、描述等基本信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/bec6fe96-237a-4073-b616-69eda187120c.png)

### 定义接口

在左侧目录栏选择 API 列表，按引导新建一个 URI，并填写 path。 URI 对应的结构被称为 pathItem。
在 pathItem 中选择一个 HTTP 方法进行编辑。

#### 编写接口 Summary

接口也被成为 operation，URI + HTTP Method 确定一个接口。
选择接口的 Summary tab，填写接口名称、分组、描述等信息。
其中接口名称可以不填，但如果填写了，应当在整篇文档中唯一。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e3116213-d4a5-4075-a704-cbb1514f48c8.png)

#### 编写 Params、Headers

Params 和 Headers 都是键值对，可以在 Params tab 和 Headers tab 下添加其参数。

#### 编写 Request Body

GET 和 HEAD Method 没有 Request Body。
对有 Request Body 的方法，可以在 Body tab 下编辑。
Body 通常是 Object 类型，其编写方式与定义数据类型类似。

#### 编写 Response Body

可以在 Response tab 下编辑 Response Body。
其编辑方式与编写 Request Body 类似。

#### 引用数据类型

定义接口的参数（Params、Headers、Body、Response以及任意子字段）时，可以设置参数类型为自定义的类型。
如果被引类型的父类型是 Object，还可以在其基础上继续添加参数。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fe0ef856-6d2d-4633-9c97-545143847e85.png)

#### 导入参数

如果数据库模型也托管在仓库中，可以导入与 API 文档同名的服务下的库表模型字段。
在要添加参数时，选择导入参数，选择要导入的模型及其字段即可。

#### 发布到集市

建议发布到集市前先保存文档。

填写 API 名称、ID、语义化版本号后可以将文档发布到集市。然后可以在集市查看和管理已发布的文档。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d40a8ecf-d6b3-4d16-b0e2-5d9bc8a2aca8.png)
