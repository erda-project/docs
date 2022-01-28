# Node Tags

Erda classifies machines by tags for different scheduling needs.

## Host Isolation Based on Environment

Erda has 4 built-in environments for project and sets 4 tags correspondingly:

- Development: `dice/workspace-dev=true`
- Testing: `dice/workspace-test=true`
- Staging: `dice/workspace-staging=true`
- Production: `dice/workspace-prod=true`

You can set one or more tags for host to indicate that the application in the corresponding environment can be scheduled, and achieve host isolation based on environment by the tag.

:::tip Tips

All hosts that serve the project must have one or more environment tags, otherwise applications cannot be scheduled.

:::

## Set Runnable Services for Host

Erda provides two service tags, `dice/service-stateless=true` and `dice/service-stateful=true`, for stateless services and stateful services scheduling.

* The stateless service corresponds to the runtime service in deployments, so hosts that run applications should be tagged as service-stateless.

* The stateful service corresponds to the middleware addon. The addon has various built-in middleware, such as MySQL, Elasticsearch and RocketMQ, and most of them are stateful applications involving data storage, which need to be distinguished from other applications. If the project uses the addon of Erda, then the specified host should be tagged as service-stateful.

## Set Runnable Tasks for Host

Erda supports task orchestration via pipeline for various scenarios and sets different tags for them.

- CI/CD task, for project development and deployment, with tag of `dice/job=true`.
- Big data computing task, with tag of `dice/bigdata-job=true`.

## Specify Host to Run a Specific Application

Erda supports custom tag location-xx to run specified application on specified node.

For example, to run the application of example on a specified host, the steps are as follows:

1. Set custom tag `dice/location-example=true` for the specified host.

2. Set `erda.yml` of the application, and configure `deployments` field as follows:

   ```yaml
   deployments:
         replicas: 2
         selectors:
           location: "example"
   ```

3. If the machine is exclusively used by the application, then the location tag `dice/location=true` should also be set for the host.

## Other Application Scenarios

- Erda platform, to specify platform service to run, with tag of `dice/platform=true`.
- Cluster service, to specify microservice component to run, such as configuration center and registration center, with tag of `dice/location-cluster-service=true`.

## Tags

- `dice/job=true`: For pipeline task scheduling.
- `dice/bigdata-job=true`: For big data task scheduling.
- `dice/service-stateless=true`: For stateless service tag scheduling, to deploy runtime services.
- `dice/service-stateful=true`: For stateful service tag scheduling, to deploy addon services.
- `dice/workspace-xxx=true`: For scheduling to specified environment, including workspace-dev, workspace-test, workspace-staging and workspace-prod, corresponding to the four deployment environments on Erda.
- `dice/location-cluster-service=true`: For service component scheduling such as registration center.
- `dice/location-xxx=true`: Custom tag, to run specified application on specified node.
- `dice/location=true`: Exclusive tag, nodes with this tag can only run applications corresponding to location-xxx.
- `dice/platform=true`: To run Erda platform components.

