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

### Create phpss.config.php file in the config directory
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

### Create phpss file in the bin directory
```php title="bin/phpss"
#!/usr/bin/env php
<?php

use App\Kernel;
use PHPStreamServer\Symfony\PHPStreamServerRuntime;

$_SERVER['APP_RUNTIME'] = PHPStreamServerRuntime::class;

require_once \dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
```

### Start the server
```bash
$ bin/phpss start
```

This bundle adds new Symfony-specific options to the start command: `--env`, `--no-debug`. For more details, refer to the help output.

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
