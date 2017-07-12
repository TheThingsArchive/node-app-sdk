// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import setup from "../../test/setup"
import { discovery, app } from "../../test/stubs"

import { Handler } from "."

beforeEach(setup)

test("Handler constructor", async () => {
  const client = new Handler(app.id, app.accessToken, discovery)
  await client.open()
})
