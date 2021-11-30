# Configure Common Alarms for Machine

You need to pay attention to the overall status of cluster as it works, or set alarms to receive notifications for exceptions.

Go to **Cloud Management > O&M Alarm > Alarm Strategy > New Strategy**. The platform provides multiple built-in alarm strategies and you can select from **Type Template** as needed.

You can also customize the alarm rules according to the actual situation, select the appropriate threshold and related aggregation functions.

## Node

For machine nodes, you need to focus on their resource usage, node status, etc.

### Status

If the machine crashes unexpectedly, it is very likely to affect the service. Therefore, it is recommended to set alarms of machine status firstly.

### CPU

CPU usage measures the CPU proportion in user processes, kernel processes, and interrupt processing over a period of time. High CPU is not equal to exception, but if the CPU usage stays high for a long time, then it might be a problem.

In general, the CPU usage should not be higher than 95% within 5 minutes.

### Memory

For the machine, you only need to pay attention to the memory usage.

In general, the memory usage should not be higher than 80%.

### Disk

Disk as a physical resource also affects user processes. For example, users cannot write to the database application if the disk if full, or create new files if the node is full.

In general, the disk usage should not be higher than 86% and the disk inode usage should not be higher than 85%.

### Load Average

The load average refers to the average number of processes in runnable status and uninterruptible status in the system over a period of time, which is also the average number of active processes and has no direct correlation with CPU usage.

You can take it as the overall busyness of the system. High load average indicates busy system and shortage of resources. By default, the threshold is set to 20, and you can adjust it according to the number of CPUs on the node.

In general, the load average of a single CPU should not be higher than 70%.

## Cluster Component

In addition to the situation of machine nodes, you also need to pay attention to the condition of system components. In most cases, Erda runs on a Kubernetes cluster, so the following will take Kubernetes cluster as an example.

### Status

The status of Kubernetes system components is particularly important. The platform will collect information such as events of component exit, thus it is recommended to enable alarm strategies related to Kubernetes.

### Resource Usage

The resource usage of component instance will affect the component stability. For example, insufficient memory leads to OOM, insufficient CPU leads to slow processing. The default configuration provided by the platform is relatively conservative, and you can adjust the threshold according to the actual situation.
