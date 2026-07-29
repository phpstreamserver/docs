---
title: File Monitor Plugin
---

# File Monitor Plugin
A directory watcher that requests a server reload when matching files are created, modified, deleted, or moved into a watched directory.

## Installation
```bash
$ composer require phpstreamserver/file-monitor
```

## Usage Example
```php title="server.php"
<?php

require __DIR__ . '/vendor/autoload.php';

use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\SupervisedWorker;
use PHPStreamServer\Plugin\FileMonitor\FileMonitorPlugin;
use PHPStreamServer\Plugin\FileMonitor\WatchDir;

$server = new Server();

$server->addPlugin(
    new FileMonitorPlugin(
        new WatchDir(sourceDir: __DIR__, filePatterns: ['*'], recursive: true, invalidateOpcache: true),
    ),
);

$server->addWorker(
    new SupervisedWorker(
        name: 'Worker process',
        onStart: function (SupervisedWorker $worker): void {
            $worker->logger->notice("Worker process has started");
        },
    ),
);

exit($server->run());
```

## Plugin Configuration

### 🧩 FileMonitorPlugin
Plugin class: [FileMonitorPlugin](https://github.com/phpstreamserver/file-monitor/blob/main/src/FileMonitorPlugin.php)

| Parameter | Type                                                              | Default          | Description                                                          |
|-----------|-------------------------------------------------------------------|------------------|----------------------------------------------------------------------|
| `watch`   | [WatchDir](/docs/plugins/file-monitor#watchdir-configuration) ... | *zero arguments* | Optional. WatchDir configurations specifying which files to monitor. |

## WatchDir Configuration
`WatchDir` specifies a directory and the file-name patterns to monitor.

### 📂 WatchDir
Class: [WatchDir](https://github.com/phpstreamserver/file-monitor/blob/main/src/WatchDir.php)

| Parameter           | Type     | Default    | Description                                                         |
|---------------------|----------|------------|---------------------------------------------------------------------|
| `sourceDir`         | string   | *required* | The directory to monitor for file changes.                          |
| `filePatterns`      | string[] | ['*']      | Optional. Glob patterns to match file names (for example, `*.php`). |
| `recursive`         | bool     | false      | Optional. Whether to monitor subdirectories recursively.            |
| `invalidateOpcache` | bool     | false      | Optional. Whether to invalidate all scripts cached by OPCache.      |
