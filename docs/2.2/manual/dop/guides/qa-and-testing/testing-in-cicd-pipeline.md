# 测试与 CI/CD 流水线结合

前文已为您介绍如何使用 [Sonar 漏洞扫描](./sonar-report.md)、[单元测试](./unit-test.md)、[自动化测试](./auto-test-getting-started.md)，本文将指导如何将这些节点结合至现有的 CI/CD 流水线文件中。

## 新建 CI/CD 流水线

进入 **DevOps 平台 > 我的项目 > 应用开发**， 新建一个业务应用，使用系统内置仓库，通过 `git clone https://github.com/bzdgn/docker-spring-boot-java-web-service-example.git` 下载 Demo 代码至本地，随后再推送至内置仓库。

进入该应用的流水线页面，选择分支后新建默认流水线。关于如何图形化编辑流水线，请参见 [流水线配置（图形）](../cicd-pipeline/pipeline-yml-graph.md)。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/aaa0c86e-0f48-47ae-8608-19984799c34f.png)

编辑后的 YML 结构如下所示。关于如何文本编辑流水线，请参见 [流水线配置（文本）](../cicd-pipeline/pipeline-yml-config.md)。

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

完成流水线编辑后，点击 **新建流水线**，随后点击执行按钮。关于如何执行流水线，请参见 [流水线运行](../cicd-pipeline/pipeline-execution.md)。

## 增加 Sonar 扫描节点

如图所示，点击图形界面的 **+** 图标添加 Sonar 节点，完成相应信息填写（其中 `code_dir` 和 `language` 为必填项）。填写 `code_dir` 为 `${git-checkout}`，`git-checkout` 即 git-checkout action 中 `alias` 声明的字段。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/daa5aec5-01c2-4815-b95d-12311dc47917.png)

此处以 Java 应用为例，因此 `language` 处填为 `java`，其他字段请按需配置。 `use_platform_quality_gate` 默认为 `true`，代表使用 Erda 平台的扫描规则。更多规则配置相关内容，请参见 [Sonar 门禁规则](./sonar-quality-gate.md)。

增加 Sonar 扫描节点后的 YML 结构如下所示：

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

完成流水线执行后，进入 **DevOps 平台 > 我的应用 > 代码质量** 可查看质量报告和问题列表，具体请参见 [Sonar 报告](./sonar-report.md)。

## 增加单元测试节点

如图所示，点击图形界面的 **+** 图标添加单元测试节点，填写 `context` 为 `${git-checkout}`，`git-checkout` 即 git-checkout action 中 `alias` 声明的字段。若非 Golang 语言，可忽略其他选填字段。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/89eb0808-cba7-4c34-b313-218196fe1d0a.png)

增加单元测试节点后的 YML 结构如下所示：

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

完成单元测试执行后，可进入 **DevOps 平台 > 我的应用 > 代码质量 > 执行列表** 查看单元测试结果，具体请参见 [单元测试](./unit-test.md)。 

## 增加自动化测试节点

如图所示，点击图形界面的 **+** 图标添加自动化场景执行或自动化计划执行节点，完成相应信息填写。测试空间、场景集、场景和参数配置的可选数据均来自于自动化测试。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/a614cd01-7902-4765-ad62-f96234818a01.png)

待服务启动后，该 Action 将根据已配置的参数自动执行对应的计划或场景。若接口用例未 100% 通过，则该节点执行失败，您也可以进入对应场景的执行历史查看执行结果。
