# API 设计

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

## API 文档结构
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

## API 设计操作
### 进入编辑状态

点击 **新建文档**，选择对应分支并为文档命名。建议文档名称与文档所描述的服务名称保持一致。新建文档后将自动跳转至该文档的编辑页面，点击 **编辑** 进入编辑状态。您也可以从目录树控件中选择需编辑的分支文档。

### 编辑 API 概况

在左侧目录栏中选择 **API 概况**，填写 API 名称（建议与文件名保持一致）、版本名称以及文档描述信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/955fa5c6-f3aa-438a-947f-3e34ed9f7e4a.png)

### 定义数据模型

建议在定义接口前优先定义数据模型。

在左侧目录栏中选择 **数据类型**，根据提示添加数据类型，并填写参数名称、类型、描述等基本信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/bec6fe96-237a-4073-b616-69eda187120c.png)

### 定义接口

在左侧目录栏中选择 **API 列表**，根据提示新建 URL 并填写 Path。URL 对应的结构被称为 PathItem。在 PathItem 中选择一个 HTTP 方法进行编辑。

#### 编写接口 Summary

接口也被称为 Operation，URL + HTTP Method 即可确定一个接口。选择接口的 Summary Tab，填写接口名称、分组、描述等信息。接口名称为选填项，若选择填写，需保证该名称在文档中的唯一性。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e3116213-d4a5-4075-a704-cbb1514f48c8.png)

#### 编写 Params、Headers

Params 和 Headers 都是键值对，可以在 Params tab 和 Headers tab 下添加其参数。

#### 编写 Request Body

GET 和 HEAD Method 均无 Request Body。对于有 Request Body 的方法，可在 Body Tab 下编辑。Body 通常为 Object 类型，其编写方式与定义数据类型相似。

#### 编写 Response Body

可在 Response Tab 下进行编辑。其编辑方式与编写 Request Body 相似。

#### 引用数据类型

定义接口的参数（Params、Headers、Body、Response 以及任意子字段）时，可自定义参数类型。若被引用类型的父类型为 Object，则可以在其基础上继续添加参数。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/fe0ef856-6d2d-4633-9c97-545143847e85.png)

#### 导入参数

若数据库模型同样托管于仓库中，可导入与 API 文档同名的服务下的库表模型字段。添加参数时，选择导入参数，再选择需导入的模型及其字段即可。

#### 发布至集市

发布文档至集市前请先保存文档。

填写 API 名称、ID 和语义化版本号，将文档发布至集市，随后即可在集市中查看和管理已发布的文档。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d40a8ecf-d6b3-4d16-b0e2-5d9bc8a2aca8.png)
