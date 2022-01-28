# Deploy a Go Web Application

Before you begin, please confirm that you have finished [project and application creation](../../../quick-start/newbie.html#join-a-project).

:::tip Tips

Assuming that the project is named base-project and the application is named go-web. The Git repository address below will contain these two names.

:::


## Prepare Code Sample

It is a simple web service written in Golang, only to output `Hello, World!` .

Add a new folder and create a main.go file to write the following information:

```code
package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello World!")
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Initialize the package manager with Go modules:

```
go mod init github.com/erda/go-web
```

:::tip Tips

Erda supports any programming language and framework, including but not limited to Go and Java.

:::

Initialize the Git repository locally and commit:

```bash
git init
git add .
git commit -m "initialize"
```

Erda has a built-in Git code repository based on the Git protocol, that allows you to complete the entire process from development to deployment without relying on external repositories (such as GitLab).

Go to **My Application > Select Application > Files > Source > Repo Address** to view the address of remote repository.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/14/eddd5859-52bd-451c-9c52-00641fa9f8fd.png)

```bash
git remote add erda https://erda-org.erda.cloud/wb/base-project/go-web
git push -u erda --all
git push -u erda --tags
```

## Define Pipeline
Add configuration files, pipeline.yml and erda.yml, to the project.

### pipeline.yml

pipeline.yml is a configuration file that describes pipeline from compilation, building to deployment, generally consists of four stages, executed in the following order:

1. Git pull.
2. Compilation and building for Docker image.
3. Artifact release.
4. Artifact deployment.

The four stages can be executed as the following actions:

1. [Git-Checkout](https://www.erda.cloud/market/action/git-checkout)
2. [Java](https://www.erda.cloud/market/action/java)
3. [Release](https://www.erda.cloud/market/action/release)
4. [Erda](https://www.erda.cloud/market/action/dice)

An example of pipeline.yml for this project is as follows. For more information, see [pipeline.yml](../../guides/reference/pipeline.html).

```yml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - golang:
          alias: go-demo
          params:
            command: go build -o web-server main.go
            context: ${git-checkout}
            service: web-server
  - stage:
      - release:
          alias: release
          params:
            dice_yml: ${git-checkout}/dice.yml
            image:
              go-demo: ${go-demo:OUTPUT:image}
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

### erda.yml

erda.yml is used to describe configurations such as resources and number of replicas required by the application.

An example of erda.yml for this project is as follows. For more information, see [erda.yml](../../guides/reference/erda-yaml.html).

```yml
version: "2.0"
services:
  go-demo:
    ports:
      - port: 8080
        expose: true
    resources:
      cpu: 0.2
      mem: 512
    deployments:
      replicas: 1
```

### Commit Files

Commit the two YAML files to the code repository of the platform.

```bash
git add .
git commit -m "add pipeline.yml and dice.yml"
git push erda
```

## Run Pipeline

1. On the **Pipeline** page, click **Add Pipeline** on the upper right corner.
2. The pipeline is pending for execution after analysis. Click the execution icon in the upper right corner to run it.
3. During the process, you can view the status of each step in real time and click the log icon to check the execution information of the corresponding node.

## View Deployment Results

After building and deployment, you can view the runtime of application instance successfully deployed in **Deployments**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/14/b53ae3d1-be0b-4721-9e53-240a5d25457a.png)

Click **master** for application management, such as domain configuration and instance scaling.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/14/b26505f2-40fa-492c-bc58-2564956af1a7.png)

Type the IP address of the instance in the browser and add the port 8080 to see "Hello, World!".

