// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var router_pb = require('./router_pb.js');

function serialize_mee6aas_zeep_router_v1_ListenRequest(arg) {
  if (!(arg instanceof router_pb.ListenRequest)) {
    throw new Error('Expected argument of type mee6aas.zeep.router.v1.ListenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_zeep_router_v1_ListenRequest(buffer_arg) {
  return router_pb.ListenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mee6aas_zeep_router_v1_Message(arg) {
  if (!(arg instanceof router_pb.Message)) {
    throw new Error('Expected argument of type mee6aas.zeep.router.v1.Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_zeep_router_v1_Message(buffer_arg) {
  return router_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mee6aas_zeep_router_v1_SendRequest(arg) {
  if (!(arg instanceof router_pb.SendRequest)) {
    throw new Error('Expected argument of type mee6aas.zeep.router.v1.SendRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_zeep_router_v1_SendRequest(buffer_arg) {
  return router_pb.SendRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mee6aas_zeep_router_v1_SendResponse(arg) {
  if (!(arg instanceof router_pb.SendResponse)) {
    throw new Error('Expected argument of type mee6aas.zeep.router.v1.SendResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_zeep_router_v1_SendResponse(buffer_arg) {
  return router_pb.SendResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RouterServiceService = exports.RouterServiceService = {
  listen: {
    path: '/mee6aas.zeep.router.v1.RouterService/Listen',
    requestStream: false,
    responseStream: true,
    requestType: router_pb.ListenRequest,
    responseType: router_pb.Message,
    requestSerialize: serialize_mee6aas_zeep_router_v1_ListenRequest,
    requestDeserialize: deserialize_mee6aas_zeep_router_v1_ListenRequest,
    responseSerialize: serialize_mee6aas_zeep_router_v1_Message,
    responseDeserialize: deserialize_mee6aas_zeep_router_v1_Message,
  },
  send: {
    path: '/mee6aas.zeep.router.v1.RouterService/Send',
    requestStream: false,
    responseStream: false,
    requestType: router_pb.SendRequest,
    responseType: router_pb.SendResponse,
    requestSerialize: serialize_mee6aas_zeep_router_v1_SendRequest,
    requestDeserialize: deserialize_mee6aas_zeep_router_v1_SendRequest,
    responseSerialize: serialize_mee6aas_zeep_router_v1_SendResponse,
    responseDeserialize: deserialize_mee6aas_zeep_router_v1_SendResponse,
  },
};

exports.RouterServiceClient = grpc.makeGenericClientConstructor(RouterServiceService);
