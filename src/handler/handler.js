// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

import { Discovery } from "../discovery"
import type { DiscoveryOptions, Announcement } from "../discovery"

import { ApplicationClient } from "../applications"
import { DataClient } from "../data"

/**
 * A client for The Things Network handler APIs.
 *
 * Handler can be used to get data from an application
 * or to manage devices.
 */
export class Handler {
  /** @private */
  appID : string

  /** @private */
  appAccessKey : string

  /** @private */
  discoveryOptions : ?DiscoveryOptions

  /** @private */
  announcement : ?Announcement

  constructor (appID : string, appAccessKey : string, opts : ?DiscoveryOptions) : void {
    this.appID = appID
    this.appAccessKey = appAccessKey
    this.discoveryOptions = opts
  }

  /**
   * `open` opens the client to the handler.
   */
  async open () : Promise<Handler> {
    if (this.announcement) {
      return this
    }

    const discovery = new Discovery(this.discoveryOptions)
    this.announcement = await discovery.getByAppID(this.appID)
    return this
  }

  /**
   * Open a data client that can be used to receive live application data
   */
  data () : DataClient {
    if (!this.announcement) {
      throw new Error("No handler configured, call open()!")
    }

    return new DataClient(this.appID, this.appAccessKey, this.announcement.mqttAddress)
  }

  /**
   * Open a application manager that can be used to manage the settings and devices of the
   * application.
   */
  application () : ApplicationClient {
    if (!this.announcement) {
      throw new Error("No handler configured, call discover() or configure() first!")
    }

    return new ApplicationClient(this.appID, this.appAccessKey, this.announcement.netAddress, this.announcement.certificate)
  }
}
