var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var ttn = require('ttn');

// Run the webserver on port 8080
app.listen(8080);
console.log('Open http://localhost:8080');

// Configuration for The Things Network
var region = process.env.TTN_REGION || 'eu';
var appId = process.env.TTN_APP_ID || 'hello-world';
var accessKey = process.env.TTN_APP_KEY || 'SuperSecretAccessKey=';

// Start the TTN Client
var client = new ttn.Client(region, appId, accessKey);

// Forward uplink to appId room in Socket.io
client.on('message', function(devId, data) {
  console.log('Message:', devId, data);
  io.to(appId).emit('message', devId, data);
});

// Forward activations to appId room in Socket.io
client.on('activation', function(devId, data) {
  console.log('Activation:', devId, data);
  io.to(appId).emit('activation', devId, data);
});

// Print errors to the console
client.on('error', function(err) {
  console.log('Error:', err);
});

// Close the TTN client on exit
process.on('exit', function(code) {
  client.end();
});

// Serve the index.html file
function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
}

// Add Socket.io clients to the appId room
io.on('connection', function(socket) {
  socket.join(appId);
});