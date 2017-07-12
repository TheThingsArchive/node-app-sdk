// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import fs from "fs"
import path from "path"
import jwt from "jsonwebtoken"

const key = fs.readFileSync(path.resolve(__dirname, ".env/discovery/server.key"))
const options = {
  issuer: "local",
  expiresIn: "7d",
  algorithm: "ES256",
}

const claims = {
  scope: [ "apps" ],
}

const appClaims = {
  scope: [ "apps:test" ],
  apps: {
    test: [
      "settings",
      "devices",
      "delete",
    ],
  },
}

/**
 * A token that can register ApplicationSettings
 */
export const token = jwt.sign(claims, key, options)

/**
 * The app used for testing
 */
export const app = {
  appId: "test",
  accessToken: jwt.sign(appClaims, key, options),
  accessKey: "local.12345678",
  payloadFormat: "custom",
  decoder: "",
  converter: "",
  validator: "",
  encoder: "",
  registerOnJoinAccessKey: "",
}

/**
 * Settings for the discovery server
 */
export const discovery = {
  address: "localhost:1900",
  certificate: fs.readFileSync(path.resolve(__dirname, ".env/discovery/server.cert")),
}

/**
 * Settings for the handler
 */
export const handler = {
  id: "dev",
  serviceName: "handler",
  description: "",
  url: "",
  pb_public: false,
  netAddress: "handler:1904",
  publicKey: fs.readFileSync(path.resolve(__dirname, ".env/handler/server.pub")),
  certificate: fs.readFileSync(path.resolve(__dirname, ".env/handler/server.cert")),
  apiAddress: "http://handler:8084",
  mqttAddress: "handler:1883",
  amqpAddress: "handler:5672",
}

export const handlerAddress = "localhost:1904"
