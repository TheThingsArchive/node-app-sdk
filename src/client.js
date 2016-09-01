(function() {
  'use strict';

  const mqtt = require('mqtt');
  const util = require('util');
  const EventEmitter = require('events');

  const Client = class Client extends EventEmitter {
    constructor(broker, appEUI, appAccessKey) {
      super();
      this.appEUI = appEUI;
      this.legacy = (broken === 'staging.thethingsnetwork.org');
      this.client = mqtt.connect(util.format('mqtt://%s', broker), {
        username: appEUI,
        password: appAccessKey
      });
      this.client.on('connect', this._connected.bind(this));
      this.client.on('message', this._handleMessage.bind(this));
      this.client.on('error', this._error.bind(this));
    }

    end() {
      this.client.end();
    }

    downlink(devEUI, payload, ttl, port) {
      var topic = util.format('%s/devices/%s/down', this.appEUI, devEUI);
      var payload_raw = payload.toString('base64');
      var message = JSON.stringify(this.legacy ? {
        payload: payload_raw,
        ttl: ttl || '1h',
        port: port || 1
      } : {
        payload_raw: payload_raw,
        port: port || 1
      });
      this.client.publish(topic, message);
    }

    _connected() {
      super.emit('connect');
      this.client.subscribe(['+/devices/+/activations', '+/devices/+/up']);
    }

    _handleMessage(topic, message) {
      var parts = topic.split('/');
      var devEUI = parts[2];
      var payload = JSON.parse(message.toString());
      switch (parts[3]) {
        case 'activations':
          super.emit('activation', this.legacy ? {
            devEUI: devEUI
          } : payload);
          break;
        case 'up':
          super.emit('uplink', this.legacy ? {
            devEUI: devEUI,
            fields: payload.fields || {
              raw: payload.payload
            },
            counter: payload.counter,
            port: payload.port,
            metadata: payload.metadata[0]
          } : Object.assign({
            dev_eui: devEUI
          }, payload));
          break;
      }
    }

    _error(err) {
      super.emit('error', err);
    }
  };

  module.exports = Client;

})();