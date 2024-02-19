---
sidebar_position: 2
---

# Text
The TEXT protocol format follows the pattern of data+newline character.  
A newline character is included at the end of each data packet to indicate the end of the packet.  

## Constructor options
### maxBodySize
Type: `int`  
Default: `1048576` (1MB)  
The maximum allowed size of the request.  
