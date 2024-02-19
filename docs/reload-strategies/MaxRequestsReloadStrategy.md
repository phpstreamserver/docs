---
sidebar_position: 4
---

# MaxRequestsReloadStrategy
Reload worker on every *maxRequests* request.

## Constructor options
### maxRequests
Type: `int`  
Max requests after that worker will be restarted.   

### dispersionPercentage
Type: `int`  
Default: `0`  
To prevent simultaneous restart of all workers *dispersionPercentage* can be set.  
For example 1000 *maxRequests* and 20% *dispersionPercentage* will restart between 800 and 1000.  
