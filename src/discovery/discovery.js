// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow
// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

import grpc from "grpc"

import proto from "ttnapi/discovery/discovery_pb"
import discovery from "ttnapi/discovery/discovery_grpc_pb"

import { wrap, MODERN_CIPHER_SUITES } from "../utils"

// Necessary to make gRPC work
process.env.GRPC_SSL_CIPHER_SUITES = MODERN_CIPHER_SUITES

export type DiscoveryOptions = {
  address? : string,
  insecure? : boolean,
  certificate? : Buffer,
}

export type Service = "router" | "broker" | "handler"

export type Announcement = {
  id : string,
  serviceName: Service,
  serviceVersion : string,
  description : string,
  pb_public : bool,

  url : string,
  netAddress : string,
  mqttAddress : string,
  apiAddress : string,

  publicKey? : string,
  certificate? : string,
  metadataList? : Array<any>,
}


/** Discovery is a client for The Things Network discovery API */
export class Discovery {

  /** @private */
  client : any

  /**
   * Create a new Discovery client.
   */
  constructor (opts : DiscoveryOptions = {}) : void {
    const {
      address = "discovery.thethings.network:1900",
      insecure = false,
      certificate,
    } = opts

    const credentials =
      insecure
        ? grpc.credentials.createInsecure()
        : grpc.credentials.createSsl(certificate)

    this.client = new discovery.DiscoveryClient(address, credentials)
  }

  /** @private */
  _wrap (fn : Function, ...args : any[]) : Promise<*> {
    return wrap(this.client, fn, ...args).then(res => res.toObject())
  }

  /**
   * `getAll` returns announcements for all services known to
   * the discovery server that match the service name.
   *
   * @param serviceName - The name of the services to look for, eg. `"handler"`
   */
  async getAll (serviceName : Service) : Promise<Announcement[]> {
    const req = new proto.GetServiceRequest()
    req.setServiceName(serviceName)
    const res = await this._wrap(this.client.getAll, req)
    return res.servicesList
  }

  /**
   * `get` returns the announcement for the service with the
   * specified service name and id.
   *
   * @param serviceName - The name of the services to look for, eg. `"handler"`
   * @param id - The id of the service to look for, eg. `"ttn-handler-eu"`
   */
  get (serviceName : Service, id : string) : Promise<Announcement> {
    const req = new proto.GetRequest()
    req.setServiceName(serviceName)
    req.setId(id)
    return this._wrap(this.client.get, req)
  }

  /**
   * `getByAppID` gets a handler announcement by application ID.
   * It looks up the handler the application is registered to.
   */
  getByAppID (appID : string) : Promise<Announcement> {
    const req = new proto.GetByAppIDRequest()
    req.setAppId(appID)
    return this._wrap(this.client.getByAppID, req)
  }
}

/**
 * services is a map with the known service names for the discovery server.
 */
export const services : { [string] : Service } = {
  /** Handler is a Handler service */
  Handler: "handler",

  /** Router is a Router service */
  Router: "router",

  /** Broker is a Broker service */
  Broker: "broker",
}

