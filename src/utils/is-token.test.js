// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import * as stubs from "../../test/stubs"
import isToken from "./is-token"

test("Access token should be token", () => {
  expect(isToken(stubs.app.accessToken)).toBe(true)
})

test("Access key should not be token", () => {
  expect(isToken(stubs.app.accessKey)).toBe(false)
})

