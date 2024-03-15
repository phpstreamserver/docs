# Protocols
PHPRunner was originally designed to handle the HTTP protocol and ships with only a few protocol implementations.
However, it is possible to implement custom protocols.

Example:
```php title="server.php"

use Luzrain\PhpRunner\PhpRunner;
use Luzrain\PhpRunner\Server\Protocols\Http;
use Luzrain\PhpRunner\Server\Server;
use Luzrain\PhpRunner\WorkerProcess;

$phpRunner = new PhpRunner();
$phpRunner->addWorkers(
    new WorkerProcess(
        onStart: function (WorkerProcess $worker) {
            $worker->startServer(
                new Server(
                    listen: 'tcp://0.0.0.0:80',
                    // highlight-start
                    protocol: new Http(),
                    // highlight-end
                )
            );
        },
    ),
);
```
