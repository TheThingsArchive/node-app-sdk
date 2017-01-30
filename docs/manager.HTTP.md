# API Reference: Manager HTTP

Require the The Things Network Node.js SDK:

```js
var ttn = require('ttn');
```

## Class: data.manager

Creates a client for the Application Manager HTTP API.

```js
const client = new ttn.manager.HTTP(options)
```

Where the following options are supported:

- `options.key`: the access key to use (cannot be used together with `token`)
- `options.token`: the bearer token to use (cannot be used together with
  `key`)
- `options.region`: the region to use (cannot be used together with `base`)
- `options.base`: the base url of the handler api (cannot be used together with
  `region`)

## Methods
All methods return a `Promise` that will resolve to the described result.

### `getApplication (appID)`
Returns the application with the id `appID`.
See [`getApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#getapplication).

### `registerApplication (app)`
Registers the application.
See [`registerApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#registerapplication).

### `setApplication (appID, app)`
Update application properties on the handler.
See [`setApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#setapplication).

### `deleteApplication (appID)`
Delete an application from the handler.
See [`deleteApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#deleteapplication).

### `getDevicesForApplication (appID)`
List all devices for the application.
See [`getDevicesForApplication`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#getdevicesforapplication).

### `getDevice (appID, devID)`
Get a specific device from the handler.
See [`getDevice`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#getdevice).

### `setDevice (appID, devID, device)`
Update the properties of a specific device on the handler.
See [`setDevice`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#setdevice).

### `registerDevice (appID, device)`
Register a new device on the handler.
An alias for `setDevice(appID, device.devID, device)`.

### `deleteDevice (appID, devID)`
Delete a device from the handler.
See [`deleteDevice`](https://www.thethingsnetwork.org/docs/applications/manager/api.html#deletedevice).

## Example

Get an application from the handler:

```js
import ttn from "ttn"

const client = new ttn.manager.HTTP({
  region: "eu",
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
})

client.getApplication("my-app")
  .then(function (app) {
    // do something with app
  })
  .catch(function (err) {
    // handle error
  })
```
