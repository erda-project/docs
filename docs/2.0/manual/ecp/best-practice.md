# 最佳实践

## 运维实践
Erda 边缘计算平台旨在解决分布在众多地理位置的同类应用问题，将应用能力延伸到距离用户最近的地方，以获取更好的用户体验。为提高边缘站点资源的稳定性，建议如下：
* 所有边缘站点尽可能采购同一厂商、同一型号的服务器。
* 无需采购虚拟化平台，直接基于物理机部署，降低 IT 成本。
* 单台主机规格最小为 4 核，8 GB。
* 边缘应用最少需部署双实例，由客户端做负载均衡。
* 使用 Erda 的流水线生成制品镜像，基于镜像部署边缘应用。
## 云边协同
边缘应用通常作为一个大型云端应用的延伸来服务终端用户，而最终的云端应用理论上应该具备所有边缘应用的数据，边缘应用基于此来缓存数据，提供更好的用户体验。

事实上，边缘 IT 资产的运维通常不如云端资产严谨，存在数据丢失的高风险，因此建议在边缘应用上落实数据的容错处理，定期汇报数据到云端。当边缘数据丢失时，可以从中心拉取最新的数据以保证边缘应用的可用性。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/23/995a93a6-6f50-42b4-8944-a37c7f243e4d.png)

## 使用 Erda 制作边缘应用镜像

Erda 边缘计算平台默认使用镜像来发布应用，镜像可以是任意被边缘节点访问到的镜像仓库。推荐使用 [Docker Hub](https://www.docker.com/products/docker-hub)，利用 Erda 的流水线功能将代码打包成镜像并且推送到 Docker Hub 中。

首先创建一个应用，编辑具备代码拉取、构建的 pipeline.yaml，再增加一个容器镜像推送的 Action 将打包好的镜像推送到 Docker Hub 中，具体操作步骤如下：

1. 增加一个容器推送的节点。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/23/2e141878-d1bd-46f7-bdd3-7546de3591c8.png)

2. 切换至代码编辑模式，增加如下参数：

   ![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/18/25f97b75-4b8d-4283-bbfd-6d079fe99edb.png)

   ```
   - docker-push:
       alias: docker-push
       version: "1.0"
       params:
         image: yourrepo/erdaxxx:v1.0                        // 要 push 到外部镜像名称, require
         from: imageResult.img                               // 应用下面的文件
         service: test-server                                // 服务名称，要与镜像文件里的module_name一致
         username: admin                                     // 外部镜像仓库用户名
         password: xxxx                                      // 外部镜像仓库用密码
   ```

3. 运行流水线，成功后即可使用 Docker Hub 中的镜像来发布边缘应用。
