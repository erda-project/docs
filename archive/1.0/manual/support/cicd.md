# 构建部署排错指南

## 信息透出分类 
- 容器重启 > 5次 
- PodScheduled: 资源不足 pending 
- ContainersReady: 容器不健康(健康检查不过, image镜像不存在) 
- 节点标签未设置
- addon部署超时
- 部署的 addon 已经健康
- 自定义addon未创建
- 调用addon provider失败(内部错误)
- 调用scheduler失败(内部错误)


### 容器多次重启
部署日志信息如下:
```
Pod(java-demo-7dcc646768-8wvqm)重启次数过多(418次)，请及时检查程序日志或健康检查配置
程序日志入口：部署中心 -> 本次服务部署环境 -> 服务详情 -> 选择已停止  -> 查看最新的容器日志
健康检查配置入口：代码仓库 -> erda.yml -> health_check 的配置内容
```
解决方法:
- 检查健康检查配置, 如 diceyml 中 port 配置与实际服务不匹配
- 程序自身bug 导致 crash, 可以查看已停止容器日志

### pod 无法调度
部署日志信息如下:
```
Pod(java-demo-6b47f48fbf-nzwcd)调度失败，请确认是否资源不足导致排队。

Pod(java-demo-6b47f48fbf-nzwcd), PodScheduled failed: 0/8 nodes are available: 3 Insufficient memory, 4 node(s) didn't match node selector, 8 Insufficient cpu.
```
解决方法:
- 在集群总览查看是否某些节点标签漏打, 比如查看打了对应环境标签(workpace-\<xxx\>)的节点是否足够多. 
  如果该服务在diceyml中设置了特殊的 location-\<xxx\> 标签, 则查看打了该标签的节点是否足够.
- 调小该服务的资源使用量再次部署

### pod 未就绪
部署日志信息如下:
```
Pod未就绪(java-demo-7dcc646768-8wvqm), 请确认健康检查或镜像是否存在
健康检查配置入口：代码仓库 -> erda.yml -> health_check 的配置内容

Pod(java-demo-7dcc646768-8wvqm), ContainerNotReady: containers with unready status: [java-demo]
```
解决方法:
- 检查健康检查配置, 如 diceyml 中 port 配置与实际服务不匹配
- 查看日志, 检查启动卡在什么步骤, 具体服务具体分析

### 自定义addon未创建
部署日志信息如下:
```
自定义 addon 不存在, addon 的详细信息如下
addon 类型: custom, 
addon name: XXXXXX. 
如果已创建, 请检查 Erda.yml 文件中 addonName 是否未匹配
```
解决方法:
- 在 扩展服务 中先创建相应的自定义addon
- 如果自定义 addon 存在, 检查 diceyml 中的 addon 部分的 plan 中的 addonname 是否匹配已存在的 addon

### 节点标签未设置
部署日志信息如下:
``` 
调度失败，失败原因：没有匹配的节点能部署, 请检查节点标签是否正确

没有匹配的节点能部署, java-demo: exist: [erda/location-xxx erda/org-terminus erda/workspace-dev erda/stateless-service], not-exist: [erda/locked]
```

解决方法:
- 这样的提示说明没有一个节点的标签符合该服务的要求, 即: 

  节点上需要 [erda/location-xxx erda/org-terminus erda/workspace-dev erda/stateless-service]
  
  节点上不能有 [erda/locked]

### addon 部署超时
部署日志信息如下:
```
addon(mysql)(xxxxid) 部署超时失败(超时时间：15 min)
```
解决方法:
- 应该有其他相关提示来对应解决, 比如资源不足导致的pending
