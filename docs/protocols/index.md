# Protocols
PHPStreamServer was originally designed to handle the HTTP protocol and ships with only a few protocol implementations.
However, it is possible to implement custom protocols.

Example:
```php title="server.php"
use Luzrain\PHPStreamServer\Listener;
use Luzrain\PHPStreamServer\Server;
use Luzrain\PHPStreamServer\Server\Protocols\Http;
use Luzrain\PHPStreamServer\WorkerProcess;

$server = new Server();
$server->addWorkers(
    new WorkerProcess(
        onStart: function (WorkerProcess $worker) {
            $worker->startListener(
                new Listener(
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
