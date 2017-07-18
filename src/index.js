// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import { Handler } from "./handler"
import { ApplicationClient } from "./applications"
import { DataClient } from "./data"
import type { DiscoveryOptions } from "./discovery"

export { Handler } from "./handler"
export { key } from "./utils/key"
export { DataClient, wildcard } from "./data"
export { ApplicationClient } from "./applications"
export { Discovery, services } from "./discovery"

/**
 * Create and open a HandlerClient.
 *
 * @param appID - The ID of the application you want to manage.
 * @param tokenOrKey - The Access Token or Access Key used to authenticate.
 * @param opts - Optional options to pass to the Discovery client.
 */
const open = async function (appID : string, accessKerOrToken : string, opts : ?DiscoveryOptions) : Promise<Handler> {
  const handler = new Handler(appID, accessKerOrToken, opts)
  await handler.open()
  return handler
}

/**
 * Create and open an ApplicationClient.
 *
 * @param appID - The ID of the application you want to manage
 * @param tokenOrKey - The Access Token or Access Key used to authenticate
 */
export const application = async function (appID : string, accessKerOrToken : string, opts : ?DiscoveryOptions) : Promise<ApplicationClient> {
  const handler = await open(appID, accessKerOrToken, opts)
  return handler.application()
}

/**
 * Create and open a DataClient.
 *
 * @param appID - The ID of the application you want to manage
 * @param tokenOrKey - The Access Token or Access Key used to authenticate
 */
export const data = async function (appID : string, accessKerOrToken : string, opts : ?DiscoveryOptions) : Promise<DataClient> {
  const handler = await open(appID, accessKerOrToken, opts)
  return handler.data()
}
