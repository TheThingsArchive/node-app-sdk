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

  await exampleAppKey(appID, accessKey)
  await exampleAccessToken(appID, accessToken)
}


async function exampleAppKey (appID, key) {
  // when authorized with an app key, the only working query is getApplication().
  // this is still useful to get the applications EUI:
  const client = account(key)

  // get the EUIs of the app, which can be used to register devices using the ApplicationManagerClient
  const myApp = await client.getApplication(appID)
  console.log(myApp.euis)

  try {
    await client.getAllApplications()
  } catch (err) {
    console.log(`can't get all apps when authorized with app key: ${err}`)
  }
}


async function exampleAccessToken (appID, accessToken) {
  const client = account(accessToken)

  // show all applications that can be accessed with this key
  const allApps = await client.getAllApplications()
  console.log(`${allApps.length} apps on this account.`)

  // create a new app
  const newApp = {
    id: "mynewcustomapp",
    name: "this is a test app",
  }

  await client.createApplication(newApp)
  console.log(await client.getApplication(newApp.id))

  // add an EUI to the app
  await client.addEUI(newApp.id, "0011223344556677")

  // add a collaborator to the app
  await client.addCollaborator(newApp.id, "username", [
    // "settings",
    // "delete",
    // "collaborators",
    "devices",
    "messages:up:r",
    "messages:up:w",
    "messages:down:w",
  ])

  console.log(await client.getApplication(newApp.id))

  // delete the test app again
  await client.deleteApplication(newApp.id)
}

main().catch(function (err) {
  console.error(err)
  process.exit(1)
})
