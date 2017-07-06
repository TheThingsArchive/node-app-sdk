import grpc from "grpc"

import proto from "../proto/src/github.com/TheThingsNetwork/ttn/api/discovery/discovery_pb"
import discovery from "../proto/src/github.com/TheThingsNetwork/ttn/api/discovery/discovery_grpc_pb"

type Options = {
  address : string,
  certificate : ?Buffer,
}

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

export class Discovery {
  constructor (opts : Options = {}) {
    const {
      address = "discover.thethings.network",
      certificate,
    } = opts

    const ssl = grpc.credentials.createSsl(certificate)
    this.client = new discovery.DiscoveryClient(address, ssl)
  }

  _wrap (fn, ...args) {
    return wrap(this.client, fn, ...args).then(res => res.toObject())
  }

  async getAll (serviceName : string) {
    const req = new proto.GetServiceRequest()
    req.setServiceName(serviceName)
    const res = await this._wrap(this.client.getAll, req)
    return res.servicesList
  }

  get (serviceName : string, id : string) {
    const req = new proto.GetRequest()
    req.setServiceName(serviceName)
    req.setId(id)
    return this._wrap(this.client.get, req)
  }
}

export const services = {
  handler: "handler",
  router: "router",
  broker: "broker",
}

