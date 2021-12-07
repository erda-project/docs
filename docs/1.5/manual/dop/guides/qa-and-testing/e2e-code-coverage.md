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

完成流水线构建后，部署中心的服务插件将增加对应的 Addon。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/c7c60a6b-888f-4912-a7a5-1a97f65ecc81.png)

## 多个应用添加 sourcecov addon

多个应用的 erda.yml 图形编辑页面中可新建多个 sourcecov，但部署执行后，仅有一个应用拥有 sourcecov 的服务插件，其他应用应引用同一个 sourcecov 的实例，而非新建，如下所示：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/65496d7b-a6ac-4787-8d28-63f633b9aec0.png)

:::tip 提示
单个应用可使用 sourcecov 基础版，多个应用请使用旗舰版。
:::

## 覆盖率统计
进入 **DevOps 平台 > 我的项目 > 测试 > 统计 > 代码覆盖率统计**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/7cd2e1f1-2bda-45c6-bc95-0be6098b4249.png)

### 开始
完成 Addon 添加后，即可在对应环境开启代码覆盖率统计。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/d4c4dfa2-1873-44ee-8997-eb98f97e2261.png)
点击 **开始** 按钮，一段时间后方可点击 **结束** 按钮。您可手动刷新该页面，刷新时间间隔建议为分钟级。

:::tip 提示
点击 **开始** 按钮后，**开始**、**结束** 和 **统计对象配置** 按钮均不可用。
:::

### 结束

点击 **结束** 按钮，一段时间后方可生成统计结果。您可手动刷新该页面，刷新时间间隔建议为分钟级。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/06116819-be86-4e3b-9fd0-e9adda24b7aa.png)
:::tip 提示
点击 **结束** 按钮后，**开始**、**结束** 和 **统计对象配置** 按钮均不可用。
:::

### 强制取消
点击强制取消按钮无时间限制。点击后此次执行将标记为用户取消状态，无法生成覆盖率统计图，亦无法下载统计报告。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/be01ec4c-e888-446c-855a-22b29715f9de.png)

### 执行记录

点击 **执行记录** 可查看历史执行记录并下载统计报告。下载的报告为 JaCoCo 标准覆盖率统计文件，其中日志栏目记录 Addon 执行过程中的错误信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/eecd0bea-8da8-4b6a-a33e-87af6891c654.png)

:::tip 提示
文件保留时间为六个月，到期后将无法下载。
:::

### 统计对象配置

#### 包含和不包含
包含和不包含用于判断对应的包是否在统计范围内，在包含中可填写应用的统一包名前缀，以不包含排除部分无关的包。

输入相应表达式，多个表达式可用冒号（：）分隔，且支持 * 通配符。具体示例如下：

* `org/apache*` 将匹配所有以 org/apache 开头的源码目录。    
* `*/model` 将匹配所有以 model 结尾的目录。    
* `foo/*:bar/*` 匹配所有以 foo 或者 bar 开头的目录。

#### Maven 设置
Maven 的 setting.xml 配置用于连接 Nexus 下载 source.jar。

启动执行后，sourcecov addon 将根据应用的 JAR 包下载对应的 source.jar。完成 source.jar 下载方可在 JaCoCo 覆盖率文件中查看代码行数的覆盖率图。
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/ab43b556-e912-48ee-9d17-3bb4ca2f3605.png)

### 趋势图

趋势图展示执行记录的覆盖率趋势，可点击蓝色圆点，下方的矩阵树图将展示对应的包统计信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/8a8d79ea-dc2b-4a85-b4a6-d0340157a46c.png)


### 矩阵树图

矩阵树图将根据共有的包前缀进行分割，展示共有包下的子包名。点击可根据包名层层递进，默认展示最新执行记录的矩阵树图。矩阵树图仅统计包的覆盖率，方法和类的覆盖率需下载 JaCoCo 覆盖率文件查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/09/653929d6-cd0b-48ca-98b0-1323da1016e9.png)

