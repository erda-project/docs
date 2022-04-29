# The First Prober

The prober set mainly contains specific detection logic and the reporting of detection results. The following will introduce the use and development of prober by a simple demo.

## Prober Sample

Below is a probe sample, which mainly consists of two parts for its spec, policy and template.

* Policy defines the operation mode of probe, for single or periodic running. If defined, the probe will run in job mode. If not, the probe will run in cronjob mode.

* Template, namely podspec, describes the specific running pod, with its detection logic stored in pod image.

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

[Install probe-agent](../best-practices/standalone_kubeprober.md) first. Then run the probe to execute specific detection logic and report the detection results. An example is as follows:

```
## Run the prober-demo-example.yaml above, remove the policy, and run it once as a job
# kubectl apply -f prober-demo-example.yaml

## View prober
# kubectl -n kubeprober get probe
NAME                  RUNINTERVAL   IMAGE                            AGE
prober-demo-example                 kubeprober/demo-example:v0.0.1   10m

## View job
# kubectl -n kubeprober get job
NAME                  COMPLETIONS   DURATION   AGE
prober-demo-example   1/1           3s         10m

## View pod
# kubectl -n kubeprober get pod|grep -i demo
prober-demo-example-jzmnv      0/1     Completed   0          11m

## View the running result probestatus
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

## Write a Prober

The following will introduce how to write a simple prober by a specific case.

The prober mainly contains specific detection logic and the reporting of detection results. The detection logic is implemented by developers according to specific requirements, and the reporting of detection results can be done by calling the existing reporting interface. The interface will automatically obtain the reporting address injected into the probe pod (prober-agent by default), and then report the status.

### Write in Golang
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

### Write in Shell

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

The Shell prober requires the probe base image `kubeprober/probe-base:v0.1.2`, which contains the reporting interface `report-status`.

Package the above prober demo into the image and run it, to execute the detection logic and report the detection result.

