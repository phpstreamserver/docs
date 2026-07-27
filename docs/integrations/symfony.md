---
title: Symfony
---

# Symfony Intergation
This bundle integrates PHPStreamServer Runtime with the Symfony framework.

## Installation
```bash
$ composer require phpstreamserver/symfony
```

## Runtime Configuration

#### Enable the Bundle
```php title="config/bundles.php"
<?php

return [
    // ...
    PHPStreamServer\Symfony\PHPStreamServerBundle::class => ['all' => true],
];
```

#### Set PHPStreamServerRuntime as the Application Runtime
Use the `APP_RUNTIME` environment variable or by specifying the `extra.runtime.class` in `composer.json` to change the Runtime class to `PHPStreamServer\Symfony\PHPStreamServerRuntime`.
```json title="composer.json"
{
  "require": {
    "...": "..."
  },
  "extra": {
    "runtime": {
      "class": "PHPStreamServer\\Symfony\\PHPStreamServerRuntime"
    }
  }
}
```

#### Create config/phpss.config.php File
```php title="config/phpss.config.php"
<?php

use PHPStreamServer\Core\ReloadStrategy\ExceptionReloadStrategy;
use PHPStreamServer\Core\Server;
use PHPStreamServer\Symfony\Worker\SymfonyHttpServerWorker;

return static function (Server $server): void {
    $server->addWorker(new SymfonyHttpServerWorker(
        listen: '0.0.0.0:80',
        count: 1,
        reloadStrategies: [
            new ExceptionReloadStrategy(),
        ],
    ));
};
```

The closure returned from the `config/phpss.config.php` may have zero or more arguments.  
The following arguments are supported:
- `Server $server` Server instance to register plugins and workers
- `array $context` This is the same as $_SERVER + $_ENV
- `string $projectDir` Project root directory
- `string $env` Current environment
- `bool $debug` Is in debug mode

#### Create bin/phpss File
```php title="bin/phpss"
#!/usr/bin/env php
<?php

use App\Kernel;
use PHPStreamServer\Symfony\ServerApplication;

require_once \dirname(__DIR__) . '/vendor/autoload_runtime.php';

return new ServerApplication(static function (array $context): Kernel {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
});
```

#### Start the Server
```bash
$ bin/phpss start
```

This bundle adds new Symfony-specific options to the start command: (`--env`, `--no-debug`). For more details, refer to the start command help output.

## Worker Configuration

### ⚙️ SymfonyHttpServerWorker
Worker class: [SymfonyHttpServerWorker](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonyHttpServerWorker.php)  
This worker type is designed to run the Symfony application web server.

| Parameter              | Type                                                                                                                                                                           | Default        | Description                                                                                    |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|------------------------------------------------------------------------------------------------|
| `listen`               | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php)\|[Listen[]](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *not&nbsp;set* | The address at which the server is listening.                                                  |
| `count`                | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The number of processes to start. Defaults to number of CPUs.                        |
| `reloadable`           | bool                                                                                                                                                                           | true           | Optional. Whether the worker can be reloaded with the reload command.                          |
| `user`                 | string                                                                                                                                                                         | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                                       |
| `group`                | string                                                                                                                                                                         | *not&nbsp;set* | Optional. Unix group of process. Current group by default.                                     |
| `middleware`           | [Middleware[]](https://github.com/amphp/http-server/blob/3.x/src/Middleware.php)                                                                                               | *not&nbsp;set* | Optional. A list of middlewares for processing HTTP requests.                                  |
| `reloadStrategies`     | [ReloadStrategy[]](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ReloadStrategy.php)                                                                    | *not&nbsp;set* | Optional. The strategies used to reload the worker.                                            |
| `accessLog`            | bool                                                                                                                                                                           | true           | Optional. Whether to log incoming HTTP requests.                                               |
| `gzip`                 | bool                                                                                                                                                                           | false          | Optional. Enables gzip compression.                                                            |
| `connectionLimit`      | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of connections per worker.                                        |
| `connectionLimitPerIp` | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of connections allowed per IP.                                    |
| `concurrencyLimit`     | int                                                                                                                                                                            | 1              | Optional. The maximum number of concurrent HTTP requests per worker. Set to null for no limit. |

### ⚙️ SymfonyScheduledCommandWorker
Worker class: [SymfonyScheduledCommandWorker](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonyScheduledCommandWorker.php)  
This worker type is designed to execute Symfony console commands periodically.
The `schedule` option can be specified in one of the following formats:
- Number of seconds (e.g., `60`)
- An ISO8601 datetime format (e.g., `2026-01-01T00:00:00Z`)
- An ISO8601 duration format (e.g., `PT1M`)
- A [relative date format](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative) (e.g., `1 minute`)
- A cron expression (e.g., `*/1 * * * *`)

| Parameter  | Type    | Default        | Description                                                                 |
|------------|---------|----------------|-----------------------------------------------------------------------------|
| `command`  | string  | *not&nbsp;set* | Symfony console command name.                                               |
| `name`     | string  | *not&nbsp;set* | Optional. The name associated with the worker process.                      |
| `schedule` | int     | "1 minute"     | Optional. Schedule in one of the formats described above.                   |
| `jitter`   | int     | 0              | Optional. Jitter in seconds that adds a random time offset to the schedule. |
| `user`     | int     | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                    |
| `group`    | int     | *not&nbsp;set* | Optional. Unix group of process. Current group by default.                  |

### ⚙️ SymfonySupervisedCommandWorker
Worker class: [SymfonySupervisedCommandWorker](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonySupervisedCommandWorker.php)  
This worker type is designed to run long-running Symfony console commands.

| Parameter    | Type      | Default        | Description                                                           |
|--------------|-----------|----------------|-----------------------------------------------------------------------|
| `command`    | string    | *not&nbsp;set* | Symfony console command name.                                         |
| `name`       | string    | *not&nbsp;set* | Optional. The name associated with the worker process.                |
| `count`      | int       | 1              | Optional. The number of processes to start.                           |
| `reloadable` | bool      | true           | Optional. Whether the worker can be reloaded with the reload command. |
| `user`       | string    | *not&nbsp;set* | Optional. Unix user of process. Current user by default.              |
| `group`      | string    | *not&nbsp;set* | Optional. Unix group of process. Current group by default.            |

## Intergation with Monolog
If you use Monolog as the main logging system in Symfony, you can route all logs to the PHPStreamServer logger.
This bundle provides a Monolog handler for seamless integration, which can be configured in the `monolog.yaml` file.

```yaml title="config/packages/monolog.yaml"
when@dev:
    monolog:
        handlers:
            // highlight-start
            main:
                type: service
                id: phpss.monolog_handler
                channels: ["!event", "!doctrine"]
            // highlight-end
            console:
                type: console
                process_psr_3_messages: false
                channels: ["!event", "!doctrine", "!console"]

when@prod:
    monolog:
        handlers:
            main:
                type: fingers_crossed
                action_level: error
                handler: nested
                excluded_http_codes: [404, 405]
                buffer_size: 50 # How many messages should be saved? Prevent memory leaks
            // highlight-start
            nested:
                type: service
                id: phpss.monolog_handler
                channels: ["!event", "!doctrine"]
            // highlight-end
            console:
                type: console
                process_psr_3_messages: false
                channels: ["!event", "!doctrine"]

```

## Symfony Events
During the workers' lifecycle, they [dispatch events](https://symfony.com/doc/current/event_dispatcher.html) which you can use to get to know what happens with workers.

### ⏺️ WorkerStartEvent
Event Class: [WorkerStartEvent](https://github.com/phpstreamserver/symfony/blob/main/src/SymfonyEvent/WorkerStartEvent.php)  
Triggered when a worker process starts.

### ⏺️ WorkerStopEvent
Event Class: [WorkerStopEvent](https://github.com/phpstreamserver/symfony/blob/main/src/SymfonyEvent/WorkerStopEvent.php)  
Triggered when a worker process stops.

### ⏺️ WorkerReloadEvent
Event Class: [WorkerReloadEvent](https://github.com/phpstreamserver/symfony/blob/main/src/SymfonyEvent/WorkerReloadEvent.php)  
Triggered when a worker process is reloaded.
