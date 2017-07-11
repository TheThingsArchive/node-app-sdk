// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import { Handler } from "../src/handler"

const app_id = "foo"
const access_key = "ttn-account.eiPq8mEeYRL_PNBZsOpPy-O3ABJXYWulODmQGR5PZzg"

const main = async function () {
  const handler = new Handler(app_id, access_key)

  await handler.open()
  const App = handler.application()

  const app = await App.get()
  console.log(app)
}

main().catch(function (err) {
  console.error(err)
  process.exit(1)
})
