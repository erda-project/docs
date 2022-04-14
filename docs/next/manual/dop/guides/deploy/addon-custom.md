# 自定义扩展服务

## 应用场景

* 非平台部署的中间件服务（例如单独购置机器部署的 MySQL 等）
* 公用的三方服务（例如短信渠道配置等）

## 设置入口

进入 **DevOps 平台 > 项目 > 应用中心 > 环境部署 > Addons**，点击右上角 **添加服务**，其中 **三方服务** 需选择 **Custom**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/13be9e0b-1983-4a7c-90f5-0c210e748bd6.png)

填写业务配置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/250afbbf-af0f-4386-bcf9-be4fa174f10a.png)

:::tip 提示

修改服务参数后需重启所有关联应用。此操作可能影响所有关联应用，请谨慎操作。

:::

## 使用入口

进入 **我的应用 > 代码**，打开 dice.yml，进入编辑模式，选择此前创建的 Addon。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/fb74ddd6-1755-4956-b4ca-5a3a6351fc05.png)

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

进入 **DevOps 平台 > 我的项目 > 选择项目 > 扩展服务 > 添加服务**，选择 **Custom** 类型服务，创建方式选择 **配置导入**，粘贴上文导出的 JSON（如有需要，可根据实际情况修改配置参数），即可将自定义 Addon 从其他项目导入至当前项目。

## 部署时平滑切换类似中间件

开发者在开发阶段，使用的中间件往往是便捷而低成本的 Erda 开箱即用中间件，而在交付的时候，又希望在不修改制品的情况下平滑切换到更稳定的第三方类似中间件，此时就可以使用 "部署时平滑切换类似中间件" 的功能。

类似中间件是指对同一功能的中间件的不同实现。如当用户想使用 MySQL 时，可以选择使用第三方 Addon `Alicloud-RDS`，也可以选择 Erda 开箱即用的 `erda mysql`。这里的 `Alicloud-RDS` 和 `erda mysql` 都是对 MySQL 的实现，它们的关系就是类似中间件。

用户使用定义了 Erda 开箱即用的 Addon 的制品进行部署时，如果项目下有**同名的**第三方实现的类似中间件，被部署的服务会优先引用这个第三方实现的类似中间件。

Erda 平台支持的类似中间件有：

| 中间件类型         | 第三方实现           | Erda 实现                 |
|:--------------|-----------------|-------------------------|
| MySQL         | 	alicloud-rds   | 	erda mysql             |
| ElasticSearch | 	alicloud-es    | 	terminus-elasticsearch |
| RocketMQ      | 	alicloud-ons   | 	erda rocketmq          |
| Redis         | 	alicloud-redis | 	erda redis             |

### 用法示例

用户在 dice.yml 或制品中定义 Addons，
> dice.yml
```yaml
addons:
  demo-mysql:
    plan: "mysql:basic"
  demo-es:
    plan: "terminus-elasticsearch:basic"
  demo-mq:
    plan: "rocketmq:basic"
  demo-redis:
    plan: "redis:basic"
```

且在 Addons 页面添加了**同名的**第三方实现的类似中间件。

![**同名的**第三方实现的类似中间件](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/04/14/05469600-608a-44ce-873a-367b382776d2.png)

**新**部署服务时，服务将优先引用这些**同名的**类似中间件。

:::tip 提示
当服务的 Runtime 已存在，想要从 Erda 中间件切换到第三方类似中间件（或从第三方类似中间件切换到 Erda 中间件），应当先删除 Runtime，添加（或删除）**同名的**类似第三方中间件，然后重新部署。
:::
