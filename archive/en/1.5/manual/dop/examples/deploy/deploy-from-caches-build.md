# Speed up Builds with Cache

## Cache in Java
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

## Cache in JS

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
          # When cache sharing conflicts
          - key: '{{basePath}}/master/{{endPath}}'
            path: ${git-checkout}/node_modules
        params:
          workdir: ${git-checkout}
          build_cmd: npm run build
          container_type: spa
```

## Cache in Other Languages

`Caches` is an array object that can define multiple `path` and `key`.

* `caches[]:path`: Specify the directory for caching and subsequent builds will put the cache file back into the original directory. `path` can only be an absolute path (begin with ``/``), or build the path `${}` (also an absolute path) in `erda`.
* `caches[]:key`: When no `key` is specified, the system will automatically generate it. When a cache conflict occurs, user should customize `key`, which must start with <code v-pre>{{basePath}}</code> and end with <code v-pre>{{endPath}}</code>, while the middle name can be customized.

As the cache is stored on `nfs` at the address of `/appId/projectId/hash(path)` by default, the same application in the same project may have conflicts.

::: tip Tips
<code v-pre>{{basePath}}</code> = /appId/projectId/
<code v-pre>{{endPath}}</code> = hash(path)
:::

When using other languages to speed up builds, such as `golang`, you can use `vendor` files for caching.

```yaml
caches:
  - path: ${git-checkout}/vendor
```

