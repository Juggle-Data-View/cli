oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @juggle-data-view/cli
$ JuggleDV COMMAND
running command...
$ JuggleDV (--version)
@juggle-data-view/cli/0.0.0 linux-x64 node-v17.9.0
$ JuggleDV --help [COMMAND]
USAGE
  $ JuggleDV COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`JuggleDV help [COMMAND]`](#juggledv-help-command)
* [`JuggleDV plugins`](#juggledv-plugins)
* [`JuggleDV plugins:install PLUGIN...`](#juggledv-pluginsinstall-plugin)
* [`JuggleDV plugins:inspect PLUGIN...`](#juggledv-pluginsinspect-plugin)
* [`JuggleDV plugins:install PLUGIN...`](#juggledv-pluginsinstall-plugin-1)
* [`JuggleDV plugins:link PLUGIN`](#juggledv-pluginslink-plugin)
* [`JuggleDV plugins:uninstall PLUGIN...`](#juggledv-pluginsuninstall-plugin)
* [`JuggleDV plugins:uninstall PLUGIN...`](#juggledv-pluginsuninstall-plugin-1)
* [`JuggleDV plugins:uninstall PLUGIN...`](#juggledv-pluginsuninstall-plugin-2)
* [`JuggleDV plugins update`](#juggledv-plugins-update)

## `JuggleDV help [COMMAND]`

Display help for JuggleDV.

```
USAGE
  $ JuggleDV help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for JuggleDV.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `JuggleDV plugins`

List installed plugins.

```
USAGE
  $ JuggleDV plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ JuggleDV plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `JuggleDV plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ JuggleDV plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ JuggleDV plugins add

EXAMPLES
  $ JuggleDV plugins:install myplugin 

  $ JuggleDV plugins:install https://github.com/someuser/someplugin

  $ JuggleDV plugins:install someuser/someplugin
```

## `JuggleDV plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ JuggleDV plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ JuggleDV plugins:inspect myplugin
```

## `JuggleDV plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ JuggleDV plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ JuggleDV plugins add

EXAMPLES
  $ JuggleDV plugins:install myplugin 

  $ JuggleDV plugins:install https://github.com/someuser/someplugin

  $ JuggleDV plugins:install someuser/someplugin
```

## `JuggleDV plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ JuggleDV plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ JuggleDV plugins:link myplugin
```

## `JuggleDV plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ JuggleDV plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ JuggleDV plugins unlink
  $ JuggleDV plugins remove
```

## `JuggleDV plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ JuggleDV plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ JuggleDV plugins unlink
  $ JuggleDV plugins remove
```

## `JuggleDV plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ JuggleDV plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ JuggleDV plugins unlink
  $ JuggleDV plugins remove
```

## `JuggleDV plugins update`

Update installed plugins.

```
USAGE
  $ JuggleDV plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
