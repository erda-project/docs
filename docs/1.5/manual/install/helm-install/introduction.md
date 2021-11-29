# 概述

## 部署模式

使用 Helm 部署 Erda 时，可分为两种模式，即最小化模式和高可用模式。
* [基于 Helm 最小化安装](helm-install-demo.md)：Erda 各组件将以极简方式（低资源配置、单实例副本）部署，适用于试用环境。
* [基于 Helm 高可用安装](helm-install-prod.md)：Erda 核心组件及依赖将以高可用方式（高资源配置、多实例副本）部署，适用于生产环境。

## 基本概念

### Master 集群

Master [集群](../../quick-start/premise.md#集群) 是部署在 Kubernetes 场景下的 Erda 所在集群。该集群部署了 Erda 的全量组件及依赖。

### Worker 集群

Erda 能够以容器集群的方式纳管用户计算资源，例如 Kubernetes、EDAS 等。受纳管的集群即为 Worker 集群，主要用于执行构建任务、发布应用、隔离环境等。该集群部署了 Erda 监控、集群 Agent、Registry 等组件及依赖。
