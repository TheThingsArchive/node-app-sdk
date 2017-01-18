const mqtt = require('mqtt');
const util = require('util');
const EventEmitter = require('events');
const regions = require('../regions');

const Client = class Client {
  constructor(region, appId, appAccessKey, options = {}) {
    var host = regions.validate(region);

    this.appId = appId;
    this.ee = new EventEmitter();
    options.host = host;
    options.username = appId;
    options.password = appAccessKey;
    this.mqtt = mqtt.connect(options);
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

  _connect(connack) {
    this.ee.emit('connect', connack);
  }

  _error(err) {
    this.ee.emit('error', err);
  }

  _handleMessage(topic, message) {
    var event = this._topicToEvent(topic);
    if (!event.name) {
      return;
    }
    var payload = JSON.parse(message.toString());
    if (payload === Object(payload) && typeof payload.payload_raw === 'string') {
      payload.payload_raw = new Buffer(payload.payload_raw, 'base64');
    }
    this.ee.emit(topic, event.devId, payload); // full topic, including field if any
    this.ee.emit(this._eventToTopic(event.name, null, event.field), event.devId, payload); // any device
    if (event.name === 'device') {
      this.ee.emit(this._eventToTopic(event.name, event.devId, null), event.devId, payload); // any field
      this.ee.emit(this._eventToTopic(event.name, null, null), event.devId, payload); // any device or field
    }
  }

  _eventToTopic(name, devId, field) {
    if (devId && /[+#\/]+/.test(devId)) {
      throw new Error('devId may not contain path separator and wildcards.');
    }
    if (field && /[+#]+/.test(field)) {
      throw new Error('field may not contain wildcards.');
    }
    if (name === 'activation') { // deprecated
      return this._eventToTopic('device', devId, 'activations');
    }
    var topic = this.appId + '/devices/' + (devId || '+') + '/';
    if (name === 'message') {
      topic += 'up' + (field ? '/' + field : '');
    } else if (name === 'device') {
      topic += 'events/' + (field || '#');
    } else {
      topic = null;
    }
    return topic;
  }

  _topicToEvent(topic) {
    var matches = topic.match(new RegExp('^' + this.appId + '\/devices\/([^\/]+)\/(?:(up)(?:\/(.+)$)?|(events)\/(.+))'));
    if (!matches) {
      return;
    }
    var event = {
      devId: matches[1]
    };
    if (matches[2] === 'up') {
      event.name = 'message';
      event.field = matches[3];
    } else if (matches[4] === 'events') {
      event.name = 'device';
      event.field = matches[5];
    }
    return event;
  }
};

module.exports = Client;
