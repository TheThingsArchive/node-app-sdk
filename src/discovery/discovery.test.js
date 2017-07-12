// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import { handler, discovery as options } from "../../test/stubs"
import { Discovery, services } from "./discovery"

const dev = {
  ...handler,
  publicKey: handler.publicKey.toString(),
  certificate: handler.certificate.toString(),
}

test("Discovery.getAll", async () => {
  const client = new Discovery(options)
  const handlers = await client.getAll(services.Handler)

  expect(handlers).toHaveLength(1)
  expect(handlers[0]).toMatchObject(dev)
  expect(handlers[0].serviceVersion).toBeDefined()
})

test("Discovery.get", async () => {
  const client = new Discovery(options)
  const handler = await client.get(services.Handler, dev.id)

  expect(handler).toMatchObject(dev)
  expect(handler.serviceVersion).toBeDefined()
})
