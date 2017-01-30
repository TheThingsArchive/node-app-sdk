var chai = require('chai')
var cap = require('chai-as-promised')
var http = require('http')
var nock = require('nock')
var should = require('should')

chai.use(cap)
const expect = chai.expect

var ttn = require('..')

var REGION = 'eu'
var ACCESS_KEY = 'my-access-key'
var TOKEN = 'my-token'

var response = {
  "app_id": "some-app-id",
  "dev_id": "some-dev-id",
  "lorawan_device": {
    "activation_constraints": "local",
    "app_eui": "0102030405060708",
    "app_id": "some-app-id",
    "app_key": "01020304050607080102030405060708",
    "app_s_key": "01020304050607080102030405060708",
    "dev_addr": "01020304",
    "dev_eui": "0102030405060708",
    "dev_id": "some-dev-id",
    "disable_f_cnt_check": false,
    "f_cnt_down": 0,
    "f_cnt_up": 0,
    "last_seen": 0,
    "nwk_s_key": "01020304050607080102030405060708",
    "uses32_bit_f_cnt": true
  }
}

nock('https://eu.thethings.network:8084')
  // .matchHeader('Authorization', `Bearer ${TOKEN}`)
  .get('/applications/my-app/devices/my-dev')
  .reply(function (uri, requestBody, cb) {
    cb(null, [200, response])
  })

nock('https://eu.thethings.network:8084')
  // .matchHeader('Authorization', `Bearer ${TOKEN}`)
  .post('/applications')
  .reply(function (uri, requestBody, cb) {
    expect(requestBody).to.eql({ app_id: 'my-app' })
    cb(null, [200, {}])
  })

nock('http://my-handler:9999')
  // .matchHeader('authorization', 'Key ' + ACCESS_KEY)
  .get('/applications/my-app/devices/my-dev')
  .reply(function (uri, requestBody, cb) {
    cb(null, [200, response])
  })

describe('manager.HTTP', function () {
  describe('region and access key', function () {
    it('should create an instance', function () {
      const client = new ttn.manager.HTTP({ region: 'eu', token: TOKEN })
      expect(client).to.be.an.instanceOf(ttn.manager.HTTP)
      expect(client.getDevice).to.be.a.Function
    })

    it('should get devices', function () {
      const client = new ttn.manager.HTTP({ region: 'eu', token: TOKEN })
      return expect(client.getDevice('my-app', 'my-dev')).to.eventually.eql(response)
    })

    it('should work with body', function () {
      const client = new ttn.manager.HTTP({ region: 'eu', token: TOKEN })
      return client.registerApplication({
        app_id: 'my-app',
      })
    })
  })

  describe('host and bearer token', function () {
    it('should create an instance', function () {
      const client = new ttn.manager.HTTP({
        base: 'http://my-handler:9999',
        key: ACCESS_KEY,
      })
      expect(client).to.be.an.instanceOf(ttn.manager.HTTP)
      expect(client.getDevice).to.be.a.Function
    })

    it('should get devices', function () {
      const client = new ttn.manager.HTTP({
        base: 'http://my-handler:9999',
        key: ACCESS_KEY,
      })

      return expect(client.getDevice('my-app', 'my-dev'))
        .to.eventually.eql(response)
    })
  })
})
