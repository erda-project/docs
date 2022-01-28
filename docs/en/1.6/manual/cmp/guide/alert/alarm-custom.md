# Custom Alarm

If the alarm rules provided by the platform cannot meet your needs, you can create custom alarms and set trigger rules and message templates as needed.

## Custom Alarm Metrics
Currently the platform supports the following custom alarm metrics:
- Machine
- Platform resource
- Project resource
- Cloud product
- Log metrics
- Others

## Create Custom Alarms
Go to **Cloud Management > O&M Alarm > Custom Alarm**.

### Name
Fill in the name, which cannot be repeated, to distinguish from others.

### Trigger Rules

#### Period
Refers to the time window for alarm metrics calculating in minutes.

#### Indicator
Indicates the metric events that alarm reads, which can be selected from the drop-down list with only one selection supported.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/13/ac33f8d4-2d04-4ed3-b461-8b1637eab418.png)

#### Filter Rules
Describes how to filter the alarm data, which will be saved in the database in JSON format. When the alarm data matches with a rule, the corresponding value will be obtained from the tag of the metric.

#### Grouping Rules
Describes how to group the alarm metrics. The value is read from the tag of the metric.

#### Field Rules
The fields available will change according to the indicator selected. The alias is another name for this field. The aggregation describes how data is aggregated within a time window and the operation describes how the aggregation results are compared with expected values. The default threshold refers to the expected threshold calculated by the indicator field.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/13/ba1ebfeb-acab-4688-9bc4-6e9e328f65f3.png)

### Message Template

#### Optional Notification Methods
Indicates the way to send alarms, optional.

#### Message Title Rules
Refers to the title of the template displayed when sending an alarm.

#### Message Content Rules
Describes the content template displayed when sending an alarm. The placeholder in the template sample is obtained from metrics. Please write referring to the template sample.

<center><img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/13/dc7527c3-0658-4ac7-9d34-ebd70278bf0b.png" style="zoom:50%;" /></center>

After adding a custom rule, you can select it in the alarm strategy.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/13/74aa5902-b3dd-4cfe-873a-a1efdccb41d7.png)

