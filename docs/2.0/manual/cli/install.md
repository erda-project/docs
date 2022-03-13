# CLI 安装

CLI 是 Erda 为开发者提供的命令行工具，您可以通过该工具在终端设备上轻松构建 Erda 应用。

## 下载安装

### macOS

```bash
wget -O /usr/local/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/mac/erda-2.1-alpha && chmod +x /usr/local/bin/erda-cli
```

### Linux

```bash
wget -O /usr/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/linux/erda-2.1-alpha && chmod +x /usr/bin/erda-cli
```

## 安装验证

完成安装后，您可以通过 `erda-cli version` 查看版本信息。

```shell
$ erda-cli version
Version: 2.1-alpha
BuildTime: 2022-03-11 14:09:49
GoVersion: go version go1.16.5 darwin/arm64
CommitID: 389d769e76e600e4b9993db26c279c21e91f8297
```

您可以通过 `erda-cli help` 命令列出所有可用的 Erda Command，再通过子命令的 `help` 信息查看详细用法。

```shell
$ erda-cli help

    _/_/_/_/       _/_/_/        _/_/_/          _/_/
   _/             _/    _/      _/    _/      _/    _/
  _/_/_/         _/_/_/        _/    _/      _/_/_/_/
 _/             _/    _/      _/    _/      _/    _/
_/_/_/_/       _/    _/      _/_/_/        _/    _/

Usage:
  erda-cli [command]

Available Commands:
  build       create a pipeline and run it
  clone       clone project or application from Erda
  completion  generate the autocompletion script for the specified shell
  create      create project
  ext         extensions operation sets,including search, pull, push, retag
  help        Help about any command
  migrate     Erda MySQL Migrate
  push        push project to a Erda platform
  version     show erda version info
  view        View pipeline status

Flags:
  -h, --help              help for erda-cli
      --host string       Erda host to visit (e.g. https://erda.cloud)
      --interactive       if true, interactive with user (default true)
  -p, --password string   Erda password to authenticate
      --remote string     the remote for Erda repo (default "origin")
  -u, --username string   Erda username to authenticate
  -V, --verbose           if true, enable verbose mode

Use "erda-cli [command] --help" for more information about a command.
```
### 自动补全
可以使用 `erda-cli completion -h` 命令查看如何配置多种终端的自动补全。
```shell
$ erda-cli completion -h
Generate the autocompletion script for erda-cli for the specified shell.
See each sub-command's help for details on how to use the generated script.
Usage:
  erda-cli completion [command]
Available Commands:
  bash        generate the autocompletion script for bash
  fish        generate the autocompletion script for fish
  powershell  generate the autocompletion script for powershell
  zsh         generate the autocompletion script for zsh
```
例如在 Mac 上可以参考 help 信息配置 zsh 的自动补全。
```shell
$ erda-cli completion zsh -h
Generate the autocompletion script for the zsh shell.
If shell completion is not already enabled in your environment you will need
to enable it.  You can execute the following once:
$ echo "autoload -U compinit; compinit" >> ~/.zshrc
To load completions for every new session, execute once:
# Linux:
$ erda-cli completion zsh > "${fpath[1]}/_erda-cli"
# macOS:
$ erda-cli completion zsh > /usr/local/share/zsh/site-functions/_erda-cli
You will need to start a new shell for this setup to take effect.
```
配置后的使用效果：
```shell
$ erda-cli c[tab]
clone       -- clone project or application from Erda
completion  -- generate the autocompletion script for the specified shell
create      -- create project
$ erda-cli completion [tab]
bash        -- generate the autocompletion script for bash
fish        -- generate the autocompletion script for fish
powershell  -- generate the autocompletion script for powershell
zsh         -- generate the autocompletion script for zsh
$ erda-cli create --[tab]
--description   -- description of the project
--host          -- Erda host to visit (e.g. https://erda.cloud)
--init-package  -- package for init the project
--interactive   -- if true, interactive with user
--name          -- the name of the project
--org           -- the name of an organization
--password      -- Erda password to authenticate
--remote        -- the remote for Erda repo
--username      -- Erda username to authenticate
--verbose       -- if true, enable verbose mode
--wait-import   -- minutes wait for package to be import
```