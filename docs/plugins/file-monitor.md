---
title: File Monitor Plugin
---

# File Monitor Plugin
A directory watcher that requests a server reload when matching files are created, modified, deleted, or moved into a watched directory.

File Monitor selects the watcher for the current operating system automatically:

| Platform        | Watcher                                                      |
|-----------------|--------------------------------------------------------------|
| Linux           | Native Inotify watcher, accessed through PHP FFI.            |
| macOS           | Native FSEvents watcher, accessed through PHP FFI.           |
| Other platforms | Polling watcher that rescans the matching files for changes. |

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
use PHPStreamServer\Plugin\FileMonitor\WatchRule;

$server = new Server();

$server->addPlugin(
    new FileMonitorPlugin(
        new WatchRule(glob: __DIR__ . '/src/**/*.php', invalidateOpcache: true),
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

| Parameter     | Type                                                                  | Default          | Description                                                           |
|---------------|-----------------------------------------------------------------------|------------------|-----------------------------------------------------------------------|
| `watchRules`  | [WatchRule](/docs/plugins/file-monitor#watchrule-configuration) ... | *zero arguments* | Optional. WatchRule configurations specifying which files to monitor. |

## WatchRule Configuration
`WatchRule` specifies an absolute glob of files to monitor. Use a globstar directory segment (`**`) followed by a file pattern to monitor files recursively.

### 📂 WatchRule
Class: [WatchRule](https://github.com/phpstreamserver/file-monitor/blob/main/src/WatchRule.php)

| Parameter           | Type   | Default    | Description                                                                 |
|---------------------|--------|------------|-----------------------------------------------------------------------------|
| `glob`              | string | *required* | Absolute glob of files to monitor, for example `/src/**/*.php` or `/*.php`. |
| `invalidateOpcache` | bool   | false      | Optional. Whether to invalidate all scripts cached by OPCache.              |
