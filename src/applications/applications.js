// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import grpc from "grpc"

import proto from "ttnapi/handler/handler_pb"
import lorawan from "ttnapi/protocol/lorawan/device_pb"
import handler from "ttnapi/handler/handler_grpc_pb"
import addr from "ttnapi/protocol/lorawan/device_address_grpc_pb"
import devaddr from "ttnapi/protocol/lorawan/device_address_pb"

import { wrap, MODERN_CIPHER_SUITES } from "../utils"
import isToken from "../utils/is-token"
import { AccountClient } from "../account"

import normalize from "./normalize"

import type { Device, Application, ApplicationUpdates, PayloadFunctions, DeviceUpdates, LorawanDeviceUpdates, PayloadFormat } from "./types"

type Usage = "otaa" | "abp" | "world" | "local" | "private" | "testing"

// Necessary to make gRPC work
process.env.GRPC_SSL_CIPHER_SUITES = MODERN_CIPHER_SUITES

/**
 * A client that manages devices on the handler.
 */
export class ApplicationClient {

  /** @private */
  appID : string

  /** @private */
  appAccessKey : ?string

  /** @private */
  appAccessToken : ?string

  /** @private */
  client : any

  /** @private */
  accountClient : AccountClient

  /** @private */
  credentials : any

  /** @private */
  netAddress : string

  /**
   * Create and open an application manager client that can be used for
   * retreiving and updating an application and its devices.
   *
   * @param appID - The ID of the application you want to manage
   * @param tokenOrKey - The Access Token or Access Key used to authenticate
   * @param netAddress - The gRPC address of the handler where the application is registered
   * @param certificate - An optional certificate used to connect to the handler securely
   */
  constructor (appID : string, tokenOrKey : string, netAddress : string, certificate : ?(Buffer | string)) : void {
    const credentials =
      certificate
        ? grpc.credentials.createSsl(certificate && new Buffer(certificate))
        : grpc.credentials.createInsecure()

    this.client = new handler.ApplicationManagerClient(netAddress, credentials)
    this.credentials = credentials
    this.netAddress = netAddress
    this.appID = appID

    if (isToken(tokenOrKey)) {
      this.appAccessToken = tokenOrKey
    } else {
      this.appAccessKey = tokenOrKey
    }

    this.accountClient = new AccountClient(tokenOrKey)
  }

  /** @private */
  async exec (fn : Function, ...args : any[]) : Promise<*> {
    const meta = new grpc.Metadata()
    if (this.appAccessToken) {
      meta.add("token", this.appAccessToken)
    } else if (this.appAccessKey) {
      meta.add("key", this.appAccessKey)
    }

    const res = await wrap(this.client, fn, ...args, meta)

    return res.toObject()
  }

  /**
   * Get the application
   */
  async get () : Promise<Application> {
    const req = new proto.ApplicationIdentifier()
    req.setAppId(this.appID)

    const app = await this.exec(this.client.getApplication, req)
    app.payloadFormat = app.payloadFormat || "custom"

    return app
  }

  /**
   * Change the payload format of the application.
   */
  async setPayloadFormat (format : PayloadFormat) : Promise<void> {
    await this.set({
      payloadFormat: format,
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
   * Set the registerOnJoinAccessKey or remove it.
   */
  async setRegisterOnJoinAccessKey (to : string) : Promise<void> {
    await this.set({
      registerOnJoinAccessKey: to,
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

    req.setAppId(this.appID)

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

    if ("encoder" in updates) {
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
    const res = await this.exec(this.client.getDevicesForApplication, req)
    return res.devicesList.map(normalize)
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
  async device (devID : string) : Promise<Device> {
    const req = new proto.DeviceIdentifier()
    req.setAppId(this.appID)
    req.setDevId(devID)
    const res = await this.exec(this.client.getDevice, req)
    return normalize(res)
  }

  /** @private */
  async setDevice (devID : string, device : DeviceUpdates) : Promise<void> {
    const req = this.deviceRequest(devID, device)
    return this.exec(this.client.setDevice, req)
  }

  /**
   * Update the device specified by the devID with the specified updates
   */
  async updateDevice (devID : string, updates : DeviceUpdates) : Promise<void> {
    const device = await this.device(devID)
    const req = this.deviceRequest(devID, { ...device, ...updates })
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
      Object.keys(device.attributes).forEach(function (key) {
        req.getAttributesMap().set(key, device.attributes[key])
      })
    }

    req.setLorawanDevice(this.lorawanDeviceRequest(devID, device))

    return req
  }

  /** @private */
  lorawanDeviceRequest (devID : string, device : LorawanDeviceUpdates = {}) : any {
    const req = new lorawan.Device()

    req.setAppId(this.appID)
    req.setDevId(devID)

    if ("appEui" in device) {
      req.setAppEui(new Uint8Array(new Buffer(device.appEui, "hex")))
    }

    if ("devEui" in device) {
      req.setDevEui(new Uint8Array(new Buffer(device.devEui, "hex")))
    }

    if ("devAddr" in device) {
      req.setDevAddr(new Uint8Array(new Buffer(device.devAddr, "hex")))
    }

    if ("nwkSKey" in device) {
      req.setNwkSKey(new Uint8Array(new Buffer(device.nwkSKey, "hex")))
    }

    if ("appSKey" in device) {
      req.setAppSKey(new Uint8Array(new Buffer(device.appSKey, "hex")))
    }

    if ("appKey" in device) {
      req.setAppKey(new Uint8Array(new Buffer(device.appKey, "hex")))
    }

    if ("fCntUp" in device) {
      req.setFCntUp(device.fCntUp)
    }

    if ("fCntDown" in device) {
      req.setFCntDown(device.fCntDown)
    }

    if ("disableFCntCheck" in device) {
      req.setDisableFCntCheck(device.disableFCntCheck)
    }

    if ("uses32BitFCnt" in device) {
      req.setUses32BitFCnt(device.uses32BitFCnt)
    }

    return req
  }

  /**
   * Returns the EUI(s) for this application from the account server.
   */
  async getEUIs () : Promise<Array<string>> {
    const appInfo = await this.accountClient.getApplication(this.appID)

    return appInfo.euis
  }

  /**
   * Return a device address for the given constraints.
   *
   * @param usage - The list for wich the address will be used.
   * @returns address - A buffer containing the address.
   */
  async getDeviceAddress (usage : Array<Usage> = [ "abp" ]) : Promise<Buffer> {
    const client = new addr.DevAddrManagerClient(this.netAddress, this.credentials)
    const req = new devaddr.DevAddrRequest()
    req.setUsageList(usage)

    const res = await this.exec(client.getDevAddr, req)

    return new Buffer(res.devAddr, "base64")
  }
}

