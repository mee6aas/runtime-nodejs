// package: mee6aas.zeep.router.v1
// file: router.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class Kyle extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getName(): string;
    setName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Kyle.AsObject;
    static toObject(includeInstance: boolean, msg: Kyle): Kyle.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Kyle, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Kyle;
    static deserializeBinaryFromReader(message: Kyle, reader: jspb.BinaryReader): Kyle;
}

export namespace Kyle {
    export type AsObject = {
        id: string,
        name: string,
    }
}

export class Message extends jspb.Message { 

    hasSender(): boolean;
    clearSender(): void;
    getSender(): Kyle | undefined;
    setSender(value?: Kyle): void;

    getBody(): string;
    setBody(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Message.AsObject;
    static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Message;
    static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
    export type AsObject = {
        sender?: Kyle.AsObject,
        body: string,
    }
}

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

export class SendRequest extends jspb.Message { 

    hasDestination(): boolean;
    clearDestination(): void;
    getDestination(): Kyle | undefined;
    setDestination(value?: Kyle): void;

    getBody(): string;
    setBody(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendRequest): SendRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendRequest;
    static deserializeBinaryFromReader(message: SendRequest, reader: jspb.BinaryReader): SendRequest;
}

export namespace SendRequest {
    export type AsObject = {
        destination?: Kyle.AsObject,
        body: string,
    }
}

export class SendResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendResponse): SendResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendResponse;
    static deserializeBinaryFromReader(message: SendResponse, reader: jspb.BinaryReader): SendResponse;
}

export namespace SendResponse {
    export type AsObject = {
    }
}
