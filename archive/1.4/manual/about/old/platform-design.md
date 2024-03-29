# 平台设计



![平台设计](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/06/02/193a19e8-2d5d-4a09-aa6d-2a2d73fcae38.png)

## 租户（组织）

平台采用多租户架构设计，平台层面的所有资源对象全部关联上租户 ID，实现严格的租户隔离。一个租户推荐设置为一个组织。


## 集群

集群 (Cluster) 是一个由多台物理机或虚拟机组成的有机整体，是一个由 Kubernetes + Docker 组建的集群。集群主要用于资源的管理和服务的部署运行。

一个集群内的所有节点（也就是主机）的网络是互通的，集群与集群之间的网络是相互隔离的。每一个集群由三种类型的节点（主机）组成，分别是 Master 节点、LB 节点和 Worker 节点。Master 节点负责整个集群的高可用管控，一般是 3 个节点；LB 节点是集群的访问流量入口，一般为 2 节点，LB 需要外网 IP 地址能够被用户访问；Worker 节点用于部署应用服务，节点数按需规划即可。

一个集群除了需要安装有 Kubernetes + Docker 以外，还需要安装平台提供的 Agent 程序，用于监控相关数据的采集。

集群属于企业的一种资源，集群需要被添加到企业内才能够使用。任何一个企业都可以拥有任意多个集群，比如：企业可以创建两个集群，一个集群用于应用的开发测试，另外一个集群用于应用的生产部署。

## 项目和应用

项目 (Project) 是研发运维的主要对象，一个项目就是多个应用的集合，在项目内包含了丰富的管理功能。应用 (Application) 是研发运维的最小单元，在应用内包含有应用的代码仓库、流水线等一系列 DevOps 工具。

#### 业务应用

业务应用主要是指处理某一类业务流程的微服务组合，比如会员管理的业务应用。

应用分为多种类型，可根据具体的开发任务创建不同类型的应用。

#### 库应用

库应用实际上就是一段编译好的二进制代码产物，可以在其他应用中被调用使用，比如一个人脸识别库，用户可以下载库然后根据库对接使用说明文档进行使用。

#### 移动应用

移动应用主要是指移动 App 客户端，平台包含了移动应用开发商和证书管理的同时，还覆盖了代码构建、发布、上架、市场的全链路。

## 环境

环境 (Environment) 是应用的一个逻辑概念，每个应用拥有开发、测试、预发和生产四大环境。四个环境可以被设置共享一个集群，也可以分别设置一个独立的集群。如果资源预算充足的情况下，推荐每个环境独占一个集群，至少生产环境应该独占一个集群。

:::warning

不是所有类型的应用都拥有环境，那些不需要部署运行的应用就没有环境，比如：库应用。

:::

## 服务和 Runtime

服务 (Service) 一般就是一个单体的进程，比如：一个 Java 进程，一个 PHP 进程。一个应用可能是一个单体服务，也可能拥有多个服务。

::: tip
此处的服务 (Service) 不等同于 Kubernetes 的 Service，它们之间没有任何关系，只是刚好名字相同罢了。
:::

Runtime 就是一个应用部署后，所有服务的集合，也可以称为应用的运行实体。任何一个应用都可以被部署多份， 也即是多个 Runtime。

## 容器

容器就是 Linux Container，也是 docker 容器。一个服务进程一般运行在一个容器内，一个容器也称为服务的一个实例。为了高可用，服务通常会运行多个实例。

