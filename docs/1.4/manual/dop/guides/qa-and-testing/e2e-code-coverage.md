# 代码覆盖率统计

:::tip
目前代码覆盖率统计只支持 java 应用，其他应用暂时不支持
:::

## java 应用添加 sourcecov addon

**进入 DevOps 平台 > 我的项目 > 应用列表 -> 代码仓库 -> 代码浏览**。

编辑 `erda.yml`

`erda.yml` 的图形编辑下, 搜索栏目输入`sourcecov`, 选中`通用能力`中的`集成测试覆盖率统计` 

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/4ed88998-422e-47b3-9eb9-cf8496a77f6c.png)

## 流水线中新建流水线执行，重新部署中心实例
**进入 DevOps 平台 > 我的项目 > 应用列表 -> 部署中心**。

构建成功后，部署中心`服务插件`将会多出一个对应的 `addon`

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/4e27d621-3d9a-48a6-9781-1c596392ab5c.png)

## 多个应用如何使用

多个应用的 `erda.yml` 图形界面上可以新建多个 `sourcecov`, 但是部署执行后，只会有一个应用有 `sourcecov` 的服务插件，这里做了限制，其他应用应引用同一个 `sourcecov` 的实例，而不是新建，操作如下图所示

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/99f223b9-495e-469e-b630-5a4a2866a0a9.png)

:::tip
单个应用可以使用 sourcecov 的基础版，如果应用过多请使用旗舰版
:::

## 覆盖率统计
**进入 DevOps 平台 > 我的项目 > 测试 -> 统计 -> 代码覆盖率统计**。

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/83105c67-23d1-4759-897a-763655517c84.png)

### 开始
addon 增加完后，就可以去对应环境的界面上点击开始了

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/9637236d-0f9a-445a-a494-a84c46146766.png)

`开始按钮`点击完，需要过一些时间才能点击`结束按钮`，页面不会自动刷新，用户过一小段时间后手动刷新, 时间间隔最好是分钟级

:::tip
开始按钮点击后，`开始按钮`,`结束按钮` 和 `统计对象配置按钮` 都不可用
:::

### 结束

`结束按钮`点击后，需要经过一段时间统计结果才会生成，页面不会自动刷新，用户过一小段时间后手动刷新，时间间隔最好是分钟级

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/42f05c2c-7f28-4204-9cad-1b4c4a98cb9e.png)

:::tip
结束按钮点击后，`开始按钮`,`结束按钮` 和 `统计对象配置按钮` 都不可用
:::

### 强制取消
强制取消任何时间都可以点击，点击后，可以在执行记录中看到状态为用户取消，用户取消后，覆盖率统计图不会被统计，报告的下载按钮也无法点击下载

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/fba329a8-2c1e-480f-9371-0d5779bd228e.png)

### 执行记录

点击执行记录可以看到历史执行记录，右侧可以点击下载报告按钮，下载的文件是 `jacoco` 标准覆盖率统计文件，中间有个日志栏目，记录的是 addon 执行过程中的错误信息

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/fba329a8-2c1e-480f-9371-0d5779bd228e.png)

:::tip
文件会保留 6 个月时间，6 个月后将无法下载
:::

### 统计对象配置

#### 包含和不包含
包含不包含代表对应的包是否在统计范围内，一般在包含中用户可以填写自己应用的统一包名前缀，然后不包含去排除一些没用的包，具体填写规则如下

可以通过在包括和不包括中输入表达式来确定统计范围；多个表达式可以使用冒号 ( : ) 分隔, 且支持 * 通配符。例子：

`org/apache*` 将匹配所有以 org/apache 开头的源码目录    
`*/model` 将匹配所有以 model 结尾的目录    
`foo/*:bar/*` 匹配所有以 foo 或者 bar 开头的目录

#### maven 设置
maven 的 setting.xml 配置，用于连接 nexus 下载 source.jar

在点击开始执行的时候，`sourcecov` `addon` 会去根据应用的 `jar` 包下载对应的 `source.jar`, 只有下载到了 `source.jar` 在执行明细中下载的 `jacoco` 覆盖率文件才能看到代码行数的覆盖率图，
否则只有代码行数覆盖，方法的具体行数无法看到

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/7a031907-1238-41ad-b5fe-4c1a0d5b7970.png)

### 趋势图

展示的是执行记录的覆盖率趋势图，其中的蓝色的点可以点击，点击后下方的矩阵树图将会展示当时的包统计信息

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/72051465-2129-453d-8bf9-9a09802dfd42.png)


### 矩阵树图

矩阵树图，根据共有的包前缀进行分割，展示共有包下的子包名，点击可以根据包名层层递进，默认展示最新的执行记录的矩阵树图，矩阵树图只会统计包的覆盖率，方法和类的覆盖率具体要下载 `jacoco` 覆盖率文件才能看

![sourcecov](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/08/69df6a71-3c90-4035-aaf1-b0d99660f1f8.png)

