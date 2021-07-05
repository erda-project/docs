# 使用详解

CLI 是 Erda
为开发者提供的一个命令行工具，在终端设备上，使用命令行工具能够轻松便捷的创建和管理 Erda 应用，这是 Erda 必不可少的一部分。

## 下载安装

目前 CLI 配套 Erda 1.0 发布了第一个版本，下载地址如下：

#### MacOS

```bash
wget -O /usr/local/bin/erda https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/mac/erda && chmod +x /usr/local/bin/erda
```

#### Linux

```bash
wget -O /usr/bin/erda https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/linux/erda && chmod +x /usr/bin/erda
```

## 使用

#### 配置

Erda CLI 安装好后，需要正确配置 Erda Server 地址才能够通过 login 登录 Erda
平台， CLI
的大多数子命令都需要先登录后才能执行，只有少部分命令不需要登录，比如：dice.yml
相关命令。

Erda CLI 的配置文件里写入正确的 server 地址即可，如果目录不存在请先创建目录：

```bash
cat ~/.erda.d/config
server: https://openapi.example.io
```

#### 登录

安装并配置 CLI 之后， 执行 erda login 来登录账户

```bash
erda login
username: example@terminus.io
password: (hidden password)
✔ Successfully login as XXX
```

`账户登录成功之后 session 会保存，session 过期之后需要再次登录。`

Erda command

可通过 erda --help 命令列出所有可用的 command ，再通过子命令的 help 信息详细查看用法。
