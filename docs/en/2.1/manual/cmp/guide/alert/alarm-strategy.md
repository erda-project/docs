# Alarm Strategy

The alarm strategy is a vital part in O&M alarm, which lets you know the resource usage in time and deal with emergencies. You can receive alarms for a certain status of a certain resource by creating an alarm strategy.

## Alarm Monitoring
The platform supports monitoring of the following:
### Microservice
- API gateway CPU
- API gateway memory
- Registration center CPU
- Registration center memory

### Machine
- Machine clock error
- Machine CPU
- Machine disk
- Machine disk inode
- Machine disk IO
- Machine load 5
- Netdisk
- Netdisk usage
- Machine status

### Custom addon
- MySQL SLAVE DELAY ALERT
- MySQL SLAVE SYNC ALERT

### Addon
- Addon Cassandra GC times
- Addon Cassandra GC time consuming
- Addon instance CPU status
- Addon exit
- Addon instance memory status
- Addon instance ready status
- Addon Elasticsearch GC times
- Addon Elasticsearch GC time consuming
- Addon Kafka GC times
- Addon Kafka GC time consuming
- Addon Kafka consumption

### Component
- Component instance CPU
- Component exit
- Component instance memory status
- Component instance ready status
- Component Flink checkpoint delay
-  Component Flink throughput
- Component netdisk unavailable
- Component log storage protector status

### Kubernetes
- Kubernetes instance CPU
- Kubernetes instance exit
- Kubernetes instance memory
- Kubernetes instance ready
- Kubernetes node

### Project addon
- Elasticsearch instance CPU usage
- Elasticsearch instance memory usage
- MySQL instance CPU usage
- MySQL instance memory usage
- MySQL instance master-slave synchronization
- Redis instance memory usage

## Create New Strategy
Go to **Cloud Management > O&M Alarm > Alarm Strategy > New Strategy**, and select alarm rules, silence period and notification group.

### Alarm Name
Fill in the name, which cannot be repeated, to distinguish from others.

### Alarm Rule
You can set multiple alarm rules and an alarm will be triggered when one of the rules is met. Select rules in the following ways:
* Select **Type Template**

   All the alarm rules in the selected template will be added. For example, if you select the machine template, then the alarm rules of the template will be added as follows:

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/13/b64c39d0-0978-4c3c-8721-c443c17669fe.png)

* Select **Add Rule**

   Select a rule in the drop-down list as needed, which contains alarm rules of all templates.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/13/284b61e6-157b-4c00-868a-252fbaf99596.png)

### Silence Period
To avoid frequent alarms, you can set the silence period, that is the interval between alarms triggered by the same rule. It supports silence periods of 5 minutes, 10 minutes, 15 minutes, 30 minutes, 60 minutes and 3 hours.

### Silence Period Policy
The silence period policy works with the silence period, with the following policies supported:
- **Fixed**: If you set a silence period of 5 minutes and the silence period policy is fixed, the alarm interval triggered by the same rule will remain at 5 minutes.
- **Doubled**: If you set a silence period of 5 minutes and the silence period policy is doubled, the alarm interval triggered by the same rule will be doubled from 5 minutes to 10 minutes, 20 minutes and so on.

### Select Group
Select a group to receive the alarm, and select level and notification method.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/13/b6fdb612-19c7-4b37-a94d-024ce4b5cc10.png)
