# The Things Network Node.js Client [![NPM](https://img.shields.io/npm/v/ttn.svg?maxAge=2592000)](https://www.npmjs.com/package/ttn)

This is the Node.js client for [The Things Network](https://www.thethingsnetwork.org) to receive activations and messages from IoT devices via The Things Network and send messages as well.

## Installation

```bash
npm install --save ttn
```

## Documentation

A Quick Start and full API Reference can be found in [The Things Network Documentation](https://www.thethingsnetwork.org/docs/node-js/).

## Example

An [example](src/example.js) is included and can be run directly in the browser via [Tonic](https://tonicdev.com/npm/ttn).

### Monitor

For a quick example run [bin/monitor](bin/monitor) and pass region, application ID and access key:

```bash
npm run monitor eu HELLO-WORLD 4rw/vLixroZHch8WNZVBAnmP9GEvuJ1QEB5fI2czlfo=

> ttn@2.0.0 monitor ~/node-ttn
> node bin/monitor "eu" "HELLO-WORLD" "4rw/vLixroZHch8WNZVBAnmP9GEvuJ1QEB5fI2czlfo="

[DEBUG] Region: eu
[DEBUG] Application ID: HELLO-WORLD
[DEBUG] Application Access Key: 4rw/vLixroZHch8WNZVBAnmP9GEvuJ1QEB5fI2czlfo=
[DEBUG] Connect: Packet {
  cmd: 'connack',
  retain: false,
  qos: 0,
  dup: false,
  length: 2,
  topic: null,
  payload: null,
  sessionPresent: false,
  returnCode: 0 }
[INFO] Message: {
  "dev_id": "MY-UNO",
  "port": 1,
  "counter": 63,
  "payload_raw": "SGVsbG8=",
  "payload_fields": {
    "message": "Hello"
  },
  "metadata": {
    "time": "2016-09-06T13:39:51.11186125Z",
    "frequency": 868.1,
    "modulation": "LORA",
    "data_rate": "SF7BW125",
    "coding_rate": "4/5",
    "gateways": [
      {
        "eui": "B827EBFGFE87BD21",
        "timestamp": 3746387779,
        "time": "2016-09-06T13:39:51.077691Z",
        "rssi": -76,
        "snr": 7.2,
        "rf_chain": 1
      }
    ]
  }
}
```