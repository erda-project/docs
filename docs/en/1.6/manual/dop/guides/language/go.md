# Go

Erda supports building capabilities through a unified task plugin mechanism, and provides Go building plugins out of the box.

## Version

Go 1.14 is supported.

## Dependency Management
Go modules are supported for dependency management. Detect from packages of go vendor and go mod first, otherwise the code will be put in GOPATH for building.

## Building and Packaging
* **Required parameters of Go Action**
   context: code path to be added to the Go container

* **Optional parameters of Go Action**
   * service: service name
   * command: building command
   * target: build product path
   * assets: static resource files
   * package: Go package name (detect from packages of go vendor and go mod first)

An example of pipeline.yml is as follows:

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
```
