'use strict';

const data = require('./data');
const regions = require('./regions');

module.exports = {
  Client: data.MQTT, // DEPRECATED
  regions: regions.regions,
  
  data: data,
  manager: require('./manager')
};
