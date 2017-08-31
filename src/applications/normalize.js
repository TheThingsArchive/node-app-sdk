// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import type { Device } from "./types"

const hex = function (base64 : ?string) : ?string {
  if (!base64) {
    return
  }

  return new Buffer(base64, "base64").toString("hex")
}

export default function (device : Object) : Device {
  const {
    lorawanDevice = {},
    attributesMap = [],
    ...rest
  } = device

  const {
    appEui,
    devEui,
    devAddr,
    nwkSKey,
    appSKey,
    appKey,
    ...lorawan
  } = lorawanDevice

  return {
    ...rest,
    ...lorawan,
    appEui: hex(appEui),
    devEui: hex(devEui),
    appKey: hex(appKey),
    appSKey: hex(appSKey),
    nwkSKey: hex(nwkSKey),
    devAddr: hex(devAddr),
    attributes: attributesMap.reduce(function (acc, pair) {
      return {
        ...acc,
        [pair[0]]: pair[1],
      }
    }, {}),
  }
}
