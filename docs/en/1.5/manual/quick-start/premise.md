# Concepts

## Basic

Erda is designed as three levels, which are organization, project and application, to achieve isolation of organization tenant and management of project, application, resource and user. For project and application, it distinguishes access and operation permissions of different members to project and application according to their roles.

### Organization
Erda manages projects, members and resources via organization. At present, all resource objects and functions are associated and defined on the organization ID for tenant isolation. It is recommended to set one tenant as an organization. Assuming that a R&D team wants to realize management of R&D and O&M via Erda, then the process is as follows:

1. The team leader creates an organization and invites other members to join in.
2. The team leader creates a project in the organization and assigns a project leader.
3. The project leader add members to the project and set their roles for team collaboration.
4. The project leader creates an application and adds members to the application for further development.

### Project
Project is the main object of R&D and O&M, which is a collection of multiple applications. It can be a product or a large-scale solution, mainly for collaborative management including requirements, tasks, bugs, iterations, test cases, etc.

### Application
Application is the smallest unit of R&D and O&M, which provides DevOps tools such as code repository and pipeline. All development and deployment in Erda are achieved based on applications.

### Cluster
Cluster is a set of physical machines or virtual machines, composed of Kubernetes and Docker, mainly for resource management and service deployment and operation.

The network of all nodes (hosts) in a cluster is interconnected but that among clusters is isolated. Each cluster is composed of three types of nodes (hosts), namely master node, LB node and worker node.

* The master node works for high availability, usually with 3 node.
* The LB node is the endpoint of cluster, generally with 2 nodes (make sure that users can access the IP address of LB external network).
* The worker node is for application service deployment and the number of nodes can be set as needed.

In addition to Kubernetes and Docker, you need to install agent program provided by Erda in cluster for monitoring data collection.

Cluster is an organizational resource and needs to be added to the organization for use. The number of clusters is unrestricted. For example, create two clusters as one for development and testing and the other for production and deployment.

## Advanced

### Environment

Environment is a logical concept of applications. Each application has four environment, including DEV (development), TEST (testing), STAGING (staging) and PROD (production). The four environments can share one cluster, or own a cluster separately. It is recommended to assign a cluster for each environment (at least one for PROD) if you have sufficient resources.

:::tip Tips

Not all types of applications have environments. Applications that do not need to be deployed or run (such as library applications) have no environment.

:::

### Service and Runtime

Service is a single process, such as a Java process or a PHP process. An application may have only one single service, or multiple services.

::: tip Tips
The service here is unrelated to the Kubernetes service.
:::

Runtime is the collection of all services after application deployment, which is also known as the running entity of application.

### Container

It is a Linux Container and also a Docker container. One service process generally runs in one container (the container is an instance of the service). Typically the service will run multiple instances to achieve high availability.

## Roles and Permissions

### For Platform

| Role | Menu | Permission |
| ------------ | ------------------------ | ---------------------- |
| Admin | All menus of background management | All permissions |
| Auditor | Audit log | View permissions |
| Member | None | No access permission to the background |

### For Organization

| Role | Menu | Permission |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Admin | DevOps Platform <br/>Microservice Platform<br/>Fast Data Platform <br/>Cloud Management Platform<br/>Edge Computing Platform<br/>Org Center | Full permissions to organization |
| Developer | DevOps Platform<br/>Microservice Platform | Access to DevOps platform and microservice platform, with its permissions depending on the roles in projects or applications |
| Data Engineer | DevOps Platform<br/>Fast Data Platform | Access to DevOps platform and fast data platform, with its permissions depending on the roles in projects or applications |
| O&M Engineer | Cloud Management Platform | Full permissions to cloud management platform |
| Edge O&M Engineer | Edge Computing Platform | Full permissions to edge computing platform |
| Data Manager | DevOps Platform<br/>Microservice Platform<br/>Fast Data Platform | Access to DevOps platform, microservice platform and fast data platform, with its permissions depending on the roles in projects or applications |
| Reporter | DevOps Platform | Access to the DevOps platform, which is only a reporter in the project |

For more information, please go to **Org Center > Settings > Org Members > Roles and Permissions**.

### For Project

| Role | Menu | Permission |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Owner | All menus | Full permissions to project |
| Leader | Applications, issues, test, dashboard, addon, resource, tickets and settings | All permissions |
| Project Manager | Applications, issues, test, dashboard, addon, resource, tickets and settings | No permissions to application creation, deletion or modification  |
| Product Manager | Applications, issues, test, dashboard, addon, resource and tickets | No permissions to application creation, deletion or modification<br>No permissions to project member management |
| Developer | Applications, issues, test, dashboard, addon, resource and tickets | No permissions to application management or member management<br>No editing permissions to branches in testing, staging or production environment<br>No deployment permissions in testing, staging or production environment |
| QA | Applications, issues, test, dashboard, addon, resource and tickets | No permissions to application management or member management |
| Reporter | Ticket | Permissions to submit and view tickets |

For more information, please go to **DevOps Platform > Joined Projects > Settings > Project Members > Roles and Permissions**.

### For Application

| Role | Menu | Permission |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Owner | All menus | Full permissions to application |
| Leader | Code repository, pipeline, API design, deployments, code quality, artifact management and settings | All permissions |
| O&M Engineer | Code repository, pipeline, API design, deployments, code quality and artifact management | Same permissions with that of developers<br/>No permissions to application setting<br>No management permissions in testing, staging or production environment |
| Developer | Code repository, pipeline, API design, deployments, code quality and artifact management | No permissions to application setting<br/>No management permissions in testing, staging or production environment |
| QA | Code repository, pipeline, API design, deployments, code quality and artifact management | No permissions to application setting<br/>No management permissions in development environment |

For more information, please go to **DevOps Platform> Joined Apps > Settings > App Members > Roles and Permissions**.
