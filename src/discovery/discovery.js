// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

import grpc from "grpc"

import proto from "../proto/src/github.com/TheThingsNetwork/ttn/api/discovery/discovery_pb"
import discovery from "../proto/src/github.com/TheThingsNetwork/ttn/api/discovery/discovery_grpc_pb"

type Options = {
  address : string,
  insecure : ?bool,
  certificate : ?Buffer,
}

type Service = "router" | "broker" | "handler"

process.env.GRPC_SSL_CIPHER_SUITES = "ECDHE-ECDSA-AES256-GCM-SHA384"

const wrap = function (o, fn, ...args) {
  return new Promise(function (resolve, reject) {
    fn.call(o, ...args, function (err, res) {
      if (err) {
        return reject(err)
      }
      resolve(res)
    })
  })
}

/** Discovery is a client for The Things Network discovery API */
export class Discovery {
  /**
   * Create a new Discovery client.
   */
  constructor (opts : Options = {}) {
    const {
      address = "discover.thethings.network",
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
  _wrap (fn, ...args) {
    return wrap(this.client, fn, ...args).then(res => res.toObject())
  }

  /**
   * getAll returns announcements for all services known to
   * the discovery server that match the service name.
   *
   * @param serviceName - The name of the services to look for, eg. "handler"
   */
  async getAll (serviceName : Service) {
    const req = new proto.GetServiceRequest()
    req.setServiceName(serviceName)
    const res = await this._wrap(this.client.getAll, req)
    return res.servicesList
  }

  /**
   * get returns the announcement for the service with the
   * specified service name and id.
   *
   * @param serviceName - The name of the services to look for, eg. "handler"
   * @param id - The id of the service to look for, eg. "ttn-handler-eu"
   */
  get (serviceName : Service, id : string) {
    const req = new proto.GetRequest()
    req.setServiceName(serviceName)
    req.setId(id)
    return this._wrap(this.client.get, req)
  }
}

/**
 * services is a map with the known service names for the discovery server.
 */
export const services = {
  /** handler is a Handler service */
  handler: "handler",

  /** router is a Router service */
  router: "router",

  /** broker is a Broker service */
  broker: "broker",
}

