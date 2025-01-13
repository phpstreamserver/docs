---
title: Reload strategies
---

# Reload strategies

Reload strategies in PHPStreamServer define the rules for when workers should be restarted.
PHPStreamServer provides several built-in reload strategies of the box. Additionally, plugins can add new reload strategies, enhancing functionality.

### 🔄️ [TTLReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/TTLReloadStrategy.php)

Reloads a worker after a specified time-to-live (TTL) interval.
This ensures that workers are periodically restarted, which can help prevent issues caused by long-running processes.

| Option | Type | Default        | Description                       |
|--------|------|----------------|-----------------------------------|
| `ttl`  | int  | *not&nbsp;set* | Time-to-live interval in seconds. |

### 🔄️ [MaxMemoryReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/MaxMemoryReloadStrategy.php)

Reloads a worker when its memory consumption exceeds a specified threshold.
This helps manage memory leaks and prevents excessive memory usage.

| Option      | Type   | Default        | Description                            |
|-------------|--------|----------------|----------------------------------------|
| `maxMemory` | int    | *not&nbsp;set* | Memory consumption threshold in bytes. |

### 🔄️ [ExceptionReloadStrategy](https://github.com/phpstreamserver/core/blob/main/src/ReloadStrategy/ExceptionReloadStrategy.php)

Reloads a worker when an exception is thrown, except for specified exceptions that are excluded from triggering a reload.
This ensures workers don't remain in an unexpected state after encountering an error.

| Option              | Type           | Default        | Description                                                               |
|---------------------|----------------|----------------|---------------------------------------------------------------------------|
| `allowedExceptions` | class-string[] | *not&nbsp;set* | Optional. A list of exception class names that will not trigger a reload. |

### 🔄️[🔌](/docs/plugins/http-server) [EachRequestReloadStrategy](https://github.com/phpstreamserver/http-server/blob/main/src/ReloadStrategy/EachRequestReloadStrategy.php)

This is the part of [Http Server Plugin](/docs/plugins/http-server)

This strategy reloads the worker after every HTTP request, making it primarily useful for debugging purposes.

This strategy does not have any specific configurable options.

### 🔄️[🔌](/docs/plugins/http-server) [MaxRequestsReloadStrategy](https://github.com/phpstreamserver/http-server/blob/main/src/ReloadStrategy/MaxRequestsReloadStrategy.php)

This is the part of [Http Server Plugin](/docs/plugins/http-server)

This strategy reloads the worker after handling a specified number of HTTP requests.

| Option                 | Type | Default        | Description                                                               |
|------------------------|------|----------------|---------------------------------------------------------------------------|
| `maxRequests`          | int  | *not&nbsp;set* | The maximum number of requests a worker can handle before being reloaded. |
| `dispersionPercentage` | int  | 0              | Optional. Variability percantage to maxRequests. *                        |

\* Adds variability to the reload threshold to avoid restarting all workers simultaneously.
For example, with maxRequests = 1000 and dispersionPercentage = 20, workers will be reloaded after handling between 800 and 1000 requests.
