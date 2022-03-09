# 自定义 Prober

前文已为您介绍如何 [编写第一个 Prober](../guides/first_prober.md) 以及 [Prober CRD](../concepts/prober_crd.md) 的基本概念，Kubeprober 也提供了现成的 Prober 供开发者直接使用（位于目录 [probers](https://github.com/erda-project/kubeprober/tree/master/probers) 下）。除此之外，开发者还可以根据自身需要，开发自定义 Prober。

Kubeprober 结合实际开发过程，对于 Prober 的编写、打包总结了如下经验：

- 一个 Prober 支持将多个执行探测的二进制文件打包至一个容器镜像中，从而通过一个 Pod 运行原本需要多个 Pod 运行的探测任务，节省大量资源和容器调度时间。
- Kubeprober 当前支持通过 Golang 和 Shell 编写 Prober 探测集。
- 同一个 Prober 镜像中的每个二进制探测任务可能需要各自的自定义配置。为避免所有配置放置一处造成混乱，Kubeprober 支持为每个二进制探测任务分别指定自定义配置。

下文将以 [probers/demo-example](https://github.com/erda-project/kubeprober/tree/master/probers/demo-example) 为例，介绍如何编写自定义 Prober。

## 目录结构
```
probers/
    # 探测集 demo-example
    # 探测集下的探测任务会分别编译打包到同一个容器镜像中
    demo-example/
        # 探测任务子目录，gonlang 执行入口为 main.go 文件
        demo-checker1/
            ...
            main.go
        # 探测任务子目录，shell 执行入口为 main.sh 文件
        demo-checker2/
            ...
            main.sh
```

## 镜像打包
```
# 进入到 probers 目录
cd probers

# 镜像打包
# 此处指定探测集 PROBER=demo-example， 版本号: V=0.0.1
# 打包后的镜像为: kubeprober/demo-example:0.0.1
PROBER=demo-example V=0.0.1 make docker-build

# 查看镜像内容
# docker run -it --rm kubeprober/demo-example:0.0.1 /bin/sh
/checkers # ls -lh *
# run.sh 是 prober 内置的启动执行脚本，会依次执行打包到该镜像的可执行文件（探测任务）
run.sh
# 各探测任务在镜像中会被编译为 main 可执行文件，由 run.sh 依次调用执行
demo-checker1:
    main
demo-checker2:
    main
```
由此即可将多个可执行探测任务（demo-checker1 和 demo-checker2）打包至一个镜像中。

## 自定义编写
完成上述 Prober（demo-example）镜像打包后，即可编写对应的 prober.yaml，示例如下：
```
apiVersion: kubeprober.erda.cloud/v1
kind: Probe
metadata:
  name: prober-demo-example
  namespace: kubeprober
spec:
  template:
    containers:
      - name: prober-demo-example
        image: kubeprober/demo-example:v0.0.1
        resources:
          requests:
            cpu: 10m
            memory: 50Mi
    restartPolicy: Never
  # 如果可执行探测任务有自定义变量配置需求，即可配置如下自定义配置，名字不能重复
  configs:
    - name: demo-checker1
      env:
        - name: CHECKER1_ENV1
          value: "CHECKER1_VAL1"
        - name: CHECKER1_ENV2
          value: "CHECKER1_VAL2"
    - name: demo-checker2
      env:
        - name: CHECKER2_ENV1
          value: "CHECKER2_VAL1"
        - name: CHECKER2_ENV2
          value: "CHECKER2_VAL2"
```





