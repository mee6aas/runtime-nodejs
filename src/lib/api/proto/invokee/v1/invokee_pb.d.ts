// package: mee6aas.agent.invokee.v1
// file: invokee.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class ListenRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListenRequest): ListenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListenRequest;
    static deserializeBinaryFromReader(message: ListenRequest, reader: jspb.BinaryReader): ListenRequest;
}

export namespace ListenRequest {
    export type AsObject = {
    }
}

export class Task extends jspb.Message { 
    getType(): TaskType;
    setType(value: TaskType): void;

    getId(): string;
    setId(value: string): void;

    getArg(): string;
    setArg(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Task.AsObject;
    static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Task;
    static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
    export type AsObject = {
        type: TaskType,
        id: string,
        arg: string,
    }
}

export class ReportRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getResult(): string;
    setResult(value: string): void;

    getIserror(): boolean;
    setIserror(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReportRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ReportRequest): ReportRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReportRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReportRequest;
    static deserializeBinaryFromReader(message: ReportRequest, reader: jspb.BinaryReader): ReportRequest;
}

export namespace ReportRequest {
    export type AsObject = {
        id: string,
        result: string,
        iserror: boolean,
    }
}

export class ReportResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReportResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ReportResponse): ReportResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReportResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReportResponse;
    static deserializeBinaryFromReader(message: ReportResponse, reader: jspb.BinaryReader): ReportResponse;
}

export namespace ReportResponse {
    export type AsObject = {
    }
}

export class HandoverRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HandoverRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HandoverRequest): HandoverRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HandoverRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HandoverRequest;
    static deserializeBinaryFromReader(message: HandoverRequest, reader: jspb.BinaryReader): HandoverRequest;
}

export namespace HandoverRequest {
    export type AsObject = {
    }
}

export class HandoverResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HandoverResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HandoverResponse): HandoverResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HandoverResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HandoverResponse;
    static deserializeBinaryFromReader(message: HandoverResponse, reader: jspb.BinaryReader): HandoverResponse;
}

export namespace HandoverResponse {
    export type AsObject = {
    }
}

export enum TaskType {
    UNKNOWN = 0,
    LOAD = 1,
    INVOKE = 2,
    HANDOVER = 3,
}
