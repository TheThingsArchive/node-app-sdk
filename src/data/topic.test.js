// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.

// @flow

/* eslint-env jest */
/* eslint-disable arrow-body-style */

import { wildcard, topic, uplinkTopic, eventTopic, validWildcards } from "./topic"

test("topic", () => {
  expect(topic("a", "b", "c")).toEqual("a/b/c")
  expect(topic("a", undefined, "c")).toEqual("a/c")
  expect(topic("a", "#", "c")).toEqual("a/#/c")
  expect(topic("a", "#", "#", "c")).toEqual("a/#/c")
  expect(topic("a", "#", "#", "#", "c")).toEqual("a/#/c")
})

test("uplinkTopic", () => {
  expect(uplinkTopic()).toEqual("+/devices/+/up")
  expect(uplinkTopic("foo")).toEqual("+/devices/foo/up")
  expect(uplinkTopic("foo", "temperature")).toEqual("+/devices/foo/up/temperature")
  expect(uplinkTopic("app", "foo", "temperature")).toEqual("app/devices/foo/up/temperature")
  expect(uplinkTopic(wildcard, "temperature")).toEqual("+/devices/+/up/temperature")
  expect(uplinkTopic("app", wildcard, "temperature")).toEqual("app/devices/+/up/temperature")
})

test("eventTopic", () => {
  expect(eventTopic()).toEqual("+/devices/+/events/#")
  expect(eventTopic("foo")).toEqual("+/devices/foo/events/#")
  expect(eventTopic("foo", "downlink/sent")).toEqual("+/devices/foo/events/downlink/sent")
  expect(eventTopic("app", "foo", "downlink/sent")).toEqual("app/devices/foo/events/downlink/sent")
  expect(eventTopic(wildcard, "downlink/sent")).toEqual("+/devices/+/events/downlink/sent")
  expect(eventTopic("app", wildcard, "downlink/sent")).toEqual("app/devices/+/events/downlink/sent")
})

test("wildcards", () => {
  const up = validWildcards("app/devices/123/up")
  expect(up).toEqual(expect.arrayContaining([
    "app/devices/123/up",
    "+/devices/123/up",
    "+/devices/+/up",
    "app/devices/+/up",
  ]))

  const field = validWildcards("app/devices/123/up/field")
  expect(field).toEqual(expect.arrayContaining([
    "app/devices/123/up/field",
    "+/devices/123/up/field",
    "+/devices/+/up/field",
    "app/devices/+/up/field",
    "app/devices/123/up/+",
    "+/devices/123/up/+",
    "+/devices/+/up/+",
    "app/devices/+/up/+",
    "app/devices/123/up/#",
    "+/devices/123/up/#",
    "+/devices/+/up/#",
    "app/devices/+/up/#",
  ]))
})
