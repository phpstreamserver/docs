---
title: HTTP Server Plugin
---

# HTTP Server Plugin
Asynchronous HTTP server with support for HTTP/2, HTTPS, static file serving, and gzip compression.

## Installation
```bash
$ composer require phpstreamserver/http-server
```

Response compression requires the PHP `zlib` extension.

## Usage Example
```php title="server.php"
<?php

require __DIR__ . '/vendor/autoload.php';

use Amp\Http\Server\HttpErrorException;
use Amp\Http\Server\Request;
use Amp\Http\Server\Response;
use PHPStreamServer\Core\Server;
use PHPStreamServer\Plugin\HttpServer\HttpServerPlugin;
use PHPStreamServer\Plugin\HttpServer\ReloadStrategy\MaxRequestsReloadStrategy;
use PHPStreamServer\Plugin\HttpServer\Worker\HttpServerWorker;

$server = new Server();

$server->addPlugin(
    new HttpServerPlugin(
        // Optional. HttpServerPlugin configuration
    ),
);

$server->addWorker(
    new HttpServerWorker(
        // HttpServerWorker configuration
        name: 'Web Server', // Worker name
        listen: '0.0.0.0:8080', // Address to listen on
        count: 2, // Number of worker processes
        onRequest: function (Request $request, HttpServerWorker $worker): Response {
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

| Parameter               | Type   | Default                  | Description                                                                                     |
|-------------------------|--------|--------------------------|-------------------------------------------------------------------------------------------------|
| `http2Enabled`          | bool   | true                     | Optional. Enables support for HTTP/2 protocol.                                                  |
| `httpConnectionTimeout` | int    | 60                       | Optional. Timeout duration for idle HTTP connections.                                           |
| `httpHeaderSizeLimit`   | int    | 32768                    | Optional. Maximum allowed size for HTTP headers.                                                |
| `httpBodySizeLimit`     | int    | 131072                   | Optional. Maximum allowed size for the HTTP request body.                                       |
| `gzipMinLength`         | int    | 860                      | Optional. Minimum response body length required for compression when `gzip` is enabled.         |
| `gzipTypesRegex`        | string | *See&nbsp;below&nbsp;\** | Optional. Regular expression that determines which response Content-Type values are compressed. |

\* `#^(?:text/.*+|[^/]*+/xml|[^+]*\+xml|application/(?:json|(?:x-)?javascript))$#i`

## Worker Configuration

### ⚙️ HttpServerWorker
Worker class: [HttpServerWorker](https://github.com/phpstreamserver/http-server/blob/main/src/Worker/HttpServerWorker.php)  
This worker type handles incoming HTTP requests asynchronously.

| Parameter              | Type                                                                                                                                                                                     | Default       | Description                                                                                                             |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------|
| `listen`               | string\|[Listen](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php)\|string[]\|[Listen[]](https://github.com/phpstreamserver/http-server/blob/main/src/Listen.php) | *required*    | Address or addresses on which to listen.                                                                                |
| `name`                 | string                                                                                                                                                                                   | `HTTP Server` | Optional. Worker name. Defaults to `HTTP Server`.                                                                       |
| `count`                | int\|null                                                                                                                                                                                | null          | Optional. Number of worker processes. Must be between `1` and `1024`. Defaults to the detected CPU count.               |
| `reloadable`           | bool\|true                                                                                                                                                                               | true          | Optional. Whether the worker can be reloaded.                                                                           |
| `user`                 | string\|null                                                                                                                                                                             | null          | Optional. Unix user name or user ID (UID).                                                                              |
| `group`                | string\|null                                                                                                                                                                             | null          | Optional. Unix group name or group ID (GID).                                                                            |
| `onStart`              | Closure\|null                                                                                                                                                                            | null          | Optional. `Closure(HttpServerWorker): void` callback executed when the worker starts.                                   |
| `onRequest`            | Closure\|null                                                                                                                                                                            | null          | Optional. `Closure(Request, HttpServerWorker): Response`. HTTP request handler.                                         |
| `onStop`               | Closure\|null                                                                                                                                                                            | null          | Optional. `Closure(HttpServerWorker): void` callback executed when the worker stops.                                    |
| `onReload`             | Closure\|null                                                                                                                                                                            | null          | Optional. `Closure(HttpServerWorker): void` callback executed when the worker reloads.                                  |
| `middleware`           | [Middleware[]](https://github.com/amphp/http-server/blob/3.x/src/Middleware.php)                                                                                                         | []            | Optional. Additional HTTP middleware.                                                                                   |
| `reloadStrategies`     | [ReloadStrategy[]](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ReloadStrategy.php)                                                                              | []            | Optional. Strategies for triggering automatic worker reloads.                                                           |
| `documentRoot`         | string\|null                                                                                                                                                                             | null          | Optional. Directory from which to serve static files.                                                                   |
| `accessLog`            | bool                                                                                                                                                                                     | true          | Optional. Whether to log incoming HTTP requests.                                                                        |
| `gzip`                 | bool                                                                                                                                                                                     | false         | Optional. Enables response compression. Requires `ext-zlib`.                                                            |
| `connectionLimit`      | int\|null                                                                                                                                                                                | null          | Optional. Maximum number of simultaneous connections per worker. Disabled by default.                                   |
| `connectionLimitPerIp` | int\|null                                                                                                                                                                                | null          | Optional. Maximum number of simultaneous connections per IPv4 address or IPv6 /56 block. Loopback addresses are exempt. |
| `concurrencyLimit`     | int\|null                                                                                                                                                                                | null          | Optional. Maximum number of concurrent requests per worker. Disabled by default.                                        |

## Reload Strategies

### 🔄️ EachRequestReloadStrategy
Reload strategy class: [EachRequestReloadStrategy](https://github.com/phpstreamserver/http-server/blob/main/src/ReloadStrategy/EachRequestReloadStrategy.php)  
This strategy requests a worker reload after every HTTP request, which makes it primarily useful for debugging purposes.

### 🔄️ MaxRequestsReloadStrategy
Reload strategy class: [MaxRequestsReloadStrategy](https://github.com/phpstreamserver/http-server/blob/main/src/ReloadStrategy/MaxRequestsReloadStrategy.php)  
This strategy reloads the worker when its request count reaches the configured threshold.

| Parameter              | Type | Default    | Description                                                               |
|------------------------|------|------------|---------------------------------------------------------------------------|
| `maxRequests`          | int  | *required* | The maximum number of requests a worker can handle before being reloaded. |
| `dispersionPercentage` | int  | 0          | Optional. Percentage by which the request threshold may be reduced.       |

Parameter `dispersionPercentage` adds variability to the reload threshold to prevent all workers from restarting at the same time.
For example, with `maxRequests: 1000` and `dispersionPercentage: 20`, the threshold is set between `800` and `1000` requests.
