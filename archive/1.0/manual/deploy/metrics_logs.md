# 指标和日志

当在平台上成功部署了一个应用后，开发和运维人员更多的是关心应用的运行情况。

一方面，需要关注应用实际运行的内存、CPU、磁盘 IO、网络等情况；另一方面，也是开发和运维人员最常关注的运行日志。

### 云平台监控 VS 传统监控

#### 传统监控

在传统的裸机或虚拟机运维模式下，开发和运维人员需要经常登入到机器上，用命令或任务管理器去查看服务运行的内存和CPU的使用情况，这种模式带来了如下问题：

1. 直接登入到机器在管理上会带来一些安全性问题
2. 命令输出的内容很不直观
3. 无法去追溯历史的运行状态
4. 能观察的状态非常局限，无法洞察服务内部更详细的状态、各个组件之间的调用情况
5. 查看和管理日志不方便，只能通过工具来阅读日志文件，还需要按时间或大小来管理日志文件
6. 集成第三方的监控工具，需要复杂的步骤，甚至需要修改业务代码

#### 云平台监控

基于云平台部署的应用，能享受到平台带来的很多福利，监控和日志就是其中的一个大礼包：

1. 无需登入机器，统一的界面查看服务运行状态和日志信息
2. 无需复杂的配置，无入侵式的将监控集成到应用中
3. 非常直观的、多维度的洞察服务的运行的状态
4. 持久化的监控数据，更方便且无追溯历史问题
5. 能准确实时的将各种异常信息告警出来
6. 无需管理日志文件，应用只需要专注日志的埋点打印

### 谁来关注监控和日志

如果你是一个运维人员，你需要关注的内容是整个集群的机器的资源、磁盘使用情况、机器的负载情况、运行的服务实例数、中间件的运行情况等，在 [运维管理](../o_m/cloud-resource-management.md) 章节会有更详细的介绍。

如果你是一个项目管理员，你会在宏观上去关注整个项目里各个服务运行的状态、各个服务之间的关系以及调用情况、服务的异常情况等。

如果你是一个开发人员，除了会去关注的服务运行状态，更多的会关注服务的运行的日志。

### 服务日志

当成功部署一个应用后，一般最想看的是服务日志，看看有没有错误日志，服务是不是按预期的那样打印了正常的日志信息。

如下图所示，进入到应用部署后的 Runtime 界面，可以看到每个服务的实例右侧的一些小按钮，

![查看日志](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/19/7fbc1da9-90b1-4faf-9474-0a037e0a8e96.jpg)

点击查看日志按钮，可以看到服务输出到 stdout 的运行日志，

![stdout 日志](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/19/2636a17e-a85b-4966-9309-129d9a922796.jpg)

我们知道，一个进程在启动后系统默认会分配 stdout、stderr、stdin 文件描述符，其中 stdin 是输入，stdout 是标准输出、stderr 是错误输出。通过如下按钮，可以切换查看 stdout 和 stderr 输出的日志

![stderr 日志](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/19/e4613ab1-553e-4175-b0d1-5442bf6cd2ce.jpg)

有时候，希望通过本地的文本工具来处理/查看日志，或者是想将某段时间的日志内容发送给别人来协助排查问题，这个时候日志下载功能就可以派上用场：

![日志下载](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/19/f29237d5-0c3d-4f73-b219-55aece42f0fe.jpg)

### 服务基础监控

通过日志，大概能知道服务已经正常运行了，但是不确定实际使用了多少资源，这个时候，我需要查看容器的监控指标，

![查看监控](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/19/d8f9c992-c6ce-4a87-820c-403e7592a2cf.jpg)

![监控指标](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/19/06dbdcda-9cc7-4f93-9574-01697a408509.jpg)

从上图中可以看到4个监控图表，分别如下：

* 内存：图中的2条曲线，limit 表示这个服务实例最大可以使用的内存量，另一条表示内存使用的百分比，鼠标移上去还可以看到具体时间点的内存使用量。

* CPU: 是一个百分比的曲线图，表示占一个核的百分比，比如100%表示占满了1个机器1个 CPU 核的使用。

* 磁盘：2条曲线，分别表示每秒从磁盘的读取的数据量和写入的数据量。

* 网络：2条曲线，分别表示每秒从网卡接收和发送的数据量。

从监控图表里，知道了服务实际使用的资源情况，我们可以根据这些信息评估对应的服务实际应该分配多少资源。

### 微服务之APM

当观察了服务的基础指标和运行的日志信息后，能知道这个服务是正常运行的，大概消耗了多少资源。

然而这个时候，对服务内部的更详细的状态，以及整个项目里的服务运行情况，还是一个迷糊的状态。可以在 微服务 章节里的 [应用性能管理 (APM)](../microservice/use-apm-monitor-app.md) 和 [全链路追踪和诊断](../microservice/tracing.md) 里了解更多关于APM的内容，来洞察更多关于服务的内部状态信息，以及项目整体的情况。
