// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.

// @flow

import { account } from "../src"

// insert your own values
const appID = "foo"
const accessKey = "ttn-account.eiPq8mEeYRL_PNBZsOpPy-O3ABJXYWulODmQGR5PZzg"
const accessToken = ""

const main = async function () {
  // you can connect through a JSON Web Token for the full account,
  // or via an Access Key for a single application. The latter method only
  // works for a subset of queries (GET operations on the given application)
  // to aquire them, see https://www.thethingsnetwork.org/docs/network/account/authentication.html
  const clientJWToken = account(accessToken)
  const clientAppKey = account(accessKey)

  // 1) show all applications that can be accessed with this key
  const allApps = await clientJWToken.getAllApplications()
  const allApps2 = await clientAppKey.getAllApplications()

  console.log(`${allApps.length} apps on this account.`)
  console.log(`only ${allApps2.length} app (${allApps2[0].id}) accessible through this access key.`)

  // 2) get the EUIs of the app, which can be used to register devices using the ApplicationManagerClient
  let myApp = await clientAppKey.getApplication(appID)
  console.log(myApp.euis)

  // the following methods require a JWT with correct access rights!

  // 3) create a new app
  const newAppID = "mynewcustomapp"
  const newApp = {
    id: newAppID,
    name: "this is a test app",
  }

  await clientJWToken.createApplication(newApp)
  console.log(await clientJWToken.getApplication(newApp.id))

  // 4) add an EUI to the app
  await clientJWToken.addEUI(newApp.id, "0011223344556677")
  myApp = await clientJWToken.getApplication(newApp.id)
  console.log(myApp)

  // 5) add a collaborator to the app
  await clientJWToken.addCollaborator(newApp.id, "username", [
    // "settings",
    // "delete",
    // "collaborators",
    "devices",
    "messages:up:r",
    "messages:up:w",
    "messages:down:w",
  ])

  console.log(await clientJWToken.getApplication(newApp.id))

  // 6) delete the test app again
  await clientJWToken.deleteApplication(newApp.id)
}

main().catch(function (err) {
  console.error(err)
  process.exit(1)
})
