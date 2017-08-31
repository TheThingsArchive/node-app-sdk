// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import setup from "../../test/setup"
import { discovery, app } from "../../test/stubs"

import { HandlerClient } from "."

beforeEach(setup)

test("Handler constructor", async () => {
  const client = new HandlerClient(app.appId, app.accessToken, discovery)
  await client.open()
})
