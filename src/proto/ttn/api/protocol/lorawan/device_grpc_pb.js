// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.
//
'use strict';
var grpc = require('grpc');
var ttn_api_protocol_lorawan_device_pb = require('../../../../ttn/api/protocol/lorawan/device_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var github_com_gogo_protobuf_gogoproto_gogo_pb = require('../../../../github.com/gogo/protobuf/gogoproto/gogo_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lorawan_Device(arg) {
  if (!(arg instanceof ttn_api_protocol_lorawan_device_pb.Device)) {
    throw new Error('Expected argument of type lorawan.Device');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_lorawan_Device(buffer_arg) {
  return ttn_api_protocol_lorawan_device_pb.Device.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lorawan_DeviceIdentifier(arg) {
  if (!(arg instanceof ttn_api_protocol_lorawan_device_pb.DeviceIdentifier)) {
    throw new Error('Expected argument of type lorawan.DeviceIdentifier');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_lorawan_DeviceIdentifier(buffer_arg) {
  return ttn_api_protocol_lorawan_device_pb.DeviceIdentifier.deserializeBinary(new Uint8Array(buffer_arg));
}


var DeviceManagerService = exports.DeviceManagerService = {
  getDevice: {
    path: '/lorawan.DeviceManager/GetDevice',
    requestStream: false,
    responseStream: false,
    requestType: ttn_api_protocol_lorawan_device_pb.DeviceIdentifier,
    responseType: ttn_api_protocol_lorawan_device_pb.Device,
    requestSerialize: serialize_lorawan_DeviceIdentifier,
    requestDeserialize: deserialize_lorawan_DeviceIdentifier,
    responseSerialize: serialize_lorawan_Device,
    responseDeserialize: deserialize_lorawan_Device,
  },
  setDevice: {
    path: '/lorawan.DeviceManager/SetDevice',
    requestStream: false,
    responseStream: false,
    requestType: ttn_api_protocol_lorawan_device_pb.Device,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_lorawan_Device,
    requestDeserialize: deserialize_lorawan_Device,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  deleteDevice: {
    path: '/lorawan.DeviceManager/DeleteDevice',
    requestStream: false,
    responseStream: false,
    requestType: ttn_api_protocol_lorawan_device_pb.DeviceIdentifier,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_lorawan_DeviceIdentifier,
    requestDeserialize: deserialize_lorawan_DeviceIdentifier,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.DeviceManagerClient = grpc.makeGenericClientConstructor(DeviceManagerService);
