// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import { data } from "../src"

const appID = "foo"
const accessKey = "ttn-account.eiPq8mEeYRL_PNBZsOpPy-O3ABJXYWulODmQGR5PZzg"

const main = async function () {
  const client = await data(appID, accessKey)

  client
    .on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
    })
}

main().catch(function (err) {
  console.error(err)
  process.exit(1)
})
