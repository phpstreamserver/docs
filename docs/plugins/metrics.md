---
title: Metrics
---

# Metrics Plugin

The Metrics Plugin provides a Prometheus metrics endpoint, enabling easy integration with monitoring and observability tools.
It offers several built-in metrics for tracking server performance and activity, and also allows developers to define custom metrics
designed for their application needs.  
The plugin supports Counter, Gauge, Histogram, and Summary metric types.

```php title="server.php"
use PHPStreamServer\Core\Plugin\Supervisor\WorkerProcess;
use PHPStreamServer\Core\Server;
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

### 🔌 MetricsPlugin

| Option   | Type           | Default        | Description                                           |
|----------|----------------|----------------|-------------------------------------------------------|
| `listen` | string\|Listen | *not&nbsp;set* | The address at which the metrics server is listening. |
