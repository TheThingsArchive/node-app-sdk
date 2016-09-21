# The Things Network Node.js Client [![NPM](https://img.shields.io/npm/v/ttn.svg?maxAge=2592000)](https://www.npmjs.com/package/ttn)

This is the Node.js client for [The Things Network](https://www.thethingsnetwork.org) to receive activations and messages from IoT devices via The Things Network and send messages as well.

## Installation

```bash
npm install --save ttn
```

## Documentation

A Quick Start and full API Reference can be found in [The Things Network Documentation](https://www.thethingsnetwork.org/docs/refactor/node-js/).

## Example

An [example](src/example.js) is included and can be run directly in the browser via [Tonic](https://tonicdev.com/npm/ttn).

> **NOTE:** By default Tonic uses the stable version. For this refactor version use:
>
> ```js
> var ttn = require('ttn@2.0.0-4');
> ```

### Monitor

For a quick example run [bin/monitor](bin/monitor) and pass region, application ID and access key:

```bash
npm run monitor eu hello-world 4rw/vLixroZHch8WNZVBAnmP9GEvuJ1QEB5fI2czlfo=

[DEBUG] Region: eu
[DEBUG] Application ID: hello-world
[DEBUG] Application Access Key: 4rw/vLixroZHch8WNZVBAnmP9GEvuJ1QEB5fI2czlfo=
[DEBUG] URL: mqtt://eu.thethings.network
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
  "dev_id": "my-uno",
  "port": 1,
  "counter": 63,
  "payload_raw": "AQ==",
  "payload_fields": {
    "led": true
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

## Test

To run the [tests](test):

```bash
npm install
npm run test
```

## Release Policies

### Pre-releases
If you'd like to do a pre-release this is how it works.

1.  Bump package [version](https://docs.npmjs.com/cli/version) and add git tag:

	- For the first pre-release of a version:

		```bash
		npm version pre[patch|minor|major]
		```
		
	- For consecutive pre-releases of the same version:

		```bash
		npm version prerelease
		```
	
2.	[Publish](https://docs.npmjs.com/cli/publish) to a pre-release stream (aka npm tag), e.g. `refactor`

	```bash
	npm publish --tag refactor
	```
	
3. [Push](https://git-scm.com/docs/git-push) commits, including tags:

	```bash
	npm run push
	```

### Releases

1. Bump package [version](https://docs.npmjs.com/cli/version) and add git tag:

	```bash
	npm version [patch|minor|major]
	```
	
	> **NOTE:** If the current version is a pre-release all of the above will simply remove the pre-release identifier. For example, if the current version is `2.0.0-3` then `npm version patch` will result in `2.0.0` and not `2.0.1`.

2. [Publish](https://docs.npmjs.com/cli/publish) package:

	```bash
	npm publish
	```
3. [Push](https://git-scm.com/docs/git-push) commits, including tags:

	```bash
	git push --follow-tags
	```
