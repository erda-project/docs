# Custom Prober

The previous articles introduce how to write [The First Prober](../guides/first_prober.md) and the basic concepts of [Prober CRD](../concepts/prober_crd.md). Kubeprober also provides probers for developers (in the directory of [probers](https://github.com/erda-project/kubeprober/tree/master/probers)). In addition, developers can customize probers as needed.

Combining the actual development, Kubeprober summarizes the following experience in the writing and packaging of prober:

- Prober supports packaging multiple binary files for detection into a container image to run detection tasks that originally require multiple pods with one pod and save plenty of resources and scheduling time.
- Kubeprober supports writing probers in Golang and Shell.
- Each binary detection task in a prober image may require its own custom configuration. To avoid confusion caused by placing all configurations together, Kubeprober supports specifying custom configurations for each binary detection task.

The following takes [probers/demo-example](https://github.com/erda-project/kubeprober/tree/master/probers/demo-example) as an example to introduce how to write a custom prober.

## Directory
```
probers/
    # Probe set demo-example
    # The probe tasks under the probe set are compiled and packaged separately into the same container image
    demo-example/
        # Probe task subdirectory, the golang execution entry is the main.go file
        demo-checker1/
            ...
            main.go
        # Probe task subdirectory, the shell execution entry is the main.sh file
        demo-checker2/
            ...
            main.sh
```

## Packaging
```
# Go to the probers directory
cd probers

# Image packaging
# Specify the probe set PROBER=demo-example, version: V=0.0.1
# The packaged image is: kubeprober/demo-example:0.0.1
PROBER=demo-example V=0.0.1 make docker-build

# View image content
# docker run -it --rm kubeprober/demo-example:0.0.1 /bin/sh
/checkers # ls -lh *
# run.sh is the built-in startup execution script of prober, which executes the executable files (probing tasks) packaged into the image in turn.
run.sh
# Each probe task will be compiled in the image as a main executable file, which is called by run.sh in turn to execute
demo-checker1:
    main
demo-checker2:
    main
```
As a result, multiple detection tasks (demo-checker1 and demo-checker2) can be packaged into one image.

## Customization
After prober (demo-example) packaging, write the corresponding prober.yaml as follows:
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
  # If the executable probe task has custom variable configuration requirements, you can make the following custom configuration with the name not repeated
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





