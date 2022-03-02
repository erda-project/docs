# Active Monitoring and Custom Alarm

Currently, active monitoring only supports alarms triggered by request status code. Configure custom alarms if you want to receive alarms triggered by request delay, request times, etc.

## Configure Active Monitoring

Take slow request of Redis as an example.

Go to **Microservice Platform > Project List > Select Project > Application Monitoring > Active Monitoring** and add monitoring.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/73ecb7cb-a2e0-4b38-9f5a-cceb8c8b2e0d.png)

## View Active Monitoring Details

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/6aad5d27-6d7e-4401-a3dc-507e5184233a.png)

## Configure Custom Alarm Rules

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/8ff2b682-0e5d-4c68-bfce-315240394e1e.png)

### Configure Field Rules

Customize the rules as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/2a520e8a-2feb-4881-bb1c-29ccb9a62670.png)

### Configure Message Template

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/ed879b91-4f3a-41da-b285-8dbc97b0c974.png)

## Configure Alarm Strategy

Configure an alarm strategy after custom alarm configuration. You can choose the custom alarm rules configured before.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/fd243f5d-ce4c-4bbb-bf13-779569eb3809.png)

When finish the operations above, the system will send an alarm notification to the DingTalk group according the message template if an alarm is triggered.
