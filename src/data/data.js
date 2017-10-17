// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import EventEmitter from "events"
import mqtt from "mqtt"

import debug from "../utils/debug"

import { devID, wildcard, uplinkTopic, eventTopic, downlinkTopic, validWildcards } from "./topic"

type DeviceID = string
type Connack = {
  sessionPresent : boolean,
}

type PayloadArray = Array<number>
type PayloadRaw = Buffer
type PayloadFields = { [string]: any }
type Schedule = "replace" | "first" | "last"

type DownlinkMessage = {
  port : number,
  payload_raw? : string,
  payload_fields? : PayloadFields,
  confirmed? : boolean,
  schedule? : Schedule,
}


/**
 * DataClient is a client for The Things Network data API.
 */
export class DataClient {
  /** @private */
  appID : string

  /** @private */
  emitter : EventEmitter

  /** @private */
  mqtt : any

  /**
   * Creates a new DataClient and opens the MQTT connection.
   */
  constructor (appID : string, appAccessKey : string, mqttAddress : string) : void {
    this.appID = appID
    this.emitter = new EventEmitter()

    const [ host, port = "1883" ] = mqttAddress.split(":")

    debug("connecting to mqtt host `%s` on port %d, using username `%s`", host, parseInt(port), appID)

    this.mqtt = mqtt.connect({
      host,
      port: parseInt(port),
      username: appID,
      password: appAccessKey,
    })

    this.mqtt.on("error", this.onError.bind(this))
    this.mqtt.on("connect", this.onConnect.bind(this))
    this.mqtt.on("message", this.onMessage.bind(this))
    this.mqtt.on("reconnect", this.onReconnect.bind(this))
    this.mqtt.on("close", this.onClose.bind(this))
  }

  /**
   * Close the mqtt connection
   *
   * @param force - passing it to true will close the client right away, without waiting for the in-flight messages to be acked
   * @param callback - will be called when the client is closed
   */
  close (force : ?boolean = false, callback : ?Function) {
    debug("closing mqtt client")
    return this.mqtt.end(force, callback)
  }

  /**
   * Same as close (for backwards compatibility).
   */
  end (force : ?boolean, callback : ?Function) {
    return this.close(force, callback)
  }

  /**
   * Starts listening to events.
   *
   * Possible events are:
   *
   * - `uplink` (or `message`): Messages sent by the devices to the appliction.
   * - `activation`: An alias for the `activations` (see `event`)
   * - `event` (or `device`): Events that happen to devices. You can filter on
   *   the events by adding more parameters. For instance:
   *   - `downlink/scheduled`
   *   - `downlink/sent`
   *   - `activations`
   *   - `create`
   *   - `update`
   *   - `delete`
   *   - `down/acks`
   *   - `up/errors`
   *   - `down/errors`
   *   - `activations/errors`
   *
   * See [The MQTT API Reference](https://www.thethingsnetwork.org/docs/applications/mqtt/api.html)
   * for more information about these events and what their payloads look like.
   *
   * @param event - The name of the event to listen to.
   * @param [devID] - An optional devID. If not passed will subscribe to the event for all devices.
   * @param [name|field] - The name of the field to listen for on uplink or the event for device events.
   * @param callback - The callback to call when the event occurs.
   *
   * @example
   * // listens to all uplinks from all devices
   * client.on("uplink", function (devID, message) {})
   *
   * @example
   * // listens to all uplinks from the device with id `foo`
   * client.on("uplink", "foo", function (devID, message) {})
   *
   * @example
   * // listens to all device events for all devices
   * client.on("event", function (devID, message) {})
   *
   * @example
   * // listens to all device events for device with id `foo`
   * client.on("event", "foo", function (devID, message) {})
   *
   * @example
   * // listens to the `downlink/scheduled` events for device with id `foo`
   * client.on("event", "foo", "downlink/scheduled", function (devID, message) {})
   *
   * @example
   * // listens to the `downlink/scheduled` events for all devices
   * client.on("event", "+", "downlink/scheduled", function (devID, message) {})
   */
  on (event : string, ...args : Array<*>) : void {
    return this.toggle(true, event, ...args)
  }

  /**
   * Stop listening to events.
   * The argument structure is the same as for `on()`.
   */
  off (event : string, ...args : Array<*>) : void {
    return this.toggle(false, event, ...args)
  }

  /**
   * @private
   * Toggles the subscription matching to the received arguments
   *
   */
  toggle (on : boolean, event : string, ...args : Array<*>) : void {
    if (args.length < 1) {
      throw new Error("Need at least one argument to on")
    }

    const [ ...rest ] = args
    const cb = rest.pop()

    let t = null

    switch (event) {
    case "uplink":
    case "message":
      t = uplinkTopic(...rest)
      break
    case "device":
    case "event":
    case "events":
      t = eventTopic(...rest)
      break
    case "activation":
      const [ devID = wildcard ] = rest
      t = eventTopic(devID, "activations")
      break
    case "error":
    case "connect":
    case "reconnect":
    case "close":
      this.emitter.on(event, cb)
      return
    }

    if (t === null) {
      throw new Error("Could not build topic")
    }

    if (on) {
      this.subscribe(t, cb)
    } else {
      this.unsubscribe(t, cb)
    }
  }

  /**
   * Send a downlink message to the device with the specified device ID.
   *
   * @param devID - The device ID of the device to send the downlink to.
   * @param payload - The raw payload as a Buffer, an Array of numbers, a hex string  or an object of payload fields.
   * @param port - The port to send the message on.
   * @param confirmed - Set to true for confirmed downlink.
   * @param schedule - Set to the scheduling you want to use (first, last or replace).
   */
  send (devID : DeviceID, payload : PayloadArray | PayloadRaw | String | PayloadFields, port : number = 1, confirmed : boolean = false, schedule : Schedule = "replace") {
    const t = downlinkTopic(this.appID, devID)
    const message : DownlinkMessage = {
      port,
      confirmed,
      schedule,
    }

    if (Array.isArray(payload)) {
      message.payload_raw = new Buffer(payload).toString("base64")
    } else if (payload instanceof Buffer) {
      message.payload_raw = payload.toString("base64")
    } else if (typeof payload === "string") {
      message.payload_raw = new Buffer(payload, "hex").toString("base64")
    } else {
      message.payload_fields = payload
    }

    debug("publishing message to %s: %O", t, message)

    this.mqtt.publish(t, JSON.stringify(message))
  }

  /**
   * @private
   * `onError` is called whenever there's an error in the MQTT client.
   */
  onError (err : any) : void {
    debug("mqtt client received error: %s", err)
    this.emitter.emit("error", err)
  }

  /**
   * @private
   * `onConnect` is called whenever the MQTT client (re-)connects.
   */
  onConnect (ack : Connack) : void {
    debug("mqtt client connected")
    this.emitter.emit("connect", ack)
  }

  /**
   * @private
   * `onReconnect` is called whenever the MQTT client starts reconnecting.
   */
  onReconnect () : void {
    debug("mqtt client reconnecting")
    this.emitter.emit("reconnect", undefined)
  }

  /**
   * @private
   * `onClose` is called after the MQTT disconnects.
   */
  onClose () : void {
    debug("mqtt client disconnected")
    this.emitter.emit("close", undefined)
  }

  /**
   * @private
   * `onMessage` is called when a new message is received from any subscription.
   */
  onMessage (topic : string, message : any) : void {
    const payload = JSON.parse(message.toString())

    if (payload && typeof payload.payload_raw === "string") {
      payload.payload_raw = new Buffer(payload.payload_raw, "base64")
    }

    debug("received message on topic `%s`: %O", topic, payload)

    const dev = devID(topic)
    validWildcards(topic).forEach(topic => this.emitter.emit(topic, dev, payload))
  }

  /**
   * @private
   * `subscribe` subscribes the mqtt client to the specified topic and hooks up
   * the callback in the event emitter.
   */
  subscribe (topic : string, cb : Function) : void {
    debug("subscribing to messages on topic `%s`", topic)
    this.mqtt.subscribe(topic)
    this.emitter.on(topic, cb)
  }

  /**
   * @private
   * `unsubscribe` unsubscribes the mqtt client from the specified topic and
   * removes the callback from the event emitter.
   */
  unsubscribe (topic : string, cb : Function) : void {
    debug("unsubscribing from messages on topic `%s`", topic)
    this.mqtt.unsubscribe(topic)
    this.emitter.removeListener(topic, cb)
  }
}
