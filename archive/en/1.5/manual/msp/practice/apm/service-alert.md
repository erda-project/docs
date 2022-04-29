# Service Stability and Performance Alarm Configuration

The service instability may be reflected in the following aspects:

* The service runs slowly.
* The service is inaccessible.
* The page keeps loading.

In the final analysis, these can be classified into two types of issues:

* Resource Bottleneck
* Performance Bottleneck

For these two types of issues, you can take preventive measures based on the alarms of Erda and use the monitoring functions for troubleshooting.

## Resource Bottleneck

You can configure alarm strategies for container resources. Once the resource reaches the threshold, an alarm will be triggered.
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/6597020a-4db4-40af-8626-46602bf303bf.png)Currently the built-in resource alarm configuration includes the following options:

- CPU usage exception of application instance
   - Default: An alarm will be triggered when the average CPU usage is greater than or equal to 90% for one minute.
   - Suggestion: Set the threshold as 70~80% to reserve time for processing.
- Memory usage exception of application instance
   - Default: An alarm will be triggered when the average memory usage is greater than or equal to 90% for one minute.
   - Suggestion: Set the threshold as 70~80% to reserve time for processing.
- OOM of application instance
   - Default: An alarm will be triggered when OOM occurs.
- JVM GC times
   - Default: An alarm will be triggered when the GC times is greater than 5 within three minutes.
- JVM GC time consuming
   - Default: An alarm will be triggered when the maximum GC time consuming is greater than or equal to 400ms, or the total time consuming is greater than or equal to 1s.
- JVM heap

   - Default: An alarm will be triggered when the average usage of JVM heap is greater than or equal to 75% for one minute.
- Memory usage of NodeJS heap
   - Default: An alarm will be triggered when the average usage of NodeJS heap is greater than or equal to 75% for one minute.

## Performance Bottleneck

If a performance issue occurs, it is a positive signal to some extent which indicates increased user numbers. At this time, what you need to do is to allow the service to withstand concurrent access from more users. For details, see [Performance Stress Testing Dashboard](pressure-test-dashboard.md) to troubleshoot slow requests and slow SQL to solve performance problems.
