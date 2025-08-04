---
title: Metrics Plugin
---

# Metrics Plugin
Prometheus-compatible metrics endpoint for monitoring server performance and tracking custom application metrics.
The plugin supports **Counter**, **Gauge**, **Histogram**, and **Summary** metric types.

## Installation
```bash
$ composer require phpstreamserver/metrics
```

## Example of Usage
```php title="server.php"
use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\WorkerProcess;
use PHPStreamServer\Plugin\Metrics\MetricsPlugin;
use PHPStreamServer\Plugin\Metrics\RegistryInterface;
use Revolt\EventLoop;

$server = new Server();

$server->addPlugin(
    new MetricsPlugin(listen: '0.0.0.0:8081'),
);

$server->addWorker(
    new WorkerProcess(
        name: 'Worker process',
        count: 2,
        onStart: function (WorkerProcess $worker): void {
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

| Option   | Type                                                                                      | Default        | Description                                           |
|----------|-------------------------------------------------------------------------------------------|----------------|-------------------------------------------------------|
| `listen` | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *not&nbsp;set* | The address on which the metrics server is listening. |
