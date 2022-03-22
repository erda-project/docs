# Cluster CRD
Cluster CRD describes cluster objects in Kubeprober, to manage massive cluster data and view cluster diagnostic information.

## Structure
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

## Configuration
The configuration information includes K8sVersion, ClusterConfig and ExtraInfo. The probe-agent reports information of K8sVersion and ClusterConfig, and writes the version of K8s, token required for connection to APIServer and key pairs into the spec of the cluster.
### ClusterConfig
ClusterConfig is used to store the K8s information collected by the probe-agent from the managed cluster, including the api-server intranet address, the token required for authentication, CA, cert, key and the namespace where the probe-agent is located. The RBAC permissions of the reported ApiServer authentication information are determined by the kubeprober ServiceAcount deployed under the kuberprober ns of the managed cluster. Modify the corresponding ClusterRole for more permissions.

### ExtraInfo
ExtraInfo is used to store the characteristic configuration of each cluster. By adding, modifying or deleting the ExtraInfo environment variable in the cluster, the probe-master will synchronize the latest variable to the ConfigMap named extra-config, then the variables can be used in the corresponding probe diagnosis. An example is as follows:
```yaml
  extraInfo:
  - name: LOGIN_USER
    value: "xxxxxxx"
  - name: LOGIN_PASSWORD
    value: "xxxxxxxxxxx"
```
## Status
The status of cluster is used to store the diagnostic data, including the number of nodes, the probe list associated with the cluster, the diagnosis results of all checkers (presented as total number/error) and the OnceProbeList.