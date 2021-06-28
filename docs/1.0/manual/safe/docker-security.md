# Docker安全加固

Docker是一个开源的引擎，可以轻松地为任何应用创建一个轻量级的、可移植的、自给自足的容器。本文介绍了使用 Docker 服务的安全加固方案，帮助您搭建一个安全可靠的容器集成环境。

## 使用强制访问控制策略

启用强制访问控制（Mandatory Access Control (MAC)），根据业务场景的具体分析，对 Docker 中使用的各种资源设置访问控制。
启用 AppAamor 功能：
```bash
$  docker run --interactive --tty --security-opt="apparmor:PROFILENAME" centos
```
启用 SElinux 功能：

```bash
$  docker daemon --selinux-enabled
```
## 关闭2375端口
关闭 docker API 2375 端口，防止出现安全问题后，docker 权限暴露。

## 不要使用root用户运行docker应用程序
在软件使用中，有一些必须由 root 用户才能够进行的操作。但从安全角度，您需要将这一部分操作与仅使用普通用户权限即可执行的操作分离解耦。
在编写dockerfile时，您可以使用类似如下的命令创建一个普通权限用户，并设置创建的UID为以后运行程序的用户:
```dockerfile
RUN useradd noroot -u 1000 -s /bin/bash --no-create-home
USER noroot
RUN Application_name
```

## 禁止使用特权
默认情况下，Docker 容器是没有特权的，一个容器不允许访问任何设备；但当使用--privileged选项时，则该容器将能访问所有设备。

例如，当打开--privileged选项后，您就可以对Host中/dev/下的所有设备进行操作。但如果不是必须对host上的所有设备进行访问的话，您可以使用--device仅添加需要操作的设备。

## 开启日志记录功能

Docker的日志可以分成两类，一类是 stdout 标准输出，另一类是文件日志。Dockerd支持的日志级别有debug、info、warn、error、fatal，默认的日志级别为info。
必要的情况下，您需要设置日志级别，这可以通过配置文件，或者启动参数-l或--log-level来完成。

方法一：修改配置文件/etc/docker/daemon.json。
```dockerfile
{
  "log-level": "debug"
}
```

方法二：使用docker run的时候指定--log-driver=syslog --log-opt syslog-facility=daemon。
## 定期安全扫描和更新补丁

在生产环境中使用漏洞扫描工具可以检测镜像中的已知漏洞。

* 容器通常都不是从头开始构建的，所以一定要进行安全扫描，以便及时发现基础镜像中任何可能存在的漏洞，并及时更新补丁。
* 在应用程序交付生命周期中加入漏洞扫描的安全质量控制，防止部署易受攻击的容器。

通过采用以上积极的防范措施，即在整个容器的生命周期中建立和实施安全策略，可以有效地保证一个集成容器环境的安全性。



