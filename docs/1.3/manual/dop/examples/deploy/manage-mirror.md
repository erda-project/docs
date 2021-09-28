# 如何管理镜像

## 通过 Dockerfile 构建镜像

```yaml
- stage:
   - dockerfile:
       params:
         workdir: ${git-checkout}
         path: Dockerfile
         build_args:   
          JAVA_OPTS: -Xms700m
          NODE_OPTIONS: --max_old_space_size=3040
```

Dockerfile Action 用于自定义 Dockerfile 进行打包，产出应用镜像用于部署。产出镜像将推送至平台的镜像仓库中。

具体参数说明如下：

* **workdir**：声明命令在具体目录下执行。
* **path dockerfile**：相对应用路径。
* **build_args Dockerfile build args**：此处填写的键值对将被渲染为 Dockerfile 中的 ARG。

## 通过 Docker Push 推送镜像

```yaml
- stage:
  - docker-push:
      params:
        image: registry.erda.cloud/erdaxxx:v1.0            
        from: imageResult.img                               
        service: test-server                                
        username: admin                                    
        password: xxxx                                      
```

docker-push 主要具备以下两项功能：

1. 从本地文件读取镜像，推送至指定镜像仓库。
2. 将外部仓库的镜像推送至平台内部仓库，供部署使用。

具体参数说明如下：

* **image**：推送至外部的镜像名称。
* **from**：应用下的文件，一般从 buildPack 出参中获取。
* **service**：服务名称，需与镜像文件中的 module_name 保持一致。
* **username**：外部镜像仓库用户名。
* **password**：外部镜像仓库密码。

## 通过 Docker Pull 拉取镜像

```yaml
- stage:
  - docker-push:
      params:
        image: registry.erda.cloud/erdaxxx:v1.0  
        service: test-server                               
        username: admin                                    
        password: xxxx                                      
        pull: true                                                                
```

使用 docker-push Action，增加 pull 字段以申明是 docker pull。

具体参数说明如下：

* **image**：推送至外部的镜像名称。
* **service**：服务名称，需与镜像文件中的 module_name 保持一致。
* **username**：外部镜像仓库用户名。
* **password**：外部镜像仓库密码。
* **pull**：该值必须为 `true`，表示拉取代码。

## 自定义命令推送或拉取镜像

推送至平台仓库：
```yaml
  - stage:
      - custom-script:
          alias: docker-push
          # 基于 docker hub 上的 docker 镜像
          image: docker
          commands:
            # 设置镜像加速
            - echo "http://mirrors.aliyun.com/alpine/v3.6/main/" > /etc/apk/repositories && echo "http://mirrors.aliyun.com/alpine/v3.6/community/" >> /etc/apk/repositories
            # 进入代码根目录
            - cd ${git-checkout} 
            # 设置 repo 的名称，这里用 erda 内部的 dockerRegisterAddr, imageName，tagName 自行填写
            - repo=""$BP_DOCKER_ARTIFACT_REGISTRY"/"$DICE_PROJECT_APPLICATION":"imageName"-"tagName""
            # 构建镜像
            - docker build -t $repo .
            # login 和 registerAddr 地址看用户自定义情况来定，因为 $BP_DOCKER_ARTIFACT_REGISTRY 是 erda 自带 docker 的仓库，不需要登录，直接推送即可 
            # - 否则需要执行 docker login --username= --password= registerAddr
            - docker push $repo
            # 写入 image 的名称给下面的 action 使用 -> ${{ outputs.docker.image }}
            - echo "image="$repo"" >> $METAFILE
            # 打个别名
            - docker tag $repo xxx/xx/xx:tag 
            # 推送到 tag 的地址，如果需要登录请 docker login --username= --password= registerAddr
            - docker push xxx/xx/xx:tag
```

拉取平台仓库中的镜像，推送至外置仓库：

```yaml
  - stage:
      - custom-script:
          alias: docker-tag
          # 基于 docker hub 上的 docker 镜像
          image: docker
          commands:
            # 设置镜像加速
            - echo "http://mirrors.aliyun.com/alpine/v3.6/main/" > /etc/apk/repositories && echo "http://mirrors.aliyun.com/alpine/v3.6/community/" >> /etc/apk/repositories
            # 进入代码根目录
            - cd ${git-checkout} 
            # 如果需要登录请 docker login --username= --password= registerAddr
            - docker pull xxx/xxx/xx1:tag
            # 使用前置节点的镜像出参, ${{ outputs.xxx.image }} xxx 节点的出参
            # - docker tag ${{ outputs.xxx.image }} xxx/xx/xx:tag 
            # 自己定义的镜像名称
            - docker tag xxx/xxx/xx1:tag xxx/xx/xx:tag 
            # 推送到新的地址，如果需要登录请 docker login --username= --password= registerAddr
            - docker push xxx/xx/xx:tag
```
上述示例即使用 `docker` 命令进行镜像打包推送和拉取。Erda 的仓库地址需用 `$BP_DOCKER_ARTIFACT_REGISTRY` 获取，且无需登陆，其余命令均通过 `docker` 和 `linux` 命令实现。