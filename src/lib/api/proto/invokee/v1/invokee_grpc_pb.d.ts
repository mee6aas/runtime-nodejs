// package: mee6aas.agent.invokee.v1
// file: invokee.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as invokee_pb from "./invokee_pb";

interface IInvokeeService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listen: IInvokeeService_IListen;
    report: IInvokeeService_IReport;
    handover: IInvokeeService_IHandover;
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
interface IInvokeeService_IReport extends grpc.MethodDefinition<invokee_pb.ReportRequest, invokee_pb.ReportResponse> {
    path: string; // "/mee6aas.agent.invokee.v1.Invokee/Report"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<invokee_pb.ReportRequest>;
    requestDeserialize: grpc.deserialize<invokee_pb.ReportRequest>;
    responseSerialize: grpc.serialize<invokee_pb.ReportResponse>;
    responseDeserialize: grpc.deserialize<invokee_pb.ReportResponse>;
}
interface IInvokeeService_IHandover extends grpc.MethodDefinition<invokee_pb.HandoverRequest, invokee_pb.HandoverResponse> {
    path: string; // "/mee6aas.agent.invokee.v1.Invokee/Handover"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<invokee_pb.HandoverRequest>;
    requestDeserialize: grpc.deserialize<invokee_pb.HandoverRequest>;
    responseSerialize: grpc.serialize<invokee_pb.HandoverResponse>;
    responseDeserialize: grpc.deserialize<invokee_pb.HandoverResponse>;
}

export const InvokeeService: IInvokeeService;

export interface IInvokeeServer {
    listen: grpc.handleServerStreamingCall<invokee_pb.ListenRequest, invokee_pb.Task>;
    report: grpc.handleUnaryCall<invokee_pb.ReportRequest, invokee_pb.ReportResponse>;
    handover: grpc.handleUnaryCall<invokee_pb.HandoverRequest, invokee_pb.HandoverResponse>;
}

export interface IInvokeeClient {
    listen(request: invokee_pb.ListenRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<invokee_pb.Task>;
    listen(request: invokee_pb.ListenRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<invokee_pb.Task>;
    report(request: invokee_pb.ReportRequest, callback: (error: grpc.ServiceError | null, response: invokee_pb.ReportResponse) => void): grpc.ClientUnaryCall;
    report(request: invokee_pb.ReportRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: invokee_pb.ReportResponse) => void): grpc.ClientUnaryCall;
    report(request: invokee_pb.ReportRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: invokee_pb.ReportResponse) => void): grpc.ClientUnaryCall;
    handover(request: invokee_pb.HandoverRequest, callback: (error: grpc.ServiceError | null, response: invokee_pb.HandoverResponse) => void): grpc.ClientUnaryCall;
    handover(request: invokee_pb.HandoverRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: invokee_pb.HandoverResponse) => void): grpc.ClientUnaryCall;
    handover(request: invokee_pb.HandoverRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: invokee_pb.HandoverResponse) => void): grpc.ClientUnaryCall;
}

export class InvokeeClient extends grpc.Client implements IInvokeeClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public listen(request: invokee_pb.ListenRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<invokee_pb.Task>;
    public listen(request: invokee_pb.ListenRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<invokee_pb.Task>;
    public report(request: invokee_pb.ReportRequest, callback: (error: grpc.ServiceError | null, response: invokee_pb.ReportResponse) => void): grpc.ClientUnaryCall;
    public report(request: invokee_pb.ReportRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: invokee_pb.ReportResponse) => void): grpc.ClientUnaryCall;
    public report(request: invokee_pb.ReportRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: invokee_pb.ReportResponse) => void): grpc.ClientUnaryCall;
    public handover(request: invokee_pb.HandoverRequest, callback: (error: grpc.ServiceError | null, response: invokee_pb.HandoverResponse) => void): grpc.ClientUnaryCall;
    public handover(request: invokee_pb.HandoverRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: invokee_pb.HandoverResponse) => void): grpc.ClientUnaryCall;
    public handover(request: invokee_pb.HandoverRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: invokee_pb.HandoverResponse) => void): grpc.ClientUnaryCall;
}
