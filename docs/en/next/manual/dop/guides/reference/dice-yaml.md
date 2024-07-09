# dice.yml

The dice.yml file, written in YAML syntax, is a description file for microservice application deployment, consisting of basic service information and service orchestration relationships, including information such as the microservice's Docker image, resource requirements (CPU, Memory, etc.), dependencies, environment variables, and addon.

A complex microservice application can be deployed and orchestrated by Erda in one click by simply writing an dice.yml description file.

## Global Structure

```yaml
version: "2.0"

values:
  development: {}
  test: {}
  staging: {}
  production: {}

envs: {}

services: {}

addons: {}

environments:
  development:
    envs: {}
    services: {}
    addons: {}
  test:
    envs: {}
    services: {}
    addons: {}
  staging:
    envs: {}
    services: {}
    addons: {}
  production:
    envs: {}
    services: {}
    addons: {}
```

The global structure of the dice.yml file defines 6 items of the global configuration, as described below.

### version

The value of version is currently defined as 2.0 and can be configured as `version: "2.0"`.

### values

values are used to set variables in different environments so that the configuration of each environment can be set in an dice.yml file in the following format:

```yaml
values:
  workspace:
    key: value
```

Reference the variable of values via `${key: default_value}`.

See the example below:

```yaml
values:
  development:
    cpu: 0.5
  test:
    cpu: 0.5
  staging: {}
  production:
    cpu: 2

services:
  serviceA:
    resources:
      cpu: ${cpu:1}
```

In the above example, the CPU required by the service in different environments is configured via `cpu`.

The value ${cpu:1} of services.serviceA.resources.cpu references this variable, and the CPU value is 0.5 for development environment and testing environment, 1 for staging environment, and 2 for production environment.

### envs

envs defines environment variables, which are divided into global definitions and service definitions. The global structure shown here is a global definition. The environment variables defined globally through envs will be applied to all services.

If the global environment variable and the service environment variable are duplicated, the latter shall prevail, that is, the service environment variable can override the global environment variable.

See the example below:

```yaml
envs:
  Debug: true
  Host: erda.terminus.io
  Key: value
```


### services

services defines a set of specific services, that is, all services to be orchestrated and deployed in the application, including microservice names, resources, deployments, ports, and envs.

See the example below:

```yaml
services:
  # serviceA is the name of the custom service A, not a configuration item in dice.yml.
  serviceA:
    resources:
      cpu: 0.1
      mem: 256
    deployments:
      replicas: 2
      labels:
        GROUP: erda
    ports:
      - port: 9093
    envs:
      ADDON_PLATFORM_ADDR: addon

  # serviceB is the name of the custom service B, not a configuration item in dice.yml.
  serviceB:
    ...
```


### addons

addons refer to the basic services that can be used by all microservice dependencies in the application, also known as addon services for microservices. addons include but are not limited to basic software services such as MySQL, Kafka, Elasticsearch, and Redis. Microservices developed by users can also be saved as addons and released to the addon market according to defined rules.

See the example below:

```yaml
addons:
  # MySQL is the custom addon instance name
  mysql:
    plan: mysql:basic
    options:
      version: 5.7.23
      # create_dbs is the name of one or more logical libraries that need to be created on the MySQL instance
      create_dbs: blog,user
  # zk is also a custom addon instance name
  zk:
    plan: zookeeper:basic
```

## Configuration Items

dice.yml has a set of built-in configuration items used to define the entire microservice application. These configuration items are the basis for writing dice.yml, which are global configuration items, service configuration items, and addon configuration items.

### Global Configuration Items

- version
- values
- envs
- services
- addons

For details, see [Global Structure](#Global-Structure).

### values

The values configuration items are workspace names of development, testing, staging, and production, which represent development environment, testing environment, staging environment, and production environment respectively.

### service

The service configuration items refer to the content configuration of microservice deployment.

#### image
Configure the Docker image name of the service, which is empty by default. This field is optional. If it is not filled in when deploying via CI, the image will be obtained directly through the service name.

See the example below:

```yaml
image: nginx:latest
```

#### cmd
Configure the start command of the service, which is empty by default. If it is not configured, the process defined in the docker image will be started.

See the example below:

```yaml
cmd: echo hello && npm run start
```

#### ports
Configure the port that the service listens to. Multiple ports can be set. Set expose as true for ports that need to be exposed to external users. If expose is not specified, the first port is taken by default if external use is required.

See the example below:

```yaml
ports:
  - port: 1234
    expose: false
  - port: 4321
    expose: true
```

#### envs
Configure the environment variables of the service. If it is duplicated with the environment variables defined by global envs, the latter will be overwritten, and the service configuration will be used in preference.

See the example below:

```yaml
envs:
  Debug: false
  Key: value
```

#### hosts
Configure the `/etc/hosts` binding of the service.

See the example below:

```yaml
hosts:
  - 127.0.0.1 www.erda.local
  - 127.0.0.1 erda.local
```

#### resources
Configure the resources required by the service, including CPU, memory, and disk. Resources contains the following sub-configuration items:

* **cpu**: Configure the number of CPU cores, which can be configured as a decimal if less than one core, required and without a default value.

* **mem**: Configure the memory size in MB which is a required field.

* **disk**: Configure the disk size in MB.

* **network**: Configure the container network, optional. The `mode` can be configured as `overlay` or `host`, and the default is `overlay`.

See the example below:

```yaml
resources:
  cpu: 1
  mem: 256
  disk: 1024
  network:
    mode: overlay
```

#### capabilities
Configure linux capabilities of the service. Run `man 7 capabilities` to see all available Linux capabilities.

* **cap_add**: Add capability.

* **cap_drop**: Delete capability.

See the example below:

```yaml
cap_add:
  - ALL

cap_drop:
  - NET_ADMIN
  - SYS_ADMIN
```

#### deployments
Configure the deployment policy of the service, currently supporting configuration of the number of instances, labels, etc.

* **mode**: The deployment mode can be set as `global` or `replicated`. `global` means to deploy a container instance for each cluster node, and `replicated` means to deploy a specified number of container instances, used together with the replicas option. It is `replicated` by default.

* **Replicas**: Define the number of instances to be deployed for the service, configured only when the mode is `replicated`, not `global`.

Example 1:

```yaml
deployments:
  mode: replicated
  replicas: 2
```

Example 2:

```yaml
deployments:
  mode: global
```


#### depends_on
Configure the deployment dependencies of the service.

See the example below:

```yaml
# The example indicates that this service depends on both service B and service C
depends_on:
  - serviceB
  - serviceC
```

#### volumes
volumes provides persistent storage for container directories, and multiple configurations can be specified at the same time.

* **storage**: Currently only NFS is supported.
* **path**: Specify the internal mounting path of the container, and an absolute path is required.

See the example below:

```yaml
volumes:
- storage: nfs
  path: /container/data
```

#### health_check
Configure the health check mechanism of the service. There are two interfaces available for the health check, HTTP and command. Only one can be used when configuring health_check, not both.

HTTP health check is to send a GET request to an HTTP interface and tell the health status of the service by checking whether the response status code is 200.

See the example below:

```yaml
health_check:
  http:
    # Port configures the port for health check http get request
    port: 8080
    # Path configures the URL path of the health check http get
    path: /health
    # Duration sets the health check duration in seconds, whose value should be set to a little longer than the time required for the service to start
    duration: 120
```

Command health check is to run a specified command and tell the health status of the service by checking whether the exit code of the command execution is 0.

See the example below:

```yaml
health_check:
  exec:
    # cmd configures the command to run. The curl here is just an example, and you can write any command you want
    cmd: curl http://127.0.0.1:8080/health
    # Duration is the same as HTTP health check
    duration: 120
```

### addon

The addon configuration items describe a specific addon object, including the type, specification, and additional parameters of the addon.

See the example below:

```yaml
addons:
  mysql:                 # MySQL is the custom addon instance name
    plan: mysql:basic    # plan: indicates the specification
    options:             # options: additional parameters, such as version
      version: 5.7.23
      # create_dbs is the name of one or more logical libraries that need to be created on the MySQL instance
      create_dbs: blog,user
```

#### Name

The platform achieves the sharing strategy via name. After customizing the name, the addon can be shared automatically by this name in the same project environment. However, in the development and testing environment, the name will be automatically ignored and directly modified to the name of the addon itself.

#### plan
plan describes the type and specification of addon, in the following format:

plan: {addon type}:{specification}

The specification is determined by the specific addon, and there are usually three categories: basic, professional, and ultimate.

See the example below:

```yaml
# It is a basic MySQL addon
plan: mysql:basic
```

#### options
options defines additional parameters for addon.

See the example below:

```yaml
options:
  version: 5.7.23
  create_dbs: blog,blog2
```

### environments
The environments configuration item can be categorized into four workspace names: development, testing, staging, and production, representing the development, testing, pre-release, and production workspace, respectively.

You can configure [envs](#envs), [services](#service), and [addons](#addon) for different workspace.

See the example below:
```yaml
environments:
  production:
    envs:
      EXAMPLE_ENV: prod
  staging:
    envs:
      EXAMPLE_ENV: staging
  test:
    envs:
      EXAMPLE_ENV: test
    services:
      example_demo:
        image: registry.erda.cloud/erda/go-demo:1719970022481890617
        resources:
          cpu: 0.1
          mem: 256
  development:
    envs:
      EXAMPLE_ENV: dev
    addons:
      redis:
        plan: redis:basic
        options:
          version: 6.2.10
```

## Variable Reference
### Platform-Level Variable
Platform-level variables can be referenced in the field value of `.services[serviceName].endpoints[i].domain` in the dice.yml with the syntax `${platform.Key}`.

Currently the platform-level variable `platform.DICE_PROJECT_NAME` is supported.

See the example below:
```yaml
version: "2.0"
services:
  user-center:
    endpoints:
    - domain: hello-${platform.DICE_PROJECT_NAME}.*
```

### Values Variable
Configure key-value pairs for each environment in the `.values` field of dice.yml, which can be referenced in the values of all fields.

### Envs Variable
The value of an environment variable can reference the value of another environment variable, with the syntax `${env.Key}`.

See the example below:
```yaml
version: "2.0"

envs:
  PROJECT_APP: ${env.DICE_PROJECT_NAME}/${env.DICE_APPLICATION_NAME} // Reference platform-defined environment variables
  DOMAIN: ${env.PROJECT_APP}.my-site.com // Reference environment variables defined elsewhere
```

:::tip Tips

Developers can configure environment variables in service level and global, deployment configuration, addon, and other scenarios in dice.yml, and variables can be referenced to each other (but circular references are not allowed).

Developers can reference custom environment variables or platform-defined environment variables.

:::

## Sample

```yaml
version: "2.0"

# values is optional, but it is useful if you want to configure different values for certain parameters in different environments
values:
  development:
    cpu: 0.5
  test:
    cpu: 0.5
  staging: {}
  production:
    cpu: 2
    mem: 1024

# The global environment is optional
envs:
  DEBUG: true
  TERMINUS_TRACE_ENABLE: false

services:
  # showcase-front is the name of a service, and you need to fill in the correct name here according to your service
  showcase-front:
    image: nginx:latest
    cmd: echo hello && npm run start
    ports:
      - port: 8080
	    expose: true
    # The envs in the service are used to define the private environment variables of the service, which can cover those defined in the global environment variables.
    envs:
      TERMINUS_TRACE_ENABLE: false
      TERMINUS_APP_NAME: showcase-front-app
    hosts:
      - 127.0.0.1 www.terminus.io
    resources:
      cpu: ${cpu:1}   # In development and test environments, cpu=0.5; in staging environments, cpu=1; in production environments, cpu=2
      mem: ${mem:256} # In production environments, mem=1.24; in other environments, mem=256, which is the default value
      disk: 100
	  network:
	    mode: container
    deployments:
      # Replicas cannot be less than 1, which defines the number of container instances to be deployed in the service.
      replicas: 2
    depends_on:
      - blog-servic
    volumes:
    - storage: nfs
      path: /container/data
    health_check:
        http:
          port: 8080
          path: /health
          duration: 120

  # blog-service demonstrates the most concise service configuration, that is, only the most necessary items are configured.
  blog-service:
    image: nginx:latest
    resources:
      cpu: 0.2
      mem: 256
      disk: 100
    deployments:
      replicas: 3

addons:
  mysql:
    plan: mysql:basic
    as: MYSQL
    options:
      version: 5.7.23
      create_dbs: blog,blog2
  zk:
    plan: zookeeper:professional
```
