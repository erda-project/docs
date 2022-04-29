# Kubeprober for a Single Cluster

## Install probe-agent
For detection of a sing cluster or prober testing, just deploy probe-agent and the corresponding deployment file is [probe-agent-standalone.yaml](https://github.com/erda-project/kubeprober/blob/master/deployment/probe-agent-standalone.yaml).

```
kubectl apply -f https://raw.githubusercontent.com/erda-project/kubeprober/master/deployment/probe-agent-standalone.yaml
```

## Write a Prober
After deployment, start to write [The First Prober](../guides/first_prober.md) and learn about the basic knowledge of prober.

## Custom Prober
After writing the first prober, try [Custom Prober](../best-practices/custom_prober.md) and learn the best practices of writing, packaging and running for custom prober.