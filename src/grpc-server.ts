'use strict';
/**
 * A gRPC server exposing systeminformation APIs via gRPC
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
        p: 'port',
        v: 'version',
    },
    default: {
        port: 4000
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

const PROTO_PATH = __dirname + '/systeminformation.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import * as si from "systeminformation";


const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     //longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var si_proto = grpc.loadPackageDefinition(packageDefinition).systeminformation;

/**
 * Implements the SystemInformation RPC method getStaticData.
 */
function getStaticData(call: any, callback: any) : void {
  si.getStaticData((data) => {
    const json = JSON.stringify(data);
    //console.log(`getStaticData2 ${json}`);
    callback(null, {body: json});
  });    
}
/**
 * Implements the SystemInformation RPC method getDynamicData.
 */
function getDynamicData(call: any, callback: any) : void {
  callback(null, {message: 'Hello ' + call.request.body});
}
  
/**
 * Starts an RPC server that receives requests for the SystemInformation service 
 * at this port
 */
function startServer(port: number) {
  const server = new grpc.Server();
  server.addService(si_proto.SystemInformation.service, {getStaticData: getStaticData, getDynamicData: getDynamicData});
  server.bind('0.0.0.0:' + port, grpc.ServerCredentials.createInsecure());
  server.start();  
  console.log(`Insecure gRPC SystemInformation service started on port ${port}`);
}

startServer(port);
