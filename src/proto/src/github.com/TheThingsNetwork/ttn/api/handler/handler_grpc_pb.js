// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.
//
'use strict';
var grpc = require('grpc');
var src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb = require('../../../../../../src/github.com/TheThingsNetwork/ttn/api/handler/handler_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_api_annotations_pb = require('../../../../../../google/api/annotations_pb.js');
var ttn_api_api_pb = require('../../../../../../ttn/api/api_pb.js');
var ttn_api_broker_broker_pb = require('../../../../../../ttn/api/broker/broker_pb.js');
var ttn_api_protocol_protocol_pb = require('../../../../../../ttn/api/protocol/protocol_pb.js');
var ttn_api_protocol_lorawan_device_pb = require('../../../../../../ttn/api/protocol/lorawan/device_pb.js');
var ttn_api_trace_trace_pb = require('../../../../../../ttn/api/trace/trace_pb.js');

function serialize_broker_ActivationChallengeRequest(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.ActivationChallengeRequest)) {
    throw new Error('Expected argument of type broker.ActivationChallengeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_ActivationChallengeRequest(buffer_arg) {
  return ttn_api_broker_broker_pb.ActivationChallengeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_ActivationChallengeResponse(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.ActivationChallengeResponse)) {
    throw new Error('Expected argument of type broker.ActivationChallengeResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_ActivationChallengeResponse(buffer_arg) {
  return ttn_api_broker_broker_pb.ActivationChallengeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_broker_DeduplicatedDeviceActivationRequest(arg) {
  if (!(arg instanceof ttn_api_broker_broker_pb.DeduplicatedDeviceActivationRequest)) {
    throw new Error('Expected argument of type broker.DeduplicatedDeviceActivationRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_broker_DeduplicatedDeviceActivationRequest(buffer_arg) {
  return ttn_api_broker_broker_pb.DeduplicatedDeviceActivationRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_handler_Application(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Application)) {
    throw new Error('Expected argument of type handler.Application');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_Application(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Application.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_ApplicationIdentifier(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.ApplicationIdentifier)) {
    throw new Error('Expected argument of type handler.ApplicationIdentifier');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_ApplicationIdentifier(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.ApplicationIdentifier.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_Device(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Device)) {
    throw new Error('Expected argument of type handler.Device');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_Device(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Device.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_DeviceActivationResponse(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceActivationResponse)) {
    throw new Error('Expected argument of type handler.DeviceActivationResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_DeviceActivationResponse(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceActivationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_DeviceIdentifier(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceIdentifier)) {
    throw new Error('Expected argument of type handler.DeviceIdentifier');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_DeviceIdentifier(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceIdentifier.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_DeviceList(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceList)) {
    throw new Error('Expected argument of type handler.DeviceList');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_DeviceList(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_DryDownlinkMessage(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryDownlinkMessage)) {
    throw new Error('Expected argument of type handler.DryDownlinkMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_DryDownlinkMessage(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryDownlinkMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_DryDownlinkResult(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryDownlinkResult)) {
    throw new Error('Expected argument of type handler.DryDownlinkResult');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_DryDownlinkResult(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryDownlinkResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_DryUplinkMessage(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryUplinkMessage)) {
    throw new Error('Expected argument of type handler.DryUplinkMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_DryUplinkMessage(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryUplinkMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_DryUplinkResult(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryUplinkResult)) {
    throw new Error('Expected argument of type handler.DryUplinkResult');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_DryUplinkResult(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryUplinkResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_SimulatedUplinkMessage(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.SimulatedUplinkMessage)) {
    throw new Error('Expected argument of type handler.SimulatedUplinkMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_SimulatedUplinkMessage(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.SimulatedUplinkMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_Status(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Status)) {
    throw new Error('Expected argument of type handler.Status');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_Status(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_handler_StatusRequest(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.StatusRequest)) {
    throw new Error('Expected argument of type handler.StatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_handler_StatusRequest(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.StatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The Handler service provides pure network functionality
var HandlerService = exports.HandlerService = {
  activationChallenge: {
    path: '/handler.Handler/ActivationChallenge',
    requestStream: false,
    responseStream: false,
    requestType: ttn_api_broker_broker_pb.ActivationChallengeRequest,
    responseType: ttn_api_broker_broker_pb.ActivationChallengeResponse,
    requestSerialize: serialize_broker_ActivationChallengeRequest,
    requestDeserialize: deserialize_broker_ActivationChallengeRequest,
    responseSerialize: serialize_broker_ActivationChallengeResponse,
    responseDeserialize: deserialize_broker_ActivationChallengeResponse,
  },
  activate: {
    path: '/handler.Handler/Activate',
    requestStream: false,
    responseStream: false,
    requestType: ttn_api_broker_broker_pb.DeduplicatedDeviceActivationRequest,
    responseType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceActivationResponse,
    requestSerialize: serialize_broker_DeduplicatedDeviceActivationRequest,
    requestDeserialize: deserialize_broker_DeduplicatedDeviceActivationRequest,
    responseSerialize: serialize_handler_DeviceActivationResponse,
    responseDeserialize: deserialize_handler_DeviceActivationResponse,
  },
};

exports.HandlerClient = grpc.makeGenericClientConstructor(HandlerService);
// ApplicationManager manages application and device registrations on the Handler
//
// To protect our quality of service, you can make up to 5000 calls to the
// ApplicationManager API per hour. Once you go over the rate limit, you will
// receive an error response.
var ApplicationManagerService = exports.ApplicationManagerService = {
  // Applications should first be registered to the Handler with the `RegisterApplication` method
  registerApplication: {
    path: '/handler.ApplicationManager/RegisterApplication',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.ApplicationIdentifier,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_handler_ApplicationIdentifier,
    requestDeserialize: deserialize_handler_ApplicationIdentifier,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // GetApplication returns the application with the given identifier (app_id)
  getApplication: {
    path: '/handler.ApplicationManager/GetApplication',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.ApplicationIdentifier,
    responseType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Application,
    requestSerialize: serialize_handler_ApplicationIdentifier,
    requestDeserialize: deserialize_handler_ApplicationIdentifier,
    responseSerialize: serialize_handler_Application,
    responseDeserialize: deserialize_handler_Application,
  },
  // SetApplication updates the settings for the application. All fields must be supplied.
  setApplication: {
    path: '/handler.ApplicationManager/SetApplication',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Application,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_handler_Application,
    requestDeserialize: deserialize_handler_Application,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // DeleteApplication deletes the application with the given identifier (app_id)
  deleteApplication: {
    path: '/handler.ApplicationManager/DeleteApplication',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.ApplicationIdentifier,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_handler_ApplicationIdentifier,
    requestDeserialize: deserialize_handler_ApplicationIdentifier,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // GetDevice returns the device with the given identifier (app_id and dev_id)
  getDevice: {
    path: '/handler.ApplicationManager/GetDevice',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceIdentifier,
    responseType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Device,
    requestSerialize: serialize_handler_DeviceIdentifier,
    requestDeserialize: deserialize_handler_DeviceIdentifier,
    responseSerialize: serialize_handler_Device,
    responseDeserialize: deserialize_handler_Device,
  },
  // SetDevice creates or updates a device. All fields must be supplied.
  setDevice: {
    path: '/handler.ApplicationManager/SetDevice',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Device,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_handler_Device,
    requestDeserialize: deserialize_handler_Device,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // DeleteDevice deletes the device with the given identifier (app_id and dev_id)
  deleteDevice: {
    path: '/handler.ApplicationManager/DeleteDevice',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceIdentifier,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_handler_DeviceIdentifier,
    requestDeserialize: deserialize_handler_DeviceIdentifier,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // GetDevicesForApplication returns all devices that belong to the application with the given identifier (app_id)
  getDevicesForApplication: {
    path: '/handler.ApplicationManager/GetDevicesForApplication',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.ApplicationIdentifier,
    responseType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DeviceList,
    requestSerialize: serialize_handler_ApplicationIdentifier,
    requestDeserialize: deserialize_handler_ApplicationIdentifier,
    responseSerialize: serialize_handler_DeviceList,
    responseDeserialize: deserialize_handler_DeviceList,
  },
  // DryUplink simulates processing a downlink message and returns the result
  dryDownlink: {
    path: '/handler.ApplicationManager/DryDownlink',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryDownlinkMessage,
    responseType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryDownlinkResult,
    requestSerialize: serialize_handler_DryDownlinkMessage,
    requestDeserialize: deserialize_handler_DryDownlinkMessage,
    responseSerialize: serialize_handler_DryDownlinkResult,
    responseDeserialize: deserialize_handler_DryDownlinkResult,
  },
  // DryUplink simulates processing an uplink message and returns the result
  dryUplink: {
    path: '/handler.ApplicationManager/DryUplink',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryUplinkMessage,
    responseType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.DryUplinkResult,
    requestSerialize: serialize_handler_DryUplinkMessage,
    requestDeserialize: deserialize_handler_DryUplinkMessage,
    responseSerialize: serialize_handler_DryUplinkResult,
    responseDeserialize: deserialize_handler_DryUplinkResult,
  },
  // SimulateUplink simulates an uplink message
  simulateUplink: {
    path: '/handler.ApplicationManager/SimulateUplink',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.SimulatedUplinkMessage,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_handler_SimulatedUplinkMessage,
    requestDeserialize: deserialize_handler_SimulatedUplinkMessage,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.ApplicationManagerClient = grpc.makeGenericClientConstructor(ApplicationManagerService);
// The HandlerManager service provides configuration and monitoring
// functionality
var HandlerManagerService = exports.HandlerManagerService = {
  getStatus: {
    path: '/handler.HandlerManager/GetStatus',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.StatusRequest,
    responseType: src_github_com_TheThingsNetwork_ttn_api_handler_handler_pb.Status,
    requestSerialize: serialize_handler_StatusRequest,
    requestDeserialize: deserialize_handler_StatusRequest,
    responseSerialize: serialize_handler_Status,
    responseDeserialize: deserialize_handler_Status,
  },
};

exports.HandlerManagerClient = grpc.makeGenericClientConstructor(HandlerManagerService);
