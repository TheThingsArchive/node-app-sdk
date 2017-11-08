// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import request from "request-promise-native"

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
    return await request({
      method,
      url: `${this.serverAddress}/${url}`,
      headers: { Authorization: this.authHeader },
      json: true,
      body,
    })
  }

  async getAllApplications () : Promise<Array<Application>> {
    return await this.makeRequest("applications")
  }

  /**
   * Gets the information that is stored about a given application.
   * This includes the EUIs, name access keys, collaborators.
   * The properties that can be retrieved depend on the rights of
   * the used authorization mechanism.
   */
  async getApplication (appID : string) : Promise<Application> {
    return await this.makeRequest(`applications/${appID}`)
  }

  async createApplication (app : MinimalApplication) : Promise<any> {
    return await this.makeRequest("applications", "POST", app)
  }

  async deleteApplication (appID : string) : Promise<any> {
    return await this.makeRequest(`applications/${appID}`, "DELETE")
  }

  async addCollaborator (appID : string, collaborator : string, rights : Array<AccessRights>) : Promise<any> {
    return await this.makeRequest(`applications/${appID}/collaborators/${collaborator}`, "PUT", rights)
  }

  async deleteCollaborator (appID : string, collaborator : string) : Promise<any> {
    return await this.makeRequest(`applications/${appID}/collaborators/${collaborator}`, "DELETE")
  }

  async addEUI (appID : string, eui : string) : Promise<any> {
    return await this.makeRequest(`applications/${appID}/euis/${eui}`, "PUT")
  }

  async deleteEUI (appID : string, eui : string) : Promise<any> {
    return await this.makeRequest(`applications/${appID}/euis/${eui}`, "DELETE")
  }
}

type AccessRights = "settings"
  | "delete"
  | "collaborators"
  | "devices"
  | "messages:up:r"
  | "messages:up:w"
  | "messages:down:w"

type MinimalApplication = {
  id: string,
  name: string,
}

type Application = MinimalApplication & {
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
