# CLI Installation

CLI is a command-line tool provided by Erda for developers, which allows you to easily build applications on terminal devices.

## Download and Install

### macOS

```bash
wget -O /usr/local/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/mac/erda-2.1-alpha && chmod +x /usr/local/bin/erda-cli
```

### Linux

```bash
wget -O /usr/bin/erda-cli https://erda-release.oss-cn-hangzhou.aliyuncs.com/cli/linux/erda-2.1-alpha && chmod +x /usr/bin/erda-cli
```

## Verification

After installation, you can view the version information via `erda-cli version`.

```shell
$ erda-cli version
Version: 2.1-alpha
BuildTime: 2022-03-11 14:09:49
GoVersion: go version go1.16.5 darwin/arm64
CommitID: 389d769e76e600e4b9993db26c279c21e91f8297
```

You can list all available Erda commands via `erda-cli help`, and then view detailed usage via `help` of the subcommands.

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
### Autocomplete
You can see how to configure autocomplete for multiple terminals with the `erda-cli completion -h` command.
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
For example, on a Mac, you can configure the autocomplete of zsh with the help information.
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
After configuration, it is as follows:
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
