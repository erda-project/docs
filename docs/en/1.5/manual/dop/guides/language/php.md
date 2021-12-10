# PHP

Erda supports building capabilities through a unified task plugin mechanism, and provides PHP building plugins out of the box.

## Version

PHP 7.2 is supported.

## Dependency Management

[Composer](https://getcomposer.org/) is supported for dependency management.

If a composer.json file is detected in the root directory, the dependencies will be automatically installed during the building.

## Packaging and Building

PHP action needs to specify two paths:

* **context**: The PHP code path to be added to the container
* **index_path**: The entry path of PHP, that is, the relative code path

An example of pipeline.yml is as follows:

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

The default container environment is PHP 7.2 Apache.
