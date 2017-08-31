// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import grpc from "grpc"

import proto from "ttnapi/handler/handler_pb"
import handler from "ttnapi/handler/handler_grpc_pb"

import { wrap, MODERN_CIPHER_SUITES } from "../src/utils"

import * as stubs from "./stubs"

// Necessary to make gRPC work
process.env.GRPC_SSL_CIPHER_SUITES = MODERN_CIPHER_SUITES

/**
 * Setup function that prepares the environment with the required
 * application and devices for testing.
 */
export default async function () {
  const credentials = grpc.credentials.createSsl(stubs.handler.certificate)
  const client = new handler.ApplicationManagerClient(stubs.handlerAddress, credentials)

  // register the test app
  const req = new proto.ApplicationIdentifier()
  req.setAppId(stubs.app.appId)

  const meta = new grpc.Metadata()
  meta.add("token", stubs.app.accessToken)

  // reregister app
  await wrap(client, client.deleteApplication, req, meta).catch(() => null)
  await wrap(client, client.registerApplication, req, meta)
}
