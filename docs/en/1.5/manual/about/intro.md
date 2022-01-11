
# About Erda

## What Erda Is

Erda is a new generation of digital cloud native PaaS platform, mainly consisted of three modules, application (microservice) R&D and governance platform, fast data governance platform and hybrid cloud management platform.

* The application (microservice) R&D and governance platform supports project management, API management, CI/CD, automated testing, application management, monitoring, log analysis, APM, and microservice observation, to achieve one-stop full-progress management from requirement analysis to online delivery.

* The fast data governance platform adopts stream-batch computing architecture and supports data governance such as data source management, data map, data model development, data asset and data lineage based on real-time data computing, which can be applied to the construction of data middle office, real-time data warehouse and other scenarios.

* Based on container cloud service of Kubernetes (K8s) architecture, the hybrid cloud management platform supports visual management of K8s, resource management and orchestration of common public clouds, and intelligent monitoring alarms, to deploy applications to different cloud platforms for hybrid cloud architecture.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/11/24/ede2eab3-bb14-4ed4-9787-5f18ce6d8c63.png)

## What Erda Is Not

Erda is an application development and management platform based on K8s, not a K8s release version, nor a K8s management platform.

## Why Three Platforms

The three core scenarios of enterprise digital construction are "cloud", "business" and "data".

Erda solves the problems of digital cloud platform and architecture by platform technology for better cloud management and usage, while business and data development are the key on cloud (for both public and private cloud). As the digital infrastructure for enterprises, Erda is supposed to achieve the goal that business generates data and data drives business.

## Relationship among Three Platforms

From the perspective of usage, each platform can be used independently. As for deployment, the current version does not support complete independent deployment yet (coming soon).

## Deployment and Operation Environment

The underlying operating environment of Erda strongly relies on K8s (or some platforms derived from K8s, such as OpenShift and Rancher), so that Erda can be deployed on any public or private clouds without dependence on cloud vendors.
