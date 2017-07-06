// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import { Discovery } from "./discovery"

test("Constructor should work", () => {
  const client = new Discovery({
    address: "localhost:4000",
  })
})
