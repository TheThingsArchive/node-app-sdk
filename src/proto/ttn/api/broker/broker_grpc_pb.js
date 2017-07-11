// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.
//
'use strict';
var grpc = require('grpc');
var ttn_api_broker_broker_pb = require('../../../ttn/api/broker/broker_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var github_com_gogo_protobuf_gogoproto_gogo_pb = require('../../../github.com/gogo/protobuf/gogoproto/gogo_pb.js');
var ttn_api_api_pb = require('../../../ttn/api/api_pb.js');
var ttn_api_protocol_protocol_pb = require('../../../ttn/api/protocol/protocol_pb.js');
var ttn_api_gateway_gateway_pb = require('../../../ttn/api/gateway/gateway_pb.js');
var ttn_api_trace_trace_pb = require('../../../ttn/api/trace/trace_pb.js');

function serialize_broker_ApplicationHandlerRegistration(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.ApplicationHandlerRegistration)) {
    throw new Error('Expected argument of type broker.ApplicationHandlerRegistration');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_ApplicationHandlerRegistration(buffer_arg) {
  return ttn_api_broker_broker_pb.ApplicationHandlerRegistration.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_DeduplicatedUplinkMessage(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.DeduplicatedUplinkMessage)) {
    throw new Error('Expected argument of type broker.DeduplicatedUplinkMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_DeduplicatedUplinkMessage(buffer_arg) {
  return ttn_api_broker_broker_pb.DeduplicatedUplinkMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_DeviceActivationRequest(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.DeviceActivationRequest)) {
    throw new Error('Expected argument of type broker.DeviceActivationRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_DeviceActivationRequest(buffer_arg) {
  return ttn_api_broker_broker_pb.DeviceActivationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_DeviceActivationResponse(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.DeviceActivationResponse)) {
    throw new Error('Expected argument of type broker.DeviceActivationResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_DeviceActivationResponse(buffer_arg) {
  return ttn_api_broker_broker_pb.DeviceActivationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_DownlinkMessage(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.DownlinkMessage)) {
    throw new Error('Expected argument of type broker.DownlinkMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_DownlinkMessage(buffer_arg) {
  return ttn_api_broker_broker_pb.DownlinkMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_Status(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.Status)) {
    throw new Error('Expected argument of type broker.Status');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_Status(buffer_arg) {
  return ttn_api_broker_broker_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_StatusRequest(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.StatusRequest)) {
    throw new Error('Expected argument of type broker.StatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_StatusRequest(buffer_arg) {
  return ttn_api_broker_broker_pb.StatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_SubscribeRequest(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.SubscribeRequest)) {
    throw new Error('Expected argument of type broker.SubscribeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_SubscribeRequest(buffer_arg) {
  return ttn_api_broker_broker_pb.SubscribeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_UplinkMessage(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.UplinkMessage)) {
    throw new Error('Expected argument of type broker.UplinkMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_UplinkMessage(buffer_arg) {
  return ttn_api_broker_broker_pb.UplinkMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


// The Broker service provides pure network functionality
var BrokerService = exports.BrokerService = {
  // Router initiates an Association with the Broker.
  associate: {
    path: '/broker.Broker/Associate',
    requestStream: true,
    responseStream: true,
    requestType: ttn_api_broker_broker_pb.UplinkMessage,
    responseType: ttn_api_broker_broker_pb.DownlinkMessage,
    requestSerialize: serialize_broker_UplinkMessage,
    requestDeserialize: deserialize_broker_UplinkMessage,
    responseSerialize: serialize_broker_DownlinkMessage,
    responseDeserialize: deserialize_broker_DownlinkMessage,
  },
  // Handler subscribes to uplink stream.
  subscribe: {
    path: '/broker.Broker/Subscribe',
    requestStream: false,
    responseStream: true,
    requestType: ttn_api_broker_broker_pb.SubscribeRequest,
    responseType: ttn_api_broker_broker_pb.DeduplicatedUplinkMessage,
    requestSerialize: serialize_broker_SubscribeRequest,
    requestDeserialize: deserialize_broker_SubscribeRequest,
    responseSerialize: serialize_broker_DeduplicatedUplinkMessage,
    responseDeserialize: deserialize_broker_DeduplicatedUplinkMessage,
  },
  // Handler initiates downlink stream.
  publish: {
    path: '/broker.Broker/Publish',
    requestStream: true,
    responseStream: false,
    requestType: ttn_api_broker_broker_pb.DownlinkMessage,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_broker_DownlinkMessage,
    requestDeserialize: deserialize_broker_DownlinkMessage,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Router requests device activation
  activate: {
    path: '/broker.Broker/Activate',
    requestStream: false,
    responseStream: false,
    requestType: ttn_api_broker_broker_pb.DeviceActivationRequest,
    responseType: ttn_api_broker_broker_pb.DeviceActivationResponse,
    requestSerialize: serialize_broker_DeviceActivationRequest,
    requestDeserialize: deserialize_broker_DeviceActivationRequest,
    responseSerialize: serialize_broker_DeviceActivationResponse,
    responseDeserialize: deserialize_broker_DeviceActivationResponse,
  },
};

exports.BrokerClient = grpc.makeGenericClientConstructor(BrokerService);
// The BrokerManager service provides configuration and monitoring functionality
var BrokerManagerService = exports.BrokerManagerService = {
  // Handler announces a new application to Broker. This is a temporary method that will be removed
  // when we can push updates from the Discovery service to the routing services.
  registerApplicationHandler: {
    path: '/broker.BrokerManager/RegisterApplicationHandler',
    requestStream: false,
    responseStream: false,
    requestType: ttn_api_broker_broker_pb.ApplicationHandlerRegistration,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_broker_ApplicationHandlerRegistration,
    requestDeserialize: deserialize_broker_ApplicationHandlerRegistration,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Network operator requests Broker status
  getStatus: {
    path: '/broker.BrokerManager/GetStatus',
    requestStream: false,
    responseStream: false,
    requestType: ttn_api_broker_broker_pb.StatusRequest,
    responseType: ttn_api_broker_broker_pb.Status,
    requestSerialize: serialize_broker_StatusRequest,
    requestDeserialize: deserialize_broker_StatusRequest,
    responseSerialize: serialize_broker_Status,
    responseDeserialize: deserialize_broker_Status,
  },
};

exports.BrokerManagerClient = grpc.makeGenericClientConstructor(BrokerManagerService);
