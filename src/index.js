'use strict';

const Client = require('./client');
const regions = require('./regions');

module.exports = {
  Client: Client,
  regions: regions.regions,
};
