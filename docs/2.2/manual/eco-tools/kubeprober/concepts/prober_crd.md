# Prober CRD
[Prober CRD](https://github.com/erda-project/kubeprober/blob/master/apis/v1/probe_types.go) 在 Kubeprober 中描述探测集，用于执行具体的探测任务并上报探测状态。

其主要定义均包含在 Spec 字段中，结构示意如下：

```
// ProbeSpec defines the desired state of Probe
type ProbeSpec struct {
	Policy   Policy        `json:"policy,omitempty"`
	Template apiv1.PodSpec `json:"template,omitempty"`
	Configs  []Config      `json:"configs,omitempty"`
}

type Policy struct {
	// unit: minute
	RunInterval int `json:"runInterval,omitempty"`
}

// Checker defines the desired state of Checker
type Config struct {
	Name string         `json:"name,omitempty"`
	Env  []apiv1.EnvVar `json:"env,omitempty"`
}
```
## Policy
即运行策略。若未定义，则 Prober 将以 Job 形式仅运行一次；若已定义，则将以 Cronjob 形式，根据指定的时间间隔（默认单位为分钟）周期性运行。

## Template
即模板定义。定义 PodSpec，用于描述 Prober 运行时的负载 Pod。

## Configs
即自定义配置。在 Kubeprober 中，一个 Prober 实际支持将多个执行探测的二进制文件打包至一个容器镜像中，通过一个 Pod 运行原本需要多个 Pod 的探测任务，节省大量资源和容器调度时间。

每个二进制探测任务可能需要各自的自定义配置。为避免所有配置放置一处造成混乱，Kubeprober 支持为每一个二进制探测任务分别指定自定义配置。

```
apiVersion: kubeprober.erda.cloud/v1
kind: Probe
metadata:
  name: prober-demo-example
  namespace: kubeprober
spec:
  policy:
    # unit: minute
    runInterval: 5
  template:
    containers:
      - name: prober-demo-example
        image: kubeprober/demo-example:v0.0.1
        resources:
          requests:
            cpu: 10m
            memory: 50Mi
    restartPolicy: Never
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

