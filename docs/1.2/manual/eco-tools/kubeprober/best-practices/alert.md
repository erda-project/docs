# 告警

kubeprober 对集群执行诊断，将诊断项的结果分为 PASS, WARN, ERROR 三中状态，系统支持将 ERROR 的诊断项告警出来，当前支持钉钉。   
对于告警也是使用 CRD 来实现，在 probe-master 所在集群中创建一个 Alert 的 CRD 即可。

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
Token 跟 Sign 分别对应钉钉机器人的 Token 跟 签名。

## 创建钉钉机器人
集群人创建入口： 钉钉群 --> 【群设置】 --> 【智能群助手】--> 【添加机器人】--> 【自定义】  
勾选加签  

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/04/4e600a91-90d5-4845-b968-aef44bc15503.png
)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/01/37ec3540-cf9c-43cb-801f-4de72dacaae1.png)
## 告警效果
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/01/1a2f888d-ff27-41e5-a367-0d180b51ddd9.png
)
