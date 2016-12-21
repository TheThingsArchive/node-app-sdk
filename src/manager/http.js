'use strict';

const request = require('request');
const utils = require('../lib/utils');

let defaults = {
  method: 'GET',
  json: true
};

let methods = {
  RegisterApplication: {
    method: 'POST',
    uri: '/applications'
  },
  GetApplication: {
    uri: '/applications/{app_id}'
  },
  SetApplication: {
    method: 'POST',
    uri: '/applications/{app_id}'
  },
  DeleteApplication: {
    method: 'DELETE',
    uri: '/applications/{app_id}'
  },
  GetDevice: {
    uri: '/applications/{app_id}/devices/{dev_id}'
  },
  RegisterDevice: {
    method: 'POST',
    uri: '/applications/{app_id}/devices'
  },
  SetDevice: {
    method: 'POST',
    uri: '/applications/{app_id}/devices/{dev_id}'
  },
  DeleteDevice: {
    method: 'DELETE',
    uri: '/applications/{app_id}/devices/{dev_id}'
  },
  GetDevicesForApplication: {
    method: 'POST',
    uri: '/applications/{app_id}/devices'
  }
};

module.exports = HTTP;

function HTTP(instanceOptions = {}) {

  Object.getOwnPropertyNames(methods).forEach((methodName) => {

    this[utils.serviceToFunction(methodName)] = function (functionOptions, body, callback) {

      if (arguments.length === 1) {
        callback = functionOptions;
        functionOptions = {};
      } else if (arguments.length === 2) {
        callback = body;
      }

      let options = Object.assign({}, defaults, instanceOptions, methods[methodName], functionOptions);

      utils.expandRegion(options);
      utils.expandAuth(options);
      utils.expandUri(options);

      options.body = body || functionOptions;

      return request(options, callback);
    }
  });
}