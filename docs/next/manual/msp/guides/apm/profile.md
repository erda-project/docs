# 持续分析

## 功能介绍
持续性能分析（Continuous Profiling）是可观测领域继链路、指标、日志之外的第四大支柱。以 Java 为例，Erda 通过 javaagent 的方式将 profile 数据的采集探针注入到业务代码中，从而持续采集应用的 profile 数据，并且提供可视化的能力方便开发人员分析，定位以及优化代码，该功能贯穿了应用的整个生命周期，可以识别 CPU、内存、I/O 等层面的性能瓶颈问题，并建立代码与性能瓶颈的关联性，准确定位应用程序资源消耗最多的部分，协助开发者优化代码，解决性能问题。引入 Profiling 分析功能后，用户可以轻松查看整体性能趋势和问题点，无需手动使用 pprof 工具，它能帮助您：

* 查找代码中的性能问题
* 解决 CPU 利用率高的问题
* 定位并修复内存泄漏
* 保存历史性能数据，错过现场也能有数据可以进行分析
* 支持不同时间段，不通实例的性能差异对比

> 1. profile 数据默认保留 1 天，需要修改可以在 Erda 后台进行设置。
> 2. 使用 sampling profilers 能够以最小的开销采集 profile 数据，约 2-5%。

## 应用接入
Erda 流水线将自动为 java，nodejs 以及go 应用注入持续分析的 agent，前提条件如下：
* erda版本 >= 2.4。
* 使用 buildpack 或者 java action。
erda 针对 java 以及 nodejs 应用在流水线中做了 profile agent 的自动注入，对于符合要求的 erda 版本以及 action，用户只需要重新运行流水线即可在 erda 页面中看到对应应用的 profile 数据。
针对 golang 应用，用户可以通过添加如下代码在应用入口处来开启 profile 数据的采集。
```go
package main

import "github.com/pyroscope-io/client/pyroscope"

func main() {
    // These 2 lines are only required if you're using mutex or block profiling
    // Read the explanation below for how to set these rates:
    runtime.SetMutexProfileFraction(5)
    runtime.SetBlockProfileRate(5)

    pyroscope.Start(pyroscope.Config{
        ApplicationName: "simple.golang.app",

        // replace this with the address of pyroscope server
        ServerAddress:   "http://pyroscope-server:4040",

        // you can disable logging by setting this to nil
        Logger:          pyroscope.StandardLogger,

        // optionally, if authentication is enabled, specify the API key:
        // AuthToken:    os.Getenv("PYROSCOPE_AUTH_TOKEN"),

        // you can provide static tags via a map:
        Tags:            map[string]string{"hostname": os.Getenv("HOSTNAME")},

        ProfileTypes: []pyroscope.ProfileType{
            // these profile types are enabled by default:
            pyroscope.ProfileCPU,
            pyroscope.ProfileAllocObjects,
            pyroscope.ProfileAllocSpace,
            pyroscope.ProfileInuseObjects,
            pyroscope.ProfileInuseSpace,

            // these profile types are optional:
            pyroscope.ProfileGoroutines,
            pyroscope.ProfileMutexCount,
            pyroscope.ProfileMutexDuration,
            pyroscope.ProfileBlockCount,
            pyroscope.ProfileBlockDuration,
        },
    })

    // your code goes here
}
```

## 功能介绍

### 功能入口
应用接入了 profile 数据之后，您可以进入 **微服务治理平台 -> 诊断分析 -> 持续分析** 中来查看该 项目 / 环境下所有已经接入了profile 数据的服务的性能数据。

### Serach
在 Search 功能中，可以通过 App，Service 选择服务，也可以通过 Instance 选在特定的某一个实例，它可以显示某一段时间内不同类型 profile 的火焰图，也可以使用表格展示或者同时展示，火焰图可以看到微服务方法调用的性能指标。
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2023/07/04/c723db4d-d3a9-4994-8502-f019570d22b3.png)

### Compare
compare 功能可以对比统一个服务不同时间段内的 profile 数据，从而找到发生性能问题时间点跟其他时间点的的性能差异，从而将问题锁定到代码级别，如图，我们对比了同一个应用的的两个不同时间点的 profile 数据，可以看到有性能问题的事件点的 cpu 消耗是集中哪个方法中的。
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2023/07/04/aaef91fc-cceb-45a7-bd87-7150ac04c2ed.png)

### 配置
用户可以使用如下环境变量来配置 profile 数据的采样开关以及频率，可以在应用中的 环境部署 -> 参数设置 中进行配置。
|环境变量|说明 |
|--|--|
|PROFILING_ENABLED|是否开启式 profile 采样， 默认值 true。|
|PYROSCOPE_UPLOAD_INTERVAL|profile数据的上报频率，上报越频繁，对CPU的消耗越多，默认值为1s，对于调用量大的服务可以设置为100s|
|PYROSCOPE_SAMPLING_DURATION|profile的采样频率，默认是10ms，即采样频率为100HZ，对于调用量大的服务可以调整为1HZ，即设置为1s|

## Profile 数据类型

|语言|分析类型|说明|
|--|--|--|
|Java|alloc_in_new_tlab_objects|从TLAB上分配对象的数量，jvm开启了TLAB后会从TLAB上分配，默认是开启的。|
|Java|alloc_in_new_tlab_bytes|从TLAB上分配对象的大小，jvm开启了TLAB后会从TLAB上分配，默认是开启的。|
|Java|itimer|每个方法加载的类数。|
|Java|lock_count|每个方法等待锁所花费的时间。|
|Java|lock_duration|锁对象的执行时间总和|
|Java|alloc_outside_tlab_objects|从TLAB之外分配的对象的数量。|
|Java|alloc_outside_tlab_bytes|从TLAB之外分配的对象的大小。|
|Go|CPU Time|每个函数在 CPU 上执行所花费的时间。|
|Go|Allocations|在分析期间每个函数在堆内存中分配的对象数，包括之后释放的分配。|
|Go|Allocated Memory|在分析期间每个函数分配的堆内存数量，包括之后释放的分配。|
|Go|Heap Live Objects|每个函数在堆内存中分配的尚未被垃圾回收的对象数。这可以帮助调查服务的整体内存使用情况并识别潜在的内存泄漏。|
|Go|Goroutines|当前有多少 goroutines 在同一个函数中运行的快照（on-CPU 和 off-CPU 等）。快照之间的 goroutines 增加表明程序正在泄漏 goroutines。|

## 最佳实践
[使用持续分析排查 JAVA 应用 CPU 高的问题](../../practice/apm/profile-cpu.md)

[使用持续分析排查 JAVA 应用内存泄露的问题](../../practice/apm/profile-memory.md)
