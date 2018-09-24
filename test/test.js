const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../index');

const baseUri = '/api/systeminformation';

describe('GET ' + baseUri, () => {
    it('should respond with systeminformation version string', () => {
        chai.request(app)
        .get(baseUri)
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be..
          res.type.should.equal('text/html');
          //done();
        });
    });
});

describe('GET ' + baseUri + '/time', () => {
    it('should respond with time json', () => {
        chai.request(app)
        .get(baseUri + '/time')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be..
          res.type.should.equal('application/json');
          // verify json keys
          res.body.should.include.keys('current', 'uptime', 'timezone', 'timezoneName'); 
          //done();
        });
    });
});

describe('GET ' + baseUri + '/getStaticData', () => {
    it('should respond with static data json', () => {
        chai.request(app)
        .get(baseUri + '/getStaticData')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be..
          res.type.should.equal('application/json');
          // verify json keys
          res.body.should.include.keys('baseboard', 'bios', 'cpu', 'graphics', 'memLayout', 'net', 'os', 'system', 'version', 'versions'); 
          //done();
        });
    });
});

describe('GET ' + baseUri + '/getDynamicData', () => {
    it('should respond with dynamic data json', () => {
        chai.request(app)
        .get(baseUri + '/getDynamicData')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be..
          res.type.should.equal('application/json');
          // verify json keys
          res.body.should.include.keys('time', 'battery', 'cpuCerrentSpeed', 'currentLoad', 'diskIO', 'fsSize', 
            'fsStats', 'mem', 'networkConnections', 'networkStats', 'processes', 'temp', 'time', 'users'); 
          //done();
        });
    });
});
