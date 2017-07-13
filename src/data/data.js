// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import EventEmitter from "events"
import mqtt from "mqtt"

type Connack = {
  sessionPresent : boolean,
}

export class DataClient {
  /** @private */
  mqttAddress : string

  /** @private */
  appID : string

  /** @private */
  appAccessKey : string

  /** @private */
  emitter : EventEmitter

  /** @private */
  mqtt : any

  /**
   * Creates a new DataClient and opens the MQTT connection
   */
  constructor (appID : string, appAccessKey : string, mqttAddress : string) : void {
    this.mqttAddress = mqttAddress
    this.appID = appID
    this.appAccessKey = appAccessKey

    this.emitter = new EventEmitter()
    this.mqtt = mqtt.connect({
      host: mqttAddress,
      username: appID,
      password: appAccessKey,
    })

    this.mqtt.on("error", this.onError)
    this.mqtt.on("connect", this.onConnect)
    this.mqtt.on("message", this.onMessage)
  }

  /**
   * Close the mqtt connection
   */
  close (...args : any) {
    return this.mqtt.end(...args)
  }

  /**
   * Starts listening to events
   */
  on () {
    // TODO
  }

  /**
   * Stop listening to events
   */
  off () {
    // TODO
  }

  /** @private */
  onError (err : any) : void {
    this.emitter.emit("error", err)
  }

  /** @private */
  onConnect (ack : Connack) : void {
    this.emitter.emit("connect", ack)
  }

  /** @private */
  onMessage (message : any) : void {
    // TODO
  }
}
