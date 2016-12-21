# API Reference: Manager HTTP

Require the The Things Network Node.js SDK:

```js
var ttn = require('ttn');
```

## Class: data.manager

Creates a client for the Application Manager HTTP API.

```js
var client = new ttn.manager.HTTP(options);
```

- `options [object]` Default options to pass to [`request()`](https://www.npmjs.com/package/request), including these shortcuts:
    - `options.region [string]`: Region (e.g. `eu`) which will be expanded to `options.baseUrl` (e.g. `https://eu.thethings.network:8084`).
    - `options.token [string]`: Bearer Token which will be expanded to `options.auth.bearer`.
    - `options.key [string]`: Access Key which will be expanded to `options.headers.Authorization` e.g. (`Key my-key`).

## Method Signature

All methods follow the same signature.

### Names
Their names are the same as the methods of the [gRPC API](https://www.thethingsnetwork.org/docs/applications/manager/api.html), but with the first character in lower case (e.g. `registerApplication` instead of `RegisterApplication`). An exception is when a single method has multiple applications depending on the HTTP method. In that case the SDK splits this into multiple functions (e.g. `SetDevice` is split into `RegisterDevice` and `SetDevice`).

## Arguments
The methods take 1 to 3 arguments.

### Callback
The last argument is always the callback which will be passed on to [`request()`](https://www.npmjs.com/package/request) which this SDK wraps.

```js
client.someMethod(function (error, response, body) {
});
```

could create the request:

```plaintext
GET /some-method
```

> At the moment all methods require either replacements for the endpoint or a body.

### Options
The first optional argument overrides the internal defaults, those set when creating the instance and finally those of the method itself.

This object should also include keys for all placeholders in the HTTP endpoint of the method.

```js
client.getDevice({
  app_id: 'my-app',
  dev_id: 'my-device'
}, function (error, response, body) {
});
```

will create the request:

```plaintext
GET /applications/my-app/devices/my-device
```

### Body

The second optional argument will be JSON encoded and used as body for the request.

If you leave out this argument, then the first argument will be used, but only after removing keys that have been used for placeholders in the HTTP endpoint of the method.

Both

```js
client.registerApplication({
  app_id: 'my-app'
}, function (error, response, body) {
});
```

and

```js
client.registerApplication({}, {
  app_id: 'my-app'
}, function (error, response, body) {
});
```

Will create the request:

```plaintext
POST /applications '{"app_id":"my-app"}'
```

## Methods

- [`registerApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#registerapplication)
- [`getApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#getapplication)
- [`setApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#setapplication)
- [`deleteApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#deleteapplication)
- [`getDevice`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#getdevice)
- [`setDevice`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#setdevice)
- [`deleteDevice`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#deletedevice)
- [`getDevicesForApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#getdevicesforapplication)

### Special Cases

- `registerDevice`: Maps to the `/applications/{app_id}/devices` endpoint of [`setDevice`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#setdevice) to register a new device.


### Function: registerApplication

```js
client.registerApplication(options, function(err, res, body) {
});
```

- `options [object]` Default options for all requests, including:
    - `options.app_id [string]`: Application ID to create

### Function: getApplication

```js
client.getApplication({
  app_id: "some-app-id"
}, function(err, res, body) {
});
```

### Function: setApplication

```js
client.setApplication({
  "app_id": "some-app-id",
  "converter": "function Converter(decoded, port) {...",
  "decoder": "function Decoder(bytes, port) {...",
  "encoder": "Encoder(object, port) {...",
  "validator": "Validator(converted, port) {..."
}, function(err, res, body) {
});
```
