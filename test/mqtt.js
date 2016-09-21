var should = require('should');

var mqtt = require('mqtt');

var TOPIC = Math.floor(Math.random() * 16777215).toString(16);

describe('MQTT', function() {
  var client;

  describe('#connect', function() {
    it('create client', function() {
      client = mqtt.connect('mqtt://test.mosquitto.org');
    });
  });

  describe('#on(connect)', function() {
    it('should emit event', function(done) {
      client.on('connect', function(connack) {
        should(connack).be.an.Object();
        done();
      });
    });
  });

  describe('#subscribe', function() {
    it('should subscribe', function() {
      client.subscribe(TOPIC);
    });
  });

  describe('#publish', function() {
    it('should publish', function() {
      client.publish(TOPIC, 'Hello, World!');
    });
  });

  describe('#on(message)', function() {
    it('should emit event', function(done) {
      client.on('message', function(topic, message) {
        should(message.toString()).be.a.String().equal('Hello, World!');
        client.end();
        done();
      });
    });
  });
});