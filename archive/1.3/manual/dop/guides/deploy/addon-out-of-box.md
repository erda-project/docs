# 开箱即用扩展服务

## 使用场景

* 开箱即用
* 一键拉起

::: tip 提示
MySQL 不提供生产级别支持，建议只在开发测试环境使用。
:::

## 创建/使用入口

::: tip 提示
开箱即用的扩展服务（Addon）使用入口即创建入口，使用时可以直接申请全新 Addon 创建。
:::

进入 **DevOps 平台 > 我的项目 > 应用列表 > 应用详情 > 代码浏览**，打开 erda.yml，进入编辑模式，选择开箱即用的 Addon。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/903bae9e-8716-4d8e-84c0-b033a64b04a9.png)

保存后，进行构建和部署，最终生效。

### 新建和实例的区别

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/e2996bbb-b16b-4a6b-a1df-2c22ed1a8f5a.png)

如上图，选择实例时会有实例和非实例的区别：
1. 有 **实例** 标签的，代表是这个项目中，已经发起的扩展服务实例（例如这个项目中其他应用已经申请创建的）。
2. 没有 **实例** 标签的，是允许当前应用创建全新的扩展服务，当编辑完成，进行构建和发布后，扩展服务便自动拉起并将配置注入给程序。

## 使用方式

通过系统环境变量的方式，业务程序便可以拿到配置，以 Spring Boot 程序为例，可以通过 application.yml 中 `${MYSQL_HOST}` 的方式获取配置。

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

每款开箱即用扩展服务均有其特色的环境变量配置，关于扩展服务更多信息，请参见 [扩展服务名录](https://www.erda.cloud/market/addon)。

可在扩展服务详情页面查看使用介绍，红框位置描述了这款扩展服务提供的配置清单：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/75a798c2-c5e6-4f26-8163-d37840558ccf.png)
