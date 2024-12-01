---
title: Configuration
---

# Configuration

PHPStreamServer allows you to define settings at different levels of the application.
Configurations can be applied in the **Server** constructor, **Plugin** constructor, and **Worker** constructor.  
It is recommended to use named parameters when defining configuration options.

```php
use PHPStreamServer\Core\Plugin\Supervisor\WorkerProcess;
use PHPStreamServer\Core\Server;
use PHPStreamServer\Plugin\HttpServer\HttpServerPlugin;

$server = new Server(
    // Server-level configuration
);

$server->addPlugin(
    new HttpServerPlugin(
        // Plugin-level configuration
    ),
);

$server->addWorker(
    new WorkerProcess(
        // Worker-level configuration
    ),
);
```

## Server-level configuration

Server-level configuration defines global settings that apply to the entire application and affect all workers.

| Option         | Type   | Default        | Description                                                                           |
|----------------|--------|----------------|---------------------------------------------------------------------------------------|
| `pidFile`      | string | *not&nbsp;set* | Optional. Path to the pid file.                                                       |
| `socketFile`   | string | *not&nbsp;set* | Optional. Path to the Unix socket file used for inter-process communication.          |
| `stopTimeout`  | int    | 10             | Optional. Maximum time to wait before forcefully terminating workers during shutdown. |
| `restartDelay` | float  | 0.25           | Optional. Delay between worker restarts.                                              |

## Plugin-level configuration

Each plugin has its own specific configuration. See the [Plugins](/docs/plugins/) page for more details.  
Plugins can be added to the server using the `Server::addPlugin()` method.

## Worker-level configuration

Worker-level configuration applies to individual workers, allowing you to control their specific behavior.
PHPStreamServer provides several built-in worker types out of the box. Additionally, plugins can add new worker types, enhancing functionality.  
Worker can be added to the server using the `Server::addWorker()` method.

Reload strategies in PHPStreamServer define the rules for when workers should be restarted.
PHPStreamServer provides several built-in reload strategies of the box. Additionally, plugins can add new reload strategies, enhancing functionality.

### ⚙️ WorkerProcess

This worker type is designed for running long-running PHP code.

| Option             | Type                                             | Default        | Description                                                           |
|--------------------|--------------------------------------------------|----------------|-----------------------------------------------------------------------|
| `name`             | string                                           | "none"         | Optional. The name associated with the worker process.                |
| `count`            | int                                              | 1              | Optional. The number of processes to start.                           |
| `reloadable`       | bool                                             | true           | Optional. Whether the worker can be reloaded with the reload command. |
| `user`             | string                                           | *not&nbsp;set* | Optional. Unix user of process. Current user by default.              |
| `group`            | string                                           | *not&nbsp;set* | Optional. Unix group of process. Current group by default.            |
| `onStart`          | Closure                                          | *not&nbsp;set* | Optional. A callback function executed when the worker starts.        |
| `onStop`           | Closure                                          | *not&nbsp;set* | Optional. A callback function executed when the worker stops.         |
| `onReload`         | Closure                                          | *not&nbsp;set* | Optional. A callback function executed when the worker reloads.       |
| `reloadStrategies` | [ReloadStrategy[]](#%EF%B8%8F-ttlreloadstrategy) | *not&nbsp;set* | Optional. The strategies used to reload the worker.                   |

### ⚙️ ExternalProcess

This worker type is designed for running external programs or scripts, enabling PHPStreamServer to manage external processes outside of PHP.

| Option             | Type   | Default        | Description                                                           |
|--------------------|--------|----------------|-----------------------------------------------------------------------|
| `name`             | string | "none"         | Optional. The name associated with the worker process.                |
| `count`            | int    | 1              | Optional. The number of processes to start.                           |
| `reloadable`       | bool   | true           | Optional. Whether the worker can be reloaded with the reload command. |
| `user`             | string | *not&nbsp;set* | Optional. Unix user of process. Current user by default.              |
| `group`            | string | *not&nbsp;set* | Optional. Unix group of process. Current group by default.            |
| `command`          | string | *not&nbsp;set* | The external command or script to execute.                            |

### 🔄️ TTLReloadStrategy

Reloads a worker after a specified time-to-live (TTL) interval.
This ensures that workers are periodically restarted, which can help prevent issues caused by long-running processes.

| Option | Type | Default        | Description                       |
|--------|------|----------------|-----------------------------------|
| `ttl`  | int  | *not&nbsp;set* | Time-to-live interval in seconds. |

### 🔄️ MaxMemoryReloadStrategy

Reloads a worker when its memory consumption exceeds a specified threshold.
This helps manage memory leaks and prevents excessive memory usage.

| Option      | Type   | Default        | Description                            |
|-------------|--------|----------------|----------------------------------------|
| `maxMemory` | int    | *not&nbsp;set* | Memory consumption threshold in bytes. |

### 🔄️ ExceptionReloadStrategy

Reloads a worker when an exception is thrown, except for specified exceptions that are excluded from triggering a reload.
This ensures workers don't remain in an unexpected state after encountering an error.

| Option              | Type           | Default        | Description                                                               |
|---------------------|----------------|----------------|---------------------------------------------------------------------------|
| `allowedExceptions` | class-string[] | *not&nbsp;set* | Optional. A list of exception class names that will not trigger a reload. |
