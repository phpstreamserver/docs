---
title: Quick Start
---

# Quick Start

Follow these steps to get started with PHPStreamServer and run your first application on it!
In this example, we'll run a basic HTTP server and general purpose worker.

### Install composer packages

```bash
$ composer require phpstreamserver/core phpstreamserver/http-server
```

### Configure a simple server

```php
// server.php

use Amp\Http\Server\HttpErrorException;
use Amp\Http\Server\Request;
use Amp\Http\Server\Response;
use PHPStreamServer\Core\Plugin\Supervisor\WorkerProcess;
use PHPStreamServer\Core\Server;
use PHPStreamServer\Plugin\HttpServer\HttpServerPlugin;
use PHPStreamServer\Plugin\HttpServer\HttpServerProcess;

$server = new Server();

$server->addPlugin(
    new HttpServerPlugin(),
);

$server->addWorker(
    new WorkerProcess(
        name: 'Worker',
        count: 1,
        onStart: function (WorkerProcess $worker): void {
            $worker->logger->notice("Hello from worker!");
        }
    ),
    new HttpServerProcess(
        name: 'Web Server',
        count: 2,
        listen: '0.0.0.0:8080',
        onRequest: function (Request $request, HttpServerProcess $worker): Response {
            return match ($request->getUri()->getPath()) {
                '/' => new Response(body: 'Hello world'),
                '/ping' => new Response(body: 'pong'),
                default => throw new HttpErrorException(404),
            };
        }
    ),
);

exit($server->run());
```

### Run server

```bash
$ php server.php start
```

The output will appear in the console like this:
![Image](/img/phpss-start-output.png)

Now, open your web browser and go to http://127.0.0.1:8080/