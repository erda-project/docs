# 代码覆盖率统计

:::tip 提示
目前代码覆盖率统计仅支持 Java 应用，其他应用暂不支持。
:::

## Java 应用添加 sourcecov addon

进入 **DevOps 平台 > 我的项目 > 应用列表 > 代码仓库 > 代码浏览** 编辑 erda.yml。

图形编辑模式下，在搜索栏输入 **sourcecov**，选择 **通用能力** 中的 **集成测试覆盖率统计**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/550b4db1-ed29-4aa6-b0a3-b43bb21d0297.png)

## 新建流水线执行，重新部署中心实例

进入 **DevOps 平台 > 我的项目 > 应用列表 > 部署中心**。

完成流水线构建后，部署中心的服务插件中将增加对应的 addon。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/c7c60a6b-888f-4912-a7a5-1a97f65ecc81.png)

## 多个应用添加 sourcecov addon

多个应用的 erda.yml 图形界面上可新建多个 sourcecov。但是部署执行后，仅有一个应用有 sourcecov 的服务插件，这里做了限制，其他应用应引用同一个 sourcecov 的实例，而非新建，操作如下图所示：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/65496d7b-a6ac-4787-8d28-63f633b9aec0.png)

:::tip 提示
单个应用可使用 sourcecov 基础版，多个应用请使用旗舰版。
:::

## 覆盖率统计
进入 **DevOps 平台 > 我的项目 > 测试 > 统计 > 代码覆盖率统计**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/7cd2e1f1-2bda-45c6-bc95-0be6098b4249.png)

### 开始
addon 增加完后，即可在对应环境开启代码覆盖率统计。
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/d4c4dfa2-1873-44ee-8997-eb98f97e2261.png)
点击 **开始** 按钮后，需要过一些时间才能点击 **结束** 按钮，页面不会自动刷新，用户过一小段时间后手动刷新，时间间隔建议为分钟级。

:::tip 提示
点击 **开始** 按钮后，**开始**、**结束** 和 **统计对象配置** 按钮均不可用。
:::

### 结束

点击 **结束** 按钮后，需要经过一段时间统计结果才会生成，页面不会自动刷新，用户过一小段时间后手动刷新，时间间隔建议为分钟级。
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/06116819-be86-4e3b-9fd0-e9adda24b7aa.png)
:::tip 提示
点击 **结束** 按钮后，**开始**、**结束** 和 **统计对象配置** 按钮均不可用。
:::

### 强制取消
强制取消任何时间都可以点击，点击后，可以在执行记录中看到状态为用户取消，用户取消后，覆盖率统计图不会被统计，报告的下载按钮也无法点击下载。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/be01ec4c-e888-446c-855a-22b29715f9de.png)

### 执行记录

点击执行记录可以看到历史执行记录，右侧可以点击下载报告按钮，下载的文件是 JaCoCo 标准覆盖率统计文件，中间有个日志栏目，记录的是 addon 执行过程中的错误信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/eecd0bea-8da8-4b6a-a33e-87af6891c654.png)

:::tip 提示
文件保留时间为六个月，到期后将无法下载。
:::

### 统计对象配置

#### 包含和不包含
包含不包含代表对应的包是否在统计范围内，一般在包含中用户可以填写自己应用的统一包名前缀，然后不包含去排除一些没用的包，具体填写规则如下。

可通过在包括和不包括中输入表达式来确定统计范围；多个表达式可以使用冒号 ( : ) 分隔，且支持 * 通配符。示例如下：

`org/apache*` 将匹配所有以 org/apache 开头的源码目录    
`*/model` 将匹配所有以 model 结尾的目录    
`foo/*:bar/*` 匹配所有以 foo 或者 bar 开头的目录

#### Maven 设置
Maven 的 setting.xml 配置，用于连接 Nexus 下载 source.jar。

在点击开始执行的时候，sourcecov addon 会去根据应用的 jar 包下载对应的 source.jar，只有下载到了 source.jar 在执行明细中下载的 JaCoCo 覆盖率文件才能看到代码行数的覆盖率图，
否则只有代码行数覆盖，方法的具体行数无法看到。
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/ab43b556-e912-48ee-9d17-3bb4ca2f3605.png)

### 趋势图

趋势图展示执行记录的覆盖率趋势，可点击蓝色圆点，下方的矩阵树图将展示对应的包统计信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/8a8d79ea-dc2b-4a85-b4a6-d0340157a46c.png)


### 矩阵树图

矩阵树图将根据共有的包前缀进行分割，展示共有包下的子包名，点击可以根据包名层层递进，默认展示最新执行记录的矩阵树图，矩阵树图仅统计包的覆盖率，方法和类的覆盖率需下载 JaCoCo 覆盖率文件查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/653929d6-cd0b-48ca-98b0-1323da1016e9.png)

