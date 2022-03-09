# 告警

Kubeprober 对集群执行诊断后，其结果分为 PASS、WARN、ERROR 三种状态。系统支持通过钉钉，针对 ERROR 诊断项发送告警。   

告警通过 CRD 实现，因此在 probe-master 所在集群中创建一个 Alert 的 CRD 即可。

```yaml
apiVersion: kubeprober.erda.cloud/v1
kind: Alert
metadata:
  name: dingding
  namespace: default
spec:
  address: https://oapi.dingtalk.com
  token: xxxxxxxx
  sign: xxxxxxxx
```
Token 和 Sign 分别对应钉钉机器人的 Token 和签名。

## 创建钉钉机器人
 进入 **钉钉群 > 群设置 > 智能群助手 > 添加机器人 > 自定义**，根据界面提示填写信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/3cbe8cf9-aa1b-4466-b366-668a39874135.png)

在 **安全设置** 中勾选 **加签**。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/b9675b20-2e15-4304-b6f2-042eb883c3eb.png)
## 告警结果
告警结果示意如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/d28d4183-e6db-43c8-b46b-5a4ee9f78fed.png)
