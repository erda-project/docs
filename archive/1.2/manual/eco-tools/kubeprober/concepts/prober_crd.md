# Prober CRD
Prober CRD 在 kubeprober 中描述探测集，用于执行具体的探测任务，并上报探测状态。

## 主要结构
[Prober CRD](https://github.com/erda-project/kubeprober/blob/master/apis/v1/probe_types.go) 的主要定义都包含在 spec 字段中，如下:
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
其中，policy 和 template 在 [编写第一个 Prober](../guides/first_prober.md) 中已经简单描述过。

### 运行策略 policy
如果未定义，则 prober 将会以 job 的形式，只运行一次；如果定义，则将以 cronjob 的形式，按照指定的时间间隔（默认单位：分钟）周期性运行。

### 模版定义 template
由 Prober CRD 的定义可以看出，template 就是定义 podSpec, 用于描述 prober 运行时负载 pod。

### 自定义配置 configs
在 kubeprober 中，一个 prober 实际上是支持将多个执行探测的二进制文件打包到一个容器镜像中的，这样可以通过一个 pod 运行原本需要多个 pod 运行的探测任务，节省了很多资源和容器调度时间。

而每个二进制探测任务可能需要各自的自定义配置，为了避免将所有的配置放在一起，导致混乱，kubeprober 支持为每个二进制探测任务分别指定自定义配置。

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


