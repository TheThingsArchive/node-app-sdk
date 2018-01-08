// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import setup from "../../test/setup"
import * as stubs from "../../test/stubs"

import key from "../utils/key"

import { ApplicationClient } from "."

beforeEach(setup)

test("ApplicationClient constructor with access token", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessToken, stubs.handlerAddress, stubs.handler.certificate)

  expect(client.appAccessKey).not.toBeDefined()
  expect(client.appAccessToken).toBeDefined()
})

test("ApplicationClient constructor with access key", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessKey, stubs.handlerAddress, stubs.handler.certificate)

  expect(client.appAccessKey).toBeDefined()
  expect(client.appAccessToken).not.toBeDefined()
})

test("ApplicationClient get()", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessToken, stubs.handlerAddress, stubs.handler.certificate)

  const app = await client.get()
  expect(stubs.app).toMatchObject(app)
})

test("ApplicationClient setCustomPayloadFunctions()", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessToken, stubs.handlerAddress, stubs.handler.certificate)

  const fns = {
    decoder: "decoder",
    converter: "converter",
    validator: "validator",
    encoder: "encoder",
  }

  const empty = {
    payloadFormat: "custom",
    decoder: "",
    converter: "",
    validator: "",
    encoder: "",
  }

  await client.setCustomPayloadFunctions(fns)
  let app = await client.get()
  expect(app).toMatchObject(fns)

  await client.setCustomPayloadFunctions({})
  app = await client.get()
  expect(app).toMatchObject(empty)
})

test("ApplicationClient setPayloadFormat()", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessToken, stubs.handlerAddress, stubs.handler.certificate)

  await client.setPayloadFormat("custom")
  const app = await client.get()
  expect(app.payloadFormat).toEqual("custom")

  await client.setPayloadFormat("cayenne")
  const next = await client.get()
  expect(next.payloadFormat).toEqual("cayenne")
})

test("ApplicationClient setRegisterOnJoinAccessKey()", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessToken, stubs.handlerAddress, stubs.handler.certificate)

  const key = "foo"

  await client.setRegisterOnJoinAccessKey(key)
  const app = await client.get()

  expect(app.registerOnJoinAccessKey).toEqual(key)

  await client.setRegisterOnJoinAccessKey("")

  // TODO: fix this in backend
  // const after = await client.get()
  // expect(after.registerOnJoinAccessKey).toEqual("")
})

test("ApplicationClient unregister()", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessToken, stubs.handlerAddress, stubs.handler.certificate)

  await client.unregister()

  expect(client.get()).rejects.toBeDefined()
})

test("ApplicationClient devices management", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessToken, stubs.handlerAddress, stubs.handler.certificate)

  const devices = await client.devices()
  expect(devices).toEqual([])

  const id = "foo"
  const req = {
    description: "Description",
    appEui: "0011223344556677",
    devEui: "9988776655443322",
    devAddr: "11223344",
    nwkSKey: key(16),
    appSKey: key(16),
    appKey: key(16),
    fCntUp: 10,
    fCntDown: 11,
    latitude: 100,
    longitude: 200,
    altitude: 300,
    attributes: {
      foo: "bar",
    },
    disableFCntCheck: true,
    uses32BitFCnt: true,
  }

  await client.registerDevice(id, req)

  const res = await client.devices()
  expect(res).toHaveLength(1)

  const device = await client.device(id)
  expect(device).toMatchObject(req)

  const updates = {
    appEui: "1100003344556677",
  }

  await client.updateDevice(id, updates)

  const updated = await client.device(id)
  expect(updated).toMatchObject({ ...req, ...updates })

  await client.deleteDevice(id)
  const after = await client.devices()
  expect(after).toHaveLength(0)
})

test("ApplicationClient getDeviceAddress()", async () => {
  const client = new ApplicationClient(stubs.app.appId, stubs.app.accessToken, stubs.handlerAddress, stubs.handler.certificate)

  const addr = await client.getDeviceAddress()
  expect(addr).not.toBeUndefined()
})
