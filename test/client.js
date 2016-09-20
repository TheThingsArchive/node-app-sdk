var should = require('should');

var ttn = require('..');

var BROKER = 'iot.eclipse.org';

describe('Client', function() {

	describe('#new', function() {
		it('should create client', function() {
			var client = createClient();
			client.should.be.an.instanceOf(ttn.Client);
		});
	});

	describe('#on(connect)', function() {
		it('shoudl emit event', function(done) {
			var client = createClient();
			client.on('connect', function(connack) {
				should(connack).be.an.Object();
				client.end();
				done();
			});
		});
	});

	describe('#on(activation)', function() {
		it('should emit event', function(done) {
			var client = createClient();
			client.on('activation', function(devId, data) {
				should(devId).be.a.String().and.equal('a-device');
				should(data).be.an.Object();
				should(data.dev_addr).be.a.String().and.equal('26012723');
				client.end();
				done();
			});
			client.mqtt.publish(client.appId + '/devices/a-device/activations', JSON.stringify({
				"app_eui": "70B3D57EF000001C",
				"dev_eui": "0004A30B001B7AD2",
				"dev_addr": "26012723",
				"metadata": {
					"time": "2016-09-13T09:59:02.90329585Z",
					"frequency": 868.5,
					"modulation": "LORA",
					"data_rate": "SF7BW125",
					"coding_rate": "4/5",
					"gateways": [{
						"eui": "B827EBFFFE87BD22",
						"timestamp": 1484146403,
						"time": "2016-09-13T09:59:02.867283Z",
						"channel": 2,
						"rssi": -49,
						"snr": 7,
						"rf_chain": 1
					}]
				}
			}));
		});
	});

	describe('#on(message)', function() {

		it('should emit event', function(done) {
			var client = createClient();
			client.on('message', function(devId, field, data) {
				should(devId).be.a.String().and.equal('a-device');
				should(field === null).be.true();
				should(data).be.an.Object();
				should(data.payload_fields).be.an.Object();
				should(data.payload_fields.led).be.true();
				should(data.payload_raw).be.a.String();
				should(data.app_id).be.a.String().and.equal(client.appId);
				should(data.dev_id).be.a.String().and.equal('a-device');
				client.end();
				done();
			});
			client.mqtt.publish(client.appId + '/devices/a-device/up', JSON.stringify({
				"port": 1,
				"counter": 5,
				"payload_raw": "AQ==",
				"payload_fields": {
					"led": true
				},
				"metadata": {
					"time": "2016-09-14T14:19:20.272552952Z",
					"frequency": 868.1,
					"modulation": "LORA",
					"data_rate": "SF7BW125",
					"coding_rate": "4/5",
					"gateways": [{
						"eui": "B827EBFFFE87BD22",
						"timestamp": 1960494347,
						"time": "2016-09-14T14:19:20.258723Z",
						"rssi": -49,
						"snr": 9.5,
						"rf_chain": 1
					}]
				}
			}));
		});

		it('should emit event for specific device', function(done) {
			var client = createClient();
			client.on('message', 'a-device', function(devId, field, data) {
				client.end();
				done();
			});
			client.mqtt.publish(client.appId + '/devices/a-device/up', JSON.stringify({}));
		});

		it('should emit event for specific device and field', function(done) {
			var client = createClient();
			client.on('message', 'a-device', 'led', function(devId, field, data) {
				should(data).be.true();
				client.end();
				done();
			});
			client.mqtt.publish(client.appId + '/devices/a-device/up/led', JSON.stringify(true));
		});

		it('should emit event for specific field', function(done) {
			var client = createClient();
			client.on('message', null, 'led', function(devId, field, data) {
				should(data).be.false();
				client.end();
				done();
			});
			client.mqtt.publish(client.appId + '/devices/a-device/up/led', JSON.stringify(false));
		});

	});
});

function createClient() {
	client = new ttn.Client(BROKER); // don't pass appId and appAccessKey to the test broker
	client.appId = Math.floor(Math.random() * 16777215).toString(16); // but set random appId afterwards
	return client;
}