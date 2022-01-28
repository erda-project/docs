# Application Management

## Application Settings

### Member Management

Go to **My Application > Settings > General Settings > App Member** to manage members.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/1098a816-9f4c-4ec3-a6a1-9a08cbd7be7e.png)

The application roles are as follows:
* Application owner
* Application leader
* Development engineer
* Test engineer
* O&M engineer
* Guest

You can go to **My Application > Settings > General Settings > App Member > Role Permission Description** to view application roles and corresponding permissions.

### Notification Management

:::tip Tips
Before setting notification, please create a notification group first.
:::

Go to **My Application > Settings > Notification Management > Notification Group** to create a new notification group.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/6ddb1397-f6c6-4951-ab14-0aa9a69d076c.png)

Go to **My Application > Settings > Notification Management > Notification** to create a new notification.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/7508fe2a-b7ef-48cc-a041-3fc0ab529e97.png)

The platform supports notifications for the following issues:
* Git push
* Pipeline running
* Pipeline success
* Pipeline failed
* Create merge request
* Merge request
* Close merge request
* Add comments
* Delete branch
* Delete tag

## Domain Management

### View Domain Name Resources

Go to **Cloud Management > Application Resource > Domain** to view domain name resources.

### Realize Domain Routing Based on Microservice Gateway (Recommended)

You can realize the microservice function by specifying endpoints for the service via erda.yml, to forward different paths of a domain name to different services in the same project and environment.

An examples is as follows:

```yaml
version: "2.0"
services:
  user-center:
    ports:
    - port: 8080
    endpoints:
    # Can be written as .* suffix, which will be automatically completed based on the cluster domain
    - domain: hello.*
      path: /api/user
      backend_path: /api
      policies:
      # Cross-domain access is allowed
        cors:
          allow_origins: any
      # Limit access QPS to 100
        rate_limit:
          qps: 100
    # Can write full domain name
    - domain: uc.app.terminus.io
      # If the backend path is the same, you can omit the backendPath
      path: /
  acl-center:
    ports:
    - port: 8080
    endpoints:
    - domain: hello.*
      path: /api/acl
      backend_path: /api
```

Endpoints are composed of the following attributes:

* **domain** (required):

   Domain name. Fill in the complete domain name or only the last-level domain name (the platform will automatically complete the domain name based on the cluster).

* **path** (optional):

   Domain name path. All requests matching the current path based on the URL prefix under the domain name will be forwarded to the service. It is `/` by default if not filled in. The URL prefix will be matched according to the length of the path. The more accurate the path is, the higher priority it takes.

* **backend_path** (optional):

   The path forwarded to the service. Remove part of the URL matched by the `path` and add the remaining part to the `backend_path`, then forward to the service. It is same with the `path` by default if not filled in.

* **policies** (optional):

   Cross-domain policy and traffic limiting policy are supported.

   * Cross-domain policy: For more information, see [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).Take allowing cross-domain response header `Access-Control-Allow-Origin` as an example. Set the value of `allow_origins` as the value of the response header. When the value is `any`, then obtain the `Orgin` field of the request header as the value. It is also applicable to `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers`.

      ```yaml
            policies:
              cors:
                # Required, when it is any, allows cross-domain access of any domain name
                allow_origins: any
                # Optional, the default is any, allowing HTTP method to be any type
                allow_methods: any
                # Optional, the default is any, allowing HTTP header to be any field
                allow_headers: any
                # Optional, the default is true, allowing cookie fields to be transmitted across domains
                allow_credentials: true
                # Optional, the default is 86400, which is the valid time after a successful cross-domain preflight request
                max_age: 86400
      ```

   * Traffic limiting and downgrading policy: If you set `deny_status` as `302`, `deny_content` can provide redirection as an HTTP address and be configured as a downgraded interface (such as a CDN page) to reveal the current service overload information.

      ```yaml
            policies:
              rate_limit:
                # Required, the maximum request rate per second
                qps: 100
                # Optional, the maximum delay processing time, and the default is 500 milliseconds. It will not be rejected immediately when the rate is exceeded, and will be processed for load shifting.
                max_delay: 500
                # Optional, the default is 429. If the rate is still exceeded after delay processing, it will be rejected and the corresponding status code will be returned.
                deny_status: 429
                # Optional, the default is server is busy as the response returned when rejected
                deny_content: "server is busy"
      ```

### Bind Domain Name for a Single Service

Set `expose` for the specified port to enable port exposure, to realize domain name configuration and provide services to the outside world (users can access the domain name through the public network).

:::tip Tips
In this mode, the domain name is bound to a single service and cannot forward different paths to different services. The advantage is that the port supports HTTP, HTTPS, gRPCs, gRPCs, FastCGI, and the protocol can be specified by `protocol` of the `port`.
:::

Adjust the erda.yml configuration to expose the service port.


```yaml{12-13}
services:
  # serviceA is the name of the custom service A, not a configuration item in dice.yml.
  serviceA:
    resources:
      cpu: 0.1
      max_cpu: 0.5
      mem: 256
    deployments:
      replicas: 1
    ports:
      - port: 8080
        expose: true
        # For non-http scenarios, you need to specify https/grpc/grpcs/fastcgi
        protocol: grpc
  # serviceB is the name of the custom service B, not a configuration item in dice.yml.
  serviceB:
    ...
```

After completing the above operations, execute source code deployment to make the configuration effective. After successful deployment, go to **My Application > Deployments** to configure the domain name.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/11f262b7-3eea-4935-b0d9-2eb530ba5425.png)

You can use the domain name provided by the cluster, or configure a custom domain name.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/73ba24c5-bdb5-4894-866c-0139567fee3f.png)


## Scaling

Configure the erda.yml to make service scaling.

Modify `services.serviceA.deployments.replicas` to adjust the number of instances of the service, and then execute source code deployment to make the configuration effective.

```yaml{9}
services:
  # serviceA is the name of the custom service A, not a configuration item in dice.yml.
  serviceA:
    resources:
      cpu: 0.1
      max_cpu: 0.5
      mem: 256
    deployments:
      replicas: 2
      labels:
        GROUP: erda
    ports:
      - port: 9093
        expose: false
    envs:
      ADDON_PLATFORM_ADDR: addon

  # serviceB is the name of the custom service B, not a configuration item in dice.yml.
  serviceB:
    ...
```

If the scaling is just for temporary (that is, no source code deployment is involved), go to **My Application > Deployments** to adjust.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/19/4ab42ffb-9b93-43f4-beb2-aa5b2a0f88a3.png)

You will be prompted to restart the runtime after adjustment.

## Restart

Restarting only re-pulls the [configuration](config.md) and will not change the logic of the running program. If the code changes, see [Deploy Based on Git Source Code](../../examples/deploy/deploy-from-git.md).

## Rollback

Go to **My Application > Deployments**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/f77c9fc2-fc0d-449c-aa2c-c2691a2972b4.png)

If the rollback fails, the reason will be prompted:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/7e3bf1fd-2ecd-49a9-bd76-9a1d1eeaca3c.png)

### Rollback Record

The default strategy for rollback records is as follows:
* The production environment (PROD) keeps the last 10 success records for rollback.
* Other environments only keep the current record (that is, rollback is not available).

The rollback strategy can be customized in **Org Center > Projects > Advanced Settings > Rollback Setting**.

### Rollback Process

A rollback is a deployment too that is no different from a normal building deployment, except that a rollback is used to deploy an earlier version of the software.

::: warning Warning
If the rollback version differs too much from the current version (for example, the addon changes a lot), the addon configuration will be lost.
:::

## Health Check
The platform will perform health check for the entire life cycle of the service, that is, run a specified command and judge the health of the service by checking whether the exit code of the command execution is 0, such as calling the health API of the service.

If the service restarts multiple times, you can view the error messages on the details page of the runtime.

If the service does not pass the health check, the container status turns to error and the exit-code will be 137, 143, etc.

Go to **Files > erda.yml > health_check** to configure the health check.

