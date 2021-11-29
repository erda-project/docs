# 单集群使用 Kubeprober

## 安装 probe-agent
若仅针对单集群进行探测，或测试 Prober，不涉及多集群管理，则部署 probe-agent 即可，其对应部署文件为 [probe-agent-standalone.yaml](https://github.com/erda-project/kubeprober/blob/master/deployment/probe-agent-standalone.yaml) 。

```
kubectl apply -f https://raw.githubusercontent.com/erda-project/kubeprober/master/deployment/probe-agent-standalone.yaml
```

## 编写 Prober
完成部署后，即可开始 [编写第一个 Prober](../guides/first_prober.md)，了解 Prober 的基本编写与使用方法。

## 自定义 Prober
完成简单的 Prober 编写使用后，即可尝试 [自定义 Prober](../best-practices/custom_prober.md)，学习自定义 Prober 编写、打包和运行的最佳实践。