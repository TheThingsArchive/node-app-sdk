// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import fs from "fs"
import { Discovery, services } from "../src/discovery"

const main = async function () {
  const client = new Discovery({
    address: "localhost:1900",
    certificate: fs.readFileSync("../ttn/.env/discovery/server.cert"),
  })

  const handlers = await client.getAll(services.Handler)
  const handlerDev = await client.get(services.Handler, "dev")

  console.log(`Found ${handlers.length} handlers in total:`)
  handlers.forEach(handler => console.log(`  - ${handler.id}`))

  console.log("")
  console.log("Dev handler announcement:")
  console.log(handlerDev)
}

main()
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })
