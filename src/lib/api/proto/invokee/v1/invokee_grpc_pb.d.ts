// package: mee6aas.agent.invokee.v1
// file: invokee.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as invokee_pb from "./invokee_pb";

interface IInvokeeService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listen: IInvokeeService_IListen;
}

interface IInvokeeService_IListen extends grpc.MethodDefinition<invokee_pb.ListenRequest, invokee_pb.Task> {
    path: string; // "/mee6aas.agent.invokee.v1.Invokee/Listen"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<invokee_pb.ListenRequest>;
    requestDeserialize: grpc.deserialize<invokee_pb.ListenRequest>;
    responseSerialize: grpc.serialize<invokee_pb.Task>;
    responseDeserialize: grpc.deserialize<invokee_pb.Task>;
}

export const InvokeeService: IInvokeeService;

export interface IInvokeeServer {
    listen: grpc.handleServerStreamingCall<invokee_pb.ListenRequest, invokee_pb.Task>;
}

export interface IInvokeeClient {
    listen(request: invokee_pb.ListenRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<invokee_pb.Task>;
    listen(request: invokee_pb.ListenRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<invokee_pb.Task>;
}

export class InvokeeClient extends grpc.Client implements IInvokeeClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public listen(request: invokee_pb.ListenRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<invokee_pb.Task>;
    public listen(request: invokee_pb.ListenRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<invokee_pb.Task>;
}
