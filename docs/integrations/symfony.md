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

### Create phpss.config.php file in the root directory
```php title="phpss.config.php"
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
