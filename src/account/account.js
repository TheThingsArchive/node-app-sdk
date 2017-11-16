// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import fetch from "node-fetch"

import { MODERN_CIPHER_SUITES } from "../utils"
import isToken from "../utils/is-token"

// Necessary to make gRPC work
process.env.GRPC_SSL_CIPHER_SUITES = MODERN_CIPHER_SUITES

/**
 * `Account` is a client for The Things Network account server API.
 * It can be used to manage applications and their EUIs, as well as gateways.
 * Either a Bearer Token or an Application Access Key can be used for
 * authentication. The latter method allows to use the `getApplication()`
 * function only.
 *
 * Example:
 * ```
 * const account = new Account("accesKeyOrToken", "https://customserveradress.org")
 * ```
 */
export class AccountClient {
  /** @private */
  authHeader : string

  /** @private */
  serverAddress: string

  constructor (accessKeyOrToken : string, serverAddress : string = "https://account.thethingsnetwork.org") : void {
    this.authHeader = isToken(accessKeyOrToken)
      ? `Bearer ${accessKeyOrToken}`
      : `Key ${accessKeyOrToken}`

    this.serverAddress = serverAddress
  }

  /** @private */
  async makeRequest (url : string, method : string = "GET", body : ?any) : Promise<any> {
    const res = await fetch(`${this.serverAddress}/${url}`, {
      method,
      body,
      headers: { Authorization: this.authHeader },
    })

    if (res.status >= 400) {
      throw new Error(`${res.status} ${res.statusText}`)
    }

    return res.json()
  }

  /**
   * Gets metadata about all applications that are accessible with
   * the given accessToken
   */
  getAllApplications () : Promise<Array<AccountApplication>> {
    return this.makeRequest("applications")
  }

  /**
   * Gets the information that is stored about a given application.
   * This includes the EUIs, name access keys, collaborators.
   * The properties that can be retrieved depend on the rights of
   * the used authorization mechanism.
   */
  getApplication (appID : string) : Promise<AccountApplication> {
    return this.makeRequest(`applications/${appID}`)
  }

  /**
   * Creates a new application on the account server.
   */
  createApplication (app : MinimalAccApplication) : Promise<any> {
    return this.makeRequest("applications", "POST", app)
  }

  /**
   * Removes an application from the account server.
   */
  deleteApplication (appID : string) : Promise<any> {
    return this.makeRequest(`applications/${appID}`, "DELETE")
  }

  /**
   * Adds a collaborator with a set of access rights to the given application.
   */
  addCollaborator (appID : string, collaborator : string, rights : Array<AppAccessRights>) : Promise<any> {
    return this.makeRequest(`applications/${appID}/collaborators/${collaborator}`, "PUT", rights)
  }

  /**
   * Removes a collaborator by her username from an application
   */
  deleteCollaborator (appID : string, collaborator : string) : Promise<any> {
    return this.makeRequest(`applications/${appID}/collaborators/${collaborator}`, "DELETE")
  }

  /**
   * Adds an EUI to the given application. Must be hexadecimal with a length of 16.
   */
  addEUI (appID : string, eui : string) : Promise<any> {
    return this.makeRequest(`applications/${appID}/euis/${eui}`, "PUT")
  }

  /**
   * Removes an EUI from the given application.
   */
  deleteEUI (appID : string, eui : string) : Promise<any> {
    return this.makeRequest(`applications/${appID}/euis/${eui}`, "DELETE")
  }
}

/**
 * AppAccessRights
 */
type AppAccessRights = "settings"
  | "delete"
  | "collaborators"
  | "devices"
  | "messages:up:r"
  | "messages:up:w"
  | "messages:down:w"

/**
 * The minimal payload for to the POST /applications route
 * of the account server
 */
type MinimalAccApplication = {
  id: string,
  name: string,
}

/**
 * AccountApplication contains the metadata of an application
 * returned by the account server. Presence of optional fields
 * depends on the [access rights](#appaccessrights) of the used accessKey / -token.
 */
type AccountApplication = MinimalAccApplication & {
  euis: Array<string>,
  created: string,
  rights: Array<string>,
  collaborators?: Array<{
    username: string,
    email: string,
    rights: Array<string>,
  }>,
  access_keys?: Array<{
    name: string,
    key: string,
    rights: Array<string>,
  }>,
  deleted?: string
}
