// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

/**
 * The wildcard topic. Use this to explicitly build queries for all devices.
 */
export const wildcard : string = "+"

const regex = /^[a-z0-9](?:[_-]?[a-z0-9]){1,35}$/
const validID = function (str : string = "", type : string = "") : void {
  if (!regex.test(str)) {
    throw new Error(`Invalid ${type ? type.concat(" ") : ""}id '${str}'`)
  }
}

const validIDOrWildcard = function (str : string = "", type : string = "") : void {
  if (str === wildcard) {
    return
  }

  return validID(str, type)
}

/**
 * @private
 * Build a topic.
 */
export const topic = function (...parts : Array<string | void>) : string {
  return collapse(parts.filter(part => Boolean(part)).join("/"))
}

const collapse = function (t : string) : string {
  return t.replace(/#.*/g, "#")
}

/**
 * @private
 * Build the topic for uplink
 */
export const uplinkTopic = function (...args : Array<string | void>) : string {
  switch (args.length) {
  case 0:
    return uplinkTopic(wildcard)
  case 1:
    const [ devID_ ] = args
    return uplinkTopic(devID_, undefined)
  case 2:
    const [ devID__, fieldName_ ] = args
    return uplinkTopic(wildcard, devID__, fieldName_)
  case 3:
    const [ appID, devID, fieldName ] = args
    validIDOrWildcard(appID, "application")
    validIDOrWildcard(devID, "device")
    return topic(appID, "devices", devID, "up", fieldName)
  }

  throw new Error(`Could not build uplink topic from ${args.join(",")}`)
}

/**
 * @private
 * Build the topic for events
 */
export const eventTopic = function (...args : Array<string | void>) : string {
  switch (args.length) {
  case 0:
    return eventTopic(wildcard)
  case 1:
    const [ devID_ ] = args
    return eventTopic(devID_, "#")
  case 2:
    const [ devID__, name_ ] = args
    return eventTopic(wildcard, devID__, name_)
  case 3:
    const [ appID, devID, name ] = args
    validIDOrWildcard(appID, "application")
    validIDOrWildcard(devID, "device")
    return topic(appID, "devices", devID, "events", name)
  }

  throw new Error(`Could not build event topic from ${args.join(",")}`)
}

/**
 * @private
 * Build the topic for downlink
 */
export const downlinkTopic = function (appID : string, devID : string) : string {
  validID(appID, "application")
  validID(devID, "device")

  return topic(appID, "devices", devID, "down")
}

/**
 * @private
 * Generate all wildcard possibilities for a given topic.
 * eg. a/b/c becomes
 *  - a/b/c
 *  - a/b/#
 *  - a/b/+
 *  - a/#
 *  - a/+/#
 *  - a/+/+
 *  - +/b/c
 *  - +/b/#
 *  - +/b/+
 *  - +/#
 *  - +/+/c
 *  - +/+/#
 *  - +/+/+
 */
export const wildcards = function (t : string) : Array<string> {
  const parts : Array<string> = t.split("/")

  const l = parts.map(function (part : string) : Array<string> {
    return [
      part,
      "#",
      "+",
    ]
  })

  return allcombos(...l).filter(unique)
}

const valid = function (topic) {
  const parts = topic.split("/")
  return parts.length >= 4 && parts[0] !== "#" && parts[1] === "devices" && parts[2] !== "#" && (parts[3] === "up" || parts[3] === "events")
}

/**
 * @private
 * Same as `wildcards` but filters the ouput on valid topics for The Things
 * Network.
 */
export const validWildcards = function (t : string) : Array<string> {
  return wildcards(t).filter(valid)
}


const unique = function (value, index, self) {
  return self.indexOf(value) === index
}

const allcombos = function (first : Array<string>, ...args : Array<Array<string>>) : Array<string> {
  if (args.length === 0) {
    return first
  }

  const [ fst, ...rest ] = args
  const cc = combos(first, fst).map(el => topic(...el)).filter(unique)

  return allcombos(cc, ...rest)
}

const combos = function (a : Array<string>, b : Array<string>) : Array<Array<string>> {
  if (a.length === 0) {
    return b.map(el => [ el ])
  }

  if (b.length === 0) {
    return a.map(el => [ el ])
  }

  return a.reduce(function (acc, ael) {
    return [
      ...acc,
      ...b.map(bel => [ ael, bel ]),
    ]
  }, [])
}
