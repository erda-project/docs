# CLI 安装

CLI 是 Erda 为开发者提供的命令行工具，您可以通过该工具在终端设备上轻松构建 Erda 应用。

## 下载安装

### macOS

```bash
wget -O /usr/local/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/mac/erda-1.5 && chmod +x /usr/local/bin/erda-cli
```

### Linux

```bash
wget -O /usr/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/linux/erda-1.5 && chmod +x /usr/bin/erda-cli
```

## 安装验证

完成安装后，您可以通过 `erda-cli version` 查看版本信息。

```shell
$ erda-cli version
Version: 1.5
BuildTime: 2021-12-10 10:42:18
GoVersion: go version go1.16.5 darwin/arm64
CommitID: c364c97e306627cdfe05f38fd8ab10441671e349
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
  addon       list addons
  application list applications
  completion  generate the autocompletion script for the specified shell
  config      show config file for Erda CLI
  erda        list erda.yml in .erda directory (current repo)
  ext         extensions operation sets,including search, pull, push, retag
  help        Help about any command
  migrate     Erda MySQL Migrate
  org         list organizations
  pipeline    list pipelines in .dice/pipelines directory (current repo)
  project     list projects
  release     list releases
  runtime     list runtimes
  service     list services
  version     show erda version info

Flags:
  -h, --help              help for erda-cli
      --host string       Erda host to visit (e.g. https://erda.cloud)
      --interactive       if true, interactive with user (default true)
  -p, --password string   Erda password to authenticate
  -r, --remote string     the remote for Erda repo (default "origin")
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
$ erda-cli a[tab]
addon        -- list addons
application  -- list applications

$ erda-cli application [tab]
create   -- create application
delete   -- delete application
inspect  -- inspect application
member   -- display members of the application
open     -- open the application page in browser
```

