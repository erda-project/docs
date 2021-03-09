# 自定义扩展服务

## 使用场景

* 非平台部署的中间件服务（比如单独购置机器部署的 mysql 等）
* 公用的三方服务（比如短信渠道配置等）

## 设置入口

> DevOps 平台 -> 我的项目 -> 项目详情 -> 扩展服务 -> 右上角添加服务

注意 “三方服务” 选择 **Custom**

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/09/46234c44-6ee2-421d-b1fa-542f2e040aed.png)

填写业务配置

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/09/1bea9fb8-547f-4187-8133-8ea1b21803ab.png)

## 使用入口

> DevOps 平台 -> 我的项目 -> 应用列表 -> 应用详情 -> 代码浏览

打开 dice.yml，进入编辑模式，选择先前创建的 addon

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/09/ed4d81c3-1709-45ab-8d96-a759c5189924.png)

保存后，进行构建和部署，最终生效

## 使用方式

通过系统环境变量的方式，业务程序便可以拿到配置，以 `spring-boot` 程序为例，可以通过 application.yml 中 ${MYSQL_HOST} 的方式获取到配置

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

## 导入导出自定义扩展服务

### 导出

> DevOps 平台 -> 我的项目 -> \<选择某个项目\> -> 扩展服务

在 `自定义` 部分, 有 `查看配置` 按钮, 内容是当前项目下所有 自定义 addon 的 json 形式配置.

### 导入

> DevOps 平台 -> 我的项目 -> \<选择某个项目\> -> 扩展服务 -> 添加服务

选择 `Custom` 类型服务, 创建方式选择 `配置导入`, 将上面 `导出` 中获取的 json 粘贴, 如有需要, 根据实际情况修改配置参数, 
即可实现将自定义addon从其他项目导入到当前项目
