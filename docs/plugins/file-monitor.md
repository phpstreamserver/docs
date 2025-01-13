---
title: File Monitor
---

# File Monitor Plugin

The File Monitor Plugin is designed to monitor specified directories for file changes.
It automatically reloads workers whenever a file within those directories is modified.

## Installation

```bash
$ composer require phpstreamserver/file-monitor
```

## Example of usage

```php title="server.php"
use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\WorkerProcess;
use PHPStreamServer\Plugin\FileMonitor\FileMonitorPlugin;
use PHPStreamServer\Plugin\FileMonitor\WatchDir;

$server = new Server();

$server->addPlugin(
    new FileMonitorPlugin(
        new WatchDir(sourceDir: __DIR__, filePattern: ['*'], invalidateOpcache: true),
    ),
);

$server->addWorker(
    new WorkerProcess(
        name: 'Worker process',
        onStart: function (WorkerProcess $worker): void {
            $worker->logger->notice("Worker process has started");
        },
    ),
);

exit($server->run());
```

## Configuration

### 🔵 [WatchDir](https://github.com/phpstreamserver/file-monitor/blob/main/src/WatchDir.php)

WatchDir specifies the directory and file patterns to monitor.

| Option              | Type     | Default        | Description                                                                 |
|---------------------|----------|----------------|-----------------------------------------------------------------------------|
| `sourceDir`         | string   | *not&nbsp;set* | The directory to monitor for file changes.                                  |
| `filePattern`       | string[] | \['\*'\]       | Optional. A pattern that specifies which files to watch (e.g., *.php).      |
| `invalidateOpcache` | bool     | false          | Optional. Whether to invalidate the OPCache when a file change is detected. |
