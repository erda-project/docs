# 编写第一个 Prober

Prober 探测集主要包含具体的探测逻辑以及探测结果的上报，下文将通过一个简单的 Demo 介绍 Prober 的使用与开发方法。

## Prober 示例

如下为一个简单的 Prober 示例，其 Spec 主要包含两部分内容：Policy 和 Template。

* Policy 用于定义 Prober 的运行方式，单次运行或周期运行。若未定义 Policy，则将以 Job 方式运行该 Prober；若定义了 Policy，则将以 Cronjob 的方式运行该 Prober。
* Template 即 PodSpec，用于描述具体的运行负载 Pod，其探测上报逻辑以镜像的方式保存于 Pod Image 中。

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

运行该 Prober 前，需先 [安装 prober-agent](../best-practices/standalone_kubeprober.md) 。随后运行该 Prober 执行具体的探测逻辑并上报探测结果，示例如下：

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

## Prober 编写

上文通过一个已有的 Prober 介绍基本使用方法，下文将通过具体案例介绍如何编写一个简单的 Prober。

Prober 主要包含具体的探测逻辑以及探测结果的上报，其中探测逻辑需要开发者根据具体需求实现，而结果的上报则调用已有的状态上报接口即可。该接口将自动获取注入到该 Prober Pod 的状态上报地址（默认为 prober-agent），随后上报状态。

### 通过 Golang 编写
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

### 通过 Shell 编写

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

该 Shell Prober 需使用 Prober 基础镜像 `kubeprober/probe-base:v0.1.2`，镜像中包含上报接口程序 `report-status`。

将上述 Prober Demo 打包到镜像并执行，即可执行探测逻辑并上报探测结果。

