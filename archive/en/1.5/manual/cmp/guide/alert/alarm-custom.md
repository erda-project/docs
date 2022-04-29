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

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/03/4aa1fa7e-b17a-4f21-870d-f873cd17327d.png)

#### Filter Rules
Describes how to filter the alarm data, which will be saved in the database in JSON format. When the alarm data matches with a rule, the corresponding value will be obtained from the tag of the metric.

#### Grouping Rules
Describes how to group the alarm metrics. The value is read from the tag of the metric and is an optional field.

#### Field Rules
The fields available will change according to the indicator selected. The alias is another name for this field. The aggregation describes how data is aggregated within a time window and the operation describes how the aggregation results are compared with expected values. The default threshold refers to the expected threshold calculated by the indicator field.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/03/7cbdbd31-dc3e-4fc2-8087-d02045c5cb0e.png)

### Message Template

#### Optional Notification Methods
Indicates the way to send alarms, optional.

#### Message Title Rules
Refers to the title of the template displayed when sending an alarm.

#### Message Content Rules
Describes the content template displayed when sending an alarm. The placeholder in the template sample is obtained from metrics. Please write referring to the template sample.
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/03/3567cd14-916e-4bd3-b812-56c3c584870d.png)
After adding a custom rule, you can select it in the alarm strategy.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/03/6579d281-2ce4-43aa-9ba8-6d70c3d31bc0.png)

