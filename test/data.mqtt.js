var sinon = require('sinon');
var should = require('should');
require('should-sinon');

var ttn = require('..');

var BROKER = 'localhost'
var BYPASS = true;
var WAIT_FOR = BYPASS ? 100 : 1000;

describe('data.MQTT', function() {

  describe('#new', function () {
    it('should create client', function () {
      var client = createClient();
      client.should.be.an.instanceOf(ttn.Client);
    });
  });


  describe('#on(connect)', function () {
    it('should emit event', function (done) {
      var client = createClient();
      client.on('connect', function (connack) {
        should(connack).be.an.Object();
        client.end();
        done();
      });
    });
  });

  describe('#on(activation)', function () {
    it('should error on devId with separator or wildcard', function () {
      var client = createClient();
      (function () {
        client.on('activation', 'my/uno');
      }).should.throw();
      (function () {
        client.on('activation', '#');
      }).should.throw();
      (function () {
        client.on('activation', 'my/+');
      }).should.throw();
    });
    it('should emit event', function (done) {
      var client = createClient();
      var data = {
        "app_eui": "70B3D57EF000001C",
        "dev_eui": "0004A30B001B7AD2",
        "dev_addr": "26012723",
        "metadata": {
          "time": "2016-09-13T09:59:02.90329585Z",
          "frequency": 868.5,
          "modulation": "LORA",
          "data_rate": "SF7BW125",
          "coding_rate": "4/5",
          "gateways": [{
            "eui": "B827EBFFFE87BD22",
            "timestamp": 1484146403,
            "time": "2016-09-13T09:59:02.867283Z",
            "channel": 2,
            "rssi": -49,
            "snr": 7,
            "rf_chain": 1
          }]
        }
      };
      var callback = sinon.spy();
      client.on('activation', callback);
      client.mqtt.publish(client.appId + '/devices/a-device/events/activations', JSON.stringify(data));
      setTimeout(function () {
        callback.should.be.calledOnce().calledWith('a-device', data);
        done();
      }, WAIT_FOR);
    });
  });

  describe('#on(device)', function () {
    it('should error on field wildcard', function () {
      var client = createClient();
      (function () {
        client.on('device', null, '#');
      }).should.throw();
      (function () {
        client.on('device', null, 'down/+');
      }).should.throw();
    });
    it('should emit event', function (done) {
      var client = createClient();
      var data = {
        "dev_addr": "26012723"
      };
      var callback = sinon.spy();
      client.on('device', null, 'activations', callback);
      client.mqtt.publish(client.appId + '/devices/a-device/events/activations', JSON.stringify(data));
      setTimeout(function () {
        callback.should.be.calledOnce().calledWith('a-device', data);
        done();
      }, WAIT_FOR);
    });
    it('should emit event (for specific device and/or event)', function (done) {
      var client = createClient();
      var data = {
        "dev_addr": "26012723"
      };
      var callback = sinon.spy();
      var callbackD = sinon.spy();
      var callbackDE = sinon.spy();
      var callbackE = sinon.spy();
      client.on('device', callback);
      client.on('device', 'a-device', callbackD);
      client.on('device', 'a-device', 'activations', callbackDE);
      client.on('device', null, 'activations', callbackE);
      client.mqtt.publish(client.appId + '/devices/a-device/events/activations', JSON.stringify(data));
      setTimeout(function () {
        callback.should.be.calledOnce().calledWith('a-device', data);
        callbackD.should.be.calledOnce().calledWith('a-device', data);
        callbackDE.should.be.calledOnce().calledWith('a-device', data);
        callbackE.should.be.calledOnce().calledWith('a-device', data);
        done();
      }, WAIT_FOR);
    });
    it('should emit event with deep field and payload_raw', function (done) {
      var client = createClient();
      var data = {
        "port": 1,
        "payload_raw": "AQ=="
      };
      var callback = sinon.spy();
      client.on('device', 'a-device', 'down/scheduled', callback);
      client.mqtt.publish(client.appId + '/devices/a-device/events/down/scheduled', JSON.stringify(data));
      setTimeout(function () {
        data.payload_raw = new Buffer(data.payload_raw, 'base64');
        callback.should.be.calledOnce().calledWith('a-device', data);
        done();
      }, WAIT_FOR);
    });
  });

  describe('#on(message)', function () {

    it('should emit event', function (done) {
      var client = createClient();
      var data = {
        "port": 1,
        "counter": 5,
        "payload_raw": "AQ==",
        "payload_fields": {
          "led": true
        },
        "metadata": {
          "time": "2016-09-14T14:19:20.272552952Z",
          "frequency": 868.1,
          "modulation": "LORA",
          "data_rate": "SF7BW125",
          "coding_rate": "4/5",
          "gateways": [{
            "eui": "B827EBFFFE87BD22",
            "timestamp": 1960494347,
            "time": "2016-09-14T14:19:20.258723Z",
            "rssi": -49,
            "snr": 9.5,
            "rf_chain": 1
          }]
        }
      };
      var callback = sinon.spy();
      client.on('message', callback);
      client.mqtt.publish(client.appId + '/devices/a-device/up', JSON.stringify(data));
      setTimeout(function () {
        data.payload_raw = new Buffer(data.payload_raw, 'base64');
        callback.should.be.calledOnce().calledWith('a-device', data);
        done();
      }, WAIT_FOR);
    });

    it('should emit event for specific device', function (done) {
      var client = createClient();
      var data = {
        payload_raw: 'AQ=='
      };
      var callback = sinon.spy();
      client.on('message', 'a-device', callback);
      client.mqtt.publish(client.appId + '/devices/a-device/up', JSON.stringify(data));
      setTimeout(function () {
        data.payload_raw = new Buffer(data.payload_raw, 'base64');
        callback.should.be.calledOnce().calledWith('a-device', data);
        done();
      }, WAIT_FOR);
    });

    it('should emit event for specific (device and) field', function (done) {
      var client = createClient();
      var data = true;
      var callbackF = sinon.spy();
      var callbackDF = sinon.spy();
      client.on('message', null, 'led', callbackF);
      client.on('message', 'a-device', 'led', callbackDF);
      client.mqtt.publish(client.appId + '/devices/a-device/up/led', JSON.stringify(data));
      setTimeout(function () {
        callbackF.should.be.calledOnce().calledWith('a-device', data);
        callbackDF.should.be.calledOnce().calledWith('a-device', data);
        done();
      }, WAIT_FOR);
    });

  });
});

function createClient() {
  client = new ttn.data.MQTT(BROKER); // don't pass appId and appAccessKey to the test broker
  client.appId = Math.floor(Math.random() * 16777215).toString(16); // but set random appId afterwards
  if (BYPASS) { // bypass MQTT server for faster and more reliable tests
    client.mqtt.publish = function(topic, message) {
      client.mqtt.emit('message', topic, message);
    };
  }
  return client;
}
