# Concepts

## Assist Enterprise Managers to Manage Digital Assets

The allocation and management of digital assets is the core of multi-cloud management. As the business grows continuously, the cost budgets will go out of control if the resource allocation gets out of hand.

The cloud management platform of Erda helps enterprise managers achieve full management of digital assets based on the following concepts:

1. Based on the tenant hierarchical (organization > project > application > runtime environment > microservice), drills down to analyze and optimize the distribution of digital assets.
2. Based on the resource pooling management, provides guidance for the resource scaling: whether the project needs scaling > which resource pools are used > whether the resource pool needs scaling.
3. Based on the structure of organization/project/application members, makes the resource cost allocation clear.

## Achieve Enterprise-Level SRE O&M

With the continuous development of cloud native, the boundary between O&M engineers and developers is gradually disappearing.

For developers, the basic O&M operations (such as workload scaling) becomes simple thanks to the abstraction of underlying infrastructure by Kubernetes.

For O&M engineers, they can log in to the machines to operate by SSH without maintaining numerous scripts, which greatly liberates productive forces and allows them to delve into enterprise-level O&M.

The cloud management platform of Erda helps O&M engineers or DevOps engineers achieve enterprise-level SRE O&M based on the following concepts:

1. Erda provides four environments for each project: development, testing, staging and production. Each environment corresponds to a Kubernetes namespace thus combines O&M of Kubernetes and project business.
2. When deploying services to environments on Erda, the platform will match resources according to the [environment tags](./guide/cluster/cluster-node-labels.md#Host-Isolation-Based-on-Environment), so the resource pools of each environment can be managed based on the environment tags.
3. The platform provides various built-in [templates of alarm rules](./guide/alert/alarm-strategy.md#Alarm-Monitoring), which meet monitoring requirements for most scenarios, and supports [custom alarms](./guide/alert/alarm-custom.md) and [dashboard](./guide/alert/dashboard.md) for professional O&M personnels.













