---
sidebar_position: 1
---

# Http
PSR-7 compatible HTTP protocol implementation.

## Constructor options
### maxBodySize
Type: `int`  
Default: `0`  
The maximum allowed size of the client http request body in bytes.  
If the size in a request exceeds the value, the 413 (Request Entity Too Large) error is returned to the client.  
Setting size to 0 disables checking of client request body size.  