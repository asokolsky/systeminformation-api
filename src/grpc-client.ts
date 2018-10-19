'use strict';
/**
 * A gRPC client accessing systeminformation APIs via gRPC
 */
import minimist = require('minimist');
const pjson = require('./package.json');
const debug = require('debug')('siapi:grpc');

/**
 *  Parse the command line
 */
const args = minimist(process.argv.slice(2), {
    alias: {
        h: 'help',
        v: 'version',
    },
});
const strServer = args._;
                     // = ["localhost:4000"];

if(args.help) {
    console.log('Command line spec: host:port');
    process.exit(0);
}
if(args.version) {
    console.log(pjson.name);
    console.log(pjson.description);
    console.log('Version', pjson.version);
    process.exit(0);
}
if(strServer.length == 0) {
    console.log('No server specified.  Exiting.  Use --help to learn about command line spec.');
    process.exit(0);
}
debug(args);

const PROTO_PATH = __dirname + '/systeminformation.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     //longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const si_proto = grpc.loadPackageDefinition(packageDefinition).systeminformation;

function startClient(server: string) {
  const client = new si_proto.SystemInformation(server, grpc.credentials.createInsecure());
  client.getStaticData({body: ""}, (err: any, response: any) => {
    if(err) {
      console.log(`Failed to connect. Error:${err.code}`);
      console.log(err.message);
    } else {
/* 
response.body:
{
    "version":"3.45.6",
    "system":{"manufacturer":"Dell Inc.","model":"Dell Precision M3800","version":"A10","serial":"39F6M32","uuid":"4C4C4544-0039-4610-8036-B3C04F4D3332","sku":"Dell Precision M3800"},
    "bios":{"vendor":"Dell Inc.","version":"DELL - 1072009","releaseDate":"2015-08-17","revision":""},
    "baseboard":{"manufacturer":"Dell Inc.","model":"Dell Precision M3800","version":"A10","serial":".39F6M32.CN1296353M000A.","assetTag":""},
    "os":{"platform":"win32","distro":"Microsoft Windows 10 Enterprise","release":"10.0.14393","codename":"Microsoft Windows 10 Enterprise","kernel":"10.0.14393","arch":"x64","hostname":"39F6M32","logofile":"windows"},
    "versions":{"kernel":"10.0.14393","openssl":"1.0.2p","node":"8.11.4","v8":"6.2.414.54","npm":"6.4.1","yarn":"1.9.4","pm2":"","gulp":"","grunt":"","git":"2.14.1.windows.1","tsc":"3.0.3","mysql":"","redis":"","mongodb":"","nginx":"","php":""},
    "cpu":{"manufacturer":"Intel®","brand":"Core™ i7-4712HQ","vendor":"GenuineIntel","family":"6","model":"60","stepping":"3","revision":"15363","voltage":"","speed":"2.30","speedmin":"","speedmax":"2.30","cores":8,"cache":{"l1d":0,"l1i":0,"l2":1048576,"l3":6291456},"flags":"de pse mce sep mtrr mca cmov psn clfsh ds mmx fxsr sse sse2 ss htt tm ia64 pbe"},
    "graphics":{
        "controllers":[{"model":"NVIDIA Quadro K1100M","vendor":"NVIDIA","bus":"PCI","vram":2048,"vramDynamic":true},{"model":"Intel(R) HD Graphics 4600","vendor":"Intel Corporation","bus":"PCI","vram":1024,"vramDynamic":true}],
        "displays":[{"model":"","main":false,"builtin":false,"connection":"","resolutionx":0,"resolutiony":0,"sizex":-1,"sizey":-1},{"model":"(Standard monitor types)","main":false,"builtin":false,"connection":"","resolutionx":0,"resolutiony":0,"sizex":-1,"sizey":-1}]
    },
    "net":[{"iface":"vEthernet (DockerNAT)","ip4":"10.0.75.1","ip6":"fe80::68c2:816a:867f:a075","mac":"00:15:5d:83:27:02","internal":false},{"iface":"Ethernet","ip4":"10.6.97.35","ip6":"fe80::e86d:9f37:72c1:c66b","mac":"9c:eb:e8:1b:f8:0c","internal":false},{"iface":"Loopback Pseudo-Interface 1","ip4":"127.0.0.1","ip6":"::1","mac":"00:00:00:00:00:00","internal":true}],
    "memLayout":[
        {"size":8589934592,"bank":"","type":"DDR3","clockSpeed":1867,"formFactor":"SODIMM","manufacturer":"1315","partNum":"CT102464BF186D.C16","serialNum":"E06B4444","voltageConfigured":null,"voltageMin":null,"voltageMax":null},
        {"size":8589934592,"bank":"","type":"DDR3","clockSpeed":1867,"formFactor":"SODIMM","manufacturer":"1315","partNum":"CT102464BF186D.C16","serialNum":"E06B4008","voltageConfigured":null,"voltageMin":null,"voltageMax":null}
    ],
    "diskLayout":[
        {"type":"SSD","name":"SAMSUNG SSD SM841N mSATA 256GB SED","vendor":"(Standard disk drives)","size":256052966400,"bytesPerSector":512,"totalCylinders":31130,"totalHeads":255,"totalSectors":500103450,"totalTracks":7938150,"tracksPerCylinder":255,"sectorsPerTrack":63,"firmwareRevision":"DXM45D6Q","serialNum":"S1L2NYAF806496","interfaceType":"IDE","smartStatus":"Ok"}
    ]
}
*/        
      console.log('Response:', response.body);
    }
  });
}

startClient(strServer[0]);
