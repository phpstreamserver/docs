# Reload strategies
PHPRunner supports reload strategies that can trigger a worker process reload for various reasons such as TTL limit or thrown exception.
Here is a list of included strategies that you can use.

Example:
```php title="server.php"

use Luzrain\PhpRunner\PhpRunner;
use Luzrain\PhpRunner\ReloadStrategy\ExceptionReloadStrategy;
use Luzrain\PhpRunner\ReloadStrategy\TTLReloadStrategy;
use Luzrain\PhpRunner\Server\Protocols\Http;
use Luzrain\PhpRunner\Server\Server;
use Luzrain\PhpRunner\WorkerProcess;

$phpRunner = new PhpRunner();
$phpRunner->addWorkers(
    new WorkerProcess(
        onStart: function (WorkerProcess $worker) {
            $worker->startServer(new Server(
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
