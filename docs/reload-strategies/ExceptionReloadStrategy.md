---
sidebar_position: 1
---

# ExceptionReloadStrategy
Reload worker each time that an exception is thrown during the worker lifetime.

## Constructor options
### allowedExceptions
Type: `array<class-string<Throwable>>`  
Default: `[]`  
Exceptions that do not trigger a reload.  
By default, *HttpException* does not trigger a reload.  