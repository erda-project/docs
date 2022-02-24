# 代码覆盖率统计

:::tip 提示
目前代码覆盖率统计仅支持 Java 应用，其他应用暂不支持。
:::

## Java 应用添加 sourcecov addon

进入 **DevOps 平台 > 我的项目 > 应用列表 > 代码仓库 > 代码浏览** 编辑 erda.yml。

图形编辑模式下，在搜索栏输入 **sourcecov**，选择 **通用能力** 中的 **集成测试覆盖率统计**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/7d6abb99-3ada-4c27-8418-92e216eb7d54.png)

## 新建流水线执行，重新部署中心实例

进入 **DevOps 平台 > 我的项目 > 应用列表 > 部署中心**。

完成流水线构建后，部署中心的服务插件将增加对应的 Addon。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/55fc90c5-08d6-47d4-8824-8dc3e6421c24.png)

## 多个应用添加 sourcecov addon

多个应用的 erda.yml 图形编辑页面中可新建多个 sourcecov，但部署执行后，仅有一个应用拥有 sourcecov 的服务插件，其他应用应引用同一个 sourcecov 的实例，而非新建，如下所示：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/2c8f0036-e93b-4f01-9c03-2e2457a15b9d.png)

:::tip 提示
单个应用可使用 sourcecov 基础版，多个应用请使用旗舰版。
:::

## 覆盖率统计
进入 **DevOps 平台 > 我的项目 > 测试 > 统计 > 代码覆盖率统计**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/498715ae-8bfd-4196-810d-cc3d37c0f6bb.png)

### 开始
完成 Addon 添加后，即可在对应环境开启代码覆盖率统计。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/3d389efa-5043-493c-a730-df793aa53b4f.png)
点击 **开始** 按钮，一段时间后方可点击 **结束** 按钮。您可手动刷新该页面，刷新时间间隔建议为分钟级。

:::tip 提示
点击 **开始** 按钮后，**开始**、**结束** 和 **统计对象配置** 按钮均不可用。
:::

### 结束

点击 **结束** 按钮，一段时间后方可生成统计结果。您可手动刷新该页面，刷新时间间隔建议为分钟级。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/c3466c0a-0b89-4f11-b310-38424ee52e81.png)
:::tip 提示
点击 **结束** 按钮后，**开始**、**结束** 和 **统计对象配置** 按钮均不可用。
:::

### 强制取消
点击强制取消按钮无时间限制。点击后此次执行将标记为用户取消状态，无法生成覆盖率统计图，亦无法下载统计报告。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/c5a2bbad-7e9a-459b-8efc-1250b66427ee.png)

### 执行记录

点击 **执行记录** 可查看历史执行记录并下载统计报告。下载的报告为 JaCoCo 标准覆盖率统计文件，其中日志栏目记录 Addon 执行过程中的错误信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/387bf914-46a2-4fd2-80a5-13f9fe7820ab.png)

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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/080c7aa3-8f10-43ce-bd81-32afc14d9f37.png)

### 趋势图

趋势图展示执行记录的覆盖率趋势，可点击蓝色圆点，下方的矩阵树图将展示对应的包统计信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/be60fa95-d48a-4dd4-a8ea-4b62db8f1bf9.png)


### 矩阵树图

矩阵树图将根据共有的包前缀进行分割，展示共有包下的子包名。点击可根据包名层层递进，默认展示最新执行记录的矩阵树图。矩阵树图仅统计包的覆盖率，方法和类的覆盖率需下载 JaCoCo 覆盖率文件查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/5a1a2b91-7315-491c-9bf7-3e152f6af3cf.png)

