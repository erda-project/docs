# Configuration

In software design, configuration is usually separated from code, and variable content and different environmental parameters are extracted into application configuration for management, which is usually in the form of files, startup parameters or environment variables.

Erda offers two kinds of configuration:

* Application building (packaging) configuration
* Application runtime configuration

The application building configuration is provided during the application compilation, building and packaging stages and the configuration items will be solidified in the software package. If the configuration changes, the application needs to be repackaged. The application runtime configuration is provided during the startup phase of application deployment and is used for most application configurations, such as MySQL connection addresses and business function switch configuration.

This article will introduce the application runtime configuration as an example.

## Configuration Method

The runtime can be configured in two ways:

* Configure via envs keywords in erda.yml.
* Configure via the interface of the application setting console.

:::tip Tips

The configuration items written in the above two ways are eventually provided to the application through environment variables (not files or startup parameters), so the application needs to read the configuration items from the environment variables in an appropriate way. Different programming languages have slightly different ways to read.

:::

## erda.yml envs Keywords

### Configure via Global envs

```yaml
envs:
  TEST_ENV: test
  TEST_ENV2: test2
```

### Configure via Service-Level envs

```yaml
services:
  web:
    envs:
      TEST_ENV: test
      TEST_ENV2: test2
```

:::tip Tips

The web keyword in the services here is only an example, and web is the service name.

:::

## Application Settings

Go to **My Application > Settings > Deployments > Parameter Setting**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/376d0ffa-f21f-45d3-af21-34e0eb020342.png)

For the configuration of the value type, it will exist in the container as an environment variable, which can be viewed with the env command.

For the configuration of the file type, the file is located in the /init-data directory of the container, the file name is the configured key value, and the file content is the uploaded file, which can be viewed in the container console.

## Priority

The priority of application services is arranged in the following order from high to low:

1. Platform environment variables, such as `SELF_HOST`, `<discovered service name in capital letters>_HOST`, `<discovered service name in capital letters>_PORT`, and `ERDA_*`
2. Service-level envs in erda.yml
3. Addon environment variables, such as `MYSQL_HOST` and `REDIS_PORT`
4. Environment-level configuration in application settings
5. Global envs in erda.yml

## Blue-Green Deployment Configuration

The blue-green deployment configuration is enabled by default only for the production environment. For other environments, please contact the technical support team.
