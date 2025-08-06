const ExampleCode = `
use Amp\\Http\\Server\\HttpErrorException;
use Amp\\Http\\Server\\Request;
use Amp\\Http\\Server\\Response;
use PHPStreamServer\\Core\\Server;
use PHPStreamServer\\Plugin\\HttpServer\\HttpServerPlugin;
use PHPStreamServer\\Plugin\\HttpServer\\Worker\\HttpServerProcess;

$server = new Server();

$server->addPlugin(
    new HttpServerPlugin(), // Register the HTTP server plugin
);

$server->addWorker(
    new HttpServerProcess(
        listen: '0.0.0.0:8080', // Address to listen on
        count: 2, // Number of worker processes
        onRequest: static function (Request $request): Response {
            return match ($request->getUri()->getPath()) {
                '/' => new Response(body: 'Hello world'),
                default => throw new HttpErrorException(404),
            };
        }
    ),
);

exit($server->run());
`;

export default ExampleCode;
