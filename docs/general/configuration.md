---
title: Configuration
---

# Configuration
PHPStreamServer allows you to define settings at various levels of the application.  
Configurations can be applied in the **Server**, **Plugin**, or **Worker** constructors.  
It is recommended to use named parameters when specifying configuration options.

```php
use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\WorkerProcess;
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
    new WorkerProcess(
        // Worker configuration
    ),
);
```

## Server Configuration
Server-level configuration defines global settings that apply to the entire application and impact all workers.

| Option         | Type   | Default        | Description                                                                                        |
|----------------|--------|----------------|----------------------------------------------------------------------------------------------------|
| `pidFile`      | string | *not&nbsp;set* | Optional. Path to the pid file.                                                                    |
| `socketFile`   | string | *not&nbsp;set* | Optional. Path to the Unix socket file used for inter-process communication.                       |
| `stopTimeout`  | int    | 10             | Optional. Maximum time to wait (in seconds) before forcefully terminating workers during shutdown. |
| `restartDelay` | float  | 0.25           | Optional. Delay between worker restarts.                                                           |

## Plugin Configuration
Plugin-level configuration defines settings specific to individual plugins.
See the plugins documentation for detailed options and examples.  
[Read more →](/docs/plugins/)

## Worker Configuration
Worker-level configuration applies to individual workers, allowing you to control their specific behavior.
PHPStreamServer includes several built-in worker types, and plugins can add additional worker types to extend functionality.
Workers can be added to the server using the `Server::addWorker()` method.

### ⚙️ WorkerProcess
Worker class: [WorkerProcess](https://github.com/phpstreamserver/core/blob/main/src/Worker/WorkerProcess.php)  
This worker type is designed to run long-running PHP code.

| Option             | Type                 | Default        | Description                                                           |
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

### ⚙️ ExternalProcess
Worker class: [ExternalProcess](https://github.com/phpstreamserver/core/blob/main/src/Worker/ExternalProcess.php)  
This worker type is designed to run external processes, allowing PHPStreamServer to manage and supervise programs or scripts outside of PHP.

| Option             | Type   | Default        | Description                                                           |
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

### 🔄️ TTLReloadStrategy
Reload strategy class: [TTLReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/TTLReloadStrategy.php)  
Reloads a worker after a specified time-to-live (TTL) interval.
This periodic restart helps prevent potential issues caused by long-running processes.

| Option | Type | Default        | Description                       |
|--------|------|----------------|-----------------------------------|
| `ttl`  | int  | *not&nbsp;set* | Time-to-live interval in seconds. |

### 🔄️ MaxMemoryReloadStrategy
Reload strategy class: [MaxMemoryReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/MaxMemoryReloadStrategy.php)  
Reloads a worker when its memory usage exceeds a specified threshold.
This helps control memory leaks and prevents excessive memory consumption.

| Option      | Type   | Default        | Description                            |
|-------------|--------|----------------|----------------------------------------|
| `maxMemory` | int    | *not&nbsp;set* | Memory consumption threshold in bytes. |

### 🔄️ ExceptionReloadStrategy
Reload strategy class: [ExceptionReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ExceptionReloadStrategy.php)  
Reloads a worker when an exception is thrown, except for those explicitly excluded from triggering a reload.
This ensures that workers do not remain in an unexpected state after encountering an error.

| Option              | Type           | Default        | Description                                                               |
|---------------------|----------------|----------------|---------------------------------------------------------------------------|
| `allowedExceptions` | class-string[] | *not&nbsp;set* | Optional. A list of exception class names that will not trigger a reload. |
