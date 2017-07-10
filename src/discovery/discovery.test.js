// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

// This file tests the discovery client.
// It requires a server to be running at localhost:1900
// that has allows insecure connections.

import fs from "fs"
import path from "path"

import { Discovery, services } from "./discovery"

const certificate = fs.readFileSync(path.resolve(__dirname, "../../test/.env/discovery/server.cert"))

const dev = {
  id: "dev",
  serviceName: "handler",
  description: "",
  url: "",
  pb_public: false,
  netAddress: "handler:1904",
  publicKey: fs.readFileSync(path.resolve(__dirname, "../../test/.env/handler/server.pub")).toString(),
  certificate: fs.readFileSync(path.resolve(__dirname, "../../test/.env/handler/server.cert")).toString(),
  apiAddress: "http://handler:8084",
  mqttAddress: "handler:1883",
  amqpAddress: "handler:5672",
  metadataList: [],
}

test("Discovery.getAll", async () => {
  const client = new Discovery({
    address: "localhost:1900",
    certificate,
  })

  const handlers = await client.getAll(services.Handler)
  expect(handlers).toHaveLength(1)
  expect(handlers[0]).toMatchObject(dev)
  expect(handlers[0].serviceVersion).toBeDefined()
})

test("Discovery.get", async () => {
  const client = new Discovery({
    address: "localhost:1900",
    certificate,
  })

  const handler = await client.get(services.Handler, dev.id)
  expect(handler).toMatchObject(dev)
  expect(handler.serviceVersion).toBeDefined()
})
