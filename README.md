# System Information API
This is a thin wrapper around [systeminformation](https://www.npmjs.com/package/systeminformation) to expose it as a REST API.  Relies on 
node.js/express and minimist.

# Dependenciies
You have to have [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) setup. Uses express and minimist which are automatiaclly installed by npm - see below.

# How to Use it
## Build
Run in the shell in the current directory

```npm install```

## Run
and then in the shell

```node index.js```

Finally, point your browser
http://localhost:3000/api/systeminformation/cpu

For a full list of verbs supported see the [systeminformation documentation](https://www.npmjs.com/package/systeminformation).


# Credits
[systeminformation](https://www.npmjs.com/package/systeminformation)
 by [Sebastian Hildebrandt](https://github.com/sebhildebrandt)

# TODO

## Package it as a Service
https://github.com/coreybutler/node-windows

https://github.com/tallesl/qckwinsvc

## Publish it in npm
It's time!

## Package it as a Docker Image
https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js
