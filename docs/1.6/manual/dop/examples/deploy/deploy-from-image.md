# 基于 Docker Image 部署

基于 Docker Image 部署本质上和 [基于 Git 源码部署](deploy-from-git.html) 相同，区别在于前者不需要源码构建 Image 产物。

着手源码部署前，请确认已完成 [项目和应用创建](../../../quick-start/newbie.html#加入项目)。

:::tip 提示

基于 Docker Image 部署同样需要编写 pipeline.yml 和 erda.yml（镜像名称将直接写入 erda.yml 文件中），因此平台仍将提供 Git 仓库用于存放两个 YAML 文件。
假设新建项目名为 erda-test，新建应用名为 java-demo。下文 Git 仓库地址将涉及这两个名称。

:::

## 示范镜像

```yaml
nginx:latest
```

## 配置流水线

#### pipeline.yml

基于 Docker Image 部署采用 pipeline 触发自动部署，可简单设置 3 个 Stage 如下：

1. 从 Git 仓库拉取两个 YAML 文件。
2. 通过 erda.yml 生成版本产物。
3. 基于版本产物完成部署。

3 个 Stage 可分别以下列 Action 执行：

1. [Git-Checkout](https://www.erda.cloud/market/action/git-checkout)
2. [Release](https://www.erda.cloud/market/action/release)
3. [Erda](https://www.erda.cloud/market/action/dice)

 pipeline.yml 示例如下：

```yaml
version: "1.1"

stages:
- stage:
  - git-checkout:

- stage:
  - release:
      params:
        dice_yml: ${git-checkout}/dice.yml

- stage:
  - dice:
      params:
        release_id: ${release:OUTPUT:releaseID}
```

#### erda.yml

erda.yml 示例如下，需修改内容为端口、CPU、内存资源、健康检查等，具体请参见 [erda.yml](../../guides/reference/erda-yaml.html)。

```yaml{4}
version: "2.0"
services:
  nginx:
    image: "nginx:latest"
    resources:
      cpu: 0.1
      mem: 128
    deployments:
      replicas: 1
    ports:
      - port: 80
        expose: true
    health_check:
      http:
        port: 80
        path: "/"
        duration: 30
```

#### 提交文件

将新增的两个 YAML 文件提交至平台的代码仓库。

```bash
git add .
git commit -m "add pipeline.yml and dice.yml"
git push erda feature/demo
```

:::tip 提示

此处提交的远程仓库分支前缀为 `feature/*`，分支名称将直接决定应用部署的环境。

:::

## 执行流水线

1. 进入 **流水线** 页面，选择 `feature/demo` 分支创建新的流水线任务。

2. 完成流水线任务分析后，流水线处于待执行状态。点击右上角执行图标，开始流水线构建。

3. 流水线任务执行过程中，可实时查看流水线各步骤的执行状态，点击日志可查看对应节点执行状况的日志信息。


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/14/b737cfd7-192f-4379-94a3-3a73a18c285b.png)

## 查看部署结果

通过流水线构建源码并完成部署后，可在部署中心查看已成功部署的应用实例 Runtime。进入 Runtime 可进一步进行 [应用管理](../../guides/deploy/management.html) 相关操作，例如配置域名、服务实例扩缩容等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/14/6fc364a0-d4c4-4b5e-9f7b-4803b6ced9b9.png)

::: tip 提示

* 由于 Docker Image 部署采用的镜像可由用户随意指定，部分三方镜像未针对集群环境进行调优，可能产生运行不稳定的情况。
* 由于三方镜像缺少监控组件，部分监控能力缺失。若需完整的监控能力，需主动安装监控组件。
* 三方镜像需注意正确设置时区，否则将导致日志顺序错乱等问题。

:::
