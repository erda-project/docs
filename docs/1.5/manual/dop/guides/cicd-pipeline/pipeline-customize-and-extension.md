# 自定义和扩展

Erda 的 Action 扩展市场提供丰富的制品仓库，可满足多数场景的需求，同时支持自定义扩展服务，以满足某些特定场景的需求。

## 自定义 Action
Action 的开发流程如下：

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/38ae9db8-84b7-4ffb-b674-2760f52d1166.png)

1. 通过 spec.yml 描述入参。
2. 编写调试 Action。
3. 编写 dockerfile 打包构建。
4. 编写 dice.yml。
5. 调试 Action。

Action 的交付产物为 Docker 镜像。开发者仅需在镜像中提供一个可执行文件（/opt/action/run），并且提前赋予执行权限（chmod +x）即可。

执行流水线时，将通过该镜像创建一个 Docker 容器，并且调用 /opt/action/run 文件，运行开发者已定义的逻辑。

## Custom-Script Action

Custom-Script 是一个特殊的 Action，支持运行自定义命令。平台默认提供的镜像包括 Java、Node.js、Golang 等编译环境，Custom-Script 接受执行的脚本命令列表，按顺序执行，便于扩展开发。
