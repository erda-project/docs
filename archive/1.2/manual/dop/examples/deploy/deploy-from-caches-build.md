# 使用缓存加速构建

### Java 缓存
```yaml
- stage:
  - java:
      caches:
        - path: /root/.m2/repository
      params:
        build_type: maven
        workdir: ${git-checkout}
        options: -am -pl user
        target: ./user/target/user.jar
        container_type: openjdk
```

```yaml
- stage:
    - java-build:
        caches:
          - path: /root/.m2/repository
        version: "1.0"
        params:
          build_cmd:
            - mvn package
          jdk_version: 8
          workdir: ${git-checkout}
```

### JS 缓存

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          params:
          depth: 1
  - stage:
      - js:
        caches:
          - path: ${git-checkout}/node_modules
        params:
          workdir: ${git-checkout}
          build_cmd: npm run build
          container_type: spa
```

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          params:
          depth: 1
  - stage:
      - js:
        caches:
          # 当缓存共享冲突的时候
          - key: '{{basePath}}/master/{{endPath}}'
            path: ${git-checkout}/node_modules
        params:
          workdir: ${git-checkout}
          build_cmd: npm run build
          container_type: spa
```

### 其他语言缓存

`caches` 为数组对象，可定义多个 `path` 和 `key`。 

* `caches[]:path`：指定目录进行缓存，后续构建会将该缓存文件放回原目录，`path` 只能是绝对路径（以 ``/`` 开头），或在 `erda` 中构建路径 `${}`（同样为绝对路径）。
* `caches[]:key`：未指定 `key` 时，系统将自动生成。当缓存发生冲突时，用户需自定义 `key`，且必须以 <code v-pre>{{basePath}}</code> 开头，以 <code v-pre>{{endPath}}</code> 结尾，中间名称可自定义。    

因默认缓存是以 `/appId/projectId/hash(path)` 地址存储在 `nfs` 上，因此同一项目中的同一应用可能会发生冲突。

::: tip 提示
<code v-pre>{{basePath}}</code> = /appId/projectId/
<code v-pre>{{endPath}}</code> = hash(path)
:::

使用其他语言加速构建时，例如 `golang`，您可以缓存 `vendor` 文件。

```yaml
caches:
  - path: ${git-checkout}/vendor
```

