// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import { wildcard, DataClient } from "."

const appID = "guest"
const accessKey = "guest"
const mqttAddress = "localhost:1883"

// an activation event
const activation = {
  app_eui: "70B3D57EF000001C",
  dev_eui: "0004A30B001B7AD2",
  dev_addr: "26012723",
  metadata: {
    time: "2016-09-13T09:59:02.90329585Z",
    frequency: 868.5,
    modulation: "LORA",
    data_rate: "SF7BW125",
    coding_rate: "4/5",
    gateways: [{
      eui: "B827EBFFFE87BD22",
      timestamp: 1484146403,
      time: "2016-09-13T09:59:02.867283Z",
      channel: 2,
      rssi: -49,
      snr: 7,
      rf_chain: 1,
    }],
  },
}

// and uplink event
const uplink = {
  port: 1,
  counter: 5,
  payload_raw: new Buffer("AQ==", "base64"),
  payload_fields: {
    led: true,
  },
  metadata: {
    time: "2016-09-14T14:19:20.272552952Z",
    frequency: 868.1,
    modulation: "LORA",
    data_rate: "SF7BW125",
    coding_rate: "4/5",
    gateways: [{
      eui: "B827EBFFFE87BD22",
      timestamp: 1960494347,
      time: "2016-09-14T14:19:20.258723Z",
      rssi: -49,
      snr: 9.5,
      rf_chain: 1,
    }],
  },
}

test("DataClient constructor", () => {
  const client = new DataClient(appID, accessKey, mqttAddress)
  client.close()
})

test("DataClient.on('connect')", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(1)

  client.on("connect", function (connack) {
    expect(connack).toEqual(expect.objectContaining({
      cmd: "connack",
      retain: expect.any(Boolean),
      qos: expect.any(Number),
    }))

    client.close()
    done()
  })
})

test("DataClient.on('error')", done => {
  const client = new DataClient("bad", "invalid", mqttAddress)

  expect.assertions(2)

  client.on("error", function (error) {
    expect(error).toEqual(expect.any(Error))
    expect(error.message).toEqual(expect.stringContaining("Bad username or password"))
    client.close({ force: true })
    done()
  })
})

test("DataClient.on('activation')", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"

  client.on("activation", function (devID, event) {
    expect(devID).toEqual(devID)
    expect(event).toEqual(activation)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/events/activations`, JSON.stringify(activation))
})


test("DataClient.on('activation', devID)", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"

  client.on("activation", devID, function (devID, event) {
    expect(devID).toEqual(devID)
    expect(event).toEqual(activation)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/events/activations`, JSON.stringify(activation))
})

test("DataClient.on('event')", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"

  client.on("event", function (devID, event) {
    expect(devID).toEqual(devID)
    expect(event).toEqual(activation)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/events/activations`, JSON.stringify(activation))
})

test("DataClient.on('event', devID)", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"

  client.on("event", devID, function (devID, event) {
    expect(devID).toEqual(devID)
    expect(event).toEqual(activation)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/events/activations`, JSON.stringify(activation))
})

test("DataClient.on('event', wildcard, 'activations')", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"

  client.on("event", wildcard, "activations", function (devID, event) {
    expect(devID).toEqual(devID)
    expect(event).toEqual(activation)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/events/activations`, JSON.stringify(activation))
})

test("DataClient.on('event', devID, 'activations')", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"

  client.on("event", devID, "activations", function (devID, event) {
    expect(devID).toEqual(devID)
    expect(event).toEqual(activation)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/events/activations`, JSON.stringify(activation))
})

test("DataClient.on('uplink')", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"

  client.on("uplink", function (devID, message) {
    expect(devID).toEqual(devID)
    expect(message).toEqual(uplink)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/up`, JSON.stringify({
    ...uplink,
    payload_raw: uplink.payload_raw.toString("base64"),
  }))
})

test("DataClient.on('uplink', devID)", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"

  client.on("uplink", devID, function (devID, message) {
    expect(devID).toEqual(devID)
    expect(message).toEqual(uplink)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/up`, JSON.stringify({
    ...uplink,
    payload_raw: uplink.payload_raw.toString("base64"),
  }))
})

test("DataClient.on('uplink', devID, 'field')", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"
  const field = "field"
  const value = 1234

  client.on("uplink", devID, field, function (devID, message) {
    expect(devID).toEqual(devID)
    expect(message).toEqual(value)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/up/${field}`, JSON.stringify(value))
})

test("DataClient.on('uplink', wildcard, 'field')", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(2)

  const devID = "foo"
  const field = "field"
  const value = 1234

  client.on("uplink", wildcard, field, function (devID, message) {
    expect(devID).toEqual(devID)
    expect(message).toEqual(value)
    client.close()
    done()
  })

  client.mqtt.publish(`${appID}/devices/${devID}/up/${field}`, JSON.stringify(value))
})

test("DataClient.off()", done => {
  const client = new DataClient(appID, accessKey, mqttAddress)

  expect.assertions(0)

  const devID = "foo"
  const field = "field"
  const value = 1234

  const handler = function (devID, message) {
    expect(true).toBe(true)
  }

  client.on("uplink", wildcard, field, handler)
  client.off("uplink", wildcard, field, handler)

  client.mqtt.publish(`${appID}/devices/${devID}/up/${field}`, JSON.stringify(value))

  setTimeout(function () {
    client.close()
    done()
  }, 300)
})
