# Cluster CRD
Cluster CRD 在 Kubeprober 中描述集群对象，用于管理海量集群信息以及查看集群的诊断信息。

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
配置信息包含 K8sVersion、ClusterConfig 和 ExtraInfo， 其中 K8sVersion 与 ClusterConfig 信息由 probe-agent 上报，将 K8s 的版本信息、连接 ApiServer 所需 Token 或者密钥对信息写入 Cluster 资源的 Spec 中。  
### ClusterConfig
ClusterConfig 用于存储 probe-agent 从受纳管集群中采集的 K8s 信息，包括 api-server 内网地址、认证所需 Token、CA、Cert、Key 以及 probe-agent 所在的 namespace。上报的 ApiServer 认证信息所具备的 RBAC 权限由部署在受纳管集群的 kuberprober ns 下的 kubeprober ServiceAcount 权限决定，如需更多权限，可修改对应的 ClusterRole。

### ExtraInfo  
ExtraInfo 用于存储每个集群的特性化配置，也可理解为环境变量，通过增加、修改或删除 Cluster 资源中的 ExtraInfo 环境变量，probe-master 将最新变量同步至对应集群名为 extra-config 的 ConfigMap 中，随后即可在对应 Probe 诊断程序中使用变量，示例如下：
```yaml
  extraInfo:
  - name: LOGIN_USER
    value: "xxxxxxx"
  - name: LOGIN_PASSWORD
    value: "xxxxxxxxxxx"
```
## 状态信息
Cluster 的 Status 用于存储集群的诊断状态数据，包括节点数量、该集群关联的 Probe 列表、所有 Checker 的诊断结果数据（以总数/Error 数量呈现），以及 OnceProbeList 一次性诊断历史记录。