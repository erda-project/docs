# Overview

## Deploy Mode

When deploy via Helm, you can choose either minimal mode or high-availability mode.
* [Minimal Mode](helm-install-demo.md)：deploy Erda components in the minimalist way (low-resource configuration and single-instance copy), which is suitable for trial environment.
* [High-Availability Mode](helm-install-prod.md): deploy Erda core components and dependencies in a high-availability way (high-resource configuration and multi-instance copy), which is suitable for production environment.

## Basic Concept

### Master Cluster

The master [cluster](../../quick-start/premise.md#集群) is where Erda deployed under Kubernetes scenario. It deploys all components and dependencies of Erda.

### Worker Cluster

Erda can manage computing resources such as Kubernetes and EDAS via container clusters. The managed cluster is the Worker cluster, mainly for task execution, application release and environment isolation. It deploys Erda components such as monitoring, cluster agent, registry and dependencies.
