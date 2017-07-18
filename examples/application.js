// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import { Handler, key } from "../src"

const appID = "foo"
const accessKey = "ttn-account.eiPq8mEeYRL_PNBZsOpPy-O3ABJXYWulODmQGR5PZzg"

const main = async function () {
  const handler = new Handler(appID, accessKey)

  await handler.open()

  const App = handler.application()

  // set the payload functions
  await App.setCustomPayloadFunctions({
    decoder: `
      function Decoder(payload) {
        return { led: 1 };
      }
    `,
  })

  // get the application info
  const app = await App.get()
  console.log(app)

  // register a new device
  await App.registerDevice("foo", {
    description: "Description",
    appEui: "0011223344556677",
    devEui: "9988776655443322",
    devAddr: "11223344",
    nwkSKey: key(16),
    appSKey: key(16),
    appKey: key(16),
  })

  // list the apps devices
  const devices = await App.devices()
  console.log(devices)
}

main().catch(function (err) {
  console.error(err)
  process.exit(1)
})
