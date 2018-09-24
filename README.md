# System Information API
This is a thin wrapper around [systeminformation](https://www.npmjs.com/package/systeminformation) to expose it as a REST API.

# Dependencies
You have to have [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) setup. Uses [express](http://expressjs.com) to create minimal web service and [minimist](https://github.com/substack/minimist) to process command line argument.  For testing I rely on [mocha](https://mochajs.org)/[chai](https://www.chaijs.com)/[chai-http](https://github.com/chaijs/chai-http).
All the dependencies are automatically installed by npm - see below.


# How to Use it

## Download

Clone or download it from git hub:

```git clone https://github.com/asokolsky/systeminformation-api.git```

or just use npm to download and install it:

```npm i systeminformation-api```

## Build
Run in the shell in the directory where you cloned systeminformation-api:

```npm install```

## Run
and then in the shell

```node index.js```

Finally, point your browser
http://localhost:3000/api/systeminformation/cpu

## REST APIs Supported

Only GET method is supported.   The URIs start with ```/api/systeminformation``` followed by:

- empty string - returns systeminformation package version
- time - returns time JSON
- system
- bios
- baseboard
- cpu
- cpuFlags
- cpuCache
- cpuCurrentSpeed
- cpuTemperature
- mem
- memLayout
- diskLayout
- battery
- graphics
- osInfo
- versions
- shell
- users
- fsSize
- blockDevices
- fsStats
- disksIO
- networkInterfaces
- networkInterfaceDefault
- networkStats
- networkConnections
- currentLoad
- fullLoad
- processes
- dockerContainers
- dockerAll
- getStaticData
- getDynamicData

For a full description of the underlying functionality see the [systeminformation documentation](https://www.npmjs.com/package/systeminformation).


# Credits
[systeminformation](https://www.npmjs.com/package/systeminformation)
 by [Sebastian Hildebrandt](https://github.com/sebhildebrandt)

# TODO

## Package it as a Service
https://github.com/coreybutler/node-windows

https://github.com/tallesl/qckwinsvc

## Package it as a Docker Image
https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js

# DONE
## Publish it in npm
DONE: https://www.npmjs.com/package/systeminformation-api
