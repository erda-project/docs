# Best Practices

## Operation and Maintenance
The edge computing platform of Erda is designed to solve the problem of similar applications distributed in different locations, to extend application capabilities closer to the user for a better user experience. To improve the stability of the edge site resources, here are some suggestions:
* Purchase servers of the same manufacturer and model for all edge sites as far as possible.
* Deploy directly on physical machines without purchasing a virtualization platform to reduce IT costs.
* The minimum specification for a single host is 4 cores and 8 GB.
* At least two instances required for edge applications, with the client doing load balancing.
* Use Erda's pipeline to generate artifact images and deploy edge applications based on the images.
## Cloud-Edge Collaboration
Edge applications are usually used as an extension of a large cloud application to serve end users, and the final cloud application should theoretically have all the data of the edge application based on which the edge application caches data to provide a better user experience.

In fact, the operation and maintenance of edge IT assets is generally less rigorous than that of cloud assets, and there is a high risk of data loss, so it is recommended to implement fault-tolerant processing of data on edge applications and regularly report data to the cloud. When the edge data is lost, the latest data can be pulled from the center to ensure the availability of edge applications.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/28/cc4faac0-5a78-4d6c-95d4-9e40e253d456.png)

## Create an Edge Application Image with Erda

The edge computing platform of Erda uses image to release applications by default, which can be any image repository accessed by the edge nodes. It is recommended to use [Docker Hub](https://www.docker.com/products/docker-hub) to package code into images and push them to Docker Hub via Erda pipeline.

First create an application, edit pipeline.yaml for code pulling and building, then add an action of container image push to push the packaged image to Docker Hub, as follows:

1. Add a node for container push.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/33709c31-305d-4a8e-81b8-5be0772ae9dd.png)

2. Switch to code editing mode and add the following parameters:

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/28/f5ce711a-744d-4e45-9c13-45b11442268a.png)

   ```
   - docker-push:
       alias: docker-push
       version: "1.0"
       params:
         image: yourrepo/erdaxxx:v1.0                        // The name of the image to be pushed, required
         from: imageResult.img                               // The file under the application
         service: test-server                                // Service name, consistent with the module_name in the image file
         username: admin                                     // The extarnal image repository username
         password: xxxx                                      // The extarnal image repository password
   ```

3. Run the pipeline and upon success, you can use the images in Docker Hub to release edge applications.

