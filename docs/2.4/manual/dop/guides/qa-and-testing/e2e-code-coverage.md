# 代码覆盖率统计

:::tip 提示
目前代码覆盖率统计仅支持 Java 应用，其他应用暂不支持。
:::

## Java 应用添加 sourcecov addon

进入 **DevOps 平台 > 项目 > 应用中心 > 应用 > 代码** 编辑 dice.yml。

图形编辑模式下，在搜索栏输入 **sourcecov**，选择 **通用能力** 中的 **集成测试覆盖率统计**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/424795f7-b2be-4acb-9716-7dac75ba09a4.png)

## 新建流水线执行，重新部署中心实例

进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署**。

完成流水线构建后，部署中心的服务插件将增加对应的 Addon。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/0e204e6a-ef9a-460a-93e8-64f1ec92e0ab.png)

## 多个应用添加 sourcecov addon

多个应用的 dice.yml 图形编辑页面中可新建多个 sourcecov，但部署执行后，仅有一个应用拥有 sourcecov 的服务插件，其他应用应引用同一个 sourcecov 的实例，而非新建，如下所示：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/424795f7-b2be-4acb-9716-7dac75ba09a4.png)

:::tip 提示
单个应用可使用 sourcecov 基础版，多个应用请使用旗舰版。
:::

## 覆盖率统计
进入 **DevOps 平台 > 项目 > 测试管理 > 统计 > 代码覆盖率统计**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/ca4ac369-616a-4892-8d9d-77cf2e6564aa.png)

### 开始
完成 Addon 添加后，即可在对应环境开启代码覆盖率统计。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/1378cfa5-ec1d-4667-ae2c-5d18fd440edf.png)
点击 **开始** 按钮，一段时间后方可点击 **结束** 按钮。您可手动刷新该页面，刷新时间间隔建议为分钟级。

:::tip 提示
点击 **开始** 按钮后，**开始**、**结束** 和 **统计对象配置** 按钮均不可用。
:::

### 结束

点击 **结束** 按钮，一段时间后方可生成统计结果。您可手动刷新该页面，刷新时间间隔建议为分钟级。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/452975cf-a0ae-4a6e-a3ae-667bad2cc76f.png)
:::tip 提示
点击 **结束** 按钮后，**开始**、**结束** 和 **统计对象配置** 按钮均不可用。
:::

### 强制取消
点击强制取消按钮无时间限制。点击后此次执行将标记为用户取消状态，无法生成覆盖率统计图，亦无法下载统计报告。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/6c52c30e-f1f5-4525-8641-d232acc6e260.png)

### 执行记录

点击 **执行记录** 可查看历史执行记录并下载统计报告。下载的报告为 JaCoCo 标准覆盖率统计文件，其中日志栏目记录 Addon 执行过程中的错误信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/d64f3375-c8c6-4f68-81f3-f55cbcd69943.png)

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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/3823f0e6-3b1d-4ad9-80e5-79d517794013.png)

### 趋势图

趋势图展示执行记录的覆盖率趋势，可点击蓝色圆点，下方的矩阵树图将展示对应的包统计信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/f1e70ef2-7cb1-45ae-b5cc-012c09abeffe.png)


### 矩阵树图

矩阵树图将根据共有的包前缀进行分割，展示共有包下的子包名。点击可根据包名层层递进，默认展示最新执行记录的矩阵树图。矩阵树图仅统计包的覆盖率，方法和类的覆盖率需下载 JaCoCo 覆盖率文件查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/25/e7607a7b-7a6b-4e38-b5c7-1b76fab58ca3.png)

