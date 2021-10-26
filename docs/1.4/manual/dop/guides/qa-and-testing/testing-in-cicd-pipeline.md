# 测试与 CI/CD Pipeline 结合

上述文章中描述了如何使用 [sonar 漏洞扫描](./sonar-report.md), [单元测试](./unit-test.md)，[自动化测试](./auto-test-getting-started.md)，下面我们看下如何将这些节点都结合到现有的 CICD 流水线文件中

## CI/CD Pipeline

进入应用列表，创建一个业务应用，仓库模式使用 系统内置仓库， `git clone https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git` 把 demo 代码下载到本地再推送到内置仓库上(空项目会提示你如何推送)

然后到流水线栏目，选中分支后，新建默认流水线，如何图形界面编辑流水线可跳转 [pipeline图形编辑](../cicd-pipeline/pipeline-yml-graph.md)

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/aaa0c86e-0f48-47ae-8608-19984799c34f.png)

图形界面编辑后的 yml 结构如下，流水线如何文本编辑可跳转 [pipeline文本编辑](../cicd-pipeline/pipeline-yml-config.md)

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - buildpack:
          alias: backend
          params:
            context: ${git-checkout}
            modules:
              - name: java-demo
                path: .
  - stage:
      - release:
          alias: release
          version: "1.0"
          params:
            dice_yml: ${git-checkout}/dice.yml
            replacement_images:
              - ${backend}/pack-result
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

pipeline 编辑好后就可以点击新建流水线然后点击执行，如何执行 pipeline 可跳转: [pipeline执行](../cicd-pipeline/pipeline-execution.md)

## 增加 sonar 扫描节点

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/daa5aec5-01c2-4815-b95d-12311dc47917.png)

如图所示，点击图形界面的 + 号然后搜索 sonar 节点，填写好必填的字段 `code_dir` 和 `language`，`code_dir` 填写为 `${git-checkout}`， `git-checkout` 为 `git-checkout` action 的 `alias` 声明的字段，
我这里是 `java` 项目 所以 `language` 这里填写 `java`, 其他的一些字段可以根据自己是否熟悉 `sonar` 进行配置，最后有个 `use_platform_quality_gate` 字段默认值是 `true`，代表使用 `erda` 平台的扫描规则，
具体规则配置可以到项目的 `项目设置` 下进行设置，具体文档可以跳转 [sonar项目规则配置](./sonar-quality-gate.md)

增加了 `sonar` 扫描节点后的 `yml` 结构如下

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - sonar:
          alias: sonar
          version: "1.0"
          params:
            code_dir: ${git-checkout}
            delete_project: true
            language: java
  - stage:
      - buildpack:
          alias: backend
          params:
            context: ${git-checkout}
            modules:
              - name: java-demo
                path: .
  - stage:
      - release:
          alias: release
          version: "1.0"
          params:
            dice_yml: ${git-checkout}/dice.yml
            replacement_images:
              - ${backend}/pack-result
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

执行后在 **应用 > 代码质量 > 质量报告** 中将会看到代码扫描后的报告, sonar 节点详细使用和上报可跳转 [质量报告](./sonar-report.md)

执行后在 **应用 > 代码质量 > 问题列表** 中查看代码异味的报告工单, sonar 节点详细使用和上报可跳转 [问题列表](./sonar-report.md)

## 增加单元测试节点

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/89eb0808-cba7-4c34-b313-218196fe1d0a.png)

同上，点击 + 号搜索并选中 unit-test, 然后填写关键字段 `context`，`context` 填写为 `${git-checkout}`, `git-checkout` 为 `git-checkout` action 的 `alias` 声明的字段，如果不是 `golang` 语言其他非必填字段可以忽略

增加了 `unit-test` 单元测试节点后的 `yml` 结构如下

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - sonar:
          alias: sonar
          version: "1.0"
          params:
            code_dir: ${git-checkout}
            delete_project: true
            language: java
  - stage:
      - unit-test:
          alias: unit-test
          version: "1.0"
          params:
            context: ${git-checkout}
  - stage:
      - buildpack:
          alias: backend
          params:
            context: ${git-checkout}
            modules:
              - name: java-demo
                path: .
  - stage:
      - release:
          alias: release
          version: "1.0"
          params:
            dice_yml: ${git-checkout}/dice.yml
            replacement_images:
              - ${backend}/pack-result
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

`unit-test` 执行完后，可以在 `应用` -> `代码质量`->`执行列表` 中查看单侧的结果, 单元测试节点详细使用和上报可跳转 [单元测试](./unit-test.md)

## 构建成功后增加自动化测试执行的节点

如果不了解自动化测试可以先去了解下自动化测试的文档 [自动化测试](./auto-test-getting-started.md)

`testscene-run `(自动化测试场景执行)

`testplan-run` (自动化测试计划执行)

这2个节点可以让流水线去执行对应的场景和计划，从而可以打通接口测试流程。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a614cd01-7902-4765-ad62-f96234818a01.png)

选中 `testscene-run`（场景）或者 `testplan-run`（计划）， 填写必填字段，下拉框选中对应的空间，场景集，场景，参数配置，下拉框中的数据都是自动化测试中的数据

填好自动化测试执行的 Action 后，等待服务启动完成后，这个 Action 会自动帮你使用填写好的参数配置去执行对应的计划或者场景，当接口用例没有 100% 执行通过，该节点就会失败，执行结果也可以到对应的场景的 `执行历史` 中查看
