---
title: Logger
---

# Logger Plugin

The Logger Plugin provides configurable logging capabilities for your application.
It allows you to route logs to multiple destinations, including files, stdout, syslog, and external services like Graylog.

## Installation

```bash
$ composer require phpstreamserver/logger
```

## Example of usage

```php title="server.php"
use PHPStreamServer\Core\Plugin\Supervisor\WorkerProcess;
use PHPStreamServer\Core\Server;
use PHPStreamServer\Plugin\Logger\Handler\ConsoleHandler;
use PHPStreamServer\Plugin\Logger\LoggerPlugin;

$server = new Server();

$server->addPlugin(
    new LoggerPlugin(
        new ConsoleHandler(),
    ),
);

$server->addWorker(
    new WorkerProcess(
        name: 'Worker process',
        onStart: function (WorkerProcess $worker): void {
            $worker->logger->notice('Hello from worker', ['pid' => \posix_getpid()]);
        },
    ),
);

exit($server->run());
```

## Configuration

### 🔌 LoggerPlugin

| Option     | Type                           | Default         | Description                                                          |
|------------|--------------------------------|-----------------|----------------------------------------------------------------------|
| `handlers` | ...[Handler](#-consolehandler) | *not&nbsp;set*  | A list of logger handlers that define the destinations for the logs. |

### 🔵 ConsoleHandler

Sends log messages to the console (stdout or stderr). Useful for development or debugging purposes where you want to see formatted logs directly in the terminal.

| Option      | Type      | Default         | Description                                                                                                                |
|-------------|-----------|-----------------|----------------------------------------------------------------------------------------------------------------------------|
| `output`    | int       | 2               | Optional. Specifies the output stream (1 for stdout, 2 for stderr).                                                        |
| `level`     | LogLevel  | LogLevel::DEBUG | Optional. Processes logs with severity equal to or greater than the specified level.                                       |
| `channels`  | string[]  | *not&nbsp;set*  | Optional. Processes logs only from the specified channels. Prefixing channel with `!` to exclude. All channels by default. |
| `formatter` | Formatter | 1               | Optional. A custom formatter for formatting log messages.                                                                  |

### 🔵 FileHandler

Writes log messages to a specified file. Supports daily rotation and gzip compression of archived files.

| Option       | Type      | Default         | Description                                                                                                                |
|--------------|-----------|-----------------|----------------------------------------------------------------------------------------------------------------------------|
| `filename`   | string    | *not&nbsp;set*  | Path to the file where logs will be saved.                                                                                 |
| `rotate`     | bool      | false           | Optional. Rotate log files.                                                                                                |
| `compress`   | bool      | false           | Optional. Compresses archived log files to save disk space.                                                                |
| `maxFiles`   | int       | 0               | Optional. The maximum number of log files to keep. Set to 0 to keep all files.                                             |
| `permission` | int       | 0644            | Optional. File permissions for the created log file.                                                                       |
| `level`      | LogLevel  | LogLevel::DEBUG | Optional. Processes logs with severity equal to or greater than the specified level.                                       |
| `channels`   | string[]  | *not&nbsp;set*  | Optional. Processes logs only from the specified channels. Prefixing channel with `!` to exclude. All channels by default. |
| `formatter`  | Formatter | 1               | Optional. A custom formatter for formatting log messages.                                                                  |

### 🔵 SyslogHandler

Sends log messages to the system’s syslog service.

| Option     | Type     | Default         | Description                                                                                                                                                                             |
|------------|----------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `prefix`   | string   | hppss           | Optional. The string prefix is added to each message.                                                                                                                                   |
| `flags`    | int      | 0               | Optional. Bitmask. See [php.net](https://www.php.net/manual/en/function.openlog.php#refsect1-function.openlog-parameters) for more details.                                             |
| `facility` | int      | 8               | Optional. Specify what type of program is logging the message. See [php.net](https://www.php.net/manual/en/function.openlog.php#refsect1-function.openlog-parameters) for more details. |
| `level`    | LogLevel | LogLevel::DEBUG | Optional. Processes logs with severity equal to or greater than the specified level.                                                                                                    |
| `channels` | string[] | *not&nbsp;set*  | Optional. Processes logs only from the specified channels. Prefixing channel with `!` to exclude. All channels by default.                                                              |

### 🔵 GelfHandler

Sends log messages to a Graylog server using the GELF format. Supports UDP, TCP, and HTTP transports.

| Option               | Type     | Default         | Description                                                                                                                |
|----------------------|----------|-----------------|----------------------------------------------------------------------------------------------------------------------------|
| `address`            | string   | *not&nbsp;set*  | The Graylog server address. UDP, TCP, or HTTP endpoint.                                                                    |
| `hostName`           | string   | *not&nbsp;set*  | Optional. The hostname to include in GELF messages. Current hostname by default.                                           |
| `includeStacktraces` | bool     | false           | Optional. Whether to include stack traces in error logs.                                                                   |
| `level`              | LogLevel | LogLevel::DEBUG | Optional. Processes logs with severity equal to or greater than the specified level.                                       |
| `channels`           | string[] | *not&nbsp;set*  | Optional. Processes logs only from the specified channels. Prefixing channel with `!` to exclude. All channels by default. |
