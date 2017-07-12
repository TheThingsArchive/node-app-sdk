// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import grpc from "grpc"
import wrap from "../utils/wrap"
import proto from "../proto/ttn/api/handler/handler_pb"
import handler from "../proto/ttn/api/handler/handler_grpc_pb"

// Necessary to make gRPC work
process.env.GRPC_SSL_CIPHER_SUITES = "ECDHE-ECDSA-AES256-GCM-SHA384"

export type PayloadFormat = "custom" | "cayenne"

export type Application = {
  appId : string,
  payloadFormat : PayloadFormat,
  decoder? : string,
  converter? : string,
  validator? : string,
  encoder? : string,
  registerOnJoinAccessKey? : string,
}

type PayloadFunctions = {
  decoder? : string,
  converter? : string,
  validator? : string,
  encoder? : string,
}

type ApplicationSettings = {
  payloadFormat? : PayloadFormat,
  registerOnJoinAccessKey? : string,
}

type ApplicationUpdates = {
  ...ApplicationSettings,
  ...PayloadFunctions,
}

type Device = {
  appId : string,
  devId : string,
  description : string,
  appEui : string,
  devEui : string,
  devAddr : string,
  nwkSKey : string,
  appSKey : string,
  appKey : string,
  fCntUp : number,
  fCntDown : number,
  latitude : number,
  longitude : number,
  altitude : number,
  attributes : { [string]: string },
  disableFCntCheck : bool,
  uses32BitFCnt : bool,
  activationConstraints : string,
  lastSeen : number,
}

type DeviceUpdates = {
  description? : string,
  appEui? : string,
  devEui? : string,
  devAddr? : string,
  nwkSKey? : string,
  appSKey? : string,
  appKey? : string,
  fCntUp? : number,
  fCntDown? : number,
  latitude? : number,
  longitude? : number,
  altitude? : number,
  attributes? : { [string]: string },
  disableFCntCheck? : bool,
  uses32BitFCnt? : bool,
}

/**
 * A client that manages devices on the handler.
 */
export class ApplicationClient {

  /** @private */
  appID : string

  /** @private */
  appAccessKey : string

  /** @private */
  client : any

  /**
   * Create and open an application manager client that handles
   */
  constructor (appID : string, appAccessKey : string, netAddress : string, certificate : ?string) : void {
    const credentials =
      certificate
        ? grpc.credentials.createInsecure()
        : grpc.credentials.createSsl(certificate)

    this.client = new handler.HandlerManagerClient(netAddress, credentials)
    this.appID = appID
    this.appAccessKey = appAccessKey
  }

  /** @private */
  exec (fn : Function, ...args : any[]) : Promise<*> {
    return wrap(this.client, fn, ...args).then(res => res.toObject())
  }

  /**
   * Get the application
   */
  async get () : Promise<Application> {
    const req = new proto.ApplicationIdentifier()
    req.setAppId(this.appID)
    return this.exec(this.client.getApplication, req)
  }

  /**
   * Change the payload format of the application.
   */
  async setPayloadFormat (format : PayloadFormat) : Promise<void> {
    await this.set({
      payload_format: format,
    })
  }

  /**
   * Set the custom payload functions of the application and set the format
   * to custom.
   */
  async setCustomPayloadFunctions (fns : PayloadFunctions = {}) : Promise<void> {
    await this.set({
      payloadFormat: "custom",
      ...fns,
    })
  }

  /**
   * Unregister the application from the handler.
   */
  async unregister () : Promise<void> {
    const req = new proto.ApplicationIdentifier()
    req.setAppId(this.appID)
    return this.exec(this.client.deleteApplication, req)
  }

  /** @private */
  async set (updates : ApplicationUpdates = {}) : Promise<void> {
    const req = new proto.Application()

    if ("payloadFormat" in updates) {
      req.setPayloadFormat(updates.payloadFormat)
    }

    if ("registerOnJoinAccessKey" in updates) {
      req.setRegisterOnJoinAccessKey(updates.registerOnJoinAccessKey)
    }

    if ("decoder" in updates) {
      req.setDecoder(updates.decoder)
    }

    if ("converter" in updates) {
      req.setConverter(updates.converter)
    }

    if ("validator" in updates) {
      req.setValidator(updates.validator)
    }

    if ("encoded" in updates) {
      req.setEncoder(updates.encoder)
    }

    return this.exec(this.client.setApplication, req)
  }

  /**
   * List the devices of the application
   */
  async devices () : Promise<Device[]> {
    const req = new proto.ApplicationIdentifier()
    req.setAppId(this.appID)
    return this.exec(this.client.getDevicesForApplication, req)
  }

  /**
   * Register a device in the application.
   */
  async registerDevice (devID : string, device : DeviceUpdates) : Promise<void> {
    return this.setDevice(devID, device)
  }

  /**
   * Get the device specified by the devID
   */
  async getDevice (devID : string) : Promise<Device> {
    const req = new proto.DeviceIdentifier()
    req.setAppId(this.appID)
    req.setDevId(devID)
    return this.exec(this.client.getDevices, req)
  }

  /**
   * Update the device specified by the devID
   */
  async setDevice (devID : string, device : DeviceUpdates) : Promise<void> {
    const req = this.deviceRequest(devID, device)
    return this.exec(this.client.setDevice, req)
  }

  /**
   * Delete the specified device.
   */
  async deleteDevice (devID : string) : Promise<void> {
    const req = new proto.DeviceIdentifier()
    req.setAppId(this.appID)
    req.setDevId(devID)
    return this.exec(this.client.deleteDevice, req)
  }

  /** @private */
  deviceRequest (devID : string, device : DeviceUpdates = {}) : any {
    const req = new proto.Device()
    req.setAppId(this.appID)
    req.setDevId(devID)

    if ("description" in device) {
      req.setDescription(device.description)
    }

    if ("appEui" in device) {
      req.setAppEui(device.appEui)
    }

    if ("devEui" in device) {
      req.setDevEui(device.devEui)
    }

    if ("devAddr" in device) {
      req.setDevAddr(device.devAddr)
    }

    if ("nwkSKey" in device) {
      req.setNwkSKey(device.nwkSKey)
    }

    if ("appSKey" in device) {
      req.setAppSKey(device.appSKey)
    }

    if ("appKey" in device) {
      req.setAppKey(device.appKey)
    }

    if ("fCntUp" in device) {
      req.setFCntUp(device.fCntUp)
    }

    if ("fCntDown" in device) {
      req.setFCntDown(device.fCntDown)
    }

    if ("latitude" in device) {
      req.setLatitude(device.latitude)
    }

    if ("longitude" in device) {
      req.setLongitude(device.longitude)
    }

    if ("altitude" in device) {
      req.setAltitude(device.altitude)
    }

    if ("attributes" in device) {
      req.setAttributes(device.attributes)
    }

    if ("disableFCntCheck" in device) {
      req.setDisableFCntCheck(device.disableFCntCheck)
    }

    if ("uses32BitFCnt" in device) {
      req.setUses32BitFCnt(device.uses32BitFCnt)
    }

    return
  }
}
