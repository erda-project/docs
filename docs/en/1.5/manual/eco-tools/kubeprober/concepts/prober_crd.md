# Prober CRD
[Prober CRD](https://github.com/erda-project/kubeprober/blob/master/apis/v1/probe_types.go) describes the detection set in Kubeprober, to run specific detection tasks and report detection status.

The main definitions are contained in the spec field, shown as follows:

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
Running strategy. If not defined, the probe will run only once in job mode. If defined, the probe will run periodically in cronjob mode according to the specified time interval (in minutes by default).

## Template
Template definition. It defines podspec, to describe the loading pod when the probe is running.

## Configs
Custom configuration. In Kubeprober, prober supports packaging multiple binary files for detection into a container image, and running detection tasks that originally require multiple pods with one pod, to save plenty of resources and scheduling time.

Each binary detection task may require its own custom configuration. To avoid confusion caused by placing all configurations together, Kubeprober supports specifying custom configurations for each binary detection task.

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

