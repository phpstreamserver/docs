---
title: Http Server Plugin
---

# Http Server Plugin
Asynchronous HTTP server with support for HTTP/2, HTTPS, static file serving, and Gzip compression.

## Installation
```bash
$ composer require phpstreamserver/http-server
```

## Example of Usage
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
        // Optional. HttpServerPlugin configuration
    ),
);

$server->addWorker(
    new HttpServerProcess(
        // HttpServerProcess configuration
        name: 'Web Server', // Worker name
        listen: '0.0.0.0:8080', // Address to listen on
        count: 2, // Number of worker processes
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

## Plugin Configuration

### 🧩 HttpServerPlugin
Plugin class: [HttpServerPlugin](https://github.com/phpstreamserver/http-server/blob/main/src/HttpServerPlugin.php)

| Option                  | Type   | Default | Description                                                               |
|-------------------------|--------|---------|---------------------------------------------------------------------------|
| `http2Enable`           | bool   | true    | Optional. Enables support for HTTP/2 protocol.                            |
| `httpConnectionTimeout` | int    | 60      | Optional. Timeout duration for idle HTTP connections.                     |
| `httpHeaderSizeLimit`   | int    | 32768   | Optional. Maximum allowed size for HTTP headers.                          |
| `httpBodySizeLimit`     | int    | 131072  | Optional. Maximum allowed size for the HTTP request body.                 |
| `gzipMinLength`         | int    | 860     | Optional. Minimum response size required to enable gzip compression.      |
| `gzipTypesRegex`        | string | *       | Optional. Regular expression to match content types that will be gzipped. |

\* `#^(?:text/.*+|[^/]*+/xml|[^+]*\+xml|application/(?:json|(?:x-)?javascript))$#i`

## Worker Configuration

### ⚙️ HttpServerProcess
Worker class: [HttpServerProcess](https://github.com/phpstreamserver/http-server/blob/main/src/Worker/HttpServerProcess.php)  
This worker type handles incoming HTTP requests asynchronously.

| Option                 | Type                                                                                                                                                                           | Default        | Description                                                               |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|---------------------------------------------------------------------------|
| `listen`               | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php)\|[Listen[]](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *not&nbsp;set* | The address at which the server is listening.                             |
| `name`                 | string                                                                                                                                                                         | "HTTP Server"  | Optional. The name associated with the worker process.                    |
| `count`                | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The number of processes to start. Defaults to number of CPUs.   |
| `reloadable`           | bool                                                                                                                                                                           | true           | Optional. Whether the worker can be reloaded with the reload command.     |
| `user`                 | string                                                                                                                                                                         | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                  |
| `group`                | string                                                                                                                                                                         | *not&nbsp;set* | Optional. Unix group of process. Current group by default.                |
| `onStart`              | Closure                                                                                                                                                                        | *not&nbsp;set* | Optional. A callback function executed when the worker starts.            |
| `onRequest`            | Closure                                                                                                                                                                        | *not&nbsp;set* | Optional. A callback function executed when an HTTP request is received.  |
| `onStop`               | Closure                                                                                                                                                                        | *not&nbsp;set* | Optional. A callback function executed when the worker stops.             |
| `onReload`             | Closure                                                                                                                                                                        | *not&nbsp;set* | Optional. A callback function executed when the worker reloads.           |
| `middleware`           | [Middleware[]](https://github.com/amphp/http-server/blob/3.x/src/Middleware.php)                                                                                               | *not&nbsp;set* | Optional. A list of middlewares for processing HTTP requests.             |
| `reloadStrategies`     | [ReloadStrategy[]](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ReloadStrategy.php)                                                                    | *not&nbsp;set* | Optional. The strategies used to reload the worker.                       |
| `serverDir`            | string                                                                                                                                                                         | *not&nbsp;set* | Optional. The directory to serve static files from.                       |
| `accessLog`            | bool                                                                                                                                                                           | true           | Optional. Whether to log incoming HTTP requests.                          |
| `gzip`                 | bool                                                                                                                                                                           | false          | Optional. Enables gzip compression.                                       |
| `connectionLimit`      | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of connections per worker.                   |
| `connectionLimitPerIp` | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of connections allowed per IP.               |
| `concurrencyLimit`     | int                                                                                                                                                                            | *not&nbsp;set* | Optional. The maximum number of concurrent HTTP requests per worker.      |

## Reload Strategies

### 🔄️ EachRequestReloadStrategy
Reload strategy class: [EachRequestReloadStrategy](https://github.com/phpstreamserver/http-server/blob/main/src/ReloadStrategy/EachRequestReloadStrategy.php)  
This strategy reloads the worker after every HTTP request, which makes it primarily useful for debugging purposes.  
It does not have any specific configurable options.

### 🔄️ MaxRequestsReloadStrategy
Reload strategy class: [MaxRequestsReloadStrategy](https://github.com/phpstreamserver/http-server/blob/main/src/ReloadStrategy/MaxRequestsReloadStrategy.php)  
This strategy reloads the worker after it has handled a specified number of HTTP requests.

| Option                 | Type | Default        | Description                                                               |
|------------------------|------|----------------|---------------------------------------------------------------------------|
| `maxRequests`          | int  | *not&nbsp;set* | The maximum number of requests a worker can handle before being reloaded. |
| `dispersionPercentage` | int  | 0              | Optional. Variability percantage to maxRequests. *                        |

\* Adds variability to the reload threshold to prevent all workers from restarting at the same time.
For example, with maxRequests = 1000 and dispersionPercentage = 20, workers will reload after handling between 800 and 1000 requests.
