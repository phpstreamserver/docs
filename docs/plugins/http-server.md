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
use PHPStreamServer\Plugin\HttpServer\HttpServerProcess;
use PHPStreamServer\Plugin\HttpServer\ReloadStrategy\MaxRequestsReloadStrategy;

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

## Configuration

### 🔌 HttpServerPlugin

| Option                  | Type   | Default | Description                                                                        |
|-------------------------|--------|---------|------------------------------------------------------------------------------------|
| `http2Enable`           | bool   | true    | Optional. Enables support for HTTP/2 protocol.                                     |
| `httpConnectionTimeout` | int    | 60      | Optional. Timeout duration for idle HTTP connections.                              |
| `httpHeaderSizeLimit`   | int    | 32768   | Optional. Maximum allowed size for HTTP headers.                                   |
| `httpBodySizeLimit`     | int    | 131072  | Optional. Maximum allowed size for the HTTP request body.                          |
| `gzipMinLength`         | int    | 860     | Optional. Minimum response size required to enable gzip compression.               |
| `gzipTypesRegex`        | string | *       | Optional. Regular expression to match content types eligible for gzip compression. |

\* `#^(?:text/.*+|[^/]*+/xml|[^+]*\+xml|application/(?:json|(?:x-)?javascript))$#i`

### ⚙️ HttpServerProcess

This worker type is designed to handle incoming HTTP requests asynchronously.

| Option                 | Type                     | Default        | Description                                                              |
|------------------------|--------------------------|----------------|--------------------------------------------------------------------------|
| `listen`               | string\|Listen\|Listen[] | *not&nbsp;set* | The address at which the server is listening.                            |
| `name`                 | string                   | "HTTP Server"  | Optional. The name associated with the worker process.                   |
| `count`                | int                      | 1              | Optional. The number of processes to start.                              |
| `reloadable`           | bool                     | true           | Optional. Whether the worker can be reloaded with the reload command.    |
| `user`                 | string                   | *not&nbsp;set* | Optional. Unix user of process. Current user by default.                 |
| `group`                | string                   | *not&nbsp;set* | Optional. Unix group of process. Current group by default.               |
| `onStart`              | Closure                  | *not&nbsp;set* | Optional. A callback function executed when the worker starts.           |
| `onRequest`            | Closure                  | *not&nbsp;set* | Optional. A callback function executed when an HTTP request is received. |
| `onStop`               | Closure                  | *not&nbsp;set* | Optional. A callback function executed when the worker stops.            |
| `onReload`             | Closure                  | *not&nbsp;set* | Optional. A callback function executed when the worker reloads.          |
| `middleware`           | Middleware[]             | *not&nbsp;set* | Optional. A list of middlewares for processing HTTP requests.            |
| `reloadStrategies`     | ReloadStrategy[]         | *not&nbsp;set* | Optional. The strategies used to reload the worker.                      |
| `serverDir`            | string                   | *not&nbsp;set* | Optional. The directory to serve static files from.                      |
| `accessLog`            | bool                     | true           | Optional. Whether to log incoming HTTP requests.                         |
| `gzip`                 | bool                     | false          | Optional. Enables gzip compression.                                      |
| `connectionLimit`      | int                      | *not&nbsp;set* | Optional. The maximum number of connections per worker.                  |
| `connectionLimitPerIp` | int                      | *not&nbsp;set* | Optional. The maximum number of connections allowed per IP.              |
| `concurrencyLimit`     | int                      | *not&nbsp;set* | Optional. The maximum number of concurrent HTTP requests per worker.     |

### 🔄️ EachRequestReloadStrategy

This strategy reloads the worker after every HTTP request, making it primarily useful for debugging purposes.

### 🔄️ MaxRequestsReloadStrategy

This strategy reloads the worker after handling a specified number of HTTP requests.

| Option                 | Type | Default        | Description                                                               |
|------------------------|------|----------------|---------------------------------------------------------------------------|
| `maxRequests`          | int  | *not&nbsp;set* | The maximum number of requests a worker can handle before being reloaded. |
| `dispersionPercentage` | int  | 0              | Optional. Variability percantage to maxRequests. *                        |

\* Adds variability to the reload threshold to avoid restarting all workers simultaneously.
For example, with maxRequests = 1000 and dispersionPercentage = 20, workers will be reloaded after handling between 800 and 1000 requests.
