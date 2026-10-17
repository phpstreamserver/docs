---
title: Logger Plugin
---

# Logger Plugin
Flexible logging system supporting multiple outputs, including files, stdout, syslog, Graylog, and VictoriaLogs.

## Installation
```bash
$ composer require phpstreamserver/logger
```

`VictoriaLogsHandler` and HTTP and HTTPS transport for `GelfHandler` additionally require the AMPHP HTTP client:

```bash
$ composer require amphp/http-client
```

## Usage Example
```php title="server.php"
<?php

require __DIR__ . '/vendor/autoload.php';

use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\SupervisedWorker;
use PHPStreamServer\Plugin\Logger\Handler\ConsoleHandler;
use PHPStreamServer\Plugin\Logger\LoggerPlugin;
use Psr\Log\LoggerInterface;

$server = new Server();

$server->addPlugin(
    new LoggerPlugin(
        new ConsoleHandler(),
    ),
);

$server->addWorker(
    new SupervisedWorker(
        name: 'Worker',
        onStart: function (SupervisedWorker $worker): void {
            $logger = $worker->container->getService(LoggerInterface::class);
            $logger->info('Hello from worker', ['pid' => \posix_getpid()]);

            // You can also use the logger like this:
            // $worker->logger->info('Hello from worker', ['pid' => \posix_getpid()]);
        },
    ),
);

exit($server->run());
```

## Plugin Configuration

### 🧩 LoggerPlugin
Plugin class: [LoggerPlugin](https://github.com/phpstreamserver/logger/blob/main/src/LoggerPlugin.php)

| Parameter  | Type                                                                               | Default          | Description                                                 |
|------------|------------------------------------------------------------------------------------|------------------|-------------------------------------------------------------|
| `handlers` | [Handler](https://github.com/phpstreamserver/logger/blob/main/src/Handler.php) ... | *zero arguments* | Optional. Handlers that define where log messages are sent. |

## Handler Configuration
The Logger plugin provides various handlers for routing logs to different destinations.

### 📝 ConsoleHandler
Handler class: [ConsoleHandler](https://github.com/phpstreamserver/logger/blob/main/src/Handler/ConsoleHandler.php)  
Sends log messages directly to the console (stdout or stderr).

| Parameter   | Type                                                                               | Default                                                                                                    | Description                                                                                                                            |
|-------------|------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `output`    | int                                                                                | 2                                                                                                          | Optional. Specifies the output stream (1 for stdout, 2 for stderr).                                                                    |
| `level`     | [LogLevel](https://github.com/phpstreamserver/logger/blob/main/src/LogLevel.php)   | LogLevel::DEBUG                                                                                            | Optional. Processes logs with severity equal to or greater than the specified level.                                                   |
| `channels`  | array\<string\>                                                                    | []                                                                                                         | Optional. List channel names to include, or prefix them with `!` to exclude. By default, the handler processes logs from all channels. |
| `formatter` | [Formatter](https://github.com/phpstreamserver/logger/blob/main/src/Formatter.php) | [ConsoleFormatter](https://github.com/phpstreamserver/logger/blob/main/src/Formatter/ConsoleFormatter.php) | Optional. A custom formatter for formatting log messages.                                                                              |

### 📝 FileHandler
Handler class: [FileHandler](https://github.com/phpstreamserver/logger/blob/main/src/Handler/FileHandler.php)  
Sends log messages to a specified file, supporting daily rotation and gzip compression of archived logs.

| Parameter    | Type                                                                               | Default                                                                                                  | Description                                                                                                                            |
|--------------|------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `filename`   | string                                                                             | *required*                                                                                               | Path to the file where logs will be saved.                                                                                             |
| `rotate`     | bool                                                                               | false                                                                                                    | Optional. Enables daily log rotation.                                                                                                  |
| `compress`   | bool                                                                               | false                                                                                                    | Optional. Gzip-compresses rotated logs. Requires `ext-zlib`.                                                                           |
| `maxFiles`   | int                                                                                | 0                                                                                                        | Optional. Maximum number of archived log files to retain. Unlimited by default.                                                        |
| `permission` | int                                                                                | 0644                                                                                                     | Optional. File permissions for the created log file.                                                                                   |
| `level`      | [LogLevel](https://github.com/phpstreamserver/logger/blob/main/src/LogLevel.php)   | LogLevel::DEBUG                                                                                          | Optional. Processes logs with severity equal to or greater than the specified level.                                                   |
| `channels`   | string[]                                                                           | []                                                                                                       | Optional. List channel names to include, or prefix them with `!` to exclude. By default, the handler processes logs from all channels. |
| `formatter`  | [Formatter](https://github.com/phpstreamserver/logger/blob/main/src/Formatter.php) | [StringFormatter](https://github.com/phpstreamserver/logger/blob/main/src/Formatter/StringFormatter.php) | Optional. Formatter used for file output.                                                                                              |

### 📝 SyslogHandler
Handler class: [SyslogHandler](https://github.com/phpstreamserver/logger/blob/main/src/Handler/SyslogHandler.php)  
Sends log messages to the system’s syslog service.

| Parameter  | Type                                                                             | Default         | Description                                                                                                                                                       |
|------------|----------------------------------------------------------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `prefix`   | string                                                                           | phpss           | Optional. The string prefix is added to each message.                                                                                                             |
| `flags`    | int                                                                              | 0               | Optional. Bitmask. See [php.net](https://www.php.net/manual/en/function.openlog.php#refsect1-function.openlog-parameters) for more details.                       |
| `facility` | int                                                                              | 8               | Optional. Specifies the syslog facility. See [php.net](https://www.php.net/manual/en/function.openlog.php#refsect1-function.openlog-parameters) for more details. |
| `level`    | [LogLevel](https://github.com/phpstreamserver/logger/blob/main/src/LogLevel.php) | LogLevel::DEBUG | Optional. Processes logs with severity equal to or greater than the specified level.                                                                              |
| `channels` | string[]                                                                         | []              | Optional. List channel names to include, or prefix them with `!` to exclude. By default, the handler processes logs from all channels.                            |

### 📝 GelfHandler
Handler class: [GelfHandler](https://github.com/phpstreamserver/logger/blob/main/src/Handler/GelfHandler.php)  
Sends GELF messages over UDP, TCP, HTTP, or HTTPS.  

| Parameter            | Type                                                                             | Default         | Description                                                                                                                                            |
|----------------------|----------------------------------------------------------------------------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `address`            | string                                                                           | *required*      | URI beginning with `udp://`, `tcp://`, `http://`, or `https://`. UDP and TCP require an explicit port; HTTP and HTTPS default to ports `80` and `443`. |
| `hostName`           | string\|null                                                                     | null            | Optional. Hostname included in GELF messages. Defaults to the current hostname.                                                                        |
| `includeStacktraces` | bool                                                                             | false           | Optional. Includes stack traces for exceptions found in log context.                                                                                   |
| `level`              | [LogLevel](https://github.com/phpstreamserver/logger/blob/main/src/LogLevel.php) | LogLevel::DEBUG | Optional. Processes logs with severity equal to or greater than the specified level.                                                                   |
| `channels`           | string[]                                                                         | []              | Optional. List channel names to include, or prefix them with `!` to exclude. By default, the handler processes logs from all channels.                 |

### 📝 VictoriaLogsHandler
Handler class: [VictoriaLogsHandler](https://github.com/phpstreamserver/logger/blob/main/src/Handler/VictoriaLogsHandler.php)  
Sends logs to VictoriaLogs over HTTP or HTTPS using JSON line ingestion.

| Parameter      | Type                                                                             | Default            | Description                                                                                                                                 |
|----------------|----------------------------------------------------------------------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `baseUri`      | string                                                                           | *required*         | Base HTTP or HTTPS URL of VictoriaLogs, optionally with a path prefix. Query strings and fragments are not allowed.                         |
| `appName`      | string                                                                           | app                | Optional. Application name.                                                                                                                 |
| `streamFields` | string[]                                                                         | ['app', 'channel'] | Optional. Log field names whose values identify a [log stream](https://docs.victoriametrics.com/victorialogs/keyconcepts/#stream-fields).   |
| `level`        | [LogLevel](https://github.com/phpstreamserver/logger/blob/main/src/LogLevel.php) | LogLevel::DEBUG    | Optional. Processes logs with severity equal to or greater than the specified level.                                                        |
| `channels`     | string[]                                                                         | []                 | Optional. List channel names to include, or prefix them with `!` to exclude. By default, the handler processes logs from all channels.      |
