---
sidebar_position: 2
---

# Server class
Server class is an entry point for an entire application running by PHPStreamServer.

Example:  
```php title="server.php"
use Luzrain\PHPStreamServer\Server;

// highlight-start
$server = new Server(
    pidFile: '/run/phpss.pid',
);
// highlight-end

exit($server->run());
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
If set to null, PHPStreamServer will use the default logger implementation that prints log entries to stdout and optionally to `logFile`.

## Methods

### addWorkers()
`Server::addWorkers(WorkerProcess ...$workers): self`  
Add one or more `WorkerProcess` to the worker pool.  
See more about [WorkerProcess](/docs/WorkerProcess) object.

### run()
`Server::run(string $cmd = ''): int`  
Run PHPStreamServer. This is a blocking operation that will return an exit code on exit.  
Command to run taken from command line options by default, but can be overridden in cmd parameter.  

### stop()
`Server::stop(): void`  
Stop all worker processes and exit.

### reload()
`Server::reload(): void`  
Reload PHPStreamServer processes. Workers with the `reloadable` option set to `false` will not be reloaded.

### getStatus()
`Server::getStatus(): MasterProcessStatus`  
Get an instance of the `MasterProcessStatus` class, which contains all the information about running processes.

Note that stop(), reload() and getStatus() methods can be called not only by the master or worker processes, but also by any other process.
For example, you can create a separate php file that reloads an already running PHPStreamServer instance.

```php title="reload.php"
$server = new Server();
$server->reload();
```
