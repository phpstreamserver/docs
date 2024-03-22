---
sidebar_position: 3
---

# WorkerProcess class
WorkerProcess class describes the worker process to run.

Example:  
```php title="server.php"
use Luzrain\PHPStreamServer\Server;
use Luzrain\PHPStreamServer\WorkerProcess;

$server = new Server();
$server->addWorkers(
// highlight-start
    new WorkerProcess(
        name: 'worker 1',
        count: 2,
        onStart: function (WorkerProcess $worker) {
            echo "Worker 1 has started";
        },
    )
// highlight-end
);

exit($server->run());
```

## Constructor options
### name
Type: `string`  
Default: `none`  
Worker name.  

### cout
Type: `int`  
Default: `1`  
Processes count.  

### reloadable
Type: `bool`  
Default: `true`  
Is the process reloadable with a reload command or not.  

### user
Type: `string|null`  
Default: `null`  
Worker process user. You should have root privileges to change the process user.  

### group
Type: `string|null`  
Default: `null`  
Worker process group. You should have root privileges to change the process group.  

### onStart
Type: `null|Closure(WorkerProcess):void`  
Default: `null`
Callback that is executed after the worker process is started.
Callback parameters:
- `WorkerProcess`

### onStop
Type: `null|Closure(WorkerProcess):void`  
Default: `null`  
Callback that is executed before the worker process is stopped.  
Callback parameters:
- `WorkerProcess`

### onReload
Type: `null|Closure(WorkerProcess):void`  
Default: `null`  
Callback that is executed before the worker process is reloaded.  
Callback parameters:
- `WorkerProcess`

## Methods

### startListener()
`WorkerProcess::startListener(Listener $listener): void`  
Starts the tcp or udp listener inside the worker process.  
Should be called after the worker process is started, usually in the `onStart` callback.  
It is possible to run more than one listener in a single worker process.  
See more about [Listener](/docs/Listener) object.  

### stopListener()
`WorkerProcess::stopServer(Listener $listener): void`  
Stop the tcp or udp listening server inside the worker process.  

### addReloadStrategies()
`WorkerProcess::addReloadStrategies(ReloadStrategyInterface ...$reloadStrategies): void`  
Add one or more [reload strategies](/docs/reload-strategies). 

### setLogger()
`WorkerProcess::setLogger(LoggerInterface $logger): void`  
Replace the worker process logger with any PSR-3 compatible implementation.

### getLogger()
`WorkerProcess::getLogger(): LoggerInterface`  
Get worker process logger.

### getEventLoop()
`WorkerProcess::getEventLoop(): Driver`  
Get Event Loop. Returns the [Revolt event loop driver](https://github.com/revoltphp/event-loop/blob/main/src/EventLoop/Driver.php). 

### getEventLoop()
`WorkerProcess::getEventLoop(): Driver`  
Get Event Loop. Returns the [Revolt event loop driver](https://github.com/revoltphp/event-loop/blob/main/src/EventLoop/Driver.php). 

### getName()
`WorkerProcess::getName(): string`  
Get worker process name.  

### getCount()
`WorkerProcess::getCount(): int`  
Get number of worker process instances.  

### isReloadable()
`WorkerProcess::isReloadable(): bool`  
Is the worker process reloadable by reload command.  

### getUser()
`WorkerProcess::getUser(): string`  
Get worker process user.  

### getGroup()
`WorkerProcess::getGroup(): string`  
Get worker process group.  

### setErrorHandler()
`WorkerProcess::setErrorHandler(\Closure $errorHandler): void`  
Set error handler to handle exceptions thrown in event loop.  

### stop()
`WorkerProcess::stop(int $code): void`  
Stop the current worker process.  
Note that immediately after the process is stopped, the master will spawn a new process.  

### reload()
`WorkerProcess::reload(): void`  
Reload the current worker process.  

### detach()
`WorkerProcess::detach(): void`  
Stop and destroy the process event loop and communication with the master process.  
After the process is detached, only the basic supervisor will work for it.  
This can be useful to give control to an external program and have it monitored by the master process, which will restart the process if it dies.  
Example of a simple supervisor that keeps an external program alive: 

```php title="server.php"
use Luzrain\PHPStreamServer\Server;
use Luzrain\PHPStreamServer\WorkerProcess;

$server = new Server();
$server->addWorkers(
    new WorkerProcess(
        name: 'External program',
        count: 2,
        onStart: function (WorkerProcess $worker) {
            // highlight-start
            $worker->detach();
            pcntl_exec('/bin/external-program');
            // highlight-end
        },
    )
);

exit($server->run());
```
