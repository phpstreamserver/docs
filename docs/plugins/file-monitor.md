---
title: File Monitor Plugin
---

# File Monitor Plugin
A directory watcher that automatically reloads workers when files are modified.

## Installation
```bash
$ composer require phpstreamserver/file-monitor
```

## Example of Usage
```php title="server.php"
use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\WorkerProcess;
use PHPStreamServer\Plugin\FileMonitor\FileMonitorPlugin;
use PHPStreamServer\Plugin\FileMonitor\WatchDir;

$server = new Server();

$server->addPlugin(
    new FileMonitorPlugin(
        new WatchDir(sourceDir: __DIR__, filePattern: ['*'], recursive: true, invalidateOpcache: true),
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

## Plugin Configuration

### 🧩 FileMonitorPlugin
Plugin class: [FileMonitorPlugin](https://github.com/phpstreamserver/file-monitor/blob/main/src/FileMonitorPlugin.php)

| Option  | Type                                                            | Default         | Description                                                            |
|---------|-----------------------------------------------------------------|-----------------|------------------------------------------------------------------------|
| `watch` | [WatchDir[]](/docs/plugins/file-monitor#watchdir-configuration) | *not&nbsp;set*  | List of WatchDir objects that define the files to monitor for changes. |

## WatchDir Configuration
WatchDir Specifies the directory and file patterns to monitor.

### 📂 WatchDir
Class: [WatchDir](https://github.com/phpstreamserver/file-monitor/blob/main/src/WatchDir.php)

| Option              | Type     | Default        | Description                                                                 |
|---------------------|----------|----------------|-----------------------------------------------------------------------------|
| `sourceDir`         | string   | *not&nbsp;set* | The directory to monitor for file changes.                                  |
| `filePattern`       | string[] | \['\*'\]       | Optional. A pattern that specifies which files to watch (e.g., *.php).      |
| `recursive`         | bool     | false          | Optional. Monitor files recursively down to the folder tree.                |
| `invalidateOpcache` | bool     | false          | Optional. Whether to invalidate the OPCache when a file change is detected. |
