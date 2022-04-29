# How to Manage Image

## Build Image by Dockerfile

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

Use Dockerfile action to customize Dockerfile for packaging and create image for deployment, which will be pushed to the image repository on the platform.

The parameters are as follows:

* **workdir**: Run command in a specific directory.
* **path dockerfile**: relative path.
* **build_args Dockerfile build args**: The key-value pair filled in here will be rendered as ARG in the Dockerfile.

## Push Image by Docker Push

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

docker-push mainly supports the following functions:

1. Read the image from the local file and push it to the designated image repository.
2. Push the image of the external repository to the internal repository of the platform for deployment.

The parameters are as follows:

* **image**: Name of the image pushed to the outside.
* **from**: Files under the application, generally obtained from the output parameters of buildPack.
* **service**: Service name, which should be consistent with the module_name in the image file.
* **username**: Username of the external image repository.
* **password**: Password of the external image repository.

## Pull Image by Docker Pull

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

Use docker-push action and add a pull field to declare it is docker pull.

The parameters are as follows:

* **image**: Name of the image pushed to the outside.
* **service**: Service name, which should be consistent with the module_name in the image file.
* **username**: Username of the external image repository.
* **password**: Password of the external image repository.
* **pull**: The value must be `true`, indicating code pulling.

## Push or Pull Image by Custom Command

Push to the platform repository:
```yaml
  - stage:
      - custom-script:
          alias: docker-push
          # Docker image based on the Docker Hub
          image: docker
          commands:
            # Set image acceleration
            - echo "http://mirrors.aliyun.com/alpine/v3.6/main/" > /etc/apk/repositories && echo "http://mirrors.aliyun.com/alpine/v3.6/community/" >> /etc/apk/repositories
            # Go to the code root directory
            - cd ${git-checkout}
            # Set the name of the repo. Here uses dockerRegisterAddr, imageName and tagName of erda to fill in
            - repo=""$BP_DOCKER_ARTIFACT_REGISTRY"/"$DICE_PROJECT_APPLICATION":"imageName"-"tagName""
            # Build image
            - docker build -t $repo .
            # The login and registerAddr addresses are determined by users as $BP_DOCKER_ARTIFACT_REGISTRY is a docker repository of erda, with no need to login
            # - Otherwise run docker login --username= --password= registerAddr
            - docker push $repo
            # Write the image name for the following action -> ${{ outputs.docker.image }}
            - echo "image="$repo"" >> $METAFILE
            # Set an alias
            - docker tag $repo xxx/xx/xx:tag
            # Push to the tag address and if login is required, docker login --username= --password= registerAddr
            - docker push xxx/xx/xx:tag
```

Pull the image from the platform repository and push it to the external repository:

```yaml
  - stage:
      - custom-script:
          alias: docker-tag
          # Docker image based on the Docker Hub
          image: docker
          commands:
            # Set image acceleration
            - echo "http://mirrors.aliyun.com/alpine/v3.6/main/" > /etc/apk/repositories && echo "http://mirrors.aliyun.com/alpine/v3.6/community/" >> /etc/apk/repositories
            # Go to the code root directory
            - cd ${git-checkout}
            # If login is required, please docker login --username= --password= registerAddr
            - docker pull xxx/xxx/xx1:tag
            # Use the image output parameters of the front node, output parameters of the node ${{ outputs.xxx.image }} xxx
            # - docker tag ${{ outputs.xxx.image }} xxx/xx/xx:tag
            # Self-defined image name
            - docker tag xxx/xxx/xx1:tag xxx/xx/xx:tag
            # Push to a new address and if login is required, docker login --username= --password= registerAddr
            - docker push xxx/xx/xx:tag
```
The example above uses `docker command` to push and pull image package. Use `$BP_DOCKER_ARTIFACT_REGISTRY` to get the repository address of Erda without login, and run `docker` and `linux` for other commands.

