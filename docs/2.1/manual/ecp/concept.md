# 设计理念

为更好地支持边缘应用的发布和运维，平台抽象化边缘场景的相关概念，并通过底层的 OpenYurt 以云原生的方式管理，从而将 Erda 本身具有的统一发布、服务编排、监控、日志等特性带入边缘场景。

## 站点
在边缘场景下，一个边缘应用通常由若干个微服务及少量的中间件组成，虽然业务场景相对简单，但是稳定性要求高，因此需要高可用部署，即对应的底层计算资源需要多台服务器。这一组服务器便是站点。站点具有明显的地域性，且站点间的网络互相隔离。平台通过底层的 Node Pool 资源管理站点的生命周期，便于运维工程师有效纳管分布在不同地域的海量计算资源。

对于边缘场景下的部署来说，为了访问距离最近的 Pod，即在站点级别仅访问本站点对应的 Pod，平台封装了 K8s Service Topology 特性，以实现站点级别的流量闭环。在创建边缘应用 SVC 时增加 `topologyKeys`，结合 Node Pool 的统一标签管理完成流量的站点级分发。

```
apiVersion: v1
kind: Service
metadata:
  name: ud-test
  labels:
    app: ud-test
spec:
  ports:
  - name: ud-test
    port: 80
    targetPort: 80
  selector:
    app: ud-test
  topologyKeys:
    - "topology.kubernetes.io/zone"
    # - "*"
```

## 单元化部署
不同于传统的 Kubernetes 应用，边缘应用能够将 Deployment 或 StatefulSet 资源批量部署到边缘站点上（即 Node Pool 资源）。平台底层以 UnitedDeployment 描述边缘应用，UnitedDeployment 则通过 `topology` 字段，描述 Deployment 或 StatefulSet 资源部署所在的 Node Pool 以及每个 Node Pool 所需部署的副本数量，将来还可以扩展出更多站点级配置的字段。`topology` 字段示例如下：

```
topology:
    pools:
    - name: beijing 
      nodeSelectorTerm:
        matchExpressions:
        - key: apps.openyurt.io/nodepool
          operator: In
          values:
          - beijing 
      replicas: 1
    - name: hangzhou 
      nodeSelectorTerm:
        matchExpressions:
        - key: apps.openyurt.io/nodepool
          operator: In
          values:
          - hangzhou 
      replicas: 2
      tolerations:
      - effect: NoSchedule
        key: apps.openyurt.io/example
        operator: Exists
```

平台在底层封装了 UnitedDeployment， 用于边缘应用分发，解决多个边缘应用之间的依赖问题。通过资源监控以及日志组件对边缘应用进行统一监控和日志采集， 同时基于 WebSocket 隧道访问容器控制台，实现对边缘应用的高效运维管理。

## 配置集

单元化部署解决了如何将同一个应用分发到多个地域的问题。理想状态下，所有地域的应用都应该是一致的，而现实往往存在差异，例如配置门店名称、门店 Logo，甚至在某些特定场景下对接的支付渠道也会有差异。

为此，平台采用了单元化部署，通过一个模板描述边缘应用的配置及发布范围，同时设计了配置集资源，能够将不同的配置作为环境变量下发到不同的地域中。

```
apiVersion: v1
kind: UnitConfigMap
metadata:
  name: ud-test
  namespace: default
data:
  common:
    CLUSTER_DNS: 10.96.0.3
    DICE_CLUSTER_NAME: terminus-dev
    DICE_CLUSTER_TYPE: kubernetes
  hangzhou:
    NAME: hangzhou-shop
  beijng:
    NAME: beijing-mall
```