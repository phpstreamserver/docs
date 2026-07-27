---
title: Configuration
---

# Configuration
PHPStreamServer allows you to define settings at various levels of the application.  
Configurations can be applied in the **Server**, **Plugin**, or **Worker** constructors.  
It is recommended to use named parameters when specifying configuration options.

```php
<?php

use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\SupervisedWorker;
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
```

## Server Configuration
Server-level configuration defines global settings that apply to the entire application and impact all workers.

| Parameter      | Type   | Default        | Description                                                                                |
|----------------|--------|----------------|--------------------------------------------------------------------------------------------|
| `pidFile`      | string | *not&nbsp;set* | Optional. Path to the pid file.                                                            |
| `socketFile`   | string | *not&nbsp;set* | Optional. Path to the Unix socket file used for inter-process communication.               |
| `stopTimeout`  | int    | 10             | Optional. Time to wait (in seconds) before forcefully terminating workers during shutdown. |
| `restartDelay` | float  | 0.25           | Optional. Delay between worker restarts.                                                   |

## Plugin Configuration
Plugin-level configuration defines settings specific to individual plugins.
See the plugins documentation for detailed options and examples.  
[Read more →](/docs/plugins/)

## Worker Configuration
Worker-level configuration applies to individual workers, allowing you to control their specific behavior.
PHPStreamServer includes several built-in worker types, and plugins can add additional worker types to extend functionality.  
Additional worker types are available through plugins.  
[Read more →](/docs/plugins/)

### ⚙️ SupervisedWorker
Worker class: [SupervisedWorker](https://github.com/phpstreamserver/core/blob/main/src/Worker/SupervisedWorker.php)  
This worker type is designed to run long-running PHP code.

| Parameter          | Type                 | Default        | Description                                                           |
|--------------------|----------------------|----------------|-----------------------------------------------------------------------|
| `name`             | string               | *not&nbsp;set* | Optional. The name associated with the worker process.                |
| `count`            | int                  | 1              | Optional. The number of processes to start.                           |
| `reloadable`       | bool                 | true           | Optional. Whether the worker can be reloaded with the reload command. |
| `user`             | string               | *not&nbsp;set* | Optional. Unix user of process. Current user by default.              |
| `group`            | string               | *not&nbsp;set* | Optional. Unix group of process. Current group by default.            |
| `onStart`          | Closure              | *not&nbsp;set* | Optional. A callback function executed when the worker starts.        |
| `onStop`           | Closure              | *not&nbsp;set* | Optional. A callback function executed when the worker stops.         |
| `onReload`         | Closure              | *not&nbsp;set* | Optional. A callback function executed when the worker reloads.       |
| `reloadStrategies` | [ReloadStrategy[]](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ReloadStrategy.php) | *not&nbsp;set* | Optional. The strategies used to reload the worker.                   |

### ⚙️ ExecutableWorker
Worker class: [ExecutableWorker](https://github.com/phpstreamserver/core/blob/main/src/Worker/ExecutableWorker.php)  
This worker type is designed to run external processes, allowing PHPStreamServer to manage and supervise programs or scripts outside of PHP.

| Parameter          | Type   | Default        | Description                                                           |
|--------------------|--------|----------------|-----------------------------------------------------------------------|
| `name`             | string | *not&nbsp;set* | Optional. The name associated with the worker process.                |
| `count`            | int    | 1              | Optional. The number of processes to start.                           |
| `reloadable`       | bool   | true           | Optional. Whether the worker can be reloaded with the reload command. |
| `user`             | string | *not&nbsp;set* | Optional. Unix user of process. Current user by default.              |
| `group`            | string | *not&nbsp;set* | Optional. Unix group of process. Current group by default.            |
| `command`          | string | *not&nbsp;set* | The external command or script to execute.                            |

## Reload Strategies
Reload strategies in PHPStreamServer define the rules that determine when workers should be restarted.
PHPStreamServer provides several built-in reload strategies out of the box, and plugins can add new ones.  
Additional reload strategies are available through plugins.  
[Read more →](/docs/plugins/)

### 🔄️ TTLReloadStrategy
Reload strategy class: [TTLReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/TTLReloadStrategy.php)  
Reloads a worker after a specified time-to-live (TTL) interval.
This periodic restart helps prevent potential issues caused by long-running processes.

| Parameter | Type | Default        | Description                       |
|--------|------|----------------|-----------------------------------|
| `ttl`  | int  | *not&nbsp;set* | Time-to-live interval in seconds. |

### 🔄️ MaxMemoryReloadStrategy
Reload strategy class: [MaxMemoryReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/MaxMemoryReloadStrategy.php)  
Reloads a worker when its memory usage exceeds a specified threshold.
This helps control memory leaks and prevents excessive memory consumption.

| Parameter   | Type   | Default        | Description                            |
|-------------|--------|----------------|----------------------------------------|
| `maxMemory` | int    | *not&nbsp;set* | Memory consumption threshold in bytes. |

### 🔄️ ExceptionReloadStrategy
Reload strategy class: [ExceptionReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ExceptionReloadStrategy.php)  
Reloads a worker when an exception is thrown, except for those explicitly excluded from triggering a reload.
This ensures that workers do not remain in an unexpected state after encountering an error.

| Parameter           | Type           | Default        | Description                                                               |
|---------------------|----------------|----------------|---------------------------------------------------------------------------|
| `allowedExceptions` | class-string[] | *not&nbsp;set* | Optional. A list of exception class names that will not trigger a reload. |

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

### ▶️  RegisterWorkerCommand
Command class: [RegisterWorkerCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/RegisterWorkerCommand.php)  
Registers a worker and returns its assigned ID.

| Parameter          | Type                | Default        | Description                 |
|--------------------|---------------------|----------------|-----------------------------|
| `worker` | [WorkerInterface](https://github.com/phpstreamserver/core/blob/main/src/Core/src/WorkerInterface.php) | *not&nbsp;set* | Configured worker instance. |

### ▶️  UnregisterWorkerCommand
Command class: [UnregisterWorkerCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/UnregisterWorkerCommand.php)  
Unregisters a worker using its assigned ID.

| Parameter         | Type | Default        | Description        |
|-------------------|------|----------------|--------------------|
| `workerId` | int  | *not&nbsp;set* | Worker ID to unregister.  |

### ▶️  ReloadServerCommand
Command class: [ReloadServerCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/ReloadServerCommand.php)  
Requests a server reload.

### ▶️  StopServerCommand
Command class: [StopServerCommand](https://github.com/phpstreamserver/core/blob/main/src/Command/StopServerCommand.php)  
Requests a graceful server shutdown.

| Parameter         | Type | Default | Description               |
|-------------------|------|---------|---------------------------|
| `code` | int  | 0       | Server process exit code. |
