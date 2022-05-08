Cloudy
=================

<!-- toc -->
* [Usage](#usage)
* [Quick start](#quick-start)
* [Commands](#commands)
<!-- tocstop -->

# Description

**Cloudy** is an "infrastructure as code" tool for managing production-grade cloud clusters. It's based on [Pulumi](https://pulumi.com/) that mostly using [Terraform](https://www.terraform.io/).

Tired of managing tons of information about cloud clusters deployment?
DevOps is not a primary skill in your company?
Your infrastructure is a mess?

**Cloudy is your solution,**
**Spend minutes instead of weeks**

Supported platforms:
- AWS
- GCP (soon)

# Usage
<!-- usage -->
```sh-session
$ npm install -g cloudy
$ cloudy COMMAND
running command...
$ cloudy (--version)
cloudy/0.0.1 darwin-x64 node-v16.0.0
$ cloudy --help [COMMAND]
USAGE
  $ cloudy COMMAND
...
```
<!-- usagestop -->

# Quick start

```sh-session
$ cloudy init aws-dev-cluster
```

# Commands
<!-- commands -->
- [Cloudy](#cloudy)
- [Description](#description)
- [Usage](#usage)
- [Quick start](#quick-start)
- [Commands](#commands)
  - [`cloudy destroy PROJECTNAME`](#cloudy-destroy-projectname)
  - [`cloudy doctor`](#cloudy-doctor)
  - [`cloudy export PROJECTNAME`](#cloudy-export-projectname)
  - [`cloudy help [COMMAND]`](#cloudy-help-command)
  - [`cloudy import PROJECTNAME`](#cloudy-import-projectname)
  - [`cloudy init PROJECTNAME`](#cloudy-init-projectname)
  - [`cloudy preview PROJECTNAME`](#cloudy-preview-projectname)
  - [`cloudy up PROJECTNAME`](#cloudy-up-projectname)

## `cloudy destroy PROJECTNAME`

Destroy Pulumi project deployment

```
USAGE
  $ cloudy destroy [PROJECTNAME] [-r <value>]

FLAGS
  -r, --root=<value>  Root path to the project

DESCRIPTION
  Destroy Pulumi project deployment

EXAMPLES
  $ cloudy destroy aws-cluster
```

_See code: [dist/commands/destroy.ts](https://github.com/cloudy/cloudy/blob/v0.0.1/dist/commands/destroy.ts)_

## `cloudy doctor`

Check CLI issues

```
USAGE
  $ cloudy doctor

DESCRIPTION
  Check CLI issues

EXAMPLES
  $ cloudy doctor
```

_See code: [dist/commands/doctor.ts](https://github.com/cloudy/cloudy/blob/v0.0.1/dist/commands/doctor.ts)_

## `cloudy export PROJECTNAME`

Export Pulumi project state

```
USAGE
  $ cloudy export [PROJECTNAME] [-r <value>]

FLAGS
  -r, --root=<value>  Root path to the project

DESCRIPTION
  Export Pulumi project state

EXAMPLES
  $ cloudy export aws-cluster
```

_See code: [dist/commands/export.ts](https://github.com/cloudy/cloudy/blob/v0.0.1/dist/commands/export.ts)_

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

## `cloudy import PROJECTNAME`

Import Pulumi project state

```
USAGE
  $ cloudy import [PROJECTNAME] [-r <value>]

FLAGS
  -r, --root=<value>  Root path to the project

DESCRIPTION
  Import Pulumi project state

EXAMPLES
  $ cloudy import aws-cluster
```

_See code: [dist/commands/import.ts](https://github.com/cloudy/cloudy/blob/v0.0.1/dist/commands/import.ts)_

## `cloudy init PROJECTNAME`

Initialize a new project

```
USAGE
  $ cloudy init [PROJECTNAME] [-r <value>]

FLAGS
  -r, --root=<value>  Root path to the project

DESCRIPTION
  Initialize a new project

EXAMPLES
  $ cloudy init aws-cluster
```

_See code: [dist/commands/init.ts](https://github.com/cloudy/cloudy/blob/v0.0.1/dist/commands/init.ts)_

## `cloudy preview PROJECTNAME`

Preview Pulumi project deployment update

```
USAGE
  $ cloudy preview [PROJECTNAME] [-r <value>]

FLAGS
  -r, --root=<value>  Root path to the project

DESCRIPTION
  Preview Pulumi project deployment update

EXAMPLES
  $ cloudy preview aws-cluster
```

_See code: [dist/commands/preview.ts](https://github.com/cloudy/cloudy/blob/v0.0.1/dist/commands/preview.ts)_

## `cloudy up PROJECTNAME`

Run Pulumi project deployment update

```
USAGE
  $ cloudy up [PROJECTNAME] [-r <value>]

FLAGS
  -r, --root=<value>  Root path to the project

DESCRIPTION
  Run Pulumi project deployment update

EXAMPLES
  $ cloudy up aws-cluster
```

_See code: [dist/commands/up.ts](https://github.com/cloudy/cloudy/blob/v0.0.1/dist/commands/up.ts)_
<!-- commandsstop -->
