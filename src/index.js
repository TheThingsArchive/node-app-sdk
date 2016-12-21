'use strict';

const data = require('./data');

module.exports = {
  Client: data.MQTT, // DEPRECATED
  
  data: data,
  manager: require('./manager')
};
