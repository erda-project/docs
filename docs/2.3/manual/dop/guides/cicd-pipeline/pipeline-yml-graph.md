# 流水线配置（图形）

手写流水线可能存在语法错误或上手比较困难。平台提供可视化图形编辑，通过图形界面交互快速配置流水线，更直观地呈现整个流水线流程。

## 编辑流水线
进入 **DevOps 平台 > 我的应用 > 选择应用 > 流水线 > 选择分支**，点击编辑图标。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/dc363e87-fcfc-4287-8390-9d1bf5bd40ed.png)

## 添加节点
添加节点前，请参见 [pipeline.yml](../reference/pipeline.md) 了解流水线基本构成元素。

流水线由多个阶段（Stage）构成，各阶段可同时进行多个 Action。您可根据需求选择串行节点或并行节点，点击 **+** 即可选择丰富的制品。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/d8007636-b61a-42b3-9739-65c5d00f6c2f.png)


## 配置制品信息
点击相应制品，选择或输入所需配置，包括版本、任务参数、运行资源等。

每个制品的参数各不相同。关于制品更多信息，请参见 [扩展市场](https://www.erda.cloud/market/pipeline)。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/2e8560f3-d383-4d96-898f-ad7166a4bc16.png)

## 查看图形化流水线
完成制品信息配置后，可在界面上查看可视化的流水线。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/8645d969-8bb5-4f46-98f6-10d38d614783.png)

图形化编辑可让您直观地感受整个流水线的执行流程。关于如何执行流水线，请参见 [流水线运行](pipeline-execution.md)。

