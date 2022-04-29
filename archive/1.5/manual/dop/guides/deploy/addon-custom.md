# 自定义扩展服务

## 应用场景

* 非平台部署的中间件服务（例如单独购置机器部署的 MySQL 等）
* 公用的三方服务（例如短信渠道配置等）

## 设置入口

进入 **DevOps 平台 > 我的项目 > 项目详情 > 扩展服务**，点击右上角 **添加服务**，其中 **三方服务** 需选择 **Custom**。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/24cab9f9-c42d-4645-bb18-56e779593c28.png)

填写业务配置，红框为必填项。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/7ebb4615-c02e-4f03-bd0e-f2c0aec0ea94.png)

:::tip 提示

修改服务参数后需重启所有关联应用。此操作可能影响所有关联应用，请谨慎操作。

:::

## 使用入口

进入 **DevOps 平台 > 我的项目 > 应用列表 > 应用详情 > 代码浏览**，打开 dice.yml，进入编辑模式，选择此前创建的 Addon。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/06b83bf3-b12e-4e1d-8761-6e236f824eb4.png)

完成编辑后，重新构建和部署流水线，使配置生效。

## 使用方式

业务程序可通过系统环境变量的方式获取配置。以 Spring Boot 程序为例，可通过 application.yml 中  `${MYSQL_HOST}` 的方式获取配置。

```yaml
server:
  port: 8080

spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://${MYSQL_HOST:127.0.0.1}:${MYSQL_PORT:3306}/${MYSQL_DATABASE}?useUnicode=true&characterEncoding=UTF-8
    username: ${MYSQL_USERNAME:root}
    password: ${MYSQL_PASSWORD:}
```

## 导入导出

### 导出

进入 **DevOps 平台 > 我的项目 > 选择项目 > 扩展服务**，在 **自定义** 中点击 **查看配置**，可查看当前项目下所有自定义 Addon 的 JSON 形式配置。

### 导入

进入 **DevOps 平台 > 我的项目 > 选择某个项目 > 扩展服务 > 添加服务**，选择 **Custom** 类型服务，创建方式选择 **配置导入**，粘贴上文导出的 JSON（如有需要，可根据实际情况修改配置参数），即可将自定义 Addon 从其他项目导入至当前项目。
