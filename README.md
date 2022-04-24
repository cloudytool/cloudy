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
$ npm install -g cloudy
$ cloudy COMMAND
running command...
$ cloudy (--version)
cloudy/0.0.0 darwin-x64 node-v16.0.0
$ cloudy --help [COMMAND]
USAGE
  $ cloudy COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cloudy hello PERSON`](#cloudy-hello-person)
* [`cloudy hello world`](#cloudy-hello-world)
* [`cloudy help [COMMAND]`](#cloudy-help-command)
* [`cloudy plugins`](#cloudy-plugins)
* [`cloudy plugins:install PLUGIN...`](#cloudy-pluginsinstall-plugin)
* [`cloudy plugins:inspect PLUGIN...`](#cloudy-pluginsinspect-plugin)
* [`cloudy plugins:install PLUGIN...`](#cloudy-pluginsinstall-plugin-1)
* [`cloudy plugins:link PLUGIN`](#cloudy-pluginslink-plugin)
* [`cloudy plugins:uninstall PLUGIN...`](#cloudy-pluginsuninstall-plugin)
* [`cloudy plugins:uninstall PLUGIN...`](#cloudy-pluginsuninstall-plugin-1)
* [`cloudy plugins:uninstall PLUGIN...`](#cloudy-pluginsuninstall-plugin-2)
* [`cloudy plugins update`](#cloudy-plugins-update)

## `cloudy hello PERSON`

Say hello

```
USAGE
  $ cloudy hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/cloudy/cloudy/blob/v0.0.0/dist/commands/hello/index.ts)_

## `cloudy hello world`

Say hello world

```
USAGE
  $ cloudy hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `cloudy help [COMMAND]`

Display help for cloudy.

```
USAGE
  $ cloudy help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cloudy.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `cloudy plugins`

List installed plugins.

```
USAGE
  $ cloudy plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ cloudy plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `cloudy plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ cloudy plugins:install PLUGIN...

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
  $ cloudy plugins add

EXAMPLES
  $ cloudy plugins:install myplugin 

  $ cloudy plugins:install https://github.com/someuser/someplugin

  $ cloudy plugins:install someuser/someplugin
```

## `cloudy plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ cloudy plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ cloudy plugins:inspect myplugin
```

## `cloudy plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ cloudy plugins:install PLUGIN...

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
  $ cloudy plugins add

EXAMPLES
  $ cloudy plugins:install myplugin 

  $ cloudy plugins:install https://github.com/someuser/someplugin

  $ cloudy plugins:install someuser/someplugin
```

## `cloudy plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ cloudy plugins:link PLUGIN

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
  $ cloudy plugins:link myplugin
```

## `cloudy plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cloudy plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cloudy plugins unlink
  $ cloudy plugins remove
```

## `cloudy plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cloudy plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cloudy plugins unlink
  $ cloudy plugins remove
```

## `cloudy plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cloudy plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cloudy plugins unlink
  $ cloudy plugins remove
```

## `cloudy plugins update`

Update installed plugins.

```
USAGE
  $ cloudy plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
