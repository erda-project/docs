## Cluster CRD
Cluster CRD 在 kubeprober 中描述集群对象，用于管理海量集群信息以及查看集群的诊断信息。

## 主要结构
```go
type ClusterSpec struct {
	K8sVersion    string        `json:"k8sVersion,omitempty"`
	ClusterConfig ClusterConfig `json:"clusterConfig,omitempty"`
	ExtraInfo     []ExtraVar    `json:"extraInfo,omitempty"`
}

type ExtraVar struct {
	Name  string `json:"name" protobuf:"bytes,1,opt,name=name"`
	Value string `json:"value,omitempty" protobuf:"bytes,2,opt,name=value"`
}

type ClusterConfig struct {
	Address         string `json:"address"`
	Token           string `json:"token"`
	CACert          string `json:"caCert"`
	CertData        string `json:"certData"`
	KeyData         string `json:"keyData"`
	ProbeNamespaces string `json:"probeNamespaces"`
}

// ClusterStatus defines the observed state of Cluster
type ClusterStatus struct {
	HeartBeatTimeStamp string          `json:"heartBeatTimeStamp,omitempty"`
	NodeCount          int             `json:"nodeCount,omitempty"`
	AttachedProbes     []string        `json:"attachedProbes,omitempty"`
	Checkers           string          `json:"checkers,omitempty"`
	OnceProbeList      []OnceProbeItem `json:"onceProbeList,omitempty"`
}

type OnceProbeItem struct {
	ID         string   `json:"id,omitempty"`
	CreateTime string   `json:"createTime,omitempty"`
	FinishTime string   `json:"finishTime,omitempty"`
	Probes     []string `json:"probes,omitempty"`
}

// Cluster is the Schema for the clusters API
type Cluster struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ClusterSpec   `json:"spec,omitempty"`
	Status ClusterStatus `json:"status,omitempty"`
}

```

## 配置信息
配置信息包含 K8sVersion， ClusterConfig， ExtraInfo， 其中 K8sVersion，ClusterConfig 信息是由 probe-agent 上报上来的，将 k8s 的版本信息，连接 ApiServer需要的token 或者 秘钥对信息写在 Cluster 资源的 Spec 中。  
### ClusterConfig
ClusterConfig 用来存储 probe-agent 从被纳管集群中采集上来的 k8s 信息 ，包含 api-server 的内网地址，认证所需要的 Token，CA，Cert，Key 以及 probe-agent 所在的 namespace。上报上来的 ApiServer 认证信息所具有的 RBAC 权限由部署在被纳管集群的 kuberprober ns 下的 kubeprober ServiceAcount 权限来决定，如果需要更多权限，可以修改对应的 ClusterRole。

### ExtraInfo  
ExtraInfo 被设计用来存储每个集群的特性化配置，可以理解成环境变量，通过增加修改或者删除 Cluster 资源中的 ExtraInfo 环境变量，probe-master 会将最新的变量同步到对应集群的名为 extra-config 的 ConfigMap 中，然后就可以在对应的 Probe 诊断程序中使用这些变量了，达到实现不同集群相同诊断项但是某些参数不通的场景，一个具体的例子，如下：
```yaml
  extraInfo:
  - name: LOGIN_USER
    value: "xxxxxxx"
  - name: LOGIN_PASSWORD
    value: "xxxxxxxxxxx"
```
## 状态信息
Cluster 的 Status 主要用来存储集群的诊断状态数据，包含节点数量， 该集群关联的 Probe 列表，所有 Checker 的诊断结果数据(以 总数/Error数量 来显示)，以及 OnceProbeList 一次性诊断历史记录。