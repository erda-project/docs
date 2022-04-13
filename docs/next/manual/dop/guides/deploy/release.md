# 制品

## 制品分类

制品的分类可从不同维度进行划分。

### 应用制品和项目制品

应用制品包含部署一个应用所需的全部内容，包括镜像、依赖的 Addon 以及各类配置信息。

项目制品中包含一个或多个部署模式，每个部署模式由一个或多个应用制品按照一定的分组顺序组成。部署模式之间可以有依赖关系。部署项目制品时，可以选择您定义的部署模式，平台将根据您定义的部署顺序部署这些模式中的应用制品。被依赖的模式将被优先部署，同一个分组内的应用制品将被同时部署。例如，下面是一个由 10 个应用制品组成的项目制品。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/13/a2a95250-bc5f-4b9f-9879-2a03bd5b66a3.png)

其中，modeA、modeB 和 modeC 是自定义的部署模式，modeA 和 modeB 都依赖 modeC，这表示部署该项目制品时，若选择了 modeA 或 modeB 进行部署，平台会优先部署 modeC，然后部署 modeA 或 modeB。

### 临时制品和非临时制品

通过流水线创建应用制品时，若制品版本或代码分支符合以下条件之一，则创建的制品为非临时制品，否则即为临时制品：

- 在 Release Action 中填写 `tag_version`。

- 代码分支符合以下格式（即以 `release/` 为前缀，后缀部分符合 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/) 规范）。

  ```text
  release/{[v]主版本号}.{次版本号}[.修订版本号][-先行版本号][+版本无关的构建信息]
  ```

平台每日进行垃圾回收，回收创建于 72 小时前且当前无引用的临时制品及其镜像，非临时制品则不会被回收。

创建项目制品时，仅可引用非临时制品，且项目制品也为非临时制品。

进入 **DevOps 平台 > 项目 > 应用中心 > 制品**，可查看并管理该项目下的所有非临时制品。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/e0112765-b1ab-40c0-ae2c-50bb10caf4fb.png)

临时制品仅可在创建该制品的流水线上，通过 Release Action 的链接查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/96bc7a77-17f8-4123-8138-68429d68359f.png)

### 正式制品/非正式制品

所有制品在创建后均为非正式制品，您可在 **应用中心 > 制品** 中将指定制品转为正式版。转正后的制品即为正式制品。

正式制品表示该制品为正式版本，不可修改（包括编辑、删除或转正）。

## 创建制品
创建制品前请先完成项目的集群设置和分支规则配置。

* 进入 **DevOps 平台 > 项目 > 项目设置 > 通用设置 > 项目信息** 设置集群。

* 进入 **DevOps 平台 > 项目 > 项目设置 > 代码仓库 > 分支规则** 创建分支规则。

### 创建应用制品

当前应用制品仅支持通过 Release Action 创建。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/bfae5b18-f7d3-4671-8d73-15705d78f005.png)

1. 进入 **应用中心 > 应用 > 代码**，创建流水线文件，添加 Action（任务类型 > 应用打包发布制品）并填写配置参数。

2. 进入 **应用中心 > 应用 > 流水线**，选择分支和流水线，点击 **新建流水线**，完成构建后执行流水线。

3. 流水线执行成功即代表制品创建成功。

流水线将根据所在分支匹配分支规则，确认制品部署环境。

### 创建项目制品

项目制品支持通过选择应用创建、上传文件创建和通过 Project Artifacts Action 创建。

进入 **DevOps 平台 > 项目 > 应用中心 > 制品 > 项目制品**，点击右上角 **新建制品**，选择创建方式。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/d073662a-2e4f-4426-aaa0-0989bad8466f.png)

* **选择应用创建**

:::tip 提示

目前这种方式暂时不支持添加自定义模式，使用这种方式创建的项目制品会包含一个名为`default`的部署模式，该部署模式中包含页面上选择的应用制品组。

:::

  1. 输入版本。版本是项目制品在项目维度下的唯一标识，不可与其他项目制品版本重复，可由英文字母、数字、下划线（_）、中划线（-）及句点（.）组成。

  2. 选择应用制品（需提前在本项目的应用下创建应用制品）。您可对应用制品进行分组。在部署过程中，同组的应用制品无先后顺序，不同组的应用制品则根据编号顺序进行部署。

     例如，应用制品 A 依赖于应用制品 B，选择应用制品时，可将应用制品 B 设为第一组，应用制品 A 设为第二组，则部署时制品 B 将先于制品 A 部署。此外，同一应用下的制品不可重复选择。

  3. 填写内容。内容即对该项目制品的描述，可以是 Changelog 或备注信息，支持 Markdown 语法。

  4. 点击 **提交**，完成项目制品创建。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/01/e766b065-1d06-43ac-9219-11b07f5d81bd.png)

* **选择文件创建**

  该方式用于满足将项目制品从某一项目导入至另一项目的场景。若选择文件创建，需提前下载项目制品包（ZIP 格式）至本地（具体请参见 [下载制品](#下载制品)），随后在目标项目中上传该文件。

  平台将自动解析文件中项目制品的版本及依赖的应用制品信息。

  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/4e643be5-d490-4cd2-849c-c0ced3a93773.png)

  :::tip 提示

  * 上传的项目制品中引用的应用制品，其对应应用必须存在于本项目中，否则将上传失败。
  * 若本项目中不存在上传的项目制品引用的应用制品，则平台将根据制品包的内容自动创建应用制品。若已存在相同版本的应用制品，则取消创建，直接引用该应用制品。若制品包中应用制品的 dice.yml 与已存在的同名应用制品的 dice.yml 不同，则制品包中的 dice.yml 将被忽略。

  :::


* **通过 Project Artifacts Action 创建**

在您的流水线中添加 项目打包发布制品 Action。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/13/7830e1e8-a21e-491c-af27-3718484e9688.png)

用代码编辑模式编辑此 Action。

Project Artifacts Action 的 yaml 描述有两种形式

1. 不指定模式

```yaml
version: "1.1"
stages:
  - stage:
      - project-artifacts:
          alias: project-artifacts
          description: 应用制品发布到项目制品
          version: "1.0"
          params:
            changeLog: auto compose from applications // 项目制品的内容
            groups:                                   // 应用制品分组，由一个应用描述列表组成
              - applications:                         // 应用列表
                  - branch: release/1.0               // 应用制品分支, 选择该分支下最新的发布到项目
                    name: applicationA                // 应用名称
                  - releaseID: a9af810ebd884107a3b9a  // 指定的应用制品 ID, 优先级高于 branch
              - applications:
                  - branch: release/1.0
                    name: applicationB
                  - branch: master
                    name: applicationC
            version: 1.0.0+${{ random.date }}         // 项目 release 的版本号
```

通过这种方式创建的项目制品中会包含一个名为`default`的部署模式，其中包含您在`groups`字段中指定的所有应用制品。上面的 yaml 描述对应这样的项目制品：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/13/eb4a654f-7a0f-4791-a398-85024feffb06.png)

2. 指定模式

```yaml
version: "1.1"
stages:
  - stage:
      - project-artifacts:
          alias: project-artifacts
          description: 应用制品发布到项目制品
          version: "1.0"
          params:
            changeLog: auto compose from applications // 项目制品的内容
            modes:                                    // 部署模式，优先级高于 groups
              modeA: 
                dependOn:                             // 依赖模式
                  - modeB
                expose: true                          // 是否展示
                groups:
                  - applications:                         
                      - branch: release/1.0               
                        name: applicationA 
                      - releaseID: a9af810ebd884107a3b9a
                  - applications:
                      - branch: release/1.0
                        name: applicationB
              modeB:
                expose: false
                groups:
                  - applications:
                      - branch: release/1.0
                        name: applicationC
              modeC:
                expose: true
                groups:
                  - applications:
                      - branch: master
                        name: applicaitonD
            version: 1.0.0+${{ random.date }}         // 项目 release 的版本号
```

通过这种方式，您可以指定模式名称，并在每个模式中自定义分组。这种方式的优先级要高于第一种方式，也就是说，如果在 action 的 yaml 描述中既指定了 `groups` 字段又指定了 `modes` 字段，则只有 `modes` 字段会生效， `groups` 字段会被忽略。上面的 yaml 描述对应这样的项目制品：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/13/ae48abd3-b680-4fcf-8571-e7fb57393eea.png)

其中 modeB 指定了 `expose: false`，这表示该模式不能在项目制品详情页面中被展示出来，部署时也不能被选择。只有选择 modeA 时，modeB 才会被部署。

## 制品操作

在制品页面，您可对制品进行删除、下载、编辑等操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/537761b0-ffce-415d-b5ca-8fdfbf60f2d6.png)

其中，非正式制品支持转为正式版和删除的批量操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/28/98af2305-de3f-44fa-9883-a4a2b43055dd.png)

### 删除制品

* **应用制品**

  如需删除应用制品，则该应用制品需满足以下条件：

  * 当前无该应用制品部署的 Runtime。
  * 无项目制品引用该应用制品。
  * 该应用制品为非正式版。

  删除应用制品后，该应用制品的镜像也将从镜像仓库中删除。

* **项目制品**

  非正式项目制品均可删除。

### 下载制品

仅项目制品支持下载。

点击 **下载**，您将得到一个 ZIP 格式的文件，其中包含项目制品及其引用的应用制品的信息。您可在平台的其他项目环境中上传该制品包以创建新的项目制品。

### 编辑制品

仅非临时、非正式制品支持编辑。

* **应用制品**：支持修改版本和内容。
* **项目制品**：支持修改版本、应用制品和内容。

### 转正制品

仅非临时、非正式制品支持转为正式版。

应用制品或项目制品转为正式版后，将不可修改（包括编辑、删除或转正）。

若项目制品转为正式版，其引用的非正式应用制品也将自动转为正式版。

### 查看引用制品

仅项目制品支持查看引用制品。

点击 **查看引用制品**，页面将跳转至应用制品，并展示该项目制品引用的所有应用制品。


## 制品部署

制品部署有两种方式，分别是通过流水线部署和通过部署单部署（具体请参见[通过流水线部署](./deploy-by-cicd-pipeline.html)、[通过部署单部署](./deploy-order.html)）

目前通过流水线部署暂时不支持部署项目制品时选择模式，只支持部署项目制品中的 default 模式。