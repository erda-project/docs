# 自定义和扩展

详细的 action 开发请查看<action 开发者手册>[link]

现在 action 扩展市场已经有丰富的制品仓库，可以满足大部分场景下的需求，在某些特定的情况下，可能需要自定义的 action，erda 的扩展市场同样支持自定义扩展。

## 自定义 ACTION
![action 开发流程图](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/38ae9db8-84b7-4ffb-b674-2760f52d1166.png)

1. 通过 spec.yml 来描述入参
2. 编写调试 Action
3. 编写 dockerfile 打包构建
4. 编写 dice.yml
5. 调试 action

Action 的交付产物是一个 Docker 镜像。开发者只需要在镜像中提供一个可执行文件（/opt/action/run），并且提前赋予执行权限（chmod +x）。

流水线执行时，会使用该镜像创建一个 Docker 容器，并且调用 /opt/action/run 文件，运行开发者定义好的逻辑。

## Custom-Script Action

Custom-Script 是一个特殊的 action，它支持运行自定义命令，平台默认提供的镜像包括 java, nodejs, golang 等编译环境，
它接受执行的脚本命令列表，按顺序执行，可以方便的进行扩展开发。
