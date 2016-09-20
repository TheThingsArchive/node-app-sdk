const mqtt = require('mqtt');
const util = require('util');
const EventEmitter = require('events');

const Client = class Client extends EventEmitter {
  constructor(region, appId, appAccessKey) {
    super();
    this.url = util.format('mqtt://%s', (region.indexOf('.') !== -1) ? region : region + '.thethings.network');
    this.appId = appId;
    this.mqtt = mqtt.connect(this.url, {
      username: appId,
      password: appAccessKey
    });
    this.mqtt.on('connect', this._connected.bind(this));
    this.mqtt.on('message', this._handleMessage.bind(this));
    this.mqtt.on('error', this._error.bind(this));
  }

  end(...args) {
    this.mqtt.end(...args);
  }

  send(devId, payload, port) {
    var topic = util.format('%s/devices/%s/down', this.appId, devId);
    var message = {
      port: port || 1
    };
    if (Array.isArray(payload)) {
      payload = new Buffer(payload);
    }
    if (Buffer.isBuffer(payload)) {
      message.payload_raw = payload.toString('base64');
    } else {
      message.payload_fields = payload;
    }
    this.mqtt.publish(topic, JSON.stringify(message));
  }

  _connected(connack) {
    super.emit('connect', connack);
    this.mqtt.subscribe(['+/devices/+/activations', '+/devices/+/up']);
  }

  _handleMessage(topic, message) {
    var parts = topic.split('/');
    var devId = parts[2];
    var payload = JSON.parse(message.toString());
    switch (parts[3]) {
      case 'activations':
        super.emit('activation', Object.assign({
          dev_id: devId,
          app_id: this.appId
        }, payload));
        break;
      case 'up':
        super.emit('message', Object.assign({
          dev_id: devId,
          app_id: this.appId
        }, payload));
        break;
    }
  }

  _error(err) {
    super.emit('error', err);
  }
};

module.exports = Client;