// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import Handler from "./handler"

export type EventName = "connect" | "error" | "message" | "device" | "activation"

export default class Data {
  /** @private */
  handler : Handler

  constructor (handler : Handler) : void {
    this.handler = handler
  }
}
