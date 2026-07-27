---
title: Scheduler Plugin
---

# Scheduler Plugin
Cron-like scheduler for executing tasks at specified intervals.

## Installation
```bash
$ composer require phpstreamserver/scheduler
```

## Example of Usage
```php title="server.php"
<?php

use PHPStreamServer\Core\Server;
use PHPStreamServer\Plugin\Scheduler\SchedulerPlugin;
use PHPStreamServer\Plugin\Scheduler\Worker\ScheduledWorker;

$server = new Server();

$server->addPlugin(
    new SchedulerPlugin(),
);

$server->addWorker(
    new ScheduledWorker(
        name: 'Scheduled worker',
        schedule: '*/1 * * * *',
        onStart: function (ScheduledWorker $worker): void {
            // process
        },
    ),
);

exit($server->run());
```

## Plugin Configuration

### 🧩 SchedulerPlugin
Plugin class: [SchedulerPlugin](https://github.com/phpstreamserver/scheduler/blob/main/src/SchedulerPlugin.php)  
This plugin does not have any specific configurable options.

## Worker Configuration

### ⚙️ ScheduledWorker
Worker class: [ScheduledWorker](https://github.com/phpstreamserver/scheduler/blob/main/src/Worker/ScheduledWorker.php)  
This worker type is designed to execute tasks periodically.  
The `schedule` option can be specified in one of the following formats:
- Number of seconds (e.g., `60`)
- An ISO8601 datetime format (e.g., `2026-01-01T00:00:00Z`)
- An ISO8601 duration format (e.g., `PT1M`)
- A [relative date format](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative) (e.g., `1 minute`)
- A cron expression (e.g., `*/1 * * * *`)

| Option     | Type    | Default        | Description                                                                 |
|------------|---------|----------------|-----------------------------------------------------------------------------|
| `name`     | string  | *not&nbsp;set* | Optional. The name associated with the worker process.                      |
| `schedule` | int     | "1 minute"     | Optional. Schedule in one of the formats described above.                   |
| `jitter`   | int     | 0              | Optional. Jitter in seconds that adds a random time offset to the schedule. |
| `user`     | int     | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                    |
| `group`    | int     | *not&nbsp;set* | Optional. Unix group of process. Current group by default.                  |
| `onStart`  | Closure | *not&nbsp;set* | Optional. A callback function executed when the worker starts.              |

## Commands

### ▶️  GetWorkersCommand
Command class: [GetWorkersCommand](https://github.com/phpstreamserver/scheduler/blob/main/src/Command/GetWorkersCommand.php)  
Retrieves metadata for workers registered with the scheduler.
