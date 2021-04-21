# 基于 Docker Image 部署

基于 Docker Image 部署本质上和 [基于 Git 源码部署](./deploy-from-git.md) 没有区别，不需要的步奏就是源码构建 Image 产物。

首先准备好 [项目和应用](../platform-design.md#项目和应用)。项目创建只有企业管理员才能完成，企业管理员添加并设置好项目所有者之后，项目其他成员可以由项目所有者添加指定。应用创建可以由应用所有者、应用主管和项目经理进行创建，并添加指定应用所有者。具体角色权限可以参考[角色和权限](../platform-design.md#角色和权限)

:::tip 注意

基于 Docker Image 部署和源码部署一样，都需要编写 dice.yml 和 pipeline.yml 两个文件（镜像名会直接填写到 dice.yml 文件中），所以平台仍然会提供一个 Git 仓库用于存放两个 yaml 文件。

假设新建项目名为：erda-test，新建应用名为：image-demo。下文中的 git 仓库地址将会涉及到这两个名字。

:::

## 示范镜像

```yaml
nginx:latest
```

## 配置 dice.yml 和 pipeline.yml

#### pipeline.yml

基于 Docker Image 部署也是采用 pipeline 来触发自动部署，可以简单的设置 3 个 stage 来完成 Image 的部署，分别是：

1. 从 Git 仓库拉取两个 yaml 文件
2. 通过 dice.yml 生成版本产物
3. 基于版本产物完成部署

3 个 stage 分别可用如下 Action 来执行：

1. [git-checkout](https://www.erda.cloud/market/action/git-checkout)
2. [release](https://www.erda.cloud/market/action/release)
3. [dice](https://www.erda.cloud/market/action/dice)

可直接复制下面的内容作为 pipeline.yml 使用。

```yaml
version: '1.1'

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

#### dice.yml

dice.yml 参考如下内容，需要修改的内容可能是端口，cpu 和内存资源，健康检查等，参考 [dice.yml规范](./dice-yml.md)。

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

将新增的两个 yaml 文件提交至平台的代码仓库

```bash
git add .
git commit -m "add pipeline.yml and dice.yml"
git push erda feature/demo
```

:::tip 注意

注意这里提交的远程仓库分支的前缀是 feature/*，分支名会直接决定应用部署的环境。

:::

## 执行流水线

1. 进入`流水线`，右上角点击`添加流水线`，选择 `feature/demo` 分支创建新的流水线任务。
2. 流水线任务分析完成后，处于待执行状态，右上角点击 `立即执行`，开始执行构建。
3. 流水线任务执行过程中，可以实时查看流水线各步骤的执行状态，并点击`日志`查看对应节点执行状况的日志信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/11/0fc68583-4a77-4eda-a553-affe74bf1bab.gif)

## 查看应用部署结果

通过流水线构建源码，并成功完成部署动作后，可在部署中心看到已经成功部署的应用实例 Runtime，进入 Runtime 中可以进一步进行 [应用管理](/manual/deploy/management.md) 相关的操作，比如：配置域名、服务实例扩缩容等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/10/4352a321-7351-4d8b-a9db-2db087deaa4a.png)



## 注意事项

由于 docker image 部署采用的镜像可以用户随意指定，一些三方镜像没有针对集群环境进行调优，会产生运行不稳定的情况。

三方镜像中缺少安装监控组件，监控能力会部分缺失 (TODO：缺失部分介绍)，若需要完整的监控能力，需要主动安装监控组件，安装方式参看：（TODO）。

三方镜像主要注意正确设置时区，否则会导致日志顺序错乱等问题。
