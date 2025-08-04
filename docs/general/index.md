---
title: What is PHPStreamServer?
---

# What is PHPStreamServer?

PHPStreamServer is a high-performance, event-loop-based application server and supervisor for PHP, written in PHP.  
Built on top of the [AMPHP](https://amphp.org/) ecosystem and powered by the [Revolt](https://revolt.run/) event loop,
PHPStreamServer brings asynchronous capabilities that enable the development of efficient and scalable PHP applications.
PHPStreamServer includes a collection of plugins, making it highly extensible.
With these plugins, PHPStreamServer can replace traditional server stacks, such as the combination of Nginx with PHP-FPM, along with Cron and Supervisor.
By centralizing these functionalities into a single application server, PHPStreamServer reduces complexity and simplifies application deployment.
Written in PHP, it requires only PHP to run—no additional dependencies are needed.
Applications run in an always-loaded, in-memory model, significantly improving performance by eliminating the overhead of repeated
loading and initialization.

## Requirements and Limitations:
- Unix-based operating system
- **PHP 8.2** or higher
- **php-posix** and **php-pcntl** extensions
- **php-uv** extension (recommended for high-load environments)
