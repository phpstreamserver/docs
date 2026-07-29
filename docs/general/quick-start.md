---
title: Quick Start
---

# Quick Start

Follow these steps to get started with PHPStreamServer and run your first application.
In this example, you will set up a basic HTTP server and a general-purpose worker.

## Install Composer Packages

```bash
$ composer require phpstreamserver/core phpstreamserver/http-server
```

## Configure a Simple Server

```php title="server.php"
<?php

require __DIR__ . '/vendor/autoload.php';

use Amp\Http\Server\HttpErrorException;
use Amp\Http\Server\Request;
use Amp\Http\Server\Response;
use PHPStreamServer\Core\Server;
use PHPStreamServer\Core\Worker\SupervisedWorker;
use PHPStreamServer\Plugin\HttpServer\HttpServerPlugin;
use PHPStreamServer\Plugin\HttpServer\Worker\HttpServerWorker;

$server = new Server();

$server->addPlugin(
    new HttpServerPlugin(),
);

$server->addWorker(
    new SupervisedWorker(
        name: 'Worker',
        count: 1,
        onStart: static function (SupervisedWorker $worker): void {
            $worker->logger->notice("Hello from worker!");
        }
    ),
    new HttpServerWorker(
        name: 'Web Server',
        count: 2,
        listen: '0.0.0.0:8080',
        onRequest: static function (Request $request, HttpServerWorker $worker): Response {
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

## Run the Server

```bash
$ php server.php start
```

PHPStreamServer prints a startup summary and worker logs to the console.

![Image](/img/phpss-start-output.png)

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in your browser.
