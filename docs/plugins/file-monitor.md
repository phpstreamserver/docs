---
title: File Monitor
---

# File Monitor Plugin

The File Monitor Plugin is designed to monitor specified directories for file changes.
It automatically reloads workers whenever a file within those directories is modified.

```php title="server.php"
use PHPStreamServer\Core\Plugin\Supervisor\WorkerProcess;
use PHPStreamServer\Core\Server;
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

### 🔌 FileMonitorPlugin

| Option  | Type                     | Default         | Description                                                            |
|---------|--------------------------|-----------------|------------------------------------------------------------------------|
| `watch` | ...[WatchDir](#watchdir) | *not&nbsp;set*  | List of WatchDir objects that define the files to monitor for changes. |

### 🔵 WatchDir

| Option              | Type     | Default        | Description                                                                 |
|---------------------|----------|----------------|-----------------------------------------------------------------------------|
| `sourceDir`         | string   | *not&nbsp;set* | The directory to monitor for file changes.                                  |
| `filePattern`       | string[] | \['\*'\]       | Optional. A pattern that specifies which files to watch (e.g., *.php).      |
| `invalidateOpcache` | bool     | false          | Optional. Whether to invalidate the OPCache when a file change is detected. |
