---
title: What is PHPStreamServer?
---

# What is PHPStreamServer?

![PHP >=8.2](https://img.shields.io/badge/PHP->=8.2-777bb3.svg)
![Version](https://img.shields.io/github/v/tag/phpstreamserver/phpstreamserver?label=Version&filter=v*.*.*&sort=semver&color=374151)
![Tests Status](https://img.shields.io/github/actions/workflow/status/phpstreamserver/phpstreamserver/tests.yaml?label=Tests&branch=main)

PHPStreamServer is a high-performance, event-loop-based application server and supervisor for PHP, written in PHP.  
Built on top of the [AMPHP](https://amphp.org/) ecosystem and powered by the [Revolt](https://revolt.run/) event loop,
PHPStreamServer delivers asynchronous capabilities that empower the development of efficient and scalable PHP applications.
PHPStreamServer ships with a collection of plugins, making it highly extensible.
With the power of plugins, PHPStreamServer can replace traditional setups such as nginx, php-fpm, cron, and supervisor.
By centralizing these functionalities into a single application server, it reduces complexity and simplifies application deployment.
Being written in PHP, it only requires PHP to run—no additional dependencies are needed.
Applications run in an always-loaded, in-memory model, which significantly improves performance by eliminating the overhead of repeated
loading and initialization.

## Requirements and limitations:
- Unix based OS (no windows support);
- *php-posix* and *php-pcntl* extensions;
- *php-uv* extension is recommended for high-load environments.

## Features

### Supervisor
- Restart workers when memory usage exceeds a defined threshold.
- Restart workers after a specified uptime.
- Restart workers in case of exceptions.
- Supports supervising external processes.

### HTTP Server
- Asynchronous HTTP server with HTTP/2 and HTTPS support.
- Gzip compression.
- Serve static files from specified directories.
- Middleware support.

### Scheduler
- Support cron like syntax for define schedules.
- Support relative syntax as supported by \DateInterval.

### Logger
- Channel-based and severity-based log routing.
- Save logs to files with rotation and compression.
- Stdout or stderr logging.
- Configurable formatters.
- Syslog.
- Graylog (GELF).

### File Monitor
- Monitors directories and automatically restart workers whenever files change.

### Metrics
- Exposes a prometheus metrics endpoint for monitoring and observability.
- Provides default metrics for monitoring server performance.
- Allows to define custom metrics for application-specific monitoring.