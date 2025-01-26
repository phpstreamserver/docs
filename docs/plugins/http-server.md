---
title: Http Server
---

# Http Server Plugin

The HTTP Server Plugin provides an asynchronous HTTP server and includes additional reload strategies.

## Installation

```bash
$ composer require phpstreamserver/http-server
```

## Example of usage

```php title="server.php"
use Amp\Http\Server\HttpErrorException;
use Amp\Http\Server\Request;
use Amp\Http\Server\Response;
use PHPStreamServer\Core\Server;
use PHPStreamServer\Plugin\HttpServer\HttpServerPlugin;
use PHPStreamServer\Plugin\HttpServer\ReloadStrategy\MaxRequestsReloadStrategy;
use PHPStreamServer\Plugin\HttpServer\Worker\HttpServerProcess;

$server = new Server();

$server->addPlugin(
    new HttpServerPlugin(
        // HttpServerPlugin configuration
    ),
);

$server->addWorker(
    new HttpServerProcess(
        // HttpServerProcess configuration
        name: 'Web Server',
        count: 2,
        listen: '0.0.0.0:8080',
        onRequest: function (Request $request, HttpServerProcess $worker): Response {
            return match ($request->getUri()->getPath()) {
                '/' => new Response(body: 'Hello world'),
                '/ping' => new Response(body: 'pong'),
                default => throw new HttpErrorException(404),
            };
        },
        reloadStrategies: [
            new MaxRequestsReloadStrategy(100),
        ],
    ),
);

exit($server->run());
```
