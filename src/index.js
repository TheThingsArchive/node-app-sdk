// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import { HandlerClient } from "./handler"
import { AccountClient } from "./account"
import { ApplicationClient } from "./applications"
import { DataClient } from "./data"
import type { DiscoveryOptions } from "./discovery"

export { HandlerClient } from "./handler"
export { key } from "./utils/key"
export { DataClient, wildcard } from "./data"
export { ApplicationClient } from "./applications"
export { Discovery, services } from "./discovery"

/**
 * `open` creates and opens a HandlerClient for the application with the specified ID.
 *
 * @param appID - The ID of the application you want to manage.
 * @param tokenOrKey - The Access Token or Access Key used to authenticate.
 * @param opts - Optional options to pass to the Discovery client.
 */
const open = async function (appID : string, accessKerOrToken : string, opts : ?DiscoveryOptions) : Promise<HandlerClient> {
  const handler = new HandlerClient(appID, accessKerOrToken, opts)
  await handler.open()
  return handler
}

/**
 * `application` creates and opens an ApplicationClient for the application with the specified ID.
 *
 * @param appID - The ID of the application you want to manage
 * @param accessKeyOrToken - The Access Token or Access Key used to authenticate
 */
export const application = async function (appID : string, accessKeyOrToken : string, opts : ?DiscoveryOptions) : Promise<ApplicationClient> {
  const handler = await open(appID, accessKeyOrToken, opts)
  return handler.application()
}

/**
 * `data` creates and opens an DataClient for the application with the specified ID.
 *
 * @param appID - The ID of the application you want to manage
 * @param accessKeyOrToken  - The Access Token or Access Key used to authenticate
 */
export const data = async function (appID : string, accessKeyOrToken : string, opts : ?DiscoveryOptions) : Promise<DataClient> {
  const handler = await open(appID, accessKeyOrToken, opts)
  return handler.data()
}

/**
 * `account` creates an AccountClient for the user associated to the specified key or token.
 *
 * @param accessKeyOrToken  - The Access Token or Access Key used to authenticate
 * @param serverAddress  - The URL to the account server to use. Defaults to "https://account.thethingsnetwork.org"
 */
export const account = function (accessKeyOrToken : string, serverAddress? : string) : AccountClient {
  return new AccountClient(accessKeyOrToken, serverAddress)
}
