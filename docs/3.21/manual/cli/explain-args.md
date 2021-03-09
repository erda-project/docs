# 使用详解

CLI 是 Dice
为开发者提供的一个命令行工具，在终端设备上，使用命令行工具能够轻松便捷的创建和管理 Dice 应用，这是 Dice 必不可少的一部分。

## 下载安装

目前 CLI 配套 Dice 3.0.0 发布了第一个版本，下载地址如下：

#### MacOS

```bash
wget -O /usr/local/bin/dice https://terminus-dice.oss-cn-hangzhou.aliyuncs.com/cli/mac/dice && chmod +x /usr/local/bin/dice
```

#### Linux

```bash
wget -O /usr/bin/dice https://terminus-dice.oss-cn-hangzhou.aliyuncs.com/cli/linux/dice && chmod +x /usr/bin/dice
```

## 使用

#### 配置

Dice CLI 安装好后，需要正确配置 Dice Server 地址才能够通过 login 登录 Dice
平台， CLI
的大多数子命令都需要先登录后才能执行，只有少部分命令不需要登录，比如：dice.yml
相关命令。

Dice CLI 的配置文件里写入正确的 server 地址即可，如果目录不存在请先创建目录：

```bash
cat ~/.dice.d/config
server: https://openapi.example.io
```

#### 登录

安装并配置 CLI 之后， 执行 dice login 来登录账户

```bash
dice login
username: example@terminus.io
password: (hidden password)
✔ Successfully login as XXX
```

`账户登录成功之后 session 会保存，session 过期之后需要再次登录。`

Dice command

可通过 dice --help 命令列出所有可用的 command ，再通过子命令的 help 信息详细查看用法。
