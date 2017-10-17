// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

/* eslint-disable */

var ttn = require("../../dist")

var appID = "foo"
var accessKey = "ttn-account.eiPq8mEeYRL_PNBZsOpPy-O3ABJXYWulODmQGR5PZzg"

ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)

      // send downlink
      client.send("airbnb", new Buffer([ 0x0f, 0xaf ]))
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
