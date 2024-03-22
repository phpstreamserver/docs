---
sidebar_position: 1
---

# Introduction
PHPStreamServer is a high performance event-loop based process manager, TCP, and UDP server.
It's primarily designed to run web applications and can replace traditional web application stacks such as nginx + php-fpm and supervisord.
It only requires php-cli to run and nothing more.  
PHPStreamServer operates on a multi-process architecture with epoll and non-blocking IO, allowing each process to handle thousands of concurrent connections.
It resides in memory, delivering exceptional performance.
The built-in sever supports tcp, udp, text, http, https protocols and provides an option to implement custom protocols.  
With a built-in PSR-7 HTTP server you can easily integrate any PSR-7 compatible framework with it in no time.

#### Requirements and limitations:
- Unix based OS (no windows support);
- *php-posix* and *php-pcntl* extensions;
- *php-uv* extension is not required, but highly recommended for better performance.

## Getting started
### Install composer packages
```bash
$ composer require luzrain/phpstreamserver
```

### Configure server
The simple http server might look like this:

```php title="server.php"
use Luzrain\PHPStreamServer\Exception\HttpException;
use Luzrain\PHPStreamServer\Listener;
use Luzrain\PHPStreamServer\Server;
use Luzrain\PHPStreamServer\Server\Connection\ConnectionInterface;
use Luzrain\PHPStreamServer\Server\Http\Psr7\Response;
use Luzrain\PHPStreamServer\Server\Protocols\Http;
use Luzrain\PHPStreamServer\WorkerProcess;
use Psr\Http\Message\ServerRequestInterface;

$server = new Server();
$server->addWorkers(
    new WorkerProcess(
        name: 'HTTP Server',
        onStart: function (WorkerProcess $worker) {
            $worker->startListener(new Listener(
                listen: 'tcp://0.0.0.0:80',
                protocol: new Http(),
                onMessage: function (ConnectionInterface $connection, ServerRequestInterface $data): void {
                    $response = match ($data->getUri()->getPath()) {
                        '/' => new Response(body: 'Hello world'),
                        '/ping' => new Response(body: 'pong'),
                        default => throw HttpException::createNotFoundException(),
                    };
                    $connection->send($response);
                },
            ));
        },
    ),
);

exit($server->run());
```

### Run
```bash
$ php server.php start
```

Server http://127.0.0.1:80/ in you browser to see "Hello world" message.
