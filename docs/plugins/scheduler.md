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

## Configuration

### 🔌 SchedulerPlugin

This plugin does not have any specific configurable options.

### ⚙️ PeriodicProcess

This worker type is designed to execute tasks periodically.  
The `schedule` option can be specified in one of the following formats:
- Number of seconds (e.g. `60`)
- An ISO8601 datetime format (e.g. `2025-01-01 00:00:00`)
- An ISO8601 duration format (e.g. `PT1M`)
- A [relative date format](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative) (e.g. `1 minute`)
- A cron expression (e.g. `*/1 * * * *`)

| Option     | Type    | Default        | Description                                                                 |
|------------|---------|----------------|-----------------------------------------------------------------------------|
| `name`     | string  | "none          | Optional. The name associated with the worker process.                      |
| `schedule` | int     | "1 minute"     | Optional. Schedule in one of the formats described above.                   |
| `jitter`   | int     | 0              | Optional. Jitter in seconds that adds a random time offset to the schedule. |
| `user`     | int     | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                    |
| `group`    | int     | *not&nbsp;set* | Optional. Unix group of process. Current group by default.                  |
| `onStart`  | Closure | *not&nbsp;set* | Optional. A callback function executed when the worker stops.               |
 