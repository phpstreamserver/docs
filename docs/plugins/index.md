---
title: About plugins
---

# About plugins

PHPStreamServer is extensible thanks to its plugin-based architecture.
It ships with a number of plugins that extend its functionality, enabling features like HTTP server, scheduling tasks, logging, monitoring, and more.
PHPStreamServer also allows developers to create and implement their own custom plugins.

<h3>Available plugins</h3>

- [Http Server](/docs/plugins/http-server): An asynchronous HTTP server with HTTP/2, HTTPS, static file serving, and gzip compression.
- [Scheduler](/docs/plugins/scheduler): A cron-like scheduler for running tasks at specified intervals.
- [Logger](/docs/plugins/logger): A flexible logging system that supports multiple outputs, including files, stderr, syslog, and Graylog.
- [File Monitor](/docs/plugins/file-monitor): Monitors directories for changes and automatically reloads workers whenever a file is modified.
- [Metrics](/docs/plugins/metrics): Exposes prometheus metrics to monitor server performance and collect custom application metrics.

