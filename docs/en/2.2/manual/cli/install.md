# CLI Installation

CLI is a command-line tool provided by Erda for developers, which allows you to easily build applications on terminal devices.

## Operations

```bash
curl https://raw.githubusercontent.com/erda-project/erda/master/tools/cli/install.sh | sh
```

:::tip Tips

Installation with a script will select the appropriate binary installation file based on the machine, with only macOS and Linux supported now. The latest release version is installed by default, and it relies on the jq and curl command tools.

:::

### Version

* **Historical version of 1.5.0**

   ```bash
   curl https://raw.githubusercontent.com/erda-project/erda/master/tools/cli/install.sh | sh -s -- v1.5.0
   ```

* **Development version**

   ```bash
   curl https://raw.githubusercontent.com/erda-project/erda/master/tools/cli/install.sh | sh -s -- alpha
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
### Autocomplete
You can see how to configure autocomplete for multiple terminals with the `erda-cli completion -h` command (zsh is recommended for macOS).
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

### Configuration

Since the CLI will call Git commands for code-related operations, it is recommended to set as follows:

```shell
git config --global user.name <YOUR_USERNAME>
git config --global user.email <YOUR_EMAIL>
git config --global credential.helper store
```

## Container Image Installation

The CLI supports installation and uses via container images.

```bash
docker pull registry.erda.cloud/erda/cli:2.1-alpha
```

After installation, you can view the version information via `erda-cli version`.

```bash
$ docker run --rm registry.erda.cloud/erda/cli:2.1-alpha version
Version: 2.1
BuildTime: 2022-03-23 16:31:34
GoVersion: go version go1.16.3 linux/amd64
CommitID: affb9103763f29cdf0461c43434ef13efb08cd29
DockerImage: registry.erda.cloud/erda/cli:2.1-alpha-20220323162540-affb910
```

### Version

* **Stable version**: Corresponds to Erda version 2.1.x, and the image version is 2.1, that is, `registry.erda.cloud/erda/cli:2.1`.

* **Internal version**: Corresponds to Erda version 2.1.x, and the image version is 2.1-alpha, that is, `registry.erda.cloud/erda/cli:2.1-alpha`.

### Configuration

Most CLI commands rely on local session files, local workspaces, and more, so it is necessary to mount multiple files to the running container.

```bash
docker run --rm -it -v ${HOME}:/root -e workspace=${PWD} -e home=${HOME} registry.erda.cloud/erda/cli:2.1-alpha
```

Use the `-e` parameter to pass the home directory and the current directory, and `-v` to mount the home directory.

- Given that the container command is long, you can use the `alias` short command:

   ```bash
   alias erda-cli='docker run --rm -it -v ${HOME}:/root -e workspace=${PWD} -e home=${HOME} registry.erda.cloud/erda/cli:2.1-alpha'
   ```

- Since the CLI will call Git commands for code-related operations, it is recommended to set as follows:

   ```shell
   git config --global user.name <YOUR_USERNAME>
   git config --global user.email <YOUR_EMAIL>
   git config --global credential.helper store
   ```
