---
sidebar_position: 2
---

# PhpRunner class
PhpRunner class is an entry point for an entire application running by PHPRunner.

Example:  
```php title="server.php"
use Luzrain\PhpRunner\PhpRunner;

// highlight-start
$phpRunner = new PhpRunner(
    pidFile: '/run/phprunner.pid',
);
// highlight-end

exit($phpRunner->run());
```

## Constructor options

### pidFile
Type: `string|null`  
Default: `null`  
Defines a file to store the process ID of the main process.
By default, the pid file is stored in /run/ or /tmp/ if the /run/ directory is not available for reading and writing.  

### logFile
Type: `string|null`  
Default: `null`  
Defines a file for storing logs. Only works with the default logger. (see option below)  
By default, logs are not stored anywhere.  

### stopTimeout
Type: `int`  
Default: `3`  
Timeout in seconds that master process will be waiting before force kill child processes after sending stop command.  

### logger
Type: `LoggerInterface|null`  
Default: `null`  
PSR-3 compatible logger.  
If set to null, PHPRunner will use the default logger implementation that prints log entries to stdout and optionally to `logFile`.

## Methods

### addWorkers()
`PhpRunner::addWorkers(WorkerProcess ...$workers): self`  
Add one or more `WorkerProcess` to the worker pool.  
See more about [WorkerProcess](/docs/WorkerProcess) object.

### run()
`PhpRunner::run(string $cmd = ''): int`  
Run PHPRunner. This is a blocking operation that will return an exit code on exit.  
Command to run taken from command line options by default, but can be overridden in cmd parameter.  

### stop()
`PhpRunner::stop(): void`  
Stop all worker processes and exit.

### reload()
`PhpRunner::reload(): void`  
Reload PHPRunner processes. Workers with the `reloadable` option set to `false` will not be reloaded.

### getStatus()
`PhpRunner::getStatus(): MasterProcessStatus`  
Get an instance of the `MasterProcessStatus` class, which contains all the information about running processes.

Note that stop(), reload() and getStatus() methods can be called not only by the master or worker processes, but also by any other process.
For example, you can create a separate php file that reloads an already running PHPRunner instance.

```php title="reload.php"
$phpRunner = new PhpRunner();
$phpRunner->reload();
```
