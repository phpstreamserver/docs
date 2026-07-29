---
title: What is PHPStreamServer?
---

# What is PHPStreamServer?

PHPStreamServer is an application server and process manager for modern PHP applications.

Built entirely in PHP, it uses an event loop to run application workers and supervise long-lived processes.

Its plugin system provides HTTP serving, task scheduling, and process supervision into a single runtime, without requiring separate tools such as Nginx, PHP-FPM, Cron, or Supervisor.

Powered by the [Revolt](https://revolt.run/) event loop and the [AMPHP](https://amphp.org/) ecosystem, PHPStreamServer supports asynchronous and concurrent execution.

## Requirements and Limitations

- Unix-like operating system
- **PHP 8.2** or later
- **ext-pcntl** and **ext-posix**
- **ext-uv** (optional; suggested for better event-loop performance)
