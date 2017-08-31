// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import jwt from "jsonwebtoken"

/**
 * Returns true if the passed in string
 * is a json web token, and false otherwise.
 * It does NOT validate the token signature.
 */
export default function (str : string) : boolean {
  try {
    return Boolean(jwt.decode(str))
  } catch (err) {
    return false
  }
}
