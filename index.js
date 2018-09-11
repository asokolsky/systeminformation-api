'use strict';

const express = require('express');
const app = express();
const si = require('systeminformation');

const port = 3000;
 
/**
 * General
 */

app.get('/api/systeminformation', (req, res) => {
    //console.log(si.version());
    res.send(si.version());
});

app.get('/api/systeminformation/time', (req, res) => {
    //console.log(si.version());
    res.send(si.time());
});

/**
 * System (HW)
 */
app.get('/api/systeminformation/system', (req, res) => {
    si.system((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/bios', (req, res) => {
    si.bios((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/baseboard', (req, res) => {
    si.baseboard((data) => {
        res.send(data);
    });
});

/**
 * CPU, Memory, Disk, Battery, Graphics
 */
app.get('/api/systeminformation/cpu', (req, res) => {
    si.cpu((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/cpu/:key', (req, res) => {
    si.cpu((data) => {
        const strKey = req.params.key;
        //console.log(`strKey:${strKey}`);
        const val = data[strKey];
        //console.log(`val:${val}`);
        if((typeof val !== 'undefined') && (val !== null)) {
            res.send(val.toString());
        } else {
            res.status(404).send(`CPU key '${strKey}' not found`);
        }
    });
});

app.get('/api/systeminformation/cpuFlags', (req, res) => {
    si.cpuFlags((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/cpuCache', (req, res) => {
    si.cpuCache((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/cpuCurrentspeed', (req, res) => {
    si.cpuCurrentspeed((data) => {
        //console.log('CPU Current Speed:');
        console.log(data);
        res.send(data);
    });
});

app.get('/api/systeminformation/cpuCurrentspeed/:id', (req, res) => {
    si.cpuCurrentspeed((data) => {
        //console.log('CPU Current Speed:');
        //console.log(data);
        const cpuID = req.params.id;
        try {
            const speed = data.cores[cpuID];  
            //console.log(cpuID);
            //console.log(data.cores[cpuID]);
            res.send(data.cores[cpuID].toString());
        } catch (error) {
            console.log(`Bad cpuID ${cpuID}`);
            //res.statusMessage = `CPU ${cpuID} not found.`;
            //res.sendStatus(404);
            res.status(404).send(`Core ${cpuID} not found`);
        }
    });
});

app.get('/api/systeminformation/cpuTemperature', (req, res) => {
    si.cpuTemperature((data) => {
        //console.log('CPU temperature:');
        console.log(data);
        res.send(data);
    });
});

app.get('/api/systeminformation/cpuTemperature/:id', (req, res) => {
    si.cpuTemperature((data) => {
        const cpuID = req.params.id;
        try {
            const speed = data.cores[cpuID];  
            //console.log(cpuID);
            //console.log(data.cores[cpuID]);
            res.send(data.cores[cpuID].toString());
        } catch (error) {
            console.log(`Bad cpuID ${cpuID}`);
            //res.statusMessage = `CPU ${cpuID} not found.`;
            //res.sendStatus(404);
            res.status(404).send(`Core ${cpuID} not found`);
        }
    });
});

app.get('/api/systeminformation/mem', (req, res) => {
    si.mem((data) => {
        //console.log('Memory:');
        //console.log(data);
        res.send(data);
    });
});

app.get('/api/systeminformation/mem/:key', (req, res) => {
    si.mem((data) => {
        const strKey = req.params.key;
        //console.log(`strKey:${strKey}`);
        const val = data[strKey];
        //console.log(`val:${val}`);
        if((typeof val !== 'undefined') && (val !== null)) {
            res.send(val.toString());
        } else {
            res.status(404).send(`Mem key '${strKey}' not found`);
        }
    });
});

app.get('/api/systeminformation/memLayout', (req, res) => {
    si.memLayout((data) => {
        console.log('memLayout:');
        console.log(data);
        res.send(data);
    });
});

app.get('/api/systeminformation/diskLayout', (req, res) => {
    si.diskLayout((data) => {
        //console.log('diskLayout:');
        //console.log(data);
        res.send(data);
    });
});

app.get('/api/systeminformation/battery', (req, res) => {
    si.battery((data) => {
        //console.log('battery:');
        //console.log(data);
        res.send(data);
    });
});

app.get('/api/systeminformation/graphics', (req, res) => {
    si.graphics((data) => {
        //console.log('graphics:');
        //console.log(data);
        res.send(data);
    });
});

app.get('/api/systeminformation/graphics/controllers/:id', (req, res) => {
    si.graphics((data) => {
        const id = req.params.id;
        const js = data.controllers[id];
        if((typeof js !== 'undefined') && (js !== null)) {
            //console.log(cpuID);
            //console.log(data.cores[cpuID]);
            //console.log(`js:${js}`);
            res.send(js);
        } else {
            console.log(`Bad controllerID ${id}`);
            //res.statusMessage = `CPU ${cpuID} not found.`;
            //res.sendStatus(404);
            res.status(404).send(`Controller ${id} not found`);
        }
    });
});

app.get('/api/systeminformation/graphics/displays/:id', (req, res) => {
    si.graphics((data) => {
        const id = req.params.id;
        const js = data.displays[id];
        if((typeof js !== 'undefined') && (js !== null)) {
            //console.log(cpuID);
            //console.log(data.cores[cpuID]);
            //console.log(`js:${js}`);
            res.send(js);
        } else {
            console.log(`Bad displayID ${id}`);
            //res.statusMessage = `CPU ${cpuID} not found.`;
            //res.sendStatus(404);
            res.status(404).send(`Display ${id} not found`);
        }
    });
});

/**
 * OS
 */
app.get('/api/systeminformation/osInfo', (req, res) => {
    si.osInfo((data) => {
        res.send(data);
    });
});
app.get('/api/systeminformation/osInfo/:key', (req, res) => {
    si.osInfo((data) => {
        const strKey = req.params.key;
        //console.log(`strKey:${strKey}`);
        const val = data[strKey];
        //console.log(`val:${val}`);
        if((typeof val !== 'undefined') && (val !== null)) {
            res.send(val.toString());
        } else {
            res.status(404).send(`osInfo key '${strKey}' not found`);
        }
    });
});

app.get('/api/systeminformation/versions', (req, res) => {
    si.versions((data) => {
        res.send(data);
    });
});
app.get('/api/systeminformation/versions/:key', (req, res) => {
    si.versions((data) => {
        const strKey = req.params.key;
        //console.log(`strKey:${strKey}`);
        const val = data[strKey];
        //console.log(`val:${val}`);
        if((typeof val !== 'undefined') && (val !== null)) {
            res.send(val.toString());
        } else {
            res.status(404).send(`versions key '${strKey}' not found`);
        }
    });
});

app.get('/api/systeminformation/shell', (req, res) => {
    si.shell((data) => {
        res.send(data);
    });
});
app.get('/api/systeminformation/users', (req, res) => {
    si.users((data) => {
        res.send(data);
    });
});
/**
 * File System
 */
app.get('/api/systeminformation/fsSize', (req, res) => {
    si.fsSize((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/blockDevices', (req, res) => {
    si.blockDevices((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/fsStats', (req, res) => {
    si.fsStats((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/disksIO', (req, res) => {
    si.disksIO((data) => {
        res.send(data);
    });
});
/**
 * Network functions
 */
app.get('/api/systeminformation/networkInterfaces', (req, res) => {
    si.networkInterfaces((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/networkInterfaceDefault', (req, res) => {
    si.networkInterfaceDefault((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/networkStats', (req, res) => {
    si.networkStats((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/networkConnections', (req, res) => {
    si.networkConnections((data) => {
        res.send(data);
    });
});
/**
 * Load processes and services
 */
app.get('/api/systeminformation/currentLoad', (req, res) => {
    si.currentLoad((data) => {
        res.send(data);
    });
});

app.get('/api/systeminformation/currentLoad/:id', (req, res) => {
    si.currentLoad((data) => {
        const cpuID = req.params.id;
        const js = data.cpus[cpuID];
        if((typeof js !== 'undefined') && (js !== null)) {
            //console.log(cpuID);
            //console.log(data.cpus[cpuID]);
            //console.log(`js:${js}`);
            res.send(js);
        } else {
            //console.log(`Bad cpuID ${cpuID}`);
            res.status(404).send(`CPU ${cpuID} not found`);
        }
    });
});
app.get('/api/systeminformation/fullLoad', (req, res) => {
    si.fullLoad((data) => {
        res.send(data);
    });
});
app.get('/api/systeminformation/processes', (req, res) => {
    si.processes((data) => {
        res.send(data);
    });
});

/**
 * Docker
 */
app.get('/api/systeminformation/dockerContainers', (req, res) => {
    si.dockerContainers(true, (data) => {
        res.send(data);
    });
});
app.get('/api/systeminformation/dockerAll', (req, res) => {
    si.dockerAll(true, (data) => {
        res.send(data);
    });
});


/**
 * 
 */
app.listen(port, () => console.log(`Listening on port ${port}...`));

//console.log("Done!");
