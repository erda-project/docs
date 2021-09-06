# JavaScript

Erda 通过统一的任务插件机制支撑不同的构建能力，利用这一机制，Erda 提供了开箱即用的 JavaScript 构建插件。
只需要在 `pipeline.yml` 中配置几个参数即可使用该插件。

根据运行时容器类型进行分类，可以分为：

- [Herd](https://docs.terminus.io/herd/) Erda 提供的 Node.js 运行时
- [Single-Page Application（SPA）](https://en.wikipedia.org/wiki/Single-page_application) 使用 Nginx 作为容器运行时

## Node.js 版本

当前支持的版本如下：

- 12.13.1 LTS 长期支持版（缺省版本）

其他版本正在支持中。

## 安装依赖

插件使用 [npm ci](https://docs.npmjs.com/cli/ci.html) 安装依赖。

**npm ci** 相比传统的 **npm install**，优势在于：

- 依赖版本锁定
- 更快的依赖安装速度

**npm ci** 需要在应用目录下提供 **package.json** 和 **package-lock.json** 两个文件。

## 构建打包

使用该插件构建镜像，需要明确以下几点：

- 打包工具是什么？

平台不限制打包工具，Webpack、Roolup 等工具均可

- 在哪个路径执行打包工具？

代码根目录，即 `package.json` 所在目录。

- 依赖下载命令

`npm ci`

- 打包命令

用户自定义。推荐使用 `npm run build`，并在 `package.json` 中提供 `build` 脚本。

::: tip
通过回答这些问题，可以帮助理解在 Erda 上构建 JavaScript 应用所必要填写的配置，以及 Erda 是如何执行 JavaScript 打包过程的
:::

JavaScript 构建分为两部分:

- 通过指明的打包方式和上下文参数，将源代码编译成 `打包产物`
- 按照指明的运行环境和版本，选择基础镜像，将构建产物制作成运行镜像

在平台上打包需要配置 `pipeline.yml` 文件，示例如下：

```yaml{10,11,12,13,14}
version: 1.1

stages:
- stage:
  - git-checkout: # 第一个阶段是拉取代码，可以不配置参数

- stage:
  - js:
      params:
        workdir: ${git-checkout} # 执行编译命令的目录，这里使用了代码检出目录
        dest_dir: public # 编译产物的目录，相对于 workdir 的路径，可不填，默认为 public
        dependency_cmd: npm ci # 下载依赖命令，可不填，默认为 npm ci
        build_cmd: npm run build # 打包命令
        container_type: herd # 容器类型，目前只有 herd、spa 两种
```

### Herd

依赖：`npm ci`

编译：`npm run build`，编译后，编译目录下的所有文件都会被放入镜像中

运行：`npm run start`，可以使用编译后的所有文件

**pipeline.yml** 示例：

```yaml{10,11,12}
version: 1.1

stages:
- stage:
  - git-checkout:

- stage:
  - js:
      params:
        workdir: ${git-checkout}
        build_cmd: npm run build
        container_type: herd
```


### SPA

依赖：`npm ci`

编译：`npm run build`，编译后，编译目录下的 public 文件夹（可以在 params 中使用 `dest_dir` 调整）会被放入镜像中

运行：启动 Nginx

应用需要在编译目录提供一个 Nginx 配置模板文件，文件名为固定的 `nginx.conf.template`。

该模板文件可以使用环境变量，Erda 在运行时会动态替换环境变量的值，随后启动 Nginx。

模板文件参考如下：

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;

    # compression
    gzip on;
    gzip_min_length   2k;
    gzip_buffers      4 16k;
    gzip_http_version 1.0;
    gzip_comp_level   3;
    gzip_types        text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;

    client_max_body_size 0;

    set $OPENAPI_ADDR ${API_ADDR}; # 需要在 dice.yml 的 envs 字段或 Erda 平台的应用设置-部署变量中配置变量名 API_ADDR
    location /api {
        proxy_pass              $OPENAPI_ADDR;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**pipeline.yml** 示例：

``` yaml{10,11,12}
version: 1.1

stages:
- stage:
  - git-checkout:

- stage:
  - js:
    params:
      workdir: ${git-checkout}
      build_cmd: npm run build
      container_type: spa
```

**常见打包问题请参考 [FAQ](/faq)**


## 打包加速

使用 `npm ci` 相比 `npm install` 加速打包。

后续会在 Erda 集群内提供企业级 npm 代理仓库，用于缓存 npm package 并加速打包。

### caches 加速

```yaml
- stage:
  - js:
    caches:
      - path: ${git-checkout}/node_modules
    params:
      workdir: ${git-checkout}
      build_cmd: npm run build
      container_type: spa
```

#### 说明:

`${git-checkout}/node_modules` ${git-checkout} 是项目下，node_modules 则是 npm 构建后生成的包路径，缓存后下次就会加速

#### 详细 caches 文档 

[actions-caches](../actions/#用户手册)

## 运行容器选择

- Herd
- SPA
- NodeJs

## 接入平台监控

通过接入监控，类似于Google Analytic等工具，可以统计页面加载性能、报错以及用户相关信息，更好的了解性能、质量问题和分析用户。

### Herd 接入监控

无侵入式监控。

插件在制作镜像时，会自动安装对应 Erda 版本的 `@terminus/spot-agent@~${ERDA_VERSION}`。

### SPA 接入监控

SPA 暂不支持无侵入式浏览器监控接入，需要手动接入。

接入方式：

- 在模板页的 head 中添加 `ta.js`

```html
<script src="/ta"></script>
<script>
var _taConfig = window._taConfig;
if (_taConfig && _taConfig.enabled) {
 !function(e,n,r,t,a,o,c){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e.onerror=function(n,r,t,o,c){e[a]("sendExecError",n,r,t,o,c)},n.addEventListener("error",function(n){e[a]("sendError",n)},!0),o=n.createElement(r),c=n.getElementsByTagName(r)[0],o.async=1,o.src=t,c.parentNode.insertBefore(o,c)}(window,document,"script",_taConfig.url,"$ta");
 $ta('start', { udata: { uid: 0 }, ak: _taConfig.ak, url: _taConfig.collectorUrl });
}
</script>
```

- 在 `nginx.conf.template` 中添加 `/ta` 请求处理

```nginx
  set $taEnabled ${TERMINUS_TA_ENABLE};
  set $taUrl ${TERMINUS_TA_URL};
  set $collectorUrl ${TERMINUS_TA_COLLECTOR_URL};
  set $terminusKey ${TERMINUS_KEY};
  location /ta {
      default_type application/javascript;
      return 200 'window._taConfig={enabled:$taEnabled,ak:"$terminusKey",url:"$taUrl",collectorUrl:"$collectorUrl"}';
  }
```

### NodeJs 接入监控
- 在项目目录安装spot-agent依赖
```
## npm config set registry https://registry.npm.terminus.io
npm i @terminus/spot-agent@~3.20
```

- 在node应用的启动类中(一般是 index.js )第一行添加agent的启动代码
```
require('@terminus/spot-agent').start()
```

### 自定义镜像如何接入

- Herd：在 `Dockerfile` 中增加以下步骤：

```Dockerfile
RUN bootjs=$(node -p "require('./package.json').scripts.start" | \
    sed -n -e 's/^.*herd //p') && \
    bootjs=${bootjs:-'Pampasfile-default.js'} && echo ${bootjs} && \
    npm i @terminus/spot-agent@~${ERDA_VERSION} -g && \
    npm link @terminus/spot-agent && \
	spot install -r herd -s ${bootjs} || exit -1;
```

- SPA：参考 [SPA 接入监控](#spa-接入监控)
