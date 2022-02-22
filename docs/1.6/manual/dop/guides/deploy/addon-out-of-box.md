# 开箱即用扩展服务

## 应用场景

* 开箱即用
* 一键拉起

::: tip 提示
MySQL 不提供生产级别支持，建议仅在开发和测试环境使用。
:::

## 创建/使用入口

::: tip 提示
开箱即用的扩展服务（Addon）使用入口即创建入口。
:::

进入 **我的应用 > 代码仓库 > 代码浏览**，打开 erda.yml，进入编辑模式，选择开箱即用的 Addon。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/62a0b33f-435d-42cc-9e6a-8b0357b4a3e9.png)

完成编辑后，重新构建和部署流水线，使配置生效。

如下图所示，选择实例时有以下两类可选：

<img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e2996bbb-b16b-4a6b-a1df-2c22ed1a8f5a.png" style="zoom:50%;" />

* **有实例标签**：代表该项目中已发起的扩展服务实例（例如该项目中其他应用已申请创建的实例）。

* **无实例标签**：允许当前应用创建全新的扩展服务。

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

各项开箱即用扩展服务均有其特有的环境变量配置，具体请参见 [扩展服务](https://www.erda.cloud/market/addon)。

您可在详情页查看其使用说明，配置参数部分描述该扩展服务所提供的配置清单。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/75a798c2-c5e6-4f26-8163-d37840558ccf.png)
