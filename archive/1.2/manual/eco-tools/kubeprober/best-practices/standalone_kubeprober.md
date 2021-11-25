# 单集群使用 Kubeprober

## 安装 probe-agent
如果只是针对单集群进行探测，或者只是测试 Prober, 不涉及多集群管理，则只需要部署 probe-agent 即可，其对应部署文件为 [probe-agent-standalone.yaml](https://github.com/erda-project/kubeprober/blob/master/deployment/probe-agent-standalone.yaml) 。

```
kubectl apply -f https://raw.githubusercontent.com/erda-project/kubeprober/master/deployment/probe-agent-standalone.yaml
```

## 编写运行简单的 prober
部署完成之后，即可开始 [编写使用第一个Prober](../guides/first_prober.md)，了解 prober 的基本编写与使用方法。

## 自定义 prober
完成简单的 prober 编写使用后，即可尝试 [自定义 prober](../best-practices/custom_prober.md)， 可以了解到 自定义 prober 编写、打包、运行的最佳实践。