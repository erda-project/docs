# Alarm

Once kubeprober runs a diagnosis of a cluster, the result can be PASS, WARN or ERROR. It supports alarm notifications of ERROR via DingTalk, which is realized based on CRD, so just add a CRD for alert in the cluster where the probe-master is located.

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
## Add DingTalk Robot
Go to **DingTalk Group > Group Settings > Group Assistant > Add Robot > Custom**, and fill in the information required.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/3cbe8cf9-aa1b-4466-b366-668a39874135.png)

Select **Signature** in **Security**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/b9675b20-2e15-4304-b6f2-042eb883c3eb.png)
## Alarm Results
The alarm results are as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/09/30/d28d4183-e6db-43c8-b46b-5a4ee9f78fed.png)
