// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import { Handler } from "./handler"

const appID = "test"
const appAccessKey = "testkey"

test("Handler constructor", async () => {
  const client = new Handler(appID, appAccessKey)

  console.log("CLIENT", client)
})
