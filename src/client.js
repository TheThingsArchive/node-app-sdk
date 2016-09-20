const mqtt = require('mqtt');
const util = require('util');
const EventEmitter = require('events');

const Client = class Client {
  constructor(region, appId, appAccessKey) {
    this.url = util.format('mqtt://%s', (region.indexOf('.') !== -1) ? region : region + '.thethings.network');
    this.appId = appId;
    this.ee = new EventEmitter();
    this.mqtt = mqtt.connect(this.url, {
      username: appId,
      password: appAccessKey
    });
    this.mqtt.on('connect', this._connect.bind(this));
    this.mqtt.on('error', this._error.bind(this));
    this.mqtt.on('message', this._handleMessage.bind(this));
  }

  end(...args) {
    return this.mqtt.end(...args);
  }

  on(...args) {
    var eventName = args[0];
    var listener = args.pop();

    var topic = this._eventToTopic.apply(this, args);
    if (topic) {
      this.mqtt.subscribe(topic);
      eventName = topic;
    }

    this.ee.on(eventName, listener);
  }

  off(...args) {
    var eventName = args[0];
    var listener = args.pop();

    var topic = this._eventToTopic.apply(this, args);
    if (topic) {
      this.mqtt.unsubscribe(topic);
      eventName = topic;
    }

    this.ee.off(eventName, listener);
  }

  send(devId, payload, port) {
    var topic = util.format('%s/devices/%s/down', this.appId, devId);
    var message = {
      port: port || 1
    };
    if (payload instanceof Buffer) {
      message.payload_raw = payload.toString('base64');
    } else {
      message.payload_fields = payload;
    }
    this.mqtt.publish(topic, JSON.stringify(message));
  }

  _connect(connack) {
    this.ee.emit('connect', connack);
  }

  _error(err) {
    this.ee.emit('error', err);
  }

  _handleMessage(topic, message) {
    var parts = topic.split('/');
    if (parts[3] !== 'activations' && parts[3] !== 'up') {
      return;
    }
    var devId = parts[2];
    var payload = JSON.parse(message.toString());
    if (parts.length === 4) {
      payload.app_id = this.appId;
      payload.dev_id = devId;
    }
    var data, field;
    switch (parts[3]) {
      case 'activations':
        this.ee.emit(topic, devId, payload); // full topic
        this.ee.emit(parts.slice(0, 2).concat('+', parts.slice(3)).join('/'), devId, payload); // any device
        break;
      case 'up':
        field = (parts.length > 4) ? parts.slice(4).join('/') : null;
        this.ee.emit(topic, devId, field, payload); // full topic, including field
        this.ee.emit(parts.slice(0, 2).concat('+', parts.slice(3)).join('/'), devId, field, payload); // any device
        break;
    }
  }

  _eventToTopic(eventName, devId, field) {
    if (devId && devId.match(/[+#\/]+/)) {
      throw new Error('devId may not contain path separator and wildcards.');
    }
    var topic = this.appId + '/devices/' + (devId || '+') + '/';
    if (eventName === 'message') {
      topic += 'up';
    } else if (eventName === 'activation') {
      topic += 'activations';
    } else {
      topic = null;
    }
    if (topic) {
      if (field) {
        if (field.match(/[+#]+/)) {
          throw new Error('field may not contain wildcards.');
        }
        topic += '/' + field;
      }
    }
    return topic;
  }
};

module.exports = Client;