# erda.yml

The platform describes the overall environment in which the microservice runs by declaration of developers, and transforms the declaration into the process of environment building.

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/25d12ec9-1904-4ff0-9df2-5d2c2164f701.png)

The declaration of the YAML file can be divided into the following two parts:

* Microservice declaration, including the number of microservices, as well as the resources required by each microservice, the number of replicas, ports, environment variables, and even the domain name of the external gateway and the forwarding settings of the gateway.
* Extended service settings, namely addon. Developers only need to declare the addon involved in the application, such as MySQL, and specify its specification and version, then the platform will automatically create MySQL for the application and pass the configuration to the microservice by environment variables. Meanwhile, the addon is scalable, so you can integrate almost all addons into the platform.

You may question that K8s YAML is also declarative, but why not use K8s YAML? Because of separation of concerns. K8s itself is not a developer-oriented platform, but platform-oriented. There are too many infrastructure details in K8s YAML that developers do not care.

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/23/9e186d95-90fb-4562-abda-911f5e786d7d.png)

By erda.yml, develops can run the deployment process verified on the central platform in the environment of customer without modification.
