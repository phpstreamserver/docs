---
sidebar_position: 4
---

# Server class
Server class describes the tcp or udp server running in worker process.

Example:  
```php title="server.php"
use Luzrain\PhpRunner\PhpRunner;
use Luzrain\PhpRunner\Server\Connection\ConnectionInterface;
use Luzrain\PhpRunner\Server\Http\Psr7\Response;
use Luzrain\PhpRunner\Server\Protocols\Http;
use Luzrain\PhpRunner\Server\Server;
use Luzrain\PhpRunner\WorkerProcess;
use Psr\Http\Message\ServerRequestInterface;

$phpRunner = new PhpRunner();
$phpRunner->addWorkers(
    new WorkerProcess(
        onStart: function (WorkerProcess $worker) {
            $worker->startServer(
                // highlight-start
                new Server(
                    listen: 'tcp://0.0.0.0:80',
                    protocol: new Http(),
                    onMessage: function (ConnectionInterface $connection, ServerRequestInterface $data): void {
                        $connection->send(new Response(body: 'Hello world'));
                    },
                )
                // highlight-end
            );
        },
    ),
);

exit($phpRunner->run());
```

## Constructor options
### listen
Listen address. This is a string formatted as `tcp://0.0.0.0:80` where protocol can be tcp or udp.  
Type: `string`  

### protocol
Implementation of the ProtocolInterface.  
Type: `ProtocolInterface`  
Default: `new Raw()`  

### tls
Enable TLS encryption.  
Type: `bool`  
Default: `false`  

### tlsCertificate
Path to local certificate file on filesystem. It must be a PEM encoded file which contains your certificate and private key.  
It can optionally contain the certificate chain of issuers.  
Type: `string|null`  
Default: `null`  

### tlsCertificateKey
Path to local private key file on filesystem in case of separate files for certificate (tlsCertificate) and private key.   
Type: `string|null`  
Default: `null`  

### onConnect
Callback that is executed when a new TCP connection is established.  
Type: `null|Closure(ConnectionInterface):void`  
Default: `null`  
Callback parameters:
 - `ConnectionInterface`

### onMessage
Callback that is executed when a new protocol speciefic message is received.  
Type: `null|Closure(ConnectionInterface, mixed):void`  
Default: `null`  
Callback parameters:
 - `ConnectionInterface`
 - `mixed` protocol specific message

### onClose
Callback that is executed when a TCP connection is closed.  
Type: `null|Closure(ConnectionInterface):void`  
Default: `null`  
Callback parameters:
 - `ConnectionInterface`

### onError
Callback that is executed when an error occurs on the client's connection.  
Type: `null|Closure(ConnectionInterface, int, string):void`  
Default: `null`  
Callback parameters:  
 - `ConnectionInterface`
 - `int` error code
 - `string` error as string

## Methods

### stop()
`Server::stop(): void`  
Stop the server.  

### getListenAddress()
`WorkerProcess::getListenAddress(): string`  
Get the listening address. This is a string formatted as `tcp://0.0.0.0:80`.
