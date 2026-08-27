---
title: Scheduler Plugin
---

# Scheduler Plugin
Scheduler for executing tasks using second-based intervals, date-times, ISO 8601 durations, relative intervals, or cron expressions.

## Installation
```bash
$ composer require phpstreamserver/scheduler
```

## Usage Example
```php title="server.php"
<?php

require __DIR__ . '/vendor/autoload.php';

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
This plugin does not have any specific configurable parameter.

## Worker Configuration

### ⚙️ ScheduledWorker
Worker class: [ScheduledWorker](https://github.com/phpstreamserver/scheduler/blob/main/src/Worker/ScheduledWorker.php)  
This worker type is designed to execute tasks periodically.  
The `schedule` parameter accepts:
- A numeric string representing seconds (for example, `'60'`)
- An ISO8601 datetime format (for example, `2026-01-01T00:00:00Z`)
- An ISO8601 duration format (for example, `PT1M`)
- A [relative date format](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative) (for example, `1 minute`)
- A cron expression (for example, `*/1 * * * *`)

| Parameter  | Type          | Default    | Description                                                                                     |
|------------|---------------|------------|-------------------------------------------------------------------------------------------------|
| `name`     | string\|null  | null       | Optional. Worker name. Defaults to `scheduled worker <id>`.                                     |
| `schedule` | string        | `1 minute` | Optional. Schedule in one of the formats described above.                                       |
| `jitter`   | int           | 0          | Optional. Maximum random delay, in seconds, added to the scheduled time. Set to 0 to disable.   |
| `user`     | string\|null  | null       | Optional. Unix user name or user ID (UID).                                                      |
| `group`    | string\|null  | null       | Optional. Unix group name or group ID (GID).                                                    |
| `onStart`  | Closure\|null | null       | Optional. `Closure(ScheduledWorker): void` callback executed when the scheduled process starts. |

Each run executes in a separate child process. Runs never overlap. If a task is still running at its next scheduled time, that run is skipped and the following run is scheduled.

## Commands

### ▶️  GetWorkersCommand
Command class: [GetWorkersCommand](https://github.com/phpstreamserver/scheduler/blob/main/src/Command/GetWorkersCommand.php)  
Retrieves metadata for workers registered with the scheduler.
