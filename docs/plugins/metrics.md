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
                $counter->inc(['pid' => (string) \posix_getpid()]);
            });
        },
    ),
);

exit($server->run());
```

## Built-in Metrics

PHPStreamServer registers these metrics automatically when the Metrics plugin is installed and registered. HTTP and Scheduler metrics are included when their corresponding plugins are also installed and registered.

| Metric                                     | Labels   | Description                              |
|--------------------------------------------|----------|------------------------------------------|
| `phpss_supervisor_workers`                 | none     | Current number of registered workers.    |
| `phpss_supervisor_processes`               | none     | Current number of running processes.     |
| `phpss_supervisor_worker_reloads_total`    | none     | Total number of worker reloads.          |
| `phpss_supervisor_process_crashes_total`   | none     | Total number of process crashes.         |
| `phpss_supervisor_process_memory_bytes`    | `pid`    | Memory usage of each process in bytes.   |
| `phpss_http_requests_total`                | `status` | Total number of handled HTTP requests.   |
| `phpss_http_request_duration_seconds`      | `status` | HTTP request duration.                   |
| `phpss_scheduler_tasks`                    | none     | Current number of registered tasks.      |
| `phpss_scheduler_task_runs_total`          | none     | Total number of scheduled task runs.     |

## Plugin Configuration

### 🧩 MetricsPlugin
Plugin class: [MetricsPlugin](https://github.com/phpstreamserver/metrics/blob/main/src/MetricsPlugin.php)

| Parameter | Type                                                                                      | Default        | Description                                           |
|----------|-------------------------------------------------------------------------------------------|----------------|-------------------------------------------------------|
| `listen` | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *required* | The address on which the metrics server listens. Metrics are exposed at `/metrics`. |
