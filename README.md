# The Things Network Node.js Application SDK
[![Build Status](https://travis-ci.org/TheThingsNetwork/node-app-sdk.svg?branch=master)](https://travis-ci.org/TheThingsNetwork/node-app-sdk) [![NPM](https://img.shields.io/npm/v/ttn.svg?maxAge=2592000)](https://www.npmjs.com/package/ttn)

This is the Node.js Application SDK for [The Things Network](https://www.thethingsnetwork.org) to receive activations and messages from IoT devices via The Things Network and send messages as well.

## Installation [![NPM](https://img.shields.io/npm/v/ttn.svg?maxAge=2592000)](https://www.npmjs.com/package/ttn)

```bash
npm install --save ttn
```

> **NOTE:** To use this SDK with the deprecated staging environment, install [version 1.3.2](https://github.com/TheThingsNetwork/node-app-sdk/tree/v1.3.2) instead: `npm i --save ttn@1.3.2`.

## Documentation

* [The Things Network Documentation / Arduino](https://www.thethingsnetwork.org/docs/applications/nodejs/)
* [API Reference](https://www.thethingsnetwork.org/docs/applications/nodejs/api.html)

## Example

An [example](src/example.js) is included and can be run directly in the browser via [Tonic](https://tonicdev.com/npm/ttn).

## Test [![Build Status](https://travis-ci.org/TheThingsNetwork/node-app-sdk.svg?branch=master)](https://travis-ci.org/TheThingsNetwork/node-app-sdk)

To run the [tests](test):

```bash
npm install
npm test
```
