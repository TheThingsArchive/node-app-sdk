var should = require('should');
var http = require('http');
var nock = require('nock');

var ttn = require('..');

var REGION = 'eu';
var ACCESS_KEY = 'my-access-key';
var TOKEN = 'my-token';

var response = {
  "app_id": "some-app-id",
  "dev_id": "some-dev-id",
  "lorawan_device": {
    "activation_constraints": "local",
    "app_eui": "0102030405060708",
    "app_id": "some-app-id",
    "app_key": "01020304050607080102030405060708",
    "app_s_key": "01020304050607080102030405060708",
    "dev_addr": "01020304",
    "dev_eui": "0102030405060708",
    "dev_id": "some-dev-id",
    "disable_f_cnt_check": false,
    "f_cnt_down": 0,
    "f_cnt_up": 0,
    "last_seen": 0,
    "nwk_s_key": "01020304050607080102030405060708",
    "uses32_bit_f_cnt": true
  }
};

nock('http://eu.thethings.network:8084')
  .matchHeader('authorization', 'Bearer ' + TOKEN)
  .get('/applications/my-app/devices/my-dev')
  .reply(function (uri, requestBody, cb) {
    // console.log(this.req.headers);
    cb(null, [200, response]);
  });

nock('http://eu.thethings.network:8084')
  .matchHeader('authorization', 'Bearer ' + TOKEN)
  .post('/applications')
  .reply(function (uri, requestBody, cb) {
    should(requestBody).eql({
      app_id: 'my-app'
    });
    cb(null, [200, {}]);
  });

nock('http://my-handler:9999')
  .matchHeader('authorization', 'Key ' + ACCESS_KEY)
  .get('/applications/my-app/devices/my-dev')
  .reply(function (uri, requestBody, cb) {
    // console.log(this.req.headers);
    cb(null, [200, response]);
  });

describe('manager.HTTP', function () {

  describe('region and access key', function () {
    var client;

    it('should create an instance', function () {
      client = new ttn.manager.HTTP({
        region: 'eu',
        token: TOKEN
      });
      client.should.be.an.Object();
      client.getDevice.should.be.a.Function();
    });

    it('should get devices', function (done) {
      client.getDevice({
        app_id: 'my-app',
        dev_id: 'my-dev'
      }, function (err, res, body) {
        should(err).be.null();
        should(res).be.an.Object();
        should(body).eql(response);
        done();
      });
    });

    it('should work with body', function (done) {
      client.registerApplication({}, {
        app_id: 'my-app'
      }, function (err, res, body) {
        should(err).be.null();
        should(res).be.an.Object();
        should(body).eql({});
        done();
      });
    });

  });

  describe('host and bearer token', function () {
    var client;

    it('should create an instance', function () {
      client = new ttn.manager.HTTP({
        baseUrl: 'http://my-handler:9999',
        key: ACCESS_KEY
      });
      client.should.be.an.Object();
    });

    it('should get devices', function (done) {
      client.getDevice({
        app_id: 'my-app',
        dev_id: 'my-dev'
      }, function (err, res, body) {
        should(err).be.null();
        should(res).be.an.Object();
        should(body).eql(response);
        done();
      });
    });

  });

});
