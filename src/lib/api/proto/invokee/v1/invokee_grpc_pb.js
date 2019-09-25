// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var invokee_pb = require('./invokee_pb.js');

function serialize_mee6aas_agent_invokee_v1_HandoverRequest(arg) {
  if (!(arg instanceof invokee_pb.HandoverRequest)) {
    throw new Error('Expected argument of type mee6aas.agent.invokee.v1.HandoverRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_agent_invokee_v1_HandoverRequest(buffer_arg) {
  return invokee_pb.HandoverRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mee6aas_agent_invokee_v1_HandoverResponse(arg) {
  if (!(arg instanceof invokee_pb.HandoverResponse)) {
    throw new Error('Expected argument of type mee6aas.agent.invokee.v1.HandoverResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_agent_invokee_v1_HandoverResponse(buffer_arg) {
  return invokee_pb.HandoverResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mee6aas_agent_invokee_v1_ListenRequest(arg) {
  if (!(arg instanceof invokee_pb.ListenRequest)) {
    throw new Error('Expected argument of type mee6aas.agent.invokee.v1.ListenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_agent_invokee_v1_ListenRequest(buffer_arg) {
  return invokee_pb.ListenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mee6aas_agent_invokee_v1_ReportRequest(arg) {
  if (!(arg instanceof invokee_pb.ReportRequest)) {
    throw new Error('Expected argument of type mee6aas.agent.invokee.v1.ReportRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_agent_invokee_v1_ReportRequest(buffer_arg) {
  return invokee_pb.ReportRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mee6aas_agent_invokee_v1_ReportResponse(arg) {
  if (!(arg instanceof invokee_pb.ReportResponse)) {
    throw new Error('Expected argument of type mee6aas.agent.invokee.v1.ReportResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_agent_invokee_v1_ReportResponse(buffer_arg) {
  return invokee_pb.ReportResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mee6aas_agent_invokee_v1_Task(arg) {
  if (!(arg instanceof invokee_pb.Task)) {
    throw new Error('Expected argument of type mee6aas.agent.invokee.v1.Task');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_agent_invokee_v1_Task(buffer_arg) {
  return invokee_pb.Task.deserializeBinary(new Uint8Array(buffer_arg));
}


var InvokeeService = exports.InvokeeService = {
  listen: {
    path: '/mee6aas.agent.invokee.v1.Invokee/Listen',
    requestStream: false,
    responseStream: true,
    requestType: invokee_pb.ListenRequest,
    responseType: invokee_pb.Task,
    requestSerialize: serialize_mee6aas_agent_invokee_v1_ListenRequest,
    requestDeserialize: deserialize_mee6aas_agent_invokee_v1_ListenRequest,
    responseSerialize: serialize_mee6aas_agent_invokee_v1_Task,
    responseDeserialize: deserialize_mee6aas_agent_invokee_v1_Task,
  },
  report: {
    path: '/mee6aas.agent.invokee.v1.Invokee/Report',
    requestStream: false,
    responseStream: false,
    requestType: invokee_pb.ReportRequest,
    responseType: invokee_pb.ReportResponse,
    requestSerialize: serialize_mee6aas_agent_invokee_v1_ReportRequest,
    requestDeserialize: deserialize_mee6aas_agent_invokee_v1_ReportRequest,
    responseSerialize: serialize_mee6aas_agent_invokee_v1_ReportResponse,
    responseDeserialize: deserialize_mee6aas_agent_invokee_v1_ReportResponse,
  },
  handover: {
    path: '/mee6aas.agent.invokee.v1.Invokee/Handover',
    requestStream: false,
    responseStream: false,
    requestType: invokee_pb.HandoverRequest,
    responseType: invokee_pb.HandoverResponse,
    requestSerialize: serialize_mee6aas_agent_invokee_v1_HandoverRequest,
    requestDeserialize: deserialize_mee6aas_agent_invokee_v1_HandoverRequest,
    responseSerialize: serialize_mee6aas_agent_invokee_v1_HandoverResponse,
    responseDeserialize: deserialize_mee6aas_agent_invokee_v1_HandoverResponse,
  },
};

exports.InvokeeClient = grpc.makeGenericClientConstructor(InvokeeService);
