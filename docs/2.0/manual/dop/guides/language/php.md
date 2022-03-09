# PHP

Erda 通过统一的任务插件机制支撑不同的构建能力，并利用这一机制提供开箱即用的 PHP 构建插件。

## PHP 版本

当前支持 PHP 7.2 版本。

## 依赖管理

依赖管理支持 [Composer](https://getcomposer.org/)。

若检测到代码根目录存在 composer.json 文件，则构建时将自动安装依赖。

## 打包构建

PHP Action 需指定两个路径：

* **context**：需添加至容器的 PHP 代码路径。
* **index_path**：PHP 的入口路径，即相对代码路径。

pipeline.yml 示例如下：

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

默认运行容器环境为 PHP 7.2 Apache。
