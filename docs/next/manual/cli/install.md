# CLI 安装

CLI 是 Erda 为开发者提供的命令行工具，您可以通过该工具在终端设备上轻松构建 Erda 应用。

## 安装

```bash
curl https://raw.githubusercontent.com/erda-project/erda/master/tools/cli/install.sh | sh
```

::: tip 提示

脚本安装会根据安装机器选择合适的二进制安装文件，当前仅支持 MacOS 和 Linux。

默认会安装最新的 release 版本。

安装工具依赖 jq 和 curl 命令工具。

:::

### 版本

安装历史版本 v1.5.0

```bash
curl https://raw.githubusercontent.com/erda-project/erda/master/tools/cli/install.sh | sh -s -- v1.5.0
```

安装开发版本

```bash
curl https://raw.githubusercontent.com/erda-project/erda/master/tools/cli/install.sh | sh -s -- alpha
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
  build              create a pipeline and run it
  clone              clone project or application from Erda
  completion         generate the autocompletion script for the specified shell
  config             Config Project workspace configurations operation,including set, get, update, delete
  create             create project
  ext                extensions operation sets,including search, pull, push, retag
  help               Help about any command
  migrate            Erda MySQL Migrate
  project-deployment Project workspace deployment operation,including stop, start
  push               push project to a Erda platform
  version            show erda version info
  view               View pipeline status

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
您可以通过 `erda-cli completion -h` 命令查看如何配置多种终端的自动补全（MacOS 上推荐使用 zsh）。
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
例如，在 Mac 上可参考 help 信息配置 zsh 的自动补全。
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
配置后的使用效果如下：
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

### 配置

因 CLI 会调用 Git 命令完成代码相关的操作，建议如下设置：

```shell
git config --global user.name <YOUR_USERNAME>
git config --global user.email <YOUR_EMAIL>
git config --global credential.helper store
```

# 容器镜像安装

CLI 支持通过容器镜像方式进行安装使用。

```bash
docker pull registry.erda.cloud/erda/cli:2.1-alpha
```

完成安装后，您可以通过 `erda-cli version` 查看版本信息。

```bash
$ docker run --rm registry.erda.cloud/erda/cli:2.1-alpha version
Version: 2.1
BuildTime: 2022-03-23 16:31:34
GoVersion: go version go1.16.3 linux/amd64
CommitID: affb9103763f29cdf0461c43434ef13efb08cd29
DockerImage: registry.erda.cloud/erda/cli:2.1-alpha-20220323162540-affb910
```

### 版本

稳定版本：对应于 Erda 的版本 v2.1.x，镜像版本为 2.1，即`registry.erda.cloud/erda/cli:2.1`。

内测版本：对应于 Erda 的版本 v2.1.x，镜像版本为 2.1-alpha，即`registry.erda.cloud/erda/cli:2.1-alpha`。

### 配置

CLI 的很多命令运行时会依赖在本地 session 文件、本地工作空间等，因此一般需要挂载多个文件到运行容器。

```bash
docker run --rm -it -v ${HOME}:/root -e workspace=${PWD} -e home=${HOME} registry.erda.cloud/erda/cli:2.1-alpha
```

其中通过 `-e` 参数传递 HOME 目录、当前目录，通过 `-v` 参数挂住 HOME 目录。

- 基于容器的命令较长，可以用 `alias` 简短命令:

```bash
alias erda-cli='docker run --rm -it -v ${HOME}:/root -e workspace=${PWD} -e home=${HOME} registry.erda.cloud/erda/cli:2.1-alpha'
```

- 因 CLI 会调用 Git 命令完成代码相关的操作，建议如下设置：

```shell
git config --global user.name <YOUR_USERNAME>
git config --global user.email <YOUR_EMAIL>
git config --global credential.helper store
```

# 