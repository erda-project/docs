# 开箱即用扩展服务

## 使用场景

* 开箱即用
* 一键拉起

::: tip
mysql 不提供生产级别支持，建议只在开发测试环境使用
:::

## 创建/使用入口

::: tip
开箱即用的扩展服务（addon）使用入口即创建入口，使用时可以直接申请全新 addon 创建
:::

> DevOps 平台 -> 我的项目 -> 应用列表 -> 应用详情 -> 代码浏览

打开 dice.yml，进入编辑模式，选择开箱即用的 addon

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/11/fa77c96c-ba56-45b1-8cf6-ebcfe831ab39.png)

保存后，进行构建和部署，最终生效

### 新建和实例的区别

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/11/05a48a09-9a00-4502-953c-351f614308f7.png)

如上图，选择实例时会有实例和非实例的区别
1. 有“实例”标签的，代表是这个项目中，已经发起的扩展服务实例（例如这个项目中其他应用已经申请创建的）
2. 没有“实例”标签的，是允许当前应用创建全新的扩展服务，当编辑完成，进行构建和发布后，扩展服务便自动拉起并将配置注入给程序z

## 使用方式

通过系统环境变量的方式，业务程序便可以拿到配置，以 `spring-boot` 程序为例，可以通过 application.yml 中 ${MYSQL_HOST} 的方式获取到配置。

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

每款开箱即用扩展服务均有其特色的环境变量配置，详细可进入：[扩展服务名录](https://dice.terminus.io/market/addon)，参看每款扩展服务的配置，以 mysql 为例： [MYSQL](https://dice.terminus.io/market/addon/mysql)

可在扩展服务详情页面查看使用介绍，红框位置描述了这款扩展服务提供的配置清单：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/11/35f9b7f5-2453-4023-b25f-b81c49cff6ca.png)