// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import type { DiscoveryOptions } from "../discovery"

import Handler from "./handler"

/**
 * Create a new handler by discovering it based on a handler id
 *
 * @param handler_id - The id of the handler
 * @param opts - Optional options to be used for passed to the Discovery client
 */
export const discover = async function (handler_id : string, opts : ?DiscoveryOptions) : Promise<Handler> {
  const handler = new Handler()
  await handler.discover(handler_id, opts)
  return handler
}

/**
 * Create a new handler by discovering it based on a handler id
 *
 * @param handler_id - The id of the handler
 * @param opts - Optional options to be used for passed to the Discovery client
 */
export const manual = async function (mqtt_address : string, net_address : string, certificate : ?string) : Promise<Handler> {
  const handler = new Handler()
  await handler.configure(mqtt_address, net_address, certificate)
  return handler
}
