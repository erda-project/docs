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
// API 文档保存到 .dice/apidocs 目录下
// 非侵入式目录, 不影响仓库目录主要结构
// 如果应用下有多个微服务, 文档按服务名命名

root_from_repo
    ├── .dice
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

如正文所述，文档被保存到了 `.dice/apidocs/{文档名}.yaml` 。

#### 我有文档，如何迁移到 Erda API 设计中心来？

可以将文档保存到代码目录 `.dice/apidocs` 的目录下，然后提交到仓库的某个分支，推送到 Erda 仓库。
就可以在 API 设计中心查看并编辑文档了。

建议一旦将文档迁移到本平台，以后就继续在本平台进行维护。

须要注意的是，文档名称应当与文档所描述的服务同名；文档应当是符合 openapi 3 的 YAML 文件。
如果要迁入的 API 文档是 JSON 格式，或是 RAML、swagger 2.0 协议，请先转换成 openapi 3 YAML 格式。

#### 文档如何导出？

建议在本平台继续维护 API 文档。

要导出 API 文档，可以 pull 该文档对应分支的代码，打开 `.dice/apidocs` 目录即可查看文档。
也可以先将文档发布到集市，再从集市导出。

#### 如何导入数据库表模型字段？

要在 API 设计中导入数据库表模型字段，要求将数据迁移脚本按本平台建议的最佳实践组织在相应的目录。
目录结构如下：
```text
root_from_repo
    ├── .dice
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


### API 集市

API 是服务对外提供能力的入口，API 集市可以将服务的能力聚合起来，在平台上统一展现。从而促进跨团队，跨组织之间共享通用的能力，促进产品研发效率，促进业务创新。

#### API 文档发布到集市

##### 通过流水线发布 API 版本

###### publish-api-asset action

使用说明：publish-api-asset action 用于将 API 文档发布到 API 集市

| 参数名      | 参数含义                                          | 是否必填 |
| ----------- | ------------------------------------------------- | -------- |
| display_name   |  API 文档的展现名称, 不填时使用 asset_id           | 否       |
| asset_id | API 文档的标识 id | 是       |
| version |  API 资源版本，需要使用 X.Y.Z 的格式，不填时自动生成              | 否       |
| spec_path |  API 描述文档的路径，eg:${git-checkout}/swagger.json              | 是       |
| runtime_id |  runtime_id 值，eg:${dice:OUTPUT:runtimeID}              | 是       |
| service_name |  服务名称，需要和 dice.yml 中的一致              | 是       |



example：

```yaml
- stage:
  - publish-api-asset:
      params:
        display_name: 测试
        asset_id: test
        spec_path: ${git-checkout}/swagger.json
        runtime_id: ${dice:OUTPUT:runtimeID}
        service_name: test-service
```



##### 查看发布的 API 文档

入口在 DevOps 平台 -> API 管理 -> API 集市

点击操作中的管理，可以管理这个 API 文档的权限和版本。如果通过流水线的方式发布，会自动和项目应用下的角色权限做关联：

- 发布应用所属企业的管理员，所属项目的管理员，所属应用的管理员有权限管理
- 发布应用所属项目的成员有权限查看

如果想要提供给其他项目的成员查看，可以在管理页面右上角，将`私有`改为`公开`，这样所有企业成员都有权限查看。


