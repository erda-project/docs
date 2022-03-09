# API Driven Development
## API First Principle
The API first principle gives priority to API design and completion. Its advantages are as follows:

### Business Logic First
Before API design, business logic must be clearly figured out, with functional boundaries and data interaction formats clarified.

The microservice architecture requires functional cohesion and single responsibility of service unit, which can be clearly defined in API design. A highly abstract API is conducive to depicting the functional framework, thereby avoiding prematurely falling into a complicated design.

Compared with functional design documents, standardized API documents are clearer and easier to maintain. The structured data format defined in API can be directly used for later function implementation and scenario testing.

### Improve Agile Collaboration
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/559b0532-74de-4e26-9490-9cf04fb48113.png)

Front-end, back-end and test engineers participating in the project development can carry out their work respectively based on the API.

* **Front-end engineer**: Use API to complete interface display and interaction.
* **Back-end engineer**: Realize API functions and self-testing.
* **Test engineer**: Use API to complete scenario design for interface testing.

Consistent APIs can decouple dependencies and effectively improve the collaboration of all parties to achieve parallel development.

Microservice development also advocates the API first principle, prioritizing the API design of different modules to clarify functional boundaries and avoid circular dependencies, and then developers will realize the functional logic of their modules respectively.

## API Development and Testing
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/244998a3-a130-4a25-b31a-622a8185cb8c.png)
## API Provider
The workflow of API provider mainly includes: design > release > self-testing > bugfix.

### API Design
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/8b8d1888-e53f-40f2-a9e4-8264cc294975.png)

Based on OpenAPI Specification v3.0, the platform supports API editing by a visual interface and completes API design according RESTful specifications.

Following the GitOps concept of configuration as code, API documents will be automatically saved to the Git repository and supports quick rollback.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/0f76b150-e3c8-4942-a9e8-f2fc7aea5f02.png)

### API Release and Self-Testing
After API development, you can [Release to Market](../../msp/practice/apigw/apim.html#release-to-market), and then create an access entry in [Access Management](../../msp/practice/apigw/apim.html#access-management) for API testing.

## API Caller
The workflow of API caller mainly includes: check > call > joint debugging > bugfix.

The caller can go to **DevOps Platform > API > API Market** to view the released API documents, and click **Apply to Call** to obtain the ClientID and ClientSecret of the client, and then finish coding.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/d1b608df-76f2-430a-a03b-dcf8773160fa.png)

If an API call error is reported during joint debugging, please note that whether the API definition changes and check it through Git history.

## API Automated Testing
The workflow of API testing mainly includes: check > interface testing scenario design > testing > bug commit.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/59cf60c4-9503-4a0e-9b95-5738f81b7d3e.png)

For scenario design, you can search the API market to get interface definitions.

## Runtime Management
As for the production phase, it is recommended to republish an API document and bind the application instance in the production environment, and then authorize the client for access.

:::tip Tips

The relationship between API documentation and multiple operating environments will be optimized continuously in later iterations.

:::

### API Version Evolution
#### Semantic Versioning
The platform adopts the mechanism of [Semantic Versioning](https://semver.org/) for version management of API documents. The version number is like major.minor.patch.

* Major version means you make important or incompatible API changes.
* Minor version indicates you add functionality in a backwards compatible manner.
* Patch version shows you make backwards compatible bug fixes.

The advantage of versioning management is that the growth of API documents is treated the same as that of applications, and application functions can be examined from the perspective of API. The version number explains the compatibility and dependency between service changes. The provider or the caller can clearly understand the service changes based on the semantics of the version number.

#### Code Compatibility
When the version of minor and patch in major.minor.patch upgrades, all APIs must remain compatible backwards.

If the major version upgrades, ensure that the incompatible API caller has completed the adaptation. It is recommended to add APIs for new functions, keep the old APIs and notify the caller to switch to the new interface until all callers have finished the switch, and then go offline.

### API Security
* Open API

   Open to the public network by the API gateway, and set **Authentication + Authorization** for caller on the gateway.

   <img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/2b632db4-339b-4310-94a2-27d85cd6df35.png" style="zoom:50%;" />

   It is recommended to use signatures of ClientID and ClientSecret, and set a limit on the number of requests per second to ensure security and stability.

   :::tip Tips

   You can also go to **DevOps Platform > API > Access Management** for caller management.

   :::

* Domain control

   Avoid configuring the domain name directly open to the public network for back-end services. The test API can use internal addresses instead of public domain names.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/21/e9335d6f-6800-4645-bd08-ba68d3c88b98.png)