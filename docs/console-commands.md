---
sidebar_position: 7
---

# Console commands
PHPStreamServer provides a number of commands for management.  
For example, to start the server, you would run the following command:  
```bash
$ php server.php start
```

## Supported commands
### start
Start the server.  
Add *-d* or *--daemon* options to run the server in daemon mode.  

### stop
Stop the server.  

### reload
Reload all the worker processes.  
Note that only workers with [reloadable](/docs/WorkerProcess#reloadable) option set to true will be reloaded.

### status
Show server status.  

### workers
Show workers status.  

### processes
Show processes status.  

### connections
Show active connections.  

### status-json
Print all the status information in json format.  
