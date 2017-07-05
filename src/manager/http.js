import "isomorphic-fetch"
import httpError from "http-errors"
import regions from "../regions"
import URL from "url"

const checkStatus = function (response) {
  if (response.status < 200 || response.status >= 300) {
    throw httpError(response.status, response.statusText)
  }
  return response
}

const normalize = function (url = "") {
  let withProtocol = url.indexOf("://") === -1 ? "https://".concat(url) : url

  const u = URL.parse(withProtocol)
  if (!u.port) {
    u.host = u.host.concat(":8084")
  }

  return URL.format(u)
}

class HTTP {
  constructor (options = {}) {
    if (options.key && options.token) {
      return this.error('Both key and token given')
    }

    if (!options.key && !options.token) {
      return this._error('No key or token given')
    }

    this.key = options.key
    this.token = options.token

    if (options.region && options.base) {
      return this._error('Both region and base are given, only one is allowed')
    }

    if (!options.region && !options.base) {
      return this._error('No region or base are given')
    }

    if (options.region) {
      this.region = regions.validate(options.region);
    }

    this.base = options.base || normalize(this.region)

    this.headers = options.headers || {}
  }

  // throw a prefixed error
  _error (msg) {
    throw new Error(`HTTP: ${msg || 'unknown error'}`)
  }

  // perform a request
  _request (method = 'GET', uri, body) {
    const url = URL.resolve(this.base, uri)

    return fetch(url, {
      method,
      headers: {
        ...(this.headers || {}),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.key ? `Key ${this.key}` : `Bearer ${this.token}`,
      },
      body: body && JSON.stringify(body),
    })
    .then(checkStatus)
    .then(r => r.json())
  }

  getApplication (appID) {
    return this._request('GET', `/applications/${appID}`)
  }

  registerApplication (app) {
    return this._request('POST', '/applications', app)
  }

  setApplication (app_id, app = {}) {
    return this._request('POST', `/applications/${appID}`, { app_id, ...app })
  }

  deleteApplication (appID) {
    return this._request('DELETE', `/applications/${appID}`)
  }

  getDevicesForApplication (appID) {
    return this._request('GET', `/applications/${appID}/devices`)
  }

  getDevice (appID, devID) {
    return this._request('GET', `/applications/${appID}/devices/${devID}`)
  }

  registerDevice (appID, device = {}) {
    return this.setDevice(appID, device.devID, device)
  }

  setDevice (appID, dev_id, device = {}) {
    return this._request('POST', `/applications/${appID}/devices`, { dev_id, ...device })
  }

  deleteDevice (appID, devID) {
    return this._request('DELETE', `/applications/${appID}/devices`)
  }
}

module.exports = HTTP;
