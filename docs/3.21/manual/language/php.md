# PHP

Erda 通过统一的任务插件机制支撑不同的构建能力，利用这一机制，Erda 提供了开箱即用的 PHP 构建插件。

## PHP 版本

当前支持的版本如下:

- PHP 7.2

其他版本正在支持中

## 依赖管理

依赖管理支持[composer](https://getcomposer.org/)

如果检测到代码根目录存在composer.json文件 在构建时会先自动安装依赖

## 打包构建

php action需要指定2个路径

`context` 需要添加到容器的php代码的路径

`index_path` php的入口路径，相对代码路径

pipeline.yml

```yml
version: "1.1"
stages:
- stage:
  - git-checkout:
      alias: repo
      params:
        depth: 1
- stage:
  - php:
      params:
        index_path: public
        context: ${repo}
```

### 运行容器环境

现在默认环境是PHP7.2 Apache
