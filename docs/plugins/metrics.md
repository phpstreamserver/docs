---
title: Metrics Plugin
---

# Metrics Plugin
Prometheus-compatible metrics exporter for monitoring server performance and tracking custom application metrics.
The plugin supports **Counter**, **Gauge**, **Histogram**, and **Summary** metric types.

## Installation
```bash
$ composer require phpstreamserver/metrics
```

## Usage Example
```php title="server.php"
<?php

require __DIR__ . '/vendor/autoload.php';

use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\SupervisedWorker;
use PHPStreamServer\Plugin\Metrics\MetricsPlugin;
use PHPStreamServer\Plugin\Metrics\RegistryInterface;
use Revolt\EventLoop;

$server = new Server();

$server->addPlugin(
    new MetricsPlugin(listen: '0.0.0.0:8081'),
);

$server->addWorker(
    new SupervisedWorker(
        name: 'Worker',
        count: 2,
        onStart: function (SupervisedWorker $worker): void {
            $registry = $worker->container->getService(RegistryInterface::class);

            $counter = $registry->registerCounter(
                namespace: 'app',
                name: 'test_counter',
                help: 'This is a test counter',
                labels: ['pid'],
            );

            EventLoop::repeat(1, function () use ($counter) {
                $counter->inc(['pid' => \posix_getpid()]);
            });
        },
    ),
);

exit($server->run());
```

## Plugin Configuration

### 🧩 MetricsPlugin
Plugin class: [MetricsPlugin](https://github.com/phpstreamserver/metrics/blob/main/src/MetricsPlugin.php)

| Parameter | Type                                                                                      | Default        | Description                                           |
|----------|-------------------------------------------------------------------------------------------|----------------|-------------------------------------------------------|
| `listen` | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *required* | The address on which the metrics server listens. Metrics are exposed at `/metrics`. |
