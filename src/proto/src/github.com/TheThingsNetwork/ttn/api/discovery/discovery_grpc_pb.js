// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENSE file.
//
'use strict';
var grpc = require('grpc');
var src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb = require('../../../../../../src/github.com/TheThingsNetwork/ttn/api/discovery/discovery_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_api_annotations_pb = require('../../../../../../google/api/annotations_pb.js');
var github_com_gogo_protobuf_gogoproto_gogo_pb = require('../../../../../../github.com/gogo/protobuf/gogoproto/gogo_pb.js');

function serialize_discovery_Announcement(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.Announcement)) {
    throw new Error('Expected argument of type discovery.Announcement');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discovery_Announcement(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.Announcement.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discovery_AnnouncementsResponse(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.AnnouncementsResponse)) {
    throw new Error('Expected argument of type discovery.AnnouncementsResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discovery_AnnouncementsResponse(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.AnnouncementsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discovery_GetByAppEUIRequest(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetByAppEUIRequest)) {
    throw new Error('Expected argument of type discovery.GetByAppEUIRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discovery_GetByAppEUIRequest(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetByAppEUIRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discovery_GetByAppIDRequest(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetByAppIDRequest)) {
    throw new Error('Expected argument of type discovery.GetByAppIDRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discovery_GetByAppIDRequest(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetByAppIDRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discovery_GetRequest(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetRequest)) {
    throw new Error('Expected argument of type discovery.GetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discovery_GetRequest(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discovery_GetServiceRequest(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetServiceRequest)) {
    throw new Error('Expected argument of type discovery.GetServiceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discovery_GetServiceRequest(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discovery_MetadataRequest(arg) {
  if (!(arg instanceof src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.MetadataRequest)) {
    throw new Error('Expected argument of type discovery.MetadataRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discovery_MetadataRequest(buffer_arg) {
  return src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.MetadataRequest.deserializeBinary(new Uint8Array(buffer_arg));
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


// The Discovery service is used to discover services within The Things Network.
var DiscoveryService = exports.DiscoveryService = {
  // Announce a component to the Discovery server.
  // A call to `Announce` does not processes the `metadata` field, so you can safely leave this field empty.
  // Adding or removing Metadata should be done with the `AddMetadata` and `DeleteMetadata` methods.
  announce: {
    path: '/discovery.Discovery/Announce',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.Announcement,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_discovery_Announcement,
    requestDeserialize: deserialize_discovery_Announcement,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Get all announcements for a specific service type
  getAll: {
    path: '/discovery.Discovery/GetAll',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetServiceRequest,
    responseType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.AnnouncementsResponse,
    requestSerialize: serialize_discovery_GetServiceRequest,
    requestDeserialize: deserialize_discovery_GetServiceRequest,
    responseSerialize: serialize_discovery_AnnouncementsResponse,
    responseDeserialize: deserialize_discovery_AnnouncementsResponse,
  },
  // Get a specific announcement
  get: {
    path: '/discovery.Discovery/Get',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetRequest,
    responseType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.Announcement,
    requestSerialize: serialize_discovery_GetRequest,
    requestDeserialize: deserialize_discovery_GetRequest,
    responseSerialize: serialize_discovery_Announcement,
    responseDeserialize: deserialize_discovery_Announcement,
  },
  // Add metadata to an announement
  addMetadata: {
    path: '/discovery.Discovery/AddMetadata',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.MetadataRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_discovery_MetadataRequest,
    requestDeserialize: deserialize_discovery_MetadataRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Delete metadata from an announcement
  deleteMetadata: {
    path: '/discovery.Discovery/DeleteMetadata',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.MetadataRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_discovery_MetadataRequest,
    requestDeserialize: deserialize_discovery_MetadataRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  getByAppID: {
    path: '/discovery.Discovery/GetByAppID',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetByAppIDRequest,
    responseType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.Announcement,
    requestSerialize: serialize_discovery_GetByAppIDRequest,
    requestDeserialize: deserialize_discovery_GetByAppIDRequest,
    responseSerialize: serialize_discovery_Announcement,
    responseDeserialize: deserialize_discovery_Announcement,
  },
  getByAppEUI: {
    path: '/discovery.Discovery/GetByAppEUI',
    requestStream: false,
    responseStream: false,
    requestType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.GetByAppEUIRequest,
    responseType: src_github_com_TheThingsNetwork_ttn_api_discovery_discovery_pb.Announcement,
    requestSerialize: serialize_discovery_GetByAppEUIRequest,
    requestDeserialize: deserialize_discovery_GetByAppEUIRequest,
    responseSerialize: serialize_discovery_Announcement,
    responseDeserialize: deserialize_discovery_Announcement,
  },
};

exports.DiscoveryClient = grpc.makeGenericClientConstructor(DiscoveryService);
// The DiscoveryManager service provides configuration and monitoring functionality
var DiscoveryManagerService = exports.DiscoveryManagerService = {
};

exports.DiscoveryManagerClient = grpc.makeGenericClientConstructor(DiscoveryManagerService);
