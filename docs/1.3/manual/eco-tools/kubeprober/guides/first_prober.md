# 编写使用第一个 Prober

Prober探测集主要包含具体的探测逻辑以及探测结果的上报，下面将通过一个简单的demo讲述Prober的使用与开发方法。

## 一个简单的Prober

如下展示了一个简单的Prober，其 spec 主要包含两部分：policy 和 template。

policy 用于定义 prober 的运行方式，是运行一次，还是周期运行；如果未定义 policy，则将以 job 方式运行该 prober, 如果定义了policy，则将以 cronjob 的方式运行该 prober。

template 其实就是 podSpec, 用于描述具体的运行负载 pod，具体的探测上报逻辑以镜像的方式保存在 pod image 中。

```
# prober-demo-example.yaml

apiVersion: kubeprober.erda.cloud/v1
kind: Probe
metadata:
  name: prober-demo-example
  namespace: kubeprober
spec:
  # if remove policy block, prober will run as a job; else it will run as a cronjob
  policy:
    # unit: minute
    runInterval: 30
  # template block is podSpec in fact
  template:
    containers:
      - name: prober-demo-example
        image: kubeprober/demo-example:v0.0.1
        resources:
          requests:
            cpu: 10m
            memory: 50Mi
    restartPolicy: Never
```

## 运行并查看探测结果

在运行该 Prober 前，需要先 [安装 prober-agent](../best-practices/standalone_kubeprober.md) 。然后运行该 Prober 执行具体的探测逻辑并上报探测结果，如下：

```
## 运行上文中的 prober-demo-example.yaml，去掉 policy, 以 job 的方式运行一次
# kubectl apply -f prober-demo-example.yaml

## 查看 prober
# kubectl -n kubeprober get probe
NAME                  RUNINTERVAL   IMAGE                            AGE
prober-demo-example                 kubeprober/demo-example:v0.0.1   10m

## 查看 job
# kubectl -n kubeprober get job
NAME                  COMPLETIONS   DURATION   AGE
prober-demo-example   1/1           3s         10m

## 查看 pod
# kubectl -n kubeprober get pod|grep -i demo
prober-demo-example-jzmnv      0/1     Completed   0          11m

## 查看运行结果 probestatus
# kubectl -n kubeprober get probestatus
NAME                  STATUS   MESSAGE                              LASTRUN   AGE
prober-demo-example   ERROR    do check item2 failed, reason: ...             11m

# kubectl -n kubeprober get probestatus prober-demo-example -o yaml
apiVersion: kubeprober.erda.cloud/v1
kind: ProbeStatus
metadata:
  name: prober-demo-example
  namespace: kubeprober
spec:
  checkers:
  - name: checker1 item1
    status: PASS
  - message: 'do check item2 failed, reason: ...'
    name: checker1 item2
    status: ERROR
status:
  message: 'do check item2 failed, reason: ...'
  status: ERROR
```

## 编写一个简单的 Prober

上面通过一个已有的 Prober 讲述了 Prober 的基本使用方法，下面将通过一个具体的例子讲解如何编写一个简单的 Prober。

Prober主要包含具体的探测逻辑以及探测结果的上报，其中探测逻辑需要开发者根据具体需求实现，而结果的上报，则只需要调用已有的状态上报接口即可。
该接口将会自动获取注入到该 prober pod 的状态上报地址（默认是prober-agent）,然后上报状态。

### golang 编写的 Prober
```golang

package main

import (
	"github.com/sirupsen/logrus"
   
	kubeproberv1 "github.com/erda-project/kubeprober/apis/v1"
	probestatus "github.com/erda-project/kubeprober/pkg/probe-status"
)

func main() {
	// checker1 item1
	// do real check ..., and get check status
    // prober status shoud be stored in struc: kubeproberv1.ProbeCheckerStatus
	item1 := kubeproberv1.ProbeCheckerStatus{
		Name:    "checker1 item1",
		Status:  kubeproberv1.CheckerStatusPass,
		Message: "",
	}

	// checker1 item2
	// do real check ..., and get check status
	item2 := kubeproberv1.ProbeCheckerStatus{
		Name:    "checker1 item2",
		Status:  kubeproberv1.CheckerStatusError,
		Message: "do check item2 failed, reason: ...",
	}
    
    // send prober status using: func probestatus.ReportProbeStatus([]kubeproberv1.ProbeCheckerStatus) error
	err := probestatus.ReportProbeStatus([]kubeproberv1.ProbeCheckerStatus{item1, item2})
	if err != nil {
		logrus.Errorf("report probe status failed, error: %v", err)
	}
}

```

### shell 编写的 Prober

```shell
#!/bin/bash

function checker2_item1_check() {
  # checker2 item1
	# do real check ..., and report check status
	report-status --name=checker2_item1 --status=pass --message="-"
}

function checker2_item2_check() {
  # checker2 item2
	# do real check ..., and report check status
	report-status --name=checker2_item2 --status=error --message="checker2 item2 failed, reason: ..."
}

checker2_item1_check
checker2_item2_check
```

使用该 shell prober 需要使用 prober 基础镜像 `kubeprober/probe-base:v0.1.2`, 该镜像中包含上报接口程序 `report-status`

上述这些 pober demo 打包到镜像并执行，即可执行探测逻辑并上报探测结果。