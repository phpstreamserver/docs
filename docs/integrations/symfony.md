---
title: Symfony
---

# Symfony Integration

This bundle integrates PHPStreamServer with the Symfony Runtime component.

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

Set the `APP_RUNTIME` environment variable to `PHPStreamServer\Symfony\PHPStreamServerRuntime`, or specify the class through `extra.runtime.class` in `composer.json`:

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

#### Create `config/phpss.config.php`

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
- `Server $server`: server instance used to register plugins and workers
- `array $context`: this is the same as $_SERVER + $_ENV
- `string $projectDir`: project root directory
- `string $env`: current environment
- `bool $debug`: whether debug mode is enabled

#### Create `bin/phpss`

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

This bundle adds the Symfony-specific `--env` and `--no-debug` options to the `start` command. For details, see the command's help output.

## Worker Configuration

### ⚙️ SymfonyHttpServerWorker
Worker class: [SymfonyHttpServerWorker](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonyHttpServerWorker.php)  
This worker type is designed to run the Symfony application web server.

| Parameter              | Type                                                                                                                                                                                                                                                                                         | Default    | Description                                                                                                             |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------|
| `listen`               | [string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php)\|array](string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php)\|string[]\|[Listen[]](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php)) | *required* | Address or addresses on which to listen.                                                                                |
| `count`                | int\|null                                                                                                                                                                                                                                                                                    | null       | Optional. Number of worker processes. Must be between `1` and `1024`. Defaults to the detected CPU count.               |
| `reloadable`           | bool                                                                                                                                                                                                                                                                                         | true       | Optional. Whether the worker can be reloaded.                                                                           |
| `user`                 | string\|null                                                                                                                                                                                                                                                                                 | null       | Optional. Unix user name or user ID (UID).                                                                              |
| `group`                | string\|null                                                                                                                                                                                                                                                                                 | null       | Optional. Unix group name or group ID (GID).                                                                            |
| `middleware`           | [Middleware[]](https://github.com/amphp/http-server/blob/3.x/src/Middleware.php)                                                                                                                                                                                                             | []         | Optional. Additional HTTP middleware.                                                                                   |
| `reloadStrategies`     | [ReloadStrategy[]](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ReloadStrategy.php)                                                                                                                                                                                  | []         | Optional. Strategies for triggering automatic worker reloads.                                                           |
| `accessLog`            | bool                                                                                                                                                                                                                                                                                         | true       | Optional. Whether to log incoming HTTP requests.                                                                        |
| `gzip`                 | bool                                                                                                                                                                                                                                                                                         | false      | Optional. Enables response compression. Requires `ext-zlib`.                                                            |
| `connectionLimit`      | int\|null                                                                                                                                                                                                                                                                                    | null       | Optional. Maximum number of simultaneous connections per worker. Disabled by default.                                   |
| `connectionLimitPerIp` | int\|null                                                                                                                                                                                                                                                                                    | null       | Optional. Maximum number of simultaneous connections per IPv4 address or IPv6 /56 block. Loopback addresses are exempt. |
| `concurrencyLimit`     | int\|null                                                                                                                                                                                                                                                                                    | 1          | Optional. Maximum number of concurrent requests per worker. Disabled by default.                                        |

### ⚙️ SymfonyScheduledCommandWorker
Worker class: [SymfonyScheduledCommandWorker](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonyScheduledCommandWorker.php)  
This worker type is designed to execute Symfony console commands periodically.
The `schedule` parameter accepts:
- A numeric string representing seconds (for example, `'60'`)
- An ISO8601 datetime format (for example, `2026-01-01T00:00:00Z`)
- An ISO8601 duration format (for example, `PT1M`)
- A [relative date format](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative) (for example, `1 minute`)
- A cron expression (for example, `*/1 * * * *`)

| Parameter  | Type         | Default    | Description                                                                                   |
|------------|--------------|------------|-----------------------------------------------------------------------------------------------|
| `command`  | string       | *required* | Symfony console command name with optional arguments and options.                             |
| `name`     | string\|null | null       | Optional. Worker name. Defaults to command name.                                              |
| `schedule` | string       | `1 minute` | Optional. Schedule in one of the formats described above.                                     |
| `jitter`   | int          | 0`         | Optional. Maximum random delay, in seconds, added to the scheduled time. Set to 0 to disable. |
| `user`     | string\|null | null`      | Optional. Unix user name or user ID (UID).                                                    |
| `group`    | string\|null | null`      | Optional. Unix group name or group ID (GID).                                                  |

`SymfonyScheduledCommandWorker` additionally requires the [Scheduler](/docs/plugins/scheduler) plugin.

### ⚙️ SymfonySupervisedCommandWorker
Worker class: [SymfonySupervisedCommandWorker](https://github.com/phpstreamserver/symfony/blob/main/src/Worker/SymfonySupervisedCommandWorker.php)  
This worker type is designed to run long-running Symfony console commands.

| Parameter          | Type                                                                                                        | Default    | Description                                                                                               |
|--------------------|-------------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------|
| `command`          | string                                                                                                      | *required* | Symfony console command name with optional arguments and options.                                         |
| `name`             | string\|null                                                                                                | null       | Optional. Worker name. Defaults to command name.                                                          |
| `count`            | int                                                                                                         | 1          | Optional. Number of worker processes. Must be between `1` and `1024`. Defaults to the detected CPU count. |
| `reloadable`       | bool                                                                                                        | true       | Optional. Whether the worker can be reloaded.                                                             |
| `user`             | string\|null                                                                                                | null       | Optional. Unix user name or user ID (UID).                                                                |
| `group`            | string\|null                                                                                                | null       | Optional. Unix group name or group ID (GID).                                                              |
| `reloadStrategies` | [ReloadStrategy[]](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ReloadStrategy.php) | []         | Optional. Strategies for triggering automatic worker reloads.                                             |

## Integration with Monolog
If you use Monolog as the main logging system in Symfony, you can route all logs to the PHPStreamServer logger.
This bundle provides a Monolog handler for seamless integration, which can be configured in the `monolog.yaml` file.

Install the Logger plugin and Monolog bundle:

```bash
$ composer require phpstreamserver/logger symfony/monolog-bundle
```

Register `LoggerPlugin` with the desired PHPStreamServer handlers in `config/phpss.config.php` before registering workers:

```php
use PHPStreamServer\Plugin\Logger\Handler\ConsoleHandler;
use PHPStreamServer\Plugin\Logger\LoggerPlugin;

$server->addPlugin(
    new LoggerPlugin(
        new ConsoleHandler(),
    ),
);
```

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
Symfony HTTP and command workers [dispatch events](https://symfony.com/doc/current/event_dispatcher.html) during their normal lifecycle.

### ⏺️ WorkerStartEvent
Event Class: [WorkerStartEvent](https://github.com/phpstreamserver/symfony/blob/main/src/SymfonyEvent/WorkerStartEvent.php)  
Triggered when a worker process starts.

### ⏺️ WorkerStopEvent
Event Class: [WorkerStopEvent](https://github.com/phpstreamserver/symfony/blob/main/src/SymfonyEvent/WorkerStopEvent.php)  
Triggered when a worker process stops.

### ⏺️ WorkerReloadEvent
Event Class: [WorkerReloadEvent](https://github.com/phpstreamserver/symfony/blob/main/src/SymfonyEvent/WorkerReloadEvent.php)  
Triggered when a worker process is reloaded.
