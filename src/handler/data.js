// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

export type EventName = "connect" | "error" | "message" | "device" | "activation"

export default class DataClient {
  /** @private */
  mqttAddress : string

  /** @private */
  appID : string

  /** @private */
  appAccessKey : string


  constructor (appID : string, appAccessKey : string, mqttAddress : string) : void {
    this.mqttAddress = mqttAddress
    this.appID = appID
    this.appAccessKey = appAccessKey
  }

}
