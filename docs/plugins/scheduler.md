---
title: Scheduler
---

# Scheduler Plugin

The Scheduler Plugin enables you to schedule tasks at specified intervals, similar to the functionality of the traditional cron service.

## Installation

```bash
$ composer require phpstreamserver/scheduler
```

## Example of usage

```php title="server.php"
use PHPStreamServer\Core\Server;
use PHPStreamServer\Plugin\Scheduler\PeriodicProcess;
use PHPStreamServer\Plugin\Scheduler\SchedulerPlugin;

$server = new Server();

$server->addPlugin(
    new SchedulerPlugin(),
);

$server->addWorker(
    new PeriodicProcess(
        name: 'Periodic process',
        schedule: '*/1 * * * *',
        onStart: function (PeriodicProcess $worker): void {
            // process
        },
    ),
);

exit($server->run());
```
