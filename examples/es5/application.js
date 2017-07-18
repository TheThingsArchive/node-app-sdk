// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

/* eslint-disable */

var ttn = require("../../dist")

var Handler = ttn.Handler
var key = ttn.key

var appID = "foo"
var accessKey = "ttn-account.eiPq8mEeYRL_PNBZsOpPy-O3ABJXYWulODmQGR5PZzg"

var handler = new Handler(appID, accessKey)

handler
  .open()
  .then(function () {
    var App = handler.application()
    return App.get()
  })
  .then(function (app) {
    console.log(app)
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })
