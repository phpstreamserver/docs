---
title: Configuration
---

# Configuration
PHPStreamServer allows you to define settings at various levels of the application.  
Configuration parameters can be passed to **Server**, **Plugin**, or **Worker** constructors.  
Use named parameters when specifying configuration parameters.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\SupervisedWorker;
use PHPStreamServer\Core\Worker\WorkerFactory;
use PHPStreamServer\Plugin\HttpServer\HttpServerPlugin;

$server = new Server(
    // Server configuration
);

$server->addPlugin(
    new HttpServerPlugin(
        // Plugin configuration
    ),
);

$server->addWorker(
    new SupervisedWorker(
        // Worker configuration
    ),
);

$server->addWorkerFactory(
    new WorkerFactory(
        // WorkerFactory configuration
    ),
);

exit($server->run());
```

## Server Configuration
Server-level configuration controls application-wide runtime behavior.

| Parameter      | Type         | Default | Description                                                                                                                     |
|----------------|--------------|---------|---------------------------------------------------------------------------------------------------------------------------------|
| `pidFile`      | string\|null | null    | Optional. By default, PHPStreamServer derives the path in `/run` when writable, or in the system temporary directory otherwise. |
| `socketFile`   | string\|null | null    | Optional. By default, PHPStreamServer derives the path in `/run` when writable, or in the system temporary directory otherwise. |
| `stopTimeout`  | int\|null    | null    | Optional. Seconds to wait before forcefully terminating workers. Defaults to 10.                                                |
| `restartDelay` | float\|null  | null    | Optional. Delay, in seconds, between process restarts. Defaults to 0.25.                                                        |

## Plugin Configuration
Plugin-level configuration controls the capabilities provided by each plugin.
See the plugins documentation for detailed options and examples.  
[Read more →](/docs/plugins/)

## Worker Configuration
Worker-level configuration controls how individual workers run. PHPStreamServer provides two built-in worker types, and plugins can provide additional types.  
[Read more →](/docs/plugins/)

Workers use the server process's effective user and group by default. If `user` is set without `group`, the server process's effective group is retained.

### ⚙️ SupervisedWorker
Worker class: [SupervisedWorker](https://github.com/phpstreamserver/core/blob/main/src/Worker/SupervisedWorker.php)  
This worker type is designed to run long-running PHP code.

| Parameter          | Type                                                                                                        | Default | Description                                                                            |
|--------------------|-------------------------------------------------------------------------------------------------------------|---------|----------------------------------------------------------------------------------------|
| `name`             | string\|null                                                                                                | null    | Optional. Worker name. Defaults to `worker <id>`.                                      |
| `count`            | int                                                                                                         | 1       | Optional. Number of processes. Must be between `1` and `1024`.                         |
| `reloadable`       | bool                                                                                                        | true    | Optional. Whether the worker can be reloaded.                                          |
| `user`             | string\|null                                                                                                | null    | Optional. Unix user name or user ID (UID).                                             |
| `group`            | string\|null                                                                                                | null    | Optional. Unix group name or group ID (GID).                                           |
| `onStart`          | Closure\|null                                                                                               | null    | Optional. `Closure(SupervisedWorker): void` callback executed when the worker starts.  |
| `onStop`           | Closure\|null                                                                                               | null    | Optional. `Closure(SupervisedWorker): void` callback executed when the worker stops.   |
| `onReload`         | Closure\|null                                                                                               | null    | Optional. `Closure(SupervisedWorker): void` callback executed when the worker reloads. |
| `reloadStrategies` | [ReloadStrategy[]](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ReloadStrategy.php) | []      | Optional. Reload strategies assigned to the worker.                                    |

### ⚙️ ExecutableWorker
Worker class: [ExecutableWorker](https://github.com/phpstreamserver/core/blob/main/src/Worker/ExecutableWorker.php)  
This worker type is designed to run external processes, allowing PHPStreamServer to manage and supervise programs or scripts outside of PHP.

| Parameter    | Type         | Default    | Description                                                    |
|--------------|--------------|------------|----------------------------------------------------------------|
| `command`    | string       | *required* | External command or script.                                    |
| `name`       | string\|null | null       | Optional. Worker name. Defaults to `worker <id>`.              |
| `count`      | int          | 1          | Optional. Number of processes. Must be between `1` and `1024`. |
| `reloadable` | bool         | true       | Optional. Whether the worker can be reloaded.                  |
| `user`       | string\|null | null       | Optional. Unix user name or user ID (UID).                     |
| `group`      | string\|null | null       | Optional. Unix group name or group ID (GID).                   |

## WorkerFactory Configuration
Worker factory class: [WorkerFactory](https://github.com/phpstreamserver/core/blob/main/src/Worker/WorkerFactory.php)  
A worker factory defines workers that can be created and started on demand. Unlike a worker passed to `Server::addWorker()`, registering a factory does not create or start a worker. The factory is invoked when the master process receives a [StartWorkerCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/StartWorkerCommand.php) with a matching `factoryId`.

| Parameter | Type    | Default    | Description                                                                                     |
|-----------|---------|------------|-------------------------------------------------------------------------------------------------|
| `id`      | string  | *required* | Unique factory identifier. Pass this value as `StartWorkerCommand::$factoryId`.                 |
| `factory` | Closure | *required* | Creates a new worker from the runtime parameters supplied by `StartWorkerCommand::$parameters`. |

The `factory` closure has the type `Closure(array<string, mixed>=): WorkerInterface`. It must declare a return type that implements [WorkerInterface](https://github.com/phpstreamserver/core/blob/main/src/WorkerInterface.php). It may accept no parameters or one `array` parameter.

## Reload Strategies
Reload strategies determine when reloadable workers should restart. PHPStreamServer provides three built-in strategies, and plugins can provide additional strategies.  
[Read more →](/docs/plugins/)

### 🔄️ TTLReloadStrategy
Reload strategy class: [TTLReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/TTLReloadStrategy.php)  
Reloads a worker after a specified time-to-live (TTL) interval.
This periodic restart helps prevent potential issues caused by long-running processes.

| Parameter | Type | Default    | Description                       |
|-----------|------|------------|-----------------------------------|
| `ttl`     | int  | *required* | Time-to-live interval in seconds. |

### 🔄️ MaxMemoryReloadStrategy
Reload strategy class: [MaxMemoryReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/MaxMemoryReloadStrategy.php)  
Checks memory usage and reloads the worker when it exceeds the configured threshold.

| Parameter   | Type | Default    | Description                            |
|-------------|------|------------|----------------------------------------|
| `maxMemory` | int  | *required* | Memory consumption threshold in bytes. |

### 🔄️ ExceptionReloadStrategy
Reload strategy class: [ExceptionReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ExceptionReloadStrategy.php)  
Reloads a worker after an unexpected `Throwable`. By default, compile errors and HTTP errors do not trigger a reload.

| Parameter           | Type     | Default | Description                                                   |
|---------------------|----------|---------|---------------------------------------------------------------|
| `allowedExceptions` | string[] | []      | Optional. Throwable classes that should not trigger a reload. |

## Commands
Commands allow you to communicate with the master process and manage the server.
Additional command implementations are available through plugins.  
[Read more →](/docs/plugins/)

### ▶️  GetWorkersCommand
Command class: [GetWorkersCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/GetWorkersCommand.php)  
Retrieves metadata for workers registered with the supervisor.

### ▶️  GetProcessesCommand
Command class: [GetProcessesCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/GetProcessesCommand.php)  
Retrieves metadata for processes managed by the supervisor.

### ▶️  GetNetworkInfoCommand
Command class: [GetNetworkInfoCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/GetNetworkInfoCommand.php)  
Retrieves network traffic and active connection information for worker processes.

### ▶️  GetServerStatusCommand
Command class: [GetServerStatusCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/GetServerStatusCommand.php)  
Retrieves runtime information about the running server.

### ▶️  StartWorkerCommand
Command class: [StartWorkerCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/StartWorkerCommand.php)  
Starts a worker using a registered `WorkerFactory` and returns its assigned ID, or `0` if startup fails.

| Parameter    | Type                    | Default    | Description                                    |
|--------------|-------------------------|------------|------------------------------------------------|
| `factoryId`  | string                  | *required* | ID of the registered worker factory.           |
| `parameters` | `array<string, mixed>`  | []         | Runtime parameters passed to the factory.      |

### ▶️  StopWorkerCommand
Command class: [StopWorkerCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/StopWorkerCommand.php)  
Stops all processes of a factory-created worker.

| Parameter  | Type | Default    | Description                           |
|------------|------|------------|---------------------------------------|
| `workerId` | int  | *required* | Assigned ID of the worker to stop.    |

### ▶️  ReloadServerCommand
Command class: [`ReloadServerCommand`](https://github.com/phpstreamserver/core/blob/main/src/Command/ReloadServerCommand.php)  
Requests a server reload.

| Parameter      | Type | Default | Description                                                                               |
|----------------|------|---------|-------------------------------------------------------------------------------------------|
| `opcacheReset` | bool | false   | Whether to invalidate scripts cached by OPCache when OPCache is enabled before reload. |

### ▶️  StopServerCommand
Command class: [StopServerCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/StopServerCommand.php)  
Requests a graceful server shutdown.

| Parameter | Type | Default | Description               |
|-----------|------|---------|---------------------------|
| `code`    | int  | 0       | Server process exit code. |
