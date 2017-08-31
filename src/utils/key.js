// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import crypto from "crypto"

/**
 * Generates a new key to be used for Lora
 */
export const key = function (length : number = 16) {
  return crypto.randomBytes(length).toString("hex")
}

export default key
