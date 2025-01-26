---
title: Configuration
---

# Configuration

PHPStreamServer allows you to define settings at different levels of the application.  
Configurations can be applied in the **Server** constructor, **Plugin** constructor, and **Worker** constructor.  
It is recommended to use named parameters when defining configuration options.

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

## Server configuration

Server-level configuration defines global settings that apply to the entire application and affect all workers.

| Option         | Type   | Default        | Description                                                                           |
|----------------|--------|----------------|---------------------------------------------------------------------------------------|
| `pidFile`      | string | *not&nbsp;set* | Optional. Path to the pid file.                                                       |
| `socketFile`   | string | *not&nbsp;set* | Optional. Path to the Unix socket file used for inter-process communication.          |
| `stopTimeout`  | int    | 10             | Optional. Maximum time to wait before forcefully terminating workers during shutdown. |
| `restartDelay` | float  | 0.25           | Optional. Delay between worker restarts.                                              |

## Plugin configuration

### [🔌](/docs/plugins/http-server) [HttpServerPlugin](https://github.com/phpstreamserver/http-server/blob/main/src/HttpServerPlugin.php)

This is the part of [Http Server Plugin](/docs/plugins/http-server)

| Option                  | Type   | Default | Description                                                                        |
|-------------------------|--------|---------|------------------------------------------------------------------------------------|
| `http2Enable`           | bool   | true    | Optional. Enables support for HTTP/2 protocol.                                     |
| `httpConnectionTimeout` | int    | 60      | Optional. Timeout duration for idle HTTP connections.                              |
| `httpHeaderSizeLimit`   | int    | 32768   | Optional. Maximum allowed size for HTTP headers.                                   |
| `httpBodySizeLimit`     | int    | 131072  | Optional. Maximum allowed size for the HTTP request body.                          |
| `gzipMinLength`         | int    | 860     | Optional. Minimum response size required to enable gzip compression.               |
| `gzipTypesRegex`        | string | *       | Optional. Regular expression to match content types eligible for gzip compression. |

\* `#^(?:text/.*+|[^/]*+/xml|[^+]*\+xml|application/(?:json|(?:x-)?javascript))$#i`

### [🔌](/docs/plugins/scheduler) [SchedulerPlugin](https://github.com/phpstreamserver/scheduler/blob/main/src/SchedulerPlugin.php)

This is the part of [Scheduler Plugin](/docs/plugins/scheduler)

This plugin does not have any specific configurable options.

### [🔌](/docs/plugins/logger) [LoggerPlugin](https://github.com/phpstreamserver/logger/blob/main/src/LoggerPlugin.php)

This is the part of [Logger Plugin](/docs/plugins/logger)

| Option     | Type                                             | Default         | Description                                                          |
|------------|--------------------------------------------------|-----------------|----------------------------------------------------------------------|
| `handlers` | ...[Handler](/docs/plugins/logger#configuration) | *not&nbsp;set*  | A list of logger handlers that define the destinations for the logs. |

### [🔌](/docs/plugins/file-monitor) [FileMonitorPlugin](https://github.com/phpstreamserver/file-monitor/blob/main/src/FileMonitorPlugin.php)

This is the part of [File Monitor Plugin](/docs/plugins/file-monitor)

| Option  | Type                                                | Default         | Description                                                            |
|---------|-----------------------------------------------------|-----------------|------------------------------------------------------------------------|
| `watch` | ...[WatchDir](/docs/plugins/file-monitor#-watchdir) | *not&nbsp;set*  | List of WatchDir objects that define the files to monitor for changes. |

### [🔌](/docs/plugins/metrics) [MetricsPlugin](https://github.com/phpstreamserver/metrics/blob/main/src/MetricsPlugin.php)

This is the part of [Metrics Plugin](/docs/plugins/metrics)

| Option   | Type                                                                                      | Default        | Description                                           |
|----------|-------------------------------------------------------------------------------------------|----------------|-------------------------------------------------------|
| `listen` | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *not&nbsp;set* | The address at which the metrics server is listening. |

## Worker configuration

Worker-level configuration applies to individual workers, allowing you to control their specific behavior.
PHPStreamServer provides several built-in worker types out of the box. Additionally, plugins can add new worker types, enhancing functionality.  
Worker can be added to the server using the `Server::addWorker()` method.

### ⚙️ [WorkerProcess](https://github.com/phpstreamserver/core/blob/main/src/Worker/WorkerProcess.php)

This worker type is designed for running long-running PHP code.

| Option             | Type                                                | Default        | Description                                                           |
|--------------------|-----------------------------------------------------|----------------|-----------------------------------------------------------------------|
| `name`             | string                                              | *not&nbsp;set* | Optional. The name associated with the worker process.                |
| `count`            | int                                                 | 1              | Optional. The number of processes to start.                           |
| `reloadable`       | bool                                                | true           | Optional. Whether the worker can be reloaded with the reload command. |
| `user`             | string                                              | *not&nbsp;set* | Optional. Unix user of process. Current user by default.              |
| `group`            | string                                              | *not&nbsp;set* | Optional. Unix group of process. Current group by default.            |
| `onStart`          | Closure                                             | *not&nbsp;set* | Optional. A callback function executed when the worker starts.        |
| `onStop`           | Closure                                             | *not&nbsp;set* | Optional. A callback function executed when the worker stops.         |
| `onReload`         | Closure                                             | *not&nbsp;set* | Optional. A callback function executed when the worker reloads.       |
| `reloadStrategies` | [ReloadStrategy[]](/docs/general/reload-strategies) | *not&nbsp;set* | Optional. The strategies used to reload the worker.                   |

### ⚙️ [ExternalProcess](https://github.com/phpstreamserver/core/blob/main/src/Worker/ExternalProcess.php)

This worker type is designed for running external programs or scripts, enabling PHPStreamServer to manage external processes outside of PHP.

| Option             | Type   | Default        | Description                                                           |
|--------------------|--------|----------------|-----------------------------------------------------------------------|
| `name`             | string | *not&nbsp;set* | Optional. The name associated with the worker process.                |
| `count`            | int    | 1              | Optional. The number of processes to start.                           |
| `reloadable`       | bool   | true           | Optional. Whether the worker can be reloaded with the reload command. |
| `user`             | string | *not&nbsp;set* | Optional. Unix user of process. Current user by default.              |
| `group`            | string | *not&nbsp;set* | Optional. Unix group of process. Current group by default.            |
| `command`          | string | *not&nbsp;set* | The external command or script to execute.                            |

### ⚙️[🔌](/docs/plugins/http-server) [HttpServerProcess](https://github.com/phpstreamserver/http-server/blob/main/src/Worker/HttpServerProcess.php)

This is the part of [Http Server Plugin](/docs/plugins/http-server)

This worker type is designed to handle incoming HTTP requests asynchronously.

| Option                 | Type                                                                                                                                                                           | Default        | Description                                                              |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|--------------------------------------------------------------------------|
| `listen`               | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php)\|[Listen[]](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *not&nbsp;set* | The address at which the server is listening.                            |
| `name`                 | string                                                                                                                                                                         | "HTTP Server"  | Optional. The name associated with the worker process.                   |
| `count`                | int                                                                                                                                                                            | 1              | Optional. The number of processes to start.                              |
| `reloadable`           | bool                                                                                                                                                                           | true           | Optional. Whether the worker can be reloaded with the reload command.    |
| `user`                 | string                                                                                                                                                                         | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                 |
| `group`                | string                                                                                                                                                                         | *not&nbsp;set* | Optional. Unix group of process. Current group by default.               |
| `onStart`              | Closure                                                                                                                                                                        | *not&nbsp;set* | Optional. A callback function executed when the worker starts.           |
| `onRequest`            | Closure                                                                                                                                                                        | *not&nbsp;set* | Optional. A callback function executed when an HTTP request is received. |
| `onStop`               | Closure                                                                                                                                                                        | *not&nbsp;set* | Optional. A callback function executed when the worker stops.            |
| `onReload`             | Closure                                                                                                                                                                        | *not&nbsp;set* | Optional. A callback function executed when the worker reloads.          |
| `middleware`           | [Middleware[]](https://github.com/amphp/http-server/blob/3.x/src/Middleware.php)                                                                                               | *not&nbsp;set* | Optional. A list of middlewares for processing HTTP requests.            |
| `reloadStrategies`     | [ReloadStrategy[]](/docs/general/reload-strategies)                                                                                                                            | *not&nbsp;set* | Optional. The strategies used to reload the worker.                      |
| `serverDir`            | string                                                                                                                                                                         | *not&nbsp;set* | Optional. The directory to serve static files from.                      |
| `accessLog`            | bool                                                                                                                                                                           | true           | Optional. Whether to log incoming HTTP requests.                         |
| `gzip`                 | bool                                                                                                                                                                           | false          | Optional. Enables gzip compression.                                      |
| `connectionLimit`      | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of connections per worker.                  |
| `connectionLimitPerIp` | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of connections allowed per IP.              |
| `concurrencyLimit`     | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of concurrent HTTP requests per worker.     |

### ⚙️[🔌](/docs/plugins/scheduler) [PeriodicProcess](https://github.com/phpstreamserver/scheduler/blob/main/src/Worker/PeriodicProcess.php)

This is the part of [Scheduler Plugin](/docs/plugins/scheduler)

This worker type is designed to execute tasks periodically.  
The `schedule` option can be specified in one of the following formats:
- Number of seconds (e.g. `60`)
- An ISO8601 datetime format (e.g. `2025-01-01 00:00:00`)
- An ISO8601 duration format (e.g. `PT1M`)
- A [relative date format](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative) (e.g. `1 minute`)
- A cron expression (e.g. `*/1 * * * *`)

| Option     | Type    | Default        | Description                                                                 |
|------------|---------|----------------|-----------------------------------------------------------------------------|
| `name`     | string  | *not&nbsp;set* | Optional. The name associated with the worker process.                      |
| `schedule` | int     | "1 minute"     | Optional. Schedule in one of the formats described above.                   |
| `jitter`   | int     | 0              | Optional. Jitter in seconds that adds a random time offset to the schedule. |
| `user`     | int     | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                    |
| `group`    | int     | *not&nbsp;set* | Optional. Unix group of process. Current group by default.                  |
| `onStart`  | Closure | *not&nbsp;set* | Optional. A callback function executed when the worker stops.               |

### ⚙️[🔌](/docs/integrations/symfony) [SymfonyHttpServerProcess](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonyHttpServerProcess.php)

This is the part of [Symfony bundle](/docs/integrations/symfony)

This worker type is designed to run symfony application webserver.

| Option                 | Type                                                                                                                                                                           | Default        | Description                                                              |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|--------------------------------------------------------------------------|
| `listen`               | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php)\|[Listen[]](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *not&nbsp;set* | The address at which the server is listening.                            |
| `count`                | int                                                                                                                                                                            | 1              | Optional. The number of processes to start.                              |
| `reloadable`           | bool                                                                                                                                                                           | true           | Optional. Whether the worker can be reloaded with the reload command.    |
| `user`                 | string                                                                                                                                                                         | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                 |
| `group`                | string                                                                                                                                                                         | *not&nbsp;set* | Optional. Unix group of process. Current group by default.               |
| `middleware`           | [Middleware[]](https://github.com/amphp/http-server/blob/3.x/src/Middleware.php)                                                                                               | *not&nbsp;set* | Optional. A list of middlewares for processing HTTP requests.            |
| `reloadStrategies`     | [ReloadStrategy[]](/docs/general/reload-strategies)                                                                                                                            | *not&nbsp;set* | Optional. The strategies used to reload the worker.                      |
| `accessLog`            | bool                                                                                                                                                                           | true           | Optional. Whether to log incoming HTTP requests.                         |
| `gzip`                 | bool                                                                                                                                                                           | false          | Optional. Enables gzip compression.                                      |
| `connectionLimit`      | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of connections per worker.                  |
| `connectionLimitPerIp` | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of connections allowed per IP.              |
| `concurrencyLimit`     | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of concurrent HTTP requests per worker.     |

### ⚙️[🔌](/docs/integrations/symfony) [SymfonyPeriodicProcess](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonyPeriodicProcess.php)

This is the part of [Symfony bundle](/docs/integrations/symfony)

This worker type is designed to run symfony console commands periodically.
The `schedule` option can be specified in one of the following formats:
- Number of seconds (e.g. `60`)
- An ISO8601 datetime format (e.g. `2025-01-01 00:00:00`)
- An ISO8601 duration format (e.g. `PT1M`)
- A [relative date format](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative) (e.g. `1 minute`)
- A cron expression (e.g. `*/1 * * * *`)

| Option     | Type    | Default        | Description                                                                 |
|------------|---------|----------------|-----------------------------------------------------------------------------|
| `command`  | string  | *not&nbsp;set* | Symfony console command name.                                               |
| `schedule` | int     | "1 minute"     | Optional. Schedule in one of the formats described above.                   |
| `jitter`   | int     | 0              | Optional. Jitter in seconds that adds a random time offset to the schedule. |
| `user`     | int     | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                    |
| `group`    | int     | *not&nbsp;set* | Optional. Unix group of process. Current group by default.                  |

### ⚙️[🔌](/docs/integrations/symfony) [SymfonyWorkerProcess](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonyWorkerProcess.php)

This is the part of [Symfony bundle](/docs/integrations/symfony)

This worker type is designed for running long-running symfony console commands.

| Option             | Type                                                | Default        | Description                                                           |
|--------------------|-----------------------------------------------------|----------------|-----------------------------------------------------------------------|
| `command`          | string                                              | *not&nbsp;set* | Symfony console command name.                                         |
| `count`            | int                                                 | 1              | Optional. The number of processes to start.                           |
| `reloadable`       | bool                                                | true           | Optional. Whether the worker can be reloaded with the reload command. |
| `user`             | string                                              | *not&nbsp;set* | Optional. Unix user of process. Current user by default.              |
| `group`            | string                                              | *not&nbsp;set* | Optional. Unix group of process. Current group by default.            |
