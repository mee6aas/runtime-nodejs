// package: mee6aas.zeep.router.v1
// file: router.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as router_pb from "./router_pb";

interface IRouterServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listen: IRouterServiceService_IListen;
    send: IRouterServiceService_ISend;
}

interface IRouterServiceService_IListen extends grpc.MethodDefinition<router_pb.ListenRequest, router_pb.Message> {
    path: string; // "/mee6aas.zeep.router.v1.RouterService/Listen"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<router_pb.ListenRequest>;
    requestDeserialize: grpc.deserialize<router_pb.ListenRequest>;
    responseSerialize: grpc.serialize<router_pb.Message>;
    responseDeserialize: grpc.deserialize<router_pb.Message>;
}
interface IRouterServiceService_ISend extends grpc.MethodDefinition<router_pb.SendRequest, router_pb.SendResponse> {
    path: string; // "/mee6aas.zeep.router.v1.RouterService/Send"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<router_pb.SendRequest>;
    requestDeserialize: grpc.deserialize<router_pb.SendRequest>;
    responseSerialize: grpc.serialize<router_pb.SendResponse>;
    responseDeserialize: grpc.deserialize<router_pb.SendResponse>;
}

export const RouterServiceService: IRouterServiceService;

export interface IRouterServiceServer {
    listen: grpc.handleServerStreamingCall<router_pb.ListenRequest, router_pb.Message>;
    send: grpc.handleUnaryCall<router_pb.SendRequest, router_pb.SendResponse>;
}

export interface IRouterServiceClient {
    listen(request: router_pb.ListenRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<router_pb.Message>;
    listen(request: router_pb.ListenRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<router_pb.Message>;
    send(request: router_pb.SendRequest, callback: (error: grpc.ServiceError | null, response: router_pb.SendResponse) => void): grpc.ClientUnaryCall;
    send(request: router_pb.SendRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: router_pb.SendResponse) => void): grpc.ClientUnaryCall;
    send(request: router_pb.SendRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: router_pb.SendResponse) => void): grpc.ClientUnaryCall;
}

export class RouterServiceClient extends grpc.Client implements IRouterServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public listen(request: router_pb.ListenRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<router_pb.Message>;
    public listen(request: router_pb.ListenRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<router_pb.Message>;
    public send(request: router_pb.SendRequest, callback: (error: grpc.ServiceError | null, response: router_pb.SendResponse) => void): grpc.ClientUnaryCall;
    public send(request: router_pb.SendRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: router_pb.SendResponse) => void): grpc.ClientUnaryCall;
    public send(request: router_pb.SendRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: router_pb.SendResponse) => void): grpc.ClientUnaryCall;
}
