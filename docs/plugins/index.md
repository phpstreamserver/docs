---
title: About Plugins
---

# About Plugins
PHPStreamServer features a plugin-based architecture that makes it extensible.
It comes with a set of optional plugins that add capabilities such as HTTP server, scheduler, logger, and more.
Additionally, developers can create custom plugins to extend the server and customize it to their specific requirements.

### Official Plugins

#### 🧩 Http Server Plugin
Asynchronous HTTP server with support for HTTP/2, HTTPS, static file serving, and Gzip compression.  
[Read more →](/docs/plugins/http-server)

#### 🧩 Scheduler Plugin
Cron-like scheduler for executing tasks at specified intervals.  
[Read more →](/docs/plugins/scheduler)

#### 🧩 Logger Plugin
Flexible logging system supporting multiple outputs, including files, stdout, syslog, and Graylog.  
[Read more →](/docs/plugins/logger)

#### 🧩 File Monitor Plugin
Directory watcher that triggers automatic worker reloads when files are modified.  
[Read more →](/docs/plugins/file-monitor)

#### 🧩 Metrics Plugin
Prometheus-compatible metrics endpoint for monitoring server performance and tracking custom application metrics.  
[Read more →](/docs/plugins/metrics)
