# 环境与系统配置检查

本文介绍部署 Dice 前的环境检查操作，以下各项操作按优先级排序。

## 操作系统版本检查

Dice 部署对操作系统的类型及版本有一定的要求，具体可以参考[这里](env-requirements.md).

可以查看以下命令确定 Redhat 系列操作系统的版本：

```bash
$ cat /etc/redhat-release
CentOS Linux release 8.1.1911 (Core)
```

## 数据盘检查

本段介绍宿主机数据盘的分配检查。建议对所有机器的系统盘和数据盘进行分离，故要检查下是否对所有的宿主机分配了对应的数据盘。

查看磁盘的命令如下：

```bash
$ fdisk -l
```

> 注意：只需要分配数据盘即可，Dice 添加机器时会自动化执行格式化磁盘并挂载。

## 检测及关闭系统 swap

本段介绍 swap 关闭方法。Dice 平台运行需要有足够的内存，并且不建议使用 swap 作为内存不足的缓冲，这会降低性能。因此建议永久关闭系统 swap，并且不要使用 `swapoff -a` 方式关闭，否则重启机器后该操作会失效。

建议执行以下命令关闭系统 swap：

```bash
$ echo "vm.swappiness = 0" >> /etc/sysctl.conf
$ swapoff -a && swapon -a
$ sysctl -p
```

## 检测及关闭机器的防火墙

本段介绍如何关闭目标主机防火墙配置，因为在 Dice 集群中，需要将节点间的访问端口打通才可以保证集群及容器的正常访问。如果没有特殊安全的要求，建议关闭目标节点的防火墙。

- 检查防火墙状态（以 CentOS Linux release 7.7.1908 (Core) 为例）

```bash
sudo firewall-cmd --state
sudo systemctl status firewalld.service
```

- 关闭防火墙服务

```bash
sudo systemctl stop firewalld.service
```

- 关闭防火墙自动启动服务

```bash
sudo systemctl disable firewalld.service
```

- 检查防火墙状态

```bash
sudo systemctl status firewalld.service
```

## 检测及安装 NTP 服务

Dice 集群是一套分布式系统，需要保证节点间时间的同步。目前解决授时的普遍方案是采用 NTP 服务，可以通过互联网中的知名时间服务器授时来保证节点的时间同步，也可以使用离线环境自己搭建的 NTP 服务来解决授时。

采用如下步骤检查是否安装 NTP 服务以及与 NTP 服务器正常同步：

1. 执行以下命令，如果输出 `running` 表示 NTP 服务正在运行：

```bash
sudo systemctl status ntpd.service
```

```fallback
ntpd.service - Network Time Service
Loaded: loaded (/usr/lib/systemd/system/ntpd.service; disabled; vendor preset: disabled)
Active: active (running) since 一 2017-12-18 13:13:19 CST; 3s ago
```

2. 执行 `ntpstat` 命令检测是否与 NTP 服务器同步：

```bash
ntpstat
```

- 如果输出 `synchronised to NTP server`，表示正在与 NTP 服务器正常同步：

  ```fallback
  synchronised to NTP server (85.199.214.101) at stratum 2
  time correct to within 91 ms
  polling server every 1024 s
  ```

- 以下情况表示 NTP 服务未正常同步：

  ```fallback
  unsynchronised
  ```

- 以下情况表示 NTP 服务未正常运行：

  ```fallback
  Unable to talk to NTP daemon. Is it running?
  ```

如果要使 NTP 服务尽快开始同步，执行以下命令。可以将 `pool.ntp.org` 替换为你的 NTP 服务器：

```bash
sudo systemctl stop ntpd.service && \
sudo ntpdate pool.ntp.org && \
sudo systemctl start ntpd.service
```

如果要在 CentOS 7 系统上手动安装 NTP 服务，可执行以下命令：

```bash
sudo yum install ntp ntpdate && \
sudo systemctl start ntpd.service && \
sudo systemctl enable ntpd.service
```
