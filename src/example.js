var ttn = require('.');
var fs = require('fs');

var region = 'eu';
var appId = '';
var accessKey = '';
var options = {
  protocol: 'mqtts',
  // Assuming that the mqtt-ca certificate (https://www.thethingsnetwork.org/docs/applications/mqtt/quick-start.html) is in the same folder
  ca: [ fs.readFileSync('mqtt-ca.pem') ],
}

var client = new ttn.data.MQTT(region, appId, accessKey);

client.on('connect', function(connack) {
  console.log('[DEBUG]', 'Connect:', connack);
  console.log('[DEBUG]', 'Protocol:', client.mqtt.options.protocol);
  console.log('[DEBUG]', 'Host:', client.mqtt.options.host);
  console.log('[DEBUG]', 'Port:', client.mqtt.options.port);
});

client.on('error', function(err) {
  console.error('[ERROR]', err.message);
});

client.on('activation', function(deviceId, data) {
  console.log('[INFO] ', 'Activation:', deviceId, JSON.stringify(data, null, 2));
});

client.on('device', null, 'down/scheduled', function(deviceId, data) {
  console.log('[INFO] ', 'Scheduled:', deviceId, JSON.stringify(data, null, 2));
});

client.on('message', function(deviceId, data) {
  console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data, null, 2));
});

client.on('message', null, 'led', function(deviceId, led) {

  // Toggle the LED
  var payload = {
    led: !led
  };

  // If you don't have an encoder payload function:
  // var payload = [led ? 0 : 1];

  console.log('[DEBUG]', 'Sending:', JSON.stringify(payload));
  client.send(deviceId, payload);
});
