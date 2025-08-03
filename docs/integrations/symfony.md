---
title: Symfony
---

# Symfony intergation

This bundle provides integration of PHPStreamServer with the Symfony framework.

## Installation

```bash
$ composer require phpstreamserver/symfony
```

## Configuration

### Enable the bundle
```php title="config/bundles.php"
<?php

return [
    // ...
    PHPStreamServer\Symfony\PHPStreamServerBundle::class => ['all' => true],
];
```

### Set PHPStreamServerRuntime as the application runtime
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

### Create config/phpss.config.php file
```php title="config/phpss.config.php"
<?php

use PHPStreamServer\Core\ReloadStrategy\ExceptionReloadStrategy;
use PHPStreamServer\Core\Server;
use PHPStreamServer\Symfony\Worker\SymfonyHttpServerProcess;

return static function (Server $server): void {
    $server->addWorker(new SymfonyHttpServerProcess(
        listen: '0.0.0.0:80',
        count: 1,
        reloadStrategies: [
            new ExceptionReloadStrategy(),
        ],
    ));
};
```

You can register additional plugins and workers in this file.  
This bundle adds new Symfony-specific workers:
- ⚙️ [SymfonyHttpServerProcess](/docs/general/configuration#%EF%B8%8F-symfonyhttpserverprocess)
- ⚙️ [SymfonyPeriodicProcess](/docs/general/configuration#%EF%B8%8F-symfonyperiodicprocess)
- ⚙️ [SymfonyWorkerProcess](/docs/general/configuration#%EF%B8%8F-symfonyworkerprocess)

### Create bin/phpss file
```php title="bin/phpss"
#!/usr/bin/env php
<?php

use App\Kernel;
use PHPStreamServer\Symfony\ServerApplication;

require_once \dirname(__DIR__) . '/vendor/autoload_runtime.php';

return new ServerApplication(static function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
});
```

### Create bin/console file
```php title="bin/console"
#!/usr/bin/env php
<?php

use App\Kernel;
use PHPStreamServer\Symfony\ConsoleApplication;

require_once \dirname(__DIR__) . '/vendor/autoload_runtime.php';

return new ConsoleApplication(static function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
});
```

⚠️ Modifying the `bin/console` file is essential to integrate console commands with PHPStreamServer—do not skip this step.

### Start the server
```bash
$ bin/phpss start
```

This bundle adds new Symfony-specific options to the start command: `--env`, `--no-debug`. For more details, refer to the help output.

## Resolvable arguments in phpss.config.php
The closure returned from the `config/phpss.config.php` may have zero or more arguments:
```php
return static function (Server $server): void {
    // ...
};
```
The following arguments are supported:  
- `Server $server` Server instance to register plugins and workers  
- `array $context` This is the same as $_SERVER + $_ENV  
- `string $projectDir` Project root directory  
- `string $env` Current environment  
- `bool $debug` Is in debug mode  

## Intergation with Monolog
If you use Monolog as your main logging system in Symfony, you can route all logs to the PHPStreamServer logger. This bundle provides a special Monolog handler for seamless integration, which can be configured in the `monolog.yaml` file.

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

#### ProcessStartEvent
Event Class: [ProcessStartEvent](https://github.com/phpstreamserver/symfony/blob/main/src/Event/ProcessStartEvent.php)  
Triggered when a worker process starts.

#### ProcessStopEvent
Event Class: [ProcessStopEvent](https://github.com/phpstreamserver/symfony/blob/main/src/Event/ProcessStopEvent.php)  
Triggered when a worker process stops.

#### ProcessReloadEvent
Event Class: [ProcessReloadEvent](https://github.com/phpstreamserver/symfony/blob/main/src/Event/ProcessReloadEvent.php)  
Triggered when a worker process is reloaded.
