// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import { Discovery } from "../discovery"
import type { DiscoveryOptions, Announcement } from "../discovery"

import Devices from "./devices"
import Data from "./data"


/**
 * A client for The Things Network handler APIs.
 *
 * Handler can be used to get data from an application
 * or to manage devices.
 */
export default class Handler {
  /** @private */
  app_id : string

  /** @private */
  access_key : string

  /** @private */
  announcement : ?Announcement

  /**
   * discover uses The Things Network discovery API to discovery the required
   * properties of the Handler based on the Handlers id.
   *
   * @param handler_id - The id of the handler
   * @param opts - Optional options to be used for passed to the Discovery client
   */
  async discover (handler_id : string, opts : ?DiscoveryOptions) : Promise<void> {
    const discovery = new Discovery(opts)
    this.announcement = await discovery.get(handler_id)
  }

  /**
   * configure configures the Handler manually, setting the necessary addresses
   * and certificates needed to connect to the handler.
   *
   * @param mqtt_address - The address of the MQTT broker of the Handler
   * @param net_address - The address of the Handler's gRPC endpoint
   * @param certificate - An optional certificate to use when connecting to the Handler
   */
  async configure (mqtt_address : string, net_address : string, certificate : ?string) : Promise<void> {
    this.announcement = {
      mqttAddress: mqtt_address,
      netAddress: net_address,
      certificate,
    }
  }

  /**
   * Configure the application that is to be used.
   *
   * @param app_id - The application ID
   * @param access_key - The application access key used to autheticate
   */
  application (app_id : string, access_key : string) : Handler {
    this.app_id = app_id
    this.access_key = access_key
    return this
  }

  /**
   * Open a data client that can be used to receive live application data
   */
  data () : Data {
    if (!this.announcement) {
      throw new Error("No handler configured, call discover() or configure() first!")
    }

    if (!this.app_id || !this.access_key) {
      throw new Error("No application configured, call application() first!")
    }

    return new Data(this)
  }

  /**
   * Open a device client that can be used to manage the devices of the
   * application
   */
  devices () : Devices {
    if (!this.announcement) {
      throw new Error("No handler configured, call discover() or configure() first!")
    }

    if (!this.app_id || !this.access_key) {
      throw new Error("No application configured, call application() first!")
    }

    return new Devices(this)
  }
}
