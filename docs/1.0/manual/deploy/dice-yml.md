# dice.yml

## 概述

dice.yml 文件采用 Yaml 语法编写，是一个微服务应用部署的描述文件，由服务基本信息和服务编排关系两部分组成，具体包含了微服务的 Docker 镜像、资源需求（CPU 和 Memory 等）、微服务之间的依赖关系、环境变量以及 AddOn 等信息。一个复杂的微服务应用只要编写了一个有效的 dice.yml 描述文件，就能够被 Erda 一键部署和编排，拉起整个微服务应用。

完整例子位于文档尾部。

## dice.yml 文件全局结构

```yaml
version: 2.0
envs:

services:

addons:

environments:
  development:

  test:

  staging:

  production:

```

dice.yml 文件全局结构定义有 5 项全局配置，分别如下：

### version

version 的值目前定义为 2.0，只需要配置为：`version: 2.0` 即可。


### envs

envs 定义环境变量，envs 分全局定义和 service 内定义两种，此处展示的全局结构为全局定义，通过 envs 配置全局定义的环境变量将被应用到所有的 services 里。全局环境变量和 service 内环境变量重复的时候，以 service 内环境变量为准，也就是 service 内环境变量可以覆盖全局环境变量。

例子：

```yaml
envs:
  Debug: true
  Host: erda.terminus.io
  Key: value
```


### services

services 定义具体的一组 service 集合，为整个应用需要被编排部署的所有服务，具体的内容包含微服务名、resources、deployments、 ports、 envs。

例子：

```yaml
services:
  # serviceA 是自定义的服务 A 的名字，不是 dice.yml 的配置项。
  serviceA:
    resources:
      cpu: 0.1
      max_cpu: 0.5
      mem: 256
    deployments:
      replicas: 2
      labels:
        GROUP: erda
    ports:
      - port: 9093
    envs:
      ADDON_PLATFORM_ADDR: addon

  # serviceB 是自定义的服务 B 的名字，不是 dice.yml 的配置项。
  serviceB:
    ...
```


### addons

addons 是指在应用内能够被所有微服务依赖使用的基础服务，也可以称为微服务的插件服务。 addons 包括但不限于 MySQL、Kafka、ElasticSearch、Redis 等基础软件服务，用户自己研发的微服务也可以沉淀成 addon ，按照定义规则发布的到服务市场，详情请参考 [Addon](../addons/design.md) 介绍。

例子：

```yaml
addons:
  # mysql 是自定义的 Add-On 实例名字
  mysql:
    plan: mysql:basic
    options:
      version: 5.7.23
      # create_dbs 是在MySQL实例上需要创建一个或者多个逻辑库名称
      create_dbs: blog,user
  # zk 也是一个自定义的 AddOn 实例名字
  zk:
    plan: zookeeper:basic
```

### environments

environments 主要是设置应用在每个部署环境中所用的环境配置参数，平台内置有 4 个部署环境，分别是：development、test、staging 和 production。通过 environments 配置可以定制 4 个环境的配置项，做到 4 个环境按需配置。环境配置参数有最高的优先使用权，当 services、addons 内的配置和环境配置冲突的时候，优先使用环境配置。

例子：

```yaml
environments:
  development:
    ...
  test:
    # 测试环境针对 serviceA 做一些特殊的配置
    serviceA:
      ...
  staging:
    ...
  production:
    ...
```

## 配置项

dice.yml 内置了一套配置项用来定义整个微服务应用，它们是编写 dice.yml 的基础。 配置项分为全局配置项、service 配置项、addon 配置项。

### 全局配置项

- version
- envs
- services
- addons
- environments

上文已详细介绍。

### service 配置项

service 配置项顾名思义是对微服务部署具体内容配置。

#### image
> 配置 service 的 docker 镜像名字，默认值为空。这个配置字段不是必须的，采用 CI 部署的时候，可以不填写此字段，未填写的情况下直接会用服务名来获取镜像。

例子：

```yaml
image: nginx:latest
```

#### cmd
> 配置 service 的启动命令，默认值为空。如果不配置 cmd，将启动 docker image 中定义的进程

例子：

```yaml
cmd: echo hello && npm run start
```

#### ports
> 配置 service 监听的端口，可以有多个, 对于需要被暴露给外部用户访问的端口, expose 设置为 true，当不指定 expose 时，如果需要暴露外部使用，默认取第一个端口

例子：

```yaml
ports:
  - port: 1234
    expose: false
  - port: 4321
    expose: true
```

#### envs
> 配置 service 的环境变量，和全局的 envs 定义的环境变量重复的时候会覆盖全局配置，优先使用 service 内配置

例子：

```yaml
envs:
  Debug: false
  Key: value
```

#### hosts
> 配置 service 的 `/etc/hosts` 绑定

例子：

```yaml
hosts:
  - 127.0.0.1 www.terminus.io
  - 127.0.0.2 dice.terminus.io
```

#### resources
> 配置 service 所需要的资源，资源包括 cpu、内存和磁盘，resources 包含如下子配置项：
>
> cpu: 配置 cpu 核数，可以是小数，不足一个核；必配选项，没有默认值。
>
> mem: 配置内存数，单位是 M；必配选项
>
> disk：配置磁盘大小数，单位是 M
>
> network: 容器网络配置, 可选配置, `mode` 可配置为 `overlay` 或 `host`， 默认为 `overlay`

例子：

```yaml
resources:
  cpu: 1
  mem: 256
  disk: 1024
  network:
    mode: overlay
```

#### capabilities
> 配置 service 的 linux capabilities, `man 7 capabilities` 查看全部可用的 linux capabilities。
>
> cap_add: 添加 capability
>
> cap_drop: 删除 capability

例子：

```yaml
cap_add:
  - ALL

cap_drop:
  - NET_ADMIN
  - SYS_ADMIN
```

#### deployments
> 配置 service 的部署策略，目前支持配置实例数、labels 等，所以有如下配置项：
>
> mode: 部署模式可以指定为 `global` 或 `replicated` 两种，`global` 表示每个集群节点部署一个容器实例，`replicated` 表示部署指定数量的容器实例，与 replicas 选项配合使用，默认为：`replicated`。
>
> replicas: 定义服务需要部署几个实例；mode 需要为 `replicated` 时才有意义，如果是 `global` 时不需要配置此值。
>

例子1：

```yaml
deployments:
  mode: replicated
  replicas: 2
```

例子2：

```yaml
deployments:
  mode: global
```


#### depends_on
> 配置 service 的部署依赖服务

例子：

```yaml
# 例子表示此服务依赖于 serviceB 和 serviceC 两个服务
depends_on:
  - serviceB
  - serviceC
```

#### volumes
> volumes 为容器目录提供持久化存储功能，可以同时指定多个配置。
> storage: 当前只支持 nfs。
> path: 指定容器内部挂载路径，需要使用绝对路径。

例子：

```yaml
volumes:
- storage: nfs
  path: /container/data
```

#### health_check
> health_check 配置 service 的健康检查机制，健康检查有两种接口供使用，分别是 http 和 command，配置 health_check 的时候只能二选一，不能同时使用 http 和 command。

http 健康检查就是向一个 http 接口发送 GET 请求，通过响应的状态是否为 200 来判断服务的健康情况。

例子和说明：

```yaml
health_check:
  http:
    # port 配置健康检查 http get 请求的端口，此端口应该是 ports 配置中的一个
    port: 8080
    # path 配置健康检查 http get 的 URI 路径
    path: /health
    # duration 设定健康检查需要持续的检查的时间，单位是秒；这个时间值应该设置为比服务启动需要的时间更长一点
    duration: 120
```

command 健康检查是运行一个指定的命令，通过命令执行的退出码是否为 0 来判断服务的健康情况。

例子和说明：

```yaml
health_check:
  exec:
    # cmd 配置要运行的命令，此处的 curl 只是一个例子，你可以写任何想要的命令
    cmd: curl http://127.0.0.1:8080/health
    # duration 同 http 健康检查
    duration: 120
```

### addon 配置项

addon 配置项是一个具体的 addon 对象描述，具体包含了 addon 的类型、规格以及附加参数等信息。

例子：

```yaml
addons:
  mysql:                 # mysql 是自定义的 Add-on 实例名字
    plan: mysql:basic    # plan：表示规格
    options:             # options：附加参数，如版本
      version: 5.7.23
      # create_dbs 是在MySQL实例上需要创建一个或者多个逻辑库名称
      create_dbs: blog,user
```

#### 名称

平台通过名称来做共享策略，用户自定义名称后，在相同项目环境下，通过该名称可以自动共享Add-on。需要注意的是，在平台的开发、测试两个环境中，该名称会被自动忽略，直接修改为Add-on本身的名称。

#### plan
> plan 为描述 addon 的类型和规范，格式如下：
>
> plan: {addon类型}:{规格}
>
> 可选规格：根据具体的 addon 决定，一般有（ basic、professional、ultimate ）

例子：

```yaml
# 这是一个 basic 规格的 mysql addon
plan: mysql:basic
```

#### options
> options 定义 addon 的附加参数

例子：

```yaml
options:
  version: 5.7.23
  create_dbs: blog,blog2
```



## 一个完整例子

```yaml
version: 2.0

# 全局环境并不是必须的
envs:
  DEBUG: true
  TERMINUS_TRACE_ENABLE: false

services:
  # showcase-front 是一个 service 的名字，你需要根据自己的服务在这里填写正确的名字
  showcase-front:
    image: nginx:latest
    cmd: echo hello && npm run start
    ports:
      - port: 8080
	    expose: true
    # service 内的 envs 用于定义服务私有的环境变量，可以覆盖全局环境变量中的定义。
    envs:
      TERMINUS_TRACE_ENABLE: false
      TERMINUS_APP_NAME: showcase-front-app
    hosts:
      - 127.0.0.1 www.terminus.io
    resources:
      cpu: 1
      mem: 256
      disk: 100
	  network:
	    mode: container
    deployments:
      # replicas 不能小于 1，replicas 定义了服务需要被部署几个容器实例。
      replicas: 2
    depends_on:
      - blog-servic
    volumes:
    - storage: nfs
      path: /container/data
    health_check:
        http:
          port: 8080
          path: /health
          duration: 120

  # blog-service 示范了最简洁的服务配置，也就是只配置了最必须的配置项。
  blog-service:
    image: nginx:latest
    resources:
      cpu: 0.2
      mem: 256
      disk: 100
    deployments:
      replicas: 3

addons:
  mysql:
    plan: mysql:basic
    as: MYSQL
    options:
      version: 5.7.23
      create_dbs: blog,blog2
  zk:
    plan: zookeeper:professional

environments:
  # 开发环境的特殊配置
  development:
    envs:
      APP_NAME: pampas-blog-dev
    addons:
      mysql-blog-dev:
        plan: mysql:basic
        options:
          create_dbs: blog,blog_dev
      redis-blog-dev:
        plan: redis:basic

      zk-blog-dev:
        plan: zookeeper:basic

      monitor-blog-dev:
        plan: monitor:professional
  # 测试环境的特殊配置
  test:
    envs:
      APP_NAME: pampas-blog-test
    addons:
      mysql-blog-test:
        plan: mysql:basic
        options:
          create_dbs: blog,blog_test

      redis-blog-test:
        plan: redis:basic

      zk-blog-test:
        plan: zookeeper:basic

      monitor-blog-test:
        plan: monitor:professional

  # 预发环境的特殊配置
  staging:
    envs:
      SPRING_PROFILES_ACTIVE: pre

  # 生产环境的特殊配置
  production:
    envs:
      APP_NAME: pampas-blog
```
