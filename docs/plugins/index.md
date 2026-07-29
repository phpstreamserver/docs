---
title: About Plugins
---

# About Plugins
PHPStreamServer has a plugin-based architecture. Optional plugins add capabilities such as an HTTP server, scheduling, and logging.
You can also create custom plugins to meet application-specific requirements.

## Official Plugins

### 🧩 HTTP Server Plugin
Asynchronous HTTP server with support for HTTP/2, HTTPS, static file serving, and gzip compression.  
[Read more →](/docs/plugins/http-server)

### 🧩 Scheduler Plugin
Scheduler for running tasks at fixed intervals, at specific dates and times, or on a cron schedule.  
[Read more →](/docs/plugins/scheduler)

### 🧩 Logger Plugin
Flexible logging system supporting multiple outputs, including files, stdout, syslog, and Graylog.  
[Read more →](/docs/plugins/logger)

### 🧩 File Monitor Plugin
Directory watcher that detects changes to monitored files and triggers reloads for reloadable workers.  
[Read more →](/docs/plugins/file-monitor)

### 🧩 Metrics Plugin
Prometheus-compatible metrics endpoint for monitoring server performance and tracking custom application metrics.  
[Read more →](/docs/plugins/metrics)
