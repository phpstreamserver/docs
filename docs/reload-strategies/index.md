# Reload strategies
PHPStreamServer supports reload strategies that can trigger a worker process reload for various reasons such as TTL limit or thrown exception.
Here is a list of included strategies that you can use.

Example:
```php title="server.php"
use Luzrain\PHPStreamServer\Listener;
use Luzrain\PHPStreamServer\Server;
use Luzrain\PHPStreamServer\ReloadStrategy\ExceptionReloadStrategy;
use Luzrain\PHPStreamServer\ReloadStrategy\TTLReloadStrategy;
use Luzrain\PHPStreamServer\Server\Protocols\Http;
use Luzrain\PHPStreamServer\WorkerProcess;

$server = new Server();
$server->addWorkers(
    new WorkerProcess(
        onStart: function (WorkerProcess $worker) {
            $worker->startListener(new Listener(
                listen: 'tcp://0.0.0.0:80',
                protocol: new Http(),
            ));

            // highlight-start
            $worker->addReloadStrategies(
                new ExceptionReloadStrategy(),
                new TTLReloadStrategy(600),
            );
            // highlight-end
        },
    ),
);
```
