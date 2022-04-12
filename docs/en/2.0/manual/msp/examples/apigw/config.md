# Use dice.yml to Manage Configuration

You can realize the microservice function by specifying endpoints for the service via dice.yml, to forward different paths of a domain name to different services in the same project and environment.

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

   * Cross-domain policy: For more information, see [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Take allowing cross-domain response header `Access-Control-Allow-Origin` as an example. Set the value of `allow_origins` as the value of the response header. When the value is `any`, then obtain the `Orgin` field of the request header as the value. It is also applicable to `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers`.

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

