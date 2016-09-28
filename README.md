# The Things Network Node.js Client
[![Build Status](https://travis-ci.org/TheThingsNetwork/node-app-lib.svg?branch=master)](https://travis-ci.org/TheThingsNetwork/node-app-lib) [![NPM](https://img.shields.io/npm/v/ttn.svg?maxAge=2592000)](https://www.npmjs.com/package/ttn)

This is the Node.js client for [The Things Network](https://www.thethingsnetwork.org) to receive activations and messages from IoT devices via The Things Network and send messages as well.

## Installation [![NPM](https://img.shields.io/npm/v/ttn.svg?maxAge=2592000)](https://www.npmjs.com/package/ttn)

```bash
npm install --save ttn
```

## Documentation

* [The Things Network Documentation / Arduino](https://www.thethingsnetwork.org/docs/node-js/)
* [API Reference](API.md)

## Example

An [example](src/example.js) is included and can be run directly in the browser via [Tonic](https://tonicdev.com/npm/ttn).

> **NOTE:** By default Tonic uses the stable version. For this refactor version use:
>
> ```js
> var ttn = require('ttn@2.0.0-4');
> ```

## Test [![Build Status](https://travis-ci.org/TheThingsNetwork/node-app-lib.svg?branch=master)](https://travis-ci.org/TheThingsNetwork/node-app-lib)

To run the [tests](test):

```bash
npm install
npm test
```
