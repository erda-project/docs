# Custom Addon

The addon market of Erda offers a rich repository of artifacts to meet the needs of most scenarios, and supports custom addon to meet the needs of some specific scenarios.

## Custom Action
The development process of action is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/20/93f608c9-b601-4c0d-a527-2739fa03db84.png)

1. Describe input parameters via spec.yml.
2. Write debugging action.
3. Write dockerfile to package and build.
4. Write dice.yml.
5. Debug action.

The deliverable of an action is a Docker image. Developers only need to provide an executable file (/opt/action/run) in the image and grant permissions (chmod +x) in advance.

When the pipeline is executed, it creates a Docker container from the image and calls the /opt/action/run file to run the logic defined by the developer.

## Custom-Script Action

Custom-Script is a special action that supports running custom commands. The default images provided by the platform include Java, Node.js, Golang and other compilation environments. Custom-Script accepts a list of script commands to be executed in order to facilitate addon development.
