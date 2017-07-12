// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.


export type PayloadFormat = "custom" | "cayenne"

export type Application = {
  appId : string,
  payloadFormat : PayloadFormat,
  decoder? : string,
  converter? : string,
  validator? : string,
  encoder? : string,
  registerOnJoinAccessKey? : string,
}

export type PayloadFunctions = {
  decoder? : string,
  converter? : string,
  validator? : string,
  encoder? : string,
}

export type ApplicationSettings = {
  payloadFormat? : PayloadFormat,
  registerOnJoinAccessKey? : string,
}

export type ApplicationUpdates = {
  ...ApplicationSettings,
  ...PayloadFunctions,
}

export type Device = {
  appId : string,
  devId : string,
  description : string,
  appEui : string,
  devEui : string,
  devAddr : string,
  nwkSKey : string,
  appSKey : string,
  appKey : string,
  fCntUp : number,
  fCntDown : number,
  latitude : number,
  longitude : number,
  altitude : number,
  attributes : { [string]: string },
  disableFCntCheck : bool,
  uses32BitFCnt : bool,
  activationConstraints : string,
  lastSeen : number,
}

export type LorawanDeviceUpdates = {
  appEui? : string,
  devEui? : string,
  devAddr? : string,
  nwkSKey? : string,
  appSKey? : string,
  appKey? : string,
  fCntUp? : number,
  fCntDown? : number,
  disableFCntCheck? : bool,
  uses32BitFCnt? : bool,
}

export type DeviceUpdates = {
  description? : string,
  latitude? : number,
  longitude? : number,
  altitude? : number,
  attributes? : { [string]: string },
  ...LorawanDeviceUpdates,
}
