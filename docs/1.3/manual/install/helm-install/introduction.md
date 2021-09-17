# 简介

## 部署模式

使用 Helm 部署 Erda 时，分为两种部署模式：最小化模式、高可用模式：
* [基于 Helm 最小化安装 Erda](helm-install-demo.md)：Erda 个组件将以极简方式（低资源配置、单实例副本）部署，适用于试用环境部署。
* [基于 Helm 高可用安装 Erda](helm-install-prod.md)：Erda 的核心组件及依赖将以高可用方式（高资源配置、多实例副本）部署，适用于生产环境部署。

## 概念介绍

### Master 集群

Master [集群](../../quick-start/premise.md#集群) 是 Erda 部署在 Kubernetes 场景下，Erda 所在的集群。该集群部署了 Erda 全量的组件及依赖。

### Worker 集群

Erda 能够以容器集群的方式纳管用户计算资源，比如 Kubernetes、EDAS 等，被纳管的集群称为 Work 集群，主要用于执行构建等任务，发布应用，环境隔离等。
Work 集群部署了 Erda 监控组件、集群 Agent、Registry 等组件及依赖。
