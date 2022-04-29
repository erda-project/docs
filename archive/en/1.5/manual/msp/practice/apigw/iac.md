# Avoid Repeated Configuration in Multiple Environments Based on IaC

Although the gateway management provides an interactive UI to configure various routing and strategies, similar routing strategy configuration in multi-environment scenarios will generate a lot of tedious and repetitive operations and is prone to omissions. For example, an API is configured in the development environment, but not in the production environment.

Based on the IaC (Infrastructure as Code) concept, the routing strategy configuration of the gateway is also part of the infrastructure and can be managed based on GitOps. The platform supports gateway routing configuration from a service perspective based on dice.yml. The following will explain in details with a case.

## Case Structure

The overall structure of this case: Project > Application (Code Repository) > Service

- Create a new project X on the DevOps platform
- There are three application repositories under project X:
   1. User center application: User
   2. Permission center application: ACL
   3. Resource center application: Resource
- There are two service modules under the user application:
   1. Business API module: user-api
   2. Management API module: user-admin
- There are two service modules under the ACL application:
   1. Business API module: acl-api
   2. Management API module: acl-admin
- There are two service modules under the resource application:
   1. Business API module: resource-api
   2. Management API module: resource-admin


## Routing Requirements

- Build two web sites:
   1. Business site
   2. Backend management site
- For the three applications of user, ACL and resource
   1. Converge business API to the domain name of the business resource site
   2. Converge management API to the domain name of the backend management site
- Build four environments for each site, with a common cluster for the development, testing and staging environments, and a separate cluster for the production environment
   1. Development environment: The cluster domain name is **.noprod.com*
   2. Testing environment: The cluster domain name is **.noprod.com*
   3. Staging environment: The cluster domain name is **.noprod.com*
   4. Production environment: The cluster domain name is **.prod.com*
- Eight domains in total
   1. Four environments of the business site
   - Development: *dev-biz.noprod.com*
   - Testing: *test-biz.noprod.com*
   - Staging: *staging-biz.noprod.com*
   - Production: *biz.prod.com*
   2. Four environments of the backend management site
   - Development: *dev-admin.noprod.com*
   - Testing: *test-admin.noprod.com*
   - Staging: *staging-admin.noprod.com*
   - Production: *admin.prod.com*

## API Strategy Requirements

Limit the access times per second of the resource API of the business site in the production environment to 100.

Examples of dice.yml for application repositories of user, ACL and resource are as follows (omitting configuration items such as service health check, memory and CPU resource limit).

## User

```yaml
version: "2.0"
values:
  development:
    biz-domain: dev-biz.*
    admin-domain: dev-admin.*
  test:
    biz-domain: test-biz.*
    admin-domain: test-admin.*
  staging:
    biz-domain: staging-biz.*
    admin-domain: staging-admin.*
  production:
    biz-domain: biz.*
    admin-domain: admin.*
services:
  user-api:
    ports:
    - port: 8080
    endpoints:
    - domain: ${biz-domain}
      path: /api/user
      backend_path: /api
  user-admin:
    ports:
    - port: 8080
    endpoints:
    - domain: ${admin-domain}
      path: /api/user
      backend_path: /api
```

For mechanism configured by variable `values`, different domain names can be configured for different environments.

As you can see above, although the production environment has a different cluster domain name than the other three environments, the variable can be configured as `.*`. When the gateway generates the domain name, it can automatically replace `.*` with the domain name of the corresponding cluster.

:::tip Tips

The `path` and `backend_path` in the routing and forwarding configuration mean that when the gateway receives a request starting with prefix `path`, it removes the prefix, splices the remaining part after the `backend_path` and forwards it to the corresponding service. When the `backend_path` and `path` are the same, the `backend_path` can be omitted.

Take the above as an example. The `path` is `/api/user` and the `backend_path` is `/api`. When the gateway receives the request path as`/api/user/users/123`, the request forwarded to the backend service is actually `/api/users/123`.

:::

## ACL

```yaml
version: "2.0"
values:
  development:
    biz-domain: dev-biz.*
    admin-domain: dev-admin.*
  test:
    biz-domain: test-biz.*
    admin-domain: test-admin.*
  staging:
    biz-domain: staging-biz.*
    admin-domain: staging-admin.*
  production:
    biz-domain: biz.*
    admin-domain: admin.*
services:
  acl-api:
    ports:
    - port: 8080
    endpoints:
    - domain: ${biz-domain}
      path: /api/acl
      backend_path: /api
  acl-admin:
    ports:
    - port: 8080
    endpoints:
    - domain: ${admin-domain}
      path: /api/acl
      backend_path: /api
```

The configuration of ACL is similar to that of user. At the same time, it can be found that the endpoint domain name of ACL and user are the same, except for the API prefix, thus to realize the unification of domain names across applications and services.

## Resource

```yaml
version: "2.0"
values:
  development:
    biz-domain: dev-biz.*
    admin-domain: dev-admin.*
  test:
    biz-domain: test-biz.*
    admin-domain: test-admin.*
  staging:
    biz-domain: staging-biz.*
    admin-domain: staging-admin.*
  production:
    biz-domain: biz.*
    admin-domain: admin.*
    qps_limit: 100
services:
  resource-api:
    ports:
    - port: 8080
    endpoints:
    - domain: ${biz-domain}
      path: /api/resource
      backend_path: /api
      policies:
        rate_limit:
          qps: ${qps_limit:0}
  resource-admin:
    ports:
    - port: 8080
    endpoints:
    - domain: ${admin-domain}
      path: /api/resource
      backend_path: /api
```

For traffic limiting of the resource acquisition interface in the production environment, it is configured based on the `rate_limit` strategy. `${qps_limit:0}` means that if the variable is not configured in the corresponding environment, the default value is `0`, that is, no traffic limiting. Since `qps_limit: 100` is configured only in the production environment, there is a traffic limiting of 100 QPS in the production environment only.
