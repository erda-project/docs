---
sidebar: auto
---

# FAQ

## Dice 平台的开发规范 ？

Dice 基于 [**Git**](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6) 对应用代码进行版本控制。详情可查看 [**代码规范**](/spec/code-manage.md)。

## Dice 3.0 为何取消了很多配置功能 ？

我们在 Dice 3.0 的改版中，确立了**代码即架构(Infrastructure As Code)** 的核心思想，这是一种通过代码来定义计算和网络基础设施的方法，它可以应用于任何软件系统中。这样的代码放在源代码管理中，具有可审查性、可重用型，并且符合测试惯例，还完全遵从持续交付的原则。Dice 平台 期望通过这种手段，提升企业在项目交付和迁移的效率问题。
我们希望所有应用通用配置都能在`dice.yml`中完成，而其他业务参数配置可以在应用设置中参数配置中添加。

> [什么是dice.yml](/latest/manual/deploy/dice-yml.html)

## 不同环境变量的优先级是怎样的 ？
对于一个服务，优先级自上而下:

1. 平台环境变量，比如 SELF_HOST, <被发现者服务名大写>_HOST, <被发现者服务名大写>_PORT, DICE_*
2. `dice.yml` 中配置的服务级环境变量
3. 中间件环境变量, MYSQL_HOST, REDIS_PORT
4. “应用设置 > 参数配置” 中的环境级配置
5. `dice.yml` 中配置的应用级环境变量

## 创建流水线报错

`pipeline.yml` 文件有严格的缩进要求，可以使用检查工具检查一下。推荐使用代码仓库中的可视化配置界面进行该文件的编辑。

> [什么是pipeline.yml](/latest/manual/deploy/pipeline.html)

## SPA 应用启动失败

1. 查看流水线的部署日志
2. 查看 Runtime 总览页中服务实例的容器日志，切换到**错误**日志。
如果发现

```nginx
directive "set" is not terminated by ";" in /etc/nginx/conf.d/default.conf:xx
```

这样的日志，说明是 `nginx.conf.template` 文件 xx 行的环境变量没有配置。
需要在 dice.yml 对应的 envs 或 平台的应用设置-部署变量中配置该变量，然后重启 Runtime。

## 前端打包时耗时很久

和本地构建时可独占资源不同，平台的机器为共享资源，所以控制了每个容器的资源占用，前端打包时资源限制为了 1Core 2G。

同时需要注意，在使用如 happypack 等多线程打包插件时，需要把线程数限制为1，避免多线程竞争资源造成速度更慢。

后续平台会尝试推出新的功能，以利用本地构建好的资源进行部署，敬请期待。
