'use strict';
/**
 * A service exposing systeminformation as REST APIs
 */
import minimist = require('minimist');
const pjson = require('../package.json');
const debug = require('debug')('siapi');

/**
 *  Parse the command line
 */
const args = minimist(process.argv.slice(2), {
    alias: {
        h: 'help',
        p: 'port',
        v: 'version',
        z: 'zip'
    },
    default: {
        port: 3000
    }
});
const port = args.port;

if(args.help) {
    console.log('Command line spec: [{-p|--port}:<portnumber>] [-h|--help] [-v|--version] ');
    process.exit(0);
}
if(args.version) {
    console.log(pjson.name);
    console.log(pjson.description);
    console.log('Version', pjson.version);
    process.exit(0);
}
debug(args);
/**
 * Start preparing the web service
 */
import * as express from "express";
import * as compression from "compression";
const app = express();
if(args.zip) {
    app.use(compression);
}
import * as si from "systeminformation";
//const si = require('systeminformation');
const baseUri = '/api/systeminformation';
const baseNodeUri = '/api/node';

/**
 * General
 */
app.get(baseUri, (req, res) => {
    res.send(si.version());
});

app.get(baseUri + '/time', (req, res) => {
    res.json(si.time());
});

/**
 * System (HW)
 */
app.get(baseUri + '/system', (req, res) => {
    si.system((data) => {
        // res.json is the same as res.send BUT
        // "also uses the json replacer and json spaces application settings, so you can format JSON with more options"
        // I do not use it to improve performance
        res.json(data);            
    });
});

app.get(baseUri + '/bios', (req, res) => {
    si.bios((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/baseboard', (req, res) => {
    si.baseboard((data) => {
        res.send(data);
    });
});

/**
 * CPU, Memory, Disk, Battery, Graphics
 */
app.get(baseUri + '/cpu', (req, res) => {
    si.cpu((data) => {
        res.send(data);
    });
});

/* TypeScript 
app.get(baseUri + '/cpu/:key', (req, res) => {
    si.cpu((data) => {
        const strKey = req.params.key;
        const val = data[strKey];
        if((typeof val !== 'undefined') && (val !== null)) {
            res.send(val.toString());
        } else {
            res.status(404).send(`CPU key '${strKey}' not found`);
        }
    });*/

app.get(baseUri + '/cpuFlags', (req, res) => {
    si.cpuFlags((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/cpuCache', (req, res) => {
    si.cpuCache((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/cpuCurrentspeed', (req, res) => {
    si.cpuCurrentspeed((data) => {
        res.send(data);
    });
});
app.get(baseUri + '/cpuCurrentspeed/:id', (req, res) => {
    si.cpuCurrentspeed((data) => {
        const cpuID = req.params.id;
        try {
            res.send(data.cores[cpuID].toString());
        } catch (error) {
            res.status(404).send(`Core ${cpuID} not found`);
        }
    });
});

app.get(baseUri + '/cpuTemperature', (req, res) => {
    si.cpuTemperature((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/cpuTemperature/:id', (req, res) => {
    si.cpuTemperature((data) => {
        const cpuID = req.params.id;
        try {
            res.send(data.cores[cpuID].toString());
        } catch (error) {
            res.status(404).send(`Core ${cpuID} not found`);
        }
    });
});

app.get(baseUri + '/mem', (req, res) => {
    si.mem((data) => {
        res.send(data);
    });
});

/*app.get(baseUri + '/mem/:key', (req, res) => {
    si.mem((data) => {
        const strKey = req.params.key;
        const val = data[strKey];
        if((typeof val !== 'undefined') && (val !== null)) {
            res.send(val.toString());
        } else {
            res.status(404).send(`Mem key '${strKey}' not found`);
        }
    });
});*/

app.get(baseUri + '/memLayout', (req, res) => {
    si.memLayout((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/diskLayout', (req, res) => {
    si.diskLayout((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/battery', (req, res) => {
    si.battery((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/graphics', (req, res) => {
    si.graphics((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/graphics/controllers/:id', (req, res) => {
    si.graphics((data) => {
        const id = req.params.id;
        const js = data.controllers[id];
        if((typeof js !== 'undefined') && (js !== null)) {
            res.send(js);
        } else {
            res.status(404).send(`Graphics controller ${id} not found`);
        }
    });
});

app.get(baseUri + '/graphics/displays/:id', (req, res) => {
    si.graphics((data) => {
        const id = req.params.id;
        const js = data.displays[id];
        if((typeof js !== 'undefined') && (js !== null)) {
            res.send(js);
        } else {
            res.status(404).send(`Display ${id} not found`);
        }
    });
});

/**
 * OS
 */
app.get(baseUri + '/osInfo', (req, res) => {
    si.osInfo((data) => {
        res.send(data);
    });
});

/*app.get(baseUri + '/osInfo/:key', (req, res) => {
    si.osInfo((data) => {
        const strKey = req.params.key;
        const val = data[strKey];
        if((typeof val !== 'undefined') && (val !== null)) {
            res.send(val.toString());
        } else {
            res.status(404).send(`osInfo key '${strKey}' not found`);
        }
    });
});*/

app.get(baseUri + '/versions', (req, res) => {
    si.versions((data) => {
        res.send(data);
    });
});

/*app.get(baseUri + '/versions/:key', (req, res) => {
    si.versions((data) => {
        const strKey = req.params.key;
        const val = data[strKey];
        if((typeof val !== 'undefined') && (val !== null)) {
            res.send(val.toString());
        } else {
            res.status(404).send(`versions key '${strKey}' not found`);
        }
    });
});*/

app.get(baseUri + '/shell', (req, res) => {
    si.shell((data) => {
        res.send(data);
    });
});
app.get(baseUri + '/users', (req, res) => {
    si.users((data) => {
        res.send(data);
    });
});
/**
 * File System
 */
app.get(baseUri + '/fsSize', (req, res) => {
    si.fsSize((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/blockDevices', (req, res) => {
    si.blockDevices((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/fsStats', (req, res) => {
    si.fsStats((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/disksIO', (req, res) => {
    si.disksIO((data) => {
        res.send(data);
    });
});
/**
 * Network functions
 */
app.get(baseUri + '/networkInterfaces', (req, res) => {
    si.networkInterfaces((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/networkInterfaceDefault', (req, res) => {
    si.networkInterfaceDefault((data) => {
        res.send(data);
    });
});

/*app.get(baseUri + '/networkStats/:iface', (req, res) => {
    si.networkStats(("eth0", data) => {
        res.send(data);
    });
});*/

app.get(baseUri + '/networkConnections', (req, res) => {
    si.networkConnections((data) => {
        res.send(data);
    });
});
/**
 * Load processes and services
 */
app.get(baseUri + '/currentLoad', (req, res) => {
    si.currentLoad((data) => {
        res.send(data);
    });
});

app.get(baseUri + '/currentLoad/:id', (req, res) => {
    si.currentLoad((data) => {
        const cpuID = req.params.id;
        const js = data.cpus[cpuID];
        if((typeof js !== 'undefined') && (js !== null)) {
            res.send(js);
        } else {
            res.status(404).send(`CPU ${cpuID} not found`);
        }
    });
});
app.get(baseUri + '/fullLoad', (req, res) => {
    si.fullLoad((data) => {
        res.send(data);
    });
});
app.get(baseUri + '/processes', (req, res) => {
    si.processes((data) => {
        res.send(data);
    });
});

/**
 * Docker
 */
app.get(baseUri + '/dockerContainers', (req, res) => {
    si.dockerContainers(true, (data) => {
        res.send(data);
    });
});
app.get(baseUri + '/dockerAll', (req, res) => {
    si.dockerAll(/*true,*/ (data) => {
        res.send(data);
    });
});

/**
 * "Get All at once"
 */
app.get(baseUri + '/getStaticData', (req, res) => {
    si.getStaticData((data) => {
        res.send(data);
    });
});
app.get(baseUri + '/getDynamicData', (req, res) => {
    si.getDynamicData('', '', (data) => {
        res.send(data);
    });
});

/**
 * Node APIs
 */
const { performance } = require('perf_hooks');
app.get(baseNodeUri + '/performance/now', (req, res) => {
    res.send(performance.now().toString());
});

app.get(baseNodeUri + '/process/memoryUsage', (req, res) => {
    res.send(process.memoryUsage());
});

app.get(baseNodeUri + '/process/versions', (req, res) => {
    res.send(process.versions);
});


/**
 * Start the server!
 */
app.listen(port, () => { 
    console.log('Ready')
})
.on('error', (e) => { 
    console.log(`Failed to start service: ${e.message}`);
    //if (e.code == 'EADDRINUSE') { 
    //}
});
console.log(`Preparing http://localhost:${port}${baseUri}`);

// export app for test
module.exports = app;
