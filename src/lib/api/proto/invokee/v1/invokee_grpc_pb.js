// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var invokee_pb = require('./invokee_pb.js');

function serialize_mee6aas_agent_invokee_v1_ListenRequest(arg) {
  if (!(arg instanceof invokee_pb.ListenRequest)) {
    throw new Error('Expected argument of type mee6aas.agent.invokee.v1.ListenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mee6aas_agent_invokee_v1_ListenRequest(buffer_arg) {
  return invokee_pb.ListenRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
};

exports.InvokeeClient = grpc.makeGenericClientConstructor(InvokeeService);
