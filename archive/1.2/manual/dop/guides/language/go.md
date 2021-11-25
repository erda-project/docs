# Go

Erda 通过统一的任务插件机制支撑不同的构建能力，并利用这一机制提供开箱即用的 Go 构建插件。

## 版本要求

当前支持 Go 1.14 版本。

## 依赖管理
依赖管理支持 Go Modules，优先从包 go vendor 和 go mod 中探测， 否则会将代码放到 GOPATH 下构建。

## 构建打包
* Go Action 必选参数

  **context**：需添加至 Go 容器的代码路径

* Go Action 可选参数
  * **service**：服务名
  * **command**：构建命令
  * **target**：构建产物路径
  * **assets**：静态资源文件
  * **package**：Go 包名（优先从包 go vendor 和 go mod 中探测）

`pipeline.yml` 示例如下：

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