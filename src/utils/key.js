// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import crypto from "crypto"

/**
 * Generates a new key to be used for Lora
 */
export default function (length : number = 16) {
  return crypto.randomBytes(length).toString("hex")
}
