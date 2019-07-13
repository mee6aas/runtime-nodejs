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
        arg: string,
    }
}
