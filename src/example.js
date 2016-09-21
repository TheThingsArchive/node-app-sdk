var ttn = require('ttn');

var region = 'eu';
var appId = '';
var accessKey = '';

var client = new ttn.Client(region, appId, accessKey);

client.on('connect', function(connack) {
  console.log('[DEBUG]', 'Connect:', connack);
});

client.on('error', function(err) {
  console.error('[ERROR]', err.message);
});

client.on('activation', function(data) {
  console.log('[INFO] ', 'Activation:', data);
});

client.on('message', function(deviceId, field, data) {
  console.info('[INFO] ', 'Message:', deviceId, field, JSON.stringify(data, null, 2));
});

client.on('message', null, 'led', function(deviceId, field, data) {

  // Respond to every third message
  if (data.counter % 3 === 0) {

    // Toggle the LED
    var payload = {
      led: !!message.led
    };

    // If you don't have an encoder payload function:
    // var payload = new Buffer([message.led ? 0 : 1]);

    console.log('[DEBUG]', 'Sending:', JSON.stringify(payload));
    client.send(data.dev_id, payload, data.port);
  }
});