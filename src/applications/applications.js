// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import grpc from "grpc"

import wrap from "../utils/wrap"

import proto from "../proto/src/github.com/TheThingsNetwork/ttn/api/handler/handler_pb"
import handler from "../proto/src/github.com/TheThingsNetwork/ttn/api/handler/handler_grpc_pb"

import type { Announcement } from "../discovery"

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

export type Device = {
  appId : string,
  devId : string,
  description? : string,
  appEui : string,
  devEui : string,
  devAddr : string,
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
  activationConstraints? : string,
  lastSeen? : number,
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

  constructor (appID : string, appAccessKey : string, announcement : Announcement) : void {
    const {
      net_address,
      certificate,
    } = announcement

    const credentials =
      announcement.certificate
        ? grpc.credentials.createInsecure()
        : grpc.credentials.createSsl(certificate)

    this.client = new handler.HandlerManagerClient(net_address, credentials)
    this.appID = appID
    this.appAccessKey = appAccessKey
  }

  /** @private */
  exec (fn : Function, ...args : any[]) : Promise<*> {
    return wrap(this.client, fn, ...args).then(res => res.toObject())
  }

  async get () : Promise<Application> {
    const req = new proto.ApplicationIdentifier()
    req.setAppId(this.appID)
    return this.exec(this.client.getApplication, req)
  }

  async getPayloadFormat () : Promise<PayloadFormat> {
    const app = await this.get()
    return app.payloadFormat
  }

  async setPayloadFormat (format : PayloadFormat) : Promise<void> {
    await this.set({
      payload_format: format,
    })
  }

  async getCustomPayloadFunctions () : Promise<PayloadFunctions> {
    const app = await this.get()
    return {
      decoder: app.decoder,
      converter: app.converter,
      validator: app.validator,
      encoder: app.encoder,
    }
  }

  async setCustomPayloadFunctions (fns : PayloadFunctions = {}) : Promise<void> {
    await this.set({ ...fns })
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

  async delete () : Promise<void> {
    const req = new proto.ApplicationIdentifier()
    req.setAppId(this.appID)
    return this.exec(this.client.deleteApplication, req)
  }

  async devices () : Promise<Device[]> {
    return []
  }

  async registerDevice (device : Device) : Promise<void> {
  }

  // async getDevice (devID : string) : Promise<Device> {
  // }

  async setDevice (devID : string, device : Device) : Promise<void> {
  }

  async deleteDevice (devID : string) : Promise<void> {
  }
}
