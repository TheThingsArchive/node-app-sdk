// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

/* eslint-env jest */
/* eslint-disable arrow-body-style */

// This file tests the discovery client.
// It requires a server to be running at localhost:1900
// that has allows insecure connections.

import { Discovery, services } from "./discovery"

test("Discovery.getAll", async () => {
  const client = new Discovery({
    address: "localhost:1900",
    insecure: true,
  })

  await client.getAll(services.Handler)
})

test("Discovery.get", async () => {
  const client = new Discovery({
    address: "localhost:1900",
    insecure: true,
  })

  await client.getAll(services.Handler, "dev")
})
