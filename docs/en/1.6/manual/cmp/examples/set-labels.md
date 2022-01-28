# Set Labels for Nodes

Go to **Cloud Management > Container Resource > Node**, and click the **+** icon in the column of **Node**.

## Scenario 1: Divide Machine Resource Pools by Environment

Erda divides deployment environments into four categories:

- Development
- Testing
- Staging
- Production

Take the DevOps platform as an example. It runs scheduling as follows without branch rules:

- The code of the feature/* branch is automatically deployed to the development environment by CI/CD.
- The code of the develop branch is automatically deployed to the testing environment by CI/CD.
- The code of the release/* branch is automatically deployed to the staging environment by CI/CD.
- The code of the master branch is automatically deployed to the production environment by CI/CD.

In the cloud management platform, set environment labels for nodes, allowing Erda to schedule deployments of the corresponding environment to the node. As shown in the figure below, select environment label in category and then select an environment.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/d7a10c11-bb30-44f6-bf56-770ec2e6a3bc.png)

Labels of four environments can be set for one node to indicate that the node is shared by the service deployment of the four environments.

:::tip Tips

For the actual K8s label value corresponding to the specific label, see [Node Tags](../guide/cluster/cluster-node-labels.md).Take setting development environment label for the node as an example, the actual K8s label is `dice/workspace-dev=true`.

:::

## Scenario 2: Schedule Pipeline Tasks to Designated Machines

It is recommended to schedule pipeline tasks to machines without business service deployed. It may affect the stability of the business if pipeline tasks run on machines with business services deployed as they are mostly IO-intensive tasks.

Set labels for nodes in cloud management platform for pipeline task scheduling. As shown in the figure below, select job label in category and then select job type.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/8e55a0f2-f9a2-4dab-9420-702e78c04749.png)

:::tip Tips

Pipeline task type:
* CI/CD tasks refer to the pipeline tasks of code compilation, image building and service deployment in the DevOps platform.
* Big data tasks refer to data processing tasks such as Flink stream batch processing in the fast data platform.

:::

