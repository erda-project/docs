# 命令行工具

CLI 是 Erda 为开发者提供的命令行工具，您可以通过该工具在终端设备上轻松创建并管理 Erda 应用。

## 下载安装

CLI 下载地址如下：

### macOS

```bash
wget -O /usr/local/bin/erda https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/mac/erda && chmod +x /usr/local/bin/erda
```

### Linux

```bash
wget -O /usr/bin/erda https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/linux/erda && chmod +x /usr/bin/erda
```

## 使用操作

### 配置

安装完成后，需先正确配置 Erda Server 地址才能登录 Erda 平台。

在 Erda CLI 配置文件中写入 Server 地址（若目录不存在则先创建目录）：

```bash
cat ~/.erda.d/config
server: https://openapi.example.io
```

::: tip 提示

CLI 的多数子命令需在登陆后执行，但有少数命令无需登录也能执行，例如 `erda.yml` 相关命令。

:::

### 登录

执行 `erda login` 登录账号：

```bash
erda login
username: example@terminus.io
password: (hidden password)
✔ Successfully login as XXX
```

:::tip 提示
登录成功后会保存 Session，Session 过期则需重新登录。
:::

您可以通过 `erda help` 命令列出所有可用的 Erda Command，再通过子命令的 `help` 信息查看详细用法。
