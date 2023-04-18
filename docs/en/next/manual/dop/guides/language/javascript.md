# JavaScript

Erda supports building capabilities through a unified task plugin mechanism, and provides JavaScript building plugins out of the box.

Just configure some parameters in pipeline.yml to use the plugin. According to the type of container, it can be divided into:

- Herd: Runs with Node.js provided by Erda
- Single-Page Application (SPA): Runs as a container with Nginx

## Version

12.13.1 LTS is supported.

## Dependency Installation

The plugin needs [npm ci](https://docs.npmjs.com/cli/ci.html) to install dependencies.

Compared with traditional npm install, the advantages of npm ci are:

- Locked dependency version
- Faster dependency installation

npm ci should provide two files of package.json and package-lock.json in the application directory.

## Building and Packaging

When building images with this plugin, note the followings:

- What is your packaging tool? No limit on packaging tools, such as webpack and Rollup.

- Where to run the packaging tool? The code root directory, that is, the directory where `package.json` is located.

- Download command
   `npm ci`

- Packaging command
   User-defined. It is recommended to use `npm run build` and provide `build` script in `package.json`.

::: tip Tips
Making the questions above clear helps you better understand the configurations needed when building a JavaScript application on Erda, and how Erda runs JavaScript.
:::

JavaScript building consists of two parts:

- Compile the source code into a packaged product by specified packaging method and context parameters.
- Select images to make built product into an operating image according to specified running environment and version.

An example of pipeline.yml is as follows:

```yaml{10,11,12,13,14}
version: "1.1"

stages:
- stage:
  - git-checkout: # The first stage is to pull the code and the parameter configuration is optional

- stage:
  - js:
      params:
        workdir: ${git-checkout} # The directory where the compilation command is executed and the checkout directory is used here
        dest_dir: public # The directory of compiled artifact, relative to the workdir path, optional and the default is public
        dependency_cmd: npm ci # Command to download dependencies, optional and the default is npm ci
        build_cmd: npm run build # Packaging command
        container_type: herd # Container type, with herd and spa supported currently
```

### Herd

* **Dependency**: `npm ci`
* **Compiling**: `npm run build`, all files in the compilation directory will be put into the image after compiling
* **Running**: `npm run start`, all compiled files can be used

An example of pipeline.yml is as follows:

```yaml{10,11,12}
version: "1.1"

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

* **Dependency**: `npm ci`
* **Compiling**: `npm run build`, the public folder in the compilation directory (adjustable by `dest_ dir` in params) will be put into the image
* **Running**: Sarts Nginx

The application should provide a template file for Nginx configuration named `nginx.conf.template` in the compilation directory. The file can use environment variables. Erda will dynamically replace the values of the environment variables and then start Nginx.

An example of template file is as follows:

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

    set $OPENAPI_ADDR ${API_ADDR}; # Configure the variable name API_ADDR in the envs field of dice.yml or in deployment variables in application settings of Erda
    location /api {
        proxy_pass              $OPENAPI_ADDR;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

An example of pipeline.yml is as follows:

```yaml{10,11,12}
version: "1.1"

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


## Packing Acceleration

`npm ci` runs packaging faster than `npm install`.

In the future, Erda will provide an enterprise-level npm proxy repository to cache npm packages and accelerate packaging.

Caches acceleration:

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

`${git-checkout}/node_modules`: ${git-checkout} is the project path, and node_modules is the package path generated after npm building, which will be accelerated next time after caching.

## Select Container

- Herd
- SPA
- Node.js

## Access Monitoring

By accessing monitoring, you can view information of page loading performance, error reporting and users for better understanding and analysis.

### Access by Herd

Non-intrusive monitoring, the plugin will automatically install `@terminus/spot-agent@~${ERDA_VERSION}` when building an image.

### Access by SPA

SPA does not support non-intrusive access to browser monitoring, and manual access is required. Here is the way:

- Add ` ta.js` to the head in the template.

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

- Add ` /ta` request processing in `nginx.conf.template`.

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

### Access by Node.js
- Install the spot-agent dependency in the project directory.

   ```
   ## npm config set registry https://registry.npm.terminus.io
   npm i @terminus/spot-agent@~3.20
   ```
- Add the startup code of the agent to the first line of the startup class (usually index.js) of the node application.

   ```
   require('@terminus/spot-agent').start()
   ```
### Access by Custom Image

- Herd: Add the following steps in `Dockerfile`:

   ```dockerfile
   RUN bootjs=$(node -p "require('./package.json').scripts.start" | \
       sed -n -e 's/^.*herd //p') && \
       bootjs=${bootjs:-'Pampasfile-default.js'} && echo ${bootjs} && \
       npm i @terminus/spot-agent@~${ERDA_VERSION} -g && \
       npm link @terminus/spot-agent && \
   	spot install -r herd -s ${bootjs} || exit -1;
   ```

- SPA: See [Access by SPA](#access-by-spa).
