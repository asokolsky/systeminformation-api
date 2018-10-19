# System Information API
This is a thin wrapper around [systeminformation](https://www.npmjs.com/package/systeminformation) to expose it as a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API.  There is also a [gRPC](https://grpc.io) server and a sample client

# Dependencies
You have to have [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) setup. Uses [express](http://expressjs.com) to create minimal web service and [minimist](https://github.com/substack/minimist) to process command line argument.  For testing I rely on [mocha](https://mochajs.org)/[chai](https://www.chaijs.com)/[chai-http](https://github.com/chaijs/chai-http).
All the dependencies are automatically installed by npm - see below.


# How to Use it

## Download

Clone or download it from git hub:

```git clone https://github.com/asokolsky/systeminformation-api.git```

## Build
Run in the shell in the directory where you cloned systeminformation-api:

```
npm install
npm run build
```

## Test
in the shell:

```npm run test```

## Run
and then in the shell

```npm run start```

Finally, point your browser
http://localhost:3000/api/systeminformation/cpu

## Command Line

```
node ./dist/index.js [{-p|--port}:<portnumber>] [-z|--zip] [-h|--help] [-v|--version]
```

- {-p|--port}:```<port>``` - specifies port on which the service will listen for incoming HTTP connections
- -z|--zip - will force express to use gzip encoding - experimental, not for production
- -h|--help - display command line spec
- -v|--version - show package version


## REST APIs Supported

Only HTTP GET is supported.   
The URIs start with ```/api/systeminformation``` followed by:

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

## Deploy
Here are the [Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html).

## Debugging
The package relies on (almost standard) [debug](https://www.npmjs.com/package/debug) package.  Command line to enable this app trace on Windows (powershell, default in vscode):
```
$env:DEBUG='siapi';node .\index.js
```

Try this to learn more about express:
```
$env:DEBUG='*';node .\index.js
```

## gRPC

To start the server:
```
node ./dist/grpc-server.js
```

To start the sample client:
```
node ./dist/grpc-client.js
```
### gRPC APIs Supported
The gRPC interface is defined in ```systeminformation.proto```


# Credits
[systeminformation](https://www.npmjs.com/package/systeminformation)
 by [Sebastian Hildebrandt](https://github.com/sebhildebrandt)

# TODO

If you have an opinion or ideas on the below list - please do tell.

## Logging
Decide on the logging facility to use: https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/

## Package it as a Service
https://github.com/coreybutler/node-windows

https://github.com/tallesl/qckwinsvc

## Package it as a Docker Image
https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js

# DONE

## TypeScript
The service is now implemented in TypeScript.

## Adopt debug facility
Use debug package instead of console.

## Publish it in npm
DONE: https://www.npmjs.com/package/systeminformation-api

## Using gzip encoding
Followed the best practices suggestions, adopted optional gzip encoding.  Did not benchmark the impact though.