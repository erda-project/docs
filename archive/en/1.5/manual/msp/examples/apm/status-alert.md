# Active Monitoring and Custom Alarm

Currently, active monitoring only supports alarms triggered by request status code. Configure custom alarms if you want to receive alarms triggered by request delay, request times, etc.

## Configure Active Monitoring

Take slow request of Redis as an example.

Go to **Microservice Platform > Project List > Select Project > Application Monitoring > Active Monitoring** and add monitoring.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/440936aa-3f3a-45c4-ba11-adde8c1ee4ea.png)

## View Active Monitoring Details

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/719faada-7c85-459b-ad34-aee53494e7df.png)

## Configure Custom Alarm Rules

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/5ce6d1a6-5a2c-4eb1-a9d6-6371eacb6c07.png)

### Configure Field Rules

Customize the rules as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/68c40db9-307b-439f-a0d8-edd45f9cface.png)

### Configure Message Template

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/c52a03d4-7576-4d83-9244-52bd6630c030.png)

## Configure Alarm Strategy

Configure an alarm strategy after custom alarm configuration. You can choose the custom alarm rules configured before.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/c2eff490-c68c-464e-90ce-2dba88340cab.png)

When finish the operations above, the system will send an alarm notification to the DingTalk group according the message template if an alarm is triggered.
