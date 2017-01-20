const ttn = require('.');

// This package provides a sample to test the sdk.
// Replace the app-id and the dev-id and provide your credentials to test it

var options = {
  region: 'Your region (eu or us)',
  key: 'Your app Access Key',
  token: 'Your token'
}

var client = new ttn.manager.HTTP(options);

client.getDevice({
  app_id: 'app-id',
  dev_id: 'dev-id'
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

client.getDevicesForApplication({
  app_id: 'app-id',
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

client.registerApplication({}, {
  app_id: 'app-id'
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

client.setApplication({
  app_id: 'app-id',
  converter: 'function Converter(decoded, port) { return {name: John, lastname: Snow}; }',
  decoder: 'function Decoder(bytes, port) { return {test: value}; }',
  validator: 'function Validator(conve, port) { return false; }',
  encoder: 'function Encoder(object, port) { return []; }',
}, {
  app_id: 'app-id',
  converter: 'function Converter(decoded, port) { return {name: John, lastname: Snow}; }',
  decoder: 'function Decoder(bytes, port) { return {test: value}; }',
  validator: 'function Validator(conve, port) { return false; }',
  encoder: 'function Encoder(object, port) { return []; }',
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

client.getApplication({
  app_id: 'app-id'
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

client.setDevice({
  app_id: 'app-id',
  dev_id: 'dev-id'
},{
  app_id: 'app-id',
  dev_id: 'dev-id'
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});
