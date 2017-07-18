// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

/* eslint-disable */

var Handler = require("../../dist/handler").Handler

var app_id = "foo"
var access_key = "ttn-account.eiPq8mEeYRL_PNBZsOpPy-O3ABJXYWulODmQGR5PZzg"

var handler = new Handler(app_id, access_key)

handler
  .open()
  .then(function () {
    handler
      .data()
      .on("uplink", function (devID, payload) {
        console.log("Received uplink from ", devID)
        console.log(payload)
      })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
