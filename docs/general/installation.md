---
title: Installation
---

# Installation

## PHPStreamServer core
The core component is required to run PHPStreamServer.
It includes the core server functionality as well as the supervisor to manage worker processes.
```bash
$ composer require phpstreamserver/core
```

## PHPStreamServer plugins
To extend the functionality of PHPStreamServer, you can install additional [plugins](/docs/plugins/).  
Each plugin is optional, so you can choose only those that are relevant to your application.

### Http Server Plugin
An asynchronous HTTP server with HTTP/2, HTTPS, static file serving, and gzip compression.
```bash
$ composer require phpstreamserver/http-server
```
[Read more](/docs/plugins/http-server)

### Scheduler Plugin
A cron-like scheduler for running tasks at specified intervals.
```bash
$ composer require phpstreamserver/scheduler
```
[Read more](/docs/plugins/scheduler)

### Logger Plugin
A flexible logging system that supports multiple outputs, including files, stderr, syslog, and Graylog.
```bash
$ composer require phpstreamserver/logger
```
[Read more](/docs/plugins/logger)

### File Monitor Plugin
Monitors directories for changes and automatically reloads workers whenever a file is modified.
```bash
$ composer require phpstreamserver/file-monitor
```
[Read more](/docs/plugins/file-monitor)

### Metrics Plugin
Exposes prometheus metrics to monitor server performance and collect custom application metrics.
```bash
$ composer require phpstreamserver/metrics
```
[Read more](/docs/plugins/metrics)
